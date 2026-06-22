(() => {
    try {
        const shared = {
            ID: "FE",
            VARIATION: "137-control",
            CLIENT: "Funnelenvy"
        };

        const ID = shared.ID;
        const VARIATION = shared.VARIATION;

        const setup = () => {
            // add clarity script
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.innerHTML = `(function(a,e,b,f,g,c,d){a[b]=a[b]||function(){(a[b].q=a[b].q||[]).push(arguments)};c=e.createElement(f);c.async=1;c.src="https://www.clarity.ms/tag/"+g;d=e.getElementsByTagName(f)[0];d.parentNode.insertBefore(c,d)})(window,document,"clarity","script","hiuhdldji1");`;
            document.body.appendChild(script);

            document.body.classList.add(ID + "-" + VARIATION);

           try {
                const employerHeader = document.querySelector('dhi-seds-nav-header-employer').shadowRoot;
                const displayHeader = employerHeader.querySelector('dhi-seds-nav-header-display').shadowRoot;
                const pricingLink = displayHeader.querySelector('#pricing-link');
                if (pricingLink) {
                    pricingLink.style.cssText = 'display: none;';
                }
            } catch (error) {
                console.log('Error accessing shadow DOM elements:', error);
            }

            document.addEventListener('click', (event) => {
                const elem = event.target;

                if (elem.closest('.cta-button-wrapper a[href*="/contact-us"]')) {
                    dataLayer.push({ 'event': 'FE_ABTest_hero_callout_hire_tech_talent' });
                }

                if (elem.closest('.cta-button-wrapper a[href*="/webstore"]')) {
                    dataLayer.push({ 'event': 'FE_ABTest_hero_callout_post_job' });
                }

                if (elem.closest('.pricing')) {
                    dataLayer.push({ 'event': 'FE_ABTest_top_nav_clicks_pricing' });
                }
            })
        };

  // Poller function to wait for required elements and shadow DOM elements
        const pollerLite = (conditions, shadowConditions, callback, maxTime = 20000) => {
            const POLLING_INTERVAL = 100;
            const startTime = Date.now();
            const interval = setInterval(() => {
                const allConditionsMet = conditions.every(condition => 
                    typeof condition === 'function' ? condition() : !!document.querySelector(condition)
                );
                const shadowReady = shadowConditions.every((cond) => cond());

                if (allConditionsMet && shadowReady) {
                    clearInterval(interval);
                    callback();
                } else if (Date.now() - startTime >= maxTime) {
                    clearInterval(interval);
                    console.log('Polling exceeded maximum time limit');
                }
            }, POLLING_INTERVAL);
        };

        // Define shadow DOM conditions
        const shadowConditions = [
            () => {
                const employer = document.querySelector('dhi-seds-nav-header-employer');
                return employer && employer.shadowRoot;
            },
            () => {
                const employer = document.querySelector('dhi-seds-nav-header-employer');
                const display = employer?.shadowRoot?.querySelector('dhi-seds-nav-header-display');
                return display && display.shadowRoot;
            },
            () => {
                const employer = document.querySelector('dhi-seds-nav-header-employer');
                const display = employer?.shadowRoot?.querySelector('dhi-seds-nav-header-display');
                return display?.shadowRoot?.querySelector('#pricing-link');
            }
        ];

        // Start polling for element and shadow DOM readiness
        pollerLite(['dhi-seds-nav-header-employer'], shadowConditions, setup);

    } catch (error) {
        console.log(`${error} Dice-137`);
    }
})();