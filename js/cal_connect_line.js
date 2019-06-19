function get_image_position(){

  var simulation_number = get_simulation_show_cnt()
  var image_position = new Array()

  for (var i = 0 ; i < simulation_number; i ++ ){
    image_position[i] = new Array()
    var this_simulation = get_simulation_by_index(i)
    var this_simulation_number = this_simulation.timestep.length
    this_simulation_dom = d3.selectAll("#compare" + i)
    for (var j = 0 ; j < this_simulation_number; j ++ )
    {
      var this_image = this_simulation_dom.selectAll("#image" + j)
      this_begin_x = parseFloat(this_image.attr("begin_x"))
      this_begin_y = parseFloat(this_image.attr("begin_y"))
      this_end_x = parseFloat(this_image.attr("end_x"))
      this_end_y = parseFloat(this_image.attr("end_y"))
      image_position[i][j] = new Array()

      image_position[i][j].level = i
      image_position[i][j].level = j
      image_position[i][j].begin_x = this_begin_x
      image_position[i][j].end_x = this_end_x
      image_position[i][j].path = new Array()
      image_position[i][j].path.push({x:this_begin_x})
      // console.log(this_image)
      // {begin_x: this_begin_x, end_x: this_end_x}
    }
  }
  return image_position
}
function calculate_line_path(){
  var simulation_number = get_simulation_show_cnt()
  if (simulation_number === 0 )
  {
    return false
  }
  image_width = parseInt(d3.selectAll("#compare0").selectAll("#image0").attr("image_width"))
  image_height = parseInt(d3.selectAll("#compare0").selectAll("#image0").attr("image_height"))
  // max_width =
  min_x = 50000
  max_x = 0
  var image_position = get_image_position()


  var level_number = image_position.length
  for(var i = 0; i < level_number; i ++ )
  {
    var image_number = image_position[i].length
    if (min_x > image_position[i][0].begin_x - image_width)
    {
      min_x = image_position[i][0].begin_x - image_width
    }

    if (min_x > image_position[i][0].end_x)
    {
      min_x = image_position[i][0].end_x
    }

    if (max_x < image_position[i][image_number - 1].begin_x + image_width)
    {
      max_x = image_position[i][image_number - 1].begin_x + image_width
    }
    if (max_x < image_position[i][image_number - 1].end_x)
    {
      max_x = image_position[i][image_number - 1].end_x
    }
  }
  min_x = min_x - 1 // 防止边缘
  console.log("min_x: ", min_x)
  console.log("max_x: ", max_x)
  var position_at_level = new Array()
  var need_to_put = new Array()
  for (var j = 0 ; j < image_position[0].length ; j ++)
  {
    need_to_put.push(image_position[0][j])
  }
  console.log(image_position)
  for( i = 1; i < level_number; i ++ )
  {// 对其中一层进行处理，从第二层开始
    var number_of_segment = image_position[i].length
    var segment = new Array()
    var segment_count = new Array()
    for (var j = 0; j < number_of_segment + 1 ; j ++ )
    {
      segment_count[j] = 0;
    }

    segment.push(min_x)
    for (var j = 0 ; j < number_of_segment; j ++ )
    {
      segment.push(image_position[i][j].end_x)
    }
    segment.push(max_x)

    for (var j = 0 ; j < need_to_put.length; j ++ )
    {
      for ( var k = 0 ; k < number_of_segment + 1; k ++ )
      {
        if (segment[k] < need_to_put[j].end_x && need_to_put[j].end_x < segment[k + 1] )
        {
          segment_count[k] ++
          break;
        }
      }
    }
    console.log(segment_count)
    console.log(need_to_put)
    var need_to_put_old = need_to_put
    var nees_to_put = new Array()

    for (var i = 0; j < number_of_segment; j ++ )
    {
      need_to_put.push(image_position[i][j])
    }

    var accu_count = 0
    for (var j = 0 ; j < need_to_put_old.length; j ++ )
    {
      accu_count += segment_count[j]
      need_to_put.insert(accu_count, neet[i][j])
      accu_count += 1
    }
    console.log(need_to_put)
  }
}

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
