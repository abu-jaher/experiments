((w) => {
	"use strict";

	const tag = 'cv-4-17';
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const qa = document.cookie.indexOf('cfQA') > -1;
	const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 4.17 |') : () => { };

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

				log('v1 running');
			} catch (err) {
				log(err.message);
			}
		},

		optlyTracking: (event) => {
			window['optimizely'] = window['optimizely'] || [];
			window['optimizely'].push({
				type: "event",
				eventName: event,
			});
		}
	}

	const getCoverImg = (url) => {
		fetch(url)
			.then(response => response.text())
			.then(html => {
				const parser = new DOMParser();
				const doc = parser.parseFromString(html, 'text/html');
				const imageElement = doc.querySelector('.journal .cover img');
				document.querySelector(`.sourceArticle .${tag}__cover`).insertAdjacentHTML('afterbegin', `<img src="${imageElement ? imageElement.src : ''}">`);
			})
			.catch(error => console.error('Error fetching the page:', error));
	}

	const customFilterOption = `
		<div class="${tag}__filter">
			<button>
				<label class="${tag}__open-access">
					Only show Open Access
					<input type="checkbox" name="openAccess" id="openAccess">
				</label>
			</button>
			<div class="search-options ${tag}__publication-date">
                <div class="size-background"></div>
                <button class="select-label">Publication date : <span>All time</span></button>
                <ul class="options" role="listbox">  
						<p class="${tag}__filter-title">Publication date</p>   

                        <li role="option">
							<label>
								<input type="checkbox" name="Last year" id="${tag}__last-year">
								Show Last year
							</label>
                        </li>
                       <li role="option">
							<label>
								<input type="checkbox" name="Last three years" id="${tag}__last-three-years">
								Show Last three years
							</label>
                        </li>          
                        <li role="option">
							<label>
								<input type="checkbox" name="All time" id="${tag}__all-time">
								Show All time
							</label>
                        </li>

						<p class="${tag}__filter-title">Display</p> 
						<li role="option">
							<label>
								<input type="checkbox" name="Open Access" id="${tag}__open-access">
								Only show Open Access
							</label>
                        </li>
                </ul>
            </div>
		</div>
	`;

	const initVariation = () => {
		utils.waitUntil(() => document.querySelector('.sourceArticle .article-card .header a'), 0).then((element) => {
			document.querySelector('.sourceArticle .article-card').insertAdjacentHTML('afterbegin', `<div class="${tag}__cover"></div>`);
			const getUrl = element.getAttribute('href');
			getCoverImg(getUrl);

			const subCopy = document.querySelector('.newSearchResults .search-results p');
			let text = subCopy.textContent;
			text = text.replace(/(results for search)/, "$1, sorted by relevance");
			subCopy.textContent = text;
		});

		utils.waitUntil(() => document.querySelector('.newSearchResults .search-results-body .tools-holder'), 0).then((element) => {
			if (!document.querySelector(`.${tag}__filter`)) {
				element.insertAdjacentHTML('afterend', customFilterOption);
				filterState();
			}
		});

		utils.waitUntil(() => document.querySelector('.newSearchResults .search-results-body .tools-holder .search-options'), 0).then((element) => {
			if (document.querySelector(`.${tag}__filter`)) {
				document.querySelector(`.${tag}__filter`).insertAdjacentElement('beforeend', element);
			}
		});

		document.addEventListener('click', (e) => {
			const el = e.target;

			if (el.closest(`.${tag}__open-access input`) || el.closest(`#${tag}__open-access`)) {
				let currentUrl = new URL(window.location.href);

				if (currentUrl.searchParams.has('openAccess')) {
					currentUrl.searchParams.delete('openAccess');
				} else {
					currentUrl.searchParams.set('openAccess', '18');
					utils.optlyTracking("only_show_open_access_filter_applied");
				}

				const updatedUrl = currentUrl.toString();
				document.querySelector('#sort-options li a').setAttribute('href', updatedUrl);
				document.querySelector('#sort-options li a').click();

				ifFilterRemoved();
			}

			if (el.closest('.cv-4-17__publication-date .options input')) {
				document.querySelectorAll('.cv-4-17__publication-date .options input:checked').forEach((el) => {
					el.checked = false;
				})

				el.closest('.cv-4-17__publication-date .options input').checked = true;
				const getName = el.closest('.cv-4-17__publication-date .options input').getAttribute('name');
				updateUrlBasedOnSelection(getName);
				ifFilterRemoved();
				utils.optlyTracking("publication_date_filter_applied");
			}

			if (el.closest(`.${tag}__publication-date .select-label`) || el.closest(`.${tag}__publication-date .size-background`)) {
				document.querySelector(`.${tag}__publication-date`).classList.toggle('active');
			}

			if (el.closest(`#resultsOptions li`) || el.closest('.paginationLinkContainer a')) {
				ifFilterRemoved();
			}

			if (el.closest('.sourceArticle .article-card img')) {
				document.querySelector('.sourceArticle .article-card .header a').click();
			}
		})
	}

	const setUrlParams = (paramsToSet = {}, paramsToDelete = []) => {
		let currentUrl = new URL(window.location.href);

		Object.entries(paramsToSet).forEach(([key, value]) => {
			currentUrl.searchParams.set(key, value);
		});

		paramsToDelete.forEach(param => currentUrl.searchParams.delete(param));

		return currentUrl.toString();
	}

	const updateUrlBasedOnSelection = (getName) => {
		let updatedUrl;
		

		const currentDate = new Date();
		const currentDateFormatted = currentDate.getFullYear().toString() + 
							(currentDate.getMonth() + 1).toString().padStart(2, '0') + 
							currentDate.getDate().toString().padStart(2, '0');

		const lastYearDate = new Date(currentDate);
		lastYearDate.setFullYear(currentDate.getFullYear() - 1);

		const formattedLastYearDate = lastYearDate.getFullYear().toString() + 
									(lastYearDate.getMonth() + 1).toString().padStart(2, '0') + 
									lastYearDate.getDate().toString().padStart(2, '0');

		switch (getName) {
			case "Last year":
				updatedUrl = setUrlParams(
					{ Ppub: `[${formattedLastYearDate} TO ${currentDateFormatted}2359]`, dateRange: '' },
					['AfterYear', 'BeforeYear']
				);
				break;

			case "Last three years":
				updatedUrl = setUrlParams(
					{ AfterYear: '2024', BeforeYear: '2022' },
					['Ppub', 'dateRange']
				);
				break;

			case "All time":
				updatedUrl = setUrlParams(
					{},
					['Ppub', 'dateRange', 'AfterYear', 'BeforeYear']
				);
				break;

			default:
				console.warn("Unrecognized selection:", getName);
				return;
		}

		const resultLink = document.querySelector('#sort-options li a');
		resultLink.setAttribute('href', updatedUrl);
		resultLink.click();
	}


	const ifFilterRemoved = () => {
		const interval = setInterval(() => {
			if (!document.querySelector(`.${tag}__filter`)) {
				document.querySelector('.newSearchResults .search-results-body .tools-holder').insertAdjacentHTML('afterend', customFilterOption);
				filterState();

				const subCopy = document.querySelector('.newSearchResults .search-results p');
				let text = subCopy.textContent;
				text = text.replace(/(results for search)/, "$1, sorted by relevance");
				subCopy.textContent = text;
			}

			if (document.querySelector(`.${tag}__filter`) && !document.querySelector(`.${tag}__filter .search-options.size-container`)) {
				document.querySelector(`.${tag}__filter`).insertAdjacentElement('beforeend', document.querySelector(`.newSearchResults .search-options`));
			}

		}, 20);

		setTimeout(() => {
			clearInterval(interval);
		}, 8000);
	}

	const filterState = () => {
		let currentUrl = new URL(window.location.href);
		if (currentUrl.searchParams.has('openAccess')) {
			document.querySelector('.cv-4-17__open-access input').checked = true;
			document.querySelector('#cv-4-17__open-access').checked = true;
		}

		if (currentUrl.searchParams.has('Ppub')) {
			document.querySelector('#cv-4-17__last-year').checked = true;
			document.querySelector('.cv-4-17__publication-date .select-label span').textContent = 'Last year';
		}

		if (currentUrl.searchParams.has('AfterYear')) {
			document.querySelector('#cv-4-17__last-three-years').checked = true;
			document.querySelector('.cv-4-17__publication-date .select-label span').textContent = 'Last three years';
		}

		if (!currentUrl.searchParams.has('AfterYear') && !currentUrl.searchParams.has('Ppub')) {
			document.querySelector('#cv-4-17__all-time').checked = true;
			document.querySelector('.cv-4-17__publication-date .select-label span').textContent = 'All time';
		}
	}

	setTimeout(() => {
		document.body.style.opacity = 1;
	}, 3000)

	utils.init();
})(window);