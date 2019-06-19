<<<<<<< HEAD
function load_compare_view(){
  var margin = {top: 20, right: 20, bottom: 20, left: 20 }
  var width = document.getElementById("compare_view").clientWidth - margin.left - margin.right
  var height = document.getElementById("compare_view").clientHeight - margin.top - margin.bottom
  //console.log("open js")
  var choose_dataset = []
  var svg = d3.select("#compare_view").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("class", "compare_svg")
      .attr("width", width)
      .attr("height", height)
      .attr("choose_dataset", choose_dataset)
}

function update_compare_view(data, simulation_name, resolution_name, scalar_name, channel_name, keyframe){
  var compare_svg = d3.select(".compare_svg")
  console.log(compare_svg)
  console.log(data)

  width = compare_svg.attr("width")
  height = compare_svg.attr("height")
  // console.log("the width is :" + width)
  // console.log("the height is :" + height)

  compare_svg.selectAll("g").remove()


  this_section = compare_svg.append("g")
    .attr("simulation", simulation_name)
    .attr("resolution", resolution_name)
    .attr("scalar", scalar_name)
    .attr("channel", channel_name)

  section_width = width
  section_height = height/2

  image_number = keyframe.length
  image_width = section_width/image_number
  image_height = section_height

  if (image_width > image_height * 3 / 2 )
  {
    image_width = image_height * 3 / 2
  }
  else {
    image_height = image_width * 2 / 3
  }

  image_spacing = ( section_width - image_number * image_width ) / (image_number - 1)
  image_top = (section_height - image_height)/2

  this_section.append("rect")
    .attr("width", section_width)
    .attr("height", section_height)


  this_section.selectAll("image")
    .data(keyframe)
    .enter()
    .append("image")
    .attr("phi", 0)
    .attr("theta", 90)
    .attr("scale", 1.0)
    .attr("timestep", function(d){
      return d.timestep
    })
    .attr("xlink:href",function(d){
      timestep = d.timestep
      phi = 0
      theta = 90
      scale = 1.0
      image_url = get_image_url(simulation_name, resolution_name, scalar_name, channel_name, timestep, phi, theta, scale)
      console.log(image_url)
      return image_url

    })
    .attr("width", image_width)
    .attr("height", image_height)
    .attr("x", function(d, i){
      return (image_width + image_spacing) * i
    })
    .attr("y", image_top)
    // .data()


  // this_section.append()


  // compare_svg

}

function get_image_url(simulation, resolution, scalar, channel, timestep, phi, theta, scale){
  return "http://192.168.40.13/get_image_scale?test=0&simulation=" + simulation + "&resolution=" + resolution + "&scalar=" + scalar + "&channel=" + channel + "&timestep=" + timestep + "&phi=" + phi + "&theta=" + theta + "&scale=" + scale

}
=======


function load_compare_view(){
  var margin = {top: 20, right: 20, bottom: 0, left: 20 }

  //console.log("open js")
  var choose_dataset = []

  var svg = d3.select(".compare_view")
  var width = parseFloat(svg.attr("width")) - margin.left - margin.right
  var height = parseFloat(svg.attr("height")) - margin.top - margin.bottom


  svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("class", "compare_svg")
      .attr("width", width)
      .attr("height", height)
      .attr("choose_dataset", choose_dataset)
}
// function clear_compare(){
//   compare_view_set = new Array()
//   refresh_compare_view()
// }
// function update_compare(simulation_name, resolution_name, scalar_name, channel_name, keyframe){
//   compare_view_set.push({
//             "simulation": simulation_name,
//             "resolution": resolution_name,
//             "scalar": scalar_name,
//             "channel": channel_name,
//             "keyframe": keyframe})
//   refresh_compare_view()
// }


function refresh_compare_view(){

  // console.log("compare_view_set", compare_view_set)
  var compare_num = get_simulation_show_cnt()
  var max_image_num = 0
  for ( var i = 0; i < compare_num; i ++ )
  {
    if (max_image_num < get_simulation_by_index(i).timestep.length){
      max_image_num = get_simulation_by_index(i).timestep.length
    }
  }

  //
  var connect_line = d3.line()
    .x(function(d, i) { return d.x; }) // set the x values for the line generator
    .y(function(d) { return d.y; }) // set the y values for the line generator
    .curve(d3.curveMonotoneY)

  compare_svg = d3.select(".compare_svg")
  width = compare_svg.attr("width")
  height = compare_svg.attr("height")



  text_rate = 0.15
  text_width = text_rate * width

  section_width = width * ( 1 - text_rate )
  section_height = height / compare_num

  image_number = max_image_num


  image_width = section_width/image_number
  image_height = section_height


  console.log("Max Image num:", max_image_num)
  console.log("Image Width:  ", image_width)
  console.log("Image Height: ", image_height)

  if (image_width > image_height * 3 / 2 )
  {
    image_width = image_height * 3 / 2
  }
  else {
    image_height = image_width * 2 / 3
  }
  margin_rate = 0.1
  image_margin = {top: image_height * margin_rate, left: image_width * margin_rate, bottom: image_height * margin_rate, right: image_width * margin_rate }

  image_top = (section_height - image_height)/2

  image_top = image_top + image_margin.top
  image_width = image_width - image_margin.left - image_margin.right
  image_height = image_height - image_margin.top - image_margin.bottom

  compare_svg.selectAll("g").remove()

  console.log("Compare Number: ",compare_num)

  var compare_simulation = compare_svg.selectAll(".compare")
      .data(function(d){
        // show length
        var show_length = get_simulation_show_cnt()
        var data = new Array()
        for ( var i = 0 ; i < show_length; i ++ )
        {
          data.push(get_simulation_by_index(i))
        }
        console.log("now the data looks like: ", data)
        return data
      })
      .enter()
      .append("g")
      .each(function(d){
        image_number = d.timestep.length
        image_spacing = ( section_width - image_number * image_width ) / (image_number)
        console.log(image_spacing)
        var this_item = d3.select(this)
        this_item.attr("image_spacing", image_spacing)

      })
      .attr("class", "compare")
      .attr("id", function(d,i ){
        return "compare" + i
      })
      .attr("transform",function(d,i){
        transform = "translate(0," + height * i / compare_num +")"
        return transform
      })
      .attr("simulation", function(d){
        return d.simulation
      })
      .attr("resolution", function(d){
        return d.resolution
      })
      .attr("scalar", function(d){
        return d.scalar
      })
      .attr("channel", function(d){
        return d.channel
      })
      .on("mouseover", mouseover_simulation)
      .on("mouseout", mouseout_simulation)


  var font_size = text_width / 15

  console.log("Move: ",(section_height / 2 - 2 * font_size))

  var text_information = compare_simulation.append("g")
      .attr("class", "setting_text")
      .attr("transform", "translate(" + font_size + ",0)")


  text_information.selectAll("text")
      .data(function(d){
        simulation = d.simulation
        var text_data = new Array()
        var length = global_data.simulation.length
        var line_cnt = 3
        for ( var i = 0 ; i < length ; i ++  )
        {
          this_simulation = global_data.simulation[i];
          if (global_data.simulation[i].name === d.simulation)
          {
            // text_data.push(" " + d.simulation)
            text_data.push("Angle:    " + this_simulation.angle + " degree" )
            text_data.push("Diameter: " + this_simulation.diameter + " m")
            text_data.push("Airburst: " + this_simulation.airburst + " km")
          }
        }
        // text_data.push("Channel:  " + full_channel_name[d.channel])
        channel = d.channel.split("")
        for ( var i = 0 ; i < 4; i ++ ){
          if (channel[i] === "1")
          {
            line_cnt++;
            full_name = full_channel_name[four_channel[i]]
	    //alert(four_channel[i])
            text_data.push("Channel: " + full_name)
          }
        }
        d3.select(this).attr("line_cnt", line_cnt)

        console.log(text_data)
        return text_data;
      })
      .enter()
      .append("text")
      .attr("font-size", font_size)
      .text(function(d){
        return d
      })
      .attr("y", function(d,i){
        line_cnt = parseInt(d3.select(this.parentNode).attr("line_cnt"))
        return (section_height - line_cnt * font_size) / 2 + (i + 1) * font_size
      })
  //
  // text_information.append("text")
  //     .text("hhhhh")
  //     .attr("transform", function(d){
  //       transform = "translate(0," + section_height/2 + ")"
  //       return transform
  //     })



  // text_information.append("rect")
  //     .attr("class", "seeBlack")
  //     .attr("width", text_width)
  //     .attr("height", section_height)
  //     .style("fill", "black")
  //     .attr("opacity", 0.5)



  compare_simulation.append("rect")
      .attr("width", width)
      .attr("class", "simulation_kuang")
      .attr("height", section_height)
      .on("click", function(d){
        cancel_simulation(d.simulation)
        highlight_simulation(d.simulation)
        refresh_compare_view()
      })



  var compare_images = compare_simulation.selectAll(".image")
    .data(function(d){
      console.log(d)
      return d.timestep
    })
    .enter()
    .append("g")
    .attr("class", "image")
    .attr("id", function(d, i){
      return "image"+ i
    })
    .attr("timestep",function(d){
      return d.timestep
    })
    .attr("keyframe_id", function(d){
      return d.id
    })
    .attr("channel", function(d){
      return d.channel
    })
    .attr("transform", function(d, i ){
      // console.log("image_width",image_
      var this_parent = d3.select(this.parentNode)
      var image_spacing = parseFloat(this_parent.attr("image_spacing"))
      this_item = d3.select(this)
      this_item.attr("image_width", image_width)
      this_item.attr("image_height", image_height)

      console.log("image_width", image_width)
      console.log("image_spacing", image_spacing)
      console.log("left??", (image_width + image_spacing) * i )

      return "translate(" + (width - section_width + (image_width + image_spacing) * i + 0.5 * image_spacing)+ "," + image_top + ")"
    })
    .attr("phi", function(d){
      return d.phi
    })
    .attr("theta",function(d){
      return d.theta
    })
    .attr("scale", function(d){
      return d.scale
    })
    .attr("timestep", function(d){
      return d.timestep
    })

  rect_margin = image_margin.top/12
  compare_images.append("rect")
    .attr("width", image_width  + rect_margin * 2)
    .attr("height", image_height + rect_margin * 2)
    .attr("x",  - rect_margin)
    .attr("y",  - rect_margin)
    .style("stroke", function(d){
      keyframe_id = parseInt(d3.select(this.parentNode).attr("keyframe_id"))
      if (keyframe_id >= 0 && keyframe_id <= 4)
      {
      }
      else{
        keyframe_id = 5
      }
      return event_color[keyframe_id]
    })
    .style("stroke-width", rect_margin)

  compare_images.append("image")
    .attr("width", image_width)
    .attr("height", image_height)
    // .attr("x", image_margin.left)
    // .attr("y", image_margin.top)

  compare_images.append("text")
    .text(function(d){
      // return "Timestep: " + d.timestep
      return "t =  " + parseInt(d.timestep)
    })
    // .attr("font-size", width/100)
    .attr("font-size", Math.min((height / compare_num - image_height) / 2 - 3, width / 100))
    .attr("y", "-2px")
    // .attr("y", - width/100)
    // .attr("y", - width/100 + (width/100)*compare_num/(compare_num+5))
    .attr("color", "white")

    // .attr("transform", "translate(20px, -20px)" );

  compare_images.append("path")
    .datum(get_pathline_data)
    .attr("class", "connect_line_background")
    .attr("d", connect_line)

  compare_simulation.selectAll(".image").append("path")
    .datum(get_pathline_data)
    .attr("class", "connect_line_foreground")
    .attr("d", connect_line)
    .style("stroke", function(d){
      var keyframe_id = d3.select(this.parentNode).attr("keyframe_id")
      console.log("keyframe!!!:", keyframe_id)
      if (keyframe_id === null)
      {
        keyframe_id = 5
      }
      return event_color[keyframe_id]
    })



  compare_simulation.each(function(d){
    var simulation = d3.select(this).attr("simulation")
    var resolution = d3.select(this).attr("resolution")
    var scalar = d3.select(this).attr("scalar")
    var channel = d3.select(this).attr("channel")
    d3.select(this).selectAll(".image")
        .attr("simulation", simulation)
        .attr("resolution", resolution)
        .attr("scalar", scalar)
        .attr("channel", channel)
  })

  compare_images.each(function(d){
    var this_item = d3.select(this)
    var phi = this_item.attr("phi")
    var theta = this_item.attr("theta")
    var simulation = this_item.attr("simulation")
    var resolution = this_item.attr("resolution")
    var scalar = this_item.attr("scalar")
    var channel = this_item.attr("channel")
    var timestep = this_item.attr("timestep")
    var scale = this_item.attr("scale")
    load_image_with_scale(this_item, simulation, resolution, scalar, channel, timestep, phi, theta, scale)

  })

  // compare_images

  compare_images.attr("last_time", global_time.getTime())
        .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended))
          .call(d3.zoom()
          .on("zoom",zoomFunction))
          .on("contextmenu",function(d){
          d3.event.preventDefault();
          if (parseFloat(d3.select(this).attr("phi")) >= 0 )
          {
            d3.select(this).attr("phi", -1)
          }
          else{
            d3.select(this).attr("phi", 0)
          }
          this_item = d3.select(this)
          reload_image(this_item)
          d3.selectAll(".image").classed("navigate_this", false)
          d3.select(this).classed("navigate_this", true)
          refresh_navigation_view(this_item.select("image").attr("xlink:href"))
        })




  function mouseover_simulation(d){
    // console.log("mouseover: ", d)
    highlight_simulation(d.simulation)
    refresh_highlight_all()
    // d3.select(this).raise()
    // d3.select(this).classed("highlight", true)
    // d3.select(this).classed("active", true)
  }
  function mouseout_simulation(d,i){

    highlight_simulation(d.simulation)
    refresh_highlight_all()
    // // console.log("mouseout:  ", d)
    // d3.select(this).raise()
    // for ( var i = 0 ; i < compare_view_set.length; i ++ )
    // {
    //   id = "#compare" + i
    //   d3.select(id).raise()
    // }
    // d3.select(this).classed("highlight", false)
  }

  function get_pathline_data(d){
    var begin_x = image_width/2
    var begin_y = image_height // 这是图片的最下部分

    var begin = { x: begin_x, y: begin_y }
    var begin2 = {x :begin.x, y: begin.y + 1 }


    var relative_position = distance_from_parent_to_id(this, "compare_story")

    var timetick_x = parseFloat(d3.select("#timetick").attr("compare_story_x"))


    var timetick_y = parseFloat(d3.select("#timetick").attr("compare_story_y"))

    var xRange = d3.scaleLinear().domain([0,50000]).range([0,width])

    var timestep = parseFloat(d3.select(this.parentNode).attr("timestep"))
    timetick_x_position = parseInt(xRange(timestep))


    var begin_absolute_x = begin_x + relative_position.x
    var begin_absolute_y = begin_y + relative_position.y


    // console.log("timetick_x: ", timetick_x)
    // console.log("timetick_x_position: ", timetick_x_position)
    var end_absolute_x = timetick_x + timetick_x_position
    var end_absolute_y = timetick_y

    // console.log("timetick absolute x: ", end_absolute_x)

    d3.select(this.parentNode).attr("begin_x", begin_absolute_x)
    d3.select(this.parentNode).attr("begin_y", begin_absolute_y)

    d3.select(this.parentNode).attr("end_x", end_absolute_x)
    d3.select(this.parentNode).attr("end_y", end_absolute_y)


    var end2begin = {dx: end_absolute_x - begin_absolute_x, dy: end_absolute_y - begin_absolute_y }
    // console.log("end to begin: ",end2begin)

    // console.log("timetick", timetick_x_position)


    var end  = {x: begin.x + end2begin.dx, y: begin.y + end2begin.dy}
    var end2 = {x: end.x, y: end.y + 5}

    // console.log("Connect line data",[begin,begin2,end,end2])

    return [begin,begin2,end,end2]
  }

  function zoomFunction(d){
    // console.log(d3.event.transform.k)
    scale = d3.event.transform.k
    this_item = d3.select(this)
    var current_time_value = new Date()
    current_time = current_time_value.getTime()
    phi = this_item.attr("phi")
    theta = this_item.attr("theta")
    last_time = this_item.attr("last_time")
    simulation = this_item.attr("simulation")
    resolution = this_item.attr("resolution")
    scalar = this_item.attr("scalar")
    channel = this_item.attr("channel")
    timestep = this_item.attr("timestep")
    scale = d3.event.transform.k

    this_item.attr("scale",scale)

    if( current_time - last_time > 200 ){
      load_image_with_scale(this_item, simulation, resolution, scalar, channel, timestep, phi ,theta,scale)
      refresh_navigation_view(this_item.select("image").attr("xlink:href"))
      this_item.attr("last_time", current_time)
    }
  }

  /*function load_image_with_scale_try_multi(this_item, simulation, resolution, scalar, channel, timestep, phi, theta, scale){
    translate_channel = {prs: "1111", tev: "0111", v02: "1100", v03: "0011"}
    channel = translate_channel[channel]
    name = "http://192.168.40.13/get_image_scale?test=0&simulation=" + simulation + "&resolution=" + resolution + "&scalar="+ scalar +"&channel=" + channel + "&timestep=" + timestep + "&phi=" + phi + "&theta=" + theta + "&scale=" + scale;
    this_item.select("image")
      .attr("xlink:href", name)
  }*/

  function load_phi_theta(){
    select_area = d3.select("#try_3D_navigation")
    phi = select_area.attr("phi")
    theta = select_area.attr("theta")

      d3.select("#try_3D_navigation").select("#phi")
        .text("phi:"+phi)
      d3.select("#try_3D_navigation").select("#theta")
        .text("theta:"+theta)
      console.log("phi:" + phi + "theta:" + theta)
  }

  function dragstarted(d){
    d3.select(this).style('cursor','pointer');
    console.log("drag start")
    this_item = d3.select(this)
    // coordinates =
    console.log(d3.event.x)
    d3.selectAll(".image").classed("navigate_this", false)
    d3.select(this).classed("navigate_this", true)
    refresh_navigation_view(this_item.select("image").attr("xlink:href"))

    d3.select(this).attr("current_x", d3.event.x)
    d3.select(this).attr("current_y", d3.event.y)
    d3.select(this).attr("last_time", global_time.getTime())
    // console.log(coordinates)
  }

  function dragged(d){
    console.log("draging")
    x = d3.event.x
    y = d3.event.y
    this_item = d3.select(this)
    delta_x = x - this_item.attr("current_x")
    delta_y = y - this_item.attr("current_y")
    this_item.attr("current_x", x)
    this_item.attr("current_y", y)
    phi = this_item.attr("phi")
    theta = this_item.attr("theta")
    scale = this_item.attr("scale")
    simulation = this_item.attr("simulation")
    resolution = this_item.attr("resolution")
    scalar = this_item.attr("scalar")
    channel = this_item.attr("channel")
    timestep = this_item.attr("timestep")

    if (parseFloat(phi) === -1)
    {

    }
    else {
      phi = parseFloat(phi) + delta_y
      theta = parseFloat(theta) + delta_x

      console.log("phi: " + phi + "  theta: " + theta)

      if (phi < 0 ){
        phi = 0
      }
      if (phi > 90){
        phi = 90
      }
      theta = (theta % 360 + 360 ) % 360
    }

    var current_time_value = new Date()
    current_time = current_time_value.getTime()
    console.log("Current_time:" + current_time)
    last_time = parseFloat(this_item.attr("last_time"))
    console.log("CURRENT:" + (current_time - last_time))
    if (current_time - last_time > 150){
      load_image_with_scale(this_item, simulation, resolution, scalar, channel, timestep, phi, theta, scale)
      refresh_navigation_view(this_item.select("image").attr("xlink:href"))
      this_item.attr("last_time", current_time)
    }
    this_item.attr("phi", phi)
    this_item.attr("theta", theta)

    console.log(parseInt(delta_x))
    console.log(parseInt(delta_y))

  }
  function dragended(d){
    // reload_image(d)
    reload_image(d3.select(this))
    this_item = d3.select(this)
    console.log("dragended")
    refresh_navigation_view(this_item.select("image").attr("xlink:href"))
  }

  // compare_simulation.each(function(d){
  //   d3.select(this).selectAll(".image").selectAll()
  // })
  // draw_line()
}
function draw_line(){
  data = [{x:10, y:0},{x:10, y:5},{x:1000, y:500},{x:1000,y:505}]

  var line = d3.line()
    .x(function(d, i) { return d.x; }) // set the x values for the line generator
    .y(function(d) { return d.y; }) // set the y values for the line generator
    .curve(d3.curveMonotoneY)

  d3.selectAll(".compare_svg")
    .append("path")
    .datum(data)
    .classed("connect_line", true)
    .attr("d", line)
    // .attr("stroke-width", "10px")
    // .attr("fill", )
    // .attr("fill", "none")
}
function load_image_with_scale(this_item, simulation, resolution, scalar, channel, timestep, phi, theta, scale){
  phi = parseInt(phi)
  theta = parseInt(theta)
  url_name = "http://192.168.40.13/get_image_scale?test=0&simulation=" + simulation + "&resolution=" + resolution + "&scalar="+ scalar +"&channel=" + channel + "&timestep=" + timestep + "&phi=" + phi + "&theta=" + theta + "&scale=" + scale;
  // console.log(url_name)

  if (simulation !== current_volume.simulation || resolution !== current_volume.resolution || scalar !== current_volume.scalar || channel !== current_volume.channel || timestep !== current_volume.timestep) {
    current_volume.simulation = simulation
    current_volume.resolution = resolution
    current_volume.scalar = scalar
    current_volume.channel = channel
    current_volume.timestep = timestep

    this_item.select("image")
      .attr("xlink:href", "image/Spinner-1s-200px.gif")
  }

  var xhr = new XMLHttpRequest()
  xhr.open("GET", url_name, true)
  xhr.responseType = "blob"
  xhr.onload = function() {
    if (this.status == 200) {
      var blob = this.response
      var blob_url = window.URL.createObjectURL(blob)
      this_item.select("image")
        .attr("xlink:href", blob_url)
      refresh_navigation_view(blob_url)
    }
  }
  xhr.send()

  /*console.log("begin load")
  this_item.select("image")
    .attr("onload", function() {
        console.log("loaded")
    })
    .attr("xlink:href", url_name)*/
}

function reload_image(this_item) {
  phi = this_item.attr("phi")
  theta = this_item.attr("theta")
  scale = this_item.attr("scale")
  simulation = this_item.attr("simulation")
  resolution = this_item.attr("resolution")
  scalar = this_item.attr("scalar")
  channel = this_item.attr("channel")
  timestep = this_item.attr("timestep")
  load_image_with_scale(this_item, simulation, resolution, scalar, channel, timestep, phi,theta,scale)
}

function reload_all() {
  d3.selectAll(".image").each(function(d) {
    reload_image(d3.select(this))
  })
}

function refresh_highlight_compare_view(){
  // d3.select(this).raise()
  var length = get_simulation_show_cnt()
  for (var i = 0 ; i < length; i++)
  {
    id = "#compare" + i
    d3.select(id).raise()
  }

  d3.selectAll(".compare")
    .classed("highlight",function(d){
      if (get_simulation_highlight_by_name(d.simulation))
      {
        d3.select(this).raise()
        return true
      }
      return false
    })
}
>>>>>>> 28a0990b7009e5da978b9cd60de5211359f39645
