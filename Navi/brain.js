var tempMemory = ""; //This is the output
var store = {}; //TODO Use it somewhere...

//Language parts. An AJAX call fills these variables
var verbs = ["correr", "brincar", "coger", "comer"];
var adjetives = ["lindo", "feo", "grande", "puto", "gay"];
var places = ["escuela", "casa", "hosptial", "casa de putas", "farmacia", "ruta"];
var nouns = ["laptop", "ropa", "madre"];
var subjects = ["Alan", "Sushii", "Dani", "Cynthia", "el weon", "la weona"];
var connectors = [];
var suffixes = [];
var prefixes = [];
var prepositions = [];

//Chat parts
var patterns = [
  "eres un [adjetive]",
  "[subject] es muy [adjetive]",
  "[subject] es homofobico",
  "[subject] se la pasa [verb] en la [place]",
  "¡[verb]!",
  "[adjetive] el que lo lea",
  "¡[adjetive] [noun]!"];
var newPatterns = [];

//Other helpers
var result = ""; //Holder for AJAX results
var lang = "en"; //Chat language
var voice = "UK English Female"; //Text-to-Speech voice

function brainInit(){
  //getVerbs("https://thewildsushii.github.io/Navi/language/" + lang + "/verbs.txt");
  //getAdjetives("https://thewildsushii.github.io/Navi/language/" + lang + "/adjetives.txt");
  //getPlaces("https://thewildsushii.github.io/Navi/language/" + lang + "/places.txt");
  //getNouns("https://thewildsushii.github.io/Navi/language/" + lang + "/nouns.txt");
  //getSubjects("https://thewildsushii.github.io/Navi/language/" + lang + "/subjects.txt");
  //getConnectors("https://thewildsushii.github.io/Navi/language/" + lang + "/connectors.txt");
  //getSuffixes("https://thewildsushii.github.io/Navi/language/" + lang + "/suffixes.txt");
  //getPreffixes("https://thewildsushii.github.io/Navi/language/" + lang + "/preffixes.txt");
  //getPrepositions("https://thewildsushii.github.io/Navi/language/" + lang + "/prepositions.txt");
  //getPatterns("https://thewildsushii.github.io/Navi/language/" + lang + "/patterns.txt");
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
  getPreffixes("https://thewildsushii.github.io/Navi/language/" + lang + "/preffixes.txt");
  getPrepositions("https://thewildsushii.github.io/Navi/language/" + lang + "/prepositions.txt");
  getPatterns("https://thewildsushii.github.io/Navi/language/" + lang + "/patterns.txt");
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

function getPreffixes(dir){
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
  newPatterns.push(prePattern);
  var output = tempMemory;
  output = output.replace("  ", " ");
  tempMemory = "";
  if(e("tts").checked){
    say(output);
  }
  return output.toLowerCase();
}

function say(input){
  responsiveVoice.speak(input, voice);
}

function signal(input){
  while(tempMemory == ""){
    var prob = randInt(0, 10);
    if(prob >= 5){
      for(var i = 0; i < randInt(1, prob); i++){
        if(randBool() && newPatterns.length > 0){
          tempMemory += newPatterns[randInt(0, newPatterns.length - 1)] + " ";
        } else {
          tempMemory += patterns[randInt(0, patterns.length - 1)] + " ";
        }
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
    if(token == "[adjetive]"){
      if(randBool()){
        tempMemory = tempMemory.replace("[adjetive]", adjetives[randInt(0, adjetives.length - 1)]);
      } else {
        tempMemory = tempMemory.replace("[adjetive]", "");
      }
    }
    tempMemory = tempMemory.replace("[verb]", verbs[randInt(0, verbs.length - 1)]);
    tempMemory = tempMemory.replace("[place]", places[randInt(0, places.length - 1)]);
    tempMemory = tempMemory.replace("[noun]", nouns[randInt(0, nouns.length - 1)]);
    tempMemory = tempMemory.replace("[subject]", subjects[randInt(0, subjects.length - 1)]);
    tempMemory = tempMemory.replace("[connector]", connectors[randInt(0, connectors.length - 1)]);
    tempMemory = tempMemory.replace("[suffix]", suffixes[randInt(0, suffixes.length - 1)]);
    tempMemory = tempMemory.replace("[prefix]", prefixes[randInt(0, prefixes.length - 1)]);
    tempMemory = tempMemory.replace("[preposition]", prepositions[randInt(0, prepositions.length - 1)]);
    tempMemory = tempMemory.replace("[subject]", subjects[randInt(0, subjects.length - 1)]);
    tempMemory = tempMemory.replace("[subject]", subjects[randInt(0, subjects.length - 1)]);
    tempMemory = tempMemory.replace("  ", " ");

  }
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
