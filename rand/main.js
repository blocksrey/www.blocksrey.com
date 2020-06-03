var button = document.querySelector("button");
var range  = document.getElementById("range");
var stop   = document.getElementById("stop");
var result = document.getElementById("result");

var rand  = Math.random;
var floor = Math.floor;

function randrangeint(min, max) {
	return floor(min + (1 + max - min)*rand());
}

function run(range, stop) {
	var count = 0;
	while (true) {
		++count;
		if (randrangeint(1, range) == stop) return count;
	}
}

button.onclick = function() {
	var rangeval = range.value;
	var stopval  = stop.value;

	if (!(isNaN(rangeval) || isNaN(stopval)) && rangeval > 0 && stopval > 0 && stopval <= rangeval) {
		rangeval = parseInt(range.value);
		stopval  = parseInt(stop.value);
		result.innerHTML = run(rangeval, stopval);
	}
	else {
		result.innerHTML = "Provide valid shit please";
	}
}