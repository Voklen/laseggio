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
			const parent = element.parentNode
			if (parent != null) {
				parent.removeChild(element)
			}
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
		function onNote(note) {
			resolve(note)
		}
		noteBroadcaster.subscribe(onNote)
	})
}

// File handling

function removeCSSfile(filename) {
	var allsuspects = document.getElementsByTagName('link')
	for (var i = allsuspects.length - 1; i >= 0; i--) {
		if (allsuspects[i].getAttribute('href') == filename) {
			allsuspects[i].parentNode.removeChild(allsuspects[i])
			return
		}
	}
}

function removeJSfile(filename) {
	var allsuspects = document.getElementsByTagName('script')
	for (var i = allsuspects.length - 1; i >= 0; i--) {
		if (allsuspects[i].getAttribute('src') == filename) {
			allsuspects[i].parentNode.removeChild(allsuspects[i])
			return
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
	document.getElementById('scripts').appendChild(scriptTag)
}

// Other

class ComplimentGenerator {
	static getRandom(array) {
		return array[Math.floor(Math.random() * array.length)]
	}

	static return() {
		const options = [
			'Yas got it now',
			'Nice, got there',
			'“Anyone who has never made a mistake has never tried anything new.” ― Albert Einstein',
			'Love the resilience',
			'Nice determination',
		]
		return this.getRandom(options)
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
		return this.getRandom(options)
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
		return this.getRandom(options)
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
		return this.getRandom(options)
	}
}

async function toExplanation() {
	const main = document.getElementsByTagName('main')[0]
	main.classList.add('fade-out')
	return new Promise((resolve) => {
		main.addEventListener('transitionend', resolve)
	})
}

async function fromExplanation() {
	const main = document.getElementsByTagName('main')[0]
	main.classList.remove('fade-out')
	return new Promise((resolve) => {
		main.addEventListener('transitionend', resolve)
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
