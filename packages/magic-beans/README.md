# magic-beans

VSCode extension for magic-like features

[VSCode marketplace link](https://marketplace.visualstudio.com/items?itemName=selfrefactor.magic-beans)

## Copy trimmed

> Press `alt+c` to copy multiple or single lines trimmed from both ends


## Open random file mode

```
"workbench.editor.enablePreview": true
```

It will show number of filtered files and each click on the message will open a random file.

## Usage with tests
{
  "magicBeans.RANDOM_FILE_ALLOWED_DIRECTORY": "__tests__",
  "magicBeans.RANDOM_FILE_ALLOWED": ["test.js"],
  "magicBeans.RANDOM_FILE_FORBIDDEN": [],
  "magicBeans.RANDOM_FILE_SKIP_DIRECTORIES": [],
}

## Format Json

Open command search bar and search for `Format JSON`

## Create spec file

> Press `ctrl+shift+0` or run `Magic beans create spec` command

It will create `.spec` file importing the current file

For example, the command is started while file `foo.js` is on focus.

Then file `foo.spec.js` is created importing the first exported function from `foo.js`

## Sort lines

> Press `ctrl+shift+-`
