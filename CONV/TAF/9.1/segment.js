((w) => {
    "use strict";

    const tag = 'cv-9-1';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 9.1 |') : () => { };

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

        init: () => {
            try {
                initVariation();
            } catch (err) {
                log(err.message);
            }
        },
    }

    const initVariation = () => {
        utils.waitUntil(() => document.querySelector('.jhp-twitterhandle'), 0).then((element) => {
            window.optimizely = window.optimizely || [];
            window.optimizely.push({
                "type": "user",
                "attributes": {
                    "journal_has_x_handle": "true"
                }
            });
        })
    }

    utils.init();
})(window);