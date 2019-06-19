<<<<<<< HEAD
function load_choose_dataset(simulations){
  console.log(simulations.simulation)
  simulations = simulations.simulation
  var margin = {top: 5, right: 5, bottom: 5, left: 5 }
  var width = document.getElementById("choose_dataset").clientWidth - margin.left - margin.right
  var height = document.getElementById("choose_dataset").clientHeight - margin.top - margin.bottom
  //console.log("open js")
  var svg = d3.select("#choose_dataset").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  simulation_width = width/3;
  simulation_height = simulation_width;
  var choose_simulation = svg.append("g")
    .attr("transform", "translate(0," + ( height - width ) + ")")

  var simulations = choose_simulation.selectAll(".simulation")
    .data(simulations)
    .enter().append("g")
    .attr("class", "simulation")
    .attr("id", function(d){
      return d.id
    })
    .attr("transform", function(d){

      x_index = d.id % 3;
      y_index = parseInt(d.id / 3);
      x = x_index * simulation_width
      y = y_index * simulation_height
      var transform = "translate(" + x + "," + y + ")"
      console.log(transform)
      return transform
    })
    .attr("image_name", function(d){
      return "image/" + d.id + ".png"
    })

  simulations.append("rect")
    .attr("width", simulation_width * 0.88 )
    .attr("height", simulation_height * 0.88 )
    .attr("stroke-width", simulation_width * 0.04)
    .attr("x", simulation_width * 0.06)
    .attr("y", simulation_height * 0.06)
    .attr("opacity", 1)
    .attr("stroke", "#DDD" )

  simulations.append("image")
    .attr("xlink:href", function(d){
      return "image/" + d.id + ".png"
    })
    .attr("width", simulation_height * (280 / 340) * 0.8 )
    .attr("height", simulation_height * 0.8 )
    .attr("x", simulation_width * ( 0.5 - (280 / 340) * 0.4 ) )
    .attr("y", simulation_height * 0.1)


  simulations.on('click', function(d) {
    this_item = d3.select(this)
    if (this_item.classed("chosen"))
    {
      this_item.classed("chosen", false)
    }
    else {
      this_item.classed("chosen", true)
    }
    d3.select(this).select("rect")
      .attr("fill", "white")

    load_resolution(d)
  });

  var choose_resolution = svg.append("g")
    .attr("class", "choose_resolution")
    .attr("height", height - width)
    .attr("width", width)
    .append("g")
    .append("rect")
    .attr("width", function(d){
      return width/2 - simulation_width * 0.12
    })
    .attr("height", height - width - simulation_width * 0.06 )
    .attr("stroke-width", simulation_width * 0.04)
    .attr("x", simulation_width * 0.06)
    .attr("stroke", "#DDD" )
    .attr("fill","white")



  var choose_channel = svg.append("g")
    .attr("transform", "translate( " + width/2 +",0)")
    .attr("class", "choose_channel")
    .attr("height", height - width)
    .attr("width", width)


  choose_channel.append("g")
    .append('rect')
    .attr("width", function(d){
      return width/2 - simulation_width * 0.12
    })
    // .attr("height", height - width )
    .attr("height", height - width - simulation_width * 0.06 )
    .attr("stroke-width", simulation_width * 0.04)
    .attr("x", simulation_width * 0.06)
    // .attr("y", simulation_height * 0.06)
    .attr("stroke", "#DDD" )
    .attr("fill","white")




}
function click_simulation(d){
  load_resolution(d)
}
function load_resolution(d){
  console.log(d)
  number_of_resolution = d.resolution.length
  console.log(number_of_resolution)
  choose_resolution = d3.selectAll(".choose_resolution")
  height = choose_resolution.attr("height")
  width = choose_resolution.attr("width")

  choose_resolution.selectAll("g").remove()

  choose_resolution.attr("simulation", d.name)

  simulation_name = d.name

  var resolutions = choose_resolution.selectAll("g")
    .data(d.resolution)
    .enter()
    .append("g")
    .attr("transform",function(q,i){
      y = height/number_of_resolution * i ;
      return "translate(0," + y + ")"
    })
    .attr("resolution", function(q){
      return q.name
    })
  simulation_width = width / 3
  console.log(width)
  console.log(simulation_width)
  resolutions.append("rect")
    .attr("width", width/2 - simulation_width * 0.12)
    .attr("height", height/number_of_resolution - simulation_width * 0.06 )
    .attr("stroke-width", simulation_width * 0.04)
    .attr("x", simulation_width * 0.06)
    .attr("stroke", "#DDD" )
    .attr("fill","white")


  text = "Diameter" + d.diameter
  console.log(text)
  resolutions.append("text")
    .text(function(q){
      return q.name
    })
    .attr("transform", function(q,i){
      return "translate(" + width /4  + "," + height/number_of_resolution/2 + ")"
    })

  resolutions.on("click",function(q, i){
    load_channel(simulation_name, q)
    console.log("Simulation: "+ simulation_name + " resolution: " + q.name)
  })
}

function load_channel(simulation_name, d){
  resolution_name = d.name
  scalar_name = d.scalar[0].name

  var channels = d.scalar[0].channel
  number_of_channel = channels.length
  choose_channel = d3.selectAll(".choose_channel")
  height = choose_channel.attr("height")
  width = choose_channel.attr("width")

  choose_channel.selectAll("g").remove()

  choose_channel.attr("simulation_name", simulation_name)
  choose_channel.attr("resolution_name", resolution_name)
  choose_channel.attr("scalar_name", scalar_name)


  var resolutions = choose_channel.selectAll("g")
    .data(channels)
    .enter()
    .append("g")
    .attr("transform",function(q,i){
      y = height/number_of_channel * i ;
      return "translate(0," + y + ")"
    })
    .attr("resolution", function(q){
      return q.name
    })
  simulation_width = width / 3
  console.log(width)
  console.log(simulation_width)
  resolutions.append("rect")
    .attr("width", width/2 - simulation_width * 0.12)
    .attr("height", height/number_of_channel - simulation_width * 0.06 )
    .attr("stroke-width", simulation_width * 0.04)
    .attr("x", simulation_width * 0.06)
    .attr("stroke", "#DDD" )
    .attr("fill","white")


  text = "Diameter" + d.diameter
  console.log(text)
  resolutions.append("text")
    .text(function(q){
      return q.attr
    })
    .attr("transform", function(q,i){
      return "translate(" + width /4  + "," + height/number_of_channel/2 + ")"
    })


  resolutions.on("click",function(q, i){
    console.log("simulation: " + simulation_name)
    console.log("resolution: " + resolution_name)
    console.log("scalar: " + scalar_name)
    console.log("channel: " + q.attr )
    channel_name = q.attr
    update_compare_view(q, simulation_name, resolution_name, scalar_name, channel_name, d.scalar[0].keyframe)

    console.log("update_compare_view")

  })
}
=======
function load_choose_dataset(simulations){
  console.log(simulations.simulation)
  simulations = simulations.simulation
  var margin = {top: 5, right: 5, bottom: 5, left: 5 }
  var width = document.getElementById("choose_dataset").clientWidth - margin.left - margin.right
  var height = document.getElementById("choose_dataset").clientHeight - margin.top - margin.bottom
  //console.log("open js")
  var svg = d3.select("#choose_dataset").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("id" , "menu")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  simulation_width = width/3;
  simulation_height = 0.7*height / 3;
  var choose_simulation = svg.append("g")
    .attr("class", "choose_simulation")
    .attr("transform", "translate(0," + (height - simulation_height*3 ) + ")")

  var simulations = choose_simulation.selectAll(".simulation")
    .data(simulations)
    .enter().append("g")
    .attr("class", "simulation")
    .attr("name", function(d){
      return d.name
    })
    .attr("id", function(d){
      return d.id
    })
    .attr("transform", function(d){

      x_index = d.id % 3;
      y_index = parseInt(d.id / 3);
      x = x_index * simulation_width
      y = y_index * simulation_height
      var transform = "translate(" + x + "," + y + ")"
      console.log(transform)
      return transform
    })
    .attr("image_name", function(d){
      return "image/" + d.id + ".png"
    })




  simulations.append("rect")
    .attr("width", simulation_width * 0.88 )
    .attr("height", simulation_height * 0.88 )
    .attr("stroke-width", simulation_width * 0.04)
    .attr("x", simulation_width * 0.06)
    .attr("y", simulation_height * 0.06)
    .attr("id", function(d){return "imagekuang" + d.id})
    .attr("opacity", 0.5)
    .attr("stroke", "#DDD" )
    // .attr("fill", function(d,i){
    //   console.log("~~~~~",simulation_color[d.id])
    //   return simulation_color[d.id]
    // })

  simulations.append("image")
    .attr("xlink:href", function(d){
      return "image/" + d.id + ".png"
    })
    .attr("width", simulation_width * (280 / 340) * 0.8 )
    .attr("height", simulation_height * 0.8 )
    .attr("x", simulation_width * ( 0.5 - (280 / 340) * 0.4 ) )
    .attr("y", simulation_height * 0.1)

    simulations.append("text")
    .text(function(d){return d.name})
    .attr('x',width*0.23)
    .attr('y',height*0.05)
    .attr("font-size", simulation_width/12)

  simulations.on("mouseover", function(d){
    highlight_simulation(d.name)
    refresh_highlight_all()
    ///console.log("mouseover")
  })
  simulations.on("mouseout",  function(d){
    highlight_simulation(d.name)
    cancel_highlight_channel()
    refresh_highlight_all()
    //console.log("mouseout")
  })

  simulations.on('click', function(d) {
    //console.log(d)
    //console.log("获取到了-：", get_simulation_by_name(d.name))
    simulation_data = get_simulation_by_name(d.name)

    if (get_simulation_by_name(d.name) === 0 )
    {
      for (var i = 0; i < 4; ++i) {
        if (chosen_channel[i] === 1) {
          add_simulation(d.name, d.resolution[0].name, d.resolution[0].scalar[0].name, four_channel[i],  d.resolution[0].scalar[0].keyframe)
        }
      }
      // console.log("ADD default")
      // add_simulation(d.name, d.resolution[0].name, d.resolution[0].scalar[0].name, "prs",  d.resolution[0].scalar[0].keyframe)

    }
    // simulation_data = get_simulation_by_name(d.name)
    d3.selectAll(".choose_channel").attr("simulation", d.name)
    //

    refresh_all()

  })
  .on("contextmenu", function(d){
    d3.event.preventDefault();
    cancel_simulation(d.name)
    refresh_all()
  })



  var choose_channel = svg.append("g")
    // .attr("transform", "translate( " +  +",0)")
    .attr("class", "choose_channel")
    .attr("height", height - width)
    .attr("width", width)

  channel_height = height - simulation_height*3
  channel_width = width
  number_of_channel = 4

  var channels = choose_channel.selectAll("g")
    .data(function(d){
      return ["prs", "tev", "v02", "v03"]
    })
    .enter()
    .append("g")
    .attr("class", "channels")
    .attr("simulation", "null")
    .attr("transform",function(q,i){
      y = channel_height/number_of_channel * i ;
      return "translate(0," + y + ")"
    })

  channels.append('rect')
    .attr("width", function(d){
      return width - simulation_width * 0.12
    })
    // .attr("height", height - width )
    .attr("height", (channel_height/number_of_channel - simulation_width * 0.06) )
    .attr("stroke-width", 3 )
    .attr("x", simulation_width * 0.06)
    // .attr("y", simulation_height * 0.06)
    .attr("stroke", "#DDD" )
    .attr("fill", "white")


  channels.append('text')
    .text(function(q){
      return full_channel_name[q]
    })
    .attr("transform", function(q,i){
      return "translate(" + channel_width /2.7  + "," + channel_height/number_of_channel/2 + ")"
    })
    .attr("font-size", simulation_width/12)

  channels.on("click",function(d){
    chosen_channel[four_channel.indexOf(d)] = 1 - chosen_channel[four_channel.indexOf(d)]
    console.log("channel_chosen status: ", chosen_channel[0], chosen_channel[1], chosen_channel[2], chosen_channel[3])
    for (var i = 0; i < 7; ++i) {
      var simulation_data = get_simulation_by_name(SIMULATION_NAME[i])
      if (simulation_data !== 0) {
        add_simulation(SIMULATION_NAME[i], simulation_data.resolution, simulation_data.scalar, d, [])
      }
    }

    /*var simulation = d3.selectAll(".choose_channel").attr("simulation")
    resolution = "300"
    scalar = "four"
    channel = d
    keyframe = []
    add_simulation(simulation, resolution, scalar, channel, keyframe)*/

    refresh_all()
  })
  channels.on("mouseover", function(d){
    // highlight_simulation(d3.select(this.parentNode).attr("simulation"))
    // refresh_highlight_all()
    // d3.selectAll(".channels").classed("highlight", false)

    d3.select(this).classed("highlight", true)
  })
  channels.on("mouseout", function(d){
    // highlight_simulation(d3.select(this.parentNode).attr("simulation"))
    // refresh_highlight_all()
    // d3.selectAll(".channels").classed("highlight", false)
    d3.select(this).classed("highlight", false)
  })

  load_dataset_legend();

}

function load_resolution(d){
  console.log(d)
  number_of_resolution = d.resolution.length
  console.log(number_of_resolution)
  choose_resolution = d3.selectAll(".choose_resolution")
  height = choose_resolution.attr("height")
  width = choose_resolution.attr("width")

  choose_resolution.selectAll("g").remove()

  choose_resolution.attr("simulation", d.name)

  simulation_name = d.name

  var resolutions = choose_resolution.selectAll("g")
    .data(d.resolution)
    .enter()
    .append("g")
    .attr("transform",function(q,i){
      y = height/number_of_resolution * i ;
      return "translate(0," + y + ")"
    })
    .attr("resolution", function(q){
      return q.name
    })
  simulation_width = width / 3
  console.log(width)
  console.log(simulation_width)
  resolutions.append("rect")
    .attr("width", width/2 - simulation_width * 0.12)
    .attr("height", height/number_of_resolution - simulation_width * 0.06 )
    .attr("stroke-width", simulation_width * 0.04)
    .attr("x", simulation_width * 0.06)
    .attr("stroke", "#DDD" )
    .attr("fill", "white")
    // .attr("fill", color)


  text = "Diameter" + d.diameter
  console.log(text)
  resolutions.append("text")
    .text(function(q){
      return q.name
    })
    .attr("transform", function(q,i){
      return "translate(" + width /4  + "," + height/number_of_resolution/2 + ")"
    })

  resolutions.on("click",function(q, i){
    load_channel(simulation_name, q)
    console.log("Simulation: "+ simulation_name + " resolution: " + q.name)
  })
}

function load_dataset_legend()
{
    var svg = d3.select(".choose_simulation")
    var margin = {top: 5, right: 5, bottom: 5, left: 5 }
    var width = document.getElementById("choose_dataset").clientWidth - margin.left - margin.right
    var height = document.getElementById("choose_dataset").clientHeight - margin.top - margin.bottom


    var simulation_width = width / 3
    var simulation_height = 0.7*height / 3

    svg.append("g")
       .append("image")
       .attr("id","image_legend")
       .attr("xlink:href", function(d){
            return "image/legend.png"
        })
       .attr("width", simulation_width * 2)
       .attr("height", simulation_height * 0.95 )
       // .attr("x", 0 )
       // .attr("y", 2*simulation_height )
       .attr("transform",function(){
          var x = simulation_width
          var y = simulation_height * 2
          return "translate(" + x + "," + y + ")"
        })
       console.log(d3.select("#image_legend").attr("transform"), " (legend)")
}

function refresh_choose_view()
{
  d3.selectAll(".choose_simulation").selectAll(".simulation")
    .classed("chosen",function(d){
      if (get_simulation_by_name(d.name) === 0 )
      {
        return false
      }
      else {
        return true
      }
    })
    .classed("highlight", function(d){
      if ( get_simulation_highlight_by_name(d.name) )
      {
        highlight_channel(d.name)
        return true
      }
      else {
        return false
      }
    })
}

function cancel_highlight_channel(){
  d3.selectAll(".channels").classed("highlight", false)
}

function highlight_channel(simulation_name){

  simulation_data = get_simulation_by_name(simulation_name)

  // console.log("channel", simulation_data.channel)
  d3.selectAll(".channels").classed("highlight", false)

  if ( simulation_data === 0 )
  {

  }
  else{
    d3.selectAll(".channels")
      .classed("highlight", function(d, i){

        if (simulation_data.channel[i] === "1")
        {
          // console.log("BRING???")
          return true
        }
        else {
          return false
        }
      })
  }
}
function refresh_channel(){
  var simulation_name = d3.selectAll(".choose_channel").attr("simulation")
  simulation_data = get_simulation_by_name(simulation_name)

  // console.log("channel", simulation_data.channel)
  /*if ( simulation_data === 0 )
  {
    d3.selectAll(".channels").classed("chosen", false)
  }
  else{
    d3.selectAll(".channels")
      .classed("chosen", function(d, i){

        if (simulation_data.channel[i] === "1")
        {
          // console.log("BRING???")
          return true
        }
        else {
          return false
        }
      })
  }*/
  d3.selectAll(".channels")
    .classed("chosen", function(d, i){
      if (chosen_channel[i] === 1) {
        return true
      }
      else {
        return false
      }
    })
}
>>>>>>> 28a0990b7009e5da978b9cd60de5211359f39645
