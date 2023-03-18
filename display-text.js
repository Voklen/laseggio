function displayText(text, element, className) {
	let textElement = document.createElement(element);
	textElement.innerHTML = text;
	if (className != null) {
		textElement.className = className
	}
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

function removeCSSfile(filename) {
	var allsuspects = document.getElementsByTagName('link')
	for (var i = allsuspects.length - 1; i >= 0; i--) {
		if (allsuspects[i].getAttribute('href') == filename) {
			allsuspects[i].parentNode.removeChild(allsuspects[i])
			return;
		}
	}
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

function loadCSSfile(filename) {
	let scriptTag = document.createElement('link')
	scriptTag.rel = 'stylesheet'
	scriptTag.href = filename
	document.getElementsByTagName('head')[0].appendChild(scriptTag)
}

function loadJSfile(filename) {
	let scriptTag = document.createElement('script')
	scriptTag.type = 'text/javascript'
	scriptTag.src = filename
	document.getElementsByTagName('head')[0].appendChild(scriptTag)
}