(() => {
    try {
        const setup = () => {
            document.querySelector('#HERO-Block2-Top h1').innerHTML = document.querySelector('#HERO-Block2-Top h1').innerHTML.replace(/&nbsp;/g, ' ');
        };

        const observeElement = (selector, callback) => {
            const waitForBody = () => {
                if (document.body) {
                    startObserving();
                } else {
                    setTimeout(waitForBody, 10);
                }
            };

            const startObserving = () => {
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

            waitForBody();
        };

        observeElement('#HERO-Block2-Top h1', setup);

    } catch (error) {
        console.log(`${error} BT-19`);
    }
})();