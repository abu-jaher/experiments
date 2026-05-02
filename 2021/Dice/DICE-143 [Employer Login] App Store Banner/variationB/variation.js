(() => {
    try {
        const shared = {
            ID: "FE",
            VARIATION: "143",
            CLIENT: "Funnelenvy"
        };

        const ID = shared.ID;
        const VARIATION = shared.VARIATION;

        const closeIcon = `
            <svg height="18" version="1.1" width="18" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24">
            <line x1="4" y1="4" x2="20" y2="20" stroke="#fff" stroke-width="2"></line>
            <line x1="20" y1="4" x2="4" y2="20" stroke="#fff" stroke-width="2"></line>
            </svg>
        `;

        const storeBanner = `
            <div class="${ID}__store-banner">
                <div class="${ID}__banner-container">
                    <p>
                        <span>Try Dice Recruiter for iOS. </span>
                        <a href="https://apps.apple.com/us/app/dice-recruiter/id6480528745"><span>Download now</span></a>
                    </p>
                </div>
                <button class="${ID}__banner-close">${closeIcon}</button>
            </div>
        `;

        const setCookie = (name, value, days) => {
            let expires = "";
            if (days) {
                let date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }

        const getCookie = (name) => {
            let nameEQ = name + "=";
            let ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        const setup = () => {
            document.body.classList.add(ID + "-" + VARIATION);
            if (getCookie(`${ID}__store-banner`) !== 'true') {
                document.querySelector('body').insertAdjacentHTML('afterbegin', storeBanner);
            }

            document.querySelector(`.${ID}__banner-close`).addEventListener('click', () => {
                document.querySelector(`.${ID}__store-banner`).remove();
                setCookie(`${ID}__store-banner`, true, 365);
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
                    console.log('Polling exceeded maximum time limit');
                }
            }, POLLING_INTERVAL);
        };

        pollerLite(['body'], setup);

    } catch (error) {
        console.log(`${error} Dice-143`);
    }
})();