((w) => {
    "use strict";

    const tag = 'cv-1-0';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] JDS 1.0 |') : () => { };

    const utils = {
        waitUntil: (condition, wait = 6000) => {
            return new Promise((resolve, reject) => {
                let stop = false;

                const timeout =
                    wait &&
                    setTimeout(() => {
                        stop = true;
                        reject(new Error('Timeout waiting for condition'));
                    }, wait);

                const check = () => {
                    if (stop) return;
                    if (!condition()) return requestAnimationFrame(check);

                    clearTimeout(timeout);
                    resolve(condition());
                };

                requestAnimationFrame(check);
            });
        },

        init: () => {
            try {
                utils.waitUntil(() => document.body, 0).then((docBody) => {
                    docBody.classList.add(tag);
                });

                initVariation();

                log('running v1');
            } catch (err) {
                log(err.message);
            }
        },
    };

    const initVariation = () => {

        utils.waitUntil(() => document.querySelector(`.itemPrices`) && document.querySelector(`.klarna .bnpl-graph-price`), 0).then(() => {

            if (document.querySelector(`.${tag}__price-reframing`)) return;
            const getPrice = document.querySelector(`.klarna .bnpl-graph-price`).textContent;
            const priceFraming = `
                <div class="${tag}__price-reframing">
                    <div>
                        <span class="${tag}__price">Make 3 payments of <strong>${getPrice}.</strong></span>
                        <span class="${tag}__learn-more">Learn more</span>
                    </div>
                    <p class="${tag}__text">Interest-free payments.</p>
                </div>
            `;
            document.querySelector(`.itemPrices`).insertAdjacentHTML(`beforeend`, priceFraming);

            if (document.querySelector(`#productPage div.itemPrices .was`)) {
                document.querySelector(`#productPage div.itemPrices`).classList.add(`${tag}__offered`);
            }

            document.querySelector(`.${tag}__learn-more`).addEventListener(`click`, () => {
                document.querySelector(`#openBnpl`).click();
            });
        });
    };

    utils.init();
})(window);