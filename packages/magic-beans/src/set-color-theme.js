const { shuffle } = require('rambdax');
const { configAnt } = require('./ants/config');
const vscode = require('vscode');
const { currentTimeIsBetween } = require('./_modules/current-time-is-between');
const { IS_VSCODE_INSIDERS, THEME_CHANGE_DAYTIME } = require('./constants');

const ALLOW_CHANGE_COLOR_THEME = configAnt('ALLOW_CHANGE_COLOR_THEME');

const BASE_STABLE = '/.config/Code/User';
const BASE_BETA = '/.config/Code - Insiders/User';

let init = false;

const PREFERED_LIGHT_THEMES = [
	'FunkyDrummer',
	'SweatLeaf',
];

const ALLOWED_LIGHT_THEMES = [
	'CommunicationBreakdown',
	'DancingDays',
	'FunkyDrummer',
	'GlassOnion',
	'HelloSpaceboy',
	'KozmicBlues',
	'LedZeppelin',
	'StrangeBrew',
	'SweatLeaf',
];

const ALLOWED_DARK_THEMES = [
	'AmericanDad',
	'AquaTeenHungerForce',
	'Archer',
	'ClevelandShow',
	'Dilbert',
	'HomeMovies',
	'SouthPark',
	'TripTank',
	'UglyAmericans',
];

const [startDaytime, endDaytime] = configAnt(THEME_CHANGE_DAYTIME);

function getExpectedColorThemes() {
	return currentTimeIsBetween(startDaytime, endDaytime)
		? ALLOWED_LIGHT_THEMES
		: ALLOWED_DARK_THEMES;
}

function getExpectedColorThemesAsString() {
	return currentTimeIsBetween(startDaytime, endDaytime)
		? 'light'
		: 'dark';
}

function getRandomTheme (expectedColorThemes) {
	let colorThemeString = getExpectedColorThemesAsString();
	if(colorThemeString === 'dark' || Math.random() > 0.5) {
		return shuffle(expectedColorThemes)[0];
	}
	return shuffle(PREFERED_LIGHT_THEMES)[0];
}

function setColorTheme(context) {
	return async () => {
		if (!ALLOW_CHANGE_COLOR_THEME) {
			return;
		}

		init = true;
		const expectedColorThemes = getExpectedColorThemes();
		if (!expectedColorThemes) return;

		const SETTINGS_LOCATION = configAnt(IS_VSCODE_INSIDERS)
			? BASE_BETA
			: BASE_STABLE;
		const filePath = `${process.env.HOME}${SETTINGS_LOCATION}/settings.json`;
		const fileUri = vscode.Uri.file(filePath);
		const uint8Array = await vscode.workspace.fs.readFile(fileUri);
		const fileContent = Buffer.from(uint8Array).toString('utf-8');
		const parsed = JSON.parse(fileContent);
		const currentColorTheme = parsed['workbench.colorTheme'];
		if (expectedColorThemes.includes(currentColorTheme)) return;

		parsed['workbench.colorTheme'] = getRandomTheme(expectedColorThemes);
		const newContent = JSON.stringify(parsed, null, 2);
		await vscode.workspace.fs.writeFile(fileUri, Buffer.from(newContent));
	};
}

exports.setColorTheme = setColorTheme;
