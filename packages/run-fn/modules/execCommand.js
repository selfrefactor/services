const { exec } = require('node:child_process');
const { CWD } = require('../constants');

const execCommand = (command, cwd = CWD, logFlag = false) => {
	const logs = [];
	return new Promise((resolve, reject) => {
		if (logFlag) {
			console.log(cwd, command);
		}
		const proc = exec(command, { cwd });

		proc.stdout.on('data', (chunk) => {
			if (logFlag) {
				logs.push(chunk.toString());
			} else {
				console.log(chunk.toString());
			}
		});
		proc.stdout.on('end', () => resolve(logs));
		proc.stdout.on('error', (err) => {
			reject(err);
		});
	});
};

exports.execCommand = execCommand;
