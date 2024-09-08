import { toUpper } from 'rambdax';
import { createMethodWithAdditionalSupport } from './utils';

export const constantCase = createMethodWithAdditionalSupport(toUpper, '_');
