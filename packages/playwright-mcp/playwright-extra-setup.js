'use strict';

const { addExtra } = require('playwright-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const patchright = require('patchright-core');

const wrapChromium = (launcher) => {
	if (!launcher) return launcher;
	const extra = addExtra(launcher);
	extra.use(StealthPlugin());
	return extra;
};

patchright.chromium = wrapChromium(patchright.chromium);

const cacheEntry = require.cache[require.resolve('patchright-core')];
if (cacheEntry) {
	cacheEntry.exports = patchright;
}

module.exports = patchright;
