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
let vec3 = (x, y, z) => { return {x: x, y: y, z: z} }
let vec4 = (x, y, z, w) => { return {x: x, y: y, z: z, w: w} }

let lst2 = (v) => { return [v.x, v.y] }
let lst3 = (v) => { return [v.x, v.y, v.z] }
let lst4 = (v) => { return [v.x, v.y, v.z, v.w] }

let sqr2 = (v) => { return v.x*v.x + v.y*v.y }
let sqr3 = (v) => { return v.x*v.x + v.y*v.y + v.z*v.z }
let sqr4 = (v) => { return v.x*v.x + v.y*v.y + v.z*v.z + v.w*v.w }

let dot2 = (a, b) => { return a.x*b.x + a.y*b.y }
let dot3 = (a, b) => { return a.x*b.x + a.y*b.y + a.z*b.z }
let dot4 = (a, b) => { return a.x*b.x + a.y*b.y + a.z*b.z + a.w*b.w }

let cmul = (a, b) => { return vec2(a.x*b.x - a.y*b.y, b.x*a.y + a.x*b.y) }

let qrot = (a, b) => {
	let [ax, ay, az, aw] = lst2(a)
	let [bx, by, bz, bw] = lst2(a)

	return vec3(
		2*(bz*aw*ay + by*ax*ay - by*aw*az + bz*ax*az) + bx*(aw*aw + ax*ax - ay*ay - az*az),
		2*(bx*ax*ay + bx*aw*az + bz*ay*az - bz*aw*ax) + by*(aw*aw - ax*ax + ay*ay - az*az),
		2*(by*aw*ax - bx*aw*ay + bx*ax*az + by*ay*az) + bz*(aw*aw - ax*ax - ay*ay + az*az),
	)
}

let qmul = (a, b) => {
	let [ax, ay, az, aw] = lst4(a)
	let [bx, by, bz, bw] = lst4(a)

	return vec4(
		ax*bw + aw*bx - az*by + ay*bz,
		ay*bw + az*bx + aw*by - ax*bz,
		az*bw - ay*bx + ax*by + aw*bz,
		aw*bw - ax*bx - ay*by - az*bz,
	)
}

let slerp = (a, b) => {
	let [ax, ay, az, aw] = lst4(a)
	let [bx, by, bz, bw] = lst4(b)

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



let rati = 1
//let proj = vec3(0, 0, 0)

/*
// Window resize handler
onresize = () => {
	canvas.width = innerWidth
	canvas.height = innerHeight

	gl.viewport(0, 0, innerWidth, innerHeight)

	rati = innerHeight/innerWidth

	//proj = getProj(2/5*pi, innerHeight/innerWidth)
}

// Window load handler
onload = () => {
	document.body.style.margin = 0
	document.body.style.overflow = 'hidden'
	document.body.appendChild(canvas)

	canvas.style['image-rendering'] = 'pixelated'

	onresize()
}
*/

















// These will be useful soon
onmousemove = (event) => {}
onkeydown = (event) => {}
onkeyup = (event) => {}








let cos = Math.cos
let sin = Math.sin
let sqrt = Math.sqrt

let tick = Date.now

let print = console.log

let pi = Math.PI






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
let ratiUniformLocation = gl.getUniformLocation(program, 'rati')















let getProj = (tan, aspect) => { return vec3(aspect, 1, tan) }

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




/*
let renderLoop = () => {
	requestAnimationFrame(renderLoop)
	gl.clear(gl.COLOR_BUFFER_BIT)
}
requestAnimationFrame(renderLoop)
*/

let renderLoop = () => {
	requestAnimationFrame(renderLoop)

	let t1 = Date.now()/1000

	camp.y = 2*sin(t1)
	//console.log(camp.y)

	gl.uniform3f(campUniformLocation, ...lst3(camp))
	gl.uniform4f(camoUniformLocation, ...lst4(camo))
	//gl.uniform3f(projUniformLocation, ...lst3(proj))
	gl.uniform1f(ratiUniformLocation, rati)

	let colorAndDepth = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT

	gl.clear(colorAndDepth)

	gl.drawArrays(gl.TRIANGLES, 0, 3)
}
requestAnimationFrame(renderLoop)











































let queue = []

let compareTimes = () => (a, b) => { return a[0] > b[0] }

let enqueue = (time, ...params) => {
	queue.push([time, ...params])
	queue.sort(compareTimes)
}

let doFirst = () => {
	let first = queue.shift()
	let time = first.shift()
	let fn = first.shift()
	fn(...first)
	return time
}

let runFor = (dt) => {
	while (queue.length*dt >= 0) {
		dt -= doFirst()
	}
} // < or <= ?




let character = () => {
	print('new char')
	return {
		p: vec3(0, 0, 0),
		v: vec3(0, 0, 0),
	}
}

let characterStep = (character, dt) => {
	let [px, py] = lst2(character.p)
	let [vx, vy] = lst2(character.v)
	let [ax, ay] = [0, -10]

	px += dt*vx + 0.5*dt*dt*ax
	py += dt*vy + 0.5*dt*dt*ay

	vx += dt*ax
	vy += dt*ay

	return 0
}

/*
enqueue(0, character)
runFor(0.5)
runFor(0.5)
runFor(0.5)
runFor(0.5)
*/























// COVID stuff
let request = new XMLHttpRequest()
request.open('get', 'https://covid19.mathdro.id/api')
request.send()
request.onload = () => {
	let obj = JSON.parse(request.response)
	document.getElementById('cases').innerHTML = 'Cases: ' + obj.confirmed.value
	document.getElementById('deaths').innerHTML = 'Deaths: ' + obj.deaths.value
}

