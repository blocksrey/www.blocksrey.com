let fragShaderString = `#version 300 es

precision lowp float;

in vec3 fcol;

out vec4 colo;

void main() {
	colo = vec4(fcol, 1.0f);
}
`