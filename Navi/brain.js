var tempMemory = "";
var store = {}; //TODO Use it somewhere...
var data = [];
var patterns = [];
var result = "";
var lang = "en";
var voice = "US English Female";

function brainInit(){
  getWords("language/" + lang + "/words.txt");
  getPatterns("language/" + lang + "/patterns.txt");
}

function langChange(){
  loaded(false);
  _("input").insertAdjacentHTML('beforebegin', "<div class=\"separator\"></div>");
  lang = _("lang").value;
  if(lang == "en"){
    voice = "US English Female";
  } else if(lang == "es"){
    voice = "Spanish Female";
  }
  getWords("language/" + lang + "/words.txt");
  getPatterns("language/" + lang + "/patterns.txt");
}

function ajax(){
  if (window.XMLHttpRequest){
    return new XMLHttpRequest();
  } else {
    return new ActiveXObject("Microsoft.XMLHttp");
  }
}

function getWords(dir){
  var http = ajax();
  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200){
      result = http.responseText;
      data = result.split("\n");
      loaded(true);
    }
  }
  http.open("GET", dir, false);
  http.send();
}

function getPatterns(dir){
  var http = ajax();
  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200){
      result = http.responseText;
      patterns = result.split("\n");
      loaded(true);
    }
  }
  http.open("GET", dir, false);
  http.send();
}


function parse(data){
  //TODO Parse the data somehow...
  var keys = data.toLowerCase().split(" ");
  for(var i = 0; i < keys.length; i++){
    signal(keys[i]);
  }
  var output = tempMemory;
  tempMemory = "";
  if(_("tts").checked){
    responsiveVoice.speak(output, voice);
  }
  return output.toLowerCase();
}

function signal(input){
  if(!wordExist(input)){
    data.push(input);
  }
  while(tempMemory == ""){
    var prob = randInt(0, 10);
    if(prob >= 5){
      for(var i = 0; i < randInt(1, prob); i++){
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
