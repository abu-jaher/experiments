((w) => {
	"use strict";

	const tag = "cv-4-1";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["cv-pjs"];

	if (window[tag].variation) return;

	window[tag].initVariation = () => {
		addStyles();
	};

	const addStyles = () => {
		utils.addStyles(
			tag,
            `
.${tag} .c-card__item .c-TP,			
.${tag} [data-tour-search-container-bottom] .c-TP{
    display: none !important;
}
            `
		);
	};

	window[tag].variation = "variation-1";
	window[tag].init();
})(window);