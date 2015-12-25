var tempMemory = ""; //This is a partial output
var memory = ""; //This is the output
var store = {}; //TODO Use it somewhere and somehow...
var chars = "qwertyuiopasdfghjklñzxcvbnm.,(){}[]¡!¿?$%&#\"=/*-_1234567890";

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
var netVerbs = new VNeural();
var netAdjetives = new VNeural();
var netPlaces = new VNeural();
var netNouns = new VNeural();
var netSubjects = new VNeural();
var netConnectors = new VNeural();
var netSuffixes = new VNeural();
var netPrefixes = new VNeural();
var netPrepositions = new VNeural();
var netPatterns = new VNeural();

function brainInit(){
  chars = chars.split("");
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
  netVerbs.init(chars.length, 1);
  netAdjetives.init(chars.length, 1);
  netPlaces.init(chars.length, 1);
  netNouns.init(chars.length, 1);
  netSubjects.init(chars.length, 1);
  netConnectors.init(chars.length, 1);
  netSuffixes.init(chars.length, 1);
  netPrefixes.init(chars.length, 1);
  netPrepositions.init(chars.length, 1);
  netPatterns.init(chars.length, 1);
  netVerbs.setDinamic(true);
  netAdjetives.setDinamic(true);
  netPlaces.setDinamic(true);
  netNouns.setDinamic(true);
  netSubjects.setDinamic(true);
  netConnectors.setDinamic(true);
  netSuffixes.setDinamic(true);
  netPrefixes.setDinamic(true);
  netPrepositions.setDinamic(true);
  netPatterns.setDinamic(true);
  netVerbs.forcePositive();
  netAdjetives.forcePositive();
  netPlaces.forcePositive();
  netNouns.forcePositive();
  netSubjects.forcePositive();
  netConnectors.forcePositive();
  netSuffixes.forcePositive();
  netPrefixes.forcePositive();
  netPrepositions.forcePositive();
  netPlaces.forcePositive();
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
  netVerbs.init(chars.length, 1);
  netAdjetives.init(chars.length, 1);
  netPlaces.init(chars.length, 1);
  netNouns.init(chars.length, 1);
  netSubjects.init(chars.length, 1);
  netConnectors.init(chars.length, 1);
  netSuffixes.init(chars.length, 1);
  netPrefixes.init(chars.length, 1);
  netPrepositions.init(chars.length, 1);
  netPatterns.init(chars.length, 1);
  netVerbs.forcePositive();
  netAdjetives.forcePositive();
  netPlaces.forcePositive();
  netNouns.forcePositive();
  netSubjects.forcePositive();
  netConnectors.forcePositive();
  netSuffixes.forcePositive();
  netPrefixes.forcePositive();
  netPrepositions.forcePositive();
  netPlaces.forcePositive();
  loaded(true);
}

function ajax(){
  if (window.XMLHttpRequest){
    return new XMLHttpRequest();
  } else {
    return new ActiveXObject("Microsoft.XMLHttp");
  }
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
  var keys = data.toLowerCase().split(" ");
  for(var i = 0; i < keys.length; i++){
    signal(keys[i]);
  }
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
  return output.toLowerCase();
}

function say(input){
  responsiveVoice.speak(input, voice);
}

function signal(input){
  var inData = [];
  for(var i = 0 ; i < chars.length; i++){
    inData[i] = 0;
  }
  var inChars = input.toLowerCase().split("");
  for(var i = 0; i < inChars.length; i++){
    inData[chars.indexOf(inChars[i])] += 1;
  }
  console.log("Input data: " + inData);
  while(tempMemory == ""){
    var prob = randInt(0, 10);
    if(prob >= 5){
      for(var i = 0; i < randInt(1, prob); i++){
        var selVerbs = netVerbs.fire(inData, 3)[0];
        console.log("Verb: " + selVerbs);
        var selAdjetives = netAdjetives.fire(inData, 3)[0];
        var selPlaces = netPlaces.fire(inData, 3)[0];
        console.log("Place: " + selPlaces);
        var selNouns = netNouns.fire(inData, 3)[0];
        console.log("Noun: " + selNouns);
        var selSubjects = netSubjects.fire(inData, 3)[0];
        var selConnectors = netConnectors.fire(inData, 3)[0];
        var selSuffixes = netSuffixes.fire(inData, 3)[0];
        var selPrefixes = netPrefixes.fire(inData, 3)[0];
        var selPrepositions = netPrepositions.fire(inData, 3)[0];
        var selPatterns = netPatterns.fire(inData, 3)[0];
        for(var z = 0; z < 3; z++){
          if(selVerbs > 1){selVerbs /= 10}
          if(selAdjetives > 1){selAdjetives /= 10}
          if(selPlaces > 1){selPlaces /= 10}
          if(selNouns > 1){selNouns /= 10}
          if(selSubjects > 1){selSubjects /= 10}
          if(selConnectors > 1){selConnectors /= 10}
          if(selSuffixes > 1){selSuffixes /= 10}
          if(selPrefixes > 1){selPrefixes /= 10}
          if(selPatterns > 1){selPatterns /= 10}
          if(selPrepositions > 1){selPrepositions /= 10}
        }
        tempMemory += patterns[Math.round(selPatterns * patterns.length)] + " ";
        console.log("Pattern",i,":", patterns[Math.round(selPatterns * patterns.length)]);
      }
    }
  }
  var tokens = tempMemory.split(" ");
  for(var i = 0; i < tokens.length; i++){
    var token = tokens[i];
    if(token.charAt(0) == "{"){
      var temp = token.replace("{", "");
      var options = temp.split(",")
      tempMemory = tempMemory.replace(token, options[randInt(0, options.length - 1)]);
    }
    if(token == "[oAdjetive]"){
      if(randBool()){
        tempMemory = tempMemory.replace("[oAdjetive]", adjetives[Math.round(selAdjetives*adjetives.length)]);
      } else {
        tempMemory = tempMemory.replace("[oAdjetive]", "");
      }
    }
    tempMemory = tempMemory.replace("[adjetive]", adjetives[Math.round(selAdjetives*adjetives.length)]);
    tempMemory = tempMemory.replace("[verb]", verbs[Math.round(selVerbs*verbs.length)]);
    tempMemory = tempMemory.replace("[place]", places[Math.round(selPlaces*places.length)]);
    tempMemory = tempMemory.replace("[noun]", nouns[Math.round(selNouns*nouns.length)]);
    tempMemory = tempMemory.replace("[subject]", subjects[Math.round(selSubjects*subjects.lenght)]);
    tempMemory = tempMemory.replace("[connector]", connectors[Math.round(selConnectors*connectors.length)]);
    tempMemory = tempMemory.replace("[suffix]", suffixes[Math.round(selSuffixes*suffixes.length)]);
    tempMemory = tempMemory.replace("[prefix]", prefixes[Math.round(selPrefixes*prefixes.length)]);
    tempMemory = tempMemory.replace("[preposition]", prepositions[Math.round(selPrepositions*prepositions.length)]);
    tempMemory = tempMemory.replace("  ", " ");
  }
  memory += tempMemory;
  tempMemory = "";
}

function randInt(min, max) {
  var rand = Math.floor(Math.random() * max) + min;
  while(rand > max){
    rand = rand - 1;
  }
  return rand;
}

function randBool(){
  var out = false;
  if(randInt(1, 10) > 5){
    out = true;
  }
  return out;
}
