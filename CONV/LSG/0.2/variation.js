((w) => {
	"use strict";

	const tag = "cv-0-2";
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

	const benefitsObj = [
		{
			id: 'hassle-free',
			icon: `https://d1mgcpums0qvsa.cloudfront.net/LSG/0.2/promiseIcon.png`,
			titleTextWhite: 'Our hassle-free',
			titleTextItalic: 'promise',
			text: 'We don’t just take you <br>away, we take the <br>hassle away too. <br>And that’s a promise!',
		},
		{
			id: 'flexible-payment',
			icon: `https://d1mgcpums0qvsa.cloudfront.net/LSG/0.2/payment.png`,
			titleTextWhite: 'Flexible',
			titleTextItalic: 'payment',
			text: 'Pay everything upfront <br>or scatter the cost in <br>installments – it’s totally <br>up to you!',
		},
		{
			id: 'price-policy',
			icon: `https://d1mgcpums0qvsa.cloudfront.net/LSG/0.2/policy.png`,
			titleTextWhite: 'One price',
			titleTextItalic: 'policy',
			text: 'On your trip, you all pay <br>the same price! Because <br>we believe in fair fares.',
		},
		{
			id: 'comfort-travel',
			icon: `https://d1mgcpums0qvsa.cloudfront.net/LSG/0.2/travelIcon.png`,
			titleTextWhite: 'Travel in',
			titleTextItalic: 'comfort',
			text: 'Recline, unwind and <br>watch the world go by <br>as you drive through <br>beautiful scenery.',
		},
	]

	const cv_benefits = `
		<div class="${tag}__benefits">
			<div class="${tag}__benefits-wrapper">
			${benefitsObj.map(benefit => `
					<div class="${tag}__benefits-item" id="${tag}__${benefit.id}">
						<div class="${tag}__benefits-title">
							<img src="${benefit.icon}">
							<p class="${tag}__title-text ${tag}__white">${benefit.titleTextWhite}</p>
							<p class="${tag}__title-text ${tag}__italic">${benefit.titleTextItalic}</p>
						</div>
						<div class="${tag}__benefits-text">
							<p>${benefit.text}</p>
						</div>
					</div>
				`).join('')
		}
			</div>
		</div>
	`


	window[tag].initVariation = () => {

		// homepage
		utils.waitUntil((() => document.querySelector('.p-home .l-conf-strip')), 0).then((element) => {
			element.insertAdjacentHTML('beforebegin', cv_benefits);

			document.addEventListener('click', (e) => {
				const el = e.target;
				if (el.closest(`#${tag}__hassle-free`)) {
					Kameleoon.API.Goals.processConversion(357580)
				}

				if (el.closest(`#${tag}__flexible-payment`)) {
					Kameleoon.API.Goals.processConversion(358250)
				}

				if (el.closest(`#${tag}__price-policy`)) {
					Kameleoon.API.Goals.processConversion(358251)
				}

				if (el.closest(`#${tag}__comfort-travel`)) {
					Kameleoon.API.Goals.processConversion(357583)
				}
			})
		});

	};

	window[tag].variation = "variation-1";
	window[tag].init();
})(window);