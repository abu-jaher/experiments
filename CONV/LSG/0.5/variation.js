((w) => {
	"use strict";

	const tag = "cv-0-5";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["conv"].utils;

	window[tag] = window[tag] || {
		init: () => {
			try {
				utils.waitUntil(() => document.body, 0).then((body) => {
					body.classList.add(tag);
					window[tag].initVariation();
				});

				console.log(`${window[tag].variation} is running`, tag);
			} catch (err) {
				console.error(err, tag);
			}
		},
	};

	if (window[tag].variation) return;

	window[tag].initVariation = () => {
		utils.waitUntil(() => document.querySelector(`[class*="area--sort"] [name="tour-card-select"]`), 0).then((element) => {
			if (element.value !== 5) {
				element.value = 5;

				const interval = setInterval(() => {
					element.dispatchEvent(new Event('change', { bubbles: true }));
				},50)

				setTimeout(() => {
					clearInterval(interval);
					document.addEventListener('change',(e)=>{
						const el = e.target;

						if(el.closest('[class*="area--sort"] [name="tour-card-select"]')){
							Kameleoon.API.Goals.processConversion(367273)
						}
					})
				}, 250)
			}
		});
	};

	window[tag].variation = "variation-1";
	window[tag].init();
})(window);