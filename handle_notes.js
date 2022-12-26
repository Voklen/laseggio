const ac = new AudioContext();
var instrument;

Soundfont.instrument(ac, 'acoustic_grand_piano').then(function (piano) {
	instrument = piano;
})

function note_on(note_index, velocity) {
	const note = get_note(note_index)
	note.style.background = 'red'
	instrument.play(note_index)

	console.log(`The note ${note_index} is on with a velocity of ${velocity}`)
}

function note_off(note_index) {
	const note = get_note(note_index)
	note.style.background = ''
	instrument.stop(null, [note_index])
	console.log(`The note ${note_index} is now off`)
}

function get_note(note_index) {
	const element = document.getElementById('piano');
	const children = element.children;
	const index = note_index - 60;
	return children[index];
}