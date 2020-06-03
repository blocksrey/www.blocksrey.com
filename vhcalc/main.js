let nameobj  = document.getElementById("name");
let button   = document.querySelector("button");
let itersobj = document.getElementById("iters");
let avgobj   = document.getElementById("avg");
let minobj   = document.getElementById("min");
let maxobj   = document.getElementById("max");

button.onclick = function() {
	let name = nameobj.value;
	let iters = randomselectiters(name);
	if (iters) {
		itersobj.innerHTML = "Iterations: " + iters;
		avgobj.innerHTML   = "Iterations: " + iters;
		minobj.innerHTML   = "Iterations: " + iters;
		maxobj.innerHTML   = "Iterations: " + iters;
	}
	else {
		itersobj.innerHTML = 'Villager "' + name + '"' + " doesn't exist";
		avgobj.innerHTML   = "";
		minobj.innerHTML   = "";
		maxobj.innerHTML   = "";
	}
}