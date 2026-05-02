((w) => {
    "use strict";

    const tag = 'cv-9-1';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 9.1 |') : () => { };

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
    }

    const initVariation = () => {
        utils.waitUntil(() => document.querySelector('.top-nav-new-content-alert'), 0).then((element) => {
            const alertModule = element.closest(`.hnm--menu .hnm--item`);
            const list = alertModule.querySelector('ul');

            alertModule.classList.add(`${tag}-alertModule`);

            alertModule.firstElementChild.innerHTML = alertModule.firstElementChild.innerHTML.replace('Alerts &amp; RSS feed', 'Follow this journal');

            [...list.children].forEach(element => {
                element.innerHTML = element.innerHTML.replace('RSS', 'RSS feed');
            });
        });
    }

    utils.init();
})(window);