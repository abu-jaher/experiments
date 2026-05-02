(() => {
    try {

        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-KXRV2ZSBC6', {
            send_page_view: false
        });

        const activate = () => {
            document.addEventListener('click', (e) => {
                const el = e.target;
                if (el.closest('[data-columns][data-columns="3"] > div:first-of-type a')) {
                    console.log('essentials_request_pricing_click');
                    gtag('event', 'essentials_request_pricing_click');
                }

                if (el.closest('[data-columns][data-columns="3"] > div:nth-of-type(2) a')) {
                    console.log('pro_request_pricing_click');
                    gtag('event', 'pro_request_pricing_click');
                }

                if (el.closest('[data-columns][data-columns="3"] > div:nth-of-type(3) a')) {
                    console.log('enterprise_request_pricing_click');
                    gtag('event', 'enterprise_request_pricing_click');
                }

            })
        };

        const pollerLite = (conditions, callback, maxTime) => {
            if (maxTime === void 0) { maxTime = 10000; }
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

        pollerLite(['body'], activate);

    } catch (e) {
        console.log(e, 'Error in BT-15 event js')
    }
})();