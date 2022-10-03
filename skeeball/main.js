let canvas=document.querySelector('canvas')
let vsx=canvas.width
let vsy=canvas.height

let context=canvas.getContext('2d')
context.textAlign='center'

function tick() {
	return new Date().getTime()/1000
}

function hash2(a, b) {
	return a+((a+b)*(a+b+1))/2
}

function getTargetData(
	scoreToTickets,
	targets,
	cache,
	ballsRemaining,
	currentScore
) {
	let id=hash2(ballsRemaining, currentScore)
	let data=cache[id]
	if (data) {
		return data
	}

	//console.log('made a new thing', ballsRemaining, currentScore)

	if (ballsRemaining === 0) {
		let newData={
			bestTarget: 'No Solution',
			ticketExpectation: scoreToTickets(currentScore),
		}
		cache[id]=newData
		return newData
	}

	let bestTarget='No Solution'
	let bestTicketExpectation=0
	for (let target in targets) {
		let probabilities=targets[target]

		let totalSamples=0
		let totalTickets=0
		for (score in probabilities) {
			let samples=probabilities[score]
			let nextData=getTargetData(
				scoreToTickets,
				targets,
				cache,
				ballsRemaining - 1,
				currentScore+Number(score)
			)
			totalSamples=totalSamples+samples
			totalTickets=totalTickets+samples*nextData.ticketExpectation
		}

		let ticketExpectation=totalTickets/totalSamples
		if (ticketExpectation > bestTicketExpectation) {
			bestTarget=target
			bestTicketExpectation=ticketExpectation
			//console.log(ballsRemaining, currentScore, target, totalTickets, totalSamples)
		}
	}

	let newData={
		bestTarget: bestTarget,
		ticketExpectation: bestTicketExpectation,
	}
	cache[id]=newData
	return newData
}

function getNextTarget(scoreToTickets, targets, ballsRemaining, currentScore) {
	let data=getTargetData(
		scoreToTickets,
		targets,
		{},
		ballsRemaining,
		currentScore
	)
	return data.bestTarget
}

function addSample(targets, target, score, sampleCount) {
	if (targets[target])
		targets[target][score]=(targets[target][score] || 0)+(sampleCount || 1)
}

let targets={
	['100']: {
		// target
		[100]: 4, // score: sample count
		[10]: 68,
	},
	['50']: {
		[100]: 1,
		[50]: 16,
		[40]: 2,
		[20]: 3,
		[10]: 50,
	},
	['40']: {
		[50]: 6,
		[40]: 12,
		[30]: 5,
		[20]: 17,
		[10]: 32,
	},
	['30']: {
		[40]: 5,
		[30]: 16,
		[20]: 45,
		[10]: 6,
	},
}

function scoreToTickets(score) {
	if (score < 250) {
		return 0
	} else if (score < 310) {
		return 1
	} else if (score < 360) {
		return 3
	} else if (score < 450) {
		return 9
	} else if (score < 550) {
		return 27
	} else {
		return 81
	}
}

let scores=[0, 10, 20, 30, 40, 50, 100]

let historyIndex=0
let history=[]

history[historyIndex]={
	ballsRemaining: 9,
	score: 0,
	target: getNextTarget(scoreToTickets, targets, 9, 0),
}

for (let index in scores) {
	let score=scores[index]

	let button=document.createElement('Button')
	button.innerHTML=score
	document.getElementById('middle').appendChild(button)

	if (index % 3 === 0) {
		document.getElementById('middle').appendChild(document.createElement('br'))
	}

	button.onclick=function () {
		let lastState=history[historyIndex]
		let state={}

		state.ballsRemaining=lastState.ballsRemaining - 1
		state.score=lastState.score+score

		if (state.ballsRemaining === 0) {
			state.ballsRemaining=9
			state.score=0
		}

		addSample(targets, lastState.target, score)

		state.target=getNextTarget(
			scoreToTickets,
			targets,
			state.ballsRemaining,
			state.score
		)

		history[++historyIndex]=state
	}
}

let button=document.createElement('Button')
button.innerHTML='Undo'
document.getElementById('middle').appendChild(button)

button.onclick=function () {
	if (historyIndex === 0) {
		return
	}
	let lastState=history[historyIndex - 1]
	let state=history[historyIndex]
	--historyIndex

	let score=state.score - lastState.score
	addSample(targets, lastState.target, score, -1)
}

function render() {
	let state=history[historyIndex]

	context.clearRect(0, 0, vsx, vsy)
	context.font='50px Prata'
	context.fillText(
		'Target: '+state.target,
		vsx/2,
		(2/3)*vsy - 20*Math.sin(tick())
	)

	context.font='20px Prata'
	context.fillText(
		'Balls: '+state.ballsRemaining,
		vsx/3,
		vsy/3+20*Math.cos(tick())
	)
	context.fillText(
		'Score: '+state.score,
		(2/3)*vsx,
		(1/3)*vsy+20*Math.cos(tick())
	)
}

function gameLoop() {
	render()
	requestAnimationFrame(gameLoop)
}

gameLoop()
