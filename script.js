var end = 10;
var init = 0;

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

function getPosts(){
  var http = ajax();
  var posts;
  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200){
      posts = http.responseText.split("\n");
      alert(http.responseText);
      e("posts").innerHTML = dataToHTML(posts, end, init);
      loaded(true);
    }
  }
  http.open("GET", "posts.txt", true);
  http.send();
}

window.onload = function() {
  getPosts();
  getRandomText();
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
