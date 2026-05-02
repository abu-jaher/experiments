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
                utils.waitUntil(() => document.body, 0).then((docBody) => {
                    docBody.classList.add(tag);
                });

                initVariation();

                log('running v2');
            } catch (err) {
                log(err.message);
            }
        },
    };

    const initVariation = () => {
        utils.waitUntil(() => document.querySelector(`#productGallery, #itemGallery`), 0).then((ele) => {

            if (document.querySelector(`.${tag}__badge`)) return;
            const ratedBadge = `
                <div class="${tag}__badge">
                    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="20px" height="20px" fill="none"><path fill="currentColor" fill-rule="evenodd" stroke="currentColor" stroke-width="1.5" d="M2.56 10.346l5.12 3.694-1.955 5.978c-.225.688.568 1.261 1.157.836L12 17.159l5.12 3.695c.587.425 1.381-.148 1.155-.836l-1.954-5.978 5.118-3.694c.589-.425.286-1.352-.442-1.352H14.67l-.166-.507-1.789-5.47c-.225-.69-1.205-.69-1.43 0L9.33 8.993H3.003c-.728 0-1.03.927-.442 1.352z" clip-rule="evenodd"></path></svg>
                    <p class="${tag}__text">Highly Rated</p>
                </div>
            `;
            ele.insertAdjacentHTML(`beforeend`, ratedBadge);

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