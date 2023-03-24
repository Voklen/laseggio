async function start() {
	removeCSSfile('pre-playing.css')
	await sleep(500)
	await basicPlaying('This is middle C', [60])
	await basicPlaying('This is the D above middle C', [62])
	await basicPlaying('Now together', [60, 62])
}

async function basicPlaying(text, notes) {
	const thisIsD = displayText(text)
	await sleep(200)
	for (const note of notes) {
		await playNote(note, 800)
	}
	let expectingPromise = expectSequence(notes)
	await hideText(thisIsD)
	const theirAttempt = displayText('Now you try')
	if (await expectingPromise) {
		await clearText()
		displayText(ComplimentGenerator.medium())
	} else {
		expectingPromise = expectSequence(notes)
		displayText('Not quite', 1)
		await hideText(theirAttempt)
		let tryAgain = displayText('Try again')
		while (!(await expectingPromise)) {
			expectingPromise = expectSequence(notes)
			await hideText(tryAgain)
			tryAgain = displayText('Try again')
		}
		await clearText()
		displayText(ComplimentGenerator.return())
	}
	await sleep(1200)
	await clearText()
}
