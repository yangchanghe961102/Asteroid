function load_compare_story(data){

  var margin = {top: 10, right: 10, bottom: 10, left: 30 }
  var width = document.getElementById("compare_story").clientWidth - margin.left - margin.right
  var height = document.getElementById("compare_story").clientHeight - margin.top - margin.bottom
  var svg = d3.select("#compare_story").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("id", "compare_story")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("width", width)
      .attr("height", height)

  var compare_height_percent = 0.68
  var story_height_percent = 0.32

  compare_height = height * compare_height_percent
  story_height = height * story_height_percent

  var storyline_view = svg.append("g")
      .attr("class", "storyline_view")
      .attr("width", width)
      .attr("height", story_height)
      .attr("transform", function(d){
        transform = "translate(0," + (height - story_height) + ")"
        return transform
      })
  //
  // storyline_view.append("rect")
  //     .attr("width", width)
  //     .attr("height", story_height)
  //     .classed("kuang_rect", true)


  var compare_view = svg.append("g")
      .attr("class", "compare_view")
      .attr("width", width)
      .attr("height", compare_height )


  // compare_view.append("rect")
  //     .attr("width", width)
  //     .attr("height", compare_height )
  //     .classed("kuang_rect", true)


  load_compare_view()
  load_storyline_view(data)

}
