window.onload = function() {
  var messages = [
    "Hello there.",
    "Crazy, but lazy developer.",
    "Get Rice.js at <a href=\"https://github.com/theWildSushii/Rice.js\">GitHub</a>.",
    "Yeah... Navi still on development...",
    "( ͡° ͜ʖ ͡°)",
    "I can't write a joke, but I can write an awesome but useless JavaScript",
    "The random text will be always here",
    "I like trains.",
    "Random text!! Woohoo!!",
    "Smile!!  You are so beatiful.",
    "Hey, want some cupcakes?",
    "Don't touch my tacos.",
    "Say hi to your webcam... just kidding.",
    "Don't forget to be fabulous everyday!",
    "42",
    "Free hugs",
    "derp herp",
    "I'm still not knowing who let the dogs out :(",
    "Oh hi, I'm up here :D",
    "love meh",
    "BEHOLD THE POWER OF MY CAPS LOCK!!",
    "Notice me senpai",
    "duh...",
    "alert(Array(16).join(\"lol\" - 2) + \" Batman!\")",
    "I'm already at college and I still can't spell unessarcaryccery",
    "From day to night I'll be watching you",
    "Hello, you look so beautiful today",
    "I'm not sure how many problems do I have because Math is one of them.",
    "I'm breathing dead human cells right now... just like everyone.",
    "This website is completely public at <a href=\"https://github.com/theWildSushii/theWildSushii.github.io\">GitHub</a>.",
    "Do you use Vim? Get <a href=\"https://github.com/theWildSushii/SweetCandy.vim\">this</a> colorscheme."
  ];
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
