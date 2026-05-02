((w) => {
    "use strict";

    const tag = 'cv-2-30';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 2.30 |') : () => { };

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

    const convertYearSliderToDropdown = (element, className, insertPlace, icon) => {
        const container = element;
        if (!container) return;

        const links = container.querySelectorAll("a");
        if (!links.length) return;

        const wrapper = document.createElement("div");
        wrapper.classList.add(`${tag}__dropdown`);

        if (icon) {
            if (typeof icon === "string") wrapper.insertAdjacentHTML("beforeend", icon);
            else if (icon instanceof HTMLElement) wrapper.appendChild(icon);
        }

        const selectedLink = container.querySelector("a.open") || links[0];
        const selectedText = selectedLink
            ? selectedLink.innerText.replace(/(\D)(\d)/, '$1 $2')
            : links[0].textContent.replace(/(\D)(\d)/, '$1 $2')

        const button = document.createElement("button");
        button.type = "button";
        button.classList.add(`${className}__button`);
        button.textContent = selectedText;

        const list = document.createElement("ul");
        list.classList.add(`${className}__list`);

        links.forEach((link) => {
            const text = link.innerText.replace(/(\D)(\d)/, '$1 $2');
            const href = link.getAttribute("href");

            const li = document.createElement("li");
            li.classList.add(`${className}__item`);
            if (link.classList.contains("open")) li.classList.add("selected");

            const anchor = document.createElement("a");
            anchor.href = href;
            anchor.textContent = text;

            anchor.addEventListener("click", (e) => {
                e.preventDefault();
                button.textContent = text;
                button.classList.remove("active");
                list.classList.remove("active");
                if (href) window.location.href = href;
            });

            li.appendChild(anchor);
            list.appendChild(li);
        });

        if (!window.__customDropdowns) window.__customDropdowns = [];
        window.__customDropdowns.push({ button, list });

        button.addEventListener("click", (e) => {
            e.stopPropagation();

            window.__customDropdowns.forEach(({ button: btn, list: ul }) => {
                if (btn !== button) {
                    btn.classList.remove("active");
                    ul.classList.remove("active");
                }
            });

            button.classList.toggle("active");
            list.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (!wrapper.contains(e.target)) {
                button.classList.remove("active");
                list.classList.remove("active");
            }
        });

        wrapper.appendChild(button);
        wrapper.appendChild(list);
        insertPlace.appendChild(wrapper);
    };

    const volumeIcon = `
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2.28572V3.71428C14 4.97322 10.8646 6 7 6C3.13541 6 0 4.97322 0 3.71428V2.28572C0 1.02678 3.13541 0 7 0C10.8646 0 14 1.02678 14 2.28572ZM14 5.5V8.71428C14 9.97322 10.8646 11 7 11C3.13541 11 0 9.97322 0 8.71428V5.5C1.50391 6.53572 4.2565 7.01788 7 7.01788C9.7435 7.01788 12.4961 6.53572 14 5.5ZM14 10.5V13.7143C14 14.9732 10.8646 16 7 16C3.13541 16 0 14.9732 0 13.7143V10.5C1.50391 11.5357 4.2565 12.0179 7 12.0179C9.7435 12.0179 12.4961 11.5357 14 10.5Z" fill="#333333"/>
        </svg>
    `;

    const issueIcon = `
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 4.25V0H0.75C0.334375 0 0 0.334375 0 0.75V15.25C0 15.6656 0.334375 16 0.75 16H11.25C11.6656 16 12 15.6656 12 15.25V5H7.75C7.3375 5 7 4.6625 7 4.25ZM9 11.625C9 11.8313 8.83125 12 8.625 12H3.375C3.16875 12 3 11.8313 3 11.625V11.375C3 11.1687 3.16875 11 3.375 11H8.625C8.83125 11 9 11.1687 9 11.375V11.625ZM9 9.625C9 9.83125 8.83125 10 8.625 10H3.375C3.16875 10 3 9.83125 3 9.625V9.375C3 9.16875 3.16875 9 3.375 9H8.625C8.83125 9 9 9.16875 9 9.375V9.625ZM9 7.375V7.625C9 7.83125 8.83125 8 8.625 8H3.375C3.16875 8 3 7.83125 3 7.625V7.375C3 7.16875 3.16875 7 3.375 7H8.625C8.83125 7 9 7.16875 9 7.375ZM12 3.80938V4H8V0H8.19063C8.39062 0 8.58125 0.078125 8.72188 0.21875L11.7812 3.28125C11.9219 3.42188 12 3.6125 12 3.80938Z" fill="#333333"/>
        </svg>
    `;

    const updateTocDeliverFormatLinks = () => {
        const containers = document.querySelectorAll(".tocDeliverFormatsLinks");

        containers.forEach((container) => {
            if (container.querySelector(`.${tag}__open-urls`)) return;

            [...container.childNodes].forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("|")) {
                    node.textContent = node.textContent.replace(/\|/g, "").trim();
                }
            });

            const pdfLink = container.querySelector(".pdf");
            if (pdfLink) {
                pdfLink.textContent = pdfLink.textContent.replace(
                    /\s*\(\d+(\.\d+)?\s*[KMG]?B\)/i,
                    ""
                );
            }

            const parentElement = container.closest(`.tocArticleEntry`);
            const getLink = parentElement.querySelector(`.tocArticleEntry .art_title a`).getAttribute(`href`);

            const newLink = `<a class="${tag}__open-urls" href="${getLink}">Open Urls</a>`
            container.insertAdjacentHTML('beforeend', newLink);

            if (parentElement.querySelector(`.tocAbsGraphicalImg`)) {
                const coverImage = parentElement.querySelector(`.tocAbsGraphicalImg`);
                container.parentElement.insertAdjacentElement(`beforebegin`, coverImage)
            }
        });
    }

    const exploreArticlesAccordion = () => {
        const tabsWidget = document.querySelector(".latestArticlesWidget .tabs");
        const tabNavItems = tabsWidget.querySelectorAll(".tab-nav li");

        const accordion = document.createElement("div");
        accordion.classList.add(`${tag}__accordion-widget`);

        tabNavItems.forEach((li) => {
            const tabLink = li.querySelector("a[role='tab']");
            const targetId = tabLink && tabLink.getAttribute("href").replace("#", "");
            const tabPane = tabsWidget.querySelector(`#${targetId}`);
            const tabPaneContent = tabPane.querySelector(".tab-pane-content").innerHTML.trim();

            if (!tabPane || !tabLink || !tabPaneContent) return;

            const item = document.createElement("div");
            item.classList.add(`${tag}__accordion-item`);

            const header = document.createElement("button");
            header.classList.add(`${tag}__accordion-header`);
            header.setAttribute("aria-expanded", li.classList.contains("active"));
            header.setAttribute("aria-controls", targetId);
            header.innerHTML = `<span>${tabLink.textContent.trim()}</span>`;

            const content = document.createElement("div");
            content.classList.add(`${tag}__accordion-content`);
            content.id = targetId;
            content.appendChild(tabPane);
            content.style.display = li.classList.contains("active") ? "block" : "none";

            header.addEventListener("click", () => {
                const expanded = header.getAttribute("aria-expanded") === "true";
                const allHeaders = accordion.querySelectorAll(`.${tag}__accordion-header`);
                const allContents = accordion.querySelectorAll(`.${tag}__accordion-content`);

                const headerRect = header.getBoundingClientRect();
                const offsetFromTop = headerRect.top;

                allHeaders.forEach((h) => h.setAttribute("aria-expanded", "false"));
                allContents.forEach((c) => (c.style.display = "none"));

                if (!expanded) {
                    header.setAttribute("aria-expanded", "true");
                    content.style.display = "block";
                    requestAnimationFrame(() => {
                        const newHeaderRect = header.getBoundingClientRect();
                        const newOffsetFromTop = newHeaderRect.top;
                        const scrollDifference = newOffsetFromTop - offsetFromTop;
                        window.scrollBy({
                            top: scrollDifference,
                        });
                    });
                } else {
                    header.setAttribute("aria-expanded", "false");
                    content.style.display = "none";
                }
            });

            item.appendChild(header);
            item.appendChild(content);
            accordion.appendChild(item);
        });

        tabsWidget.innerHTML = "";
        tabsWidget.appendChild(accordion);
    };

    const reverseLoiIssuesScroller = ()=> {
        const scroller = document.querySelector('.loi-issues-scroller');
        if (!scroller) return;

        const children = Array.from(scroller.children).reverse();
        scroller.innerHTML = '';
        children.forEach(child => scroller.appendChild(child));
    }

    const initVariation = () => {
        utils.waitUntil(() => document.querySelector(`#tocListWidget .tools-holder .benefits .markallLabel`), 0).then(() => {
            const selectArticle = document.querySelector(`#tocListWidget .tools-holder .benefits .markallLabel`);
            selectArticle.insertAdjacentHTML(`beforeend`, `<span class="${tag}__select-article">Select all articles</span>`);

            const volumeElem = document.querySelector(".yearSliderInner");
            const insertPlace = document.querySelector(".yearSlider");

            convertYearSliderToDropdown(volumeElem, `${tag}__volume`, insertPlace, volumeIcon);
        });

        utils.waitUntil(() => document.querySelector(`#tocListWidget .tools-holder .toc-fns`), 0).then((elem) => {
            document.querySelector(`#tocListWidget .tools-holder .benefits`).insertAdjacentElement(`beforebegin`,elem);
        });

        utils.waitUntil(() => document.querySelector(`.issues-scroll-display .volume-container`), 0).then((elem) => {
            document.querySelector(`.literatumListOfIssuesResponsiveWidget .all-issues-link`).insertAdjacentElement(`beforebegin`,elem);
        });

        utils.waitUntil(() => document.querySelector(`.loi-issues-scroller a`), 0).then(() => {
            const issueElem = document.querySelector(`.loi-issues-scroller`)
            const insertPlace = document.querySelector(".yearSlider");
            convertYearSliderToDropdown(issueElem, `${tag}__issues`, insertPlace, issueIcon);
            reverseLoiIssuesScroller();
        });

        utils.waitUntil(() => document.querySelector(`.tocDeliverFormatsLinks a`), 0).then(() => {
            updateTocDeliverFormatLinks();
            window.addEventListener('scroll', () => {
                updateTocDeliverFormatLinks();
            })
        });

        utils.waitUntil(() => document.querySelector(`.latestArticlesWidget .tabs`), 0).then(() => {

            const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(
                navigator.userAgent
            );

            if (isMobileDevice) {
                exploreArticlesAccordion();
            }
        });
    }

    utils.init();
})(window);