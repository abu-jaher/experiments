(() => {
    try {
        const shared = {
            ID: "FE",
            VARIATION: "137",
            CLIENT: "Funnelenvy"
        };

        const ID = shared.ID;
        const VARIATION = shared.VARIATION;

        const setupHP = () => {
            // add clarity script
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.innerHTML = `(function(a,e,b,f,g,c,d){a[b]=a[b]||function(){(a[b].q=a[b].q||[]).push(arguments)};c=e.createElement(f);c.async=1;c.src="https://www.clarity.ms/tag/"+g;d=e.getElementsByTagName(f)[0];d.parentNode.insertBefore(c,d)})(window,document,"clarity","script","hiuhdldji1");`;
            document.body.appendChild(script);


            document.body.classList.add(ID + "-" + VARIATION);
            document.querySelector(`.job-search-hero-b .cta-wrapper .title`).innerHTML = `Looking to hire tech talent?`;
            document.querySelector(`.job-search-hero-b .cta-wrapper .description p`).innerHTML = `Find a solution to fit your needs. `;
            document.querySelector(`.job-search-hero-b .cta-wrapper .cta-button-wrapper`).innerHTML = `<a href="https://www.dice.com/hiring/pricing" style="text-decoration:none;" class="FE-get-started"><button>Get Started</button></a>`;

            document.addEventListener('click', (event) => {
                const elem = event.target;

                if (elem.closest('.FE-get-started')) {
                    dataLayer.push({ 'event': 'FE_ABTest_hero_callout_get_started' });
                }

                if (elem.closest('.pricing')) {
                    dataLayer.push({ 'event': 'FE_ABTest_top_nav_clicks_pricing' });
                }
            })
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
                    consaole.log('Polling exceeded maximum time limit');
                }
            }, POLLING_INTERVAL);
        };

        if (location.pathname === '/') {
            pollerLite(['.job-search-hero-b .cta-wrapper .title'], setupHP);
        }

    } catch (error) {
        console.log(`${error} Dice-137`);
    }
})();