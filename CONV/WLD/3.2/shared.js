((w) => {
	"use strict";

	const tag = "cv-3-2";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["cv-pjs"];

	window[tag] = window[tag] || {
		init: () => {
			try {
				utils.waitUntil("body", (elDocBody) => {
					elDocBody.classList.add(tag);
				});

				window[tag].initVariation();

				window[tag].initTracking();
				utils.initHotjar(tag);

				utils.log(`${window[tag].variation} is running`, tag);
			} catch (err) {
				utils.log(err, tag);
			}
		},

		initTracking: () => {},
	};
})(window);