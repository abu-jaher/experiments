((w) => {
    "use strict";

    const tag = 'cv-2-26';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 2.26 |') : () => { };

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
                    initVariation();
                });

                log('running v2');
            } catch (err) {
                log(err.message);
            }
        },
    }

    const initVariation = () => {
        utils.waitUntil(() => document.querySelector(`.literatumArticleToolsWidget`), 0).then((ele) => {

            const href = document.querySelector('.serial-action .jHomepage').getAttribute('href');

            const cv_journalHP = `
                <div class="${tag}__journal-hp">
                    <a href="${href}" class="jHomepage"><span>Journal homepage</span></a>
                </div>
            `;

            ele.insertAdjacentHTML('afterend', cv_journalHP);
        });
    }

    utils.init();
})(window);