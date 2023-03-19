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
