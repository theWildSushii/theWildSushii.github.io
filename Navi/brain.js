var tempMemory = ""; //This is a partial output
var memory = ""; //This is the output
var store = {}; //TODO Use it somewhere and somehow...
var chars = "qwertyuiopasdfghjklñzxcvbnm abcdefghijklmnñopqrstuvxyz áéíóú ., () {} [] ¡! ¿? $%&#\"=/*\\-_ 1234567890".split("");

//Language parts. An AJAX call fills these variables
var verbs = [];
var adjetives = [];
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
var netInput = new VNeural();
var netMiddle1 = new VNeural();
var netMiddle2 = new VNeural();
var netMiddle3 = new VNeural();
var netOutput = new VNeural();

function brainInit(){
  lang = e("lang").value;
  if(lang == "en"){
    voice = "UK English Female";
  } else if(lang == "es"){
    voice = "Spanish Female";
  }
  getVerbs("https://thewildsushii.github.io/Navi/language/" + lang + "/verbs.txt");
  getAdjetives("https://thewildsushii.github.io/Navi/language/" + lang + "/adjetives.txt");
  getPlaces("https://thewildsushii.github.io/Navi/language/" + lang + "/places.txt");
  getNouns("https://thewildsushii.github.io/Navi/language/" + lang + "/nouns.txt");
  getSubjects("https://thewildsushii.github.io/Navi/language/" + lang + "/subjects.txt");
  getConnectors("https://thewildsushii.github.io/Navi/language/" + lang + "/connectors.txt");
  getSuffixes("https://thewildsushii.github.io/Navi/language/" + lang + "/suffixes.txt");
  getPrefixes("https://thewildsushii.github.io/Navi/language/" + lang + "/prefixes.txt");
  getPrepositions("https://thewildsushii.github.io/Navi/language/" + lang + "/prepositions.txt");
  getPatterns("https://thewildsushii.github.io/Navi/language/" + lang + "/patterns.txt");
  netInput.init(8, 16);
  netMiddle1.init(16, 32);
  netMiddle2.init(32, 16);
  netMiddle3.init(16, 8);
  netOutput.init(8, 10);
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
  getVerbs("https://thewildsushii.github.io/Navi/language/" + lang + "/verbs.txt");
  getAdjetives("https://thewildsushii.github.io/Navi/language/" + lang + "/adjetives.txt");
  getPlaces("https://thewildsushii.github.io/Navi/language/" + lang + "/places.txt");
  getNouns("https://thewildsushii.github.io/Navi/language/" + lang + "/nouns.txt");
  getSubjects("https://thewildsushii.github.io/Navi/language/" + lang + "/subjects.txt");
  getConnectors("https://thewildsushii.github.io/Navi/language/" + lang + "/connectors.txt");
  getSuffixes("https://thewildsushii.github.io/Navi/language/" + lang + "/suffixes.txt");
  getPrefixes("https://thewildsushii.github.io/Navi/language/" + lang + "/prefixes.txt");
  getPrepositions("https://thewildsushii.github.io/Navi/language/" + lang + "/prepositions.txt");
  getPatterns("https://thewildsushii.github.io/Navi/language/" + lang + "/patterns.txt");
  netInput.init(8, 16);
  netMiddle1.init(16, 32);
  netMiddle2.init(32, 16);
  netMiddle3.init(16, 8);
  netOutput.init(8, 10);
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

function getAdjetives(dir){
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
  signal(data.toLowerCase());
  var prePattern = [];
  //TODO better pattern thing
  prePattern = data;
  patterns.push(prePattern);
  var output = memory;
  output = output.replace("  ", " ");
  memory = "";
  if(e("tts").checked){
    say(output);
  }
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
  var keys = input.split(" ");
  var wChars = [];
  var preBytes = []
  var bytes = [];
  for(var i = 0; i < keys.length; i++){
    wChars[i] = keys[i].split("");
    preBytes[i] = [];
    for(var j = 0; j < wChars[i].length; j++){
      preBytes[i][j] = splitBytes(s2B(wChars[i][j]));
    }
  }
  for(var i = 0; i < preBytes.length; i++){
    bytes[i] = [0, 0, 0, 0, 0, 0, 0, 0];
    for(var j = 0; j < preBytes[i].length; j++){
      for(var z = 0; z < 8; z++){
        bytes[i][z] += preBytes[i][j][z];
      }
    }
  }
  var outputs = [];
  while(tempMemory == ""){
    if(memory != "" || randBool()){
      for(var i = 0; i < keys.length; i++){
        if(randBool()){
          outputs[i] = netOutput.fire(
              netMiddle3.fire(
                netMiddle2.fire(
                  netMiddle1.fire(
                    netInput.fire(
                      bytes[i],
                      2),
                    2),
                  2),
                2),
            3);
          var selAdjetives = outputs[i][0];
          var selVerbs = outputs[i][1];
          var selPlaces = outputs[i][2];
          var selNouns = outputs[i][3];
          var selSubjects = outputs[i][4];
          var selConnectors = outputs[i][5];
          var selSuffixes = outputs[i][6];
          var selPrefixes = outputs[i][7];
          var selPrepositions = outputs[i][8];
          var selPatterns = outputs[i][9];
          for(var z = 0; z < 10; z++){
            if(selAdjetives < 0.001){selAdjetives *= 10}
            if(selVerbs < 0.001){selVerbs *= 10}
            if(selPlaces < 0.001){selPlaces *= 10}
            if(selNouns < 0.001){selNouns *= 10}
            if(selSubjects < 0.001){selSubjects *= 10}
            if(selConnectors < 0.001){selConnectors *= 10}
            if(selSuffixes < 0.001){selSuffixes *= 10}
            if(selPrefixes < 0.001){selPrefixes *= 10}
            if(selPatterns < 0.001){selPatterns *= 10}

            if(selAdjetives > 1){selAdjetives /= 10}
            if(selVerbs > 1){selVerbs /= 10}
            if(selPlaces > 1){selPlaces /= 10}
            if(selNouns > 1){selNouns /= 10}
            if(selSubjects > 1){selSubjects /= 10}
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
            if(token == "[oAdjetive]"){
              if(randBool()){
                tempMemory = tempMemory.replace("[oAdjetive]", adjetives[Math.round(selAdjetives * (adjetives.length - 1))]);
              } else {
                tempMemory = tempMemory.replace("[oAdjetive]", "");
              }
            }
            tempMemory = tempMemory.replace("[adjetive]", adjetives[Math.round(selAdjetives * (adjetives.length - 1))]);
            tempMemory = tempMemory.replace("[verb]", verbs[Math.round(selVerbs * (verbs.length - 1))]);
            tempMemory = tempMemory.replace("[place]", places[Math.round(selPlaces * (places.length - 1))]);
            tempMemory = tempMemory.replace("[noun]", nouns[Math.round(selNouns * (nouns.length - 1))]);
            tempMemory = tempMemory.replace("[subject]", subjects[Math.round(selSubjects * (subjects.length - 1))]);
            tempMemory = tempMemory.replace("[connector]", connectors[Math.round(selConnectors * (connectors.length - 1))]);
            tempMemory = tempMemory.replace("[suffix]", suffixes[Math.round(selSuffixes * (suffixes.length - 1))]);
            tempMemory = tempMemory.replace("[prefix]", prefixes[Math.round(selPrefixes * (prefixes.length - 1))]);
            tempMemory = tempMemory.replace("[preposition]", prepositions[Math.round(selPrepositions * (prepositions.length - 1))]);
            tempMemory = tempMemory.replace("  ", " ");
          }
        }
      }
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
