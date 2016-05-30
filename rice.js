function e(x){
  return document.getElementById(x);
}

function c(x) {
  return document.getElementsByClassName(x);
}

function tag(x){
  return document.getElementsByTagName(x);
}

function style(x){
  return e(x).style;
}

function remove(x){
  e(x).parentNode.removeChild(x);
}

function elemWithAttribute(attr){
  var matchingElements = [];
  var allElements = document.getElementsByTagName('*');
  for (var i = 0; i < allElements.length; i++){
    if (allElements[i].getAttribute(attr) !== null){
      matchingElements.push(allElements[i]);
    }
  }
  return matchingElements;
}

function tws_fill(){
  var e2bf = elemWithAttribute("tws-fill");
  var temp1, attr;
  for(var i = 0; i < e2bf.length; i++) {
    temp1 = e2bf[i].getAttribute("tws-fill");
    attr = e2bf[i].getAttribute("tws-attr");
    var temp2 = temp1.split("$$");
    var temp3 = "";
    if(temp2[1] != "img"){
      var ind = i;
      for(var e = 0; e < $tws[temp2[0]].length; e++) {
        temp3 = temp3 + "<" + temp2[1] + " " + attr + ">" + $tws[temp2[0]][e] + "</" + temp2[1] +">";
      }
    } else {
      var ind = i;
      for(var e = 0; e < $tws[temp2[0]].length; e++) {
        temp3 = temp3 + "<img src=\"" + $tws[temp2[0]][e] + "\" " + attr + ">";
      }
    }
    e2bf[i].innerHTML = temp3;
    temp3 = "";
  }
}

function riceInit(){
  tws_fill();
}
window.onload = riceInit;

function ajax(){
  if (window.XMLHttpRequest){
    return new XMLHttpRequest();
  } else {
    return new ActiveXObject("Microsoft.XMLHttp");
  }
}

function randomInt(min, max) {
  var rand = Math.floor(Math.random() * (max - min)) + min;
  while(rand > max){
    rand = rand - 1;
  }
  return rand;
}

function randomFloat(min, max) {
  var rand = (Math.random() * (max - min)) + min;
  while(rand > max) {
    rand = rand - 0.31416592;
  }
  return rand;
}

function shuffleArray(array) {
  var shuffled = [];
  for (var i = array.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * array.length);
    shuffled.push(array[j]);
    array.splice(j, 1);
  };
  return shuffled.reverse();
}

function isUndefined(value){
  return typeof value == 'undefined';
}

function isDefined(value){
  return typeof value != 'undefined';
}

function isObject(value){
  return value != null && typeof value == 'object';
}

function isString(value){
  return typeof value == 'string';
}

function isNumber(value){
  return typeof value == 'number';
}

function isDate(value){
  return toString.apply(value) == '[object Date]';
}

function isArray(value) {
  return toString.apply(value) == '[object Array]';
}

function isFunction(value){
  return typeof value == 'function';
}

function isRegExp(value) {
  return toString.apply(value) == '[object RegExp]';
}

function isWindow(obj) {
  return obj && obj.document && obj.location && obj.alert && obj.setInterval;
}


function isFile(obj) {
  return toString.apply(obj) === '[object File]';
}


function isBoolean(value) {
  return typeof value == 'boolean';
}

function isElement(node) {
  return node &&
    (node.nodeName
    || (node.on && node.find));
  }

function makeMap(str){
  var obj = {}, items = str.split(","), i;
  for ( i = 0; i < items.length; i++ )
    obj[ items[i] ] = true;
  return obj;
}

function arrayRemove(array, value) {
  var index = indexOf(array, value);
  if (index >=0)
    array.splice(index, 1);
  return value;
}

function toBoolean(value) {
  if (value && value.length !== 0) {
    var v = lowercase("" + value);
    value = !(v == 'f' || v == '0' || v == 'false' || v == 'no' || v == 'n' || v == '[]');
  } else {
    value = false;
  }
  return value;
}

function thisURL() {
  return window.location.href;
}

function phpGetGET() {
  var rurl = thisURL();
  var rGET = rurl.split("?");
  var rArray = rGET[1];
  var array = {}, rMap = rArray.split("&"), temp;
  for(var i = 0; i < rMap.length; i++) {
    temp = rMap[i].split("=");
    array[temp[0]] = temp[1];
  }
  return array;
}
