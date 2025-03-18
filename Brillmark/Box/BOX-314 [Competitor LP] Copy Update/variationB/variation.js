(() => {
    try {
        const shared = {
            ID: "FE",
            VARIATION: "314",
            CLIENT: "Funnelenvy"
        };

        const ID = shared.ID;
        const VARIATION = shared.VARIATION;

        const setup = () => {
            document.body.classList.add(ID + "-" + VARIATION);
        };

        const activate = () => {
            setup();

            document.querySelector('.hero--copy .button-primary').textContent = 'Start your free trial';
            document.querySelector('.hero--copy .button-primary').setAttribute('href', 'https://account.box.com/signup/business-plus?tc=monthly');

            observeElement('.hero--copy h3', () => {
                document.querySelector('.hero--copy h3').textContent = 'Start your 14 days free trial';
            });
        };

        const observeElement = (selector, callback) => {
            const targetNode = document.querySelector(selector);
            if (targetNode) {
                callback();
                return;
            }

            const observer = new MutationObserver((mutations, obs) => {
                if (document.querySelector(selector)) {
                    callback();
                    obs.disconnect();
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
        };

        observeElement('.hero--copy .button-primary', activate);

    } catch (e) {
        console.log(e, 'Error in Box-314 v1')
    }
})();