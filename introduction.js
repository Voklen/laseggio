async function start() {
	removeCSSfile('pre-playing.css')
	await sleep(500)
	await basicPlaying('This is middle C', [60])
	await basicPlaying('This is the D above middle C', [62])
	await basicPlaying('Now one after the other', [60, 62])
	await basicPlaying('How about C and E', [60, 64])
	await listening()
	await basicPlaying('Now C, D, and E', [60, 62, 64])
}

async function listening() {
	const nowListen = displayText('Now try to hear what note is being played')
	await playNote(60, 800)
	await playInvisibleNote(62, 800)
	const notes = [60, 62]
	let expectingPromise = expectSequence(notes)
	await hideText(nowListen)
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
