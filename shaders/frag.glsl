let fragmentshaderstring = `#version 300 es

precision lowp float;

in vec3 fcol;

out vec4 lolol;

void main() {
    lolol = vec4(fcol, 1);
}
`;