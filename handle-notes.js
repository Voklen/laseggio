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
	noteBroadcaster.notifySubscribers(note)
	noteOnVisual(note)
	noteOnSound(note, velocity)
}

function noteOnVisual(note) {
	const noteElement = getNoteElement(note)
	noteElement.style.background = 'red'
}

function noteOnSound(note, velocity) {
	instrument.play(note, 0, { gain: velocity / 16 })
}

function noteOff(note) {
	noteOffVisual(note)
	noteOffSound(note)
}

function noteOffVisual(note) {
	const noteElement = getNoteElement(note)
	noteElement.style.background = ''
}

function noteOffSound(note) {
	instrument.stop(0, [note])
}

function getNoteElement(note) {
	const element = document.getElementById('piano')
	const children = element.children
	const index = note - 36
	return children[index]
}
