(() => {
	try {
		const shared = {
			ID: "FE-twoStep-form",
			VARIATION: "control",
			CLIENT: "funnelenvy"
		};

		const { ID, VARIATION } = shared;

		const setup = () => {
			document.documentElement.classList.add(`${ID}-${VARIATION}`);
			document.body.classList.add(`${ID}`);
		};

		let formEngagementFired = false;
		let step1CompletionEvent = false;
		let step2CompletionEvent = false;

		const activate = () => {
			setup();
			observeDOM('.multi-step-step1', () => {
				const step1 = document.querySelector('.multi-step-step1');
				if (step1.classList.contains('multi-step-hide')) {
					makeEmailFirstField();
					if (!step1CompletionEvent) {
						eventStepCompletion('step_1_completion');
						step1CompletionEvent = true;
					}
					// const value = document.querySelector('.multi-step-step1 #radio-role1').checked ? 'STAFFING_AND_RECRUITING_AGENCY' : 'IN_HOUSE_TEAM';
					// eventQualifying(value);
				}
			})

			observeDOM('#stepDisplay', () => {
				if (!document.querySelector('#formSubmitBtn.multi-step-hide')) {
					if (!step2CompletionEvent) {
						eventStepCompletion('step_2_completion');
						step2CompletionEvent = true;
					}
				}
			})

			addFormEngagementListener();
		};

		const addFormEngagementListener = () => {
			const step1Fields = document.querySelectorAll('.multi-step-step1 input, .multi-step-step1 select, .multi-step-step1 textarea');
			step1Fields.forEach(field => {
				field.addEventListener('focus', () => {
					if (!formEngagementFired) {
						eventFormEngagement();
						formEngagementFired = true;
					}
				});
			});
		};

		const makeEmailFirstField = () => {
			const emailField = document.querySelector('#Email').closest('.mktoFormRow');
			document.querySelector('#FirstName').closest('.mktoFormRow').insertAdjacentElement('beforebegin', emailField);
		}

		const observeDOM = (targetSelectorString, callbackFunction) => {
			const target = document.querySelector(`${targetSelectorString}`);

			if (!target) return;

			const config = {
				childList: true,
				subtree: true,
				attributes: true,
				characterData: true,
				characterDataOldValue: true
			};
			const observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					observer.disconnect();

					callbackFunction(mutation);
					observer.observe(target, config);
				});
			});

			observer.observe(target, config);
		};

		const eventStepCompletion = (label) => {
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
				event: label,
			});
		}

		const eventFormEngagement = () => {
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
				event: 'form_engagement',
			});
		}

		const eventQualifying = (value) => {
			window.dataLayer.push({
				event: 'QUALIFYING_QUESTION',
				selection: value,
			});
		}

		const pollerLite = (conditions, callback, maxTime = 20000) => {
			const POLLING_INTERVAL = 500;
			const startTime = Date.now();
			const interval = setInterval(() => {
				const allConditionsMet = conditions.every(condition =>
					typeof condition === 'function' ? condition() : !!document.querySelector(condition)
				);

				if (allConditionsMet) {
					clearInterval(interval);
					callback();
				} else if (Date.now() - startTime >= maxTime) {
					clearInterval(interval);
					console.log('Polling exceeded maximum time limit');
				}
			}, POLLING_INTERVAL);
		};

		pollerLite(['#tempStep1Btn'], activate);
	} catch (error) {
		console.log(`${error} Dice-134`);
	}
})();