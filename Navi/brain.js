var tempMemory = "";
var store = {};
var data = [];
var result = "";
var lang = "en";

function brainInit(){
  remote("Navi/words/" + lang + ".txt")
  data = result.split("\n");
}

function ajax(){
  if (window.XMLHttpRequest){
    return new XMLHttpRequest();
  } else {
    return new ActiveXObject("Microsoft.XMLHttp");
  }
}

function remote(dir){
  var http = ajax();
  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200){
      result = http.responseText;
    }
  }
  http.open("GET", dir, true);
  http.send();

}

function remoteGET(dir, params){
  var http = ajax();
  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200){
      result = http.responseText;
    }
  }
  http.open("GET", dir + "?" + params, true);
  http.send();
}

function remotePOST(dir, params){
  var http = ajax();
  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200){
      result = http.responseText;
    }
  }
  http.open("POST", dir, true);
  http.send(params);
}

function parse(data){
  //TODO Parse the data somehow...
  var keys = data.toLowerCase().split(" ");
  for(var i = 0; i < keys.length; i++){
    signal(keys[i]);
  }

  var output = tempMemory;
  tempMemory = "";
  return output;
}

function signal(input){
  if(!wordExist(input)){
    data.push(input);
  }
  while(tempMemory == ""){
    var prob = randInt(0, 10);
    if(prob >= 5){
      for(var i = 0; i < randInt(1,3); i++){
        tempMemory += data[randInt(0, data.length - 1)] + " ";
      }
    }
  }
}

function wordExist(input){
  var output = false;
  for(var i = 0; i < data.length; i++){
    if(input == data[i]){
      output = true;
    }
  }
  return output;
}

function randInt(min, max) {
  var rand = Math.floor(Math.random() * max) + min;
  while(rand > max){
    rand = rand - 1;
  }
  return rand;
}
