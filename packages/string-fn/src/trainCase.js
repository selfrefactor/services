import { toLower, toUpper } from 'rambdax';
import { createMethod, transformFirst } from './utils';

export const trainCase = createMethod(
	transformFirst({
		transformFirst: toUpper,
		transformTail: toLower,
	}),
	'-',
);
