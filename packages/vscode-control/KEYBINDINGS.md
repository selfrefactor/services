===
===
f4 - open copilot chat

to try:

github.copilot.tests.fixTestFailure.applyAndRerun
{
  "key": "ctrl+0",
  "command": "github.copilot.newNotebook"
}
{
  "key": "ctrl+4",
  "command": "github.copilot.chat.selectKnowledgeBase"
}
{
  "key": "ctrl+5",
  "command": "github.copilot.interactiveEditor.generate"
}

unused:
{
  "key": "ctrl+shift+6",
  "command": "github.copilot.interactiveEditor.review.apply"
}
{
  "key": "ctrl+/",
  "command": "github.copilot.acceptCursorPanelSolution",
  "when": "github.copilot.activated && github.copilot.panelVisible && activeWebviewPanelId == 'GitHub Copilot Suggestions'"
}
===

Free keybindings

ctrl+i

alt+shift+s
alt+i
alt+5...9
===
ctlr+shift+0...9
===
TEST OUT

  "key": "alt+[",
  "command": "editor.foldAll",

  "key": "alt+]",
    "command": "github.copilot.openPanelForRange"
  },

  "key": "ctrl+`",
    "command": "editor.action.inlineSuggest.showPrevious",
    "when": "inlineSuggestionVisible && !editorReadonly"
  },
===
Keybindings info

crtl+j - show bottom panel - might make alt+shift+s redundant

===
alt+shift+ up/down arrow. Copy current line up or down. It's like a super-super-fast copy paste
===

ALT+U 

switch to terminal

Alt+E

# Snippets

## Alt+1

console.log(${1:})

## Alt+2

console.log(`${CLIPBOARD}

## Alt+3

() => {${1:}}

## Alt+5

Test Snippet

## Alt+9

StringTemplate

## Alt+I

If condition

===
## Ctrl+1 

Niketa - lint current file

## Alt+w

Niketa - single Jest run

## Lint single file

Ctrl+1

# Editor

## Ctrl+.

Line action(native)

## shift+alt+g / ctrl+alt+g

toggle single/two column view

## Ctrl+Shift+9

Toggle current tab into one/two columns

> useful to use two editors when reading/working with large files

## Show hover info

Alt+A

## Search for symbols in current file

Ctrl+Shift+O
Alt+Z

# Editor related

## Toggle zen mode

Ctrl+Shift+A

## Open editor view

Alt+S

## Show `git` state

Ctrl+Shft+Z

## Close current tab

Ctrl+W

## Close other tabs

Ctrl+Q

## Show active file in explorer view

Ctrl+E

## Change active theme

Ctrl+Shift+8

## Open folder

Ctrl+Shift+2

## Toggle sidebar visibility

Ctrl+B

# Unsorted

## Push pending commit

Ctrl+Shift+6

## Stage all changes

Ctrl+Shift+7

## View extensions

Alt+Shift+M

## Start debug session

F5

## Restart debug session

Ctrl+R

## Go to type definition

Ctrl+D

## Go to declaration

Ctrl+G

## Open new terminal tab

Ctrl+Shift+T

## Close terminal tab

Ctrl+Shift+W

## Switch to debug view

Caps+D

## Pin tab

Alt+P

## Unpin tab

Alt+U

---
Free bindings

ctrl+0
Ctrl+Shift+8
Ctrl+Shift+O
---

> Deprecated

- editor.action.inspectTMScopes

- editor.toggleFold
