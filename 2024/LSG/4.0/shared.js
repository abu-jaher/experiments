((w) => {
	"use strict";

	const tag = "cv-4-0";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["conv"].utils;

	window[tag] = window[tag] || {
		init: () => {
			try {
				utils.waitUntil((() => document.body), 0).then((body) => {
					body.classList.add(tag);
				});

				window[tag].initVariation();

				window[tag].initTracking();

				console.log(`${window[tag].variation} is running`, tag);
			} catch (err) {
				console.log(err, tag);
			}
		},

		initTracking: () => {},
	};
})(window);