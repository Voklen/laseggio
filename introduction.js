async function start() {
	await sleep(500)
	await basicPlaying('This is middle C', [60])
	await basicPlaying('This is the D above middle C', [62])
	await basicPlaying('Now one after the other', [60, 62])
	await basicPlaying('How about C and E', [60, 64])
	await basicPlaying('C and D again', [60, 64])
	await basicPlaying('Now C, D, and E', [60, 62, 64])
}

async function basicPlaying(text, notes) {
	const showingText = displayText(text)
	await sleep(200)
	for (const note of notes) {
		await playNote(note, 800)
	}
	await expectAndRetry(notes, showingText)
}

async function expectAndRetry(notes, showingText) {
	let expectingPromise = expectSequence(notes)
	await hideText(showingText)
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
