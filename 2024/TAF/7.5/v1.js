((w) => {
    "use strict";

    const tag = 'cv-7-5';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, `[CONV] TAF 7.5 |`) : () => { };

    const utils = {
        waitUntil: (condition, wait = 6000) => {
            return new Promise((resolve, reject) => {
                let stop = false;
                const timeout = wait && setTimeout(() => { stop = true; reject(new Error('Timeout')); }, wait);
                const check = () => {
                    if (stop) return;
                    if (!condition()) return requestAnimationFrame(check);
                    clearTimeout(timeout);
                    resolve(condition());
                };
                requestAnimationFrame(check);
            });
        },
        setCookie: (name, value, days = 1) => {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = "; expires=" + date.toUTCString();
            const stringValue = JSON.stringify(value);
            document.cookie = name + "=" + encodeURIComponent(stringValue) + expires + "; path=/; SameSite=Lax";
        },
        getCookie: (name) => {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i].trim();
                if (c.indexOf(nameEQ) === 0) {
                    const cookieVal = decodeURIComponent(c.substring(nameEQ.length));
                    try { return JSON.parse(cookieVal); } catch (e) { return null; }
                }
            }
            return null;
        },
        init: () => {
            try {
                utils.waitUntil(() => document.body, 0).then(() => {
                    document.body.classList.add(tag);
                    initVariation();
                });
                log('running v1');
            } catch (err) {
                log(err.message);
            }
        },
    };

    const processArticleHistory = () => {
        let stagedArticle = utils.getCookie(`${tag}__staged_article`);
        let recentList = utils.getCookie(`${tag}__recent_list`) || [];

        if (stagedArticle) {
            recentList = recentList.filter(item => item.url !== stagedArticle.url);
            recentList.unshift(stagedArticle);
            utils.setCookie(`${tag}__recent_list`, recentList.slice(0, 10));
            utils.setCookie(`${tag}__staged_article`, null, -1);
        }

        utils.waitUntil(() => document.querySelector(`.NLM_contrib-group .author`) && document.querySelector('.NLM_article-title.hlFld-title') && document.querySelector(`.itemPageRangeHistory`), 0).then(() => {
            const titleEl = document.querySelector('[name="dc.Title"]');
            const currentTitle = titleEl.getAttribute('content');

            const currentUrl = window.location.pathname;
            const authorLinks = document.querySelectorAll('.NLM_contrib-group .author');

            const currentArticleData = {
                title: currentTitle,
                authors: Array.from(authorLinks).map(a => a.textContent.trim()).join(', '),
                date: (() => {
                    const h = document.querySelector('.itemPageRangeHistory');
                    const s = h ? Array.from(h.querySelectorAll('span')).find(x => x.textContent.includes('Published online:')) : null;
                    return s ? s.textContent.split('Published online:')[1].trim() : 'Date unknown';
                })(),
                url: currentUrl
            };

            recentList = recentList.filter(item => item.url !== currentUrl);
            utils.setCookie(`${tag}__recent_list`, recentList);
            utils.setCookie(`${tag}__staged_article`, currentArticleData);
        });
    };

    const renderHistoryItems = () => {
        const history = utils.getCookie(`${tag}__recent_list`) || [];
        if (history.length === 0) return `<p class="${tag}__empty">No recently viewed articles yet.</p>`;

        return history.map(item => `
            <a href="${item.url}" class="${tag}__history-item">
                <h3 class="${tag}__history-title">${item.title}</h3>
                <p class="${tag}__history-author">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12.6673 14V12.6667C12.6673 11.9594 12.3864 11.2811 11.8863 10.781C11.3862 10.281 10.7079 10 10.0007 10H6.00065C5.29341 10 4.61513 10.281 4.11503 10.781C3.61494 11.2811 3.33398 11.9594 3.33398 12.6667V14" stroke="#666666" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.00065 7.33333C9.47341 7.33333 10.6673 6.13943 10.6673 4.66667C10.6673 3.19391 9.47341 2 8.00065 2C6.52789 2 5.33398 3.19391 5.33398 4.66667C5.33398 6.13943 6.52789 7.33333 8.00065 7.33333Z" stroke="#666666" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <span>${item.authors}</span>
                </p>
                <p class="${tag}__history-publish">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5.33398 1.3335V4.00016" stroke="#666666" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.666 1.3335V4.00016" stroke="#666666" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.6667 2.66666H3.33333C2.59695 2.66666 2 3.26361 2 3.99999V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V3.99999C14 3.26361 13.403 2.66666 12.6667 2.66666Z" stroke="#666666" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 6.66666H14" stroke="#666666" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <span>Published online: ${item.date}</span>
                </p>
            </a>
        `).join('');
    };

    const getModalHTML = () => `
        <div class="${tag}__history-modal">
            <div class="${tag}__overlay"></div>
            <div class="${tag}__modal-body">
                <div class="${tag}__modal-heading">
                    <h3>Reading history</h3>
                    <p>Your recently viewed articles</p>
                    <svg tabindex="0" class="${tag}__modal-close" width="24" height="24" viewBox="0 0 24 24" fill="none" cursor="pointer">
                        <path d="M17.9976 5.99927L5.99902 17.9978" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5.99902 5.99927L17.9976 17.9978" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="${tag}__modal-content">
                    <div class="${tag}__content-wrap">
                        <div class="${tag}__history-list">
                            ${renderHistoryItems()}
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    const initVariation = () => {
        utils.waitUntil(() => document.querySelector('.eCommerceCartIndicatorWidget'), 0).then((ele) => {
            if (document.querySelector(`.${tag}__history-widget`)) return;
            processArticleHistory();

            const recentList = utils.getCookie(`${tag}__recent_list`) || [];
            const isEmpty = recentList.length === 0;

            const cv_historyBtn = `
            <div class="${tag}__history-widget widget none ${isEmpty ? `${tag}__empty-state` : ''}">
                <div class="wrapped">
                    <div class="${tag}__widget-body widget-body">
                        <a class="${tag}__Label" tabindex="0" role="button">
                            <span class="${tag}__history-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 12C3 13.78 3.52784 15.5201 4.51677 17.0001C5.50571 18.4802 6.91131 19.6337 8.55585 20.3149C10.2004 20.9961 12.01 21.1743 13.7558 20.8271C15.5016 20.4798 17.1053 19.6226 18.364 18.364C19.6226 17.1053 20.4798 15.5016 20.8271 13.7558C21.1743 12.01 20.9961 10.2004 20.3149 8.55585C19.6337 6.91131 18.4802 5.50571 17.0001 4.51677C15.5201 3.52784 13.78 3 12 3C9.48395 3.00947 7.06897 3.99122 5.26 5.74L3 8" stroke="#10147E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M3 3V8H8" stroke="#10147E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 7V12L16 14" stroke="#10147E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </span>
                        </a>
                        <div class="${tag}__notification-tooltip">
                            <div class="${tag}__tooltip-arrow"></div>
                            <svg class="${tag}__tooltip-close" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 4L10 10M4 16L10 10M10 10L16 16M10 10L4 4" stroke="white" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            <p>Click to revisit your <br>recently viewed articles</p>
                        </div>
                    </div>
                </div>
            </div>`;

            ele.insertAdjacentHTML(`afterend`, cv_historyBtn);

            const widget = document.querySelector(`.${tag}__history-widget`);
            const widgetBody = document.querySelector(`.${tag}__widget-body`);

            if (!isEmpty && !utils.getCookie(`${tag}__session_notified`)) {
                widgetBody.classList.add(`${tag}__show-notification`);
            }

            if (utils.getCookie(`${tag}__tooltip_hidden`)) {
                widgetBody.classList.add(`${tag}__hide-tooltip-only`);
            }

            document.addEventListener(`click`, (e) => {
                const el = e.target;

                if (el.closest(`.${tag}__tooltip-close`)) {
                    widgetBody.classList.add(`${tag}__hide-tooltip-only`);
                    document.cookie = `${tag}__tooltip_hidden=true; path=/`;
                }

                if (el.closest(`.${tag}__Label`)) {
                    if (widget.classList.contains(`${tag}__empty-state`)) return;
                    widgetBody.classList.remove(`${tag}__show-notification`);
                    document.cookie = `${tag}__session_notified=true; path=/`;

                    const existingModal = document.querySelector(`.${tag}__history-modal`);
                    if (existingModal) existingModal.remove();
                    document.body.insertAdjacentHTML(`beforeend`, getModalHTML());

                    const modal = document.querySelector(`.${tag}__history-modal`);
                    modal.classList.add(`${tag}__active`);
                }

                if (el.closest(`.${tag}__modal-close`) || el.closest(`.${tag}__overlay`)) {
                    const modal = document.querySelector(`.${tag}__history-modal`);
                    if (modal) {
                        modal.classList.remove(`${tag}__active`);
                        setTimeout(() => modal.remove(), 300);
                    }
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    if (e.target.closest(`.${tag}__modal-close`)) {
                        const modal = document.querySelector(`.${tag}__history-modal`);
                        if (modal) {
                            modal.classList.remove(`${tag}__active`);
                            setTimeout(() => modal.remove(), 300);
                        }
                    }
                    if (e.target.closest(`.${tag}__tooltip-close`)) {
                        widgetBody.classList.add(`${tag}__hide-tooltip-only`);
                        document.cookie = `${tag}__tooltip_hidden=true; path=/`;
                    }
                    if (e.target.closest(`.${tag}__Label`)) {
                        e.target.closest(`.${tag}__Label`).click();
                    }
                }
            });
        });
    }

    utils.init();
})(window);