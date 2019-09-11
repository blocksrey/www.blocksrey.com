//cached functions
var print = console.log;
var sin   = Math.sin;
var cos   = Math.cos;

//vertex position (x, y, z), vertex color (r, g, b)
var vertices = [
    -0.5, -0.5, 0.0, 1.0, 0.0, 0.0,
     0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
     0.0,  0.5, 0.0, 0.0, 0.0, 1.0
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

var worlduniformlocation = gl.getUniformLocation(program, "world");
var viewuniformlocation  = gl.getUniformLocation(program, "view");
var projuniformlocation  = gl.getUniformLocation(program, "proj");

var world = ident(4);
var view  = ident(4);
var proj  = ident(4);

var near = 0;
var far = 100;

proj = [
    1, 0, 0             , 0                        ,
    0, 1, 0             , 0                        ,
    0, 0, 2/(near - far), (far + near)/(near - far),
    0, 0, 0             , 1
];

setInterval(function() {
    var t1 = Date.now()/1000;
    //world = [cos(t1), 0, sin(t1), 0, 0, 1, 0, 0, -sin(t1), 0, cos(t1), 0, 0, 0, 0, 1];
    //view = [cos(t1), 0, sin(t1), 0, 0, 1, 0, 0, -sin(t1), 0, cos(t1), 0, 0, 0, 0, 1];
    view = [cos(t1), 0, sin(t1), 0, 0, 1, 0, 0, -sin(t1), 0, cos(t1), 0, 0, 0, 0, 1];
    gl.uniformMatrix4fv(worlduniformlocation, gl.FALSE, world);
    gl.uniformMatrix4fv(viewuniformlocation, gl.FALSE, view);
    gl.uniformMatrix4fv(projuniformlocation, gl.FALSE, proj);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}, 0);
