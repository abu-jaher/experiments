((w) => {
    "use strict";

    const tag = 'cv-8-1';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 8.1 |') : () => { };

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

    const cv_aboutUs = `
        <div class="${tag}__aboutUs">
            <div class="container">
                <div class="${tag}__header">
                    <h3>Who is Taylor & Francis?</h3>
                </div>
                <div class="${tag}__body">
                    <div class="${tag}__content-section mobile">
                        <p class="description">
                            At Taylor & Francis we have been committed to scholarly excellence and integrity since our founding in 1798. As leading international publisher, we support a diverse global research community with over 2,600 journals, including a range of open access options.
                        </p>
                        <p class="description">
                            We are committed to maximizing the quality, dissemination and impact of academic research through expert review, innovation, and broad accessibility.
                        </p>
                    </div>
                    <div class="${tag}__stats-section">
                        <div class="stat-card">
                            <div class="stat-number">425 million</div>
                            <div class="stat-description">online article reads in 2024</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">6.4 million</div>
                            <div class="stat-description">article citations received during 2024</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">418,033</div>
                            <div class="stat-description">authors published with Taylor & Francis in 2024</div>
                        </div>
                        <a href="/why-publish-with-us" class="cta-button mobile">Learn more about publishing with us</a>
                    </div>
                    <div class="${tag}__content-section desktop">
                        <p class="description">
                            At Taylor & Francis we have been committed to scholarly excellence and integrity since our founding in 1798. As leading international publisher, we support a diverse global research community with over 2,600 journals, including a range of open access options.
                        </p>
                        <p class="description">
                            We are committed to maximizing the quality, dissemination and impact of academic research through expert review, innovation, and broad accessibility.
                        </p>
                        <a href="/why-publish-with-us" class="cta-button">Learn more about publishing with us</a>
                    </div>
                </div>
            </div>    
        </div>
    `;

    const initVariation = () => {
        utils.waitUntil(() => document.querySelector('.teasers.audiences'), 0).then((element) => {
            element.closest(`.widget`).insertAdjacentHTML(`beforebegin`, cv_aboutUs);
        });
    }

    utils.init();
})(window);