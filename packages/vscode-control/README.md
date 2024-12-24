# Vscode-control


https://code.visualstudio.com/updates/v1_95#_mermaid-diagram-generation-with-copilot
https://code.visualstudio.com/updates/v1_95#_multiple-github-accounts

		"2Guys1Account.quackrack-cursor",
		"mattpocock.ts-error-translator",
		"team-sapling.sapling",
    "mightbesimon.emoji-icons",
		"yoavbls.pretty-ts-errors",
    "mrmlnc.vscode-scss",

===
Improved test generation
With GitHub Copilot, you can generate tests for your code, either by using the Generate Tests using Copilot action in the editor content menu, or by using the /tests slash command in inline Chat.
===
Code generation instructions (Experimental)
Setting: github.copilot.chat.experimental.codeGeneration.instructions

Copilot can help you generate code, for example as part of a refactoring, generating unit tests, or implementing a feature. And you might have specific libraries you want to use, or a particular coding style you want to follow for the code that Copilot generates.

The experimental setting github.copilot.chat.experimental.codeGeneration.instructions lets you define a set of instructions that are added to every Copilot request that generates code.

The instructions can be defined in the User or Workspace settings but can also be imported from a file.

The following code snippet shows how to define a set of instructions from both settings and an external file:
===
sort keybindings.json

	"search.searchEditor.defaultNumberOfContextLines": 0

===
    // 'editor.tabFocusMode': true, // this is not needed as it is accessability feature
    // "editor.colorDecorators": false,
    // 'editor.colorDecoratorsActivatedOn': 'hover',
    // 'editor.colorDecoratorsActivatedOn': 'click',
    // 'editor.emptySelectionClipboard': false,
    // 'editor.selectionHighlight': false,
		    // 'chat.experimental.quickQuestion.enable': true,
    // 'editor.hover.height': 1200, // disabled
    // 'editor.guides.highlightActiveBracketPair': true,
    // 'debug.javascript.usePreview': true,
    // 'gitlab.showProjectMergeRequests': false,
    // 'window.menuBarVisibility': 'toggle',
      // 'editor.multiDocumentOccurrencesHighlight': true,

===

## Knowledge
===
https://code.visualstudio.com/updates/v1_90#_automatic-rename-suggestions
https://code.visualstudio.com/updates/v1_90#_attach-context-to-chat
===
There are similarly new keybindings for running with coverage, such as Ctrl+; Ctrl+Shift+A to run all tests with coverage, and Ctrl+; Ctrl+Shift+L to run your last set of tests with coverage.

Coverage information is shown as an overlay on line numbers by default, but you can Toggle Inline Coverage to see complete detailed information for your source files:
===
ctrl+j - toggle activity
ctrl alt b - show secondary activity
===
Holding Alt while clicking on a test decoration, now runs that test in debug mode, when available.

There are now context menu actions in the Explorer view, which can be used to run all tests declared in a file or folder.
===
===
no longer is possible to copy deleted lines in git diff. you have to use right click and explicitly select copy deleted lines.

## Deleted

unpin/pin doesn't work correctly
===

    // 'editor.codeActionsOnSave' : {
    //   'source.fixAll'          : false,
    //   'source.organizeImports' : false,
    // },
    // 'editor.wordWrapColumn'                                       : 30,
===

    "miguelsolorio.symbols",
    "team-sapling.sapling",
    "GitLab.gitlab-workflow",
    "nexmoe.monitor-pro",

## Alternative backgrounds

`x=anything yarn ond`

## Tab wrap

    // 'editor.wrappingStrategy'                                     : 'advanced',
    // in order to test the new settings
    // 'workbench.editor.wrapTabs'                                   : true,

## Copilot

https://code.visualstudio.com/updates/v1_78#_chat-editors

## Visualize keybindings

alt+5

## Suggestions

https://code.visualstudio.com/docs/editor/intellisense

## Default settings

Preferences: Open Default Settings (JSON)


## Font

```
// const DEFAULT_FONT = 'Hack'
// const DEFAULT_FONT = 'Cascadia Mono'
// const DEFAULT_FONT = 'Ubuntu Mono'
// no ligatures above

// const DEFAULT_FONT = 'Fira Mono'
const DEFAULT_FONT = 'JetBrains Mono'

// https://rubjo.github.io/victor-mono/
// const DEFAULT_FONT = 'Monoid'

// https://github.com/be5invis/Iosevka
// const DEFAULT_FONT = 'Iosevka SS18'
```

---

issue with codegpt.apiKey

## Runtime

```
	"disable-hardware-acceleration": false,
"enable-crash-reporter": false,
```


## Tips

### ctrl+caps => mark all ocurances

### F2 rename constant when constant is selected

### Mouse back/forward button works inside VSCode

### div.foo + tab

<div className="foo"></div>

## Intellisense

TabNine proves to be best one. One example:

```
const bar = fooBarBaz(1) 
```

then `fooBarBaz` is picked up even if it is not a valid function(not declared yet). VSCode Intelisense doesn't do that.

## Firefox

Shift+Spacebar 	Move up the scrollbar

Ctrl+L 	Move cursor to address box

Ctrl+I 	Display the Page Info window about the web page currently being viewed.

## Notes

"editor.quickSuggestions": true is imporant

## Latest key binding

### Binding shortkeys with snippets

### Single column view - ctrl+shift+5

### Two column view - ctrl+shift+6

### Pin - pin with `Alt+P`

### Unpin - pin with `Alt+U`

### Find all references - Caps + F

## VSCode changes(from blog announcement)

Split an editor without creating a new group

Pin tabs
You can now pin tabs either from the context menu or using the new command workbench.action.pinEditor (Ctrl+K Shift+Enter).

Smooth scrolling for lists and trees
Enabling the workbench.list.smoothScrolling setting will make scrolling in lists and trees much smoother with hardware that lacks smooth scrolling (for example, discrete mouse wheel on Windows).

New JavaScript debugger
This month we continued making progress on our new JavaScript debugger. Since mid-May, it has become the default debugger on Insiders, and is included (but not enabled by default) on VS Code Stable in this release. You can start using it with your existing launch configurations by enabling the debug.javascript.usePreview setting.

New input theme colors
We also have new color theme option for inputs. You can set the foreground color for active input options via inputOption.activeForeground. These appear in the Search view and Find widget (editor, terminal, debug console).
---

Inline diff is now editable

You can now edit inside the quick diff editor, when previewing changes in a file.
---

We introduced Focus Next Part (F6) and Focus Previous Part (Shift+F6) commands to make it easy to navigate across the workbench.

---

Collapse All list and tree command with Ctrl+LeftArrow keyboard shortcut

## Alternative fonts

```
  "editor.fontFamily": "Fantasque Sans Mono",
  "editor.fontFamily": "JetBrains Mono",
```

## On slow machines try disable GPU acceleration

Configure runtime arguments

```
"disable-hardware-acceleration": true
```

## Notes

"nikhil-patil.npm-run",


/**

  "editor.fontFamily4": "Oxygen Mono",
  "editor.fontFamily1": "PT Mono",
  "editor.fontFamily2": "Ubuntu Mono",
  "editor.fontFamily": "Operator Mono",
  "editor.fontFamily": "JetBrains Mono",

    "rwu823.open-folder",
    "rajratnamaitry.open-folder-in-new-vscode",

 */
