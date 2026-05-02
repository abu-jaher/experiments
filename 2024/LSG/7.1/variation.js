((w) => {
	"use strict";

	const tag = "cv-7-1";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["conv"].utils;

	window[tag] = window[tag] || {
		init: () => {
			try {
				utils.waitUntil(() => document.body, 0).then((body) => {
					body.classList.add(tag);
					window[tag].initVariation();
					window[tag].eventListener();
				});

				console.log(`${window[tag].variation} is running`, tag);
			} catch (err) {
				console.error(err, tag);
			}
		},
	};

	if (window[tag].variation) return;

	window[tag].getStorageKey = () => {
		const pathname = window.location.pathname;
		let activeTabText = '';
		const activeTab = document.querySelector('.cTSTabs__link.-is-active');
		if (activeTab) {
			activeTabText = activeTab.innerText.trim();
		}
		return `${tag}__${pathname}_${activeTabText}`;
	};

	window[tag].storeAvailableMonths = () => {
		utils.waitUntil(() => document.querySelector('#ModalDepartureDate select[data-ts-departure-month]'), 0).then(() => {
			const storageKey = window[tag].getStorageKey();
			if (sessionStorage.getItem(storageKey)) {
				return;
			}

			const monthsData = {
				monthOptions: []
			};

			const monthOptions = document.querySelectorAll('#ModalDepartureDate select[data-ts-departure-month] option[value^="2025-"]');

			monthOptions.forEach(option => {
				if (option.value) {
					const fullMonth = option.textContent.split(' ')[0];
					const shortMonth = fullMonth.substring(0, 3).toUpperCase();

					monthsData.monthOptions.push({
						value: option.value,
						fullMonth: option.textContent,
						shortMonth: shortMonth,
					});
				}
			});

			sessionStorage.setItem(storageKey, JSON.stringify(monthsData));
		});
	};

	window[tag].initVariation = () => {
		utils.waitUntil(() => document.querySelector(`[class*="area--tourCards"] .cTourCard`) && document.querySelector('#ModalDepartureDate select[data-ts-departure-month]'), 0).then(() => {
			const element = document.querySelector(`[class*="area--tourCards"] .cTourCard`);
			const is2026Selected = document.querySelector('#ModalDepartureDate select[data-ts-departure-month] option[value^="2026-"][selected]');
			if (is2026Selected) return;

			let monthsData = null;
			const storageKey = window[tag].getStorageKey();
			const storedData = sessionStorage.getItem(storageKey);
			if (storedData) {
				monthsData = JSON.parse(storedData);
			}

			if (!monthsData) {
				window[tag].storeAvailableMonths();

				const monthOptions = document.querySelectorAll('#ModalDepartureDate select[data-ts-departure-month] option[value^="2025-"]');

				let monthSpansHTML = '';
				monthOptions.forEach(option => {
					if (option.value) {
						const fullMonth = option.textContent.split(' ')[0];
						const shortMonth = fullMonth.substring(0, 3).toUpperCase();
						monthSpansHTML += `<span data-month="${option.value}">${shortMonth}</span>`;
					}
				});

				createAndInsertFilter(monthSpansHTML, element);
				return;
			}

			let monthSpansHTML = '';
			monthsData.monthOptions.forEach(option => {
				monthSpansHTML += `<span data-month="${option.value}">${option.shortMonth}</span>`;
			});

			createAndInsertFilter(monthSpansHTML, element);

			scrollSelectedElementIntoView();
		});
	};

	function createAndInsertFilter(monthSpansHTML, element) {
		const monthFilter = `
		<div class="${tag}__filter">
			<div class="${tag}__title">
				<p>Filter by Departing Month (2025) :</p>
			</div>
			<div class="${tag}__monthFilter">
				<div class="${tag}__availableMonths">
					<div>
						${monthSpansHTML}
						<div class="${tag}__clearFilter desktop">
							<p>Clear Filter</p>
						</div>
					</div>
				</div>
			</div>
			<div class="${tag}__clearFilter mobile">
				<p>Clear Filter</p>
			</div>			
		</div>
		`;

		if (!document.querySelector(`.${tag}__monthFilter`)) {
			element.insertAdjacentHTML('beforebegin', monthFilter);
			const getSelectedMonth = document.querySelector('#ModalDepartureDate select[data-ts-departure-month]').value;
			if (getSelectedMonth !== '') {
				document.querySelector(`.${tag}__monthFilter [data-month="${getSelectedMonth}"]`).classList.add(`selected`);
				document.body.classList.add(`${tag}__filterApplied`);
			}else{
				document.body.classList.remove(`${tag}__filterApplied`);
			}
		}
	}

	window[tag].updateFilter = (newValue) => {
		const modal = document.querySelector('#ModalDepartureDate');

		modal.style.opacity = `0`;
		document.querySelector('[data-target="ModalDepartureDate"]').click();

		const interval = setInterval(() => {
			const selectField = document.querySelector('#ModalDepartureDate select[data-ts-departure-month]');
			if (selectField.value != newValue) {
				selectField.value = newValue;
			}
			else {

				const closeModal = modal.querySelector(`.cModal__area--footer .c-btn[aria-label="Close"]`)
				closeModal.click();
				document.body.classList.remove(`${tag}__filterClicked`);
				clearInterval(interval);
			}
		}, 50)

		setTimeout(() => {
			clearInterval(interval);
			document.body.classList.remove(`${tag}__filterClicked`);
		}, 3000)
	}

	window[tag].clearFilter = () => {
		const modal = document.querySelector('#ModalDepartureDate');

		modal.style.opacity = `0`;
		document.querySelector('[data-target="ModalDepartureDate"]').click();

		const interval = setInterval(() => {
			const selectField = document.querySelector('#ModalDepartureDate select[data-ts-departure-month]');
			if (selectField.value != '') {
				const clearModal = modal.querySelector(`.cModal__area--footer .c-btn--clear`);
				clearModal.click();
			}
			else {
				const closeModal = modal.querySelector(`.cModal__area--footer .c-btn[aria-label="Close"]`)
				closeModal.click();
				document.body.classList.remove(`${tag}__filterClicked`);
				clearInterval(interval);
			}
		}, 50)

		setTimeout(() => {
			document.body.classList.remove(`${tag}__filterClicked`);
			clearInterval(interval);
		}, 3000)
	}

	function scrollSelectedElementIntoView() {
		const container = document.querySelector('.cv-7-1__monthFilter');
		
		const selectedElement = document.querySelector('.cv-7-1__monthFilter .cv-7-1__availableMonths span.selected');
		
		if (container && selectedElement) {
		  const containerRect = container.getBoundingClientRect();
		  const selectedRect = selectedElement.getBoundingClientRect();
		  
		  const isNotFullyVisible = 
			selectedRect.left < containerRect.left || 
			selectedRect.right > containerRect.right;
		  
		  if (isNotFullyVisible) {
			const scrollLeft = selectedRect.left + 
							  container.scrollLeft - 
							  containerRect.left - 
							  (containerRect.width - selectedRect.width) / 2;
			
			container.scrollTo({
			  left: scrollLeft,
			  behavior: 'smooth'
			});
		  }
		}
	  }	  

	utils.waitUntil(() => document.querySelector('#tour-search-results'), 0)
		.then((element) => {
			window[tag].storeAvailableMonths();

			var active = true;

			const config = { childList: true, subtree: true };
			const callback = () => {
				if (!active) return;

				active = false;

				const fire = setInterval(() => window[tag].initVariation(), 200);

				setTimeout(() => {
					active = true;
					clearInterval(fire)
				}, 1000);
			};
			const observer = new MutationObserver(callback);
			observer.observe(element, config);
		});

	window[tag].eventListener = () => {
		document.addEventListener(`click`, (e) => {
			const el = e.target;

			if (el.closest(`.cv-7-1__availableMonths span`)) {
				document.body.classList.add(`${tag}__filterClicked`);
				const triggeredElem = el.closest(`.cv-7-1__availableMonths span`)
				triggeredElem.classList.add('selected');
				const getValue = triggeredElem.getAttribute('data-month');
				window[tag].updateFilter(getValue);

				// Unpacked filter option clicked
				Kameleoon.API.Goals.processConversion(368992)

				// filter applied
				Kameleoon.API.Goals.processConversion(368990)
			}

			if(el.closest(`.cv-7-1__clearFilter p`)){
				document.body.classList.add(`${tag}__filterClicked`);
				window[tag].clearFilter();
			}
		})

		document.addEventListener('change', (e) => {
			const el = e.target;

			if (el.closest('#ModalDepartureDate select[data-ts-departure-month]')) {
				// filter applied
				Kameleoon.API.Goals.processConversion(368990)
			}
		})

		document.addEventListener('mousedown', (e) => {
			const el = e.target;

			if (el.closest('[data-target="ModalDepartureDate"]')) {
				// edit link clicked
				Kameleoon.API.Goals.processConversion(368991)
			}
		})
	}

	window[tag].variation = "variation-1";
	window[tag].init();
})(window);