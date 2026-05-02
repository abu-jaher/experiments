
((w) => {
	"use strict";

	const tag = "cv-208";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["cv-pjs"];

	window[tag].initVariation = () => {

	};

	window[tag].variation = "control";
	window[tag].init();
})(window);