var wordSet = [
  ["Coffee", "Beer"],
  ["Summer", "Winter"],
  ["Beach", "Forest"],
  ["Cats", "Dogs"],
  ["Noise", "Silence"],
  ["Chess", "Football"],
  ["Rainy", "Sunny"],
  ["Parties", "Sleep"],
  ["Natural", "Artificial"],
  ["Movies", "Books"],
  ["Cold", "Hot"],
];

var selected = [];

var net = new VNeural();

window.onload = function(){
  loaded(false);
  net.init(wordSet.length, 1);
  net.train([0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0], [1], net.Int, 50); //Introvert training
  net.train([1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1], [0], net.Int, 50); //Extrovert trainig
  net.train([0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0], [1], net.Int, 50); //Introvert training
  net.train([1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1], [0], net.Int, 50); //Extrovert trainig
  net.train([0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0], [1], net.Int, 50); //Introvert training
  e("0").innerHTML = wordSet[0][0];
  e("1").innerHTML = wordSet[0][1];
  tWSInit();
}

var i = 1;
function select(opt){
  selected.push(opt);
  if(i < wordSet.length){
    e("0").innerHTML = wordSet[i][0];
    e("1").innerHTML = wordSet[i][1];
    i++;
  } else {
    loaded(false);
    e("0").innerHTML = "";
    e("1").innerHTML = "";
    var results = net.fire(selected, 0);
    if(results[0] == 0){
      e("result").innerHTML = "You may be introvert";
    } else if(results[0] == 1){
      e("result").innerHTML = "You may be extrovert";
    } else {
      e("result").innerHTML = "You shouldn't be reading this...";
    }
    loaded(true);
  }
}
