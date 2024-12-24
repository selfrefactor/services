import { camelCase } from './camelCase';
import { constantCase } from './constantCase';
import { dotCase } from './dotCase';
import { kebabCase } from './kebabCase';
import { pascalCase } from './pascalCase';
import { snakeCase } from './snakeCase';
import { titleCase } from './titleCase';

function checkCase(transformFn) {
	return (input) => transformFn(input) === input;
}

export const isTitleCase = checkCase(titleCase);
export const isKebabCase = checkCase(kebabCase);
export const isCamelCase = checkCase(camelCase);
export const isConstantCase = checkCase(constantCase);
export const isDotCase = checkCase(dotCase);
export const isSnakeCase = checkCase(snakeCase);
export const isPascalCase = checkCase(pascalCase);
