<<<<<<< HEAD

var global_data;
function update_rendering(simulation, resolution, scalar, channel, timestep, phi, theta, scale)
{
  d3.select("#try_3D_navigation")
  console.log(simulation, resolution, scalar)
  console.log("choose???")
}
mapping_table = ["yA11","yB11","yC11","yA31","yB31","yC31","yA32"];

var time_happen = new Array(7)
    time_happen[0] = new Array( -1,     -1,     11678,  -1,     -1)
    time_happen[1] = new Array( 6931,   -1,     12406,  -1,     -1)
    time_happen[2] = new Array( 5335,   -1,     13804,  -1,     -1)
    time_happen[3] = new Array( -1,     8948,   -1,     15159,  36170)
    time_happen[4] = new Array( 7892,   8915,   -1,     15079,  36132)
    time_happen[5] = new Array( 5789,   9113,   -1,     13768,  36053)
    time_happen[6] = new Array( -1,     32207,  -1,     35387,  45008)
=======

var global_data;

var compare_view_set = new Array()

var event_color;

var SIMULATION_NAME = ["yA11", "yB11", "yC11", "yA31", "yB31", "yC31", "yA32"]
var full_channel_name = {prs: "Pressure", tev: "Temperature", v02: "Water fraction", v03: "Asteroid fraction" }
var four_channel = ["prs", "tev", "v02", "v03"]
var chosen_channel = [1, 0, 0, 0]

var current_volume = {simulation: "", resolution: "", scalar: "", channel: "", timestep: ""}

var simulation_show_list = new Array()

var simulation_highlight_list = new Array()

var simulation_timestep_status = new Array()

/*var simulation_chosen = [false, false, false, false, false, false, false]
var simulation_highlight = [false, false, false, false, false, false, false]

function refresh_simulation_chosen(){
  refresh_

}
function refresh_simulation_highlight(){

}*/

// 获取g的相对位置。谢谢
function getTranslate(transform){
  if (transform === null ){ // 此处表示该g没有相应的变量
    return {x : 0 , y : 0 }
  }
  x = parseFloat(transform.split("(")[1].split(",")[0])
  y = parseFloat(transform.split(",")[1].split(")")[0])
  // console.log("Get transform position", x,",", y)
  return {x:x,y:y}

}

function distance_from_parent_to_id(this_node,id){
  var accu_x = 0
  var accu_y = 0

  current_this = this_node.parentNode

  while(1){
    if (d3.select(current_this).attr("id") === id ){
      break;
    }
    var relative_position = getTranslate(d3.select(current_this).attr("transform"))
    accu_x = accu_x + relative_position.x
    accu_y = accu_y + relative_position.y
    current_this = current_this.parentNode
    // console.log(relative_position)
  }
  // console.log("Get_position", {x: accu_x, y: accu_y})
  return {x: accu_x, y: accu_y}

}

function init_simulation_timestep_status() {
  for (var i = 0; i < 7; i++) {
    var timestep_list = global_data.simulation[i].resolution[0].scalar[0].keyframe;
    var simulation_name = global_data.simulation[i].name;
    var timestep_info_list = new Array();
    // console.log(timestep_list);
    for (var j = 0; j < timestep_list.length; j++) {
      timestep_info_list.push({
        "timestep": timestep_list[j],
        "phi" : 0,
        "theta": 90,
        "scale": 1.0,
        "highlight": false
      });
    }
    simulation_timestep_status.push({
      "name": simulation_name,
      "timestep_info": timestep_info_list,
    });
    console.log(simulation_timestep_status[i]);

    simulation_highlight_list.push({
      "name": simulation_name,
      "highlight": false
    });
  }
}

function add_simulation(simulation_name, resolution_name, scalar_name, channel_name, keyframe) {
  var index = 0;
  var channel_status = new Array();
  var in_list = false;

  for (; index < simulation_show_list.length; index++) {
    if (simulation_show_list[index].simulation === simulation_name) {
      channel_status = simulation_show_list[index].channel;
      simulation_show_list.splice(index, 1);
      in_list = true;
      break;
    }
  }

  if (in_list === false) {
    channel_status = [{name: "prs", on: false}, {name: "tev", on: false}, {name: "v02", on: false}, {name: "v03", on: false}];
  }

  for (var i = 0; i < 4; i++) {
    if (channel_status[i].name === channel_name) {
      channel_status[i].on = !channel_status[i].on;
    }
  }

  var delete_simulation = true;
  for (var i = 0; i < 4; i++) {
    if (channel_status[i].on === true) {
      delete_simulation = false;
      break;
    }
  }

  if (delete_simulation === true) {
    console.log("Delete simulation: " + simulation_name);
  }
  else {
    simulation_show_list.push({
      "simulation": simulation_name,
      "resolution": resolution_name,
      "scalar": scalar_name,
      "channel": channel_status,
      "highlight": false
    });
  }

  // console.log(simulation_show_list)
}

function get_simulation_show_cnt() {
  return simulation_show_list.length;
}

function get_simulation_by_index(simulation_index) {
  if (simulation_index >= simulation_show_list.length) {
    console.log("Wrong index!")
    return;
  }

  var simulation = simulation_show_list[simulation_index].simulation;
  var resolution = simulation_show_list[simulation_index].resolution;
  var scalar = simulation_show_list[simulation_index].scalar;
  var channel = simulation_show_list[simulation_index].channel;
  var highlight = simulation_show_list[simulation_index].highlight;
  var channel_string = "";
  for (var i = 0; i < 4; i++) {
    if (channel[i].on === true) {
      channel_string += "1";
    }
    else {
      channel_string += "0";
    }
  }
  var timestep_list = new Array();
  for (var i = 0; i < 7; i++) {
    if (simulation_timestep_status[i].name === simulation)
    {
      for (var j = 0; j < simulation_timestep_status[i].timestep_info.length; j++) {
        t_id = simulation_timestep_status[i].timestep_info[j].timestep.id;
        t_name = simulation_timestep_status[i].timestep_info[j].timestep.name;
        t_timestep = simulation_timestep_status[i].timestep_info[j].timestep.timestep;
        t_phi = simulation_timestep_status[i].timestep_info[j].phi;
        t_theta = simulation_timestep_status[i].timestep_info[j].theta;
        t_scale = simulation_timestep_status[i].timestep_info[j].scale;
        t_highlight = simulation_timestep_status[i].timestep_info[j].highlight;
        timestep_list.push({
          "id": t_id,
          "name": t_name,
          "timestep": t_timestep,
          "phi": t_phi,
          "theta": t_theta,
          "scale": t_scale,
          "highlight": t_highlight
        });
      }
    }
  }
  return {"simulation": simulation,
          "resolution": resolution,
          "scalar": scalar,
          "channel": channel_string,
          "highlight": highlight,
          "timestep": timestep_list
  };

  // console.log(simulation_show_list)
}

function get_simulation_by_name(simulation_name) {
  index = 0;
  for (; index < simulation_show_list.length; index++) {
    if (simulation_show_list[index].simulation === simulation_name) {
      var simulation = simulation_show_list[index].simulation;
      var resolution = simulation_show_list[index].resolution;
      var scalar = simulation_show_list[index].scalar;
      var channel = simulation_show_list[index].channel;
      var highlight = simulation_show_list[index].highlight;
      var channel_string = "";
      for (var i = 0; i < 4; i++) {
        if (channel[i].on === true) {
          channel_string += "1";
        }
        else {
          channel_string += "0";
        }
      }
      var timestep_list = new Array();
      for (var i = 0; i < 7; i++) {
        if (simulation_timestep_status[i].name === simulation_name)
        {
          for (var j = 0; j < simulation_timestep_status[i].timestep_info.length; j++) {
            t_id = simulation_timestep_status[i].timestep_info[j].timestep.id;
            t_name = simulation_timestep_status[i].timestep_info[j].timestep.name;
            t_timestep = simulation_timestep_status[i].timestep_info[j].timestep.timestep;
            t_phi = simulation_timestep_status[i].timestep_info[j].phi;
            t_theta = simulation_timestep_status[i].timestep_info[j].theta;
            t_scale = simulation_timestep_status[i].timestep_info[j].scale;
            t_highlight = simulation_timestep_status[i].timestep_info[j].highlight;
            timestep_list.push({
              "id": t_id,
              "name": t_name,
              "timestep": t_timestep,
              "phi": t_phi,
              "theta": t_theta,
              "scale": t_scale,
              "highlight": t_highlight
            });
          }
        }
      }
      return {"simulation": simulation,
              "resolution": resolution,
              "scalar": scalar,
              "channel": channel_string,
              "highlight": highlight,
              "timestep": timestep_list
      };
    }
  }
  return 0;

  // console.log(simulation_show_list)
}


function cancel_simulation(simulation_name) {
  index = 0;
  for (; index < simulation_show_list.length; index++) {
    if (simulation_show_list[index].simulation === simulation_name) {
      simulation_show_list.splice(index, 1);
      break;
    }
  }

  // console.log(simulation_show_list)
}

function select_image(simulation_name, timestep){
  add_timestep = {timestep: {id: "", name: "", timestep: timestep},
    phi: 0, theta: 90, scale: 1.0,
    highlight: false
  };
  index = 0;
  for (; index < simulation_show_list.length; index++) {
    if (simulation_show_list[index].simulation === simulation_name) {
      for (var i = 0; i < 7; i++) {
        if (simulation_timestep_status[i].name === simulation_name) {
          var j = 0;
          for (; j < simulation_timestep_status[i].timestep_info.length; j++) {
            if (simulation_timestep_status[i].timestep_info[j].timestep.timestep === timestep) {
              console.log("Adding error: adding a keyframe.");
              return false;
            }
            else if (simulation_timestep_status[i].timestep_info[j].timestep.timestep > timestep) {
              simulation_timestep_status[i].timestep_info.splice(j, 0, add_timestep);
              return true;
            }
          }
          simulation_timestep_status[i].timestep_info.splice(j, 0, add_timestep);
          return true;
        }
      }
    }
  }
  return false;
}

function delete_image(simulation_name, timestep){
  index = 0;
  for (; index < simulation_show_list.length; index++) {
    if (simulation_show_list[index].simulation === simulation_name) {
      for (var i = 0; i < 7; i++) {
        if (simulation_timestep_status[i].name === simulation_name) {
          var j = 0;
          for (; j < simulation_timestep_status[i].timestep_info.length; j++) {
            if (simulation_timestep_status[i].timestep_info[j].timestep.timestep === timestep) {
              simulation_timestep_status[i].timestep_info.splice(j, 1);
              console.log("Delete success.");
              return true;
            }
          }
          console.log("Delete error: unsuccessful success.")
          return false;
        }
      }
    }
  }
  console.log("Delete error: unsuccessful success.")
  return false;
}

// 若高亮，则取消。若未高亮，则高亮

function get_simulation_highlight_by_name(simulation_name){
  for (var i = 0; i < 7; i++) {
    if (simulation_highlight_list[i].name === simulation_name) {
      return simulation_highlight_list[i].hight
    }
  }
}

function highlight_simulation(simulation_name){
  index = 0;
  for (; index < simulation_show_list.length; index++) {
    if (simulation_show_list[index].simulation === simulation_name) {
      simulation_show_list[index].highlight = !simulation_show_list[index].highlight;
      break;
    }
  }

  for (var i = 0; i < 7; i++) {
    if (simulation_highlight_list[i].name === simulation_name) {
      simulation_highlight_list[i].hight = !simulation_highlight_list[i].hight;
    }
  }

  // console.log(simulation_show_list)
  // console.log(simulation_highlight_list)
}

// 若高亮则取消，若未高亮则高亮
function highlight_image(simulation_name, timestep) {
  index = 0;
  for (; index < simulation_show_list.length; index++) {
    if (simulation_show_list[index].simulation === simulation_name) {
      for (var i = 0; i < 7; i++) {
        if (simulation_timestep_status[i].name === simulation_name) {
          for (var j = 0; j < simulation_timestep_status[i].timestep_info.length; j++) {
            if (simulation_timestep_status[i].timestep_info[j].timestep.timestep === timestep) {
              simulation_timestep_status[i].timestep_info[j].highlight = !simulation_timestep_status[i].timestep_info[j].highlight;
              return true;
            }
          }
        }
      }
    }
  }
  return false;
}

function apply_to_all(phi, theta, scale) {
  for (var index = 0; index < simulation_timestep_status.length; index++) {
    for (var i = 0; i < simulation_timestep_status[index].timestep_info.length; i++) {
      simulation_timestep_status[index].timestep_info[i].phi = phi;
      simulation_timestep_status[index].timestep_info[i].theta = theta;
      simulation_timestep_status[index].timestep_info[i].scale = scale;
    }
  }
}

function refresh_all(){
  refresh_choose_view()
  refresh_compare_view()
  refresh_channel()
  refresh_storyline()
}

function refresh_highlight_all(){
  refresh_choose_view()
  refresh_highlight_compare_view()
  refresh_channel()
  refresh_storyline()
}
>>>>>>> 28a0990b7009e5da978b9cd60de5211359f39645
