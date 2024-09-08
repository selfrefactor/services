import { head, tail } from 'rambdax';
import { createMethodWithAdditionalSupport } from './utils';

export const pascalCaseTransform = (x) =>
	head(x).toUpperCase() + tail(x).toLowerCase();

export const pascalCase = createMethodWithAdditionalSupport(pascalCaseTransform, '');
