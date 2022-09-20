#!/usr/bin/env node

// This script does a basic, imperfect compare of Readability output with the
// actual content of one of the HTML book sections. This provides a basic
// check of whether reader output will match the actual content of the book.
//
// Pre-requisites: Building the HTML version of the book.
//
// Caveats:
// - This does not work on all simple HTML pages. Mainly because...
// - The method of grabbing expected output is very simplistic.
// - The method of comparision is very simplistic.
//
// Given the above caveats, failures should be manually inspected. This script
// is still useful for filtering out the large number of pages that do NOT
// need further inspection.

var { Readability } = require("@mozilla/readability");
var { JSDOM } = require("jsdom");
var { readFileSync } = require("fs");

function getElementText(element, options) {
  options = options || {};
  return [...element.children]
    .filter(
      (e) =>
        e.tagName != "SCRIPT" &&
        (!options.remove_headers || (e.tagName != "H1" && e.tagName != "H2"))
    )
    .map((e) => e.textContent || "")
    .join("");
}

function prepareTextForCompare(text) {
  return text.replace(/\s/g, "");
}

process.argv.slice(2).forEach((path) => {
  const data = readFileSync(path, "utf8");
  var doc = new JSDOM(data, {
    url: "https://www.example.com/the-page-i-got-the-source-from",
  });

  // Get expected text: grab it with and without headers as some simpler
  // sections do not have their headers removed.
  let section = doc.window.document
    .getElementById("section-")
    .getElementsByTagName("div")[0];
  let expected_with_headers = prepareTextForCompare(getElementText(section));
  let expected_without_headers = prepareTextForCompare(
    getElementText(section, { remove_headers: true })
  );

  let reader = new Readability(doc.window.document);
  let article = reader.parse();

  let actual = prepareTextForCompare(article.textContent);

  if (expected_without_headers != actual && expected_with_headers != actual) {
    console.error("reader fails for " + path);
  }
});
