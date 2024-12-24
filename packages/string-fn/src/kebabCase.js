import { toLower } from 'rambdax';
import { createMethodWithAdditionalSupport } from './utils';

export const kebabCase = createMethodWithAdditionalSupport(toLower, '-');
