((w) => {
	"use strict";

	const tag = "cv-1-2";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["conv"].utils;

	window[tag] = window[tag] || {
		init: () => {
			try {
				utils.waitUntil((() => document.body), 0).then((body) => {
					body.classList.add(tag);
				});

				window[tag].initVariation();

				console.log(`${window[tag].variation} is running`, tag);
			} catch (err) {
				console.log(err, tag);
			}
		},
	};

	if (window[tag].variation) return;

	const starIcon = `
	<svg width="16" height="16" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" fill="#F9B830"/>
	</svg>
	`;

	const hp_sticker = `
		<div class="${tag}__hassle-sticker">
			<div class="${tag}__hassle-container">
				<p class="${tag}__hassle-title">Our hassle-free <span>promise</span></p>
				<div class="${tag}__hassle-benefits">
					<div class="${tag}__benefits-desk">
						<p>${starIcon} No driving</p>
						<p>${starIcon} No parking</p>
						<p>${starIcon} No flying</p>
						<p>${starIcon} No lugging your luggage</p>
						<p>${starIcon} No overseas call centres ${starIcon}</p>
					</div>
					<div class="${tag}__benefits-tab">
						<div>
							<p>${starIcon} No driving</p>
							<p>${starIcon} No parking</p>
							<p>${starIcon} No flying</p>
						</div>
						<div>
							<p>No overseas call centres</p>
							<p>${starIcon} No lugging your luggage</p>
						</div>
					</div>
					<div class="${tag}__benefits-mobile">
					    <div class="tickerSlide">
							${["", ""].map(() => `
								<div class="tickerList tickerAnimate">
									<p>${starIcon} No driving</p>
									<p>${starIcon} No parking</p>
									<p>${starIcon} No flying</p>
									<p>${starIcon} No lugging your luggage</p>
									<p>${starIcon} No overseas call centres</p>
								</div>
							`).join('')}
						</div>
					</div>
				</div>
			</div>
		</div>
	`

	const pdp_plp_sticker = `
	   <div class="${tag}__hassle-sticker">
			<div class="${tag}__hassle-container">
				<p class="${tag}__hassle-title">Our hassle-free <span>promise</span></p>
				<div class="${tag}__hassle-benefits">
					<div class="${tag}__benefits-desk">
						<div>
							<p>No driving</p>
							<p><span>|</span>No parking</p>
							<p><span>|</span>No flying</p>
						</div>
						<div>
							<p>No lugging your luggage</p>
							<p>No overseas call centres</p>
						</div>
					</div>
					<div class="${tag}__benefits-mobile">
						<p>No driving<span>|</span></p>
						<p>No parking<span>|</span></p>
						<p>No flying<span>|</span></p>
						<p>No lugging your luggage<span>|</span></p>
						<p>No overseas call centres</p>
					</div>
				</div>
			</div>
	   </div>
	`

	window[tag].initVariation = () => {

		// homepage
		utils.waitUntil((() => document.querySelector('.p-home .p-home-intro-slider')), 0).then((element) => {
			element.insertAdjacentHTML('beforebegin', hp_sticker);
		});

		// plp and pdp
		utils.waitUntil((() => document.querySelector('section.l-banner')), 0).then((element) => {
			if(document.querySelector(`a[data-tour-search-tab="SelfDrive"].active`)){
				document.body.classList.add(`${tag}__self-drive`);
			}

			element.querySelector('.l-banner__row').insertAdjacentHTML('afterend',pdp_plp_sticker);
			element.insertAdjacentHTML('beforeend', pdp_plp_sticker);
		});
	};

	window[tag].variation = "variation-1";
	window[tag].init();
})(window);