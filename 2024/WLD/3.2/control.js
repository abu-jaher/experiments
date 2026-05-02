((w) => {
    "use strict";

    const tag = "cv-3-2";
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const utils = window["cv-pjs"];

    if (window[tag].variation) return;

    window[tag].initVariation = () => { };

    window[tag].variation = "control";
    window[tag].init();
})(window);