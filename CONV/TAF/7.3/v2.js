((w) => {
    "use strict";

    const tag = 'cv-7-3';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 7.3 |') : () => { };

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
                utils.waitUntil(() => document.body, 0).then((docBody) => {
                    docBody.classList.add(tag);
                });

                initVariation();
                listener();

                window.optimizely = window.optimizely || [];
                window.optimizely.push({
                "type": "user",
                "attributes": {
                    "viewed_keyword_search": "true"
                }
                });

                log('running v2');
            } catch (err) {
                log(err.message);
            }
        },
    }

    const initVariation = () => {

        utils.waitUntil(() => document.querySelector('.search-results-body .search-results .author a, .search-results-body .search-results li .publication-meta a,.search-results-body .browse-results li .publication-meta a'), 0).then((element) => {
            const elements = document.querySelectorAll(`.search-results-body .search-results .author a, .search-results-body .search-results li .publication-meta a,.search-results-body .browse-results li .publication-meta a`);
            elements.forEach((element) => {
                element.setAttribute('tabindex', '-1');
            });
        });

        utils.waitUntil(() => document.querySelector('.search-results-body .search-results li.search-article-tools .previewLinks a.showFull'), 0).then((element) => {
            const elements = document.querySelectorAll(`.search-results-body .search-results li.search-article-tools .previewLinks a.showFull`);
            elements.forEach((element) => {
                element.closest('.previewLinks').insertAdjacentElement('afterbegin',element);
            });
        });
    }

    const listener = () => {
        /* These are the modifications: */
        window.addEventListener("locationchange", () => {
            const interval = setInterval(() => {
                initVariation();
            }, 500)

            setTimeout(() => {
                clearInterval(interval)
            }, 5000)
        });

        history.pushState = ((originalPushState) =>
            function pushState(...args) {
                const result = originalPushState.apply(this, args);
                window.dispatchEvent(new Event("pushstate"));
                window.dispatchEvent(new Event("locationchange"));
                return result;
            }
        )(history.pushState);

        history.replaceState = ((originalReplaceState) =>
            function replaceState(...args) {
                const result = originalReplaceState.apply(this, args);
                window.dispatchEvent(new Event("replacestate"));
                window.dispatchEvent(new Event("locationchange"));
                return result;
            }
        )(history.replaceState);

        window.addEventListener("popstate", () => {
            window.dispatchEvent(new Event("locationchange"));
        });
    };

    utils.init();
})(window);