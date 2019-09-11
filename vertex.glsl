var vertexshaderstring = `
precision mediump float;

varying vec3 fragcolor;

attribute vec2 vertposition;
attribute vec3 vertcolor;

uniform mat4 world;
uniform mat4 view;
uniform mat4 proj;

void main() {
    fragcolor = vertcolor;
    gl_Position = proj*view*world*vec4(vertposition, 0, 1);
}
`
