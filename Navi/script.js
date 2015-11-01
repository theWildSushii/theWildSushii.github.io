function init() {
  e("tts").checked = true;
  loaded(false);
  brainInit();
  e("message").focus();
}

window.onload = init;

var isShowing = false;
function showList(){
  if(isShowing){
    e("list").style.overflow = "hidden";
    e("list").style.width = "0px";
    e("settings").style.marginRight = "8px";
    e("list").style.backgroundColor = "rgba(0, 255, 255, 0)"
  } else {
    e("list").style.overflow = "scroll";
    e("list").style.width = "61.8%";
    e("settings").style.marginRight = "61.8%";
    e("list").style.backgroundColor = "rgba(0, 255, 255, .64)"
  }
  isShowing = !isShowing;
}

function loaded(state){
  var loader = e("loader");
  if(state){
    loader.style.opacity = "0";
  } else {
    loader.style.opacity = "1";
  }
}

function flick(target){
  e(target).checked = !e(target).checked;
}

function textCheck(e){
  var code = (e.keyCode ? e.keyCode : e.which);
  if(code == 13){
    sendMessage();
  }
}

function sendMessage() {
  var text = e("message").value;
  e("message").value = "";
  if(text != "" || text != "\n" || text != "\n\n"){
    e("message").focus();
    popUp("user", text);
    loaded(false);
    e("message").value = "";
    popUp("navi", parse(text));
    loaded(true);
  }
}

function randInt(min, max) {
  var rand = Math.floor(Math.random() * max) + min;
  while(rand > max){
    rand = rand - 1;
  }
  return rand;
}

var messageCount = 0;

function popUp(user, text) {
  if(text != ""){
    var id = "m" + messageCount;
    var input = e("input");
    input.insertAdjacentHTML('beforebegin', "<div id=\"" + id + "\" class=\"" + user + "\"><p>" + text + "</p></div>");
    messageCount = messageCount + 1;
    if(messageCount > 6){
      window.scrollTo(0,document.body.scrollHeight);
    }
  }
}
