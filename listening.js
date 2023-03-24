async function listening() {
	await sleep(500)
	await two_random()
	await more_precision()
	await any_relative()
}

async function C_and_D_or_E() {
	const nowListen = displayText('Try to hear what note is being played')
	const notes = [60, randItem([62, 64])]
	const playNotes = async () => {
		await playNote(notes[0], 800)
		await playInvisibleNote(notes[1], 800)
	}
	await expectAndRetryFast(notes, nowListen, playNotes)
}

async function two_random() {
	const nowListen = displayText('Try to hear what note is being played')
	const notes = [randItem([60, 62, 64]), randItem([62, 64])]
	const playNotes = async () => {
		await playInvisibleNote(notes[0], 800)
		await playInvisibleNote(notes[1], 800)
	}
	await expectAndRetryFast(notes, nowListen, playNotes)
}

async function more_precision() {
	const nowListen = displayText('Try to hear what note is being played')
	const notes = [randItem([60, 61, 62, 63, 64]), randItem([60, 61, 62, 63, 64])]
	const playNotes = async () => {
		await playInvisibleNote(notes[0], 800)
		await playInvisibleNote(notes[1], 800)
	}
	await expectAndRetryFast(notes, nowListen, playNotes)
}

async function any_relative() {
	const nowListen = displayText('Try to hear what note is being played')
	const notes = [rand(57, 69), rand(57, 69)]
	const playNotes = async () => {
		await playNote(notes[0], 800)
		await playInvisibleNote(notes[1], 800)
	}
	await expectAndRetryFast(notes, nowListen, playNotes)
}

async function expectAndRetryFast(notes, showingText, playNotes) {
	await playNotes()
	let expectingPromise = expectSequence(notes)
	await hideText(showingText)
	const theirAttempt = displayText('Now you try')
	if (await expectingPromise) {
		await clearText()
		displayText(ComplimentGenerator.medium())
	} else {
		displayText('Not quite', 1)
		await hideText(theirAttempt)
		let tryAgain = displayText('Here it is again')
		await playNotes()
		while (!(await expectSequence(notes))) {
			await hideText(tryAgain)
			tryAgain = displayText('Here it is again')
			await playNotes()
		}
		await clearText()
		displayText(ComplimentGenerator.return())
	}
	await sleep(1200)
	await clearText()
}
