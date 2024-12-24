import { seoTitle } from './seoTitle';

test('', () => {
	const result = seoTitle('In my time |,of dying');
	const expectedResult = 'In my Time of Dying';

	expect(result).toEqual(expectedResult);
});
