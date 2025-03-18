(() => {
    try {
        /* main variables */
        const waitForElement = (selector, trigger) => {
            const interval = setInterval(() => {
                if (
                    document &&
                    document.querySelector(selector) &&
                    document.querySelectorAll(selector).length > 0
                ) {
                    clearInterval(interval);
                    trigger();
                }
            }, 50);
            setTimeout(() => {
                clearInterval(interval);
            }, 15000);
        }


        const setCookie = (cname, cvalue, exdays) => {
            let d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            let oldVal = getCookie(cname);
            if (oldVal && !oldVal.includes(cvalue)) {
                document.cookie = cname + "=" + cvalue + "|" + oldVal + ";secure;" + expires + ";domain=.box.com;path=/";
            }
        }

        const getCookie = (cname) => {
            let cookie = {};
            document.cookie.split(';').forEach(function (el) {
                let [key, value] = el.split('=');
                cookie[key.trim()] = value;
            })
            return cookie[cname];
        }


        const addSessionCookie = (sessionName, sessionValue) => {
            // Get the existing session data
            let existingSession = getCookie(sessionName);

            // Check if the new session value is not already in the existing data
            if (existingSession) {
                // Split the existing data into an array of values
                let sessionArray = existingSession.split('|');

                // Check if the new session value is not in the array
                if (!sessionArray.includes(sessionValue)) {
                    // Add the new session value to the array
                    sessionArray.push(sessionValue);
                    // Join the array back into a string with "|" separator
                    existingSession = sessionArray.join('|');
                }
            } else {
                // If no existing data, set the new value
                existingSession = sessionValue;
            }

            // Set the updated session data as a session cookie
            document.cookie = sessionName + '=' + existingSession + ';domain=.box.com;path=/';
        }

        /* Variation Init */
        const init = () => {
            document.addEventListener('click', function (e) {
                if (e.target.matches('.hero .buttons-wrapper a')) {
                    setCookie('opt_campaign', 'BOX-280-v0a', 365)
                }
            })

            addSessionCookie('opt_session', 'BOX-280-v0a');
        }

        /* Initialize variation */
        waitForElement(".hero .buttons-wrapper", init);
    } catch (e) {
        console.log(e, "error in Test");
    }
})();