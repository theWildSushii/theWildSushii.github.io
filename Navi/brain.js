var tempMemory = ""; //This is a partial output
var memory = ""; //This is the output
var store = {}; //TODO Use it somewhere and somehow...
var chars = "qwertyuiopasdfghjklñzxcvbnm abcdefghijklmnñopqrstuvxyz áéíóú ., () {} [] ¡! ¿? $%&#\"=/*\\-_ 1234567890".split("");

//Language parts. An AJAX call fills these variables
var verbs = [];
var adjectives = [];
var places = [];
var nouns = [];
var subjects = [];
var connectors = [];
var suffixes = [];
var prefixes = [];
var prepositions = [];
var patterns = [];

//Other helpers
var result = ""; //Holder for AJAX results
var lang; //Chat language
var voice; //Text-to-Speech voice
var inputs = [];

//Neural networks. By VNeural
var layerSize = 179;
var netInput = new VNeural(8, 180);
var netMiddle = [];
var netOutput = new VNeural(180, 14);
netOutput.outFunction = function(x){
  if(x >= 0){
    return x;
  } else {
    return -x;
  }
}

function brainInit(){
  lang = e("lang").value;
  if(lang == "en"){
    voice = "UK English Female";
  } else if(lang == "es"){
    voice = "Spanish Female";
  }
  getVerbs("language/" + lang + "/verbs.txt");
  getAdjectives("language/" + lang + "/adjectives.txt");
  getPlaces("language/" + lang + "/places.txt");
  getNouns("language/" + lang + "/nouns.txt");
  getSubjects("language/" + lang + "/subjects.txt");
  getConnectors("language/" + lang + "/connectors.txt");
  getSuffixes("language/" + lang + "/suffixes.txt");
  getPrefixes("language/" + lang + "/prefixes.txt");
  getPrepositions("language/" + lang + "/prepositions.txt");
  getPatterns("language/" + lang + "/patterns.txt");
  for(var i = 0; i < layerSize; i++){
    netMiddle.push(new VNeural(180, 180));
    netMiddle[i].evolving = true;
    netMiddle[i].evolutionRate /= 10;
  }
  loaded(true);
}

function langChange(){
  loaded(false);
  e("input").insertAdjacentHTML('beforebegin', "<div class=\"separator\"></div>");
  lang = e("lang").value;
  if(lang == "en"){
    voice = "UK English Female";
  } else if(lang == "es"){
    voice = "Spanish Female";
  }
  getVerbs("language/" + lang + "/verbs.txt");
  getAdjectives("language/" + lang + "/adjectives.txt");
  getPlaces("language/" + lang + "/places.txt");
  getNouns("language/" + lang + "/nouns.txt");
  getSubjects("language/" + lang + "/subjects.txt");
  getConnectors("language/" + lang + "/connectors.txt");
  getSuffixes("language/" + lang + "/suffixes.txt");
  getPrefixes("language/" + lang + "/prefixes.txt");
  getPrepositions("language/" + lang + "/prepositions.txt");
  getPatterns("language/" + lang + "/patterns.txt");
  netInput.init(8, 16);
  for(var i = 0; i < layerSize; i++){
    netMiddle.push(new VNeural(180, 180));
    netMiddle[i].evolving = true;
    netMiddle[i].evolutionRate /= 10;
  }
  netOutput.init(8, 14);
  netOutput.outFunction = function(x){
    if(x >= 0){
      return x;
    } else {
      return -x;
    }
  }
  loaded(true);
}

function getVerbs(dir){
  var http = ajax();
  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200){
      result = http.responseText;
      verbs = result.split("\n");
    }
  }
  http.open("GET", dir, false);
  http.send();
}

function getAdjectives(dir){
  var http = ajax();
  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200){
      result = http.responseText;
      adjetives = result.split("\n");
    }
  }
  http.open("GET", dir, false);
  http.send();
}

function getPlaces(dir){
  var http = ajax();
  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200){
      result = http.responseText;
      places = result.split("\n");
    }
  }
  http.open("GET", dir, false);
  http.send();
}

function getNouns(dir){
  var http = ajax();
  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200){
      result = http.responseText;
      nouns = result.split("\n");
    }
  }
  http.open("GET", dir, false);
  http.send();
}

function getSubjects(dir){
  var http = ajax();
  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200){
      result = http.responseText;
      subjects = result.split("\n");
    }
  }
  http.open("GET", dir, false);
  http.send();
}

function getConnectors(dir){
  var http = ajax();
  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200){
      result = http.responseText;
      connectors = result.split("\n");
    }
  }
  http.open("GET", dir, false);
  http.send();
}

function getSuffixes(dir){
  var http = ajax();
  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200){
      result = http.responseText;
      suffixes = result.split("\n");
    }
  }
  http.open("GET", dir, false);
  http.send();
}

function getPrefixes(dir){
  var http = ajax();
  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200){
      result = http.responseText;
      preffixes = result.split("\n");
    }
  }
  http.open("GET", dir, false);
  http.send();
}

function getPrepositions(dir){
  var http = ajax();
  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200){
      result = http.responseText;
      prepositions = result.split("\n");
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
    }
  }
  http.open("GET", dir, false);
  http.send();
}

function wordExists(word){
  out = false;
  for(var i = 0; i < data.length; i++){
    if(word == data[i]){
      out = true;
    }
  }
  return out;
}

function parse(data){
  signal(data);
  var prePattern = "";
  //TODO better pattern thing
  prePattern = data;
  patterns.push(prePattern);
  var output = memory;
  output = output.replace("  ", " ");
  memory = "";
  loaded(true);
  return output.toLowerCase();
}

function splitBytes(byteArray){
  var bitArray = [];
  for(var i = 0; i < byteArray.length; i++){
    bitArray.push((byteArray[i] >> 7) - ((byteArray[i] >> 8) << 1));
    bitArray.push((byteArray[i] >> 6) - ((byteArray[i] >> 7) << 1));
    bitArray.push((byteArray[i] >> 5) - ((byteArray[i] >> 6) << 1));
    bitArray.push((byteArray[i] >> 4) - ((byteArray[i] >> 5) << 1));
    bitArray.push((byteArray[i] >> 3) - ((byteArray[i] >> 4) << 1));
    bitArray.push((byteArray[i] >> 2) - ((byteArray[i] >> 3) << 1));
    bitArray.push((byteArray[i] >> 1) - ((byteArray[i] >> 2) << 1));
    bitArray.push((byteArray[i]) - ((byteArray[i] >> 1) << 1));
  }
  return bitArray;
}

function joinBytes(bitArray){
  var byteArray = [];
  for(var i = 0; i < bitArray.length; i++){
    var cbyte = bitArray[i] << 15;
    cbyte += bitArray[++i] << 14;
    cbyte += bitArray[++i] << 13;
    cbyte += bitArray[++i] << 12;
    cbyte += bitArray[++i] << 11;
    cbyte += bitArray[++i] << 10;
    cbyte += bitArray[++i] << 9;
    cbyte += bitArray[++i] << 8;
    cbyte += bitArray[++i] << 7;
    cbyte += bitArray[++i] << 6;
    cbyte += bitArray[++i] << 5;
    cbyte += bitArray[++i] << 4;
    cbyte += bitArray[++i] << 3;
    cbyte += bitArray[++i] << 2;
    cbyte += bitArray[++i] << 1;
    cbyte += bitArray[++i];
    byteArray.push(cbyte);
  }
  return byteArray;
}

function b2S(bytes){
  return String.fromCharCode.apply(String, bytes);
}

function s2B(str){
  var bytes = [];
  for(var i = 0; i < str.length; i++){
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}

function signal(input){
  var keys = input.split("");
  var preBytes = [];
  var bytes = [0, 0, 0, 0, 0, 0, 0, 0];
  for(var i = 0; i < keys.length; i++){
    preBytes[i] = splitBytes(s2B(keys[i]));
  }
  for(var i = 0; i < preBytes.length; i++){
    for(var z = 0; z < 8; z++){
      bytes[z] += preBytes[i][z];
    }
  }
  for(var i = 0; i < bytes.length; i++){
    bytes[i] /= keys.length;
  }
  var outputs;
  while(tempMemory == ""){
    var temp = netInput.fire(bytes);
    for(var j = 0; j < layerSize; j++){
      temp = netMiddle[j].fire(temp);
    }
    outputs = netOutput.fire(temp);
    var selAdjectives = outputs[0];
    var selVerbs = outputs[1];
    var selPlaces = outputs[2];
    var selNouns = outputs[3];
    var selNouns2 = outputs[4];
    var selNouns3 = outputs[5];
    var selSubjects = outputs[6];
    var selSubjects2 = outputs[7];
    var selSubjects3 = outputs[8];
    var selConnectors = outputs[9];
    var selSuffixes = outputs[10];
    var selPrefixes = outputs[11];
    var selPrepositions = outputs[12];
    var selPatterns = outputs[13];
    for(var z = 0; z < 10; z++){
      if(selAdjectives < 0.001){selAdjectives *= 10}
      if(selVerbs < 0.001){selVerbs *= 10}
      if(selPlaces < 0.001){selPlaces *= 10}
      if(selNouns < 0.001){selNouns *= 10}
      if(selNouns2 < 0.001){selNouns2 *= 10}
      if(selNouns3 < 0.001){selNouns3 *= 10}
      if(selSubjects < 0.001){selSubjects *= 10}
      if(selSubjects2 < 0.001){selSubjects2 *= 10}
      if(selSubjects3 < 0.001){selSubjects3 *= 10}
      if(selConnectors < 0.001){selConnectors *= 10}
      if(selSuffixes < 0.001){selSuffixes *= 10}
      if(selPrefixes < 0.001){selPrefixes *= 10}
      if(selPatterns < 0.001){selPatterns *= 10}
 
      if(selAdjectives > 1){selAdjectives /= 10}
      if(selVerbs > 1){selVerbs /= 10}
      if(selPlaces > 1){selPlaces /= 10}
      if(selNouns > 1){selNouns /= 10}
      if(selNouns2 > 1){selNouns2 /= 10}
      if(selNouns3 > 1){selNouns3 /= 10}
      if(selSubjects > 1){selSubjects /= 10}
      if(selSubjects2 > 1){selSubjects2 /= 10}
      if(selSubjects3 > 1){selSubjects3 /= 10}
      if(selConnectors > 1){selConnectors /= 10}
      if(selSuffixes > 1){selSuffixes /= 10}
      if(selPrefixes > 1){selPrefixes /= 10}
      if(selPatterns > 1){selPatterns /= 10}
    }
    tempMemory = patterns[Math.round(selPatterns * (patterns.length - 1))];
    var tokens = tempMemory.split(" ");
    for(var i = 0; i < tokens.length; i++){
      var token = tokens[i];
      if(token.charAt(0) == "{"){
        var temp = token.replace("{", "");
        var options = temp.split(",");
        tempMemory = tempMemory.replace(token, options[randInt(0, options.length - 1)]);
      }
      if(token == "[oAdjective]"){
        if(randBool()){
          tempMemory = tempMemory.replace("[oAdjective]", adjectives[Math.round(selAdjectives * (adjectives.length - 1))]);
        } else {
          tempMemory = tempMemory.replace("[oAdjective]", "");
        }
      }
      tempMemory = tempMemory.replace("[adjective]", adjectives[Math.round(selAdjectives * (adjectives.length - 1))]);
      tempMemory = tempMemory.replace("[verb]", verbs[Math.round(selVerbs * (verbs.length - 1))]);
      tempMemory = tempMemory.replace("[place]", places[Math.round(selPlaces * (places.length - 1))]);
      tempMemory = tempMemory.replace("[noun]", nouns[Math.round(selNouns * (nouns.length - 1))]);
      tempMemory = tempMemory.replace("[noun2]", nouns[Math.round(selNouns2 * (nouns.length - 1))]);
      tempMemory = tempMemory.replace("[noun3]", nouns[Math.round(selNouns3 * (nouns.length - 1))]);
      tempMemory = tempMemory.replace("[subject]", subjects[Math.round(selSubjects * (subjects.length - 1))]);
      tempMemory = tempMemory.replace("[subject2]", subjects[Math.round(selSubjects2 * (subjects.length - 1))]);
      tempMemory = tempMemory.replace("[subject3]", subjects[Math.round(selSubjects3 * (subjects.length - 1))]);
      tempMemory = tempMemory.replace("[connector]", connectors[Math.round(selConnectors * (connectors.length - 1))]);
      tempMemory = tempMemory.replace("[suffix]", suffixes[Math.round(selSuffixes * (suffixes.length - 1))]);
      tempMemory = tempMemory.replace("[prefix]", prefixes[Math.round(selPrefixes * (prefixes.length - 1))]);
      tempMemory = tempMemory.replace("[preposition]", prepositions[Math.round(selPrepositions * (prepositions.length - 1))]);
      tempMemory = tempMemory.replace("  ", " ");
    }
    
  }
  memory += tempMemory + " ";
  tempMemory = "";
}

function randInt(min, max) {
  return Math.floor(Math.random() * max + min) - min;
}

function randFloat(min, max){
  return (Math.random() * max + min) - min;
}

function randBool(){
  return randInt(1, 10) > 5;
}
