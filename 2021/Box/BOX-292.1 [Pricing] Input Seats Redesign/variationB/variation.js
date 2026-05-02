(() => {
	try {
		const activityId = '${campaign.id}';
		const activityName = '${campaign.name}';
		const experienceId = '${campaign.recipe.id}';
		const experienceName = '${campaign.recipe.name}';

		window._mfq = window._mfq || [];
		window._mfq.push(["tag", "ACTIVITY_ID", activityId]);
		window._mfq.push(["tag", "ACTIVITY_NAME", activityName]);
		window._mfq.push(["tag", "EXPERIENCE_ID", experienceId]);
		window._mfq.push(["tag", "EXPERIENCE_NAME", experienceName]);

		const shared = {
			ID: "fe",
			VARIATION: "292-1",
			CLIENT: "Funnelenvy"
		};

		const ID = shared.ID;
		const VARIATION = shared.VARIATION;

		const setup = () => {
			document.body.classList.add(ID + "-" + VARIATION);
		};

		const setTracking = (label) => {
			window.s = window.s_Obj || window.s_c_il[1];
			if (s.linkTrackVars) {
				s.linkTrackVars = "eVar85";
				s.eVar85 = label;
				s.events = "event47";
				s.linkTrackEvents = "event47";
				s && s.tl && s.tl(true, "o", label);
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
			document.querySelector('.pricing-navigation .pricing-toggle').insertAdjacentHTML('afterend', interactiveField);

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

				if (event.target.closest('input#teamSize')) {
					setTracking("Clicks in the input field");
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
			const annualPrice = document.querySelector('[data-pricing-api-id="' + planId + '"] .annual-price');
			const monthlyPrice = document.querySelector('[data-pricing-api-id="' + planId + '"] .annual-price--old');

			const getAnnualPrice = annualPrice ? annualPrice.getAttribute('data-pricing-value') : 0;
			const getMonthlyPrice = monthlyPrice ? monthlyPrice.getAttribute('data-pricing-value') : 0;

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
					const baseURL = removeQueryParam(url.replace('/n', '').replace('businessplus', 'business-plus'), 'qty');
					cta[i].setAttribute("href", baseURL + '&qty=' + userCount);

					const tc = "|box-292-1-v1";
					const urlHref = cta[i].href;
					if (urlHref.indexOf('box-292-1-v1') == -1) {
						var referrer = urlHref.concat(tc);
						cta[i].setAttribute("href", referrer);
					}
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

	} catch (error) {
		console.log('Error in Box 292.1')
	}
})();

// TC param
(() => {
	try {
		const FEHelper = {
			onLoadElement: (selector, trigger, delayInterval, delayTimeout) => {
				const interval = setInterval(() => {
					if (
						document &&
						document.querySelectorAll(selector) &&
						document.querySelectorAll(selector).length > 0
					) {
						clearInterval(interval);
						trigger();
					}
				}, delayInterval);
				setTimeout(() => {
					clearInterval(interval);
				}, delayTimeout);
			}
		};


		const updateButtonUrl = () => {
			const cta = document.querySelectorAll("#pricing-plan-2 .pricing-package .pricing-package__buttons-wrapper a:not([href*='https://www.box.com/']), #pricing-plan-1 .pricing-package:not([data-formatter-id='pricing-plan-108696']) .pricing-package__buttons-wrapper a, .pricing-features__chart .pricing-features--plan-buttons a:not([href*='https://www.box.com/']), .pricing-features--sticky__container .pricing-features--plan-buttons a:not([href*='https://www.box.com/'])");
			for (let i = 0; i < cta.length; i++) {

				const tc = "|box-292-1-v1";
				const url = cta[i].href;
				if (url.indexOf('annual') > -1 || url.indexOf('monthly') > -1) {
					if (url.indexOf('box-292-1-v1') > -1) return;
					var referrer = url.concat(tc);
					cta[i].setAttribute("href", referrer);
				}
			}
		}

		const init = () => {
			// updating button url 
			const interval = setInterval(() => {
				updateButtonUrl();
			}, 20);

			setTimeout(() => {
				clearInterval(interval)
			}, 5000);
			document.querySelector("div.pricing-toggle input[type='checkbox']").addEventListener("click", function () {
				// updating button url 
				setTimeout(() => {
					updateButtonUrl();
				}, 1000);
			});
		}

		FEHelper.onLoadElement('#pricing-plan-2 .pricing-package .pricing-package__buttons-wrapper a', init, 50, 10000);
	} catch (e) {
		console.log(e, "Error in Box-292.1 v1");
	}
})();