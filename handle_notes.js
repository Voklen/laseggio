function note_on(note_index, velocity) {
	const note = get_note(note_index)
	note.style.background = 'red'

	console.log(`The note ${note_index} is on with a velocity of ${velocity}`)
}

function note_off(note_index) {
	const note = get_note(note_index)
	note.style.background = ''
	console.log(`The note ${note_index} is now off`)
}

function get_note(note_index) {
	const element = document.getElementById('piano');
	const children = element.children;
	const index = note_index - 60;
	return children[index];
}