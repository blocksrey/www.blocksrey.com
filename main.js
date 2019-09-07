//vertex position (x, y, z), vertex color (r, g, b)
var vertices = [
    -0.5, -0.5, 0.0, 1.0, 0.0, 0.0,
     0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
     0.0,  0.5, 0.0, 0.0, 0.0, 1.0
];

var canvas = document.querySelector("canvas");
var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
console.log(gl && "init" || "bruh");

gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

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

setInterval(function() {
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}, 100);
