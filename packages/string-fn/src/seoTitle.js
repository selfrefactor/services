import { capitalize, createMethodWithAdditionalSupport } from './utils';

export const seoTitle = createMethodWithAdditionalSupport(
	(x, i) => (x.length >= 3 ? capitalize(x) : x),
	' ',
);
