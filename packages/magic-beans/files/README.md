# magic-beans

VSCode extension for magic-like features

[VSCode marketplace link](https://marketplace.visualstudio.com/items?itemName=selfrefactor.magic-beans)

> Important

Commands such as 'format json` and 'create spec file' require the extension to be started. One way to do so is from command panel, but more convinient way is to press 'copy trimmed' or 'order props' shortkeys.

> TODO

Replace `klaw-sync` with `run-fn` related dep

## Copy trimmed

> Press `alt+c` to copy multiple or single lines trimmed from both ends

## Open random file mode

It will show number of filtered files and each click on the message will open a random file.

## Format Json

Open command search bar and search for `Format JSON`

## Create spec file

> Press `ctrl+shift+x` or run `Magic beans create spec` command

It will create `.spec` file importing the current file

For example, the command is started while file `foo.js` is on focus.

Then file `foo.spec.js` is created importing the first exported function from `foo.js`

## Order props

> Press `f8` to order lines, including when the user selects an object.

### From single to multi lines

> All of the following are transformed to alphabetical ordered lines

#### One line imports

`import {z,d,g,r} from 'foo'`

to

```
`import {
  d,
  g,
  r,
  z,
} from 'foo'`
```

#### One line require

`const {z,d,g,r}  = require('foo')`

#### One line function inputs

`function foo({z,d,g,r}){`

### Magic import for any library

Let's imagine that you are in the middle of the file and you are unsure whether you have imported method `foo`. Then by typing `#.foo`, I am confident that this method will be imported, if it is not imported already. The same thing applies if I have specified library such as `#.foo.library`

So, as soon as I write `const c = #.map.rambda` and save, I will receive

```
import { map } from 'rambda'
...
...
const c = map`
```

#### Start magic imports

Either press `alt+m` or run `Magic Beans start` command

#### With existing multiline import

From

```
import {
  map,
  filter,
} from 'rambda'
...
...
const c = #.omit.rambda(a,b)`
```

to

```
import {
  map,
  filter,
  omit,
} from 'rambda'
...
...
const c = omit(a,b)`
```

#### When method is already imported

If the method is already imported, it will just strip `#.`.

From

```
import {
  map,
  filter,
} from 'rambda'
...
...
const c = #.filter.rambda(a,b)`
```

to

```
import {
  map,
  filter,
} from 'rambda'
...
...
const c = filter(a,b)`
```

#### Magic import with default library

As soon as I write `const c = #.map(a,b)` and save, I will receive

```
import { map } from 'lodash'
...
...
const c = map(a,b)`
```

Default library is `lodash` but this is changeable.

If you want `rambda` as your target library, then add to your VSCode settings:

```
"magicBeans.IMPORT_TARGET": "rambda"
```
