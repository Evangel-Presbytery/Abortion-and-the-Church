# Runs a very basic test with the lua filters.
# 
# Tested on:
# - macOS 12.5.1 with pandoc 2.19
# - Ubuntu 20.04 LTS with pandoc 2.18

.PHONY: check
check: build/output-1.html
	diff -u expected-1.html build/output-1.html

.PHONY: clean
clean:
	rm -rf build

build/output-%.html: input-%.md ../filter_reader_mark_content.lua
	mkdir -p $(@D)
	pandoc --lua-filter ../filter_reader_mark_content.lua --to html4 --section-divs --wrap preserve -o $@ $<
