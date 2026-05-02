((w) => {
	"use strict";

	const tag = "cv-0-6";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["conv"].utils;

	window[tag] = window[tag] || {
		init: () => {
			try {
				utils.waitUntil(() => document.body, 0).then((body) => {
					body.classList.add(tag);
					window[tag].initVariation();
					window[tag].eventListener();
				});

				console.log(`${window[tag].variation} is running`, tag);
			} catch (err) {
				console.error(err, tag);
			}
		},
	};

	if (window[tag].variation) return;

	window[tag].initVariation = () => {
		utils.waitUntil(() => document.querySelector(`.cDDcard__item--departureDate span`), 0).then((element) => {
			window[tag].dropdownFn(element);

			const calendarContainer = document.getElementById('calendarContainer');
			window[tag].observer(calendarContainer);
		});
	};

	window[tag].dropdownFn = (element) => {
		if (document.querySelector(`.cDDcard__item--departureDate span`).innerText.indexOf('2025') == -1) return;

		const departureDateAll = document.querySelectorAll('.cDDcard__item--departureDate span');

		departureDateAll.forEach((element) => {
			if (element.innerText.indexOf('2026') > -1) {
				element.closest('.cDDcard').classList.add(`${tag}__hidden`);

				if (!document.querySelector(`.${tag}__more-dates`)) {
					element.closest('.cDDcard').insertAdjacentHTML('beforebegin', `
							<div class="${tag}__more-dates">
								<div>
									<span class="text">See more dates</span>
									<span class="cAccordian__icons"><svg class="svg-inline--fa fa-chevron-down" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path></svg><!-- <i class="fa-solid fa-chevron-down"></i> Font Awesome fontawesome.com --></span>
								<div>
							</div>
						`)
				}
			}
		})
	}

	window[tag].eventListener = () => {
		document.addEventListener(`click`, (e) => {
			const el = e.target

			if (el.closest(`.${tag}__more-dates > div`)) {
				if (document.querySelector(`.${tag}__visible`)) {
					// Click on ‘See more dates’ to close metric
					Kameleoon.API.Goals.processConversion(366638);
				} else {
					// Click on ‘See more dates’ to open metric
					Kameleoon.API.Goals.processConversion(366637)
				}

				document.querySelector(`.lDepDates__cardsRow`).classList.toggle(`${tag}__visible`);
			}

		})
	}

	window[tag].observer = (element) => {
		const callback = function (mutationsList, observer) {
			for (const mutation of mutationsList) {
				if (mutation.type === 'childList') {
					setTimeout(() => {
						utils.waitUntil(() => document.querySelector(`.cDDcard__item--departureDate span`), 0).then((element) => {
							window[tag].dropdownFn(element);
						});
					}, 500)
				}
			}
		};

		const observer = new MutationObserver(callback);
		const config = { childList: true };
		observer.observe(element, config);
	}

	window[tag].variation = "variation-1";
	window[tag].init();

})(window);