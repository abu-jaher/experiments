((w) => {
    "use strict";

    const tag = "cv-payment-cta";
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const utils = window["conv"].utils;

    window[tag] = window[tag] || {
        init: () => {
            try {
                utils.waitUntil((() => document.body), 0).then((body) => {
                    body.classList.add(tag);
                });
                window[tag].initVariation();
                console.log(`${window[tag].variation} is running`);
            } catch (err) {
                console.log(err, tag);
            }
        },
    };

    if (window[tag].variation) return;
    window[tag].initVariation = () => {
        utils.waitUntil((() => document.querySelector('.payment-buttons')), 0).then((element) => {
            const ref = document.querySelector('#summary-cards-ifc-mobile');
            ref.insertAdjacentElement('beforebegin', element);
            element.classList.add(`${tag}-buttons`);
        });
    };

    window[tag].variation = "Surfacing PayPal on mobile cart";
    window[tag].init();
})(window);