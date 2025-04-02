const { default: axios } = require("axios");
const { piped, head } = require("rambdax");

let OFFSET = -2

function getTime (timeInput, offset = 0) {
	return piped(
		timeInput,
		x => x.split(' '),
		head,
		x => {
			let [hours, minutes] = x.split(':').map(Number);
			minutes = String(minutes).length === 1 ? `0${minutes}` : minutes;
			if(timeInput.includes('PM')){
				hours += 12;
			}
			hours += offset;

			return hours > 10 ? `${hours}:${minutes}` : `0${hours}:${minutes}`;
		}
	)
}

async function getChangeThemeTimes() {
	const {data} = await axios.get('https://api.sunrisesunset.io/json?lat=42.151815440944674&lng=24.75282924322365');
	const sunrise = data.results.sunrise;
	const sunset = data.results.sunset;
	
	return [
		getTime(sunrise),
		getTime(sunset, OFFSET)
	]
}

exports.getChangeThemeTimes = getChangeThemeTimes;
