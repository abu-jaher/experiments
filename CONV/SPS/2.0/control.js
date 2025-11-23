((w) => {
	"use strict";

	const tag = "cv-2-0";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["cv-pjs"].utils;

	if (window[tag].variation) return;

	window[tag].initVariation = () => {};

	window[tag].variation = "control";
	utils.handleActivation(tag);
})(window);