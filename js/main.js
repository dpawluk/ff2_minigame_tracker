var maps_array = [];
var blank_map = [["?","?","?","?"],["?","?","?","?"],["?","?","?","?"],["?","?","?","?"]];
var possible_values = ["?","A","B","C","D","E","F","G","H"];
var current_map_index = 0;
var map_used_values = [];



function init(){
  maps_array = [];
  current_map_index = 0;
  drawMap(blank_map, current_map_index);
  $("#pattern_list").html('<li id="map_0" class="selected">0</li>');
  $("table#map_table td").click(handleCellClick);
  $("#rightcol button#add_page_btn").click(newMap);
  $("ul#pattern_list li").click(handleMapSelection);
  $("button#clear_map_btn").click(clearCurrentMap);
  $("button#reset_app_btn").click(init);
}


function drawMap(cardmap, map_num){
  for(r = 0; r < 4; r++){
    var cur_row = cardmap[r];
    for(c = 0; c < 4; c++){
      var cur_cell = cur_row[c];
      var cur_target_id = `#cell_${r}_${c}`;
      var cur_cell_html = `<span>${cur_cell}</span>`;
      $(cur_target_id).html(cur_cell_html);
    };//end for column
  };//end for row
  var map_header_html = `Map ${current_map_index}`;
  $("#leftcol h2#current_map_num").text(map_header_html)
  populateMapUsedValues();
};

function readMap(){
  var map_state = []
  for(r = 0; r < 4; r++){
    var row_data = [];
    for(c = 0; c < 4; c++){
      var cur_target_id = `#cell_${r}_${c}`;
      var current_value = $(cur_target_id).text();
      row_data.push(current_value);
    };//end for column
    map_state.push(row_data);
  };//end for row
  return map_state;
};

function saveCurrentMap() {
  var current_map_state = readMap();
  maps_array[current_map_index] = current_map_state;
  console.log(`saved map #: ${current_map_index}`);
}

function newMap() {
  saveCurrentMap();
  current_map_index = maps_array.length;
  $("ul#pattern_list li.selected").removeClass("selected");
  var next_map_list_html = `<li id="map_${current_map_index}" class="selected">${current_map_index}</li>`;
  $("ul#pattern_list").append(next_map_list_html);
  $("ul#pattern_list li.selected").click(handleMapSelection);
  drawMap(blank_map, current_map_index);
  saveCurrentMap;
};


function handleCellClick(e){
  e.preventDefault();
  console.log(e);
  var cell_id = e.currentTarget.id;
  var current_value = $(e.currentTarget).text();
  var current_index = possible_values.indexOf(current_value);
  while(true) {
    current_index == 8 ? current_index = 0 : current_index++;
    var next_value = possible_values[current_index];
    console.log(`next value is ${next_value}`);
    var next_used = _.filter(map_used_values, function(val){return val == next_value});
    console.log(next_used);
    if(next_used.length == 2){
      console.log("hi2");
      continue;
    }
    else { break;
    };
  };
  var next_value = possible_values[current_index];
  var target_html = `<span>${next_value}</span>`;
  $(e.currentTarget).html(target_html);
  populateMapUsedValues();
  //Here is where to add some code to use an image to replace the letters
  console.log(current_index);
};

function handleMapSelection(e){
  e.preventDefault();
  console.log(e);
  saveCurrentMap();
  var list_id = e.currentTarget.id;
  var current_value = $(e.currentTarget).text();
  current_map_index = parseInt(current_value, 10);
  console.log(list_id);
  console.log(`current map is ${current_map_index}`);
  $("ul#pattern_list li.selected").removeClass("selected");
  $(e.currentTarget).addClass("selected");
  var new_map_state = maps_array[current_map_index];
  console.log(new_map_state);
  drawMap(new_map_state, current_map_index);
};

function clearCurrentMap(e){
  e.preventDefault();
  drawMap(blank_map, current_map_index);
  saveCurrentMap();
}

function populateMapUsedValues(){
  map_used_values = [];
  var current_map_state = readMap();
  current_map_state.forEach(function(r){
    r.forEach(function(c){
      map_used_values.push(c);
    });
  });
  console.log(map_used_values);
};


init();
