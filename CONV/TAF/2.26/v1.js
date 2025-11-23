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

                log('running v1');
            } catch (err) {
                log(err.message);
            }
        },
    }




    const initVariation = () => {
        utils.waitUntil(() => document.querySelector(`.literatumArticleToolsWidget`) && document.querySelector(`.serial-action .submitAnArticle`), 0).then((ele) => {

            const href = document.querySelector('.serial-action .submitAnArticle').getAttribute('href');
            const url = new URL(href);
            const journalCode = url.searchParams.get('journalCode');

            const cv_dropdown = `
                <div class="${tag}__submit-article">
                    <button class="${tag}_btn">
                        <span>Submit an article</span>
                        <i aria-hidden="true" class="fa fa-angle-down"></i>
                    </button>
                    <div class="${tag}__dropdown-content">
                        <ul>
                            <li class="sub-heading">
                                <a href="https://rp.tandfonline.com/submission/create?journalCode=${journalCode}" role="button" target="_blank" class="${tag}__submitAnArticle">
                                    Go to submission site
                                    <i aria-hidden="true" class="fa fa-external-link"></i>
                                </a>
                                <p class="sub-msg">Start a new submission or continue a submission in progress</p>

                            </li>
                            <li>
                                <a href="/journals/${journalCode}/about-this-journal" class="${tag}__about-journal">About this journal</a>
                            </li>
                            <li>
                                <a href="/action/authorSubmission?show=instructions&journalCode=${journalCode}" class="${tag}__IFA">Instructions for authors</a>
                            </li>
                        </ul>
                    </div>
                </div>
            `;

            document.querySelector(`.literatumArticleToolsWidget`).insertAdjacentHTML('afterend', cv_dropdown);
            document.querySelector(`.serial-action .submitAnArticle`).insertAdjacentHTML('afterend', cv_dropdown)
        });

        document.addEventListener(`click`, (e) => {
            const el = e.target;

            if (el.closest(`.cv-2-26_btn`)) {
                el.closest(`.cv-2-26__submit-article`).classList.toggle(`active`);
            }

            if (!el.closest(`.cv-2-26__submit-article`)) {
                document.querySelectorAll(`.cv-2-26__submit-article`).forEach((el) => {
                    el.classList.remove(`active`);
                })
            }
        })
    }

    utils.init();
})(window);