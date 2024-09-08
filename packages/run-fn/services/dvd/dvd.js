const { execCommand } = require('../../modules/execCommand');
const { existsSync, unlinkSync } = require('node:fs');
const { log, scanFolder } = require('helpers-fn');
const { piped, split, last, mapAsync, tryCatchAsync, remove } = require('rambdax');
const { CWD } = require('../../constants');

async function dvd(label) {
	console.log(CWD);
	const files = await scanFolder({
		folder: CWD,
		filterFn: (x) => x.toLowerCase().endsWith('.vob'),
	});
	const fn = async (file, i) => {
		const fileName = remove(`${CWD}/`, file);
		const finalOutput = `${label}-${i}.mp4`;
		const output = `raw-${finalOutput}`;
		const command = `ffmpeg -i ${fileName} -c:v libx264 -preset slow -crf 22 -c:a aac -b:a 128k ${output}`;
		console.log(command);
		await execCommand(command);
		const decreaseQuality = `ffmpeg -i ${output} -vcodec libx264 -crf 27 ${finalOutput}`;
		console.log(decreaseQuality);
		await execCommand(decreaseQuality);
		await unlinkSync(output);
	};
	const iterable = async (file, i) => {
		await tryCatchAsync(
			(x) => fn(x, i),
			(err) => console.log(err),
		)(file);
	};
	await mapAsync(iterable, files);
}

exports.dvd = dvd;
