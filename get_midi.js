window.navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
	midiAccess.inputs.forEach(forMIDIInput);
}

function forMIDIInput(midiInput) {
	midiInput.onmidimessage = getMIDIMessage;
}

function getMIDIMessage(message) {
	const command = message.data[0];
	const note = message.data[1];
	// A velocity value might not be included with a noteOff command
	const velocity = (message.data.length > 2) ? message.data[2] : 0;

	switch (command) {
		case 144:
			if (velocity > 0) {
				noteOn(note, velocity);
			} else {
				noteOff(note);
			}
			break;
		case 128:
			noteOff(note);
			break;
	}
}

function onMIDIFailure() {
	console.log('Could not access your MIDI devices.');
}