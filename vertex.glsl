var vertexshaderstring = `
precision mediump float;

varying vec3 fragcolor;

attribute vec2 vertposition;
attribute vec3 vertcolor;

uniform mat4 mworld;
uniform mat4 mview;
uniform mat4 mproj;

void main() {
    fragcolor = vertcolor;
    gl_Position = mproj*mview*mworld*vec4(vertposition, 0, 1);
}
`
