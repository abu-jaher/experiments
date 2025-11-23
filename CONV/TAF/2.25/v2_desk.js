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
                if (window.innerWidth < 1025) return;
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

    const addBodyClass = () => {
        const pathClassMap = {
            "collections": `${tag}__collection-page`,
            "showAxaArticles": `${tag}__xaArticles-page`,
            "current": `${tag}__current-page`,
            "loi": `${tag}__loi-page`,
            "special-issues": `${tag}__specialIssues-page`,
            "showOpenAccess": `${tag}__openAccess-page`,
            "showMostReadArticles": `${tag}__mostRead-page`,
            "showMostCitedArticles": `${tag}__mostCited-page`,
        };

        Object.values(pathClassMap).forEach(cls => document.body.classList.remove(cls));

        const currentPath = window.location.pathname.toLowerCase();
        const matchedEntry = Object.entries(pathClassMap).find(([path]) => currentPath.includes(path.toLowerCase()));
        const matchedClass = matchedEntry && matchedEntry[1];

        if (matchedClass) document.body.classList.add(matchedClass);
    };

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
        utils.waitUntil(() => document.querySelector(`#browse-journal`), 0).then((ele) => {
            ele.insertAdjacentHTML('beforebegin', cv_module);
            addBodyClass();
        });

        document.addEventListener('click',(e)=>{
            if(e.target.closest(`.cv-2-25__journal-content a`)){
                document.querySelector(`.hnm--item__dropdown-content .top-nav-new-content-alert`).click();
            }
        })
    }

    utils.init();
})(window);