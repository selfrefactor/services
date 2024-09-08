import { trainCase } from './trainCase';
// import { trainCase as trainCaseReferenceLib } from 'case-anything'

const tests = [
	{ input: 'hello world', expected: 'Hello-World' },
	{ input: 'hW', expected: 'H-W' },
	{ input: 'h w', expected: 'H-W' },
	{ input: 'fooBar', expected: 'Foo-Bar' },
];

describe('trainCase', () => {
	tests.forEach(({ input, expected }) => {
		test(`${input} => ${expected}`, () => {
			expect(trainCase(input)).toEqual(expected);
			// expect(trainCaseReferenceLib(input)).toEqual(expected)
		});
	});
});
