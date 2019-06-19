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
        .attr("id", "storyline_svg")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("width", width)
        .attr("height", height)

    var line_container = svg.selectAll(".line_container")
        .data(simulations)
      .enter().append("g")
        .attr("class","line_container")
        .attr("transform",function(d){
            transform = "translate(0," + height * ( d.id + 1.5 ) / 8 + ")"
            return transform
        })

    line_container.append("rect")
        .attr("class","line")
        .attr("width",width )
        .attr("height",height/25)
        .style("border-style","solid")
        // .style("fill",function(d){
        //   return simulation_color[d.id]
        // })
        .attr("id" , function(d){ return "number" + d.id;});

    line_container.selectAll(".key_frame")
        .data(function(d){
          console.log(d.resolution[0].scalar[0].keyframe)
          return d.resolution[0].scalar[0].keyframe
        })
        .enter()
        .append("rect")
        .attr("class", function(d){
		return "key_frame" + d.id;
	})
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
	.attr("opacity",1)
	.attr("visibility","visible")
        .on("click",function(d){
	  alert("asdasd")
          alert( "key_frame" + d.id)
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
        .attr("fill", function(d,i){
          // console.log(d3.select(this.parentNode))
          return "#444"
        })
        .attr("opacity",0.3)

//--------------------------------------------------------Newly edited------------------------------------------------------------------

    load_legend(color)
    select_timestep(simulations , height , width)

}

function load_legend(color){

    var storyline_svg = d3.select("#storyline_svg")
    var width = parseInt(storyline_svg.attr("width"))
    var height = parseInt(storyline_svg.attr("height"))

    var svg = storyline_svg.append("g")
          .attr("id", "legend")

          var dataset = [ width*0.1 , width*0.1 , width*0.1 , width*0.1 , width*0.1 ];

          var rectWidth = width*0.2;
        	var rectHeight = height*0.1;

          svg.selectAll(".rect")
                .data(dataset)
                .enter()
                .append("g")
  	      .append("rect")

                .attr("x",function(d,i){
  		   return i * rectWidth;
  	      })
                .attr("y",0)
                .attr("width",function(d){
                      return d / 3 ;
                })
                .attr("height",rectHeight / 1.05)
                .attr("fill",function(d,i){
                      return color[i];
                })
			.attr("opacity",1)
			.on("click",function(d,i){
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

		})


  	font_size = '0.5em';
          svg.selectAll(".text")
              .data(event_name)
              .enter()
              .append("text")
              .style("font-size", font_size)
  	    //.style("color", "#000000")
              .attr("fill", "#FF0000")
              .attr("x", function(d, i){
  		return (i + 0.18)* rectWidth;
  	    })
              .attr("y", function(d, i) {
                  return 0.7*rectHeight;
              })
              .text(function(d){return d;
  	    })
}

function select_timestep(simulations, height , width)
{


	var fake_line = d3.select("#storyline_svg")
	.selectAll(".fake_line")
        .data(simulations)
      	.enter().append("g")
        .attr("class","fake_line")
        .attr("transform",function(d){
            transform = "translate(0," + height * ( d.id + 1.5 ) / 8 + ")"
            return transform
        })
		.on("click",function(d){
			//alert(d3.event.offsetX) // -3 -> width -3 ???
			var timestep;
			if(d3.event.offsetX>0 && d3.event.offsetX<width)
				timestep = d3.event.offsetX * 50000 / width

			alert(d.name); //simulation name

			var totaltimestepcnt = d.resolution[0].scalar[0].totaltimestepcnt;

			for(var i = 0; i < totaltimestepcnt; i++)
			{
				if(d.resolution[0].scalar[0].timestep[i].time > timestep)
				{
					timestep = d.resolution[0].scalar[0].timestep[i].time;
					break;
				}
			}
			alert("Nearest timestp:" + timestep);

		})

	fake_line.append("rect")
        .attr("class","line")
        .attr("width",width )
        .attr("height",height/25)
        .style("border-style","solid")
        .style("fill",function(d){
          return "#FF0000"
        })
        .attr("id" , function(d){ return "number" + d.id;})
		.attr("opacity",0)


}
