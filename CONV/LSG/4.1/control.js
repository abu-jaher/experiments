((w) => {
    "use strict";

    const tag = "cv-4-1";
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const utils = window["cv-pjs"];

    if (window[tag].variation) return;

    window[tag].initVariation = () => { };

    window[tag].variation = "control";
    window[tag].init();
})(window);