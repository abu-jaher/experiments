((w) => {
    "use strict";

    const tag = "cv-3-14";
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
        window[tag].scrollDetect();

        window.addEventListener("scroll", ()=> {
            window[tag].scrollDetect();
        });
    };

    window[tag].scrollDetect = () => {
        if (window.scrollY > 0) {
            document.body.classList.add(`${tag}__scrolled`);
        } else {
            document.body.classList.remove(`${tag}__scrolled`);
        }
    }

    window[tag].variation = "variation-1";
    window[tag].init();
})(window);