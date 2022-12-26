window.navigator.requestMIDIAccess().then(function (midiAccess) {
	midiAccess.inputs.forEach(function (midiInput) {
		midiInput.onmidimessage = get_MIDI_message;
	});
}, on_MIDI_failure);


function get_MIDI_message(message) {
	const command = message.data[0];
	const note = message.data[1];
	// A velocity value might not be included with a note_off command
	const velocity = (message.data.length > 2) ? message.data[2] : 0;

	switch (command) {
		case 144:
			if (velocity > 0) {
				note_on(note, velocity);
			} else {
				note_off(note);
			}
			break;
		case 128:
			note_off(note);
			break;
	}
}

function on_MIDI_failure() {
	console.log('Could not access your MIDI devices.');
}