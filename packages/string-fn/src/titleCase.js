import { pascalCaseTransform } from './pascalCase';
import { createMethodWithAdditionalSupport } from './utils';

export const titleCase = createMethodWithAdditionalSupport(pascalCaseTransform, ' ');
