((w) => {
    "use strict";

    const tag = "cv-3-7";
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const utils = window["conv"].utils;

    window[tag] = window[tag] || {
        init: () => {
            try {
                utils.waitUntil((() => document.body), 0).then((body) => {
                    body.classList.add(tag);
                    window[tag].initVariation();
                });
                console.log(`${window[tag].variation} is running`, tag);
            } catch (err) {
                console.log(err, tag);
            }
        },
    };

    if (window[tag].variation) return;

    window[tag].initVariation = () => {
        let triggered = false;

        utils.waitUntil((() => document.querySelector('.product-display-default-partial-accordion')), 0).then((element) => {
            document.querySelector('#carousel').insertAdjacentElement('beforeend', element)
        });

        utils.waitUntil((() => document.querySelector('#ugc-product-gallery')), 0).then((element) => {
            const targetElement = element.closest('.cell');
            document.querySelector('#carousel').insertAdjacentElement('beforeend', targetElement);
        });

        utils.waitUntil((() => document.querySelector('#pdp-recommended-heading')), 0).then((element) => {
            document.querySelector('#carousel').insertAdjacentElement('beforeend', element)
        });

        utils.waitUntil((() => document.querySelector('#hits')), 0).then((element) => {
            document.querySelector('#carousel').insertAdjacentElement('beforeend', element)
        });


        let lastScroll = document.documentElement.scrollTop || document.body.scrollTop;

        window.addEventListener("scroll", () => {
            let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const viewPortHeight = window.innerHeight;
            const stickyElement = document.querySelector(`#purchase-info > div`);
            const scrollSpeed = Math.abs(currentScroll - lastScroll);
            let currentPosition = parseInt(stickyElement.style.top || '200');

            let targetPosition;
            if (currentScroll > lastScroll && viewPortHeight < (stickyElement.offsetHeight + 200)) {
                targetPosition = viewPortHeight - stickyElement.offsetHeight;
            } else {
                targetPosition = 200;
            }

            const distanceToTarget = Math.abs(targetPosition - currentPosition);
            const step = Math.max(1, Math.min(scrollSpeed, distanceToTarget));

            if (currentPosition < targetPosition) {
                currentPosition += step;
            } else if (currentPosition > targetPosition) {
                currentPosition -= step;
            }

            stickyElement.style.top = `${currentPosition}px`;

            lastScroll = currentScroll;

            if (window[tag].elementWithinViewPort(`#returns-panel-label`) && triggered == false) {
                Kameleoon.API.Goals.processConversion(368018)
                triggered = true
            }

        });
    };

    window[tag].elementWithinViewPort = (selector) => {
        const element = document.querySelector(selector);
        if (element) {
            const rect = element.getBoundingClientRect();
            const isVisible = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= window.innerHeight &&
                rect.right <= window.innerWidth
            );

            if (isVisible) {
                return true;
            }
        }
    }

    window[tag].variation = "variation-1";
    window[tag].init();
})(window);