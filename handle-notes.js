/* Soundfont setup */
let instrument

Soundfont.instrument(new AudioContext(), 'acoustic_grand_piano').then(
	setInstrument
)

function setInstrument(piano) {
	instrument = piano
}

/* Note handling */

class NoteBroadcaster {
	constructor() {
		this.subscribers = []
	}

	subscribe(callback) {
		this.subscribers.push(callback)
	}

	notifySubscribers(data) {
		this.subscribers.forEach((subscriber) => subscriber(data))
	}
}

let noteBroadcaster = new NoteBroadcaster()

function noteOn(note, velocity) {
	if (!initialKeyPressed) {
		onInitialKeyPress()
		return
	}

	noteBroadcaster.notifySubscribers(note)
	const noteElement = getNoteElement(note)
	noteElement.style.background = 'red'
	instrument.play(note, 0, { gain: velocity / 16 })
}

function noteOff(note) {
	const noteElement = getNoteElement(note)
	noteElement.style.background = ''
	instrument.stop(0, [note])
}

function getNoteElement(note) {
	const element = document.getElementById('piano')
	const children = element.children
	const index = note - 36
	return children[index]
}
