<<<<<<< HEAD
<<<<<<< HEAD

var global_time = new Date()
function add_navigation_effect(){
  navigation = d3.select("#try_3D_navigation")
  var margin = {top: 0, right: 0, bottom: 0, left: 0 }
  var width = document.getElementById("try_3D_navigation").clientWidth - margin.left - margin.right
  var height = document.getElementById("try_3D_navigation").clientHeight - margin.top - margin.bottom

  console.log(width)
  svg = navigation.append("svg")
    .attr("height", height )
    .attr("width", width )




  svg.append("g")
    .attr("transform", "translate(50,50)")
    .append("text")
    .attr("x",20)
    .attr("y",20)
    .attr("font-family","sans-serif")
    .attr("font-size","20px")
    .attr("fill", "red")
    .attr("width", 40)
    .attr("id","phi")
    .text("phi")

  svg.append("text")
    .attr("x",50)
    .attr("y",20)
    .attr("font-family","sans-serif")
    .attr("font-size","20px")
    .attr("fill", "red")
    .attr("width", 40)
    .attr("id","theta")
    // .attr("transform", "translate(50,50)")
    .text("theta")

  svg.append("image")
    .attr('id',"image")
    .attr("xlink:href","http://192.168.40.13/get_image_scale?test=0&simulation=yA31&resolution=300&scalar=four&channel=v02&timestep=24466&phi=0&theta=90&scale=1.0")
    .attr("x",0)
    .attr("y",0)
    .attr("width",width)
    .attr("height",height)

  //<image xlink:href="Penguins.jpg" x="0" y="0" height="50px" width="50px"/>


  svg.attr("phi", 0)
    .attr("theta", 90)
    .attr("scale", 1.0)
    .attr("simulation", "yA31")
    .attr("resolution", 300)
    .attr("scalar", "four")
    .attr("channel","v02")
    .attr("timestep",24466)
    .attr("last_time", global_time.getTime())
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
    .call(d3.zoom()
        .on("zoom", zoomFunction))



//<text x="20" y="20" font-family="sans-serif" font-size="20px" fill="red">Hello!</text>
}
function zoomFunction(){
  console.log(d3.event.transform.k)
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
    load_image_with_scale(simulation, resolution, scalar, channel, timestep, phi ,theta,scale)
    this_item.attr("last_time", current_time)
  }


}
function load_image(phi, theta){
  name = "http://192.168.40.13/get_image?test=0&simulation=yA31&resolution=300&scalar=four&channel=v02&timestep=24466&phi=" + phi + "&theta=" + theta;
  console.log(name)
  d3.select("#try_3D_navigation").select("image")
    .attr("xlink:href", name)
}
function load_image_with_scale(simulation, resolution, scalar, channel, timestep, phi, theta, scale){
  name = "http://192.168.40.13/get_image_scale?test=0&simulation="+simulation+"&resolution=" + resolution + "&scalar="+ scalar +"&channel=" + channel + "&timestep=" + timestep + "&phi=" + phi + "&theta=" + theta + "&scale=" + scale;
  console.log(name)
  d3.select("#try_3D_navigation").select("image")
    .attr("xlink:href", name)
}

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
  console.log("drag start")
  // coordinates =
  console.log(d3.event.x)
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

  phi = parseFloat(phi) + delta_y
  theta = parseFloat(theta) + delta_x

  console.log("phi: " + phi + "  theta: " + theta)

  if (phi < 0 ){
    phi = 0
  }
  if (phi > 90){
    phi = 90
  }

  theta =(theta%360 + 360 ) % 360
  var current_time_value = new Date()
  current_time = current_time_value.getTime()
  console.log("Current_time:" + current_time)
  last_time = this_item.attr("last_time")
  console.log("CURRENT:" + current_time - last_time)
  if( current_time - last_time > 150 ){
    load_image_with_scale(simulation, resolution, scalar, channel, timestep, phi,theta,scale)
    this_item.attr("last_time", current_time)
  }
  this_item.attr("phi", phi)
  this_item.attr("theta", theta)




  console.log(parseInt(delta_x))
  console.log(parseInt(delta_y))



}
function dragended(d){
  console.log("dragended")
}
=======

=======
>>>>>>> 922259a29f49ddbfbb2b8cf6690d33cf28976ba6
var global_time = new Date()

function add_navigation_effect(){
  navigation = d3.select("#try_3D_navigation")
  var margin = {top: 5, right: 5, bottom: 5, left: 5}
  var width = document.getElementById("try_3D_navigation").clientWidth - margin.left - margin.right
  var height = document.getElementById("try_3D_navigation").clientHeight - margin.top - margin.bottom
  // console.log(document.getElementById("try_3D_navigation").clientWidth)
  // console.log(width)
  // console.log(margin.left)

  svg = navigation.append("svg")
    .attr("height", height)
    .attr("width", width)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("id", "navigation")

  var length1 = width / 3;
  var length2 = 0.8 * height / 2;
  var image_width, image_height;
  if (length1 < length2) {
    image_width = width;
    image_height = image_width * 2 / 3;
  }
  else {
    image_height = 0.8 * height;
    image_width = image_height * 3 / 2;
  }

  svg.append("image")
    .attr('id', "image")
    // .attr("xlink:href","http://192.168.40.13/get_image_scale?test=0&simulation=yA31&resolution=300&scalar=four&channel=0010&timestep=24466&phi=0&theta=90&scale=1.0")
    .attr("xlink:href", "image/blank.jpg")
    .attr("x", (width - image_width) / 2)
    .attr("y", height * 0.2)
    .attr("width", image_width)
    .attr("height", image_height)

  // console.log("width: " + (width - image_width) / 2);

  var button_height = 0.2 * height
  var button_width = width

  var button_margin = {top: 5, right: 5, left: 5, bottom: 5 }

  var button = svg.append("g")
    .attr("class","button")
    // .attr("transform", "translate(0," + width * 2 / 3 + ")")

  // var slice_button = button.append("g")
  //   .attr("transform", "translate(" + button_margin.left + "," + button_margin.top + ")")
  // slice_button.append("rect")
  //   .attr("height", button_height - button_margin.top - button_margin.bottom)
  //   .attr("width", button_width/2 - button_margin.left - button_margin.right)
  //   .attr("rx", 10)
  //   .attr("ry", 10)
  var apply_to_all_button = button.append("g")
  .attr("transform", "translate(" + button_margin.left  + "," + button_margin.top + ")")

apply_to_all_button.append("rect")
  .attr("height", button_height - button_margin.top - button_margin.bottom)
  .attr("width", button_width - button_margin.left - button_margin.right)
  .attr("rx", 10)
  .attr("ry", 10)
  .attr("fill", "white")
  .attr("stroke", "#ddd")
  .attr("stroke-width", "5")

apply_to_all_button.append("text")
  .text("Apply Viewpoint to All")
  .attr("font-size", width / 40)
  .attr("transform", function(d){
    x = button_width / 3
    y = button_height / 2
    return "translate(" + x + "," + y + ")"
  })

apply_to_all_button.on("click",function(d){
  a = get_viewpoint(d3.select("#navigation").select("image").attr("xlink:href"))
  apply_to_all(a.phi, a.theta, a.scale)
  refresh_all()
})

function get_viewpoint(string){
  /*setting = string.split("&")
  length = setting.length
  console.log(string)
  phi = setting[length - 3].split("=")[1]
  theta = setting[length -2].split("=")[1]
  scale = setting[length -1].split("=")[1]*/
  phi = d3.select("#navigation").select("image").attr("phi")
  theta = d3.select("#navigation").select("image").attr("theta")
  scale = d3.select("#navigation").select("image").attr("scale")
  return {phi: parseFloat(phi), theta : parseFloat(theta), scale : parseFloat(scale)}
}

//<text x="20" y="20" font-family="sans-serif" font-size="20px" fill="red">Hello!</text>
}
//
function refresh_navigation_view(blob_url) {
  navigate_current = d3.select(".navigate_this")

  if (JSON.stringify(navigate_current) !== "{\"_groups\":[[null]],\"_parents\":[{}]}") {
    d3.select("#navigation")
      .select("image")
      .attr("xlink:href",function(){
        // console.log(navigate_current.select("image").attr("xlink:href"))
        // return navigate_current.select("image").attr("xlink:href")
        return blob_url
      })
      .attr("phi", function(d){
        return navigate_current.attr("phi")
      })
      .attr("theta", function(d){
        return navigate_current.attr("theta")
      })
      .attr("scale", function(d){
        return navigate_current.attr("scale")
      })
  }
}
>>>>>>> 28a0990b7009e5da978b9cd60de5211359f39645
