var end = 10;
var init = 0;

function getRandomText(){
  var http = ajax();
  var phrases;
  http.onreadystatechange = function(){
    if (http.readyState == 4 && http.status == 200){
      phrases = http.responseText.split("\n");
    } else {
      phrases = ["Something happened :("];
    }
  }
  http.open("GET", "random.txt", false);
  http.send();
  return phrases;
}

function getPosts(){
  var http = ajax();
  var posts;
  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200){
      posts = http.responseText.split("\n");
    } else {
      posts = ["h2===Could not get data$$p===It may be something wrong with the site or your device :("];
    }
  }
  http.open("GET", "posts.txt", false);
  http.send();
  return posts;
}

window.onload = function() {

  e("posts").innerHTML = dataToHTML(getPosts(), end, init);

  var messages = getRandomText();

  e("randText").innerHTML = messages[randomInt(0, messages.length)];
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

function dataToHTML(input, limit, start){
  var output = "";

  for(var i = start; i < input.length && i < limit; i++){
    var temp = input[i].split("$$");
    var post = "";

    for(var e = 0; e < temp.lenght; e++){
      var temp2 = temp[e].split("===");
      var tPost = "";
      if(temp2[0] != "img"){
        tPost = "<" + temp2[0] + ">" + temp2[1] + "</" + temp2[0] + ">";
      } else if (temp2[0] == "img"){
        tPost = "<img src=\"" + temp2[1] + "\">";
      }
      post = tPost;
    }

    output += "<div>" + post + "</div>";
  }

  return output;
}
