(() => {
    try {
        const shared = {
            ID: "FE",
            VARIATION: "304",
            CLIENT: "Funnelenvy"
        };

        const ID = shared.ID;
        const VARIATION = shared.VARIATION;

        const setup = () => {
            document.body.classList.add(ID + "-" + VARIATION);
        };

        const activate = () => {
            setup();
            document.querySelector('#page--area__top .info-notice__top .info-notice-content > p').insertAdjacentHTML('afterend',`<p class="FE__banner-text">Get started with Box Hubs: Secure, intelligent portals to curate, organize, and publish content. <a href="/hubs" target="_blank">Learn more</a></p>`);
        };

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

        pollerLite(['#page--area__top .info-notice__top .info-notice-content > p'], activate);

    } catch (e) {
        console.log(e, 'Error in Box-304 v1')
    }
})();