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
		removejsfile('pre-playing.js')
	} else {
		displayText('Click anywhere to start', 'pre-playing click-to-start', 'h2')
	}
}

function startClick() {
	screenClicked = true;
	if (initialKeyPressed) {
		removeClass('pre-playing')
		removeBlur()
		removejsfile('pre-playing.js')
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

function displayText(text, className, element) {
	let textElement = document.createElement(element);
	textElement.innerHTML = text;
	textElement.className = className;
	document.body.appendChild(textElement);
	return textElement;
}

function removeBlur() {
	document.getElementsByTagName('main')[0].style.filter = 'blur(0)';
}

function removejsfile(filename) {
	var allsuspects = document.getElementsByTagName('script')
	for (var i = allsuspects.length - 1; i >= 0; i--) {
		if (allsuspects[i].getAttribute('src') == filename) {
			allsuspects[i].parentNode.removeChild(allsuspects[i])
			return;
		}
	}
}

function removeClass(className) {
	let elements = document.getElementsByClassName(className);
	Array.from(elements).forEach(removeElement)
};

function removeElement(element) {
	element.remove()
}