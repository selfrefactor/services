process.on('unhandledRejection', console.log);
process.on('uncaughtException', console.log);

const depFn = require('dep-fn');
const { drop } = require('rambdax');

const { bump } = require('./services/bump/bump');
const { clone } = require('./services/clone/clone');
const { dvd } = require('./services/dvd/dvd.js');
const { fastDeploy } = require('./services/d/fastDeploy');
const { log } = require('helpers-fn');
const { read } = require('./services/read/read');
const { pullAll } = require('./services/pull-all/pull-all');
const { lintFile } = require('./services/lint/lint');
const { lintFolder } = require('./services/lint-folder/lint-folder');
const { diary, DIARY_MAP } = require('./services/diary/diary');


async function runFn() {
	const [firstArgumentRaw, secondArgument, thirdArgument, ...rest] = drop(2)(
		process.argv,
	);
	const firstArgument = firstArgumentRaw.toLowerCase();
	if (['pull', 'pull-all'].includes(firstArgument)) {
		return pullAll();
	}

	if (firstArgument === 'bump') {
		return bump(secondArgument);
	}
	if (firstArgument.includes('diary')) {
		const diaryConfig = DIARY_MAP[firstArgument];
		if (!diaryConfig) {
			return log('Such diary config does not exist', 'error');
		}

		return diary({
			outCommand: diaryConfig.outCommand,
			mode: firstArgument,
			envKey: diaryConfig.envKey,
			pathInput: diaryConfig.path,
			diaryInput: [secondArgument, thirdArgument, ...rest],
		});
	}

	if (firstArgument.includes('lint:file')) {
		return lintFile(secondArgument);
	}
	if (firstArgument === 'lint:folder') {
		return lintFolder();
	}

	if (firstArgument === 'dep:stable') {
		let parrallelLimit = secondArgument ? Number(secondArgument) : 8;
		return depFn.update({ parallel: true, parrallelLimit, atLeast30DaysOld: true });
	}
	if (firstArgument === 'dep:next') {
		let parrallelLimit = secondArgument ? Number(secondArgument) : 8;
		return depFn.update({ parallel: true, parrallelLimit, atLeast30DaysOld: false });
	}
	// default mode where user is asked to confirm each update
	if (firstArgument === 'dep') {
		return depFn.cli();
	}
	if (firstArgument === 'dvd') {
		return dvd(secondArgument);
	}


	if (firstArgument === 'clone') {
		return clone(secondArgument);
	}

	if (firstArgument === 'read') {
		return read(secondArgument, thirdArgument);
	}

	if (firstArgument === 'd') {
		return fastDeploy(...[secondArgument, thirdArgument, ...rest]);
	}

	log('Such method does not exist', 'error');
}

runFn().then(() => {
	console.log('');
});
