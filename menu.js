async function toMenu() {
	clearText()
	await hideKeyboard()
	const lessonSelection = document.getElementById('lesson-selection')
	await fadeInElement(lessonSelection)
}
