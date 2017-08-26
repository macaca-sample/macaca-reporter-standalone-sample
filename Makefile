git_version = $$(git branch 2>/dev/null | sed -e '/^[^*]/d'-e's/* \(.*\)/\1/')
npm_bin= `npm bin`

all: test
install:
	@npm install
travis: install
	uname -a
	node index.js
jshint:
	@${npm_bin}/jshint .
.PHONY: test
