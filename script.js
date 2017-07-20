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

window.addEventListener("load", function() {
  var http = ajax();
  http.onreadystatechange = function(){
    var results = http.responseText.split("\n");
    e("random").innerHTML = results[randomInt(0, results.length - 1)];
  }
  http.open("GET", "random.txt", true);
  http.send();
});

function randomSnackbar(){
  var msg = [
    "D:",
    "Why..?",
    "You little rebel, I like you :)",
    "Why did you click it? :'("
  ];
  document.showSnackbar(msg[randomInt(0, msg.length - 1)]);
}

function expand(divName, trigger){
  var isShown = false;
  try {
    isShown = e(divName).isShown;
  } catch(ex) {
    e(divName).isShown = isShown;
  }
  if(isShown) {
    e(divName).style.height = "0px";
    trigger.innerHTML = "SHOW MORE"
  } else {
    e(divName).style.height = "auto";
    trigger.innerHTML = "SHOW LESS";
  }
  e(divName).isShown = !e(divName).isShown;
}
