((w) => {
    "use strict";

    const tag = 'cv-3-0';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] JDS 3.0 |') : () => { };

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

        init: () => {
            try {
                initVariation();

                log('running control');
            } catch (err) {
                log(err.message);
            }
        },
    };

    const carouselData = {
        groups: [
            {
                name: "pdp1",
                type: "running",
                paths: [
                    "/product/black-nike-pegasus-premium/19701415/",
                    "/product/black-nike-pegasus-premium/19703426/",
                    "/product/grey-nike-pegasus-premium/19699881/",
                    "/product/black-nike-pegasus-premium/19717234/",
                    "/product/grey-nike-pegasus-premium/19717234/",
                ],
            },
            {
                name: "pdp2",
                type: "running",
                paths: [
                    "/product/grey-nike-pegasus-premium-womens/19709030/",
                    "/product/black-nike-pegasus-premium-womens/19706711/",
                    "/product/grey-nike-pegasus-premium-womens/19706075/",
                    "/product/pink-nike-pegasus-premium-womens/19709381/",
                    "/product/pink-nike-pegasus-premium-womens/19699694/",
                    "/product/nike-pegasus-premium-womens/19699694/",
                    "/product/nike-womens-road-running-shoes-pegasus-premium/19699694/",
                    "/product/white-nike-pegasus-premium-womens/19697808/",
                ],
            },
            {
                name: "pdp3",
                type: "running",
                paths: [
                    "/product/black-nike-pegasus-41/19648064/",
                    "/product/white-nike-pegasus-41/19650942/",
                    "/product/grey-nike-pegasus-41/19676689/",
                    "/product/black-nike-pegasus-41/19646297/",
                ],
            },
            {
                name: "pdp4",
                type: "running",
                paths: [
                    "/product/nike-pegasus-41-womens/19703397/",
                    "/product/nike-pegasus-41-womens/19699397/",
                    "/product/nike-pegasus-41-womens/19699878/",
                    "/product/blue-nike-pegasus-41-womens/19688459/",
                ],
            },
            {
                name: "pdp5",
                type: "running",
                paths: [
                    "/product/green-nike-vomero-plus/19717576/",
                    "/product/black-nike-vomero-plus/19703458/",
                    "/product/black-nike-vomero-plus/19698307/",
                    "/product/black-nike-vomero-plus/19711951/",
                    "/product/grey-nike-vomero-plus/19709374/",
                ],
            },
            {
                name: "pdp6",
                type: "running",
                paths: [
                    "/product/off-white-nike-vomero-plus-womens/19718463/",
                    "/product/pink-nike-vomero-plus-womens/19698304/",
                    "/product/white-nike-vomero-plus-womens/19698300/",
                    "/product/white-nike-vomero-plus-womens/19717578/",
                    "/product/pink-nike-vomero-plus-womens/19717578/",
                    "/product/black-nike-vomero-plus-womens/19709379/",
                ],
            },
            {
                name: "pdp7",
                type: "running",
                paths: [
                    "/product/blue-nike-vomero-18/19706788/",
                    "/product/black-nike-vomero-18-gore-tex/19717572/",
                    "/product/green-nike-vomero-18/19717574/",
                    "/product/black-nike-vomero-18/19711880/",
                    "/product/black-nike-vomero-18/19700470/",
                ],
            },
            {
                name: "pdp8",
                type: "running",
                paths: [
                    "/product/pink-nike-vomero-18-womens/19720220/",
                    "/product/red-nike-vomero-18-womens/19720220/",
                    "/product/grey-nike-vomero-18-womens/19715451/",
                    "/product/black-nike-vomero-18-womens/19701364/",
                    "/product/pink-nike-vomero-18-womens/19709380/",
                ],
            },
            {
                name: "pdp9",
                type: "lifestyle",
                paths: [
                    "/product/black-nike-shox-tl/19716267/",
                    "/product/nike-shox-tl/19706761/",
                    "/product/red-nike-shox-tl/19701457/",
                    "/product/white-nike-shox-tl/1310872/",
                    "/product/black-nike-shox-tl/1310873/",
                    "/product/black-nike-shox-tl/19703389/",
                    "/product/black-nike-shox-tl/19666020/",
                    "/product/black-nike-shox-tl/15968892/",
                    "/product/grey-nike-shox-tl/19701589/",
                    "/product/black-nike-shox-tl/19683665/",
                    "/product/nike-shox-tl/19686821/",
                    "/product/black-nike-shox-tl/19689796/",
                    "/product/grey-nike-shox-tl/19694763/",
                ],
            },
            {
                name: "pdp10",
                type: "lifestyle",
                paths: [
                    "/product/white-nike-shox-tl-womens/1310874/",
                    "/product/black-nike-shox-tl-womens/1310875/",
                    "/product/black-nike-shox-tl-womens/19706805/",
                    "/product/nike-shox-tl-fade/19715272/",
                    "/product/white-nike-shox-tl-womens/19705787/",
                    "/product/grey-nike-shox-tl-womens/19693708/",
                    "/product/brown-nike-shox-tl-womens/19688267/",
                ],
            },
            {
                name: "pdp11",
                type: "gym",
                paths: [
                    "/product/pink-nike-metcon-10-womens/19717797/",
                    "/product/red-nike-metcon-10-womens/19712234/",
                    "/product/white-nike-metcon-10-womens/19712233/",
                    "/product/black-nike-metcon-10-womens/19712232/",
                ],
            },
        ]
    };

    const onElementVisible = (selector, callback, options = { once: false }) => {
        const element = document.querySelector(selector);
        if (!element) return;

        const isElementInViewport = (el) => {
            const rect = el.getBoundingClientRect();
            return rect.top + 200 < window.innerHeight && rect.bottom > 0;
        };

        const handleScroll = () => {
            if (isElementInViewport(element)) {
                callback(element);
                if (options.once) window.removeEventListener("scroll", handleScroll);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
    };

    const initVariation = () => {

        utils.waitUntil(() => document.querySelector(`#itemInfo`), 0).then((ele) => {

            if (document.querySelector(`.${tag}`)) return;
            document.body.classList.add(tag);
            onElementVisible(`#itemInfo`, () => {
                utils.sendEvt("[JDS 3.0] Features that perform visibility", "conv_features_visibility", tag);
            }, { once: true });
        });
    };

    utils.init();
})(window);