function _(x) {
  return document.getElementById(x);
}

function init() {
  loaded(false);
  brainInit();
  _("message").focus();
  loaded(true);
}

window.onload = init;

function loaded(state){
  var loader = _("loader");
  if(state){
    loader.style.opacity = "0";
  } else {
    loader.style.opacity = "1";
  }
}

function textCheck(e){
  var code = (e.keyCode ? e.keyCode : e.which);
  if(code == 13){
    sendMessage();
  }
}

function sendMessage() {
  var text = _("message").value;
  _("message").value = "";
  if(text != "" || text != "\n"){
    _("message").focus();
    popUp("user", text);
    loaded(false);
    _("message").value = "";
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
    var input = _("input");
    input.insertAdjacentHTML('beforebegin', "<div id=\"" + id + "\" class=\"" + user + "\"><p>" + text + "</p></div>");
    messageCount = messageCount + 1;
    if(messageCount > 6){
      window.scrollTo(0,document.body.scrollHeight);
    }
  }
}
