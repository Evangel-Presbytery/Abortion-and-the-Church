#!/usr/bin/env node

// This script shows the debug output of the Readability tool.
//
// This is useful for debugging why a browser's reader mode may be removing
// elements that our actually desirable in the output.

var { Readability } = require("@mozilla/readability");
var { JSDOM } = require("jsdom");
var { readFileSync } = require("fs");

process.argv.slice(2).forEach((path) => {
  const data = readFileSync(path, "utf8");
  var doc = new JSDOM(data, {
    url: "https://www.example.com/the-page-i-got-the-source-from",
  });

  let reader = new Readability(doc.window.document, { debug: true });
  reader.parse();
});
