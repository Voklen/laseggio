async function start() {
	removeCSSfile('pre-playing.css')
	loadCSSfile('playing.css')
	await sleep(500)
	const middleC = displayText('This is middle C', 'h2')
	await sleep(200)
	await playNote(60, 800)
	await hideText(middleC)
	const theirAttempt = displayText('Now you try', 'h2')
}

async function playNote(note, duration) {
	noteOn(note, 100)
	await sleep(duration)
	noteOff(note)
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
