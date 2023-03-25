async function listening() {
	await sleep(500)
	await two_random()
	await more_precision()
	await any_relative()
}

async function C_and_D_or_E() {
	displayText('Try to hear what note is being played')
	const notes = [60, randItem([62, 64])]
	const playNotes = async () => {
		await playNote(notes[0], 800)
		await playInvisibleNote(notes[1], 800)
	}
	await expectAndRetryFast(notes, playNotes)
}

async function two_random() {
	displayText('Try to hear what note is being played')
	const notes = [randItem([60, 62, 64]), randItem([62, 64])]
	const playNotes = async () => {
		await playInvisibleNote(notes[0], 800)
		await playInvisibleNote(notes[1], 800)
	}
	await expectAndRetryFast(notes, playNotes)
}

async function more_precision() {
	displayText('Try to hear what note is being played')
	const notes = [randItem([60, 61, 62, 63, 64]), randItem([60, 61, 62, 63, 64])]
	const playNotes = async () => {
		await playInvisibleNote(notes[0], 800)
		await playInvisibleNote(notes[1], 800)
	}
	await expectAndRetryFast(notes, playNotes)
}

async function any_relative() {
	displayText('Try to hear what note is being played')
	const notes = [rand(57, 69), rand(57, 69)]
	const playNotes = async () => {
		await playNote(notes[0], 800)
		await playInvisibleNote(notes[1], 800)
	}
	await expectAndRetryFast(notes, playNotes)
}

async function expectAndRetryFast(notes, playNotes) {
	await playNotes()
	let expectingPromise = expectSequence(notes)
	await displayText('Now you try')
	if (await expectingPromise) {
		await clearText()
		displayText(ComplimentGenerator.medium())
	} else {
		displayText('Not quite', 1)
		displayText('Here it is again')
		await playNotes()
		while (!(await expectSequence(notes))) {
			await displayText('Here it is again')
			await playNotes()
		}
		await clearText()
		displayText(ComplimentGenerator.return())
	}
	await sleep(1200)
	await clearText()
}
