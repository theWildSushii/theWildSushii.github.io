function VNeural(nInputs, nOutputs){
  this.neurons = [];
  this.learningRate = 0.01;
  this.evolving = false;
  this.evolutionRate = 0.0031415926535897;

  if(nInputs != null){
    for(var i = 0; i < nOutputs; i++){
      var values = [];
      for(var j = 0; j < nInputs; j++){
        values[j] = ((Math.random() * 2) - 1);
      }
      this.neurons[i] = values;
    }
  }

  /**
   *  Inits the neural network creating a number of inputs and outputs.
   *  @params
   *  int nInputs
   *    The number of inputs supported.
   *  int nOutputs
   *    The number of outputs.
   */
  this.init = function(nInputs, nOutputs){
    for(var i = 0; i < nOutputs; i++){
      var values = [];
      for(var j = 0; j < nInputs; j++){
        values[j] = ((Math.random() * 2) - 1);
      }
      this.neurons[i] = values;
    }
  }

  /**
   *  Resets the learning rate by its default 0.01.
   */
  this.resetLearningRate = function(){
    this.learningRate = 0.01;
  }

  /**
   *  Removes all the input and output values of the neural network.
   */
  this.clear = function(){
    this.neurons = [];
  }

  /**
   *  Creates a JSON string from the VNeural object
   */
  this.toJSON = function(){
    var a = [];
    a[0] = this.neurons;
    a[1] = this.learningRate;
    a[2] = this.evolving;
    a[3] = this.evolutionRate;
    return JSON.stringify(a);
  }

  /**
   *  Parses a JSON string into a VNeural object
   *  @params
   *  String json
   *    The JSON string to be parsed.
   */
  this.fromJSON = function(json){
    var a = JSON.parse(json);
    this.neurons = a[0];
    this.learningRate = a[1];
    this.evolving = a[2];
    this.evolutionRate = a[3];
  }

  /**
   *  Saves the actual network in the browser's localStorage.
   *  @params
   *  int id
   *    An id for storing multiple networks.
   */
  this.toLocalStorage = function(id){
     if(typeof(Storage) !== "undefined") {
      localStorage.setItem("VNeural" + id, this.toJSON());
    } else {
      console.log("localStorage Not Supported...");
    }
  }

  /**
   *  Retrives the network from the browser's localStorage.
   *  @params
   *  int id
   *    An id for storing multiple networks
   */
  this.fromLocalStorage = function(id){
    if(typeof(Storage) !== "undefined") {
      this.fromJSON(localStorage.getItem("VNeural" + id));
    } else {
      console.log("localStorage Not Supported...");
    }
  }

  /**
   *  Fires the network with x values to retrieve an output and modifies the
   *  value of the weights if the net its set dinamic
   *  @params
   *  float[] or Boolean[] x
   *    The inputs to be parsed.
   */
  this.fire = function(x){
    var out = [];
    for(var i = 0; i < this.neurons.length; i++){
      var sum = 0;
      var value = x;
      for(var j = 0; j < value.length; j++){
        if(value[j] == true){
          value[j] = 1;
        } else if(value[j] == false){
          value[j] = 0;
        }
      }
      if(this.evolving){
        for(var j = 0; j < this.neurons[i].length; j++){
          sum += this.neurons[i][j] * value[j];
          this.neurons[i][j] += this.evolutionRate * value[j];
        }
      } else {
        for(var j = 0; j < this.neurons[i].length; j++){
          sum += this.neurons[i][j] * value[j];
        }
      }
      out[i] = this.outFunction(sum);
    }
    return out;
  }

  /**
   *  Converts the sum of weights into an output, this shouldn't be called.
   *  @params
   *  float sum
   *    The sum from the network weights.
   */
  this.outFunction = function(sum){
    if(sum > 0){
      return 1;
    } else {
      return 0;
    }
  }

  /**
   *  Trains the network to give a desired output from an input.
   *  @params
   *  float[] or Boolean[] x
   *    The expected input.
   *  int[], float[] or Boolean[] answer
   *    The desired output.
   *  int outType
   *    The type of desired output (int, Boolean, float or float positive).
   *  int strength
   *    How many times should the network be trained.
   */    
  this.train = function(x, answer, strength){
    for(var s = 0; s < strength; s++){
      var guess = this.fire(x);
      var error = [];
      for(var i = 0; i < guess.length; i++){
        error[i] = answer[i] - guess[i];
      }
      for(var i = 0; i < this.neurons.length; i++){
        for(var j = 0; j < this.neurons[i].length; j++){
          this.neurons[i][j] += this.learningRate * error[i] * x[j];
        }
      }
    }
  }

  /**
   *  Resets the evolving rate to its default (0.0031415926535897)
   */
  this.resetEvolvingRate = function(){
    this.evolutionRate = 0.0031415926535897;
  }
}
