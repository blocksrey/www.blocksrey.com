var vertexshaderstring = `
precision mediump float;

varying vec3 fragcolor;

attribute vec3 vertposition;
attribute vec3 vertcolor;

uniform mat4 view;
uniform mat4 proj;

void main() {
    fragcolor = vertcolor;
    gl_Position = proj*view*vec4(vertposition, 1);
}
`;
