var tempMemory = ""; //This is a partial output
var memory = ""; //This is the output
var wordList = [];
var data = {};

//Brain data
var nInputs = []; //24
var nOutputs = []; //2

//Other helpers
var lang; //Text to Speech language
var voice; //Text-to-Speech voice
var inputs = [];

function brainInit(){
  load();
  for(var i = 0; i < 24; i++){
    nInputs.push(new Neuron());
    nInputs[i].selfTrain = true;
    nInputs[i].evolvingRate *= 10;
  }
  for(var i = 0; i < 2; i++){
    nOutputs.push(new Neuron());
    nOutputs[i].selfTrain = true;
    nOutputs[i].evolvingRate *= 10;
    for(var j = 0; j < nInputs.length; j++){
      nOutputs[i].connectTo(nInputs[j]);
    }
  }
  lang = e("lang").value;
  if(lang == "en"){
    voice = "UK English Female";
  } else if(lang == "es"){
    voice = "Spanish Female";
  }
  loaded(true);
}

function langChange(){
  loaded(false);
  lang = e("lang").value;
  if(lang == "en"){
    voice = "UK English Female";
  } else if(lang == "es"){
    voice = "Spanish Female";
  }
  loaded(true);
}

function wordExists(word){
  out = false;
  if(data[word] != null || data[word] != undefined){
    out = true;
  }
  return out;
}

function sigmoidToArrayElement(output, array){
  return array[Math.round(output * (array.length - 1))];
}

function parse(data){
  signal(data);
  var output = memory;
  memory = "";
  loaded(true);
  return output.toLowerCase();
}

function s2B(str){
  var bytes = [];
  for(var i = 0; i < str.length; i++){
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}

function getBit(n, i){
  return (n >> i) & 1;
}

function wordToNInput(word){
  var bytes = s2B(word.toLowerCase());
  var out = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for(var i = 0; i < 8; i++){
    out[i] = getBit(bytes[0], i);
  }
  if(bytes.length > 2){
    for(var i = 1; i < bytes.length - 1; i++){
      for(var j = 0; j < 8; j++){
        out[8 + j] += getBit(bytes[i], j);
      }
    }
  }
  if(bytes.length > 1){
    for(var i = 0; i < 8; i++){
      out[16 + i] += getBit(bytes[bytes.length - 1], i);
    }
  }
  return out;
}

function signal(input){
  var keys = input.toLowerCase().split(" ");
  for(var i = 0; i < keys.length; i++){
    var word = keys[i].toLowerCase();
    if(wordExists(word)){
      if(i < keys.length - 1){
        data[word].push(keys[i + 1]);
      }
    } else {
      data[word] = [];
      wordList.push(word);
      if(i > 0){
        i--;
      }
    }
    var input = wordToNInput(word);
    for(var i = 0; i < nInputs.length; i++){
      nInputs[i].value = input[i];
    }
  }
  var cWord = sigmoidToArrayElement(nOutputs[0].getOutput(), wordList);
  tempMemory += cWord + " ";
  var wordLimit = 64;
  while(nOutputs[1].getOutput() <= 0.75 && wordLimit-- > 1){
    try{
      var input2 = wordToNInput(cWord);
      for(var i = 0; i < nInputs.length; i++){
        nInputs[i].value = input2[i];
      }
      var wList = data[cWord];
      cWord = sigmoidToArrayElement(nOutputs[0].getOutput(), wList);
      if(cWord != null || cWord != undefined){
        tempMemory += cWord + " ";
      }
    } catch(e){
      console.exception(e.message);
    }
  }
  save();
  memory = tempMemory;
  tempMemory = "";
}

function save(){
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("wordList", JSON.stringify(wordList));
  }
}

function load(){
  if (typeof(Storage) !== "undefined") {
    data = JSON.parse(localStorage.getItem("data"));
    wordList = JSON.parse(localStorage.getItem("wordList"));
    if(data == null){
      data = {};
    }
    if(wordList == null){
      wordList = [];
    }
  }
}

function clearData(){
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("data", "{}");
    localStorage.setItem("wordList", "[]");
  }
}

function printData(){
  console.log(JSON.stringify(data));
  console.log(JSON.stringify(wordList));
}
