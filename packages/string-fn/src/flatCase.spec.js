import { flatCase } from './flatCase';

describe('flatCase function', () => {
	test('happy', () => {
		expect(flatCase("foo-barBaz")).toEqual('foobarbaz');
	});
});