// blocksrey

'use strict'

{
	const cos = Math.cos
	const sin = Math.sin
	const exp = Math.exp
	const sqrt = Math.sqrt

	var spring_new = (p, v) => { return {p: p, v: v} }

	var spring_step = (spring, b, k, d, t) => {
		const p = spring.p
		const v = spring.v

		const h = sqrt(1 - d*d)
		t *= h*k // not really correct but whatever
		const s = sin(t)
		const c = h*cos(t) // not really c, more like hc
		const y = h*exp(d*t/h) // more like hy i guess

		// assuming k > 0 && d < 1
		spring.p = b + (k*(p - b)*(c + d*s) + v*s)/(k*y)
		spring.v = (k*(b - p)*s + v*(c - d*s))/y
	}
}