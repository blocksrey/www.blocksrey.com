//cached functions
var print = console.log;
var sin   = Math.sin;
var cos   = Math.cos;

//constants
var pi = Math.PI;

var vertices = [
    -1/2, -1/2, 0, 1, 0, 0,
     1/2, -1/2, 0, 0, 1, 0,
       0,  1/2, 0, 0, 0, 1
];

function calcgrade(n) {
    return n < 60 && "F" ||
           n < 70 && "D" ||
           n < 80 && "C" ||
           n < 90 && "B" ||
           "A";
}

var canvas = document.querySelector("canvas");
var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
print(gl && "init" || "bruh");

gl.clearColor(0, 0, 0, 1);

var vertexshader = gl.createShader(gl.VERTEX_SHADER);
var fragmentshader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertexshader, vertexshaderstring);
gl.shaderSource(fragmentshader, fragmentshaderstring);

gl.compileShader(vertexshader);
gl.compileShader(fragmentshader);

var program = gl.createProgram();
gl.attachShader(program, vertexshader);
gl.attachShader(program, fragmentshader);
gl.linkProgram(program);

var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

var positionattriblocation = gl.getAttribLocation(program, "vertposition");
var colorattriblocation = gl.getAttribLocation(program, "vertcolor");

gl.vertexAttribPointer(positionattriblocation, 3, gl.FLOAT, gl.FALSE, 6*Float32Array.BYTES_PER_ELEMENT, 0);
gl.vertexAttribPointer(colorattriblocation, 3, gl.FLOAT, gl.FALSE, 6*Float32Array.BYTES_PER_ELEMENT, 3*Float32Array.BYTES_PER_ELEMENT);

gl.enableVertexAttribArray(positionattriblocation);
gl.enableVertexAttribArray(colorattriblocation);

gl.useProgram(program);

var viewuniformlocation = gl.getUniformLocation(program, "view");
var projuniformlocation = gl.getUniformLocation(program, "proj");

var proj = calcproj(pi/2, canvas.width/canvas.height);

function update() {
    var t1 = Date.now()/1000;

    var view = [
        [cos(t1), 0, -sin(t1),       sin(t1/5)],
        [      0, 1,        0,         sin(t1)],
        [sin(t1), 0,  cos(t1), 3 + 2*cos(t1/3)],
        [      0, 0,        0,               1]
    ];
    
    gl.uniformMatrix4fv(viewuniformlocation, gl.FALSE, transexpand(view));
    gl.uniformMatrix4fv(projuniformlocation, gl.FALSE, transexpand(proj));
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}
setInterval(update, 0);
