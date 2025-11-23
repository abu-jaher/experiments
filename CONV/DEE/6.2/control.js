((w) => {
	"use strict";

	const tag = "cv-6-2";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["cv-pjs"] ? window["cv-pjs"].utils : undefined;

	if (!utils) return;

	window[tag].initVariation = () => {
		// TO DO: code for variation changes
	};

	window[tag].variation = "control";
	window[tag].init();
})(window);