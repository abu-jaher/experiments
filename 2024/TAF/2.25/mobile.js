((w) => {
    "use strict";

    const tag = 'cv-2-25';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 2.25 |') : () => { };

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

    const cv_module = `
        <div class="${tag}__journal-module">
            <div class="${tag}__journal-content">
                <h3>Subscribe to updates</h3>
                <p>Stay informed when new research is published in this journal</p>
                <a class="top-nav-new-content-alert">
                    <i aria-hidden="true" class="fa fa-envelope"></i>New content alerts
                </a>
            </div>
        </div>
    `;

    const initVariation = () => {
        const pathClassMap = {
            "collections": {
                selector: `h1 + p`,
                className: `${tag}__collection-page`
            },
            "showAxaArticles": {
                selector: `h1 + p`,
                className: `${tag}__xaArticles-page`
            },
            "current": {
                selector: `.all-issues-link`,
                className: `${tag}__current-page`
            },
            "loi": {
                selector: `h1 + p`,
                className: `${tag}__loi-page`
            },
            "special-issues": {
                selector: `h1 + p`,
                className: `${tag}__specialIssues-page`
            },
            "showOpenAccess": {
                selector: `h1`,
                className: `${tag}__openAccess-page`
            },
            "showMostReadArticles": {
                selector: `h1 + div`,
                className: `${tag}__mostRead-page`
            },
            "showMostCitedArticles": {
                selector: `.general-heading + div`,
                className: `${tag}__mostCited-page`
            },
        };

        Object.values(pathClassMap).forEach(({ className }) => {
            document.body.classList.remove(className);
        });

        const currentPath = window.location.pathname.toLowerCase();
        const matchedEntry = Object.entries(pathClassMap).find(([path]) => currentPath.includes(path.toLowerCase()));
        const matched = matchedEntry && matchedEntry[1];

        if (matched) {
            document.body.classList.add(matched.className);
            utils.waitUntil(() => document.querySelector(matched.selector), 0).then((ele) => {
                ele.insertAdjacentHTML('afterend', cv_module);
            });

            utils.waitUntil(() => document.querySelector(`#browse-journal`), 0).then((ele) => {
                ele.insertAdjacentHTML('beforebegin', cv_module);
            });

            document.addEventListener('click',(e)=>{
                if(e.target.closest(`.cv-2-25__journal-content a`)){
                    document.querySelector(`.hnm--item__dropdown-content .top-nav-new-content-alert`).click();
                }
            })
        }
    }

    utils.init();
})(window);