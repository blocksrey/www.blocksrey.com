var vertexshaderstring = `
precision mediump float;

varying vec3 fragcolor;

attribute vec2 vertposition;
attribute vec3 vertcolor;

void main() {
    fragcolor = vertcolor;
    gl_Position = vec4(vertposition, 0, 1);
}
`
