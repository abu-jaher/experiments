(() => {
    try {
        const shared = {
            ID: "FE",
            VARIATION: "140-control",
            CLIENT: "Funnelenvy"
        };

        const ID = shared.ID;
        const VARIATION = shared.VARIATION;

        const setup = () => {
            document.body.classList.add(ID + "-" + VARIATION);
            document.addEventListener('click', (e) => {
                const el = e.target;
                if (el.closest('.fe-nav-content a')) {
                    dataLayer.push({ 'event': 'FE_ABTest_sticky_nav_CTA_click' });
                }
            });
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

        pollerLite(['body'], setup);

    } catch (error) {
        console.log(`${error} Dice-140-control`);
    }
})();