#!/usr/bin/env bash

# nice trick to run 2 programs simultaneously
# see http://stackoverflow.com/a/5553774
cd release && python -m SimpleHTTPServer &
npm run-script watch &&
fg
