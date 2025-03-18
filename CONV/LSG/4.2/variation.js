((w) => {
	"use strict";

	const tag = "cv-4-2";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["conv"].utils;

	// const utils = {
	// 	waitUntil: (condition, wait = 6000) => {
	// 		return new Promise((resolve, reject) => {
	// 			let stop = false;

	// 			const timeout =
	// 				wait &&
	// 				setTimeout(() => {
	// 					stop = true;
	// 					reject(new Error('Timeout waiting for condition'));
	// 				}, wait);

	// 			const check = () => {
	// 				if (stop) return;
	// 				if (!condition()) return requestAnimationFrame(check);

	// 				clearTimeout(timeout);
	// 				resolve(condition());
	// 			};

	// 			requestAnimationFrame(check);
	// 		});
	// 	},
	// }

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

	const benefitsObj = [
		{
			id: 'trustpilot',
			badge: `https://d1mgcpums0qvsa.cloudfront.net/LSG/4.2/trustpilot.png`,
			text: '<p><span>Our customers rate us </span><strong>4.3</strong> out of <strong>5 <br>Excellent</strong></p>',
		},
		{
			id: 'awards',
			badge: `https://d1mgcpums0qvsa.cloudfront.net/LSG/4.2/awards.png`,
			text: '<p><strong>GOLD award winner</strong> for <br>‘Best Travel Company for <br>Touring Holidays’</p>',
		},
		{
			id: 'yearstravel',
			badge: `https://d1mgcpums0qvsa.cloudfront.net/LSG/4.2/yearstravel.png`,
			text: '<p><strong>100+ years of travel <br></strong>since Est 1919</p>',
		},
	]

	const cv_benefits = `
		<div class="${tag}__benefits">
			<div class="${tag}__benefits-wrapper">
			${benefitsObj.map(benefit => `
					<div class="${tag}__benefits-item" id="${tag}__${benefit.id}">
						<div class="${tag}__benefits-title">
							<img src="${benefit.badge}">
						</div>
						<div class="${tag}__benefits-text">
							${benefit.text}
						</div>
					</div>
				`).join('')
		}
			</div>
		</div>
	`;

	window[tag].initVariation = () => {
		utils.waitUntil((() => document.querySelector('.p-home-intro .l-container, .p-static-intro .l-container')), 0).then((element) => {
			!document.querySelector(`.${tag}__benefits`) && insertHTML(element);
		});

		clickHandler();
	};

	const clickHandler = () => {
		if (!window[tag].hasClickListener) {
			document.addEventListener('click', (e) => {
				const elem = e.target;
				if (elem.closest(`.${tag}__benefits-item`)) {
					window.Kameleoon.API.Goals.processConversion(361442)
				}

				if (elem.closest(`.ESmodal`) || elem.closest(`.cTSFilters__field--button--clear button`) || elem.closest(`#elasticSearchFiltersTabs a`)) {
					filterApplied();
				}
			});
			window[tag].hasClickListener = true;
		}
	}

	const insertHTML = (element) => {
		element && element.insertAdjacentHTML('afterend', cv_benefits);
		addTracking();
	}

	const addTracking = () => {
		const elements = document.querySelectorAll(`.${tag}__benefits-wrapper`);
		elements.forEach((elem) => {
			elem.addEventListener('touchstart', () => {
				window.Kameleoon.API.Goals.processConversion(361443);
			});
		});
	};

	window[tag].variation = "variation-1";
	window[tag].init();
})(window);