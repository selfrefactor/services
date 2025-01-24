# playwright-fn
sudo pacman -Syu
sudo pacman -S icu woff2 harfbuzz libwebp enchant hyphen libffi
sudo pacman -S icu harfbuzz libwebp enchant hyphen libffi
yay -S woff2

still warning but it will work

Package to easier initialization of `Playwright`.

## Install

`yarn add playwright-fn`

## TODO

- playwrightRun should allow consumer to decide if it should close the page or reuse previous page

## Issues

### Playwright upgrades

Remove `node_modules` folder

### Webkit

It doesn't work on Manjaro

### Mobile emulation

- Without correct wait condition, the test won't finish and may even not work(github.com is such example)

- It doesn't work on Firefox
