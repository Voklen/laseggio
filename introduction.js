async function start() {
	removeCSSfile('pre-playing.css')
	await sleep(500)
	await middleC()
	await D()
	await together()
}

async function middleC() {
	const middleC = displayText('This is middle C')
	await sleep(200)
	await playNote(60, 800)
	await hideText(middleC)
	const theirAttempt = displayText('Now you try')
	if (!(await expectNote(60))) {
		displayText('Not quite', 1)
		await hideText(theirAttempt)
		let tryAgain = displayText('Try again')
		while (!(await expectNote(60))) {
			await hideText(tryAgain)
			tryAgain = displayText('Try again')
		}
	}
	await clearText()
	displayText('Very nice')
	await sleep(1200)
	await clearText()
}

async function D() {
	const thisIsD = displayText('This is the D above middle C')
	await sleep(200)
	await playNote(62, 800)
	await hideText(thisIsD)
	const theirAttempt = displayText('Now you try')
	if (!(await expectNote(62))) {
		displayText('Not quite', 1)
		await hideText(theirAttempt)
		let tryAgain = displayText('Try again')
		while (!(await expectNote(62))) {
			await hideText(tryAgain)
			tryAgain = displayText('Try again')
		}
	}
	await clearText()
	displayText('Good good')
	await sleep(1200)
	await clearText()
}

async function together() {
	const nowTogether = displayText('Now together')
	await sleep(100)
	await playNote(60, 800)
	await playNote(62, 800)
	await hideText(nowTogether)
	const theirAttempt = displayText('Now you try')
	if (!(await expectSequence([60, 62]))) {
		displayText('Not quite', 1)
		await hideText(theirAttempt)
		let tryAgain = displayText('Try again')
		while (!(await expectSequence([60, 62]))) {
			await hideText(tryAgain)
			tryAgain = displayText('Try again')
		}
	}
	await clearText()
	displayText('Nicee')
	await sleep(1200)
	await clearText()
}
