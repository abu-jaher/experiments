((w) => {
    "use strict";

    const tag = 'cv-4-21';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 4.21 |') : () => { };

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
                eventListenerFn();

                log('running v1');
            } catch (err) {
                log(err.message);
            }
        },
    }

    const fakeSearch = `
        <div class="${tag}__fake-search">
            <input name="AllField" value="" type="search" title="Type search term here" aria-label="Search" placeholder="Search this subject by keyword" autocomplete="off">
            <div class="quick-search-btn">
                <button class="mainSearchButton searchButtons pointer" type="submit" value="" title="Search" aria-label="Search"></button>
            </div>
        </div>
    `;

    const url = new URL(window.location.href);
    const params = url.searchParams;

    const initVariation = () => {

        utils.waitUntil(() => document.querySelector(`.allSubjectsHead .widget-body`), 0).then((element) => {
            element.insertAdjacentHTML(`afterend`, fakeSearch);
            document.querySelector(`.quickSearchWidget .quickSearchFormContainer .quickSearchForm`).insertAdjacentHTML('afterend', fakeSearch);
        });

    }

    const eventListenerFn = () => {
        document.addEventListener(`click`, (e) => {
            const el = e.target;

            if (el.closest(`.cv-4-21__fake-search .searchButtons`)) {
                const searchBtn = el.closest(`.cv-4-21__fake-search .searchButtons`);
                const getSearchValue = searchBtn.closest(`.cv-4-21__fake-search`).querySelector('input').value;

                if (!params.has('ConceptID')) {
                    const getConceptID = document.querySelector(`.save-search-dialog [name="ConceptID"]`).value;
                    params.set('AllField', getSearchValue);
                    params.set('ConceptID', getConceptID);
                    if(getSearchValue == ''){
                        window.location.href = `/action/doSearch?AllField=`;
                    }else{
                        window.location.href = `/action/doSearch?${params}${url.hash}`;
                    }
                } else {
                    document.querySelector(`.searchPageQSearchWrapper  input.searchText`).value = getSearchValue;
                    document.querySelector(`.searchPageQSearchWrapper  .searchButtons`).click();
                }
            }
        })

        document.addEventListener('keydown', (e) => {
            const activeElement = document.activeElement;
            const matchingInputs = document.querySelectorAll('.cv-4-21__fake-search input');
            matchingInputs.forEach((input) => {
                if (activeElement === input && e.key === 'Enter') {
                    input.closest(`.cv-4-21__fake-search`).querySelector(`.searchButtons`).click();
                }
            });
        });
    }

    utils.init();
})(window);