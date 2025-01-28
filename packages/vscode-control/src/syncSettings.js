const { copySync, writeJsonSync } = require('fs-extra');
const { defaultTo, execSafe } = require('helpers-fn');
const { resolve } = require('node:path');
const { toDecimal, sortObject } = require('rambdax');
const IS_MANJARO = process.env.IS_MANJARO === 'ON';

const settings = require('../.vscode/settings-source');
const {
	JS_SNIPPETS,
	JSX_SNIPPETS,
	KEYBINDING,
	SETTINGS,
	TS_SNIPPETS,
	TSX_SNIPPETS,
	editorExists,
} = require('./constants.js');

const VSCODE_INSIDERS = process.env.BETA === 'ON';
const FOLDING_IMPORTS = VSCODE_INSIDERS;

const WRITE_TO_OUTPUT = true;

const FONT_SIZE = 16;
const SUGGEST_LINE_HEIGHT = 15;
const SUGGEST_FONT_SIZE = 14;
const FILE_ICON_THEME = 'charmed-icons';

const MODES = {
	big: 1.2,
	normal: 1,
	small: 0.9,
};

const MODE_KEY = defaultTo('MODE', 'normal', 'default');
const MODE = MODES[MODE_KEY];

const KEYBINDING_SOURCE = resolve(__dirname, '../.vscode/keybindings.json');
const SNIPPETS_SOURCE = resolve(__dirname, '../.vscode/snippets.json');
//  Fira Code 'JetBrains Mono'
const FONT = 'Geist Mono';

void (async function sync() {
	if (!editorExists) return console.log('editor not found');
	await execSafe({
		command: 'node visualize-keybindings.js',
		cwd: resolve(__dirname, '..'),
	});
	syncFiles(KEYBINDING_SOURCE, KEYBINDING);
	syncSnippets();
	await syncSettings();
})();

// goto | peek
const GOTO_LOCATION = 'goto';

/**
 * Keep latest changes with comments of change
 
  "workbench.tree.indent": 12,
  "workbench.tree.renderIndentGuides": "none",
	 "debug.toolBarLocation": "docked",
	   "explorer.compactFolders": false,
  "explorer.decorations.badges": false,
 */
function testNewSettings() {
	return {
		'search.searchEditor.doubleClickBehaviour': 'goToLocation',
		'search.smartCase': true,
		'search.sortOrder': 'fileNames',

		'search.useReplacePreview': false,
		'search.collapseResults': 'alwaysExpand', // alwaysExpand | alwaysCollapse
		'search.searchEditor.defaultNumberOfContextLines': 4,
		'search.seedOnFocus': true,
		'search.seedWithNearestWord': false,
		'search.showLineNumbers': true,
		'search.followSymlinks': true,
		'search.quickOpen.includeHistory': true,

		'search.useGlobalIgnoreFiles': true,
		'search.useParentIgnoreFiles': true,
		'search.decorations.badges': false,
		'search.quickAccess.preserveInput': false,
		'search.quickOpen.includeSymbols': false,
		'search.searchEditor.focusResultsOnSearch': true,
		'search.searchEditor.reusePriorSearchConfiguration': true,
		'terminal.integrated.gpuAcceleration': 'on',
		'editor.quickSuggestions': {
			comments: 'off',
			other: 'off',
			// because of tailwind this needs to be on
			strings: 'off',
		},
		'magicBeans.ALLOW_CHANGE_COLOR_THEME': IS_MANJARO,
		'editor.stackFrameHighlightBackground': '#ff0000',
		'window.autoDetectColorScheme': false,
		'workbench.editor.showTabs': 'multiple',
		'workbench.editor.tabActionCloseVisibility': true,
		'editor.codeLens': true,
		'editor.codeLensFontSize': 0,
		'editor.autoClosingDelete': 'always',
		'workbench.activityBar.location': 'top',
		'workbench.layoutControl.enabled': false,
		'window.doubleClickIconToClose': true,
		'workbench.editor.decorations.colors': false,
		'editor.colorDecoratorsLimit': 10,
		'editor.colorDecorators': true,
		'editor.dragAndDrop': false,
		'editor.definitionLinkOpensInPeek': false,
		'editor.folding': true,
		'editor.foldingHighlight': true,
		'window.menuBarVisibility': 'compact',
		// EXPERIMENTAL
		'debug.javascript.codelens.npmScripts': 'never',
		'editor.copyWithSyntaxHighlighting': false,
		'editor.detectIndentation': false,
		'editor.find.autoFindInSelection': 'multiline',
		'editor.insertSpaces': false,
		'editor.lightbulb.enabled': 'off',
		'editor.links': false,
		'editor.matchBrackets': 'always',
		'editor.occurrencesHighlight': 'on',
		'editor.renderLineHighlight': 'gutter',
		'editor.renderWhitespace': 'none',
		'editor.roundedSelection': false,
		'editor.suggest.localityBonus': true,
		'explorer.compactFolders': false,
		'explorer.sortOrder': 'type',
		'npm.scriptHover': false,
		// 'outline.collapseItems': 'alwaysExpand', // alwaysCollapse | alwaysExpand | siblings | none
		'security.workspace.trust.enabled': false,
		'workbench.editor.empty.hint': 'hidden',
		'workbench.layoutControl.type': 'menu',
		'workbench.panel.opensMaximized': 'never',
		'workbench.tips.enabled': false,
		'workbench.tree.indent': 16,
		// STABLE
		'editor.foldingImportsByDefault': FOLDING_IMPORTS,
		'editor.linkedEditing': true,
		'editor.pasteAs.showPasteSelector': 'never',
		'editor.suggest.snippetsPreventQuickSuggestions': false,
		'window.density.editorTabHeight': 'compact',
		'workbench.editor.tabSizing': 'fit',
		'workbench.editor.wrapTabs': true,
		// to fix not working word wrap
		'chat.editor.wordWrap': 'on',
		'editor.defaultFormatter': 'esbenp.prettier-vscode',
		'javascript.preferences.importModuleSpecifier': 'relative',
		'javascript.suggest.autoImports': true,
		// to test prefered local imports
		'javascript.suggest.includeAutomaticOptionalChainCompletions': true,
		'task.problemMatchers.neverPrompt': { shell: true },
		'typescript.preferences.importModuleSpecifier': 'relative',
		'typescript.suggest.autoImports': true,
		'typescript.suggest.includeAutomaticOptionalChainCompletions': true,
		'typescript.tsserver.experimental.enableProjectDiagnostics': true, // to test
	};
}

function getEditor() {
	return {
		// by default all were `peek`
		'editor.gotoLocation.multipleDeclarations': GOTO_LOCATION,
		'editor.gotoLocation.multipleDefinitions': GOTO_LOCATION,
		'editor.gotoLocation.multipleImplementations': GOTO_LOCATION,
		'editor.gotoLocation.multipleReferences': GOTO_LOCATION,
		'editor.gotoLocation.multipleTypeDefinitions': GOTO_LOCATION,
		'editor.suggest.showStatusBar': false,
		// MARKER
		'editor.cursorSmoothCaretAnimation': 'on',
		'editor.cursorStyle': 'line-thin', // line-thin | line | block | underline | underline-thin
		'editor.guides.bracketPairs': 'active',
		'editor.guides.bracketPairsHorizontal': false,
		'editor.guides.highlightActiveBracketPair': false,
		'editor.guides.highlightActiveIndentation': false,
		'editor.guides.indentation': false,
		'editor.hover.delay': 700,
		'editor.hover.enabled': true,
		'editor.hover.sticky': true,
		'editor.lineNumbers': 'interval',
		'editor.minimap.enabled': false,
		'editor.mouseWheelZoom': true,
		'editor.multiCursorModifier': 'ctrlCmd',
		'editor.scrollbar.verticalScrollbarSize': 15,
		'editor.scrollBeyondLastLine': false,
		'editor.semanticHighlighting.enabled': true,
		'editor.semanticTokenColorCustomizations': { enabled: true },
		'editor.smoothScrolling': true,
		'editor.stickyScroll.defaultModel': 'indentationModel',
		'editor.stickyScroll.enabled': true,
		'editor.suggest.showWords': false,
		'editor.tabSize': 2,
		'editor.wordWrap': 'on',
	};
}

function getWorkbench() {
	return {
		'workbench.activityBar.visible': true,
		'workbench.editor.languageDetectionHints': {
			notebookEditors: false,
			untitledEditors: false,
		},
		'workbench.editor.pinnedTabSizing': 'normal', // shrink | normal
		'workbench.editor.pinnedTabsOnSeparateRow': true,
		'workbench.editor.untitled.hint': 'hidden',
		'workbench.editor.untitled.labelFormat': 'name',
		'workbench.iconTheme': FILE_ICON_THEME,
		'workbench.list.smoothScrolling': true,
		'workbench.sideBar.location': 'right',
		'workbench.startupEditor': 'none',
	};
}

function getExplorer() {
	return {
		'explorer.confirmDelete': false,
		'explorer.confirmDragAndDrop': false,
		'explorer.incrementalNaming': 'smart',
		'explorer.openEditors.sortOrder': 'alphabetical',
	};
}

function getGit() {
	return {
		'git.allowNoVerifyCommit': true,
		'git.confirmEmptyCommits': true,
		'git.confirmForcePush': true,
		'git.confirmNoVerifyCommit': true,
		'git.confirmSync': false,
		'git.fetchOnPull': true,
		'git.promptToSaveFilesBeforeCommit': 'never',
	};
}

function getAdditionalSettings() {
	return {
		'breadcrumbs.enabled': false,
		'debug.inlineValues': 'off',
		'diffEditor.diffAlgorithm': 'advanced',
		'editor.scrollbar.vertical': 'visible',
		'files.enableTrash': false,
		'files.exclude': {
			'.cache': true,
			'**/.awcache': true,
			'**/.cache-loader': true,
			'**/.DS_Store': false,
			'**/.git': true,
			'**/.hg': false,
			'**/.idea': true,
			'**/.svn': false,
			'**/coverage': true,
			'**/coverage-ts': true,
			'**/CVS': false,
			'**/node_modules': true,
			'**/yarn-error.log': true,
			dev_dist: true,
			dist: false,
			docs: false,
			'yarn.lock': true,
		},
		'files.hotExit': 'off',
		'git.autofetch': true,
		'git.openRepositoryInParentFolders': 'always',
		'github.copilot.enable': {
			'*': true,
			markdown: true,
			plaintext: true,
			yaml: true,
		},
		'javascript.inlayHints.enumMemberValues.enabled': false,
		'javascript.inlayHints.functionLikeReturnTypes.enabled': false,
		'javascript.inlayHints.parameterTypes.enabled': false,
		'javascript.inlayHints.propertyDeclarationTypes.enabled': false,
		'javascript.inlayHints.variableTypes.enabled': false,
		'javascript.updateImportsOnFileMove.enabled': 'always',
		'js/ts.implicitProjectConfig.checkJs': true,
		'json.format.enable': false,
		'json.maxItemsComputed': 1000,
		'npm.autoDetect': 'off',
		'npm.fetchOnlinePackageInfo': false,
		'npm.packageManager': 'yarn',
		'scm.defaultViewMode': 'tree',
		// test tasks
		'task.autoDetect': 'off',
		'task.quickOpen.detail': true,
		'telemetry.telemetryLevel': 'off',
		'typescript.inlayHints.enumMemberValues.enabled': false,
		'typescript.inlayHints.functionLikeReturnTypes.enabled': false,
		'typescript.inlayHints.parameterTypes.enabled': false,
		'typescript.inlayHints.variableTypes.enabled': false,
		'typescript.updateImportsOnFileMove.enabled': 'always',
		'update.mode': 'none',
		// click to go to recent files
		'window.commandCenter': false,
		'window.title': '${dirty}${activeEditorMedium}',
		'window.titleBarStyle': 'custom',
		'zenMode.hideTabs': false,
		'zenMode.restore': false,
	};
}

function syncFiles(source, destination) {
	copySync(source, destination);
}

function getCalculatedOptions() {
	const fontSize = toDecimal(FONT_SIZE * MODE);
	const windowZoom = toDecimal(MODE * 1.5);
	const suggestFontSize = Math.round(toDecimal(SUGGEST_FONT_SIZE * MODE, 2));
	const suggestLineHeight = Math.round(toDecimal(SUGGEST_LINE_HEIGHT * MODE));
	const terminalFontSize = Math.round(toDecimal(FONT_SIZE * (MODE * 0.65)));
	const fontSettings = {
		'debug.console.fontFamily': FONT,
		'editor.fontFamily': FONT,
		'editor.fontLigatures': true,
		'terminal.integrated.fontFamily': FONT,
	};

	return {
		...fontSettings,
		'editor.fontSize': fontSize,
		'editor.lineHeight': 0,
		'editor.suggestFontSize': suggestFontSize,
		'editor.suggestLineHeight': suggestLineHeight,
		'terminal.integrated.fontSize': terminalFontSize,
		'window.zoomLevel': windowZoom,
	};
}

function syncFn(newOptions) {
	if (WRITE_TO_OUTPUT) {
		writeJsonSync(SETTINGS, newOptions, { spaces: 2 });
	} else {
		const settingsLocation = VSCODE_INSIDERS ? 'insiders' : 'stable';
		const output = resolve(__dirname, `../settings-${settingsLocation}.json`);
		writeJsonSync(output, newOptions, { spaces: 2 });
	}
}

function sortFn(aKey, bKey) {
	return aKey.localeCompare(bKey);
}
function mergeWithReport(inputs) {
	const report = [];
	const result = {};
	inputs.forEach((input) => {
		Object.keys(input).forEach((key) => {
			if (result[key] !== undefined) {
				report.push({ key, value: input[key] });
			}
			result[key] = input[key];
		});
	});

	return { result, report };
}
async function syncSettings() {
	const { result: newOptions, report } = mergeWithReport([
		settings,
		getEditor(),
		getExplorer(),
		getGit(),
		getWorkbench(),
		getAdditionalSettings(),
		testNewSettings(),
		getCalculatedOptions(),
		{
			'workbench.tree.renderIndentGuides': 'none',
			'terminal.integrated.copyOnSelection': true,
			'workbench.tree.enableStickyScroll': true,
			'workbench.tree.stickyScrollMaxItemCount': 8,
			'window.zoomPerWindow': true,
			'window.customTitleBarVisibility': 'windowed',
			'terminal.integrated.mouseWheelZoom': true,
			'debug.terminal.clearBeforeReusing': true, // to test because of ubuntu issue
			'editor.wordBasedSuggestions': false,
			'magicBeans.IS_VSCODE_INSIDERS': VSCODE_INSIDERS,
			// 'workbench.editor.enablePreview': false,
			'workbench.editor.enablePreview': VSCODE_INSIDERS,
		},
	]);
	const sorted = sortObject(sortFn, newOptions);

	if (report.length > 0) console.log(report, 'merge report');

	syncFn(sorted);
}

function syncSnippets() {
	syncFiles(SNIPPETS_SOURCE, JS_SNIPPETS);
	syncFiles(SNIPPETS_SOURCE, JSX_SNIPPETS);
	syncFiles(SNIPPETS_SOURCE, TS_SNIPPETS);
	syncFiles(SNIPPETS_SOURCE, TSX_SNIPPETS);
}

function copilotSettings() {
	return {
		/**
		 * Semantic search results (Preview)

Setting: github.copilot.chat.search.semanticTextResults

You can perform an exact search across your files with the Search view. It also now uses Copilot to give search results that are semantically relevant.
		 */
		'github.copilot.chat.reviewSelection.instructions': [
			{
				text: 'Prevent multiple empty lines in the code.',
			},
			{
				text: 'Improve titles of test cases if possible.',
			},
		],
		'github.copilot.chat.edits.enabled': true,
		'github.copilot.chat.followUps': 'always',
		'github.copilot.chat.experimental.inlineChatHint.enabled': false,
		'github.copilot.chat.experimental.codeFeedback.enabled': true,
		'github.copilot.chat.experimental.codeFeedback.instructions': [
			{
				text: 'try to add comment to complext code pieces | when possible, include comment how data changes on specific code line that contains important logic or hard to understand logic',
			},
		],
		'github.copilot.chat.experimental.codeGeneration.instructions': [
			{
				text: 'avoid introducing new interfaces when refactoring is requested in Typescript code | when refactoring is requested in Typescript code, make sure that refactored code is valid TS',
			},
		],
		'github.copilot.chat.experimental.testGeneration.instructions': [
			{
				text: 'Test suite is Jest or Vitest|Happy path is the first test and its name is happy|Error test cases are last in suite|minimum two top level describe blocks can exists and no nested describe blocks|always prefer `.spec.` instead of `.test` as file name suffix',
			},
		],
		'github.copilot.chat.experimental.generateTests.codeLens': true,
		'github.copilot.chat.experimental.inlineChatCompletionTrigger.enabled': false,
		'github.copilot.chat.experimental.startDebugging.enabled': true,
		'github.copilot.chat.experimental.temporalContext.enabled': false,
		'github.copilot.chat.scopeSelection': true,
		'github.copilot.chat.welcomeMessage': 'never',
		'github.copilot.chat.search.semanticTextResults': true,
	};
}
