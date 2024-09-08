import { toLower } from 'rambdax';
import { createMethodWithAdditionalSupport } from './utils';

export const dotCase = createMethodWithAdditionalSupport(toLower, '.');

import { split } from 'rambdax';
import { PUNCTUATIONS } from './internals/constants';
import { trim } from './trim';

const addSpaceAroundPunctuation = (sentence) =>
	sentence.replace(PUNCTUATIONS, (match) => ` ${match} `);

export function splitSentence(sentence) {
	return split(' ', trim(addSpaceAroundPunctuation(sentence)));
}
