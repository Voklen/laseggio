async function learnByEar() {
	const songNotes = prompt('Enter the song notes you want to learn', 'CDEEDC')
	for (let maxIndex in songNotes) {
		const notes = songNotes.slice(0, maxIndex)
		await expectAndRetryFast(notes, demonstrate)
	}
}

async function demonstrate(notes) {
	await playNote(notes[0], 800)
	for (let i = 1; i < notes; i++) {
		await playInvisibleNote(notes[i], 800)
	}
}
