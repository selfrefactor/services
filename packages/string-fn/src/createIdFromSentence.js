import { filter, head, join, last, map, piped, take, toLower } from 'rambdax';
import { wordsX } from './wordsX';

const MAX_LENGTH = 35;

function replaceUmlauts(str) {
	return str
		.replace(/ä/g, 'ae')
		.replace(/ö/g, 'oe')
		.replace(/ü/g, 'ue')
		.replace(/ß/g, 'ss');
}

export function createIdFromSentence(str) {
	const removed = [];
	const initialResult = piped(
		str,
		wordsX,
		map(toLower),
		filter((x) => {
			if (x.length >= 3) {
				return true;
			}
			removed.push(x);
			return false;
		}),
		map(replaceUmlauts),
		map((x) => {
			if (removed.length < 7) {
				removed.push(x);
			}
			return head(x) + last(x);
		}),
		join(''),
	);

	if (initialResult.length >= MAX_LENGTH || removed.length === 0) {
		return initialResult.slice(0, MAX_LENGTH);
	}
	return take(MAX_LENGTH, initialResult + removed.join(''));
}
