# -*- coding: UTF8 -*-

from flask import Flask
from flask import send_file
from flask import request
from queue import Queue
from paraview.simple import *
import threading
import time
import math
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

directory = '/home/happyfun/SciVis.Contest'
point_num = 50
view_size = 512 # not used
volume_size = 11389736
scale = 1.0
srcfile_path = ''
srcfile_path_old = ''
renderView1 = GetActiveViewOrCreate('RenderView')

tf_scale = {'prs': [0, 1500000000], 'tev': [0.02, 0.7], 'v02': [0.0, 1.0], 'v03': [0.0, 1.0]}
tf_opacity = {'prs': 1, 'tev': 0, 'v02': 0, 'v03': 0}
tf_log = {'prs': False, 'tev': True, 'v02': False, 'v03': False}
tf_number = {'prs': '3', 'tev': '1', 'v02': '1', 'v03': '0'}

app = Flask(__name__)

def import_preset_tf():
    directory_tf = directory + '/TF/'
    for channel in tf_number:
        preset_tf = 'SciVis2018_' + str(channel) + '_' + tf_number[channel]
        ImportPresets(filename = directory_tf + preset_tf + '.json')

def getScreenshot(renderView1, dstdir, side, phi, theta, is_yA32, scale):
    x = 0
    y = 900000
    z = 0
    r = side / scale
    phi_r = phi / 180.0 * math.pi
    theta_r = theta / 180.0 * math.pi

    if is_yA32 == True:
        x = 600000

    # current camera placement for renderView1
    # renderView1.CameraPosition = [x + r * math.cos(phi_r) * math.cos(theta_r), y + r * math.cos(phi_r) * math.sin(theta_r), z + r * math.sin(phi_r)]
    renderView1.CameraPosition = [x + r * math.cos(phi_r) * math.cos(theta_r), y + r * math.sin(phi_r), z + r * math.cos(phi_r) * math.sin(theta_r)]
    renderView1.CameraFocalPoint = [x, y, z]
    renderView1.CameraViewUp = [0.0, 1.0, 0.0]
    # renderView1.CameraParallelScale = 1000000
    renderView1.CameraParallelScale = 2947880.594596735

def get_view(srcfile_path, filename, dstdir, side, channel, tf, view_size, phi, theta, is_yA32, scale):
    global srcfile_path_old
    global vti
    global slice1
    global vtiDisplay
    global slice1Display
    global renderView1

    # print('TF: ' + tf)
    # print('TF scale: ' + str(tf_scale[channel][0]) + ' ' + str(tf_scale[channel][1]))
    
    if srcfile_path != srcfile_path_old:
        # print('slice1' in globals())
        # print('vti' in globals())
        if 'slice1' in globals():
            Delete(slice1)
            del slice1
        if 'vti' in globals():
            Delete(vti)
            del vti

        # create a new 'XML Image Data Reader'
        vti = XMLImageDataReader(FileName=srcfile_path)
        vti.CellArrayStatus = ['vtkGhostType']
        vti.PointArrayStatus = ['prs', 'rho', 'tev', 'v02', 'v03', 'vtkValidPointMask', 'vtkGhostType']

        # show data in view
        vtiDisplay = Show(vti, renderView1)
        # trace defaults for the display properties.
        vtiDisplay.Representation = 'Volume'
        vtiDisplay.ColorArrayName = [None, '']
        vtiDisplay.OSPRayScaleArray = 'prs'
        vtiDisplay.OSPRayScaleFunction = 'PiecewiseFunction'
        vtiDisplay.SelectOrientationVectors = 'None'
        vtiDisplay.ScaleFactor = 460000.0000115
        vtiDisplay.SelectScaleArray = 'None'
        vtiDisplay.GlyphType = 'Arrow'
        vtiDisplay.GlyphTableIndexArray = 'None'
        vtiDisplay.GaussianRadius = 23000.000000575
        vtiDisplay.SetScaleArray = ['POINTS', 'prs']
        vtiDisplay.ScaleTransferFunction = 'PiecewiseFunction'
        vtiDisplay.OpacityArray = ['POINTS', 'prs']
        vtiDisplay.OpacityTransferFunction = 'PiecewiseFunction'
        vtiDisplay.DataAxesGrid = 'GridAxesRepresentation'
        vtiDisplay.SelectionCellLabelFontFile = ''
        vtiDisplay.SelectionPointLabelFontFile = ''
        vtiDisplay.PolarAxes = 'PolarAxesRepresentation'
        vtiDisplay.ScalarOpacityUnitDistance = 19718.26484709151
        vtiDisplay.Slice = 149
        
        # init the 'PiecewiseFunction' selected for 'ScaleTransferFunction'
        vtiDisplay.ScaleTransferFunction.Points = [21108.2890625, 0.0, 0.5, 0.0, 1099025792.0, 1.0, 0.5, 0.0]

        # init the 'PiecewiseFunction' selected for 'OpacityTransferFunction'
        vtiDisplay.OpacityTransferFunction.Points = [21108.2890625, 0.0, 0.5, 0.0, 1099025792.0, 1.0, 0.5, 0.0]

        # init the 'GridAxesRepresentation' selected for 'DataAxesGrid'
        vtiDisplay.DataAxesGrid.XTitleFontFile = ''
        vtiDisplay.DataAxesGrid.YTitleFontFile = ''
        vtiDisplay.DataAxesGrid.ZTitleFontFile = ''
        vtiDisplay.DataAxesGrid.XLabelFontFile = ''
        vtiDisplay.DataAxesGrid.YLabelFontFile = ''
        vtiDisplay.DataAxesGrid.ZLabelFontFile = ''

        # init the 'PolarAxesRepresentation' selected for 'PolarAxes'
        vtiDisplay.PolarAxes.PolarAxisTitleFontFile = ''
        vtiDisplay.PolarAxes.PolarAxisLabelFontFile = ''
        vtiDisplay.PolarAxes.LastRadialAxisTextFontFile = ''
        vtiDisplay.PolarAxes.SecondaryRadialAxesTextFontFile = ''

        # update the view to ensure updated data information
        renderView1.Update()

        # create a new 'Slice'
        slice1 = Slice(Input=vti)
        slice1.SliceType = 'Plane'
        slice1.SliceOffsetValues = [0.0]

        # init the 'Plane' selected for 'SliceType'
        slice1.SliceType.Origin = [5.7499855756759644e-05, 900000.0000024999, -6.400048732757568e-06]

        # toggle 3D widget visibility (only when running from the GUI)
        Hide3DWidgets(proxy=slice1.SliceType)

        # Properties modified on slice1.SliceType
        slice1.SliceType.Normal = [0.0, 0.0, 1.0]

        # show data in view
        slice1Display = Show(slice1, renderView1)

        # trace defaults for the display properties.
        slice1Display.Representation = 'Surface'
        slice1Display.ColorArrayName = [None, '']
        slice1Display.OSPRayScaleArray = 'prs'
        slice1Display.OSPRayScaleFunction = 'PiecewiseFunction'
        slice1Display.SelectOrientationVectors = 'None'
        slice1Display.ScaleFactor = 460000.0
        slice1Display.SelectScaleArray = 'None'
        slice1Display.GlyphType = 'Arrow'
        slice1Display.GlyphTableIndexArray = 'None'
        slice1Display.GaussianRadius = 23000.0
        slice1Display.SetScaleArray = ['POINTS', 'prs']
        slice1Display.ScaleTransferFunction = 'PiecewiseFunction'
        slice1Display.OpacityArray = ['POINTS', 'prs']
        slice1Display.OpacityTransferFunction = 'PiecewiseFunction'
        slice1Display.DataAxesGrid = 'GridAxesRepresentation'
        slice1Display.SelectionCellLabelFontFile = ''
        slice1Display.SelectionPointLabelFontFile = ''
        slice1Display.PolarAxes = 'PolarAxesRepresentation'

        # init the 'PiecewiseFunction' selected for 'ScaleTransferFunction'
        slice1Display.ScaleTransferFunction.Points = [33951.60546875, 0.0, 0.5, 0.0, 1098960128.0, 1.0, 0.5, 0.0]

        # init the 'PiecewiseFunction' selected for 'OpacityTransferFunction'
        slice1Display.OpacityTransferFunction.Points = [33951.60546875, 0.0, 0.5, 0.0, 1098960128.0, 1.0, 0.5, 0.0]

        # init the 'GridAxesRepresentation' selected for 'DataAxesGrid'
        slice1Display.DataAxesGrid.XTitleFontFile = ''
        slice1Display.DataAxesGrid.YTitleFontFile = ''
        slice1Display.DataAxesGrid.ZTitleFontFile = ''
        slice1Display.DataAxesGrid.XLabelFontFile = ''
        slice1Display.DataAxesGrid.YLabelFontFile = ''
        slice1Display.DataAxesGrid.ZLabelFontFile = ''

        # init the 'PolarAxesRepresentation' selected for 'PolarAxes'
        slice1Display.PolarAxes.PolarAxisTitleFontFile = ''
        slice1Display.PolarAxes.PolarAxisLabelFontFile = ''
        slice1Display.PolarAxes.LastRadialAxisTextFontFile = ''
        slice1Display.PolarAxes.SecondaryRadialAxesTextFontFile = ''

        # update the view to ensure updated data information
        renderView1.Update()

        # hide data in view
        Hide(vti, renderView1)

    if phi == -1:
        Show(slice1, renderView1)
        Hide(vti, renderView1)

        # set transfer function
        ColorBy(slice1Display, ('POINTS', channel))
        rhoLUT = GetColorTransferFunction(channel)
        rhoLUT.ApplyPreset(tf, True)
        rhoLUT.RescaleTransferFunction(tf_scale[channel][0], tf_scale[channel][1])
        rhoPWF = GetOpacityTransferFunction(channel)
        rhoPWF.ApplyPreset(tf, True)
        rhoPWF.RescaleTransferFunction(tf_scale[channel][0], tf_scale[channel][1])
        if tf_log[channel] == True:
            rhoLUT.MapControlPointsToLogSpace()
            rhoLUT.UseLogScale = 1
            rhoPWF.MapControlPointsToLogSpace()
        else:
            rhoLUT.MapControlPointsToLinearSpace()
            rhoLUT.UseLogScale = 0
            rhoPWF.MapControlPointsToLinearSpace()
        rhoLUT.EnableOpacityMapping = tf_opacity[channel]

        # hide color bar/color legend
        slice1Display.SetScalarBarVisibility(renderView1, False)
        # Properties modified on renderView1
        renderView1.OrientationAxesVisibility = 0

        # current camera placement for renderView1
        renderView1.InteractionMode = '2D'
        if is_yA32 == True:
            renderView1.CameraPosition = [600000.0, 900000.0, 10403339.532062015]
            renderView1.CameraFocalPoint = [600000.0, 900000.0, -6.3999800659075845e-06]
        else:
            renderView1.CameraPosition = [0.0, 900000.0, 10403339.532062015]
            renderView1.CameraFocalPoint = [0.0, 900000.0, -6.3999800659075845e-06]
        renderView1.CameraParallelScale = 1600000 / scale
    else:
        Show(vti, renderView1)
        Hide(slice1, renderView1)

        # set transfer function
        ColorBy(vtiDisplay, ('POINTS', channel))
        rhoLUT = GetColorTransferFunction(channel)
        rhoLUT.ApplyPreset(tf, True)
        rhoLUT.RescaleTransferFunction(tf_scale[channel][0], tf_scale[channel][1])
        rhoPWF = GetOpacityTransferFunction(channel)
        rhoPWF.ApplyPreset(tf, True)
        rhoPWF.RescaleTransferFunction(tf_scale[channel][0], tf_scale[channel][1])
        if tf_log[channel] == True:
            rhoLUT.MapControlPointsToLogSpace()
            rhoLUT.UseLogScale = 1
            rhoPWF.MapControlPointsToLogSpace()
        else:
            rhoLUT.MapControlPointsToLinearSpace()
            rhoLUT.UseLogScale = 0
            rhoPWF.MapControlPointsToLinearSpace()
        
        # hide color bar/color legend
        slice1Display.SetScalarBarVisibility(renderView1, False)
        # Properties modified on renderView1
        renderView1.OrientationAxesVisibility = 0

        renderView1.InteractionMode = '3D'
        getScreenshot(renderView1, dstdir, side, phi, theta, is_yA32, scale)
    
    # save screenshot
    dstFile = dstdir + filename + '.jpg'
    SaveScreenshot(dstFile, renderView1)
    # print('Save: ' + dstFile)

def get_rendering_result():
    global stack_image_cnt
    global srcfile_path
    global srcfile_path_old
    global renderView1

    print('Theard started: get_rendering_result')
    #### disable automatic camera reset on 'Show'
    paraview.simple._DisableFirstRenderCameraReset()
    # get active view
    # renderView1.ViewSize = [706, 467]
    renderView1.ViewSize = [720, 480]

    while True:
        if stack_image_cnt <= 0:
            time.sleep(0.01)
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

        preset_tf = 'SciVis2018_' + channel + '_' + tf_number[channel]
        volume_dir = '/data/' + simulation + '_' + resolution + '_' + scalar
        view_dir = '/view_output/'
        is_yA32 = False
        
        if simulation == '-1': # exit pvpython
            break
        elif simulation == 'yA32':
            is_yA32 = True

        if os.path.exists(directory + volume_dir):
            find_file = False
            for file in os.listdir(directory + volume_dir):
                if timestep in file:
                    find_file = True
                    break		
            if find_file == False:
                print('Path error: File does not exist')
                continue

            # file_name = file.split('.')[0]
            if phi == -1:
                theta = 0
            file_name = simulation + '_' + resolution + '_' + scalar + '_' + channel + '_' + timestep + '_' + str(phi) + '_' + str(theta) + '_' + str(scale)
            file_kind = file.split('.')[1]
            srcfile_path_old = srcfile_path
            srcfile_path = directory + volume_dir + '/' + file
            dst_dir = directory + view_dir
            if os.path.exists(dst_dir) == False:
                os.makedirs(dst_dir)
            
            get_view(srcfile_path, file_name, dst_dir, volume_size, channel, preset_tf, view_size, phi, theta, is_yA32, scale)
            finished_image_list.append(str_in)
            stack_image_cnt -= 1
            # print('finish rendering ' + str_in)
        else:
            print('Path error: Directory does not exist')
            continue

@app.route('/')
def myinit():
    return 'Oops!'

@app.route('/get_image')
def get_image():
    start = time.time()

    global stack_image_cnt
    if request.args.get('test') == '1':
        filename = 'try_flask/test.png'
    else:
        simulation = request.args.get('simulation')
        resolution = request.args.get('resolution')
        scalar = request.args.get('scalar')
        channel = request.args.get('channel')
        timestep = request.args.get('timestep')
        phi = request.args.get('phi')
        theta = request.args.get('theta')
        if int(phi) == -1:
            theta = '0'
        
        str_out = simulation + ',' + resolution + ',' + scalar + ',' + channel + ',' + timestep + ',' + phi + ',' + theta
        filename = 'view_output/' + simulation + '_' + resolution + '_' + scalar + '_' + channel + '_' + timestep + '_' + phi + '_' + theta + '.jpg'
        if os.path.exists(filename):
            print('File cached: ' + filename)
            return send_file(filename, mimetype = 'image/jpg')

        image_path_stack.push(str_out)
        rendered = False
        stack_image_cnt += 1
        # print('put ' + str_out)

        while rendered == False:
            for elem in finished_image_list:
                if elem == str_out:
                    finished_image_list.remove(str_out)
                    rendered = True
                    break
            time.sleep(0.01)
        
        # print('get ' + str_out)
    
    end = time.time()
    print('time: ' + str(end - start) + 's')
        
    return send_file(filename, mimetype = 'image/jpg')

@app.route('/get_image_scale')
def get_image_scale():
    start = time.time()

    global stack_image_cnt
    if request.args.get('test') == '1':
        filename = 'try_flask/test.png'
    else:
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
        filename = 'view_output/' + simulation + '_' + resolution + '_' + scalar + '_' + channel + '_' + timestep + '_' + phi + '_' + theta + '_' + scale + '.jpg'
        if os.path.exists(filename):
            print('File cached: ' + filename)
            return send_file(filename, mimetype = 'image/jpg')

        image_path_stack.push(str_out)
        rendered = False
        stack_image_cnt += 1
        # print('put ' + str_out)

        while rendered == False:
            for elem in finished_image_list:
                if elem == str_out:
                    finished_image_list.remove(str_out)
                    rendered = True
                    break
            time.sleep(0.01)
        
        # print('get ' + str_out)
    
    end = time.time()
    print('time: ' + str(end - start) + 's')
        
    return send_file(filename, mimetype = 'image/jpg')

if __name__ == '__main__':
    t = threading.Thread(target = get_rendering_result)
    t.start()

    import_preset_tf()
    print('Transfer Functions Preloaded.')

    app.run(host = '0.0.0.0', port = 80)