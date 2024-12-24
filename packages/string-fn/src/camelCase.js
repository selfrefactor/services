import { capitalize, createMethodWithAdditionalSupport } from './utils';

export const camelCaseTransform = (x, i) =>
	i === 0 ? x.toLowerCase() : capitalize(x);

export const camelCase = createMethodWithAdditionalSupport(camelCaseTransform, '');
