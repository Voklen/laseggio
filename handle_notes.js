let instrument;

Soundfont.instrument(new AudioContext(), 'acoustic_grand_piano').then(setInstrument);

function setInstrument(piano) {
	instrument = piano;
}

function noteOn(note, velocity) {
	const noteElement = getNoteElement(note)
	noteElement.style.background = 'red'
	instrument.play(note)
}

function noteOff(note) {
	const noteElement = getNoteElement(note)
	noteElement.style.background = ''
	instrument.stop(0, [note])
}

function getNoteElement(note) {
	const element = document.getElementById('piano');
	const children = element.children;
	const index = note - 60;
	return children[index];
}