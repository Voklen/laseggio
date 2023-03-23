async function start() {
	removeCSSfile('pre-playing.css')
	await sleep(500)
	const middleC = displayText('This is middle C')
	await sleep(200)
	await playNote(60, 800)
	await hideText(middleC)
	const theirAttempt = displayText('Now you try')
	if (!(await expectNote(60))) {
		const notQuite = displayText('Not quite', 1)
		await hideText(theirAttempt)
		let tryAgain = displayText('Try again')
		while (!(await expectNote(60))) {
			await hideText(tryAgain)
			tryAgain = displayText('Try again')
		}
	}
	await clearText()
	displayText('Very nice', 1)
}
