import { toLower } from 'rambdax';
import { createMethodWithAdditionalSupport } from './utils';

export const flatCase = createMethodWithAdditionalSupport(toLower, '');
