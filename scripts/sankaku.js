// blocksrey

'use strict'

// I should make a generator for these functions tbh
/*
let comps = ['w', 'x', 'y', 'z']

let parse = ''

for (let i in comps) {
	let c = comps[i]

	console.log(1 + i, comps)
}

`let  vec${a} = (${b}) => { return {${c}} }`
`let dump${a} = (${b}) => { return [${c}] }`
*/

let vec2 = (x, y) => { return {x: x, y: y} }
let vec2_dump = (v) => { return [v.x, v.y] }

let vec3 = (x, y, z) => { return {x: x, y: y, z: z} }
let vec3_dump = (v) => { return [v.x, v.y, v.z] }

let vec4 = (x, y, z, w) => { return {x: x, y: y, z: z, w: w} }
let vec4_dump = (v) => { return [v.x, v.y, v.z, v.w] }

let cmul = (a, b) => { return vec2(a.x*b.x - a.y*b.y, b.x*a.y + a.x*b.y) }

let vecq = (a, b) => {
	let [ax, ay, az, aw] = vec2_dump(a)
	let [bx, by, bz, bw] = vec2_dump(a)

	return vec3(
		2*(bz*aw*ay + by*ax*ay - by*aw*az + bz*ax*az) + bx*(aw*aw + ax*ax - ay*ay - az*az),
		2*(bx*ax*ay + bx*aw*az + bz*ay*az - bz*aw*ax) + by*(aw*aw - ax*ax + ay*ay - az*az),
		2*(by*aw*ax - bx*aw*ay + bx*ax*az + by*ay*az) + bz*(aw*aw - ax*ax - ay*ay + az*az),
	)
}

let qmul = (a, b) => {
	let [ax, ay, az, aw] = vec4_dump(a)
	let [bx, by, bz, bw] = vec4_dump(a)

	return vec4(
		ax*bw + aw*bx - az*by + ay*bz,
		ay*bw + az*bx + aw*by - ax*bz,
		az*bw - ay*bx + ax*by + aw*bz,
		aw*bw - ax*bx - ay*by - az*bz,
	)
}

let slerp = (a, b) => {
	let [ax, ay, az, aw] = vec4_dump(a)
	let [bx, by, bz, bw] = vec4_dump(b)

	if (ax*bx + ay*by + az*bz + aw*bw < 0) {
		ax = -ax
		ay = -ay
		az = -az
		aw = -aw
	}

	let x = ax*bw - aw*bx + az*by - ay*bz
	let y = ay*bw - az*bx - aw*by + ax*bz
	let z = az*bw + ay*bx - ax*by - aw*bz
	let w = aw*bw + ax*bx + ay*by + az*bz

	let t = n*acos(w)
	let s = sin(t)/sqrt(x*x + y*y + z*z)

	bx = s*x
	by = s*y
	bz = s*z
	bw = cos(t)

	return vec4(
		ax*bw + aw*bx - az*by + ay*bz,
		ay*bw + az*bx + aw*by - ax*bz,
		az*bw - ay*bx + ax*by + aw*bz,
		aw*bw - ax*bx - ay*by - az*bz,
	)
}

let camp = vec3(0, 0, -10)
let camo = vec4(0, 0, 0, 1)







let cos = Math.cos
let sin = Math.sin
let sqrt = Math.sqrt

let tick = Date.now

let print = console.log

let pi = Math.PI




addEventListener('mousemove', (event) => {
	//print(event)
})

addEventListener('keydown', (event) => {
	//print(event)
})

addEventListener('keyup', (event) => {
	//print(event)
})






let vertices = [
	+1,
	+1,
	 0,

	1,
	0,
	0,

	+1,
	-1,
	 0,

	0,
	1,
	0,

	-1,
	-1,
	 0,

	1,
	1,
	0,
]

let canvas = document.querySelector('canvas')
let gl = canvas.getContext('webgl2')

let vertShader = gl.createShader(gl.VERTEX_SHADER)
let fragShader = gl.createShader(gl.FRAGMENT_SHADER)

gl.shaderSource(vertShader, vertShaderString)
gl.shaderSource(fragShader, fragShaderString)

gl.compileShader(vertShader)
gl.compileShader(fragShader)

let program = gl.createProgram()
gl.attachShader(program, vertShader)
gl.attachShader(program, fragShader)
gl.linkProgram(program)

let buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

let vposAttribLocation = gl.getAttribLocation(program, 'vpos')
let vcolAttribLocation = gl.getAttribLocation(program, 'vcol')

gl.vertexAttribPointer(vposAttribLocation, 3, gl.FLOAT, gl.FALSE, 6*Float32Array.BYTES_PER_ELEMENT, 0*Float32Array.BYTES_PER_ELEMENT)
gl.vertexAttribPointer(vcolAttribLocation, 3, gl.FLOAT, gl.FALSE, 6*Float32Array.BYTES_PER_ELEMENT, 3*Float32Array.BYTES_PER_ELEMENT)

gl.enableVertexAttribArray(vposAttribLocation)
gl.enableVertexAttribArray(vcolAttribLocation)

gl.useProgram(program)

let campUniformLocation = gl.getUniformLocation(program, 'camp')
let camoUniformLocation = gl.getUniformLocation(program, 'camo')
//let projUniformLocation = gl.getUniformLocation(program, 'proj')
let winsUniformLocation = gl.getUniformLocation(program, 'wins')






let getProj = (tan, aspect) => { return vec3(aspect, 1, tan) }

let wins = vec2(canvas.width, canvas.height)
let proj = getProj(2/5*pi, canvas.height/canvas.width)







let t0 = 0.001*tick()
let update = () => {
	let t1 = 0.001*tick()
	let dt = t1 - t0

	//print(dt)

	t0 = t1
}
setInterval(update, 0)







gl.clearColor(0, 0, 0, 1)


let renderLoop = () => {
	requestAnimationFrame(renderLoop)

	let t1 = Date.now()/1000

	camp.y = 2*sin(t1)
	//console.log(camp.y)

	gl.uniform3fv(campUniformLocation, vec3_dump(camp))
	gl.uniform4fv(camoUniformLocation, vec4_dump(camo))
	//gl.uniform3fv(projUniformLocation, vec3_dump(proj))
	gl.uniform2fv(winsUniformLocation, vec2_dump(wins))

	let colorAndDepth = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT

	gl.clear(colorAndDepth)

	gl.drawArrays(gl.TRIANGLES, 0, 3)
}
requestAnimationFrame(renderLoop)