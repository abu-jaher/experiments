((w) => {
    "use strict";

    const tag = "cv-5-4";
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const utils = window["conv"].utils;

    window[tag] = window[tag] || {
        init: () => {
            try {
                utils.waitUntil((() => document.body), 0).then((body) => {
                    body.classList.add(tag);
                    window[tag].initVariation();
                    window[tag].eventListener();
                });
                console.log(`${window[tag].variation} is running`, tag);
            } catch (err) {
                console.log(err, tag);
            }
        },
    };

    if (window[tag].variation) return;

    const trustPilotWidget = `
        <!-- TrustBox widget - Drop-Down --> 
            <div class="trustpilot-widget" data-locale="en-GB" data-template-id="5418052cfbfb950d88702476" data-businessunit-id="487b7716000064000502e479" data-style-height="30px" data-style-width="100%" data-tags="Web_TB" data-stars="3,4,5" data-review-languages="en" data-font-family="Montserrat" data-text-color="#302D2D"> 
                <a href="https://uk.trustpilot.com/review/www.oakfurnitureland.co.uk" target="_blank" rel="noopener">Trustpilot</a> 
            </div> 
        <!-- End TrustBox widget -->
    `;

    function checkMediaWidth(mediaQueryString) {
        return window.matchMedia(mediaQueryString).matches;
    }

    window[tag].initVariation = () => {
        if (checkMediaWidth('(min-width: 1024px)')) {
            utils.waitUntil((() => document.querySelector(`.show-for-large .trustpilot-widget`)), 0).then((element) => {
                element.outerHTML = trustPilotWidget;
            });
        } else {
            utils.waitUntil((() => document.querySelector(`.reviews .trustpilot-widget`)), 0).then((element) => {
                element.outerHTML = trustPilotWidget;
            });
        }
    };

    window[tag].eventListener = () => {
        document.addEventListener(`click`, (e) => {
            const el = e.target;

        })
    }

    window[tag].variation = "variation-1";
    window[tag].init();
})(window);