export function splitWhen(text, predicate) {
	const result = [];
	let current = '';
	for (let i = 0; i < text.length; i++) {
		current += text[i];
		if (predicate(text[i])) {
			result.push(current);
			current = '';
		}
	}
	return result;
}
