export function getIndent(str) {
	if (str.trim() === '') return 0;
	return str.split('').findIndex((char) => char !== ' ');
}
