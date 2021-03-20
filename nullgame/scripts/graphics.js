let graphics = [];

{
    let print = console.log;

    let vertices = [
        Math.sqrt(3),
        -1,
        0,
        1,
        0,
        0,
        -Math.sqrt(3),
        -1,
        0,
        0,
        1,
        0,
        0,
        2,
        0,
        0,
        0,
        1,
    ];

    let canvas = document.querySelector("canvas");
    let gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    print((gl && "gl_init") || "gl_bruh");

    gl.clearColor(0, 0, 0, 1);

    let vertexshader = gl.createShader(gl.VERTEX_SHADER);
    let fragmentshader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexshader, vertexshaderstring);
    gl.shaderSource(fragmentshader, fragmentshaderstring);

    gl.compileShader(vertexshader);
    gl.compileShader(fragmentshader);

    let program = gl.createProgram();
    gl.attachShader(program, vertexshader);
    gl.attachShader(program, fragmentshader);
    gl.linkProgram(program);

    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    let positionattriblocation = gl.getAttribLocation(program, "vertposition");
    let colorattriblocation = gl.getAttribLocation(program, "vertcolor");

    gl.vertexAttribPointer(
        positionattriblocation,
        3,
        gl.FLOAT,
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    gl.vertexAttribPointer(
        colorattriblocation,
        3,
        gl.FLOAT,
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.enableVertexAttribArray(positionattriblocation);
    gl.enableVertexAttribArray(colorattriblocation);

    gl.useProgram(program);

    let viewuniformlocation = gl.getUniformLocation(program, "view");
    let projuniformlocation = gl.getUniformLocation(program, "proj");

    graphics.update = function (view, proj) {
        gl.uniformMatrix4fv(viewuniformlocation, gl.FALSE, mat.transexpand(view));
        gl.uniformMatrix4fv(projuniformlocation, gl.FALSE, mat.transexpand(proj));
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
}
