((w) => {
    "use strict";

    const tag = "cv-6-2";
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const utils = window["cv-pjs"] ? window["cv-pjs"].utils : undefined;

    if (!utils) return;

    window[tag] = window[tag] || {
        init: () => {
            try {
                utils.apply(
                    () => {
                        return !document.querySelector(`body:not(.${tag})`);
                    },

                    () => {
                        document.body.classList.add(`${tag}`);
                    },

                    tag,
                    15000
                );

                window[tag].initVariation();
                window[tag].initTracking();

                utils.log(`${window[tag].variation} is running`, tag);
            } catch (err) {
                utils.log(err, tag);
            }
        },

        initTracking: () => {
            // TO DO: custom metrics for both control and variation(s):
        },
    };
})(window);