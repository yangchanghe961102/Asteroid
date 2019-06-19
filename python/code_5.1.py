# -*- coding: UTF8 -*-
# Use stack as request data structure
# Add old-file deletion thread.

from flask import Flask
from flask import send_file
from flask import request
from queue import Queue
from paraview.simple import *
import threading
import time
import math
import json
import copy
import os

class Stack:
    def __init__(self):
        self.__storage = []
    
    def isEmpty(self):
        return len(self.__storage) == 0
    
    def push(self, p):
        self.__storage.append(p)
    
    def pop(self):
        return self.__storage.pop()

stack_image_cnt = 0
image_path_stack = Stack()
finished_image_list = list()
access_time_list = []
ACCESS_TIME_LIST_MAX = 1000
# directory = '/home/happyfun/SciVis.Contest'
directory = '/home/yanda.li/SciVis.Contest'
directory_vol = '/export3/users/yanda.li/SciVis.Contest.2018'
access_time_log = open(directory + '/log.txt', 'r')
channel_state = '0000'

point_num = 50
view_size = 512 # not used
volume_size = 11389736
scale = 1.0
srcfile_path = ''
srcfile_path_old = ''
renderView1 = GetActiveViewOrCreate('RenderView')
renderView1.OrientationAxesVisibility = 0
vti_name_list = ['', '', '', '']
vti_list = ['', '', '', '']
vtiDisplay_list = ['', '', '', '']
slice_list = ['', '', '', '']
sliceDisplay_list = ['', '', '', '']
LUT_list = ['', '', '', '']
PWF_list = ['', '', '', '']
VTI_NAME_LIST_MAX = 4
# a[strb] = a.pop(stra)

CHANNEL_LIST = ['prs', 'tev', 'v02', 'v03']
tf_scale = {'prs': [0, 1500000000], 'tev': [0.02, 0.7], 'v02': [0.0, 1.0], 'v03': [0.0, 1.0]}
tf_opacity = {'prs': 1, 'tev': 0, 'v02': 0, 'v03': 0}
tf_log = {'prs': False, 'tev': False, 'v02': False, 'v03': False}
tf_number = {'prs': '3', 'tev': '3', 'v02': '4', 'v03': '2'}

app = Flask(__name__)

def import_preset_tf():
    directory_tf = directory + '/TF/'
    for channel in tf_number:
        preset_tf = 'SciVis2018_' + str(channel) + '_' + tf_number[channel]
        ImportPresets(filename = directory_tf + preset_tf + '.json')
    ImportPresets(filename = directory_tf + 'SciVis2018_prs_a.json')
    ImportPresets(filename = directory_tf + 'SciVis2018_tev_a.json')

def open_render_view(index, srcfile_path, channel, tf, phi, force_tf_opacity):
    global renderView1
    
    if vti_list[index] != "":
        print('Delete index: ' + str(index))
        Delete(slice_list[index])
        Delete(vti_list[index])
    
    print('Index = ' + str(index))

    # create a new 'XML Image Data Reader'
    vti_list[index] = XMLImageDataReader(FileName=srcfile_path)
    vti_list[index].CellArrayStatus = ['vtkGhostType']
    vti_list[index].PointArrayStatus = ['prs', 'rho', 'tev', 'v02', 'v03', 'vtkValidPointMask', 'vtkGhostType']

    # show data in view
    vtiDisplay_list[index] = Show(vti_list[index], renderView1)
    # trace defaults for the display properties.
    vtiDisplay_list[index].Representation = 'Volume'
    vtiDisplay_list[index].ColorArrayName = [None, '']
    vtiDisplay_list[index].OSPRayScaleArray = 'prs'
    vtiDisplay_list[index].OSPRayScaleFunction = 'PiecewiseFunction'
    vtiDisplay_list[index].SelectOrientationVectors = 'None'
    vtiDisplay_list[index].ScaleFactor = 460000.0000115
    vtiDisplay_list[index].SelectScaleArray = 'None'
    vtiDisplay_list[index].GlyphType = 'Arrow'
    vtiDisplay_list[index].GlyphTableIndexArray = 'None'
    vtiDisplay_list[index].GaussianRadius = 23000.000000575
    vtiDisplay_list[index].SetScaleArray = ['POINTS', 'prs']
    vtiDisplay_list[index].ScaleTransferFunction = 'PiecewiseFunction'
    vtiDisplay_list[index].OpacityArray = ['POINTS', 'prs']
    vtiDisplay_list[index].OpacityTransferFunction = 'PiecewiseFunction'
    vtiDisplay_list[index].DataAxesGrid = 'GridAxesRepresentation'
    vtiDisplay_list[index].SelectionCellLabelFontFile = ''
    vtiDisplay_list[index].SelectionPointLabelFontFile = ''
    vtiDisplay_list[index].PolarAxes = 'PolarAxesRepresentation'
    vtiDisplay_list[index].ScalarOpacityUnitDistance = 19718.26484709151
    vtiDisplay_list[index].Slice = 149
    
    # init the 'PiecewiseFunction' selected for 'ScaleTransferFunction'
    vtiDisplay_list[index].ScaleTransferFunction.Points = [21108.2890625, 0.0, 0.5, 0.0, 1099025792.0, 1.0, 0.5, 0.0]

    # init the 'PiecewiseFunction' selected for 'OpacityTransferFunction'
    vtiDisplay_list[index].OpacityTransferFunction.Points = [21108.2890625, 0.0, 0.5, 0.0, 1099025792.0, 1.0, 0.5, 0.0]

    # init the 'GridAxesRepresentation' selected for 'DataAxesGrid'
    vtiDisplay_list[index].DataAxesGrid.XTitleFontFile = ''
    vtiDisplay_list[index].DataAxesGrid.YTitleFontFile = ''
    vtiDisplay_list[index].DataAxesGrid.ZTitleFontFile = ''
    vtiDisplay_list[index].DataAxesGrid.XLabelFontFile = ''
    vtiDisplay_list[index].DataAxesGrid.YLabelFontFile = ''
    vtiDisplay_list[index].DataAxesGrid.ZLabelFontFile = ''

    # init the 'PolarAxesRepresentation' selected for 'PolarAxes'
    vtiDisplay_list[index].PolarAxes.PolarAxisTitleFontFile = ''
    vtiDisplay_list[index].PolarAxes.PolarAxisLabelFontFile = ''
    vtiDisplay_list[index].PolarAxes.LastRadialAxisTextFontFile = ''
    vtiDisplay_list[index].PolarAxes.SecondaryRadialAxesTextFontFile = ''

    # update the view to ensure updated data information
    renderView1.Update()

    # create a new 'Slice'
    slice_list[index] = Slice(Input=vti_list[index])
    slice_list[index].SliceType = 'Plane'
    slice_list[index].SliceOffsetValues = [0.0]

    # init the 'Plane' selected for 'SliceType'
    slice_list[index].SliceType.Origin = [5.7499855756759644e-05, 900000.0000024999, -6.400048732757568e-06]

    # toggle 3D widget visibility (only when running from the GUI)
    Hide3DWidgets(proxy=slice_list[index].SliceType)

    # Properties modified on slice1.SliceType
    slice_list[index].SliceType.Normal = [0.0, 0.0, 1.0]

    # show data in view
    sliceDisplay_list[index] = Show(slice_list[index], renderView1)

    # trace defaults for the display properties.
    sliceDisplay_list[index].Representation = 'Surface'
    sliceDisplay_list[index].ColorArrayName = [None, '']
    sliceDisplay_list[index].OSPRayScaleArray = 'prs'
    sliceDisplay_list[index].OSPRayScaleFunction = 'PiecewiseFunction'
    sliceDisplay_list[index].SelectOrientationVectors = 'None'
    sliceDisplay_list[index].ScaleFactor = 460000.0
    sliceDisplay_list[index].SelectScaleArray = 'None'
    sliceDisplay_list[index].GlyphType = 'Arrow'
    sliceDisplay_list[index].GlyphTableIndexArray = 'None'
    sliceDisplay_list[index].GaussianRadius = 23000.0
    sliceDisplay_list[index].SetScaleArray = ['POINTS', 'prs']
    sliceDisplay_list[index].ScaleTransferFunction = 'PiecewiseFunction'
    sliceDisplay_list[index].OpacityArray = ['POINTS', 'prs']
    sliceDisplay_list[index].OpacityTransferFunction = 'PiecewiseFunction'
    sliceDisplay_list[index].DataAxesGrid = 'GridAxesRepresentation'
    sliceDisplay_list[index].SelectionCellLabelFontFile = ''
    sliceDisplay_list[index].SelectionPointLabelFontFile = ''
    sliceDisplay_list[index].PolarAxes = 'PolarAxesRepresentation'

    # init the 'PiecewiseFunction' selected for 'ScaleTransferFunction'
    sliceDisplay_list[index].ScaleTransferFunction.Points = [33951.60546875, 0.0, 0.5, 0.0, 1098960128.0, 1.0, 0.5, 0.0]

    # init the 'PiecewiseFunction' selected for 'OpacityTransferFunction'
    sliceDisplay_list[index].OpacityTransferFunction.Points = [33951.60546875, 0.0, 0.5, 0.0, 1098960128.0, 1.0, 0.5, 0.0]

    # init the 'GridAxesRepresentation' selected for 'DataAxesGrid'
    sliceDisplay_list[index].DataAxesGrid.XTitleFontFile = ''
    sliceDisplay_list[index].DataAxesGrid.YTitleFontFile = ''
    sliceDisplay_list[index].DataAxesGrid.ZTitleFontFile = ''
    sliceDisplay_list[index].DataAxesGrid.XLabelFontFile = ''
    sliceDisplay_list[index].DataAxesGrid.YLabelFontFile = ''
    sliceDisplay_list[index].DataAxesGrid.ZLabelFontFile = ''

    # init the 'PolarAxesRepresentation' selected for 'PolarAxes'
    sliceDisplay_list[index].PolarAxes.PolarAxisTitleFontFile = ''
    sliceDisplay_list[index].PolarAxes.PolarAxisLabelFontFile = ''
    sliceDisplay_list[index].PolarAxes.LastRadialAxisTextFontFile = ''
    sliceDisplay_list[index].PolarAxes.SecondaryRadialAxesTextFontFile = ''

    # update the view to ensure updated data information
    renderView1.Update()
    
    refresh_tf(index, channel, tf, phi, force_tf_opacity)

def show_hide_vti(hide_list, still_show_list, new_show_list, phi):
    '''
    print('hide list: ')
    print(hide_list)
    print('still show list: ')
    print(still_show_list)
    print('new show list: ')
    print(new_show_list)
    '''
    for index in range(4):
        if index in hide_list:
            if slice_list[index] != '':
                print('Hide index: ' + str(index))
                Hide(slice_list[index], renderView1)
                Hide(vti_list[index], renderView1)
        elif index in still_show_list:
            cur_channel = vti_name_list[index].split('_')[3]
            preset_tf = 'SciVis2018_' + cur_channel + '_' + tf_number[cur_channel]
            if len(hide_list) < 3 and phi != -1:
                if cur_channel == 'prs':
                    preset_tf = 'SciVis2018_prs_a'
                elif cur_channel == 'tev':
                    preset_tf = 'SciVis2018_tev_a'
            if len(hide_list) < 3 and phi == -1:
                force_tf_opacity = True
            else:
                force_tf_opacity = False
            refresh_tf(index, cur_channel, preset_tf, phi, force_tf_opacity)

def refresh_tf(index, channel, tf, phi, force_tf_opacity):
    if phi == -1:
        Show(slice_list[index], renderView1)
        Hide(vti_list[index], renderView1)
        # set transfer function
        ColorBy(sliceDisplay_list[index], ('POINTS', channel))
        LUT_list[index] = GetColorTransferFunction(channel)
        LUT_list[index].ApplyPreset(tf, True)
        LUT_list[index].RescaleTransferFunction(tf_scale[channel][0], tf_scale[channel][1])
        PWF_list[index] = GetOpacityTransferFunction(channel)
        PWF_list[index].ApplyPreset(tf, True)
        PWF_list[index].RescaleTransferFunction(tf_scale[channel][0], tf_scale[channel][1])
        if tf_log[channel] == True:
            LUT_list[index].MapControlPointsToLogSpace()
            LUT_list[index].UseLogScale = 1
            PWF_list[index].MapControlPointsToLogSpace()
        else:
            LUT_list[index].MapControlPointsToLinearSpace()
            LUT_list[index].UseLogScale = 0
            PWF_list[index].MapControlPointsToLinearSpace()
        print(channel + ' opacity ' + str(tf_opacity[channel]))
        if force_tf_opacity == True:
            LUT_list[index].EnableOpacityMapping = True
        else:
            LUT_list[index].EnableOpacityMapping = tf_opacity[channel]
    else:
        Show(vti_list[index], renderView1)
        Hide(slice_list[index], renderView1)
        # set transfer function
        ColorBy(vtiDisplay_list[index], ('POINTS', channel))
        LUT_list[index] = GetColorTransferFunction(channel)
        LUT_list[index].ApplyPreset(tf, True)
        LUT_list[index].RescaleTransferFunction(tf_scale[channel][0], tf_scale[channel][1])
        PWF_list[index] = GetOpacityTransferFunction(channel)
        PWF_list[index].ApplyPreset(tf, True)
        PWF_list[index].RescaleTransferFunction(tf_scale[channel][0], tf_scale[channel][1])
        if tf_log[channel] == True:
            LUT_list[index].MapControlPointsToLogSpace()
            LUT_list[index].UseLogScale = 1
            PWF_list[index].MapControlPointsToLogSpace()
        else:
            LUT_list[index].MapControlPointsToLinearSpace()
            LUT_list[index].UseLogScale = 0
            PWF_list[index].MapControlPointsToLinearSpace()
    # hide color bar/color legend
    sliceDisplay_list[index].SetScalarBarVisibility(renderView1, False)

def take_screenshot(phi, theta, is_yA32, scale, dstdir, filename):
    if phi == -1:
        renderView1.InteractionMode = '2D'
        if is_yA32 == True:
            renderView1.CameraPosition = [600000.0, 900000.0, 10403339.532062015]
            renderView1.CameraFocalPoint = [600000.0, 900000.0, -6.3999800659075845e-06]
        else:
            renderView1.CameraPosition = [0.0, 900000.0, 10403339.532062015]
            renderView1.CameraFocalPoint = [0.0, 900000.0, -6.3999800659075845e-06]
        renderView1.CameraParallelScale = 1600000 / scale
    else:
        x = 0
        y = 900000
        z = 0
        r = volume_size / scale
        phi_r = phi / 180.0 * math.pi
        theta_r = theta / 180.0 * math.pi
        if is_yA32 == True:
            x = 600000
        renderView1.InteractionMode = '3D'
        renderView1.CameraPosition = [x + r * math.cos(phi_r) * math.cos(theta_r), y + r * math.sin(phi_r), z + r * math.cos(phi_r) * math.sin(theta_r)]
        renderView1.CameraFocalPoint = [x, y, z]
        renderView1.CameraViewUp = [0.0, 1.0, 0.0]
        renderView1.CameraParallelScale = 2947880.594596735
    dstFile = dstdir + filename + '.jpg'
    SaveScreenshot(dstFile, renderView1, OverrideColorPalette='BlackBackground')

def get_rendering_result_channel():
    global stack_image_cnt
    global srcfile_path
    global srcfile_path_old
    global renderView1

    #### disable automatic camera reset on 'Show'
    paraview.simple._DisableFirstRenderCameraReset()
    # get active view
    renderView1.ViewSize = [720, 480]

    while True:
        if stack_image_cnt <= 0:
            time.sleep(0.005)
            continue
        
        str_in = image_path_stack.pop()
        # print('start rendering ' + str_in)
        # str_in = input('Please input parameters:\n')
        # str_in = 'simulation,resolution,scalar,channel,timestep,phi,theta'
        # phi == -1: slice
        str_in_list = str_in.split(',')
        simulation = str_in.split(',')[0]
        resolution = str_in.split(',')[1]
        scalar = str_in.split(',')[2]
        channel = str_in.split(',')[3]
        timestep = str_in.split(',')[4]
        phi = int(str_in.split(',')[5])
        if len(str_in_list) == 7:
            theta = int(str_in.split(',')[6].split('\n')[0])
        elif len(str_in_list) == 8:
            theta = int(str_in.split(',')[6])
            scale = float(str_in.split(',')[7].split('\n')[0])
        else:
            print('Syntax error: Wrong input!')
        
        volume_dir = '/data/' + simulation + '_' + resolution + '_' + scalar
        view_dir = '/view_output/'
        dst_dir = directory + view_dir
        if os.path.exists(dst_dir) == False:
            os.makedirs(dst_dir)
        is_yA32 = False
        
        if simulation == '-1': # exit pvpython
            break
        elif simulation == 'yA32':
            is_yA32 = True
        if phi == -1:
            theta = 0
        
        cur_file = ""
        if os.path.exists(directory_vol + volume_dir):
            find_file = False
            for file in os.listdir(directory_vol + volume_dir):
                if timestep in file:
                    cur_file = file
                    find_file = True
                    break		
            if find_file == False:
                print('Path error: File does not exist')
                stack_image_cnt -= 1
                continue
        else:
            print('Path error: Directory does not exist')
            stack_image_cnt -= 1
            continue
        
        # file_name = file.split('.')[0]
        file_name = simulation + '_' + resolution + '_' + scalar + '_' + channel + '_' + timestep + '_' + str(phi) + '_' + str(theta) + '_' + str(scale)
        file_kind = file.split('.')[1]

        if channel in list(tf_number.keys()):
            preset_tf = 'SciVis2018_' + channel + '_' + tf_number[channel]
            srcfile_path_old = srcfile_path
            srcfile_path = directory + volume_dir + '/' + cur_file
            
            get_view(srcfile_path, file_name, dst_dir, volume_size, channel, preset_tf, view_size, phi, theta, is_yA32, scale)
            finished_image_list.append(str_in)
            stack_image_cnt -= 1
            # print('finish rendering ' + str_in)
        else:
            # print('channel = ' + channel)
            file_name_list = []
            for i in range(min(len(channel), 4)):
                if channel[i] == '1':
                    file_name_list.append(simulation + '_' + resolution + '_' + scalar + '_' + CHANNEL_LIST[i] + '_' + timestep)
            # print(file_name_list)
            file_name_list_copy = copy.deepcopy(file_name_list)
            unused_index = [0, 1, 2, 3]
            hide_list = [0, 1, 2, 3]
            still_show_list = []
            new_show_list = []
            for file_name_elem in file_name_list:
                if file_name_elem in vti_name_list:
                    used_index = vti_name_list.index(file_name_elem)
                    still_show_list.append(used_index)
                    hide_list.remove(used_index)
                    unused_index.remove(used_index)
                    file_name_list_copy.remove(file_name_elem)
            itempos = 0
            for item in file_name_list_copy:
                vti_name_list[unused_index[itempos]] = item
                new_show_list.append(unused_index[itempos])
                hide_list.remove(unused_index[itempos])
                print('need render in pos ' + str(unused_index[itempos]) + ' : ' + item)
                # render vti_name_list[unused_index[itempos]] in vti_list[unused_index[itempos]] and set TF
                srcfile_path = directory_vol + volume_dir + '/' + cur_file
                cur_channel = item.split('_')[3]
                print('Cur channel = ' + cur_channel)
                preset_tf = 'SciVis2018_' + cur_channel + '_' + tf_number[cur_channel]
                if len(file_name_list) > 1 and phi != -1:
                    if cur_channel == 'prs':
                        preset_tf = 'SciVis2018_prs_a'
                    elif cur_channel == 'tev':
                        preset_tf = 'SciVis2018_tev_a'
                if len(file_name_list) > 1 and phi == -1:
                    force_tf_opacity = True
                else:
                    force_tf_opacity = False
                open_render_view(unused_index[itempos], srcfile_path, cur_channel, preset_tf, phi, force_tf_opacity)
                # get_view(srcfile_path, filename, dstdir, side, channel, tf, view_size, phi, theta, is_yA32, scale)
                itempos += 1
            
            # show-hide the rest displays in vti_list
            print('Change rest displays show/hide.')
            show_hide_vti(hide_list, still_show_list, new_show_list, phi)

            # take screenshot
            # print('Taking screenshot...')
            take_screenshot(phi, theta, is_yA32, scale, dst_dir, file_name)
            # print('Taking screenshot done.')

            finished_image_list.append(str_in)
            stack_image_cnt -= 1

@app.route('/')
def myinit():
    return 'Oops!'

@app.route('/get_image_scale')
def get_image_scale():
    global stack_image_cnt
    global access_time_list

    start = time.time()
    
    if request.args.get('test') == '0':
        # load url request
        simulation = request.args.get('simulation')
        resolution = request.args.get('resolution')
        scalar = request.args.get('scalar')
        channel = request.args.get('channel')
        timestep = request.args.get('timestep')
        phi = request.args.get('phi')
        theta = request.args.get('theta')
        scale = float(request.args.get('scale'))
        if (scale < 0.2):
            scale = 0.2
        elif (scale > 3.0):
            scale = 3.0
        scale = str(scale)
        if int(phi) == -1:
            theta = '0'
        
        str_out = simulation + ',' + resolution + ',' + scalar + ',' + channel + ',' + timestep + ',' + phi + ',' + theta + ',' + scale
        filename = simulation + '_' + resolution + '_' + scalar + '_' + channel + '_' + timestep + '_' + phi + '_' + theta + '_' + scale + '.jpg'

        # file already cached
        if os.path.exists(directory + '/view_output/' + filename):
            print('File cached: ' + filename)
            if filename in access_time_list:
                access_time_list.remove(filename)
            access_time_list.append(filename)
            end = time.time()
            print('time: ' + str(end - start) + 's')
            return send_file(directory + '/view_output/' + filename, mimetype = 'image/jpg')
        
        # file is keyframe
        if os.path.exists(directory + '/view_keyframe/' + filename):
            print('File cached in keyframe: ' + filename)
            if filename in access_time_list:
                access_time_list.remove(filename)
            access_time_list.append(filename)
            end = time.time()
            print('time: ' + str(end - start) + 's')
            return send_file(directory + '/view_keyframe/' + filename, mimetype = 'image/jpg')

        # file not cached yet, push the request in stack
        image_path_stack.push(str_out)
        stack_image_cnt += 1
        # print('put ' + str_out)

        while True:
            if str_out in finished_image_list:
                finished_image_list.remove(str_out)
                access_time_list.append(filename)
                break
            if (time.time() - start) > 600: # request timeout
                # image_path_stack.remove(str_out)
                # finished_image_list.remove(str_out)
                print('Time out: ' + filename)
                filename = 'black.jpeg'
                break
            time.sleep(0.005)
        
        # print('get ' + str_out)
    else:
        print('Test mode.')
        filename = 'test.jpeg'
    
    end = time.time()
    print('time: ' + str(end - start) + 's')
        
    return send_file(directory + '/view_output/' + filename, mimetype = 'image/jpg')

def clean_cached_file():
    global access_time_list
    # global access_time_log
    WRITE_FILE_PERIOD = 100
    write_file_cnt = 0

    while True:
        if len(access_time_list) > ACCESS_TIME_LIST_MAX:
            print('Start cleaning...')
            for i in range(len(access_time_list) - ACCESS_TIME_LIST_MAX):
                cached_file = access_time_list.pop(0)
                # print(cached_file)
                if os.path.exists(directory + '/view_output/' + cached_file):
                    os.remove(directory + '/view_output/' + cached_file)
            print('End cleaning.')
            # print(access_time_list)
        
        write_file_cnt += 1

        if write_file_cnt >= WRITE_FILE_PERIOD:
            print('Start saving log...')
            access_time_log_new = open(directory + '/log_new.txt', 'w')
            write_file_cnt = 0
            for item in access_time_list:
                access_time_log_new.write(item + '\n')
            access_time_log_new.close()
            print('Saving ended.')

        time.sleep(20)

def load_access_time():
    global access_time_list
    for line in access_time_log:
        access_time_list.append(line.split('\n')[0])
    # print(access_time_list)

if __name__ == '__main__':
    t_rendering = threading.Thread(target = get_rendering_result_channel)
    t_rendering.start()
    print('Theard started: get_rendering_result_channel')

    import_preset_tf()
    print('Transfer functions preloaded.')

    load_access_time()
    print('Cached file access time loaded.')

    t_clean = threading.Thread(target = clean_cached_file)
    t_clean.start()
    print('Thread started: clean_cached_file')

    app.run(host = '0.0.0.0', port = 1357)
