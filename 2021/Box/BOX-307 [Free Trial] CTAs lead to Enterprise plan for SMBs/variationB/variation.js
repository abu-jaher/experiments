(() => {
    try {
        const shared = {
            ID: "FE",
            VARIATION: "307",
            CLIENT: "Funnelenvy"
        };

        const ID = shared.ID;
        const VARIATION = shared.VARIATION;

        const setup = () => {
            document.body.classList.add(ID + "-" + VARIATION);
        };

        const activate = () => {
            setup();

            const allCTAs = document.querySelectorAll('.buttons-wrapper .button-primary,.hero--copy .button-primary');
            allCTAs.forEach(cta => {
                cta.setAttribute('href', 'https://account.box.com/signup/enterprise-plan?tc=monthly');
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

        pollerLite(['.hero--copy .button-primary'], activate);

    } catch (e) {
        console.log(e, 'Error in Box-307 v1')
    }
})();