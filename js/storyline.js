<<<<<<< HEAD
function load_storyline_view(simulations){
    var color = ['#66c2a5','#fc8d62','#8da0cb','#e78ac3','#a6d854']
    simulations = simulations.simulation

    event_name = ["Asteroids airbursts","Asteroids hit the ocean","Pressure Wave arrive sea level","Shock Wave Arriving Seabed","Water Jet and Rim Waves"]

    var margin = {top: 20, right: 20, bottom: 20, left: 20 }
    var width = document.getElementById("story_line").clientWidth - margin.left - margin.right
    var height = document.getElementById("story_line").clientHeight - margin.top - margin.bottom
    //console.log("open js")
    var svg = d3.select("#story_line").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    var line_container = svg.selectAll(".line_container")
        .data(simulations)
      .enter().append("g")
        .attr("class","line_container")
        .style("border-style","solid")
        .style("border-color","#FF0000")
        .attr("transform",function(d){
            transform = "translate(0," + height * ( d.id + 1.5 ) / 8 + ")"
            return transform
        })

    line_container.append("rect")
        .attr("class","line")
        .attr("width",width )
        .attr("height",height/25)
        .attr("id" , function(d){ return "number" + d.id;});

    line_container.selectAll(".key_frame")
        .data(function(d){
          console.log(d.resolution[0].scalar[0].keyframe)
          return d.resolution[0].scalar[0].keyframe
        })
        .enter()
        .append("rect")
        .attr("class", "key_frame")
        .attr("x", function(d){
          timestep = parseInt(d.timestep)
          if (timestep > 0 ){
            return width * timestep / 50000;
          }
          return -width
        })
        .attr("width", width/40)
        .attr("height", height/10)
        .attr("y", -height/40)
        .attr("fill",function(d){
          return color[d.id]
        })
    line_container.selectAll(".tick")
        .data(function(d){
          return d.resolution[0].scalar[0].timestep
        })
        .enter()
        .append("rect")
        .attr("class", "tick")
        .attr("x", function(d){
          timestep = parseInt(d.time)
          return width * timestep / 50000;
        })
        .attr("height", height/25 )
        .attr("width", "1px")
        .attr("fill", "#777")


}
=======
function load_storyline_view(simulations){
    var color = ['#1b9e77','#d95f02','#7570b3','#e7298a','#66a61e','#fdb462']
    event_color = color
    simulations = simulations.simulation

    event_name = ["Asteroids Airbursts","Asteroids Hit the Ocean","Pressure Wave Arrive Sealevel","Shock Wave Arriving Seabed","Water Jet and Rim Waves", "Self Defined"]

    var margin = {top: 20, right: 20, bottom: 20, left: 20 }
    var storyline_view = d3.select(".storyline_view")


    var width = parseFloat(storyline_view.attr("width")) - margin.left - margin.right
    var height = parseFloat(storyline_view.attr("height")) - margin.top - margin.bottom

    var svg = storyline_view.append("g")
        .attr("id", "storyline_svg")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("width", width)
        .attr("height", height)


	load_storyline_mesh()


    var line_container_svg = svg.append("g")
        .attr("width", width)

    var line_container = svg.selectAll(".line_container")
        .data(simulations)
        .enter().append("g")
        .attr("class","lines")
        .attr("transform",function(d){
            transform = "translate(0," + height * ( d.id + 1 ) / 9 + ")"
            return transform
        })
        .on("mouseover",function(d){
          highlight_simulation(d.name)
          refresh_highlight_all()
          // d3.select(this).classed("highlight", true)
        })
        .on("mouseout",function(d){
          highlight_simulation(d.name)
          refresh_highlight_all()
          // d3.select(this).classed("highlight", false)
        })

	line_container.append("text")
    			  .text(function(d){return d.name})
    			  .attr('x',-width/30)
    			  .attr('y',height/30)
    			  .attr("font-size", width/100)


    var tool_tip = d3.tip()
            .attr("class", "d3-tip")
            .offset([-8, 0])
            .html(function(d) {
            return d;
            });

    svg.call(tool_tip);


    var lineGenerator = d3.line()
                      .x(function(d) {
                            return d[0]
                        })
                       .y(function(d) {
                            return d[1];
                       });

line_container.selectAll(".key_frame")
        .data(function(d,i){
          //console.log(d.name)
          var key_frame_data = d.resolution[0].scalar[0].keyframe
          for(var i=0; i<key_frame_data.length; i++)
          {
              key_frame_data[i].simulation = d.name
              //console.log(key_frame_data[i])
          }

          return key_frame_data
        })
        .enter()
        .append('path')
        .attr("class", function(d,i){
      		  return "key_frame" + d.id;
      	})
        .classed("keyframes",true)
        .attr('fill', function(d){
            return color[d.id]
        })
        .attr('d', function(d){
            return lineGenerator(tri_generator(width * parseInt(d.timestep) / 50000, 0))
        })
        .attr('simulation',function(d){
          return d.simulation
        })
       .on("click", function(d){
            //alert(d.simulation)
        })
        .on("mousemove",function(d,i){
           var input = "Timestep : " + d.timestep;
           tool_tip.show(input);
        })
	    .on("mouseout",function(d){
            tool_tip.hide();
	    })


    line_container.append("rect")
        .attr("class","line")
        .attr("width",width )
        .attr("height",height/25)
        .style("border-style","solid")
        .attr("id" , function(d){ return "number" + d.id;});




    line_container.selectAll(".mytick")
        .data(function(d){
          var timestp_array = d.resolution[0].scalar[0].timestep;
          for(var i=0; i<timestp_array.length; i++)
          {
              timestp_array[i].simulation = d.name

          }

          return timestp_array
        })
        .enter()
        .append("rect")
        .attr("class", "mytick")
        .classed("chosen",true)
        .attr("simulation",function(d){
        	//console.log(d.simulation)
        	return d.simulation
        })
        .attr("timestep",function(d){
        	return d.time
        })
        .attr("x", function(d){
          timestep = parseInt(d.time)
          return width * timestep / 50000;
        })
        .attr("height", height/25 )
        .attr("width", "1px")
        .attr("fill-opacity",0.3)
        .attr("stroke-opacity",0)
        .attr("style",function(d,i)
        {
        	var color = "#444"
        	var index
        	for (var i = 0; i < 7; i++) 
        	{
        		if(simulation_timestep_status[i].name == d.simulation)
        		{
        			index = i
        			break
        		}
        	}
        	for (var j = 0; j < simulation_timestep_status[index].timestep_info.length; j++)
          	{
          	  if(d.time == simulation_timestep_status[index].timestep_info[j].timestep.timestep)
          	  {
          	  	if(simulation_timestep_status[index].timestep_info[j].timestep.id === "")
          	  		{
          	  			color = event_color[5];
          	  			//alert(simulation_timestep_status[index].timestep_info[j].timestep.id)
          	  		}
          	  	//alert(simulation_timestep_status[d.simulation].timestep_info[j].timestep.timestep)
          	  	else
          	  		color = event_color[parseInt(simulation_timestep_status[index].timestep_info[j].timestep.id)]
          	  }
          	}

        	return "fill:" + color
        })
        

    line_container.append("rect")
                .attr("class","fake_line")
                .attr("width",width )
                .attr("height",height/25)
                .attr("opacity", 0)
                .on("click", function(d){

            var timestep;

  
            console.log("event.x",d3.event.x)
            console.log("event.y",d3.event.y)
            console.log(d3.event.offsetX)
            console.log(d3.event.offsetY)

	        if(d3.event.offsetX>0 && d3.event.offsetX<width)
		        timestep = d3.event.offsetX * 50000 / width


	        var totaltimestepcnt = d.resolution[0].scalar[0].totaltimestepcnt;
          var find = 0;

	        for(var i = 0; i < totaltimestepcnt; i++)
	        {
		        if(d.resolution[0].scalar[0].timestep[i].time > timestep)
		        {
			        timestep = d.resolution[0].scalar[0].timestep[i].time;
                    find = 1;
			        break;
		        }
	        }
            if(find == 0)
            timestep = d.resolution[0].scalar[0].timestep[totaltimestepcnt-1].time


        	//alert("asfsdf")

			//for (var j=0; j < simulation_timestep_status[0].timestep_info.length; j++)
          	//	console.log(simulation_timestep_status[0].timestep_info[j].timestep.timestep);


            var return_num = select_image(d.name , timestep);

            if( !return_num)
                return;

            refresh_all();

            d3.select("#storyline_svg")
            .append("g")
            .append("path")
            .attr("class", "tag")
            .classed("keyframes",true)
            .classed("chosen",true)
            .attr('d', function(){
                return (lineGenerator(tri_generator(timestep*width/50000, height * ( d.id + 1 ) / 9)))
            })
            .attr("timestep", function(d){
                return timestep;
            })
            .attr("simulation", function(){
                return d.name;
            })
            .style("fill",color[5])
            .on("click", function(d){
                d3.select(this).remove();
                delete_image(d3.select(this).attr("simulation") ,d3.select(this).attr("timestep"));
                refresh_all();
                tool_tip.hide();
            })
            .on("mousemove",function(d,i){
                highlight_simulation(d3.select(this).attr("simulation"))
                refresh_highlight_all()
               var input ="Timestep : " + d3.select(this).attr("timestep");
               tool_tip.show(input);
            })
            .on("mouseout",function(d){
                highlight_simulation(d3.select(this).attr("simulation"))
                refresh_highlight_all()
                tool_tip.hide();
            })

   })
	    .on("mouseover",function(d){
          d3.select(this).style('cursor','pointer');
          var input ="Simulation : "+ d.name + "<br>" + "Asteroid Diameter : " + d.diameter + "m<br>" + "Angle of Entry : " + d.angle + "°";
	        if (d.airburst == 0)
                input = input + "<br>" + "No Airburst";
            else
                input = input + "<br>" + "Airburst happens " + d.airburst + "km above sea level"
            tool_tip.show(input);
        })
        .on("mouseout", function(d){
            d3.select(this).style('cursor','default');
            tool_tip.hide();
        })


    load_time_tick()
    load_storyline_legend(color)

}

function load_time_tick(){
  var storyline_svg = d3.select("#storyline_svg")
  var width = parseInt(storyline_svg.attr("width"))
  var height = parseInt(storyline_svg.attr("height"))

  var xRange = d3.scaleLinear().domain([0,50000]).range([0,width])
  var xAxis = d3.axisBottom(xRange)
  var tick = storyline_svg.append("g")
            .attr("id", "timetick")
            .call(xAxis)
            .each(function(d){
              position = distance_from_parent_to_id(this, "compare_story")
              d3.select(this).attr("compare_story_x", position.x)
              d3.select(this).attr("compare_story_y", position.y)
            })

  tick.selectAll("line")
      .attr("stroke", "#333")

  tick.selectAll("path")
      .attr("stroke", "#333")
}

function load_storyline_legend(color)
{
    var storyline_svg = d3.select("#storyline_svg")
    var width = parseInt(storyline_svg.attr("width"))
    var height = parseInt(storyline_svg.attr("height"))
    var color = ['#1b9e77','#d95f02','#7570b3','#e7298a','#66a61e','#fdb462']

    var lineGenerator = d3.line()
                      .x(function(d) {
                            return d[0]
                        })
                       .y(function(d) {
                            return d[1];
                       });


    var svg = storyline_svg.append("g")
          .attr("class", "legend")
          .attr("transform", "translate(0," + height * 8 / 9 + ")")

          var rectWidth = width*0.166;
          var rectHeight = height*0.1;
          var dataset = [ rectWidth*0 , rectWidth*1 , rectWidth*2 , rectWidth*3 , rectWidth*4 , rectWidth*5];


          svg.selectAll(".legend")
                .data(dataset)
                .enter()
                .append("g")
                .append("path")
                .attr('d', function(d,i){
                    return lineGenerator(tri_generator(d,rectHeight*0.7))
                })
                
                .attr("fill",function(d,i){
                      return color[i];
                })
                .attr("opacity",1)
                .on("click",function(d,i){
                if(i == 5)
                {
                  if(d3.select(this).attr("opacity")==1)
                  {
                    d3.select(this).attr("opacity",0.2);
                    d3.selectAll(".tag").attr("visibility","hidden")
                  }
                  else
                  {
                    d3.select(this).attr("opacity",1);
                    d3.selectAll(".tag").attr("visibility","visible")
                  }
                }

                  else
                {
                  if(d3.select(this).attr("opacity")==1)
                  {
                    d3.select(this).attr("opacity",0.2);
                    d3.selectAll(".key_frame"+i).attr("visibility","hidden")
                  }
                  else
                  {
                    d3.select(this).attr("opacity",1);
                    d3.selectAll(".key_frame"+i).attr("visibility","visible")
                  }
                }
    })


        var font_size = rectHeight/2.4 + "px"

          svg.selectAll(".text")
              .data(event_name)
              .enter()
              .append("text")
              .style("font-size", font_size)
        //.style("color", "#000000")
              .attr("fill", color[5])
              .attr("x", function(d, i){
      return (i + 0.08)* rectWidth;
        })
              .attr("y", function(d, i) {
                  return 0.5*rectHeight;
              })
              .text(function(d){return d;
        })
}

function select_timestep(simulations, height , width)
{

	var tool_tip1 = d3.tip()
            .attr("class", "d3-tip")
            .offset([-8, 0])
            .html(function(d) {
            return d;
            });

    d3.select("#storyline_svg").call(tool_tip1);


	var line_container = svg.selectAll(".line_container")
      .on("click",function(d){
			//alert(d3.event.offsetX) // -3 -> width -3 ???
			var timestep;
      //console.log("d3.event.offsetX",d3.event.offsetX)
			if(d3.event.offsetX>0 && d3.event.offsetX<width)
				timestep = d3.event.offsetX * 50000 / width

			var totaltimestepcnt = d.resolution[0].scalar[0].totaltimestepcnt;

			for(var i = 0; i < totaltimestepcnt; i++)
			{
				if(d.resolution[0].scalar[0].timestep[i].time > timestep)
				{
					timestep = d.resolution[0].scalar[0].timestep[i].time;
					break;
				}
			}
			


		})

        .on("mouseover",function(d){
            var input ="Simulation : "+ d.name;
            tool_tip1.show(input);
        })
        .on("mouseout", function(d){
            tool_tip1.hide();
        })
}

function refresh_storyline(){
  // console.log("CALL")
  d3.selectAll(".lines").classed("highlight", function(d){
    if (get_simulation_highlight_by_name(d.name)){
      return true
    }
    return false
  })

  d3.selectAll(".lines").classed("chosen", function(d){
    if (get_simulation_by_name(d.name) === 0 ){
      return false
    }
    return true
  })

  d3.select("#storyline_svg").selectAll(".keyframes").classed("highlight", function(d){
    var name = d3.select(this).attr("simulation")
    if (get_simulation_highlight_by_name(name)){
      return true
    }
    return false
  })

  d3.select("#storyline_svg").selectAll(".keyframes").classed("chosen", function(d)
  {
    var name = d3.select(this).attr("simulation")
    if (get_simulation_by_name(name) === 0 )
    {
      return false
    }
    return true
  })

  
  d3.select("#storyline_svg").selectAll(".mytick").attr("style",function(d)
  {
    var color = "#444"
    var index
    //alert(d3.select(this).attr("simulation"))
	for (var i = 0; i < 7; i++) 
	{
		if(simulation_timestep_status[i].name === d3.select(this).attr("simulation"))
		{
			index = i
			break
		}
	}
	if(i == 7)//没找到 是坐标轴里的怪东西
	{
		return "fill:" + color
	}
	//alert(simulation_timestep_status[0].name)
	//console.log(index)
	for (var j = 0; j < simulation_timestep_status[index].timestep_info.length; j++)
  	{
  	  if(d3.select(this).attr("timestep") == simulation_timestep_status[index].timestep_info[j].timestep.timestep)
  	  {
  	  	if(simulation_timestep_status[index].timestep_info[j].timestep.id === "")
  	  			color = event_color[5]
  	  	else
  	  		color = event_color[parseInt(simulation_timestep_status[index].timestep_info[j].timestep.id)]
  	  }
  	}

	return "fill:" + color
  })
  



      
}

function tri_generator(x,y)
{
    var storyline_view = d3.select(".storyline_view")
    var margin = {top: 20, right: 20, bottom: 20, left: 20 }
    var width = parseFloat(storyline_view.attr("width")) - margin.left - margin.right
    var edge_length = width * 0.014 * 0.7;
    var tri_data = [[0, 0], [20, 0],[10, 17], [0,0]];
    tri_data[0][0] = x - edge_length * 0.5;
    tri_data[0][1] = y - edge_length * 0.5 * 1.732;

    tri_data[1][0] = x + edge_length * 0.5;
    tri_data[1][1] = y - edge_length * 0.5 * 1.732;

    tri_data[2][0] = x;
    tri_data[2][1] = y;

    tri_data[3][0] = x - edge_length * 0.5;
    tri_data[3][1] = y - edge_length * 0.5 * 1.732;
    return tri_data
}


function load_storyline_mesh()
{
	var storyline_svg = d3.select("#storyline_svg")
  var width = parseInt(storyline_svg.attr("width"))
  var height = parseInt(storyline_svg.attr("height"))
  var rectHeight = height*0.1;

	var svg = storyline_svg.append("g")

	var labels = [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000];

	svg.selectAll(".rect")
	.data(labels)
	.enter()
  .append("g")
  .append("rect")
	.attr("x",function(d){
  		return d/50000*width - rectHeight/10;
  	})
    .attr("y",0)
    .attr("width",function(d){
        return rectHeight/10 + "px" ;
    })
    .attr("height", height * 0.82)
    .attr("fill", "#ddd")
	  .attr("opacity" , 0.5)
}
>>>>>>> 28a0990b7009e5da978b9cd60de5211359f39645
