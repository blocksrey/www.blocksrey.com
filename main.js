var vertexsource = `
attribute vec2 position;

void main() {
    gl_Position = vec4(position, 0, 1);
}
`

var fragmentsource = `
void main() {
    gl_FragColor = vec4(1, 1, 1, 1);
}
`

console.log(document.getElementById("vertex").text);

var canvas = document.getElementById("canvas");
var gl = canvas.getContext("webgl");

gl.clearColor(1, 0, 1, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

console.log(document.getElementById("vertex"));

var vertexshader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexshader, document.getElementById("vertex"));
gl.compileShader(vertexshader);

var fragmentshader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentshader, document.getElementById("fragment"));
gl.compileShader(fragmentshader);

var program = gl.createProgram();
gl.attachShader(program, vertexshader);
gl.attachShader(program, fragmentshader);
gl.linkProgram(program);
gl.useProgram(program);

var vertices = new Float32Array([-1/2, -1/2, 1/2, -1/2, 0, 1/2]);

var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);


program.color = gl.getUniformLocation(program, "color");
gl.uniform4fv(program.color, [0, 1, 0, 1]);

program.position = gl.getAttribLocation(program, "position");
gl.enableVertexAttribArray(program.position);
gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);

gl.drawArrays(gl.TRIANGLES, 0, vertices.length/2);
