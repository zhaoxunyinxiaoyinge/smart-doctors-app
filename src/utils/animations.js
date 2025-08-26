function getAnimationNumber(targetObject, time, targetValue) {
	let count = 0;
	let inital = 0;
	let timer = null;
	const step = Math.ceil(targetValue / Math.floor(time / 30));
	console.log(step,"step")
	timer = setInterval(() => {
		count = step + count;
		targetObject.value=count;
		if (count >= targetValue) {
			clearInterval(timer);
			inital = count;
			targetObject.value=targetValue;
		}
	}, 30)
}

export {
	getAnimationNumber
}