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
			VARIATION: "292-2",
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

		let userCount = 3;

		const teamIcon = `<svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 10.925C17.9402 10.925 20.3236 8.54155 20.3236 5.60141C20.3236 2.66128 17.9402 0.277832 15 0.277832C12.0599 0.277832 9.67645 2.66128 9.67645 5.60141C9.67645 8.54155 12.0599 10.925 15 10.925Z" fill="#0061D5"/>
<path d="M14.7437 22.8324C18.4016 22.8331 21.9333 21.4947 24.6722 19.0701C23.774 17.1988 22.3656 15.6192 20.6091 14.5133C18.8525 13.4073 16.8194 12.82 14.7437 12.8188C12.6679 12.8195 10.6345 13.4066 8.87787 14.5126C7.12125 15.6186 5.71291 17.1985 4.81512 19.0701C7.55403 21.4947 11.0857 22.8331 14.7437 22.8324Z" fill="#0061D5"/>
<path d="M5.85664 11.9312C7.702 11.9312 9.19795 10.4352 9.19795 8.58985C9.19795 6.74449 7.702 5.24854 5.85664 5.24854C4.01128 5.24854 2.51532 6.74449 2.51532 8.58985C2.51532 10.4352 4.01128 11.9312 5.85664 11.9312Z" fill="#0061D5" fill-opacity="0.4"/>
<path d="M5.96933 19.067C8.11332 19.0674 10.1833 18.2119 11.7886 16.6619C11.2622 15.4657 10.4367 14.4559 9.40715 13.7489C8.37761 13.0419 7.18593 12.6665 5.96933 12.6658C4.75266 12.6662 3.56086 13.0415 2.53127 13.7485C1.50169 14.4555 0.67623 15.4655 0.150024 16.6619C1.75535 18.2119 3.82533 19.0674 5.96933 19.067Z" fill="#0061D5" fill-opacity="0.4"/>
<path d="M24.2105 11.9312C26.0559 11.9312 27.5518 10.4352 27.5518 8.58985C27.5518 6.74449 26.0559 5.24854 24.2105 5.24854C22.3652 5.24854 20.8692 6.74449 20.8692 8.58985C20.8692 10.4352 22.3652 11.9312 24.2105 11.9312Z" fill="#0061D5" fill-opacity="0.4"/>
<path d="M24.0307 19.067C26.1747 19.0674 28.2447 18.2119 29.85 16.6619C29.3236 15.4657 28.4981 14.4559 27.4685 13.7489C26.439 13.0419 25.2473 12.6665 24.0307 12.6658C22.8141 12.6662 21.6223 13.0415 20.5927 13.7485C19.5631 14.4555 18.7376 15.4655 18.2114 16.6619C19.8168 18.2119 21.8867 19.0674 24.0307 19.067Z" fill="#0061D5" fill-opacity="0.4"/>
</svg>
`

		const interactiveField =
			`<div class="fe_interactive-field">	
			<div class="fe_interactive-field-wrap">
				<label for="teamSize">`+teamIcon+`Team size</label>
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
				const getContactSalesLink = document.querySelector('.button-link[data-linksection="Body>Enterprise Plus"]').getAttribute('href');
				document.querySelector('.fe_interactive-field p').innerHTML = "For user accounts of over 100 seats, <a href='"+getContactSalesLink+"'>contact sales</a> for volume discounts.";
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

					const tc = "|box-292-2-v1";
					const urlHref = cta[i].href;
					if (urlHref.indexOf('box-292-2-v1') == -1) {
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

				const tc = "|box-292-2-v1";
				const url = cta[i].href;
				if (url.indexOf('annual') > -1 || url.indexOf('monthly') > -1) {
					if (url.indexOf('box-292-2-v1') > -1) return;
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
		console.log(e, "Error in Box-292.2 v1");
	}
})();