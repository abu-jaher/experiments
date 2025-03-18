(() => {
	try {
		const shared = {
			ID: "FE-twoStep-form",
			VARIATION: "001",
			CLIENT: "funnelenvy"
		};

		const { ID, VARIATION } = shared;

		const setup = () => {
			document.documentElement.classList.add(`${ID}-${VARIATION}`);
			document.body.classList.add(`${ID}`);
		};

		let currentStep = 1;
		let previousStep = 1;
		let formEngagementFired = false;
    let step1CompletionEvent=false;

		const progressBar = () => {
			setup();
			stepHandler(currentStep, previousStep);
		};

		const activate = () => {
			observeDOM('.multi-step-step1', () => {
				const step1 = document.querySelector('.multi-step-step1');
				if (step1.classList.contains('multi-step-hide')) {
					previousStep = currentStep;
					currentStep = 2;
					stepHandler(previousStep, currentStep);
					makeEmailFirstField();
					if (!step1CompletionEvent) {
            eventStepCompletion('step_1_completion');
						step1CompletionEvent = true;
					}
					// const value = document.querySelector('.multi-step-step1 #radio-role1').checked ? 'STAFFING_AND_RECRUITING_AGENCY' : 'IN_HOUSE_TEAM';
					// eventQualifying(value);
				} else {
					previousStep = currentStep;
					currentStep = 1;
					stepHandler(previousStep, currentStep);
				}
			})

			MktoForms2.whenReady(function (form) {
				form.onSuccess(function (values, followUpUrl) {
					eventStepCompletion('step_2_completion');
				});
			});

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

		const stepHandler = (previousStep, currentStep) => {
			document.body.classList.remove(`${ID}-step-${previousStep}`);
			document.body.classList.add(`${ID}-step-${currentStep}`);
			document.querySelector('.newProgressBar .stepdisplay').innerHTML = `Step ${currentStep} of 2`;
			step2handler(currentStep)
		}

		const step2handler = (currentStep) => {
			if (currentStep === 2) {
				document.querySelectorAll('.mktoForm .multi-step-step3').forEach((elem) => {
					elem.classList.remove('multi-step-hide');
				})
			} else {
				document.querySelectorAll('.mktoForm .multi-step-step3').forEach((elem) => {
					elem.classList.add('multi-step-hide');
				})
			}
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
		pollerLite(['.progress-bar'], progressBar);
	} catch (error) {
		console.log(`${error} Dice-134`);
	}
})();