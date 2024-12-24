import { toLower } from 'rambdax';
import { createMethodWithAdditionalSupport } from './utils';

export const dotCase = createMethodWithAdditionalSupport(toLower, '.');
