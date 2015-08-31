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
      posts = http.responseText.split("&&&");
      e("posts").innerHTML = dataToHTML(posts);
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

function dataToHTML(input){
  var output = "";

  for(var i = 0; i < input.length; i++){
    var temp = input[i].split("$$");
    var post = "";

    for(var e = 0; e < temp.lenght; e++){
      var temp2 = temp[e].split("===");
      var tPost = "";
      if(temp2[0] != "img" && temp2[0] != "a"){
        tPost = "<" + temp2[0] + ">" + temp2[1] + "</" + temp2[0] + ">";
      } else if (temp2[0] == "img"){
        tPost = "<img src=\"" + temp2[1] + "\">";
      } else if(temp2[0] == "a"){
        tPost = "<a href=\"" + temp2[1] + "\">" + temp2[2] + "</a>"
      }
      post = tPost;
    }

    output = output + "<div>" + post + "</div>";
  }

  return output;
}
