# Vscode-control

## Knowledge

no longer is possible to copy deleted lines in git diff. you have to use right click and explicitly select copy deleted lines.

## Deleted

    // 'editor.codeActionsOnSave' : {
    //   'source.fixAll'          : false,
    //   'source.organizeImports' : false,
    // },
    // 'editor.wordWrapColumn'                                       : 30,
    // '[javascript]'                                   : { 'editor.formatOnSave' : true },
    // '[typescript]'                                   : { 'editor.formatOnSave' : true },
    // 'editor.formatOnSave'                            : false,

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

## Free scripts

```
		"small": "yarn small:all&&run d",
		"small:all": "yarn small:1&&yarn small:2",
		"small:1": "ZOOM_SCALE=0.93 SCALE=0.89 node syncSettings",
		"small:2": "BETA=ON ZOOM_SCALE=0.93 SCALE=0.89 node syncSettings",
    		"big": "yarn big:1&&yarn big:2",
		"big:1": "ZOOM_SCALE=1.6 SCALE=1.6 node syncSettings",
		"big:2": "BETA=ON ZOOM_SCALE=1.6 SCALE=1.6 node syncSettings"
```

/**

  "editor.fontFamily4": "Oxygen Mono",
  "editor.fontFamily1": "PT Mono",
  "editor.fontFamily2": "Ubuntu Mono",
  "editor.fontFamily": "Operator Mono",
  "editor.fontFamily": "JetBrains Mono",

    "rwu823.open-folder",
    "rajratnamaitry.open-folder-in-new-vscode",

 */
