import { toLower } from 'rambdax';
import { createMethodWithAdditionalSupport } from './utils';

export const snakeCase = createMethodWithAdditionalSupport(toLower, '_');
