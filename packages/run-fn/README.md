# Run-fn
run-fn@3.37.2 /home/we/repos/services/packages/run-fn
├─┬ commit-fn@2.7.0
│ └─┬ helpers-fn@1.6.0
│   └─┬ benny@3.6.15
│     └── json2csv@5.0.7 deduped
├─┬ dep-fn@2.2.2
│ └─┬ helpers-fn@1.6.0
│   └─┬ benny@3.6.15
│     └── json2csv@5.0.7 deduped
└─┬ helpers-fn@1.8.1
  └─┬ benny@3.7.1
    └── json2csv@5.0.7
    
Collections of useful CLI functions

## Install

`npm i -g run-fn`

After installation, a binary `run` becomes available for CLI use.

## Commands

### bump

> `run bump minor` would trigger `npm publish minor&&npm publish&&git push`
> `run bump` would trigger `npm publish patch&&npm publish&&git push`

### d/de

> run de
> run d message of commit

It adds all changed files, makes a commit and finally runs `git push`

### dep/depx

It updateds all dependencies. `depx` means that update is confirmed by the user.

### read

> run read [foo]

It runs git clone command and remove `.git` folder
If `foo` is passed the repo will be placed in `foo` folder.

Also if file path contains `to-read` then it will make a commit afterwards.

### Diary

it adds a new entry to the diary

use aliases to link cyrillic letter to run command

following envs are expected:

- `DIARY_PATH` - path to the diary file
