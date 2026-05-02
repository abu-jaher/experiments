((w) => {
	"use strict";

	const tag = "cv-12-0";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["cv-pjs"].utils;

	if (window[tag].variation) return;

	const pathClassMap = {
		'/us-en/trading/': `${tag}__trading`,
		'/us-en/trading/forex/': `${tag}__forex`,
		'/us-en/trading/spreads-margin/': `${tag}__spreads-margin`,
		'/us-en/trading/our-pricing/': `${tag}__pricing`,
		'/us-en/trading/financing-fees/': `${tag}__financing-fees`,
		'/us-en/trading/platforms/oanda-trade-web/': `${tag}__trade-web`,
		'/us-en/trading/platforms/metatrader-4/': `${tag}__mt4`,
		'/us-en/trading/platforms/mt4-premium-indicators/': `${tag}__mt4-premium`,
	};

	// Variation changes
	window[tag].initVariation = () => {
		const heroGif = `${utils.getCDN(tag)}/0f495b02f29e96b13fb8df94aaf4ddca8af3e916.gif`;

		const currentPath = window.location.pathname;

		if (pathClassMap[currentPath]) {
			document.body.classList.add(pathClassMap[currentPath]);
		}

		utils.waitUntil(".hero-banner div > picture > img", (heroImg) => {
			const imgCont = heroImg.closest("div");
			imgCont.classList.add(`${tag}__img`);
			imgCont.parentNode.classList.add(`${tag}__hero`);
			Array.from(imgCont.querySelectorAll("source")).forEach((source) => {
				source.srcset = heroGif;
			});
			heroImg.src = heroGif;
			imgCont.insertAdjacentHTML('beforeend', `
				<img class="${tag}__background" src="${utils.getCDN(tag)}/background.png">
				<span class="${tag}__subtext">Past performance is not <br>indicative of future results</span>
			`)
		}, tag);
	};

	// Set the variation name and initialise
	window[tag].variation = "variation-1";
	window[tag].init();
})(window);