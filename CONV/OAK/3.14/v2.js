((w) => {
    "use strict";

    const tag = "cv-3-14";
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const utils = window["conv"].utils;

    window[tag] = window[tag] || {
        init: () => {
            try {
                utils.waitUntil(() => document.body, 0).then((body) => {
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
        let lastScroll = document.documentElement.scrollTop || document.body.scrollTop;
        let isAnchorScroll = false;

        window[tag].scrollDetect();

        document.addEventListener('click', (e)=> {
            const anchor = e.target.closest('a[href^="#"]');
            if (anchor) {
                isAnchorScroll = true;
                setTimeout(() => {
                    isAnchorScroll = false;
                }, 1000);
            }
        });


        window.addEventListener("scroll", ()=> {
            if (isAnchorScroll) return;
            let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

            if (currentScroll > lastScroll) {
                document.body.classList.add(`${tag}__scrolling-down`);
                document.body.classList.remove(`${tag}__scrolling-up`);
                lastScroll = currentScroll;
            } else {
                document.body.classList.add(`${tag}__scrolling-up`);
                document.body.classList.remove(`${tag}__scrolling-down`);
                lastScroll = currentScroll;
            }

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

    window[tag].variation = "variation-2";
    window[tag].init();
})(window);
