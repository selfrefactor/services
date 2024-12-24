const { execCommand } = require('../../modules/execCommand');
const { maybe, head, last } = require('rambdax');

function parse(initialInput) {
	if (initialInput.length === 2 && !head(initialInput))
		return {
			inputArguments: ['chore@small'],
			commitArguments: '',
		};
	const commitArguments =
		initialInput.includes('-n') || initialInput.includes('skip') ? '-n' : '';

	const input = commitArguments
		? initialInput.filter((x) => x !== '-n' && x !== 'skip')
		: initialInput;

	const inputArguments = maybe(
		head(input).endsWith(':') || head(input).includes('@'),
		input,
		input.length === 1
			? [`feat@${head(input)}`]
			: input.length === 2
				? [`feat@${head(input)}`, last(input)]
				: ['feat:', ...input],
	);

	return {
		inputArguments,
		commitArguments,
	};
}

async function fastDeploy(...inputArgumentsRaw) {
	const { inputArguments, commitArguments } = parse(inputArgumentsRaw);

	const commitMessage = inputArguments.join(' ').trim();
	await execCommand('git add . --all');
	await execCommand(`git commit -m ${commitArguments} "${commitMessage}"`);
	await execCommand('git push');

	console.log(`Pushed with message '${commitMessage}'`);
}

exports.fastDeploy = fastDeploy;
