const R = require('rambdax');
const { CWD } = require('../../constants');
const { lintFile } = require('../lint/lint');
const { log, scanFolder } = require('helpers-fn');

const allowedFileEndings = ['.ts', '.js', '.tsx', '.jsx', '.py', '.css'];
const MAX_LIMIT = 700;

const excludeFn = (x) =>
	R.anyTrue(
		x.includes('node_modules'),
		x.includes('/dist'),
		x.includes('/.git'),
		x.includes('/coverage'),
	);

const filterAllowed = (x) =>
	R.any((fileEnding) => x.endsWith(fileEnding), allowedFileEndings);

async function lintFolder() {
	const allFiles = await scanFolder({
		folder: CWD,
		excludeFn,
		filterFn: filterAllowed,
	});
	if (allFiles.length > MAX_LIMIT) {
		log(`Too many files '${allFiles.length}' in '${CWD}'`, 'error');
		await R.delay(5000);
	}

	console.time('lintFolder');
	const lint = async (filePath) => lintFile(filePath);

	await R.mapAsync(lint, allFiles);

	console.timeEnd('lintFolder');
}

exports.lintFolder = lintFolder;
