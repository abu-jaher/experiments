(() => {
    try {
        const shared = {
            ID: "FE-135-LP",
            VARIATION: "control",
            CLIENT: "funnelenvy"
        };

        const { ID, VARIATION } = shared;

        const setup = () => {
            document.documentElement.classList.add(`${ID}-${VARIATION}`);
            document.body.classList.add(`${ID}`);

            // add clarity script
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.innerHTML = `(function(a,e,b,f,g,c,d){a[b]=a[b]||function(){(a[b].q=a[b].q||[]).push(arguments)};c=e.createElement(f);c.async=1;c.src="https://www.clarity.ms/tag/"+g;d=e.getElementsByTagName(f)[0];d.parentNode.insertBefore(c,d)})(window,document,"clarity","script","hiuhdldji1");`;
            document.body.appendChild(script);
        };

        const activate = () => {
            setup();
        };

        const pollerLite = (conditions, callback, maxTime = 20000) => {
            const POLLING_INTERVAL = 500;
            const startTime = Date.now();
            const interval = setInterval(() => {
                const allConditionsMet = conditions.every(condition =>
                    typeof condition === 'function' ? condition() : !!document.querySelector(condition)
                );

                if (allConditionsMet) {
                    clearInterval(interval);
                    callback();
                } else if (Date.now() - startTime >= maxTime) {
                    clearInterval(interval);
                    console.log('Polling exceeded maximum time limit');
                }
            }, POLLING_INTERVAL);
        };

        pollerLite(['body'], activate);
    } catch (error) {
        console.log(`${error} Dice-135`);
    }
})();