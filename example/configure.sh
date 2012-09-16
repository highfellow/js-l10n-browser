#!/bin/bash

# script to import l10n.js, requirejs, and a symlink to ../l10n-browser.js to ./lib

mkdir -p lib
cd lib
[ -f 'l10n.js' ] || wget https://github.com/highfellow/js-l10n/raw/master/l10n.js
[ -f 'require.js' ] || wget http://requirejs.org/docs/release/2.0.6/minified/require.js
[ -h 'l10n-browser.js' ] || ln -s ../../l10n-browser.js
