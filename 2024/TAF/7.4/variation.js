((w) => {
    "use strict";

    const tag = 'cv-7-4';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 7.4 |') : () => { };

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

    const isMobile = () => {
        return /Mobi|Android/i.test(navigator.userAgent) && !/iPad/i.test(navigator.userAgent);
    }

    const initVariation = () => {
        utils.waitUntil(() => document.querySelector('.kwd-title'), 0).then(() => {
            if (!isMobile()) {
                document.querySelectorAll('.kwd-title').forEach((element)=>{
                    element.innerText = element.innerText.replace(/:+/g, '');
                })
                document.body.classList.add(`${tag}__desktop`);
            } else{
                document.querySelectorAll('.kwd-title').forEach((element)=>{
                    element.innerText = element.innerText.replace('::', ':');
                }) 
            }
        });
    }

    utils.init();
})(window);