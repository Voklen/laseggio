async function start() {
	removeCSSfile('pre-playing.css')
	loadCSSfile('playing.css')
	await sleep(500)
	const middleC = displayText('This is middle C', 'h2')
	await sleep(500)
	await playNote(60, 800)
	hideText(middleC)
}

async function playNote(note, duration) {
	noteOn(note, 100)
	await sleep(duration)
	noteOff(note)
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
