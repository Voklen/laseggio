async function start() {
	removeCSSfile('pre-playing.css')
	await sleep(500)
	const middleC = displayText('This is middle C')
	await sleep(200)
	await playNote(60, 800)
	await hideText(middleC)
	const theirAttempt = displayText('Now you try')
	if (await expectNote(60)) {
		displayText('Very nice', 1)
		hideText(theirAttempt)
	} else {
		displayText('Not quite', 1)
		hideText(theirAttempt)
	}
}
