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
	} else {
		displayText('Click anywhere to start', 'click-to-start')
	}
}

function startClick() {
	screenClicked = true;
	if (initialKeyPressed) {
		removeClass('click-to-start')
		removeBlur()
	}
}

function displayText(text, className) {
	let textElement = document.createElement('h2');
	textElement.innerHTML = text;
	textElement.className = className;
	document.body.appendChild(textElement)
}

function removeBlur() {
	document.getElementsByTagName('main')[0].style.filter = 'blur(0)';
}

function removeClass(className) {
	let elements = document.getElementsByClassName(className);
	Array.from(elements).forEach(removeElement)
};

function removeElement(element) {
	element.remove()
}