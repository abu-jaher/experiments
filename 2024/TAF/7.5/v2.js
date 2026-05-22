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
                    try { return JSON.parse(cookieVal); } catch (e) { return []; }
                }
            }
            return [];
        },
        init: () => {
            try {
                utils.waitUntil(() => document.body, 0).then(() => {
                    document.body.classList.add(tag);
                    initVariation();
                });
                log('running v2');
            } catch (err) {
                log(err.message);
            }
        },
    };

    const processArticleHistory = () => {
        let stagedArticle = utils.getCookie(`${tag}__staged_article`);
        let stagedRecommend = utils.getCookie(`${tag}__staged_recommend`);
        let recentList = utils.getCookie(`${tag}__recent_list`) || [];
        let recommendList = utils.getCookie(`${tag}__recommend_list`) || [];

        if (stagedArticle && Object.keys(stagedArticle).length > 0) {
            const stagedTitle = stagedArticle.title.toLowerCase();
            recommendList = recommendList.filter(item => 
                !item.title.toLowerCase().includes(stagedTitle) && 
                !stagedTitle.includes(item.title.toLowerCase())
            );
            recentList = recentList.filter(item => item.url !== stagedArticle.url);
            recentList.unshift(stagedArticle);
            utils.setCookie(`${tag}__recent_list`, recentList.slice(0, 10));
            utils.setCookie(`${tag}__recommend_list`, recommendList);
            utils.setCookie(`${tag}__staged_article`, null, -1);
        }

        if (stagedRecommend && Object.keys(stagedRecommend).length > 0) {
            const lowerRecTitle = stagedRecommend.title.toLowerCase();

            const isDupHistory = recentList.some(item =>
                item.title.toLowerCase().includes(lowerRecTitle) || lowerRecTitle.includes(item.title.toLowerCase())
            );
            const isDupRec = recommendList.some(item =>
                item.title.toLowerCase().includes(lowerRecTitle) || lowerRecTitle.includes(item.title.toLowerCase())
            );

            if (!isDupHistory && !isDupRec) {
                recommendList.unshift(stagedRecommend);
                utils.setCookie(`${tag}__recommend_list`, recommendList.slice(0, 10));
            }
            utils.setCookie(`${tag}__staged_recommend`, null, -1);
        }

        utils.waitUntil(() => document.querySelector(`.NLM_contrib-group .author`) && document.querySelector('.NLM_article-title.hlFld-title') && document.querySelector(`.itemPageRangeHistory`), 0).then(() => {
            const titleEl = document.querySelector('[name="dc.Title"]');
            const currentTitle = titleEl.getAttribute('content');
            const lowerCurrentTitle = currentTitle.toLowerCase();

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

            recommendList = recommendList.filter(item =>
                !item.title.toLowerCase().includes(lowerCurrentTitle) && !lowerCurrentTitle.includes(item.title.toLowerCase())
            );
            recentList = recentList.filter(item => item.url !== currentUrl);

            utils.setCookie(`${tag}__recommend_list`, recommendList);
            utils.setCookie(`${tag}__recent_list`, recentList);

            utils.setCookie(`${tag}__staged_article`, currentArticleData);

            utils.waitUntil(() => document.querySelector(`.tab-pane.active .ajaxWidget .cards-container .article-card, .recommended-articles-widget.active .hum-recommendations-row`), 0).then(() => {
                const firstRecCard = document.querySelector('.tab-pane.active .ajaxWidget .cards-container .article-card, .recommended-articles-widget.active .hum-recommendations-row');
                if (!firstRecCard) return;

                const recLink = firstRecCard.querySelector('.header a') || firstRecCard;
                const recTitle = recLink.querySelector(`.hum-recommendations-content-title`)?.textContent.replace(/\.\.\.*$/, "").trim() || recLink?.textContent.replace(/\.\.\.*$/, "").trim();
                const lowerRecTitle = recTitle.toLowerCase();

                const recAuthors = Array.from(firstRecCard.querySelectorAll('a[href*="/author/"]')).map(a => a.textContent.trim()).join(', ') || recLink.querySelector(`.hum-recommendations-content-details-author`)?.textContent.trim();
                const recDate = (() => {
                    const d = firstRecCard.querySelector('.published-date');
                    return d ? d.textContent.split('Published online:')[1].trim() : recLink.querySelector(`.hum-recommendations-content-details-date`)?.textContent.trim();
                })();

                const latestRecent = utils.getCookie(`${tag}__recent_list`) || [];
                const latestRecommend = utils.getCookie(`${tag}__recommend_list`) || [];

                const isAlreadyRecent = latestRecent.some(item =>
                    item.title.toLowerCase().includes(lowerRecTitle) || lowerRecTitle.includes(item.title.toLowerCase())
                );
                const isAlreadyInRec = latestRecommend.some(item =>
                    item.title.toLowerCase().includes(lowerRecTitle) || lowerRecTitle.includes(item.title.toLowerCase())
                );

                if (!isAlreadyRecent && !isAlreadyInRec && !lowerRecTitle.includes(lowerCurrentTitle) && !lowerCurrentTitle.includes(lowerRecTitle)) {
                    const newRecData = {
                        title: recTitle,
                        url: new URL(recLink.href || window.location.href, window.location.origin).pathname,
                        authors: recAuthors,
                        date: recDate
                    };
                    utils.setCookie(`${tag}__staged_recommend`, newRecData);
                }
            });
        });
    };

    const renderHistoryItems = () => {
        const history = utils.getCookie(`${tag}__recent_list`);
        if (history.length === 0) return `<p class="${tag}__empty">No recently viewed articles yet.</p>`;

        const itemsHtml = history.map((item, index) => `
            <a href="${item.url}" class="${tag}__history-item ${index >= 5 ? `${tag}__item-hidden` : ''}">
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

        const toggleBtn = history.length > 5 ? `
            <div class="${tag}__toggle-container">
                <button class="${tag}__view-btn ${tag}__view-more">View more</button>
                <button class="${tag}__view-btn ${tag}__view-less" style="display:none;">View less</button>
            </div>
        ` : '';

        return itemsHtml + toggleBtn;
    };

    const renderRecommendedItems = () => {
        const recommended = utils.getCookie(`${tag}__recommend_list`);
        const sectionHeading = `<p class="${tag}__section-title"> 
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1556_15685)">
                    <path d="M9.99023 5.82715V17.4819" stroke="#333333" stroke-width="1.66496" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2.49752 14.9843C2.27673 14.9843 2.06499 14.8966 1.90887 14.7405C1.75275 14.5844 1.66504 14.3726 1.66504 14.1518V3.32955C1.66504 3.10876 1.75275 2.89702 1.90887 2.7409C2.06499 2.58478 2.27673 2.49707 2.49752 2.49707H6.65993C7.54309 2.49707 8.39007 2.8479 9.01455 3.47238C9.63903 4.09687 9.98986 4.94385 9.98986 5.827C9.98986 4.94385 10.3407 4.09687 10.9652 3.47238C11.5897 2.8479 12.4366 2.49707 13.3198 2.49707H17.4822C17.703 2.49707 17.9147 2.58478 18.0709 2.7409C18.227 2.89702 18.3147 3.10876 18.3147 3.32955V14.1518C18.3147 14.3726 18.227 14.5844 18.0709 14.7405C17.9147 14.8966 17.703 14.9843 17.4822 14.9843H12.4873C11.8249 14.9843 11.1897 15.2474 10.7213 15.7158C10.253 16.1842 9.98986 16.8194 9.98986 17.4818C9.98986 16.8194 9.72674 16.1842 9.25838 15.7158C8.79002 15.2474 8.15478 14.9843 7.49242 14.9843H2.49752Z" stroke="#333333" stroke-width="1.66496" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_1556_15685">
                    <rect width="19.9796" height="19.9796" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
                <span>Recommended for you</span>
            </p>`;

        if (recommended.length === 0) {
            return `
                ${sectionHeading}
                <div class="${tag}__empty-recommendations">
                    <p>Visit more articles to generate <br>personalized recommendations</p>
                </div>`;
        }

        const itemsHtml = recommended.map(item => `
            <a href="${item.url}" class="${tag}__history-item ${tag}__recommend-item">
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

        return sectionHeading + itemsHtml;
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
                        <div class="${tag}__recommended-list">
                            ${renderRecommendedItems()}
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
                    <div class="${tag}__widget-body widget-body" >
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

            if (!isEmpty && utils.getCookie(`${tag}__session_notified`).length === 0) {
                widgetBody.classList.add(`${tag}__show-notification`);
            }

            if (utils.getCookie(`${tag}__tooltip_hidden`) === true) {
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

                if (el.classList.contains(`${tag}__view-btn`)) {
                    const modalBody = el.closest(`.${tag}__modal-body`);
                    const hiddenItems = modalBody.querySelectorAll(`.${tag}__item-hidden`);
                    const viewMore = modalBody.querySelector(`.${tag}__view-more`);
                    const viewLess = modalBody.querySelector(`.${tag}__view-less`);

                    if (el.classList.contains(`${tag}__view-more`)) {
                        hiddenItems.forEach(item => item.classList.add(`${tag}__show-item`));
                        viewMore.style.display = 'none';
                        viewLess.style.display = 'block';
                    } else {
                        hiddenItems.forEach(item => item.classList.remove(`${tag}__show-item`));
                        viewMore.style.display = 'block';
                        viewLess.style.display = 'none';
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