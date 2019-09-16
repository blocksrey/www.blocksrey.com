var fragmentshaderstring = `
precision mediump float;

varying vec3 fragcolor;

void main() {
    gl_FragColor = vec4(fragcolor, 1);
}
`;
