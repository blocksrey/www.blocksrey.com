let print = console.log
let log = Math.log
let floor = Math.floor
let rand = Math.random

// Mathematica Notation:
// Solve[b^n == x, n]
function logb(b, x) {
	return log(x)/log(b) // Turns out I didn't need this...
}

// Neat little formula
function objectLength(number, base) { return 1 + floor(logb(base, number)) }

function objectdecimal(object, base) {
	let final = 0
	let l = object.length
	for (let i = 0; i < l; ++i)
		final += base**i*object[l - i - 1]
	return final
}

function decimalobject(number, base) {
	let final = []
	let l = objectLength(number, base)
	for (let i = 0; i < l; ++i) {
		let coefficient = base**(l - i - 1)
		let maximum = floor(number/coefficient)
		number -= coefficient*maximum
		final[i] = maximum
	}
	return final
}

function convertbase(object, base0, base1) {
	return decimalobject(objectdecimal(object, base0), base1)
}

let canvas = document.querySelector('canvas')
let context = canvas.getContext('2d')

function render() {
	context.clearRect(0, 0, canvas.width, canvas.height)

	let decimal = document.getElementById('decimal').value || 0
	let base = document.getElementById('base').value || 0

	let thisistheletiablethatrepresentswhatstringwillberenderedontothescreen = null
	if (decimal > 0 && base > 1) {
		thisistheletiablethatrepresentswhatstringwillberenderedontothescreen = decimalobject(
			decimal,
			base
		)
		SANELEVEL = 1
	} else {
		thisistheletiablethatrepresentswhatstringwillberenderedontothescreen = 'OOPS'
		SANELEVEL = 0
	}
	let SANEINVERSE = 1 - SANELEVEL
	context.strokeText(
		thisistheletiablethatrepresentswhatstringwillberenderedontothescreen,
		4*SANEINVERSE*rand() + canvas.width/2,
		4*SANEINVERSE*rand() + canvas.height/2
	)
	requestAnimationFrame(render)
}
render()
