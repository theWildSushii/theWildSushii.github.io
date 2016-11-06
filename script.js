function e(x){
  return document.getElementById(x);
}

function popUpImg(img){
  e("popup-container").innerHTML = "<div id=\"popup-img\" onclick=\"closepopup()\"><img src=\"" + img.src + "\"></div>";
}

function closepopup(){
  e("popup-container").innerHTML = "";
}

function ajax(){
  if (window.XMLHttpRequest){
    return new XMLHttpRequest();
  } else {
    return new ActiveXObject("Microsoft.XMLHttp");
  }
}

function randomInt(min, max){
  return Math.round( (Math.random() * ( max - min ) ) + min );
}

window.onload = function(){
  var http = ajax();
  http.onreadystatechange = function(){
    var results = http.responseText.split("\n");
    e("random").innerHTML = results[randomInt(0, results.length - 1)];
  }
  http.open("GET", "random.txt", true);
  http.send();
}
