const main = document.getElementsByTagName('main');

let initialKeyPressed = false;
let screenClicked = false;

function onInitialKeyPress() {
	// hehe yep, self modifying code, I just wanted a bit of fun in a simple function
	// I promise I won't make any more in this project. Super serious business now 🧐
	onInitialKeyPress = function () { };
	initialKeyPressed = true;

	removeClass('press-midi');
	if (screenClicked) {
		removeBlur();
		removeJSfile('pre-playing.js')
	} else {
		displayText('Click anywhere to start', 'pre-playing click-to-start', 'h2')
	}
}

function startClick() {
	screenClicked = true;
	if (initialKeyPressed) {
		removeClass('pre-playing')
		removeBlur()
		removeJSfile('pre-playing.js')
	}
}

function noMIDIDevice() {
	removeClass('press-midi');

	let text = `
	A MIDI device is needed for this currently\n
	I am planning on making a simplified version where you can click the keys\n
	and focus more on music theory and listening than playing
	`
	displayText(text, 'pre-playing no-midi-device', 'p')
}

function removeBlur() {
	document.getElementsByTagName('main')[0].style.filter = 'blur(0)';
}
