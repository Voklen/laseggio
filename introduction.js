async function start() {
	await sleep(500)
	await basicPlaying('This is middle C', [60])
	await basicPlaying('This is the D above middle C', [62])
	await basicPlaying('Now one after the other', [60, 62])
	await basicPlaying('How about C and E', [60, 64])
	await basicPlaying('Now C, D, and E', [60, 62, 64])
	await basicPlaying('E C D', [64, 62, 60])
	await basicPlaying('Let’s expand out from A to A', [57, 69])
	await fastBasicPlaying('And walk up it', [57, 59, 60, 62, 64, 65, 67, 69])
	displayText('Now for some theory')
	sleep(100)
	animateKeyboard()
}

async function basicPlaying(text, notes) {
	const showingText = displayText(text)
	await sleep(200)
	for (const note of notes) {
		await playNote(note, 800)
	}
	await expectAndRetry(notes, showingText)
}

async function fastBasicPlaying(text, notes) {
	const showingText = displayText(text)
	for (const note of notes) {
		await playNote(note, 400)
	}
	await expectAndRetry(notes, showingText)
}

async function animateKeyboard() {
	const visibleChildren = []
	const pianoChildren = document.getElementById('piano').children
	for (let i = 0; i < pianoChildren.length; i++) {
		if (i < 24 || i >= 36) {
			pianoChildren[i].classList.add('fade-out')
		} else {
			visibleChildren.push(pianoChildren[i])
		}
	}
	await sleep(2000)
	visibleChildren.forEach((key) => {
		key.classList.add('all-white')
	})
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
