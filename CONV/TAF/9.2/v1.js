((w) => {
    "use strict";

    const tag = 'cv-9-2';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 9.2 |') : () => { };

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
                if(window.innerWidth < 1025) return;
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
        utils.waitUntil(() => document.querySelector('.literatumContentItemPageRangeHistory'), 0)
            .then((element) => {
                enhanceArticleMetrics();
                reorganizeSpeakerSection();
            });

        utils.waitUntil(() => document.querySelector('.literatumArticleMetricsWidget .articleMetricsContainer'), 0)
            .then((element) => {
                moveJournalCover();
            });

        eventListener();
    }

    const enhanceArticleMetrics = () => {
        const pageRange = document.querySelector(`.literatumContentItemPageRangeHistory`);
        if (!pageRange) return;

        const totalView = document.querySelector('.articleMetricsContainer .section:nth-of-type(1) .value').innerText;
        const totalCitations = document.querySelector('.articleMetricsContainer .section:nth-of-type(2) .value').innerText;
        const altmetric = document.querySelector('.articleMetricsContainer .section .metrics-score').innerText;

        const articleInfo = `
            <span class="${tag}__views"><strong>Views </strong>${totalView}</span> |
            <span class="${tag}__citations"><strong>Citations </strong>${totalCitations}</span> |
            <span class="${tag}__metric desktop"><strong>Altmetric </strong>${altmetric}</span> |
        `;

        if (!document.querySelector(`.${tag}__views`)) {
            pageRange.querySelector('.itemPageRangeHistory').insertAdjacentHTML('afterbegin', articleInfo);
        }

        const metricInterval = setInterval(() => {
            const metricElement = document.querySelector(`.${tag}__metric.desktop`);
            const currentMetric = document.querySelector('.articleMetricsContainer .section .metrics-score');

            if (metricElement && currentMetric) {
                metricElement.innerHTML = `<strong>Altmetric </strong>${currentMetric.innerText}`;
            }
        }, 1000);

        setTimeout(() => {
            clearInterval(metricInterval);
        }, 3000);
    }

    const reorganizeSpeakerSection = () => {
        const journalInfo = document.querySelector(`.info .issue-heading`);
        const tocHeading = document.querySelector(`.toc-heading`);

        if (!journalInfo && !tocHeading) return;

        const cvSpeakerSection = document.createElement('div');
        cvSpeakerSection.className = `${tag}__speaker-section`;

        const journalInfoText = journalInfo.textContent.trim();
        if (journalInfoText.includes('Latest Articles')) {
          journalInfo.classList.add(`${tag}__latest-article`);
        }

        if (journalInfo) cvSpeakerSection.appendChild(journalInfo);
        if (tocHeading) cvSpeakerSection.appendChild(tocHeading);

        const articleHeadingEl = document.querySelector('.title-container .journal-heading');
        if (articleHeadingEl && document.querySelector('.literatumPublicationHeader h1')) {
            const articleHeading = articleHeadingEl.innerHTML;
            document.querySelector('.literatumPublicationHeader h1').insertAdjacentHTML(
                'beforebegin',
                `<div class="${tag}__article-heading">${articleHeading}</div>`
            );
            document.querySelector(`.${tag}__article-heading`).insertAdjacentElement('beforeend', cvSpeakerSection);
        }
    }

    const moveJournalCover = () => {
        const journalCover = document.querySelector(`.issueSerialNavigation.journal`);
        const metricsContainer = document.querySelector(`.literatumArticleMetricsWidget .articleMetricsContainer`);

        if (journalCover && metricsContainer) {
            metricsContainer.insertAdjacentElement('afterend', journalCover);
        }
    }

    const eventListener = () => {
        document.addEventListener('click', (e) => {
            const authorToggle = e.target.closest('.publicationContentAuthors .show-all-link');
            if (authorToggle) {
                authorToggle.classList.toggle(`${tag}__toggle`);
            }

            if(e.target.closest('.issueSerialNavigation.journal .cover')){
				document.querySelector('.jHomepage').click();
			}
        });
    }

    utils.init();
})(window);