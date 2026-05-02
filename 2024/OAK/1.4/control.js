(() => {
    "use strict";

    try {
        document.addEventListener(`click`, (e) => {
            const el = e.target;

            if (el.closest(`.right-hand-menu [aria-controls="offCanvasFinance"]`)) {
                Kameleoon.API.Goals.processConversion(369059)
            }
        })
    } catch (err) {
        console.log(err);
    }

})();