async function learnByEar() {
	const songNotesString = prompt(
		'Enter the song notes you want to learn',
		'C4 Ab3 D#5 C#4 D4'
	)
	const songNotes = songNotesString.split(' ').map(convertSPNToNumber)
	for (let maxIndex in songNotes) {
		const notes = songNotes.slice(0, parseInt(maxIndex) + 1)
		await expectAndRetryFast(notes, () => demonstrate(notes))
	}
}

function convertSPNToNumber(spn) {
	const pitchMap = {
		C: 0,
		D: 2,
		E: 4,
		F: 5,
		G: 7,
		A: 9,
		B: 11,
	}

	const note = spn[0].toUpperCase()
	let octave = parseInt(spn[spn.length - 1])

	let pitchValue = pitchMap[note]

	if (isNaN(pitchValue) || isNaN(octave)) {
		throw new Error('Invalid SPN format')
	}

	if (spn.includes('#')) {
		pitchValue += 1
	}
	if (spn.includes('b')) {
		pitchValue -= 1
	}

	const noteNumber = (octave + 1) * 12 + pitchValue
	return noteNumber
}

async function demonstrate(notes) {
	await playNote(notes[0], 800)
	for (let i = 1; i < notes.length; i++) {
		await playInvisibleNote(notes[i], 800)
	}
}
