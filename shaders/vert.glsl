let vertexshaderstring = `#version 300 es

precision lowp float;

out vec3 fcol;

in vec3 vpos;
in vec3 vcol;

uniform mat4 view;
uniform mat4 proj;

void main() {
    fcol = vcol;
    gl_Position = proj*view*vec4(vpos, 1);
}
`;