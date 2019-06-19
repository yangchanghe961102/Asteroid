//关键帧时间
var yA11_timestep = ["11678"];
var yA11_event = [2];
var yB11_timestep = ["06931","12406"];
var yB11_event = [0,2];
var yC11_timestep = ["05335","13804"];
var yC11_event = [0,2];

var yA31_timestep = ["08948","15159","36170"];
var yA31_event = [1,3,4];
var yB31_timestep = ["07982","08915","15079","36132"];
var yB31_event = [0,1,3,4];
var yC31_timestep = ["05789","09113","13768","36053"];
var yC31_event = [0,1,3,4];

var yA32_timestep = ["32207","35387","45008"];
var yA32_event = [1,3,4];
//alert(yA32_timestep.length);

//图片悬停高亮 复原
var last_layer;//记录刚才移开的是哪个

function highlight(x)
{
 	var str = x.id;
	last_layer = x.style.zIndex;
	x.style.zIndex = 999;

  if(str.indexOf("no1") == 0)
  {
    x.style.borderColor = "#FF0000";

    str = str.replace("no1pic","");

    //alert("container(" + mapping_function(current_data) + "," + str + ")");
    document.getElementById("container(" + mapping_function(current_data) + "," + str + ")").setAttribute("stroke","#FF0000");
  }
  else if(str.indexOf("no2") == 0)
  {
    x.style.borderColor = "#00FF00";

    str = str.replace("no2pic","");

    document.getElementById("container(" + mapping_function(last_data) + "," + str + ")").setAttribute("stroke","#00FF00");
  }
  //document.getElementById()
}

//move out
function normal(x)
{
  var str = x.id;

  if(str.indexOf("no1") == 0)
  {
    if(selected_div1 == str)
    {
      return;
    }
    x.style.borderColor = "#000000";
    x.style.zIndex = last_layer;
    str = str.replace("no1pic","");

    document.getElementById("container(" + mapping_function(current_data) + "," + str + ")").setAttribute("stroke","#000000");
  }
  else if(str.indexOf("no2") == 0)
  {
    if(selected_div2 == str)
    {
      return;
    }
    x.style.borderColor = "#000000";
    x.style.zIndex = last_layer;
    str = str.replace("no2pic","");

    document.getElementById("container(" + mapping_function(last_data) + "," + str + ")").setAttribute("stroke","#000000");
  }
}

selected_div1 = "";
selected_div2 = "";

function choose_img(x)
{
  console.log("fuck???")
  var str = x.id;
  x.style.zIndex = last_layer;

  if(str.indexOf("no1") == 0)
  {
    //alert(current_data);
	//alert(current_channel);
	//alert(current_resolution);

	//alert(mapping_function(current_data));
	//alert((x.id).replace("no1pic",""));
	//alert(time_happen[2][0]);

	//alert(time_happen[mapping_function(current_data)][(x.id).replace("no1pic","")]);
	alert(time_happen[mapping_function(current_data)][(x.id).replace("no1pic","")]);
  console.log("Are you runing?")
	update_rendering(current_data,current_resolution,4,current_channel,time_happen[mapping_function(current_data)][(x.id).replace("no1pic","")],0,90,1.0);
	//current_channel
	//current_resolution
	//time_step time_happen[mapping_function(current_data)][(x.id).replace("no1pic","") + ")")]
	//update_rendering(current_data,current_resolution,4,current_channel,time_happen[mapping_function(current_data)][(x.id).replace("no1pic","") + ")")],0,90,1.0);

    if(document.getElementById(selected_div1) != null)
    {
      if(selected_div1 == str)
        return;
      else
        document.getElementById(selected_div1).style.borderColor = "#000000";
    }

    x.style.borderColor = "#FF0000";

    document.getElementById("container(" + mapping_function(current_data) + "," + str.replace("no1pic","") + ")").setAttribute("stroke","#FF0000");

    if(document.getElementById("container(" + mapping_function(current_data) + "," + selected_div1.replace("no1pic","") + ")") != null)
      document.getElementById("container(" + mapping_function(current_data) + "," + selected_div1.replace("no1pic","") + ")").setAttribute("stroke","#000000");

    selected_div1 = str;
  }
  else if(str.indexOf("no2") == 0)
  {
	//last_data
	//last_channel
	//last_resolution
	//time_step time_happen[mapping_function(last_data)][(x.id).replace("no2pic","") + ")")]
	//update_rendering(last_data,last_resolution,4,last_channel,time_happen[mapping_function(last_data)][(x.id).replace("no2pic",""))],0,90,1.0);
	//alert("!!!")
	alert(time_happen[mapping_function(last_data)][(x.id).replace("no2pic","")]);
	update_rendering(last_data,last_resolution,4,last_channel,time_happen[mapping_function(last_data)][(x.id).replace("no2pic","")],0,90,1.0);

    if(document.getElementById(selected_div2) != null)
      {
        if(selected_div2 == str)
          return;
        else
          document.getElementById(selected_div2).style.borderColor = "#000000";
      }

    x.style.borderColor = "#00FF00";

    document.getElementById("container(" + mapping_function(last_data) + "," + str.replace("no2pic","") + ")").setAttribute("stroke","#00FF00");

    if(document.getElementById("container(" + mapping_function(last_data) + "," + selected_div2.replace("no2pic","") + ")") != null)
      document.getElementById("container(" + mapping_function(last_data) + "," + selected_div2.replace("no2pic","") + ")").setAttribute("stroke","#000000");

    selected_div2 = str;
  }
}
console.log("no update")
//选中数据集
var last_data="",current_data="";//上次选择的数据集
var last_channel="",current_channel="";
var last_resolution="",current_resolution="";

var tmp_channel="",tmp_resolution="";

var state = 0;

//清除storyline上的点选glyph 表格中元素调用
function choose_voldata_deleteglyph(x)
{
	d3.select("#" + current_data + "circle").remove();
	d3.select("#" + last_data + "circle").remove();
	choose_voldata(x);
}

function choose_voldata(x)
{
  delete_choices();

  last_data = current_data;
  current_data = x.id;
  //alert(current_data);
  if(state == 1)
  {
      last_channel = tmp_channel;
      last_resolution = tmp_resolution;
      state = 0;
  }
  else
  {
      last_channel = current_channel;
      last_resolution = current_resolution;
      state = 0;
  }

  for(var i = 0; i < 7 ; i++ )
  {
    document.getElementById("number" + mapping_function(mapping_table[i])).setAttribute("stroke","#FFFFFF");
  }

  if(document.getElementById("number" + mapping_function(last_data)) != null)
    document.getElementById("number" +  mapping_function(last_data)).setAttribute("stroke","#00FF00");

  if(document.getElementById("number" +  mapping_function(x.id)).getAttribute("stroke") == "#00FF00")
    document.getElementById("number" +  mapping_function(x.id)).setAttribute("stroke","#FFFF00");
  else
    document.getElementById("number" +  mapping_function(x.id)).setAttribute("stroke","#FF0000");

  //update table start from here
  $(".item").css('background-color', "#FFFFFF");
  $("#"+last_data).css('background-color', "#00FF00");
  if(x.style.backgroundColor == "rgb(0, 255, 0)")
  {
    x.style.backgroundColor = "rgb(255, 255, 0)";
  }
  else
  {
    x.style.backgroundColor = "rgb(255, 0, 0)";
  }

  current_channel = "prs";
  current_resolution = "300x300x300";//默认
  tmp_channel = "prs";
  tmp_resolution = "300x300x300";

  $(".item2").css('background-color', "#FFFFFF");
  $(".item3").css('background-color', "#FFFFFF");

  $("#"+last_channel).css('background-color', "#00FF00");
  $("#"+last_resolution).css('background-color', "#00FF00");

  if($("#"+current_channel).css('background-color') == "rgb(0, 255, 0)")
  {
    $("#"+current_channel).css('background-color', "#FFFF00");
  }
  else
  {
    $("#"+current_channel).css('background-color', "#FF0000");
  }

  if($("#"+current_resolution).css('background-color') == "rgb(0, 255, 0)")
  {
    $("#"+current_resolution).css('background-color', "#FFFF00");
  }
  else
  {
    $("#"+current_resolution).css('background-color', "#FF0000");
  }

  update_div(current_data, current_channel, current_resolution,"no1");
  update_div(last_data, last_channel, last_resolution,"no2");

}

function choose_channel(x)
{
  d3.select("#" + current_data + "circle").remove();
  d3.select("#" + last_data + "circle").remove();
  if(last_data == "" && current_data == "")
  {	alert("data has not been chosen, locked!")
  	return ;
  }
  delete_choices();
  state = 1;
  $(".item2").css('background-color', "#FFFFFF");
  $("#"+last_channel).css('background-color', "#00FF00");
  if(x.style.backgroundColor == "rgb(0, 255, 0)")
    x.style.backgroundColor = "#FFFF00";
  else
    x.style.backgroundColor = "#FF0000";

  tmp_channel = x.id;
  update_div(current_data, tmp_channel, tmp_resolution, "no1");
}

function choose_resolution(x)
{
  d3.select("#" + current_data + "circle").remove();
  d3.select("#" + last_data + "circle").remove();
  if(last_data == "" && current_data == "")
  {
  	alert("data has not been chosen, locked!")
  	return ;
  }

  delete_choices();
  state = 1;
  $(".item3").css('background-color', "#FFFFFF");
  $("#"+last_resolution).css('background-color', "#00FF00");

  if(x.style.backgroundColor == "rgb(0, 255, 0)")
  {
    x.style.backgroundColor = "#FFFF00";
  }
  else
  {
    x.style.backgroundColor = "#FF0000";
  }
  //$("#"+temp5).css('background-color', "#00FF00");
  tmp_resolution = x.id;
  update_div(current_data, tmp_channel, tmp_resolution, "no1");
}

function update_div(data,channel,resolution,div)
{
  var timestep;
  var event;
  if(data == "yA11")
  {
    timestep = yA11_timestep;
    event = yA11_event;
  }
  else if(data == "yB11")
  {
    timestep = yB11_timestep;
    event = yB11_event;
  }
  else if(data == "yC11")
  {
    timestep = yC11_timestep;
    event = yC11_event;
  }
  else if(data == "yA31")
  {
    timestep = yA31_timestep;
    event = yA31_event;
  }
  else if(data == "yB31")
  {
    timestep = yB31_timestep;
    event = yB31_event;
  }
  else if(data == "yC31")
  {
    timestep = yC31_timestep;
    event = yC31_event;
  }
  else if(data == "yA32")
  {
    timestep = yA32_timestep;
    event = yA32_event;
  }
  else
    return ;


  var num = timestep.length;
  var route = Array(num);

  for (var i = 0; i < num; i++)
  {
    route[i] = "http://192.168.40.13/get_image?test=0&simulation=" + data + "&resolution=300&scalar=four&channel=" + channel + "&timestep=" + timestep[i] + "&phi=-1&theta=90";
    //alert(route[i]);
  }
  load_pic(num,route,event,div);//上面的div
}

//切换数据集时将之前选中的高亮删除
function delete_choices()
{
  if(document.getElementById(selected_div1) != null)
    document.getElementById(selected_div1).style.borderColor = "#000000";

  if(document.getElementById(selected_div2) != null)
    document.getElementById(selected_div2).style.borderColor = "#000000";

  if(document.getElementById("container(" + mapping_function(current_data) + "," + selected_div1.replace("no1pic","") + ")") != null)
      document.getElementById("container(" + mapping_function(current_data) + "," + selected_div1.replace("no1pic","") + ")").setAttribute("stroke","#000000");

  if(document.getElementById("container(" + mapping_function(last_data) + "," + selected_div2.replace("no2pic","") + ")") != null)
      document.getElementById("container(" + mapping_function(last_data) + "," + selected_div2.replace("no2pic","") + ")").setAttribute("stroke","#000000");
}

//先清空再加载图片
function load_pic(num,route,label,div){
	document.getElementById(div).innerHTML = "";

	var margin;

	if(num == 1)
	{
		margin = 0;
	}
	else
	{
		margin= 0.7/(num-1);
	}

	for(var i = 0; i < num; i++)
	{
		var pos = 0.05 + i * margin;
		var pos_perc = Number(pos*100).toFixed(1);
		pos_perc += "%";
		//5%-95%
		var img = document.createElement("img");
		img.src = route[i];

		id = div + "pic" + label[i];
		img.setAttribute("id", id);

		img.setAttribute("border", "5");
		img.setAttribute("height", "80%");
		img.setAttribute("width", "30%");
		img.setAttribute('style', 'position:absolute; left:'+ pos_perc +'; top:10%' + '; z-index:' + String(i));
		img.setAttribute("onmouseover","highlight(this)");
		img.setAttribute("onmouseout","normal(this)");
    	img.setAttribute("onclick","choose_img(this)");
		document.getElementById(div).appendChild(img);

	}
}


//onload = load_pic(4,yA31_v02,"no1");//上面的div
//onload = load_pic(4,yA31_v02,"no2");//下面的div
