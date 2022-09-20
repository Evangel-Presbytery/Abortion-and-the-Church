This directory contains tools to help debug Readder mode issues. The scripts
here use the Mozilla version of the Readability javascript library to
approximate how Reader mode works.

There are two scripts:
- `reader-debug.js` prints the debug information from the Readability tool
- `reader-compare.js` does a basic, flawed comparison between the original and
  Reader mode versions of a page and prints an error if they are different.


Before use, node must be installed, then run `npm install` and run the tool of
choice with an HTML file afteword. For example:
node ./reader-compare.js some-file.html
