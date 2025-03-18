(() => {
    try {
        const waitForElement = (selector, trigger, delayInterval, delayTimeout) => {
            const interval = setInterval(() => {
                if (
                    document &&
                    document.querySelector(selector) &&
                    document.querySelectorAll(selector).length > 0
                ) {
                    clearInterval(interval);
                    trigger();
                }
            }, delayInterval);
            setTimeout(() => {
                clearInterval(interval);
            }, delayTimeout);
        }

        /* Variation Init */
        const init = () => {
            const { body } = document;

            const targetedCTA = body.querySelector('#dismissableComponentAboveNavigation .banner-btn');

            targetedCTA.addEventListener('click', () => {
                // UA event tracker

                var dimension = 150;
                var tracker = '';
                if (window.ga && window.ga.getAll) {
                    if (tracker == '' || tracker == ' ') {
                        tracker = window.ga.getAll()[0].get('name');
                    }

                    window.ga(
                        tracker + '.set',
                        'dimension' + dimension,
                        'DICE-127-v0',
                    );

                    window.ga(
                        tracker + '.send',
                        'event',
                        'FunnelEnvy',
                        'DICE-127-v0',
                        {
                            Interaction: 1,
                        },
                    );

                }
            })
        }

        /* Initialize variation */
        if (location.pathname === '/') {
            waitForElement("#dismissableComponentAboveNavigation .banner-btn", init, 50, 15000);
        }
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();