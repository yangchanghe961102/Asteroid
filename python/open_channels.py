# trace generated using paraview version 5.5.2

#### import the simple module from the paraview
from paraview.simple import *
#### disable automatic camera reset on 'Show'
paraview.simple._DisableFirstRenderCameraReset()

# create a new 'XML Image Data Reader'
pv_insitu_300x300x300_16118vti = XMLImageDataReader(FileName=['/home/happyfun/SciVis.Contest/data/yA31_300_four/pv_insitu_300x300x300_16118.vti'])
pv_insitu_300x300x300_16118vti.CellArrayStatus = ['vtkGhostType']
pv_insitu_300x300x300_16118vti.PointArrayStatus = ['prs', 'rho', 'tev', 'v02', 'v03', 'vtkValidPointMask', 'vtkGhostType']

# get active view
renderView1 = GetActiveViewOrCreate('RenderView')
# uncomment following to set a specific view size
# renderView1.ViewSize = [755, 736]

# show data in view
pv_insitu_300x300x300_16118vtiDisplay = Show(pv_insitu_300x300x300_16118vti, renderView1)

# trace defaults for the display properties.
pv_insitu_300x300x300_16118vtiDisplay.Representation = 'Outline'
pv_insitu_300x300x300_16118vtiDisplay.ColorArrayName = [None, '']
pv_insitu_300x300x300_16118vtiDisplay.OSPRayScaleArray = 'prs'
pv_insitu_300x300x300_16118vtiDisplay.OSPRayScaleFunction = 'PiecewiseFunction'
pv_insitu_300x300x300_16118vtiDisplay.SelectOrientationVectors = 'None'
pv_insitu_300x300x300_16118vtiDisplay.ScaleFactor = 460000.0000115
pv_insitu_300x300x300_16118vtiDisplay.SelectScaleArray = 'None'
pv_insitu_300x300x300_16118vtiDisplay.GlyphType = 'Arrow'
pv_insitu_300x300x300_16118vtiDisplay.GlyphTableIndexArray = 'None'
pv_insitu_300x300x300_16118vtiDisplay.GaussianRadius = 23000.000000575
pv_insitu_300x300x300_16118vtiDisplay.SetScaleArray = ['POINTS', 'prs']
pv_insitu_300x300x300_16118vtiDisplay.ScaleTransferFunction = 'PiecewiseFunction'
pv_insitu_300x300x300_16118vtiDisplay.OpacityArray = ['POINTS', 'prs']
pv_insitu_300x300x300_16118vtiDisplay.OpacityTransferFunction = 'PiecewiseFunction'
pv_insitu_300x300x300_16118vtiDisplay.DataAxesGrid = 'GridAxesRepresentation'
pv_insitu_300x300x300_16118vtiDisplay.SelectionCellLabelFontFile = ''
pv_insitu_300x300x300_16118vtiDisplay.SelectionPointLabelFontFile = ''
pv_insitu_300x300x300_16118vtiDisplay.PolarAxes = 'PolarAxesRepresentation'
pv_insitu_300x300x300_16118vtiDisplay.ScalarOpacityUnitDistance = 19718.26484709151
pv_insitu_300x300x300_16118vtiDisplay.Slice = 149

# init the 'PiecewiseFunction' selected for 'ScaleTransferFunction'
pv_insitu_300x300x300_16118vtiDisplay.ScaleTransferFunction.Points = [33951.43359375, 0.0, 0.5, 0.0, 1329970048.0, 1.0, 0.5, 0.0]

# init the 'PiecewiseFunction' selected for 'OpacityTransferFunction'
pv_insitu_300x300x300_16118vtiDisplay.OpacityTransferFunction.Points = [33951.43359375, 0.0, 0.5, 0.0, 1329970048.0, 1.0, 0.5, 0.0]

# init the 'GridAxesRepresentation' selected for 'DataAxesGrid'
pv_insitu_300x300x300_16118vtiDisplay.DataAxesGrid.XTitleFontFile = ''
pv_insitu_300x300x300_16118vtiDisplay.DataAxesGrid.YTitleFontFile = ''
pv_insitu_300x300x300_16118vtiDisplay.DataAxesGrid.ZTitleFontFile = ''
pv_insitu_300x300x300_16118vtiDisplay.DataAxesGrid.XLabelFontFile = ''
pv_insitu_300x300x300_16118vtiDisplay.DataAxesGrid.YLabelFontFile = ''
pv_insitu_300x300x300_16118vtiDisplay.DataAxesGrid.ZLabelFontFile = ''

# init the 'PolarAxesRepresentation' selected for 'PolarAxes'
pv_insitu_300x300x300_16118vtiDisplay.PolarAxes.PolarAxisTitleFontFile = ''
pv_insitu_300x300x300_16118vtiDisplay.PolarAxes.PolarAxisLabelFontFile = ''
pv_insitu_300x300x300_16118vtiDisplay.PolarAxes.LastRadialAxisTextFontFile = ''
pv_insitu_300x300x300_16118vtiDisplay.PolarAxes.SecondaryRadialAxesTextFontFile = ''

# reset view to fit data
renderView1.ResetCamera()

# update the view to ensure updated data information
renderView1.Update()

# set scalar coloring
ColorBy(pv_insitu_300x300x300_16118vtiDisplay, ('POINTS', 'prs'))

# rescale color and/or opacity maps used to include current data range
pv_insitu_300x300x300_16118vtiDisplay.RescaleTransferFunctionToDataRange(True, False)

# show color bar/color legend
pv_insitu_300x300x300_16118vtiDisplay.SetScalarBarVisibility(renderView1, True)

# get color transfer function/color map for 'prs'
prsLUT = GetColorTransferFunction('prs')

# change representation type
pv_insitu_300x300x300_16118vtiDisplay.SetRepresentationType('Volume')

# Apply a preset using its name. Note this may not work as expected when presets have duplicate names.
prsLUT.ApplyPreset('SciVis2018_prs_a', True)

# get opacity transfer function/opacity map for 'prs'
prsPWF = GetOpacityTransferFunction('prs')

# Apply a preset using its name. Note this may not work as expected when presets have duplicate names.
prsPWF.ApplyPreset('SciVis2018_prs_a', True)

# create a new 'Slice'
slice1 = Slice(Input=pv_insitu_300x300x300_16118vti)
slice1.SliceType = 'Plane'
slice1.SliceOffsetValues = [0.0]

# init the 'Plane' selected for 'SliceType'
slice1.SliceType.Origin = [5.7499855756759644e-05, 900000.0000024999, -6.400048732757568e-06]

# toggle 3D widget visibility (only when running from the GUI)
Hide3DWidgets(proxy=slice1.SliceType)

# create a new 'XML Image Data Reader'
pv_insitu_300x300x300_16118vti_1 = XMLImageDataReader(FileName=['/home/happyfun/SciVis.Contest/data/yA31_300_four/pv_insitu_300x300x300_16118.vti'])
pv_insitu_300x300x300_16118vti_1.CellArrayStatus = ['vtkGhostType']
pv_insitu_300x300x300_16118vti_1.PointArrayStatus = ['prs', 'rho', 'tev', 'v02', 'v03', 'vtkValidPointMask', 'vtkGhostType']

# show data in view
pv_insitu_300x300x300_16118vti_1Display = Show(pv_insitu_300x300x300_16118vti_1, renderView1)

# trace defaults for the display properties.
pv_insitu_300x300x300_16118vti_1Display.Representation = 'Outline'
pv_insitu_300x300x300_16118vti_1Display.ColorArrayName = [None, '']
pv_insitu_300x300x300_16118vti_1Display.OSPRayScaleArray = 'prs'
pv_insitu_300x300x300_16118vti_1Display.OSPRayScaleFunction = 'PiecewiseFunction'
pv_insitu_300x300x300_16118vti_1Display.SelectOrientationVectors = 'None'
pv_insitu_300x300x300_16118vti_1Display.ScaleFactor = 460000.0000115
pv_insitu_300x300x300_16118vti_1Display.SelectScaleArray = 'None'
pv_insitu_300x300x300_16118vti_1Display.GlyphType = 'Arrow'
pv_insitu_300x300x300_16118vti_1Display.GlyphTableIndexArray = 'None'
pv_insitu_300x300x300_16118vti_1Display.GaussianRadius = 23000.000000575
pv_insitu_300x300x300_16118vti_1Display.SetScaleArray = ['POINTS', 'prs']
pv_insitu_300x300x300_16118vti_1Display.ScaleTransferFunction = 'PiecewiseFunction'
pv_insitu_300x300x300_16118vti_1Display.OpacityArray = ['POINTS', 'prs']
pv_insitu_300x300x300_16118vti_1Display.OpacityTransferFunction = 'PiecewiseFunction'
pv_insitu_300x300x300_16118vti_1Display.DataAxesGrid = 'GridAxesRepresentation'
pv_insitu_300x300x300_16118vti_1Display.SelectionCellLabelFontFile = ''
pv_insitu_300x300x300_16118vti_1Display.SelectionPointLabelFontFile = ''
pv_insitu_300x300x300_16118vti_1Display.PolarAxes = 'PolarAxesRepresentation'
pv_insitu_300x300x300_16118vti_1Display.ScalarOpacityUnitDistance = 19718.26484709151
pv_insitu_300x300x300_16118vti_1Display.Slice = 149

# init the 'PiecewiseFunction' selected for 'ScaleTransferFunction'
pv_insitu_300x300x300_16118vti_1Display.ScaleTransferFunction.Points = [33951.43359375, 0.0, 0.5, 0.0, 1329970048.0, 1.0, 0.5, 0.0]

# init the 'PiecewiseFunction' selected for 'OpacityTransferFunction'
pv_insitu_300x300x300_16118vti_1Display.OpacityTransferFunction.Points = [33951.43359375, 0.0, 0.5, 0.0, 1329970048.0, 1.0, 0.5, 0.0]

# init the 'GridAxesRepresentation' selected for 'DataAxesGrid'
pv_insitu_300x300x300_16118vti_1Display.DataAxesGrid.XTitleFontFile = ''
pv_insitu_300x300x300_16118vti_1Display.DataAxesGrid.YTitleFontFile = ''
pv_insitu_300x300x300_16118vti_1Display.DataAxesGrid.ZTitleFontFile = ''
pv_insitu_300x300x300_16118vti_1Display.DataAxesGrid.XLabelFontFile = ''
pv_insitu_300x300x300_16118vti_1Display.DataAxesGrid.YLabelFontFile = ''
pv_insitu_300x300x300_16118vti_1Display.DataAxesGrid.ZLabelFontFile = ''

# init the 'PolarAxesRepresentation' selected for 'PolarAxes'
pv_insitu_300x300x300_16118vti_1Display.PolarAxes.PolarAxisTitleFontFile = ''
pv_insitu_300x300x300_16118vti_1Display.PolarAxes.PolarAxisLabelFontFile = ''
pv_insitu_300x300x300_16118vti_1Display.PolarAxes.LastRadialAxisTextFontFile = ''
pv_insitu_300x300x300_16118vti_1Display.PolarAxes.SecondaryRadialAxesTextFontFile = ''

# Properties modified on slice1.SliceType
slice1.SliceType.Normal = [0.0, 0.0, 1.0]

# Properties modified on slice1.SliceType
slice1.SliceType.Normal = [0.0, 0.0, 1.0]

# show data in view
slice1Display = Show(slice1, renderView1)

# trace defaults for the display properties.
slice1Display.Representation = 'Surface'
slice1Display.ColorArrayName = ['POINTS', 'prs']
slice1Display.LookupTable = prsLUT
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

# show color bar/color legend
slice1Display.SetScalarBarVisibility(renderView1, True)

# update the view to ensure updated data information
renderView1.Update()

# set scalar coloring
ColorBy(pv_insitu_300x300x300_16118vti_1Display, ('POINTS', 'tev'))

# rescale color and/or opacity maps used to include current data range
pv_insitu_300x300x300_16118vti_1Display.RescaleTransferFunctionToDataRange(True, False)

# show color bar/color legend
pv_insitu_300x300x300_16118vti_1Display.SetScalarBarVisibility(renderView1, True)

# get color transfer function/color map for 'tev'
tevLUT = GetColorTransferFunction('tev')

# change representation type
pv_insitu_300x300x300_16118vti_1Display.SetRepresentationType('Volume')

# Apply a preset using its name. Note this may not work as expected when presets have duplicate names.
tevLUT.ApplyPreset('SciVis2018_tev_a', True)

# get opacity transfer function/opacity map for 'tev'
tevPWF = GetOpacityTransferFunction('tev')

# Apply a preset using its name. Note this may not work as expected when presets have duplicate names.
tevPWF.ApplyPreset('SciVis2018_tev_a', True)

# create a new 'Slice'
slice2 = Slice(Input=pv_insitu_300x300x300_16118vti_1)
slice2.SliceType = 'Plane'
slice2.SliceOffsetValues = [0.0]

# init the 'Plane' selected for 'SliceType'
slice2.SliceType.Origin = [5.7499855756759644e-05, 900000.0000024999, -6.400048732757568e-06]

# toggle 3D widget visibility (only when running from the GUI)
Hide3DWidgets(proxy=slice2.SliceType)

# Properties modified on slice2.SliceType
slice2.SliceType.Normal = [0.0, 0.0, 1.0]

# Properties modified on slice2.SliceType
slice2.SliceType.Normal = [0.0, 0.0, 1.0]

# show data in view
slice2Display = Show(slice2, renderView1)

# trace defaults for the display properties.
slice2Display.Representation = 'Surface'
slice2Display.ColorArrayName = ['POINTS', 'tev']
slice2Display.LookupTable = tevLUT
slice2Display.OSPRayScaleArray = 'prs'
slice2Display.OSPRayScaleFunction = 'PiecewiseFunction'
slice2Display.SelectOrientationVectors = 'None'
slice2Display.ScaleFactor = 460000.0
slice2Display.SelectScaleArray = 'None'
slice2Display.GlyphType = 'Arrow'
slice2Display.GlyphTableIndexArray = 'None'
slice2Display.GaussianRadius = 23000.0
slice2Display.SetScaleArray = ['POINTS', 'prs']
slice2Display.ScaleTransferFunction = 'PiecewiseFunction'
slice2Display.OpacityArray = ['POINTS', 'prs']
slice2Display.OpacityTransferFunction = 'PiecewiseFunction'
slice2Display.DataAxesGrid = 'GridAxesRepresentation'
slice2Display.SelectionCellLabelFontFile = ''
slice2Display.SelectionPointLabelFontFile = ''
slice2Display.PolarAxes = 'PolarAxesRepresentation'

# init the 'PiecewiseFunction' selected for 'ScaleTransferFunction'
slice2Display.ScaleTransferFunction.Points = [33951.4375, 0.0, 0.5, 0.0, 1329900288.0, 1.0, 0.5, 0.0]

# init the 'PiecewiseFunction' selected for 'OpacityTransferFunction'
slice2Display.OpacityTransferFunction.Points = [33951.4375, 0.0, 0.5, 0.0, 1329900288.0, 1.0, 0.5, 0.0]

# init the 'GridAxesRepresentation' selected for 'DataAxesGrid'
slice2Display.DataAxesGrid.XTitleFontFile = ''
slice2Display.DataAxesGrid.YTitleFontFile = ''
slice2Display.DataAxesGrid.ZTitleFontFile = ''
slice2Display.DataAxesGrid.XLabelFontFile = ''
slice2Display.DataAxesGrid.YLabelFontFile = ''
slice2Display.DataAxesGrid.ZLabelFontFile = ''

# init the 'PolarAxesRepresentation' selected for 'PolarAxes'
slice2Display.PolarAxes.PolarAxisTitleFontFile = ''
slice2Display.PolarAxes.PolarAxisLabelFontFile = ''
slice2Display.PolarAxes.LastRadialAxisTextFontFile = ''
slice2Display.PolarAxes.SecondaryRadialAxesTextFontFile = ''

# show color bar/color legend
slice2Display.SetScalarBarVisibility(renderView1, True)

# update the view to ensure updated data information
renderView1.Update()

# hide data in view
Hide(slice1, renderView1)

# hide data in view
Hide(slice2, renderView1)

# create a new 'XML Image Data Reader'
pv_insitu_300x300x300_16118vti_2 = XMLImageDataReader(FileName=['/home/happyfun/SciVis.Contest/data/yA31_300_four/pv_insitu_300x300x300_16118.vti'])
pv_insitu_300x300x300_16118vti_2.CellArrayStatus = ['vtkGhostType']
pv_insitu_300x300x300_16118vti_2.PointArrayStatus = ['prs', 'rho', 'tev', 'v02', 'v03', 'vtkValidPointMask', 'vtkGhostType']

# show data in view
pv_insitu_300x300x300_16118vti_2Display = Show(pv_insitu_300x300x300_16118vti_2, renderView1)

# trace defaults for the display properties.
pv_insitu_300x300x300_16118vti_2Display.Representation = 'Outline'
pv_insitu_300x300x300_16118vti_2Display.ColorArrayName = [None, '']
pv_insitu_300x300x300_16118vti_2Display.OSPRayScaleArray = 'prs'
pv_insitu_300x300x300_16118vti_2Display.OSPRayScaleFunction = 'PiecewiseFunction'
pv_insitu_300x300x300_16118vti_2Display.SelectOrientationVectors = 'None'
pv_insitu_300x300x300_16118vti_2Display.ScaleFactor = 460000.0000115
pv_insitu_300x300x300_16118vti_2Display.SelectScaleArray = 'None'
pv_insitu_300x300x300_16118vti_2Display.GlyphType = 'Arrow'
pv_insitu_300x300x300_16118vti_2Display.GlyphTableIndexArray = 'None'
pv_insitu_300x300x300_16118vti_2Display.GaussianRadius = 23000.000000575
pv_insitu_300x300x300_16118vti_2Display.SetScaleArray = ['POINTS', 'prs']
pv_insitu_300x300x300_16118vti_2Display.ScaleTransferFunction = 'PiecewiseFunction'
pv_insitu_300x300x300_16118vti_2Display.OpacityArray = ['POINTS', 'prs']
pv_insitu_300x300x300_16118vti_2Display.OpacityTransferFunction = 'PiecewiseFunction'
pv_insitu_300x300x300_16118vti_2Display.DataAxesGrid = 'GridAxesRepresentation'
pv_insitu_300x300x300_16118vti_2Display.SelectionCellLabelFontFile = ''
pv_insitu_300x300x300_16118vti_2Display.SelectionPointLabelFontFile = ''
pv_insitu_300x300x300_16118vti_2Display.PolarAxes = 'PolarAxesRepresentation'
pv_insitu_300x300x300_16118vti_2Display.ScalarOpacityUnitDistance = 19718.26484709151
pv_insitu_300x300x300_16118vti_2Display.Slice = 149

# init the 'PiecewiseFunction' selected for 'ScaleTransferFunction'
pv_insitu_300x300x300_16118vti_2Display.ScaleTransferFunction.Points = [33951.43359375, 0.0, 0.5, 0.0, 1329970048.0, 1.0, 0.5, 0.0]

# init the 'PiecewiseFunction' selected for 'OpacityTransferFunction'
pv_insitu_300x300x300_16118vti_2Display.OpacityTransferFunction.Points = [33951.43359375, 0.0, 0.5, 0.0, 1329970048.0, 1.0, 0.5, 0.0]

# init the 'GridAxesRepresentation' selected for 'DataAxesGrid'
pv_insitu_300x300x300_16118vti_2Display.DataAxesGrid.XTitleFontFile = ''
pv_insitu_300x300x300_16118vti_2Display.DataAxesGrid.YTitleFontFile = ''
pv_insitu_300x300x300_16118vti_2Display.DataAxesGrid.ZTitleFontFile = ''
pv_insitu_300x300x300_16118vti_2Display.DataAxesGrid.XLabelFontFile = ''
pv_insitu_300x300x300_16118vti_2Display.DataAxesGrid.YLabelFontFile = ''
pv_insitu_300x300x300_16118vti_2Display.DataAxesGrid.ZLabelFontFile = ''

# init the 'PolarAxesRepresentation' selected for 'PolarAxes'
pv_insitu_300x300x300_16118vti_2Display.PolarAxes.PolarAxisTitleFontFile = ''
pv_insitu_300x300x300_16118vti_2Display.PolarAxes.PolarAxisLabelFontFile = ''
pv_insitu_300x300x300_16118vti_2Display.PolarAxes.LastRadialAxisTextFontFile = ''
pv_insitu_300x300x300_16118vti_2Display.PolarAxes.SecondaryRadialAxesTextFontFile = ''

# update the view to ensure updated data information
renderView1.Update()

# set scalar coloring
ColorBy(pv_insitu_300x300x300_16118vti_2Display, ('POINTS', 'v02'))

# rescale color and/or opacity maps used to include current data range
pv_insitu_300x300x300_16118vti_2Display.RescaleTransferFunctionToDataRange(True, False)

# show color bar/color legend
pv_insitu_300x300x300_16118vti_2Display.SetScalarBarVisibility(renderView1, True)

# get color transfer function/color map for 'v02'
v02LUT = GetColorTransferFunction('v02')

# change representation type
pv_insitu_300x300x300_16118vti_2Display.SetRepresentationType('Volume')

# Apply a preset using its name. Note this may not work as expected when presets have duplicate names.
v02LUT.ApplyPreset('SciVis2018_v02_4', True)

# get opacity transfer function/opacity map for 'v02'
v02PWF = GetOpacityTransferFunction('v02')

# Apply a preset using its name. Note this may not work as expected when presets have duplicate names.
v02PWF.ApplyPreset('SciVis2018_v02_4', True)

# create a new 'Slice'
slice3 = Slice(Input=pv_insitu_300x300x300_16118vti_2)
slice3.SliceType = 'Plane'
slice3.SliceOffsetValues = [0.0]

# init the 'Plane' selected for 'SliceType'
slice3.SliceType.Origin = [5.7499855756759644e-05, 900000.0000024999, -6.400048732757568e-06]

# toggle 3D widget visibility (only when running from the GUI)
Hide3DWidgets(proxy=slice3.SliceType)

# Properties modified on slice3.SliceType
slice3.SliceType.Normal = [0.0, 0.0, 1.0]

# Properties modified on slice3.SliceType
slice3.SliceType.Normal = [0.0, 0.0, 1.0]

# show data in view
slice3Display = Show(slice3, renderView1)

# trace defaults for the display properties.
slice3Display.Representation = 'Surface'
slice3Display.ColorArrayName = ['POINTS', 'v02']
slice3Display.LookupTable = v02LUT
slice3Display.OSPRayScaleArray = 'prs'
slice3Display.OSPRayScaleFunction = 'PiecewiseFunction'
slice3Display.SelectOrientationVectors = 'None'
slice3Display.ScaleFactor = 460000.0
slice3Display.SelectScaleArray = 'None'
slice3Display.GlyphType = 'Arrow'
slice3Display.GlyphTableIndexArray = 'None'
slice3Display.GaussianRadius = 23000.0
slice3Display.SetScaleArray = ['POINTS', 'prs']
slice3Display.ScaleTransferFunction = 'PiecewiseFunction'
slice3Display.OpacityArray = ['POINTS', 'prs']
slice3Display.OpacityTransferFunction = 'PiecewiseFunction'
slice3Display.DataAxesGrid = 'GridAxesRepresentation'
slice3Display.SelectionCellLabelFontFile = ''
slice3Display.SelectionPointLabelFontFile = ''
slice3Display.PolarAxes = 'PolarAxesRepresentation'

# init the 'PiecewiseFunction' selected for 'ScaleTransferFunction'
slice3Display.ScaleTransferFunction.Points = [33951.4375, 0.0, 0.5, 0.0, 1329900288.0, 1.0, 0.5, 0.0]

# init the 'PiecewiseFunction' selected for 'OpacityTransferFunction'
slice3Display.OpacityTransferFunction.Points = [33951.4375, 0.0, 0.5, 0.0, 1329900288.0, 1.0, 0.5, 0.0]

# init the 'GridAxesRepresentation' selected for 'DataAxesGrid'
slice3Display.DataAxesGrid.XTitleFontFile = ''
slice3Display.DataAxesGrid.YTitleFontFile = ''
slice3Display.DataAxesGrid.ZTitleFontFile = ''
slice3Display.DataAxesGrid.XLabelFontFile = ''
slice3Display.DataAxesGrid.YLabelFontFile = ''
slice3Display.DataAxesGrid.ZLabelFontFile = ''

# init the 'PolarAxesRepresentation' selected for 'PolarAxes'
slice3Display.PolarAxes.PolarAxisTitleFontFile = ''
slice3Display.PolarAxes.PolarAxisLabelFontFile = ''
slice3Display.PolarAxes.LastRadialAxisTextFontFile = ''
slice3Display.PolarAxes.SecondaryRadialAxesTextFontFile = ''

# show color bar/color legend
slice3Display.SetScalarBarVisibility(renderView1, True)

# update the view to ensure updated data information
renderView1.Update()

# hide data in view
Hide(slice3, renderView1)

# create a new 'XML Image Data Reader'
pv_insitu_300x300x300_16118vti_3 = XMLImageDataReader(FileName=['/home/happyfun/SciVis.Contest/data/yA31_300_four/pv_insitu_300x300x300_16118.vti'])
pv_insitu_300x300x300_16118vti_3.CellArrayStatus = ['vtkGhostType']
pv_insitu_300x300x300_16118vti_3.PointArrayStatus = ['prs', 'rho', 'tev', 'v02', 'v03', 'vtkValidPointMask', 'vtkGhostType']

# show data in view
pv_insitu_300x300x300_16118vti_3Display = Show(pv_insitu_300x300x300_16118vti_3, renderView1)

# trace defaults for the display properties.
pv_insitu_300x300x300_16118vti_3Display.Representation = 'Outline'
pv_insitu_300x300x300_16118vti_3Display.ColorArrayName = [None, '']
pv_insitu_300x300x300_16118vti_3Display.OSPRayScaleArray = 'prs'
pv_insitu_300x300x300_16118vti_3Display.OSPRayScaleFunction = 'PiecewiseFunction'
pv_insitu_300x300x300_16118vti_3Display.SelectOrientationVectors = 'None'
pv_insitu_300x300x300_16118vti_3Display.ScaleFactor = 460000.0000115
pv_insitu_300x300x300_16118vti_3Display.SelectScaleArray = 'None'
pv_insitu_300x300x300_16118vti_3Display.GlyphType = 'Arrow'
pv_insitu_300x300x300_16118vti_3Display.GlyphTableIndexArray = 'None'
pv_insitu_300x300x300_16118vti_3Display.GaussianRadius = 23000.000000575
pv_insitu_300x300x300_16118vti_3Display.SetScaleArray = ['POINTS', 'prs']
pv_insitu_300x300x300_16118vti_3Display.ScaleTransferFunction = 'PiecewiseFunction'
pv_insitu_300x300x300_16118vti_3Display.OpacityArray = ['POINTS', 'prs']
pv_insitu_300x300x300_16118vti_3Display.OpacityTransferFunction = 'PiecewiseFunction'
pv_insitu_300x300x300_16118vti_3Display.DataAxesGrid = 'GridAxesRepresentation'
pv_insitu_300x300x300_16118vti_3Display.SelectionCellLabelFontFile = ''
pv_insitu_300x300x300_16118vti_3Display.SelectionPointLabelFontFile = ''
pv_insitu_300x300x300_16118vti_3Display.PolarAxes = 'PolarAxesRepresentation'
pv_insitu_300x300x300_16118vti_3Display.ScalarOpacityUnitDistance = 19718.26484709151
pv_insitu_300x300x300_16118vti_3Display.Slice = 149

# init the 'PiecewiseFunction' selected for 'ScaleTransferFunction'
pv_insitu_300x300x300_16118vti_3Display.ScaleTransferFunction.Points = [33951.43359375, 0.0, 0.5, 0.0, 1329970048.0, 1.0, 0.5, 0.0]

# init the 'PiecewiseFunction' selected for 'OpacityTransferFunction'
pv_insitu_300x300x300_16118vti_3Display.OpacityTransferFunction.Points = [33951.43359375, 0.0, 0.5, 0.0, 1329970048.0, 1.0, 0.5, 0.0]

# init the 'GridAxesRepresentation' selected for 'DataAxesGrid'
pv_insitu_300x300x300_16118vti_3Display.DataAxesGrid.XTitleFontFile = ''
pv_insitu_300x300x300_16118vti_3Display.DataAxesGrid.YTitleFontFile = ''
pv_insitu_300x300x300_16118vti_3Display.DataAxesGrid.ZTitleFontFile = ''
pv_insitu_300x300x300_16118vti_3Display.DataAxesGrid.XLabelFontFile = ''
pv_insitu_300x300x300_16118vti_3Display.DataAxesGrid.YLabelFontFile = ''
pv_insitu_300x300x300_16118vti_3Display.DataAxesGrid.ZLabelFontFile = ''

# init the 'PolarAxesRepresentation' selected for 'PolarAxes'
pv_insitu_300x300x300_16118vti_3Display.PolarAxes.PolarAxisTitleFontFile = ''
pv_insitu_300x300x300_16118vti_3Display.PolarAxes.PolarAxisLabelFontFile = ''
pv_insitu_300x300x300_16118vti_3Display.PolarAxes.LastRadialAxisTextFontFile = ''
pv_insitu_300x300x300_16118vti_3Display.PolarAxes.SecondaryRadialAxesTextFontFile = ''

# update the view to ensure updated data information
renderView1.Update()

# set scalar coloring
ColorBy(pv_insitu_300x300x300_16118vti_3Display, ('POINTS', 'v03'))

# rescale color and/or opacity maps used to include current data range
pv_insitu_300x300x300_16118vti_3Display.RescaleTransferFunctionToDataRange(True, False)

# show color bar/color legend
pv_insitu_300x300x300_16118vti_3Display.SetScalarBarVisibility(renderView1, True)

# get color transfer function/color map for 'v03'
v03LUT = GetColorTransferFunction('v03')

# change representation type
pv_insitu_300x300x300_16118vti_3Display.SetRepresentationType('Surface With Edges')

# change representation type
pv_insitu_300x300x300_16118vti_3Display.SetRepresentationType('Volume')

# Apply a preset using its name. Note this may not work as expected when presets have duplicate names.
v03LUT.ApplyPreset('SciVis2018_v03_1', True)

# get opacity transfer function/opacity map for 'v03'
v03PWF = GetOpacityTransferFunction('v03')

# Apply a preset using its name. Note this may not work as expected when presets have duplicate names.
v03PWF.ApplyPreset('SciVis2018_v03_1', True)

# create a new 'Slice'
slice4 = Slice(Input=pv_insitu_300x300x300_16118vti_3)
slice4.SliceType = 'Plane'
slice4.SliceOffsetValues = [0.0]

# init the 'Plane' selected for 'SliceType'
slice4.SliceType.Origin = [5.7499855756759644e-05, 900000.0000024999, -6.400048732757568e-06]

# toggle 3D widget visibility (only when running from the GUI)
Hide3DWidgets(proxy=slice4.SliceType)

# Properties modified on slice4.SliceType
slice4.SliceType.Normal = [0.0, 0.0, 1.0]

# Properties modified on slice4.SliceType
slice4.SliceType.Normal = [0.0, 0.0, 1.0]

# show data in view
slice4Display = Show(slice4, renderView1)

# trace defaults for the display properties.
slice4Display.Representation = 'Surface'
slice4Display.ColorArrayName = ['POINTS', 'v03']
slice4Display.LookupTable = v03LUT
slice4Display.OSPRayScaleArray = 'prs'
slice4Display.OSPRayScaleFunction = 'PiecewiseFunction'
slice4Display.SelectOrientationVectors = 'None'
slice4Display.ScaleFactor = 460000.0
slice4Display.SelectScaleArray = 'None'
slice4Display.GlyphType = 'Arrow'
slice4Display.GlyphTableIndexArray = 'None'
slice4Display.GaussianRadius = 23000.0
slice4Display.SetScaleArray = ['POINTS', 'prs']
slice4Display.ScaleTransferFunction = 'PiecewiseFunction'
slice4Display.OpacityArray = ['POINTS', 'prs']
slice4Display.OpacityTransferFunction = 'PiecewiseFunction'
slice4Display.DataAxesGrid = 'GridAxesRepresentation'
slice4Display.SelectionCellLabelFontFile = ''
slice4Display.SelectionPointLabelFontFile = ''
slice4Display.PolarAxes = 'PolarAxesRepresentation'

# init the 'PiecewiseFunction' selected for 'ScaleTransferFunction'
slice4Display.ScaleTransferFunction.Points = [33951.4375, 0.0, 0.5, 0.0, 1329900288.0, 1.0, 0.5, 0.0]

# init the 'PiecewiseFunction' selected for 'OpacityTransferFunction'
slice4Display.OpacityTransferFunction.Points = [33951.4375, 0.0, 0.5, 0.0, 1329900288.0, 1.0, 0.5, 0.0]

# init the 'GridAxesRepresentation' selected for 'DataAxesGrid'
slice4Display.DataAxesGrid.XTitleFontFile = ''
slice4Display.DataAxesGrid.YTitleFontFile = ''
slice4Display.DataAxesGrid.ZTitleFontFile = ''
slice4Display.DataAxesGrid.XLabelFontFile = ''
slice4Display.DataAxesGrid.YLabelFontFile = ''
slice4Display.DataAxesGrid.ZLabelFontFile = ''

# init the 'PolarAxesRepresentation' selected for 'PolarAxes'
slice4Display.PolarAxes.PolarAxisTitleFontFile = ''
slice4Display.PolarAxes.PolarAxisLabelFontFile = ''
slice4Display.PolarAxes.LastRadialAxisTextFontFile = ''
slice4Display.PolarAxes.SecondaryRadialAxesTextFontFile = ''

# show color bar/color legend
slice4Display.SetScalarBarVisibility(renderView1, True)

# update the view to ensure updated data information
renderView1.Update()

# hide data in view
Hide(slice4, renderView1)

# set active source
SetActiveSource(slice4)

# show data in view
slice4Display = Show(slice4, renderView1)

# show color bar/color legend
slice4Display.SetScalarBarVisibility(renderView1, True)

# hide data in view
Hide(slice4, renderView1)

# Properties modified on renderView1
renderView1.Background = [0.0, 0.0, 0.0]

# current camera placement for renderView1
renderView1.CameraPosition = [0.0, 900000.0, 11389735.996549446]
renderView1.CameraFocalPoint = [0.0, 900000.0, 0.0]
renderView1.CameraParallelScale = 2947880.594596735

# save screenshot
SaveScreenshot('/home/happyfun/SciVis.Contest/screenshot/a.png', renderView1, ImageResolution=[755, 736])

#### saving camera placements for all active views

# current camera placement for renderView1
renderView1.CameraPosition = [0.0, 900000.0, 11389735.996549446]
renderView1.CameraFocalPoint = [0.0, 900000.0, 0.0]
renderView1.CameraParallelScale = 2947880.594596735

#### uncomment the following to render all views
# RenderAllViews()
# alternatively, if you want to write images, you can use SaveScreenshot(...).