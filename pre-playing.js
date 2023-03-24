const main = document.getElementsByTagName('main')

let initialKeyPressed = false
let screenClicked = false

function onInitialKeyPress() {
	initialKeyPressed = true

	removeClass('press-midi')
	if (screenClicked) {
		endAndCleanup()
	} else {
		displayText(
			'Click anywhere to start',
			1,
			'h2',
			'pre-playing click-to-start'
		)
	}
}

function startClick() {
	screenClicked = true
	if (initialKeyPressed) {
		removeClass('pre-playing')
		endAndCleanup()
	}
	// Remove startClick from running again
	document.body.onmousedown = null
}

function noMIDIDevice() {
	removeClass('press-midi')

	let text = `
	A MIDI device is needed for this currently\n
	I am planning on making a simplified version where you can click the keys\n
	and focus more on music theory and listening than playing
	`
	displayText(text, 1, 'p', 'pre-playing no-midi-device')
}

function endAndCleanup() {
	removeBlur()
	removeJSfile('pre-playing.js')
	start()
}

function removeBlur() {
	document.getElementsByTagName('main')[0].style.filter = 'blur(0)'
}
