# Runs a very basic test with the lua filters.
# 
# Tested on:
# - macOS 12.5.1 with pandoc 2.19
# - Ubuntu 20.04 LTS with pandoc 2.18

.PHONY: check
check: build/output-1.html build/output-2.html build/output-3.html
	diff -u expected-1.html build/output-1.html
	diff -u expected-2.html build/output-2.html
	diff -u expected-3.html build/output-3.html

.PHONY: clean
clean:
	rm -rf build

build/output-%.html: input-%.md ../filter_reader_wrap_section_intro.lua
	mkdir -p $(@D)
	pandoc --lua-filter ../filter_reader_wrap_section_intro.lua --to html4 --section-divs --wrap preserve -o $@ $<
