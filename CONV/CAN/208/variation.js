((w) => {
	"use strict";

	const tag = "cv-208";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["cv-pjs"];

	const defaultFAQs = [
		{
			"faq": `Where can I find the serial number of my product?`,
			"link": `/support`,
		},
		{
			"faq": `Downloadable content`,
			"link": `/support`,
		},
		{
			"faq": `How to Register Warranty`,
			"link": `/support`,
		},
		{
			"faq": `An error code or message is displayed on my EOS camera`,
			"link": `/support`,
		},
	]

	window[tag].initVariation = () => {
		utils.waitUntil(
			() => document.body,
			() => {
				const currentModel =
					digitalData &&
					digitalData.product &&
					digitalData.product.productInfo &&
					digitalData.product.productInfo.productName;

				const getSupport = document.querySelector('[name="product-support-url"]');
				const getSupportURL = getSupport ? getSupport.getAttribute('content') : '';

				const getFaqList = (faqs, useSupportUrl = false) =>
					faqs.map(item => {
						const href = useSupportUrl
							? `${getSupportURL}?type=faq&search=1&searchurl=/support/consumer_products/content/faq/?itemid=${item.param}`
							: item.link;
						return `<li><a href="${href}">${item.faq}</a></li>`;
					}).join('');

				const dedupeFaqs = (faqArray) => {
					const seen = new Set();
					return faqArray.filter((item) => {
						if (seen.has(item.faq)) {
							return false;
						}
						seen.add(item.faq);
						return true;
					});
				};

				let faqLinks = '';

				if (currentModel) {
					const matchedFaqs = window[tag].data.filter(item =>
						item.models.split(',').map(m => m.trim()).includes(currentModel)
					);

					faqLinks = matchedFaqs.length > 0
						? getFaqList(dedupeFaqs(matchedFaqs), true)
						: getFaqList(dedupeFaqs(defaultFAQs));
				} else {
					faqLinks = getFaqList(dedupeFaqs(defaultFAQs));
				}


				const faqWidget = `<div id="${tag}__faq-widget">
							<a class="${tag}__faq-tab">Popular FAQS</a>
							<div class="${tag}__faq-panel">
								<div class="${tag}__faq-header">
									<h2 class="${tag}__faq-title">Popular FAQS</h2>
									<svg class="${tag}__faq-close-btn" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M13 0.5L7 6.5M1 12.5L7 6.5M7 6.5L13 12.5M7 6.5L1 0.5" stroke="black"/>
									</svg>
								</div>
								<div class="${tag}__faq-search-form">
									<svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9 5.5C9 7.433 7.433 9 5.5 9C3.567 9 2 7.433 2 5.5C2 3.567 3.567 2 5.5 2C7.433 2 9 3.567 9 5.5ZM8.61926 10.0305C7.73289 10.642 6.65825 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0C8.53757 0 11 2.46243 11 5.5C11 6.65842 10.6419 7.7332 10.0303 8.61964L15.7048 14.2942C16.0944 14.6838 16.0944 15.3155 15.7048 15.7051C15.3152 16.0947 14.6835 16.0947 14.2938 15.7051L8.61926 10.0305Z"></path> </svg>
									<input type="text" name="q" class="${tag}__faq-search-input" placeholder="Search FAQs">
								</div>
								<ul id="${tag}__faq-list">
									${faqLinks}
								</ul>
							</div>
						</div>`;

				document.body.insertAdjacentHTML(`beforeend`, faqWidget);

				const faqList = document.querySelector(`#cv-208__faq-list`);

				function checkScrollable(el) {
					if (el.scrollHeight > el.clientHeight) {
						el.classList.add("is-scrollable");
					} else {
						el.classList.remove("is-scrollable");
					}
				}

				checkScrollable(faqList);

				document.addEventListener(`click`, (e) => {
					const elem = e.target

					const faqWidget = document.querySelector(`#${tag}__faq-widget`)

					if (elem.closest(`.${tag}__faq-tab`)) {
						faqWidget.classList.toggle(`is-open`);
						window.optimizely = window.optimizely || [];
						window.optimizely.push({
							type: 'event',
							eventName: '_conv___208__cta_click',
						});
					}

					if (elem.closest(`.${tag}__faq-close-btn`)) {
						faqWidget.classList.remove(`is-open`);
						window.optimizely = window.optimizely || [];
						window.optimizely.push({
							type: 'event',
							eventName: '_conv___208__cta_click',
						});
					}

					const widget = document.querySelector(`#${tag}__faq-widget`);
					if (widget && !widget.contains(elem)) {
						faqWidget.classList.remove(`is-open`);
					}

					if (elem.closest(`#${tag}__faq-list li`)) {
						elem.closest(`#${tag}__faq-list li`).querySelector(`a`).click();
						window.optimizely = window.optimizely || [];
						window.optimizely.push({
							type: 'event',
							eventName: '_conv___208__component_click',
						});
					}
				})

				document.querySelector(`.${tag}__faq-search-input`).addEventListener("input", (e) => {
					const query = e.target.value.toLowerCase();
					const list = document.querySelector(`#${tag}__faq-list`);
					const listItems = list.querySelectorAll("li");

					let found = false;

					listItems.forEach((li) => {
						const text = li.textContent.toLowerCase();
						const match = text.includes(query);
						li.style.display = match ? "" : "none";
						if (match) found = true;
					});

					// Remove old "no result" if it exists
					const noResult = list.querySelector(`.${tag}__no-result`);
					if (noResult) noResult.remove();

					// If nothing found, add "No result found"
					if (!found && query.trim() !== "") {
						const li = document.createElement("li");
						li.className = `${tag}__no-result`;
						li.textContent = `No result found for "${e.target.value}"`;
						list.appendChild(li);
					}
				});
			},
			tag
		);
	};

	window[tag].variation = "variation-1";
	window[tag].init();
})(window);