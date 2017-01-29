function s(t){
  return ( 1 / ( 1 + Math.pow(Math.E, -t) ) );
}

function Neuron(){

  this.learningRate = 0.16180339887498948482045868343656;
  this.evolvingRate = 0.016180339887498948482045868343656;
  this.w = ( ( Math.random() * 2 ) - 1 );
  this.selfTrain = false;
  this.value = 0;
  this.prev = [];

  this.toJSON = function(){
    var out = {};
    out["w"] = this.w;
    out["prev"] = this.prev;
    out["selfTrain"] = this.selfTrain;
    return JSON.stringify(out);
  }

  this.fromJSON = function(json){
    var obj = JSON.parse(json);
    this.w = obj["w"];
    this.prev = obj["prev"];
    this.selfTrain = obj["selfTrain"];
  }

  this.isHead = function(){
    return this.prev.lenght == 0;
  }

  this.getOutput = function(){
    if(this.isHead()){
      return this.value;
    } else {
      var sum = 0;
      for(n in this.prev.length){
        var val = n.getOutput() * this.w;
        sum += val;
        if(this.selfTrain){
          this.w += (val * 2 * this.evolvingRate) - this.evolvingRate;
        }
      }
      var out = s(sum);
      this.value = out;
      return out;
    }
  }

  this.getLastOutput = function(){
    var sum = 0;
    for(n in this.prev){
      sum += n.value * this.w;
    }
    return s(sum);
  }

  this.train = function(input, out, n){
    var sum = 0;
    for(anIn in input){
      sum += anIn * this.w;
    }
    for(var z = 0; z < n; z++){
      var guess = s(sum);
      var error = out - guess;
      var i = 0;
      for(neuron in this.prev){
        try{
          neuron.w += this.learningRate * error * input[i++];
        } catch(e){
          console.log(e);
        }
      }
    }
  }

  this.getHeads = function(){
    var out = [];
    if(this.isHead()){
      out.push( JSON.parse(this.toJSON()) );
    } else {
      for(n in this.prev){
        if(n.isHead()){
          out.push( JSON.parse(n.toJSON()) );
        } else {
          var temp = n.getHeads();
          for(n2 in temp){
            out.push(n2);
          }
        }
      }
    }
    return out;
  }

  this.disconnect = function(){
    this.prev = [];
  }

  this.connectTo = function(n){
    this.prev.push(n);
  }

}
