function getRandomText(){
  var http = ajax();
  var phrases;
  http.onreadystatechange = function(){
    if (http.readyState == 4 && http.status == 200){
      phrases = http.responseText.split("\n");
      e("randText").innerHTML = phrases[randomInt(0, phrases.length)];
    }
  }
  http.open("GET", "https://rawgit.com/theWildSushii/theWildSushii.github.io/master/random.txt", true);
  http.send();
}

function getSidebar() {
  var http = ajax();
  var data, listitems;
  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200){
      data = http.responseText;
      listitems = data.split("\n");
      var out = "";
      for(var i = 0; i < listitems.length; i++){
        out += "<li>" + listitems[i] + "</li>";
      }
      e("slist").innerHTML = out;
    } else {
      e("slist").innerHTML = "<li><p>Could not get data. <a href=\"#\" onClick=\"getSidebar()\">Try again?</a></p></li>";
    }
  }
  http.open("GET", "https://rawgit.com/theWildSushii/theWildSushii.github.io/master/sidebar.txt", true);
  http.send();
}

function getSize(){
  var allElements = document.getElementsByTagName('*');
  for (var i = 0; i < allElements.length; i++){
    if (allElements[i].getAttribute("tws-size") !== null){
      var rawSize = allElements[i].getAttribute("tws-size");
      var size = rawSize.split("x");
      allElements[i].width = size[0];
      allElements[i].height = size[1];
    }
  }
}

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

window.onload = function() {
  getSize();
  getRandomText();
  getSidebar();
  loaded(true);
}

function loaded(state){
  var loader = e("loader");
  if(state){
    loader.style.opacity = "0";
  } else {
    loader.style.opacity = "1";
  }
}


