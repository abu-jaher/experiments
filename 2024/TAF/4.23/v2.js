((w) => {
    "use strict";

    const tag = 'cv-4-23';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 4.23 |') : () => { };

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

                log('running v2');
            } catch (err) {
                log(err.message);
            }
        },
    }

    const cv_searchField = `
        <div class="${tag}__search-field">
            <input type="text" class="${tag}__search" id="${tag}__search" placeholder="Search by journal title or keyword" autocomplete="off">
            <div class="quick-search-btn">
                <button class="mainSearchButton searchButtons pointer" type="button" value="" title="Search" aria-label="Search"></button>
            </div>
            <ul class="${tag}__suggestions"></ul>
        </div>
    `;

    const initVariation = () => {
        utils.waitUntil(() => document.querySelector(`.newSearchResults`), 0).then((elem) => {
            const introTitle = document.querySelector(`h1`);
            const subText = document.querySelector(`h1 + p`);
            // introTitle.textContent = `Explore our journal portfolio`;
            subText.textContent = `Explore our journal portfolio - search by keyword, browse alphabetically or filter by subject area.`;
            introTitle.style.opacity = 1;
            subText.style.opacity = 1;
            elem.insertAdjacentHTML('beforebegin', cv_searchField);
            let currentIndex = -1;
            const searchField = document.querySelector(".cv-4-23__search-field");
            const searchInput = document.querySelector(`.${tag}__search`)
            searchInput.addEventListener("input", e => {
                const query = e.target.value;

                if (query.length < 2) {
                    const suggestionsEl = document.querySelector(`.${tag}__suggestions`);
                    suggestionsEl.innerHTML = "";
                    suggestionsEl.style.display = `none`;
                    return;
                } else {
                    showSuggestions(query);
                }
            });

            searchInput.addEventListener("keydown", function (e) {
                const suggestionsEl = document.querySelector(`.${tag}__suggestions`);
                const items = suggestionsEl.querySelectorAll("li");

                if (!items.length) return;

                if (e.key === "ArrowDown") {
                    e.preventDefault();
                    currentIndex = (currentIndex + 1) % items.length;
                    setActive(items, currentIndex);
                } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    currentIndex = (currentIndex - 1 + items.length) % items.length;
                    setActive(items, currentIndex);
                }
                else if (e.key === "Enter") {
                    if (currentIndex >= 0 && items[currentIndex]) {
                        const link = items[currentIndex].querySelector("a");
                        if (link) {
                            window.location.href = link.href;
                        }
                    } else {
                        document.querySelector(`.cv-4-23__search-field .quick-search-btn button`).click();
                    }
                }

            });

            document.addEventListener('click', (e) => {
                const elem = e.target;
                if (!searchInput.contains(elem) && !document.querySelector(`.${tag}__suggestions`).contains(elem)) {
                    document.querySelector(`.${tag}__suggestions`).innerHTML = "";
                    document.querySelector(`.${tag}__suggestions`).style.display = `none`;
                }

                if (elem.closest(`.cv-4-23__search-field .quick-search-btn button`)) {
                    window.open(`https://www.tandfonline.com/action/doSearch?AllField=${searchInput.value}&startPage=&target=titleSearch&content=title`, "_self");
                }
            })
        })

    }

    const setActive = (items, index) => {
        items.forEach((item, i) => {
            item.classList.toggle("active", i === index);
        });
    }

    const showSuggestions = (query) => {
        fetch(`https://www.tandfonline.com/action/doSuggest?target=auto-complete&query=${query}%20&hs=3&pts=3&ts=3&cs=3&fl=PubID`)
            .then(response => response.json())
            .then(data => {
                const suggestionsEl = document.querySelector(`.${tag}__suggestions`);
                suggestionsEl.innerHTML = "";
                suggestionsEl.style.display = `none`;

                if (!data || data.length === 0) {
                    const li = document.createElement("li");
                    li.innerHTML = `<a>No journals found for '<strong>${query}</strong>'</a>`;
                    suggestionsEl.appendChild(li);
                    suggestionsEl.style.display = `block`;
                    return;
                }

                data.forEach(item => {
                    let displayText = item.highlight;
                    let typeLabel = "";

                    if (item.param === "history") return;

                    if (item.paramFormatted === "All Subjects") {
                        typeLabel = " (Subject)";
                    } else if (item.paramFormatted === "Publication Title") {
                        typeLabel = " (Journal)";
                    } else if (item.paramFormatted) {
                        typeLabel = ` (${item.paramFormatted})`;
                    }

                    let linkUrl = item.url;
                    if (item.paramFormatted === "Publication Title") {
                        linkUrl = `https://www.tandfonline.com/journals/${item.value}`;
                    }

                    const li = document.createElement("li");
                    li.innerHTML = `<a href="${linkUrl}" target="_self">${displayText}${typeLabel}</a>`;
                    suggestionsEl.appendChild(li);
                });

                suggestionsEl.style.display = "block";

            })
            .catch(error => console.error("Error loading JSON:", error));
    }

    utils.init();
})(window);