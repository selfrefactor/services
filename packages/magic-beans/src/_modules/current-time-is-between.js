function currentTimeIsBetween(from, to){
	const now = new Date()
	const nowTime = now.getHours() * 60 + now.getMinutes()
	const fromTime = from.split(':').map(x => parseInt(x))
	const toTime = to.split(':').map(x => parseInt(x))

	const fromTimeMinutes = fromTime[0] * 60 + fromTime[1]
	const toTimeMinutes = toTime[0] * 60 + toTime[1]

	return nowTime >= fromTimeMinutes && nowTime <= toTimeMinutes
}

exports.currentTimeIsBetween = currentTimeIsBetween