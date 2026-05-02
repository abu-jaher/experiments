((w) => {
    "use strict";

    const tag = 'cv-9-3';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 9.3 |') : () => { };

    const waitForHotjar = setInterval(() => {
        if (typeof window.hj === 'undefined') return;

        clearInterval(waitForHotjar);

        window.hj = window.hj || function () {
            (hj.q = hj.q || []).push(arguments);
        };
        window.hj('event', 'cv-9-3-survey-v1');
    }, 100);

    setTimeout(() => {
        clearInterval(waitForHotjar);
    }, 6000);

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

                log('running v1');
            } catch (err) {
                log(err.message);
            }
        },
    }

    const hostCDN = 'https://d1mgcpums0qvsa.cloudfront.net/TAF/9.3/';

    const allLogos = {
        'web_of_science': {
            url: `${hostCDN}web_of_science_logo.png`,
            name: 'Web of Science',
            tooltip: `Web of Science, owned by Clarivate, is widely recognized as one of the most authoritative databases for scientific citations.`
        },
        'google_scholar': {
            url: `${hostCDN}google_scholar_logo.png`,
            name: 'Google Scholar',
            tooltip: `Google Scholar is the world's most widely used platform for discovering scholarly literature and research.`,
        },
        'scopus_logo': {
            url: `${hostCDN}scopus_logo.png`,
            name: 'Scopus',
            tooltip: `Scopus, owned by Elsevier, is the world's leading abstract and citation database for peer-reviewed research.`,
        },
        'pubmed_medline': {
            url: `${hostCDN}pubmed_medline_logo.png`,
            name: 'Medline',
            tooltip: `MEDLINE, owned by the U.S. National Library of Medicine (NLM), is the world's largest bibliographic database of biomedical literature.`
        },
        'Geobase_logo': {
            url: `${hostCDN}Geobase_logo.png`,
            name: 'Geobase',
            tooltip: `GEOBASE, owned by Elsevier, is a comprehensive international database indexing research across geoscience, geography, ecology, and development studies.`
        },
        'PMC_logo': {
            url: `${hostCDN}PMC_logo.png`,
            name: 'PubMed Central',
            tooltip: `PubMed Central (PMC), owned by the U.S. National Library of Medicine (NLM), is a free full-text digital archive of biomedical literature, containing over 7 million journal articles from participating journals.`
        },
        'DOAJ_logo': {
            url: `${hostCDN}DOAJ_logo.png`,
            name: 'Directory of Open <br>Access Journals',
            tooltip: `The Directory of Open Access Journals (DOAJ) is a comprehensive online index of 20,000+ peer-reviewed open access journals across all disciplines.`
        },
        'Embase_logo': {
            url: `${hostCDN}Embase_logo.png`,
            name: 'Embase',
            tooltip: `EMBASE, owned by Elsevier, is a comprehensive biomedical and pharmacological database indexing over 32 million records from 8,500+ journals.`
        },
        'Ei_compendex': {
            url: `${hostCDN}Ei_compendex_logo.png`,
            name: 'El Compendex',
            tooltip: `Ei Compendex, owned by Elsevier, is a premier engineering literature database providing comprehensive coverage of research across all engineering disciplines.`
        }
    }

    const currentPath = window.location.pathname;

    const initVariation = () => {
        fetchSheetData();
        addEventListeners();
    }

    const fetchSheetData = ()=> {
        const spreadsheetId = '1dnxqPAaUgbcST_0t9UqOSjUW447iKyMImr13_wpYMKk';
        const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json`;
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(text => {
                const jsonStart = text.indexOf('{');
                const jsonEnd = text.lastIndexOf('}') + 1;
                const jsonString = text.substring(jsonStart, jsonEnd);

                const data = JSON.parse(jsonString);

                const processedData = processTableData(data.table);

                processedData.forEach((row, index) => {
                    const url = row['Link to journal'];
                    if (url != null && (url.replace('https://www.tandfonline.com', '').toLocaleUpperCase() == currentPath.replace(/\d+/g, '').toLocaleUpperCase())) {
                        const logoHtml = `
                            ${row['Web of Science Covered'] == 'Yes' ? `
                                    <div class="${tag}__logo">
                                        <img src="${allLogos.web_of_science.url}" alt="${allLogos.web_of_science.name}">
                                        <p class="name">${allLogos.web_of_science.name}</p>
                                        <p class="${tag}__tooltip">${allLogos.web_of_science.tooltip}</p>
                                    </div>              
                                ` : ''
                            }
                            ${row['Google Scholar'] == 'Yes' ? `
                                    <div class="${tag}__logo">
                                        <img src="${allLogos.google_scholar.url}" alt="${allLogos.google_scholar.name}">
                                        <p class="name">${allLogos.google_scholar.name}</p>
                                        <p class="${tag}__tooltip">${allLogos.google_scholar.tooltip}</p>
                                    </div>              
                                ` : ''
                            }
                            ${row['Scopus covered?'] == 'Yes' ? `
                                    <div class="${tag}__logo">
                                        <img src="${allLogos.scopus_logo.url}" alt="${allLogos.scopus_logo.name}">
                                        <p class="name">${allLogos.scopus_logo.name}</p>
                                        <p class="${tag}__tooltip">${allLogos.scopus_logo.tooltip}</p>
                                    </div>              
                                ` : ''
                            }
                            ${row['Indexed in MEDLINE'] == 'Yes' ? `
                                    <div class="${tag}__logo">
                                        <img src="${allLogos.pubmed_medline.url}" alt="${allLogos.pubmed_medline.name}">
                                        <p class="name">${allLogos.pubmed_medline.name}</p>
                                        <p class="${tag}__tooltip">${allLogos.pubmed_medline.tooltip}</p>
                                    </div>              
                                ` : ''
                            }
                            ${row['Indexed in Geobase'] == 'Yes' ? `
                                    <div class="${tag}__logo">
                                        <img src="${allLogos.Geobase_logo.url}" alt="${allLogos.Geobase_logo.name}">
                                        <p class="name">${allLogos.Geobase_logo.name}</p>
                                        <p class="${tag}__tooltip">${allLogos.Geobase_logo.tooltip}</p>
                                    </div>              
                                ` : ''
                            }
                            ${row['Deposited in PMC'] == 'Yes' ? `
                                    <div class="${tag}__logo">
                                        <img src="${allLogos.PMC_logo.url}" alt="${allLogos.PMC_logo.name}">
                                        <p class="name">${allLogos.PMC_logo.name}</p>
                                        <p class="${tag}__tooltip">${allLogos.PMC_logo.tooltip}</p>
                                    </div>              
                                ` : ''
                            }
                            ${row['Indexed in DOAJ'] == 'Yes' ? `
                                    <div class="${tag}__logo">
                                        <img src="${allLogos.DOAJ_logo.url}" alt="${allLogos.DOAJ_logo.name}">
                                        <p class="name">${allLogos.DOAJ_logo.name}</p>
                                        <p class="${tag}__tooltip">${allLogos.DOAJ_logo.tooltip}</p>
                                    </div>              
                                ` : ''
                            }
                            ${row['Indexed in Embase'] == 'Yes' ? `
                                    <div class="${tag}__logo">
                                        <img src="${allLogos.Embase_logo.url}" alt="${allLogos.Embase_logo.name}">
                                        <p class="name">${allLogos.Embase_logo.name}</p>
                                        <p class="${tag}__tooltip">${allLogos.Embase_logo.tooltip}</p>
                                    </div>              
                                ` : ''
                            }
                            ${row['Indexed in Ei Compendex'] == 'Yes' ? `
                                    <div class="${tag}__logo">
                                        <img src="${allLogos.Ei_compendex.url}" alt="${allLogos.Ei_compendex.name}">
                                        <p class="name">${allLogos.Ei_compendex.name}</p>
                                        <p class="${tag}__tooltip">${allLogos.Ei_compendex.tooltip}</p>
                                    </div>              
                                ` : ''
                            }
                        `;

                        utils.waitUntil(() => document.querySelector('.abs-and-index'), 0)
                            .then((element) => {

                                const title = document.querySelector(`.compact-nav--title`).innerText;

                                element.innerHTML = `
                                    <div class="${tag}__abs-idx">
                                        <p class="${tag}__title">${title} is indexed by the following services:</p>
                                        <div class="${tag}__logo-container">
                                            ${logoHtml}
                                        </div>
                                    </div>
                                `;

                            });
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching spreadsheet:', error);
            });
    }

    const processTableData = (table)=> {
        const headers = table.cols.map(col => col.label || `Column${col.id}`);
        return table.rows.map(row => {
            const rowData = {};
            row.c.forEach((cell, index) => {
                rowData[headers[index]] = cell ? (cell.v !== undefined ? cell.v : '') : '';
            });
            return rowData;
        });
    }

    const addEventListeners = ()=> {
		document.addEventListener("mouseout", (e) => {
            const el = e.target;
            if(el.closest(`.cv-9-3__logo`)){
                window['optimizely'] = window['optimizely'] || [];
                window['optimizely'].push({
                    type: "event",
                    eventName: "hovered_over_abstract_index",
                });
            }

		});
	}

    utils.init();
})(window);