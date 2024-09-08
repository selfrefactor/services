import { join, map, split } from 'rambdax';
import { maskWordHelper } from './internals/maskWordHelper';

export function maskWords({ words, replacer = '_', charLimit = 3 }) {
	const result = map(
		(val) => maskWordHelper(val, replacer, charLimit),
		split(' ', words),
	);

	return join(' ', result);
}
