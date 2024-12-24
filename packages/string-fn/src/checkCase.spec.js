import { isCamelCase } from './checkCase';

test('isCamelCase', () => {
	expect(isCamelCase('camelCase')).toBe(true);
	expect(isCamelCase('camel-case')).toBe(false);
});
