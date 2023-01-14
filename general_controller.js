let initialKeyPressed = false;
let screenClicked = false;

function onInitialKeyPress() {
	// hehe yep, self modifying code, I just wanted a bit of fun in a simple function
	// I promise I won't make any more in this project. Super serious business now 🧐
	onInitialKeyPress = function () { };
	initialKeyPressed = true;
	document.getElementById('press-midi').style.display = 'none';
	document.getElementById('start-text').style.display = 'block';
	if (screenClicked) {
		removeBlur();
	}
}

function startClick() {
	screenClicked = true;
	if (initialKeyPressed) {
		removeBlur();
	}
}

function removeBlur() {
	document.getElementById('start-text').style.display = 'none'
	document.getElementsByTagName('main')[0].style.filter = 'blur(0)';
}