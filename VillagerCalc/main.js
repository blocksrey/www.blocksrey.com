let nameobj=document.getElementById('name')
let reset=document.getElementById('reset')
let calc=document.getElementById('calc')
let itersobj=document.getElementById('iters')
let avgobj=document.getElementById('avg')
let maxobj=document.getElementById('max')
let minobj=document.getElementById('min')

let name0
let iters
let sum
let runs
let avg
let max
let min

function isint(num){
	return num-floor(num)===0
}

function approxparse(num){
	return isint(num)?num:'~'+floor(num+0.5)
}

function renderstats(){
	if(iters){
		itersobj.innerHTML='Iterations:'+iters
		avgobj.innerHTML='Average:'+approxparse(avg)
		maxobj.innerHTML='Maximum:'+max
		minobj.innerHTML='Minimum:'+min
	}else{
		itersobj.innerHTML=
			nameobj.value===''
				?'Pleasetypeaname.'
				:name0
				?'Thisvillagerdoesnotexist.'
				:''
		avgobj.innerHTML=null
		maxobj.innerHTML=null
		minobj.innerHTML=null
	}
}

function resetstats(){
	name0=null
	iters=null
	sum=0
	runs=0
	avg=0
	max=1
	min=1/0

	renderstats()
}

reset.onclick=resetstats

resetstats()

function performcalc(){
	if(name0!=nameobj.value)
		resetstats()
	name0=nameobj.value
	if((iters=randomselectiters(nameobj.value))){
		sum+=iters
		++runs
		avg=sum/runs
		max=iters>max?iters:max
		min=iters<min?iters:min
	}
	renderstats()
}

calc.onclick=performcalc

performcalc()