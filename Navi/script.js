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
  responsiveVoice.speak(input, voice);
}

function refresh(){
  e("mList").innerHTML = "<noscript><div class=\"navi\"><p>You need JavaScript enabled in order to chat with me.</p></div></noscript><div id=\"input\"></div>";
  loaded(false);
  netVerbs.clear();
  netAdjetives.clear();
  netPlaces.clear();
  netNouns.clear();
  netSubjects.clear();
  netConnectors.clear();
  netSuffixes.clear();
  netPrefixes.clear();
  netPrepositions.clear();
  netPatterns.clear();
  messageCount = 0;
  brainInit();
}

function customTTS(){
  say(e("customtts").value);
  e("customtts").value = "";
}

window.onload = init;

var isShowing = false;
function showList(){
  if(isShowing){
    e("list").style.display = "none";
    e("list").style.width = "0px";
    e("settings").style.marginRight = "8px";
    e("list").style.backgroundColor = "rgba(0, 255, 255, 0)"
  } else {
    e("list").style.display = "block";
    e("list").style.width = "61.8%";
    e("settings").style.marginRight = "61.8%";
    e("list").style.backgroundColor = "rgba(0, 255, 255, .64)"
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
  if(text != "" || text != " " || text != "  "){
    e("message").focus();
    popUp("user", text);
    loaded(false);
    e("message").value = "";
    popUp("navi", parse(text));
  }
}

function randInt(min, max) {
  var rand = Math.floor(Math.random() * max) + min;
  while(rand > max){
    rand--;
  }
  return rand;
}

var messageCount = 0;

function popUp(user, rawText) {
  var text = rawText;
  if(text != ""){
    if(user == "user" || user == "navi"){
      for(var i = 0; i < text.split("").length; i++){
        text = text.replace("<", "&lt;");
        text = text.replace(">", "&gt;");
        text = text.replace("\"", "&quot;");
        text = text.replace("&", "&amp;");
      }
    }
    var id = "m" + messageCount;
    e("input").insertAdjacentHTML('beforebegin', "<div id=\"" + id + "\" class=\"" + user + "\"><p>" + text + "</p></div>");
    messageCount++;
    window.scrollTo(0,document.body.scrollHeight);
    var keyboardEvent = document.createEvent("KeyboardEvent");
    var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
    keyboardEvent[initMethod](
      "keydown", // event type : keydown, keyup, keypress
      true, // bubbles
      true, // cancelable
      window, // viewArg: should be window
      false, // ctrlKeyArg
      false, // altKeyArg
      false, // shiftKeyArg
      false, // metaKeyArg
      35, // keyCodeArg : unsigned long the virtual key code, else 0
      0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
    );
    document.dispatchEvent(keyboardEvent);
  }
}
