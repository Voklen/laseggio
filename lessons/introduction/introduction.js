async function start() {
	loadJSfile('menu.js')
	await sleep(500)
	await basicPlaying('This is middle C', [60])
	await basicPlaying('This is the D above middle C', [62])
	await basicPlaying('Now one after the other', [60, 62])
	await basicPlaying('How about C and E', [60, 64])
	await basicPlaying('Now C, D, and E', [60, 62, 64])
	await basicPlaying('E D C', [64, 62, 60])
	await basicPlaying('Let’s expand out from A to A', [57, 69])
	await fastBasicPlaying('And walk up it', [57, 59, 60, 62, 64, 65, 67, 69])
	await theory()
	await basicPlaying('So let’s do a little D♭', [61])
	await basicPlaying('Now a C# (yes, it’s the same)', [61])
	await basicPlaying('Walk up by semitones', [60, 61, 62, 63, 64])
	await displayText('And that’s us done the first lesson!')
	const nextButton = await showNextButton()
	nextButton.remove()
	toMenu()
}

async function basicPlaying(text, notes) {
	await displayText(text)
	for (const note of notes) {
		await playNote(note, 800)
	}
	await expectAndRetry(notes)
}

async function fastBasicPlaying(text, notes) {
	displayText(text)
	for (const note of notes) {
		await playNote(note, 400)
	}
	await expectAndRetry(notes)
}

async function animateKeyboard() {
	const visibleChildren = []
	const pianoChildren = document.getElementById('piano').children
	for (let i = 0; i < pianoChildren.length; i++) {
		pianoChildren[i].style.transitionProperty = 'all'
		if (i < 24 || i >= 36) {
			pianoChildren[i].classList.add('fade-out')
		} else {
			visibleChildren.push(pianoChildren[i])
		}
	}
	await sleep(2000)
	return visibleChildren
}

async function reverseKeyboardAnimation() {
	const pianoChildren = document.getElementById('piano').children
	for (key of pianoChildren) {
		key.classList.remove('fade-out')
	}
	await sleep(2000)
}

async function expandNotes(keys) {
	keys.forEach((key) => {
		key.classList.add('all-white')
	})
	await sleep(2000)
	keys.forEach((key) => {
		key.style.transitionProperty = 'none'
	})
}

async function contractNotes(keys) {
	keys.forEach((key) => {
		key.style.transitionProperty = 'all'
	})
	await sleep(100)
	keys.forEach((key) => {
		key.classList.remove('all-white')
	})
	await sleep(2000)
	keys.forEach((key) => {
		key.style.transitionProperty = 'none'
	})
}

async function expectAndRetry(notes) {
	let expectingPromise = expectSequence(notes)
	await displayText('Now you try')
	if (await expectingPromise) {
		await clearText()
		displayText(ComplimentGenerator.medium())
	} else {
		expectingPromise = expectSequence(notes)
		displayText('Not quite', 1)
		await displayText('Try again')
		while (!(await expectingPromise)) {
			expectingPromise = expectSequence(notes)
			await displayText('Try again')
		}
		await clearText()
		displayText(ComplimentGenerator.return())
	}
	await sleep(1200)
	await clearText()
}

async function theory() {
	displayText('Now for some theory')
	const keys = await animateKeyboard()
	await expandNotes(keys)
	hideLine(0)
	displayText(
		'Each of these are a semitone. They have the same frequency ratio between them',
		2,
		'p'
	)
	await displayText('Every 12 semitones is an octave', 3, 'p')
	const notes = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71]
	for (const note of notes) {
		await playNote(note, 200)
	}
	const nextButton = await showNextButton()
	hideLine(3)
	await displayText(
		'If you’re interested, every 12 semitones (an octave) doubles the frequency',
		2,
		'p'
	)
	displayText(
		'So if you want to calculate the frequency ratio between each note go right ahead',
		3,
		'p'
	)
	await buttonPress(nextButton)
	hideLine(3)
	await displayText(
		'The black notes are described as either the "sharp" of the note lower (denoted with a #)',
		2,
		'p'
	)
	displayText('Or the "flat" of the note above (denoted with a ♭)', 3, 'p')
	await buttonPress(nextButton)
	displayText(
		'The reason we have white and black notes is because the white notes were the only ones',
		2,
		'p'
	)
	await displayText(
		'Gregorian monks and nuns in the 8th century used, and then the black frequencies were added in after.',
		3,
		'p'
	)
	await contractNotes(keys)
	await buttonPress(nextButton)
	await clearText()
	nextButton.remove()
	await reverseKeyboardAnimation()
}
