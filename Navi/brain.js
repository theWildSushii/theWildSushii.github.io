var tempMemory = ""; //This is the output
var store = {}; //TODO Use it somewhere and somehow...
var chars = "qwertyuiopasdfghjklñzxcvbnm. ,(){}[]¡!¿?";

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
var newPatterns = [];

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
var netNewPatterns = new VNeural();

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
  netNewPatterns.init(chars.length, 1);
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
  newPatterns = [];
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
  netNewPatterns.init(chars.length, 1);
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
  var inData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var inChars = input.split("");
  for(var i = 0; i < inChars.length; i++){
    inData[chars.indexOf(inChars[i])] += 1;
  }
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
    if(token == "[oAdjetive]"){
      if(randBool()){
        tempMemory = tempMemory.replace("[oAdjetive]", adjetives[netAdjetives.fire(inData, 2)*adjetives.length]);
      } else {
        tempMemory = tempMemory.replace("[oAdjetive]", "");
      }
    }
    tempMemory = tempMemory.replace("[adjetive]", adjetives[netAdjetives.fire(inData, 2)*adjetives.length]);
    tempMemory = tempMemory.replace("[verb]", verbs[netVerbs.fire(inData, 2)*verbs.length]);
    tempMemory = tempMemory.replace("[place]", places[netPlaces.fire(inData, 2)*places.length]);
    tempMemory = tempMemory.replace("[noun]", nouns[netNouns.fire(inData, 2)*nouns.length]);
    tempMemory = tempMemory.replace("[subject]", subjects[netSubjects.fire(inData, 2)*subjects.lenght]);
    tempMemory = tempMemory.replace("[connector]", connectors[netConnectors.fire(inData, 2)*connectors.length]);
    tempMemory = tempMemory.replace("[suffix]", suffixes[netSuffixes.fire(inData, 2)*suffixes.length]);
    tempMemory = tempMemory.replace("[prefix]", prefixes[netPrefixes.fire(inData, 2)*prefixes.length]);
    tempMemory = tempMemory.replace("[preposition]", prepositions[netPrepositions.fire(inData, 2)*prepositions.length]);
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
