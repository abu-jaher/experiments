((w) => {
	"use strict";

	const tag = "cv-12-0";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["cv-pjs"].utils;

	if (window[tag].variation) return;

	// Variation changes
	window[tag].initVariation = () => {};

	// Set the variation name and initialise
	window[tag].variation = "control";
	window[tag].init();
})(window);