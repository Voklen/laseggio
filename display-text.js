function displayText(text, className, element) {
	let textElement = document.createElement(element);
	textElement.innerHTML = text;
	textElement.className = className;
	document.body.appendChild(textElement);
	return textElement;
}

function removeClass(className) {
	let elements = document.getElementsByClassName(className);
	Array.from(elements).forEach(removeElement)
};

function removeElement(element) {
	element.remove()
}

function removeJSfile(filename) {
	var allsuspects = document.getElementsByTagName('script')
	for (var i = allsuspects.length - 1; i >= 0; i--) {
		if (allsuspects[i].getAttribute('src') == filename) {
			allsuspects[i].parentNode.removeChild(allsuspects[i])
			return;
		}
	}
}