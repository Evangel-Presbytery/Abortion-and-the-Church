# Runs a very basic test with the lua filters.
# 
# Tested on:
# - macOS 12.5.1 with pandoc 2.19
# - Ubuntu 20.04 LTS with pandoc 2.18

.PHONY: check
check:
	$(MAKE) -C filter_reader_mark_content_tests check
	$(MAKE) -C filter_reader_wrap_section_intro_tests check

.PHONY: clean
clean:
	$(MAKE) -C filter_reader_mark_content_tests clean
	$(MAKE) -C filter_reader_wrap_section_intro_tests clean
