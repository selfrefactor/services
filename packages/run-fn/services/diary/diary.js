const { pathExistsSync, readFile, writeFile, readJson } = require('fs-extra');
const { log } = require('helpers-fn');

let dataPath = `${ __dirname }/data.json`;

const SEPARATOR = '\n===\n';
async function diary({ envKey, pathInput, diaryInput }) {
	if (pathExistsSync(pathInput) === false)
		return log(`${envKey} is missing`, 'error');

	let today = dayjs().format('YYYY-MM-DD');
	
	let data = (await readJson(dataPath))
	const content = (await readFile(pathInput)).toString().trim();
	const newContent = `${diaryInput.join(' ')}${SEPARATOR}${content}`;
	await writeFile(pathInput, newContent);
	log(diaryInput.join(' '), 'back');
	log('sep');
	log(`${pathInput} updated`, 'info');
}

exports.diary = diary;
