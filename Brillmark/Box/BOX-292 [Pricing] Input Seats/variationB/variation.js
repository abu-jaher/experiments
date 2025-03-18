(() => {

	const shared = {
		ID: "fe",
		VARIATION: "292",
		CLIENT: "Funnelenvy"
	};

	const ID = shared.ID;
	const VARIATION = shared.VARIATION;

	const setup = () => {
		document.body.classList.add(ID + "-" + VARIATION);
	};

	const setTracking = () => {
		window.s = window.s_Obj || window.s_c_il[1];
		if (s.linkTrackVars) {
			s.linkTrackVars = "eVar85";
			s.eVar85 = "Clicks in the input field";
			s.events = "event47";
			s.linkTrackEvents = "event47";
			s && s.tl && s.tl(true, "o", "Clicks in the input field");
		}
	}

	let userCount = 3

	const interactiveField =
		`<div class="fe_interactive-field">	
		<div class="fe_interactive-field-wrap">
			<label for="teamSize">How many users on your team?</label>
			<input type="number" id="teamSize" name="teamSize" min="3" max="100" value="3">
		</div>
		<p></p>
	</div>
	`;

	const activate = () => {
		setup();
		document.querySelector('.pricing-navigation--button:nth-child(2)').insertAdjacentHTML('afterbegin', '<img class="inactive" src="https://cdn03.boxcdn.net/sites/default/files/styles/400xauto/public/2024-05/avatar.png?itok=A30HM-W8"><img class="active" src="https://cdn03.boxcdn.net/sites/default/files/styles/400xauto/public/2024-05/avatar-active_0.png?itok=DMDcT078">');
		document.querySelector('.pricing-navigation--button:nth-child(3)').innerHTML = 'Businesses';
		document.querySelector('.pricing-navigation--new .pricing-navigation--selector [value="tab-2"]').innerHTML = 'Businesses';
		document.querySelector('.pricing-navigation--button:nth-child(3)').insertAdjacentHTML('afterbegin', '<img class="active" src="https://cdn03.boxcdn.net/sites/default/files/styles/400xauto/public/2024-05/buildings.png?itok=OSRjm7v5"><img class="inactive" src="https://cdn03.boxcdn.net/sites/default/files/styles/400xauto/public/2024-05/buildings_inactive.png?itok=nJGaDCiL">');
		document.querySelector('.pricing-navigation').insertAdjacentHTML('afterend', interactiveField);

		document.querySelector('.fe_interactive-field #teamSize').addEventListener('keyup', handleInput);

		pricingFunc(userCount);

		document.querySelector(".pricing-toggle-button .pricing-toggle-discount").innerHTML = "Save 25%";

		document.addEventListener('click', (event) => {
			if (event.target.closest('.pricing-navigation--button') || event.target.closest('.pricing-toggle')) {
				setTimeout(function () {
					const inputField = document.querySelector('.fe_interactive-field #teamSize');
					const value = parseInt(inputField.value, 10);
					addParam(value);
					document.querySelector(".pricing-toggle-button .pricing-toggle-discount").innerHTML = "Save 25%";
				}, 500)
			}

			if (event.target.closest('.fe_interactive-field p a')) {
				document.querySelector('[href*="https://www.box.com/quote"]').click();
			}

			if(event.target.closest('input#teamSize')){
				setTracking();
			}
		})

		const interval = setInterval(() => {
			addParam(userCount);
		}, 20);

		setTimeout(() => {
			clearInterval(interval);
		}, 3000)
	};

	const debounce = (func, delay) => {
		let debounceTimer;
		return function () {
			const context = this;
			const args = arguments;
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => func.apply(context, args), delay);
		};
	}

	const handleInput = debounce(function () {
		const inputField = document.querySelector('.fe_interactive-field #teamSize');
		const value = parseInt(inputField.value, 10);
		if (value < 3 || inputField.value == '') {
			inputField.value = 3;
			inputField.closest('.fe_interactive-field').classList.add('error');
			document.querySelector('.fe_interactive-field p').innerHTML = "User count must be at least 3";
			pricingFunc(3);
			addParam(3)
		} else if (value > 100) {
			inputField.value = 100;
			inputField.closest('.fe_interactive-field').classList.add('error');
			document.querySelector('.fe_interactive-field p').innerHTML = "For user accounts of over 100 seats, <a>contact sales</a> for volume discounts.";
			pricingFunc(100);
			addParam(100);
		} else {
			inputField.closest('.fe_interactive-field').classList.remove('error');
			pricingFunc(value);
			addParam(value)
		}
	}, 1500);

	const pricingFunc = (userCount) => {
		const pricingPackage = document.querySelectorAll("#pricing-plan-2 .pricing-package[data-pricing-api-id]");
		for (let i = 0; i < pricingPackage.length; i++) {
			const planId = pricingPackage[i].getAttribute("data-pricing-api-id");
			widgetPrice(planId, userCount);
		}
	}

	const widgetPrice = (planId, userCount) => {
		const getAnnualPrice = document.querySelector('[data-pricing-api-id="' + planId + '"] .annual-price').getAttribute('data-pricing-value');
		const getMonthlyPrice = document.querySelector('[data-pricing-api-id="' + planId + '"] .annual-price--old').getAttribute('data-pricing-value');

		const monthlyPriceCalc = ((getMonthlyPrice * userCount) * 12).toLocaleString();
		const annualPriceCalc = ((getAnnualPrice * userCount) * 12).toLocaleString();

		const addPrice = '' +
			'<span class="fe_monthly-price">$' + (getMonthlyPrice * userCount).toLocaleString() + ' monthly for ' + userCount + ' users</span>' +
			'<span class="fe_annual-price"><span>$' + monthlyPriceCalc + '</span> $' + annualPriceCalc + ' annually for ' + userCount + ' users</span>' +
			'';

		const pricingText = '' +
			'<div class="fe_pricing-text"> '
			+ addPrice +
			'</div>';

		if (document.querySelector('[data-pricing-api-id="' + planId + '"] .fe_pricing-text')) {
			document.querySelector('[data-pricing-api-id="' + planId + '"] .fe_pricing-text').innerHTML = addPrice;
		} else {
			document.querySelector('[data-pricing-api-id="' + planId + '"] .minimum-users-info').insertAdjacentHTML('afterend', pricingText);
		}
	}

	const addParam = (userCount) => {
		const cta = document.querySelectorAll("#pricing-plan-2 .pricing-package .pricing-package__buttons-wrapper a:not([href*='https://www.box.com/']), .pricing-features--plan-buttons a:not([href*='https://www.box.com/']):not([href*='starter'])");
		for (let i = 0; i < cta.length; i++) {
			const url = cta[i].href;
			if (url.indexOf('annual') > -1 || url.indexOf('monthly') > -1) {
				const baseURL = removeQueryParam(url.replace('/n','').replace('businessplus','business-plus'), 'qty');
				cta[i].setAttribute("href", baseURL + '&qty=' + userCount);
			}
		}
	}

	const removeQueryParam = (url, param) => {
		const urlObject = new URL(url);
		urlObject.searchParams.delete(param);
		return urlObject.toString();
	}

	const pollerLite = (conditions, callback, maxTime) => {
		if (maxTime === void 0) { maxTime = 20000; }
		const POLLING_INTERVAL = 500;
		const startTime = Date.now();
		const interval = setInterval(() => {
			const allConditionsMet = conditions.every((condition) => {
				if (typeof condition === 'function') {
					return condition();
				}
				return !!document.querySelector(condition);
			});
			if (allConditionsMet) {
				clearInterval(interval);
				callback();
			}
			else if (Date.now() - startTime >= maxTime) {
				clearInterval(interval);
				console.log('Polling exceeded maximum time limit');
			}
		}, POLLING_INTERVAL);
	};

	pollerLite(['#pricing-plan-2 .pricing-package--price .minimum-users-info'], activate);
	pollerLite(['body'], () => {
		setTimeout(() => {
			document.body.style.opacity = 1;
		}, 2000)
	});
})();