const { execCommand } = require('../../modules/execCommand');
const { last, remove } = require('rambdax');

function getFolderName(repo, folder) {
	if (folder) return folder;

	return remove('.git', last(repo.split('/')));
}

async function commit(message) {
	await execCommand('git add . --all');
	await execCommand(`git commit -m "${message}"`);
	await execCommand('git push');
}

async function read(repo, folder) {
	const folderName = getFolderName(repo, folder);
	await execCommand(`git clone --depth 1 ${repo} ${folder ? folder : ''}`);

	if (process.cwd().includes('to-read')) {
		await execCommand('rm -rf dist', `${process.cwd()}/${folderName}`);
		await execCommand('rm -rf .git', `${process.cwd()}/${folderName}`);
		await commit('feat: add new repo');
	} else {
		await execCommand('rm -rf .git', `${process.cwd()}/${folderName}`);
		console.log(`process cwd ${process.cwd()}`);
	}
}

exports.read = read;
