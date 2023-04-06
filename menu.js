async function toMenu() {
	clearText()
	await hideKeyboard()
	const lessonSelection = document.getElementById('lesson-selection')
	console.log('starting')
	await fadeInElement(lessonSelection)
	console.log('done')
}
