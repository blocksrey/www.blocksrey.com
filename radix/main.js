var print = console.log;
var log   = Math.log;
var floor = Math.floor;
var rand  = Math.random;

//Mathematica Notation:
//Solve[b^n == x, n]
function logb(b, x) {
    return log(x)/log(b); //Turns out I didn't need this...
}

//Neat little formula
function objectlength(number, base) {
    return 1 + floor(logb(base, number));
}

function objectdecimal(object, base) {
    var final = 0;
    var length = object.length;
    for (var index = 0; index < length; ++index)
        final += base**index*object[length - index - 1];
    return final;
}

function decimalobject(number, base) {
    var final = [];
    var length = objectlength(number, base);
    for (var index = 0; index < length; ++index) {
        var coefficient = base**(length - index - 1);
        var maximum = floor(number/coefficient);
        number -= coefficient*maximum;
        final[index] = maximum;
    }
    return final;
}

function convertbase(object, base0, base1) {
    return decimalobject(objectdecimal(object, base0), base1);
}

var canvas  = document.querySelector("canvas");
var context = canvas.getContext("2d");

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    var decimal = document.getElementById("decimal").value || 0;
    var base = document.getElementById("base").value || 0;
    
    var thisisthevariablethatrepresentswhatstringwillberenderedontothescreen = null;
    if (decimal > 0 && base > 1) {
        thisisthevariablethatrepresentswhatstringwillberenderedontothescreen = decimalobject(decimal, base);
        SANELEVEL = 1;
    }
    else {
        thisisthevariablethatrepresentswhatstringwillberenderedontothescreen = "OOPS";
        SANELEVEL = 0;
    }
    var SANEINVERSE = 1 - SANELEVEL;
    context.strokeText(thisisthevariablethatrepresentswhatstringwillberenderedontothescreen, 4*SANEINVERSE*rand() + canvas.width/2, 4*SANEINVERSE*rand() + canvas.height/2);
    requestAnimationFrame(render);
}
render();
