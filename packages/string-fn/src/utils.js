import { compose, join, mapIndexed } from 'rambdax';
import { words } from './words';
import { wordsX } from './wordsX';

export const capitalize = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();

export const transformFirst =
	({ transformFirst, transformTail }) =>
	(str) => {
		if (str.length >= 2) return transformFirst(str[0]) + transformTail(str.slice(1));
		return transformFirst(str[0]);
	};

export const createMethod = (transformFn, separator) =>
	compose(join(separator), mapIndexed(transformFn), words);

export const createMethodWithAdditionalSupport =
	(transformFn, separator) => (str, extraLatin) =>
		compose(
			join(separator),
			mapIndexed(transformFn),
			extraLatin ? wordsX : words,
		)(str);
