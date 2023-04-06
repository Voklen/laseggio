/*
This is where all the functions lie that are called to make up a
Laseggio course
*/

// Text manipulation

async function displayText(text, line = 0, element = 'h2', className) {
	const hidingLinePromise = hideLine(line)
	let textElement = document.createElement(element)
	textElement.innerHTML = text
	if (className != null) {
		textElement.className = className
	}
	let containerDiv = document.getElementById('text').children[line]
	await hidingLinePromise
	containerDiv.appendChild(textElement)
	return textElement
}

async function clearText() {
	const textContainer = document.getElementById('text')
	const lineElements = [...textContainer.children]
	return Promise.all(lineElements.map(removeChildren))
	async function removeChildren(element) {
		const elementsToRemove = [...element.children]
		return Promise.all(elementsToRemove.map(hideText))
	}
}

async function hideLine(line) {
	const textContainer = document.getElementById('text')
	const lineElement = textContainer.children[line]
	const elementsToRemove = [...lineElement.children]
	return Promise.all(elementsToRemove.map(hideText))
}

async function hideText(element) {
	element.style.animation = 'none'
	element.offsetHeight /* trigger reflow */
	element.style.animation = null
	element.style.animationDirection = 'reverse'
	// Wait for end of animation then remove element and return
	return new Promise((resolve) => {
		function onAnimationEnd() {
			element.remove()
			resolve()
		}
		element.addEventListener('animationend', onAnimationEnd)
	})
}

function removeClass(className) {
	let elements = document.getElementsByClassName(className)
	Array.from(elements).forEach(removeElement)
}

function removeElement(element) {
	element.remove()
}

// General visuals

async function hideKeyboard() {
	const main = document.getElementsByTagName('main')[0]
	await fadeOutElement(main)
}

async function showKeyboard() {
	const main = document.getElementsByTagName('main')[0]
	await fadeInElement(main)
}

async function showNextButton() {
	let spanElement = document.createElement('span')
	spanElement.textContent = 'Next'

	let buttonElement = document.createElement('button')
	buttonElement.appendChild(spanElement)
	buttonElement.setAttribute('type', 'button')
	buttonElement.setAttribute('data-text', 'Next')
	document.getElementById('text').appendChild(buttonElement)
	return new Promise((resolve) => {
		buttonElement.addEventListener('click', () => resolve(buttonElement))
	})
}

async function fadeOutElement(element) {
	element.classList.add('fade-out')
	return new Promise((resolve) => {
		element.addEventListener('transitionend', resolve)
	})
}

async function fadeInElement(element) {
	element.style.display = null // Remove any display:none on it
	element.offsetHeight /* trigger reflow */
	element.classList.remove('fade-out')
	await sleep(2000)
}

// Note handling

async function playNote(note, duration) {
	noteOn(note, 100)
	await sleep(duration)
	noteOff(note)
}

async function playInvisibleNote(note, duration) {
	noteOnSound(note, 100)
	await sleep(duration)
	noteOffSound(note)
}

async function expectSequence(notes) {
	for (const note of notes) {
		const correctNote = await expectNote(note)
		if (!correctNote) {
			return false
		}
	}
	return true
}

async function expectNote(note) {
	let received = await nextNote()
	return received == note
}

async function nextNote() {
	return new Promise((resolve) => {
		noteBroadcaster.subscribe(resolve)
	})
}

// JavaScript file handling

function removeJSfile(filename) {
	var allScriptTags = document.getElementsByTagName('script')
	for (tag of allScriptTags) {
		if (tag.getAttribute('src') == filename) {
			tag.remove()
			return
		}
	}
}

function loadJSfile(filename) {
	let scriptTag = document.createElement('script')
	scriptTag.type = 'text/javascript'
	scriptTag.src = filename
	document.getElementById('scripts').appendChild(scriptTag)
}

// Other

async function buttonPress(button) {
	return new Promise((resolve) => {
		button.addEventListener('click', resolve)
	})
}

function randItem(array) {
	return array[Math.floor(Math.random() * array.length)]
}

function rand(from, to) {
	return Math.floor(Math.random() * (to - from)) + from
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

class ComplimentGenerator {
	static return() {
		const options = [
			'Yas got it now',
			'Nice, got there',
			'“Anyone who has never made a mistake has never tried anything new.” ― Albert Einstein',
			'Love the resilience',
			'Nice determination',
		]
		return randItem(options)
	}

	static low() {
		const options = [
			'Pretty good',
			'Good',
			'Good good',
			'Nice',
			'Nice one',
			'Not too bad',
		]
		return randItem(options)
	}

	static medium() {
		const options = [
			'Very good',
			'Gooooood',
			'Very nice',
			'Nice nice',
			'Niceeeee',
			'Nailed it',
		]
		return randItem(options)
	}

	static high() {
		const options = [
			'On fire!',
			'ON FIRE',
			'Verrrry nice',
			'NICE',
			'Amazing',
			'Love it',
		]
		return randItem(options)
	}
}
