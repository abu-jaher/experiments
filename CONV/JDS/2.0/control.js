((w) => {
    "use strict";

    const tag = 'cv-2-0';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] JDS 2.0 |') : () => { };

    const utils = {
        waitUntil: (condition, wait = 6000) => {
            return new Promise((resolve, reject) => {
                let stop = false;

                const timeout =
                    wait &&
                    setTimeout(() => {
                        stop = true;
                        reject(new Error('Timeout waiting for condition'));
                    }, wait);

                const check = () => {
                    if (stop) return;
                    if (!condition()) return requestAnimationFrame(check);

                    clearTimeout(timeout);
                    resolve(condition());
                };

                requestAnimationFrame(check);
            });
        },
        log: function (msg, expTag, arg1, arg2, arg3) {
            // Default parameter values
            expTag = expTag || tag;

            // Always use the tag parameter as a string
            const tagStr = typeof expTag === 'string' ? expTag : tag;

            // Check if we have additional arguments
            if (arguments.length > 2) {
                // We have additional args to log
                const consoleArgs = ['[CONV] ' + tagStr + ' -->', msg];

                // Add any additional arguments passed
                for (let i = 2; i < arguments.length; i++) {
                    consoleArgs.push(arguments[i]);
                }

                console.log.apply(console, consoleArgs);
            } else {
                // Simple log with no additional args
                console.log('[CONV] ' + tagStr + ' -->', msg);
            }
        },
        sendEvt: (name, apiKey, expTag = tag, tags) => {
            window.monetateQ = window.monetateQ || [];
            window.monetateQ.push([
                "trackEvent",
                [apiKey]
            ]);

            utils.log("metric event: \n-- name = \"" + name + "\" " + (!!tags ? "\n\n-- tags = " + JSON.stringify(tags, 0, 2) : ""), expTag);
        },
        delegateEvents: (eventTypes, selectorHandlerMap) => {
            const eventHandler = (event) => {
                for (const selector in selectorHandlerMap) {
                    if (selectorHandlerMap.hasOwnProperty(selector)) {
                        const handler = selectorHandlerMap[selector];
                        const matchingElement = event.target.closest(selector);
                        if (matchingElement) {
                            handler(event, matchingElement);
                            break;
                        }
                    }
                }
            };

            const eventTypesList = eventTypes.split(' ');
            for (let i = 0; i < eventTypesList.length; i++) {
                document.addEventListener(eventTypesList[i], eventHandler, false);
            }

            return {
                remove: () => {
                    for (let i = 0; i < eventTypesList.length; i++) {
                        document.removeEventListener(eventTypesList[i], eventHandler, false);
                    }
                }
            };
        },

        init: () => {
            try {
                initVariation();

                log('running Control');
            } catch (err) {
                log(err.message);
            }
        },
    };


    const initVariation = () => {
        utils.waitUntil(() => document.body, 0).then((docBody) => {
            if (document.querySelector(`.${tag}`)) return;
            docBody.classList.add(tag);
            utils.sendEvt("[JDS 2.0] PDP view with high rated badged product", "pdp_view_with_high_rated_badged_product", tag);
            utils.delegateEvents("click", {
                "button#addToBasket": (e, btn) => {
                    utils.sendEvt("[JDS 2.0] Highly rated badged product added to bag", "highly_rated_badged_product_added_to_bag", tag);
                },
            });
        });
    };

    utils.init();
})(window);