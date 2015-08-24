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
      e("posts").innerHTML = dataToHTML(posts, end, init);
      loaded(true);
    }
  }
  http.open("GET", "posts.txt", true);
  http.send();
  return posts;
}

window.onload = function() {


  var messages = getRandomText();
  getPosts();
  e("randText").innerHTML = messages[randomInt(0, messages.length)];
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
