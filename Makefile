install: 
	npm ci
gendiff:
	node bin/brain-games.js
publish:
	npm publish --dry-run
