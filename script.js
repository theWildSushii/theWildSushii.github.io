function getRandomText(){
  var http = ajax();
  var phrases;
  http.onreadystatechange = function(){
    if (http.readyState == 4 && http.status == 200){
      phrases = http.responseText.split("\n");
      e("randText").innerHTML = phrases[randomInt(0, phrases.length)];
    } else {
      phrases = ["Something happened :("];
      e("randText").innerHTML = phrases[0];
    }
  }
  http.open("GET", "random.txt", true);
  http.send();
}

function getSidebar() {
  var http = ajax();
  var data;
  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200){
      data = http.responseText;
      e("sidebar").innerHTML = data;
    } else {
      e("sidebar").innerHTML = "<p>Could not get data. </p><a href=\"#\" onClick=\"getSidebar()\">Try again?</a>";
    }
  }
  http.open("GET", "sidebar.txt", true);
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


