((w) => {
	"use strict";

	const tag = "cv-4-0";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["conv"].utils;

	if (window[tag].variation) return;

	window[tag].initVariation = () => {
		utils.waitUntil((() => document.querySelector('.p-home #tour-search-results,.p-about-us .p-static-intro .l-col > p:last-of-type,.p-europe .p-static-intro, .p-all-destinations #all-destinations h1 + p, .p-all-types-intro.p-static-intro, .p-results .c-tour-card:nth-of-type(6)')), 0).then((targetElement) => {
			
			if((location.pathname.indexOf('searchresults') > -1 && document.querySelector(`a[data-tour-search-tab="SelfDrive"].active`)) || document.querySelector('.c-nav__link[data-event-label="Self Drive"].active')){
				document.body.classList.add(`${tag}__self-drive`);
			}else{
				document.body.classList.remove(`${tag}__self-drive`);
			}

			!document.querySelector(`.${tag}__section`) && insertHTML(targetElement);

			document.addEventListener('click', (e) => {
				const elem = e.target;
				if (elem.closest(`.${tag}__widget-tile`)) {
					window.Kameleoon.API.Goals.processConversion(347428)
				}

				// search filter applied
				if (elem.closest(`.l-modal--ES-options`) || elem.closest(`.ES-filters`) || elem.closest(`#elasticSearchFiltersTabs .c-nav__item`)) {
					filterApplied();
				}
			})

			document.addEventListener('change', (e) => {
				const elem = e.target;
				if (elem.closest(`#tour-card-select`)) {
					filterApplied();
				}
			})

		});
	};

	const filterApplied = ()=>{
		const interval = setInterval(() => {
			if(document.querySelector(`a[data-tour-search-tab="SelfDrive"].active`) && location.pathname.indexOf('searchresults') > -1){
				document.body.classList.add(`${tag}__self-drive`);
			}else{
				document.body.classList.remove(`${tag}__self-drive`);
			}
			const firstElement = document.querySelector('.p-results .c-tour-card:nth-of-type(2)');
			const secondElement = document.querySelector('.p-results .c-tour-card:nth-of-type(4)');
			const thirdElement = document.querySelector('.p-results .c-tour-card:nth-of-type(6)');
			const targetElement = (thirdElement && thirdElement) || (secondElement && secondElement) || (firstElement && firstElement);
			!document.querySelector(`.${tag}__section`) && insertHTML(targetElement);
		}, 50);

		setTimeout(() => {
			clearInterval(interval);
		}, 5000)
	}

	const insertHTML = (element) => {
		const getHTML = benefitHTML(benefitContent);
		element && element.insertAdjacentHTML('afterend', getHTML);
	}

	const benefitContent = {
		widgetsDesktop: [
			`trustpilot42.svg`,
			`bokItem-Link.svg`,
			`100-years-of-travel.svg`,
			`wining.svg`,
			`deposit.png`,
			`over-500.svg`,
		],

		widgetsMobile: [
			`trustpilot42.svg`,
			`bokItem-Link.svg`,
			`100-years-of-travel.svg`,
		]
	};

	const benefitHTML = (data) => {
		const logoSlidesDesktop = [];
		const logoSlidesMobile = [];
		for (let i = 0; i < data.widgetsDesktop.length; i++) {
			logoSlidesDesktop.push(`
				<div class="${tag}__widget-tile">
				  <img src="https://d1mgcpums0qvsa.cloudfront.net/LSG/4-0/${data.widgetsDesktop[i]}">
				</div>
			  `);
		}

		for (let i = 0; i < data.widgetsMobile.length; i++) {
			logoSlidesMobile.push(`
				<div class="${tag}__widget-tile">
				  <img src="https://d1mgcpums0qvsa.cloudfront.net/LSG/4-0/${data.widgetsMobile[i]}">
				</div>
			  `);
		}

		const elCont = `
		<div class="${tag}__section">
			<div class="${tag}__widget l-container">
				<div class="${tag}__widget-logos">
		            <div class="${tag}__widget-list ${tag}__desktop">
						${logoSlidesDesktop.join('')}
					</div>
                    <div class="${tag}__widget-list ${tag}__mobile">
						${logoSlidesMobile.join('')}
					</div>
				</div>
			</div>
		</div>	
		`;
		return elCont;
	};

	window[tag].variation = "variation-1";
	window[tag].init();
})(window);