((w) => {
    "use strict";

    const tag = 'cv-5-19';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 5.19 |') : () => { };

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

    const insertNewCta = () => {
        const targetElement = document.querySelectorAll('.pb-dropzone .widget');
        targetElement.forEach((e) => {
            if (e.querySelector('.btn') && (!e.nextElementSibling || !e.nextElementSibling.classList.contains('cv-5-19__recommended'))) {
                const cv_cta = `
                <div class="${tag}__recommended">
                    <div class="${tag}__recommended-cta-wrap">
                        <a href="${getMltUrl()}" class="btn ${tag}__recommended-cta" tabindex="0">
                            <span class="bold">View</span> recommended articles
                        </a>
                    </div>
                </div>
                `;

                e.insertAdjacentHTML('afterend', cv_cta);
            }
        })
    }

    const getMltUrl = () => {
        const doiElement = document.querySelector('.dx-doi a');
        return doiElement ? `https://www.tandfonline.com/doi/mlt/${doiElement.getAttribute('href').replace('https://doi.org/', '')}` : '';
    }

    const initVariation = () => {

        utils.waitUntil(() => document.querySelector('.pb-dropzone a'), 0).then(() => {
            insertNewCta();
            document.addEventListener('scroll', insertNewCta);
        });
    }

    utils.init();

})(window);