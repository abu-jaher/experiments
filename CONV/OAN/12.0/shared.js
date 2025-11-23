((w) => {
	"use strict";

	const tag = "cv-12-0";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["cv-pjs"].utils;

	window[tag] = window[tag] || {
		init: () => {
			try {
				utils.waitUntil("body", (elDocBody) => {
					elDocBody.classList.add(tag);
				});

				// Make the variation changes and initialise tracking
				window[tag].initVariation();
				window[tag].initTracking();

				// Initialise Hotjar
				utils.initHotjar(tag);

				utils.log(`${window[tag].variation} is running`, tag);
			} catch (err) {
				utils.log(err, tag);
			}
		},

		// Experiment-specific metrics and segments
		initTracking: () => {},
	};
})(window);