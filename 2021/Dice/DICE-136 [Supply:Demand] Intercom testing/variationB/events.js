(() => {
    try {
        const shared = {
            ID: "FE",
            VARIATION: "events",
            CLIENT: "Funnelenvy"
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
                    if (!step1CompletionEvent) {
                        eventStepCompletion('step_1_completion');
                        step1CompletionEvent = true;
                    }
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
        console.log(`${error} FE-events`);
    }
})();