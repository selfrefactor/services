import { createIdFromSentence } from './createIdFromSentence';

test('happy', () => {
	const input = [
		'Er würde sie mit einem Gummiknüppel zu Tode prügeln, sie nackt an einen Pfahl binden und sie mit Pfeilen durchlöchern, gleich dem heiligen Sebastian.',
		'Das Wahrheitsministerium enthielt, so erzählte man sich, in seinem pyramidenartigen Bau dreitausend Räume und eine entsprechende Zahl unter der Erde.',
	];
	const result = input.map(createIdFromSentence);
	console.log(result);
});
