function e(x){
  return document.getElementById(x);
}

function init() {
  e("tts").checked = true;
  loaded(false);
  brainInit();
  e("message").focus();
}

function ajax(){
  if (window.XMLHttpRequest){
    return new XMLHttpRequest();
  } else {
    return new ActiveXObject("Microsoft.XMLHttp");
  }
}

function say(input){
  try{
    responsiveVoice.speak(input, voice);
  } catch(e){
    console.log(e);
  }
}

function customTTS(){
  say(e("customtts").value);
  e("customtts").value = "";
}

window.onload = init;

var isShowing = false;
function showList(){
  if(isShowing){
    //e("list").style.display = "none";
    e("list").style.width = "0px";
    e("settings").style.marginLeft = "8px";
    e("list").style.backgroundColor = "rgba(0, 255, 255, 0)"
  } else {
    //e("list").style.display = "block";
    e("list").style.width = "61.8%";
    e("settings").style.marginLeft = "61.8%";
    e("list").style.backgroundColor = "rgba(0, 255, 255, .75)"
  }
  isShowing = !isShowing;
}

function loaded(state){
  var loader = e("loader");
  if(state){
    e("message").disabled = false;
    loader.style.opacity = "0";
  } else {
    e("message").disabled = true;
    loader.style.opacity = "1";
  }
}

function flick(target){
  e(target).checked = !e(target).checked;
}

function keyDetector(e, action){
  if(e.keyCode === 13){
    switch(action){
      case 0:
        sendMessage();
        break;
      case 1:
        customTTS();
        break;
    }
  }
}

function sendMessage() {
  var text = e("message").value;
  for(var i = 0; i < text.length; i++){
    text = text.replace("\n", " ");
  }
  e("message").value = "";
  if(text != "" && text != " " && text != "  "){
    e("message").focus();
    loaded(false);
    e("message").value = "";
    clear();
    popUp(parse(text));
  }
}

function popUp(text) {
  if(e("tts").checked){
    say(text);
  }
  e("mList").innerHTML += "<div id=\"result\" class=\"card\"><p>" + text + "</p></div>";
  loaded(true);
}

function clear(){
  e("mList").innerHTML = "";
}

function randInt(min, max) {
  return Math.round(Math.random() * max - min) + min;
}

function randFloat(min, max){
  return (Math.random() * max - min) + min;
}

function randBool(prob){
  return randFloat(0, 1) <= prob;
}

function randomFrom(array){
  return array[randInt(0, array.length - 1)];
}
