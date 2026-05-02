((w) => {
	const tag = 'cv-2-1';
	const exp = 'LSG 2.1';
	const window = typeof unsafeWindow !== 'undefined' ? unsafeWindow : w;
	const qa = document.cookie.indexOf('cfQA') > -1;
	const utils = window['conv'].utils;
	const tablet = window.innerWidth < 1200;
	const mobile = window.innerWidth < 992;
	const log = qa ? Function.prototype.bind.call(console.log, console, `[CONV] ${exp} |`) : () => {};

	log('Running');

	utils
		.waitUntil(() => document.body, 0)
		.then((body) => body.classList.add(tag));

	const init = () => {
		if (!!!document.querySelector('.c-tour-card + :not(.cv-2-1-card)') && document.querySelectorAll('.c-tour-card').length > 1) return;

		utils.waitUntil(() => document.querySelector('.c-tour-card'), 0)
			.then(() => {
				const cards = document.querySelectorAll('.c-tour-card');
				cards.forEach(card => {
					utils.waitUntil(() => card.querySelector('#myTabContent > div:nth-child(1)')?.innerHTML.length > 0, 0)
						.then(() => {
							if (card?.nextElementSibling?.classList?.contains(`${tag}-card`)) return;

							const obj = {
								img: card.querySelector('.c-tour-card__image').getAttribute('data-src'),
								title: card.querySelector('h3').textContent,
								tab1: card.querySelector('#myTabContent > div:nth-child(1)').innerHTML,
								tab2: card.querySelector('#myTabContent > div:nth-child(2)').innerHTML,
								availability: card.querySelector('.c-availability-list').outerHTML,
								offer: card.querySelector('.c-TC-cost__item--offer').textContent,
								days: card.querySelector('.c-TC-cost__days').textContent,
								cost: card.querySelector('.c-TC-cost__costPP').textContent,
								total: '',
								cta: card.querySelector('.c-btn').outerHTML
							};

							if (card.querySelector('.c-TC-cost__costTotal')) obj.total = card.querySelector('.c-TC-cost__costTotal').textContent;

							card.insertAdjacentHTML('afterend', `
								<div class='${tag}-card'>
									<div class='${tag}-card-offer tablet'>${obj.offer}</div>
									<div class='${tag}-card-image' style='background-image: url(${obj.img})'></div>
									<div class='${tag}-card-inner'>
										<div class='${tag}-card-header'>
											<h3>${obj.title}</h3>
										</div>
										<div class='${tag}-card-info'>
											<div class='${tag}-card-info-left'>
												<div class='${tag}-card-tabs'>
													<div class='${tag}-card-tab-ctas'></div>
													<div class='${tag}-card-tab-content'></div>
												</div>
												<div class='${tag}-card-availability'>
													<p>Departures:</p>
													${obj.availability}
												</div>
											</div>
											<div class='${tag}-card-info-right'>
												<div class='${tag}-card-days'>${obj.days}</div>
												<div class='${tag}-card-cost'>${obj.cost}</div>
												<div class='${tag}-card-total'>${obj.total}</div>
												<div class='${tag}-card-offer'>${obj.offer}</div>
											</div>
										</div>
										<div class='${tag}-card-cta'>
											${obj.cta}
										</div>
									</div>
								</div>
							`);

							const cvCard = card.nextElementSibling;

							if (card.classList.contains('c-tour-card--hotel')) hotel(card, cvCard);
							
							tabs(card, cvCard);

							const sup = card.querySelector('.c-TC-cost__costSS');
							if (sup) {
								cvCard.querySelector(`.${tag}-card-total`).innerHTML = `${sup.innerText}`;
							}

							const discount = card.querySelector('.c-TC-cost__days + small');
							if (discount) {
								cvCard.querySelector(`.${tag}-card-cost`).insertAdjacentElement('beforebegin', discount);
							}

							const tripadvisor = card.querySelector('.c-TP');
							if (tripadvisor) {
								cvCard.querySelector('h3').insertAdjacentElement('afterend', tripadvisor);
							}

							card.style.display = 'none';
					});
				});

				titles();
				mobileNav();

				if (tablet) tabletFixes();
				
				labels();
				events();

				const labelCheck = setInterval(() => labels(), 1000);
				setTimeout(() => clearInterval(labelCheck), 5000);
			});
	};

	const hotel = (card, cvCard) => {
		cvCard.classList.add(`${tag}-hotel`);

		const stars = card.querySelector('.c-star-rating');
		const address = card.querySelector('.c-tour-card__header > p:last-child');
		const sponsor = card.querySelector('.c-TC-cost + div');
		const header = cvCard.querySelector(`.${tag}-card-header`);
		const left = cvCard.querySelector(`.${tag}-card-info-left`);
		const days = cvCard.querySelector(`.${tag}-card-days`);
		const offer = cvCard.querySelector(`.${tag}-card-offer`);

		header.insertAdjacentHTML('beforeend', `<div class='${tag}-stars-container'></div>`);

		const starsContainer = cvCard.querySelector(`.${tag}-stars-container`);
		if (stars) starsContainer.insertAdjacentElement('beforeend', stars);
		if (address) starsContainer.insertAdjacentElement('beforeend', address);
		if (sponsor) header.insertAdjacentElement('beforeend', sponsor);
		// if (days && !tablet) left.insertAdjacentElement('beforeend', days);
		// if (offer && !tablet) left.insertAdjacentElement('beforeend', offer);
	};

	const tabs = (card, cvCard) => {
		const tabs = card.querySelectorAll('#myTabContent > div');
		const tabTitles = card.querySelectorAll('#myTab li button');
		const ctaContainer = cvCard.querySelector(`.${tag}-card-tab-ctas`);
		const contentContainer = cvCard.querySelector(`.${tag}-card-tab-content`);

		tabs.forEach((tab, index) => {
			contentContainer.insertAdjacentHTML('beforeend', `
				<div class='${tag}-card-tab-${index}'>${tab.innerHTML}</div>	
			`);

			ctaContainer.insertAdjacentHTML('beforeend', `
				<button class='${tag}-tab'>${tabTitles[index].innerText}</button>
			`);

			const cvTab = ctaContainer.querySelector(`.${tag}-tab:last-child`);

			cvTab.addEventListener('click', () => {
				if (cvTab.classList.contains(`${tag}-tab-active`)) return;

				window.Kameleoon.API.Goals.processConversion(350781);

				Array.from(ctaContainer.children).forEach(element => element.classList.remove(`${tag}-tab-active`));
				Array.from(contentContainer.children).forEach(element => element.style.display = 'none');

				cvTab.classList.add(`${tag}-tab-active`);
				contentContainer.children[index].style.display = 'block';
			});

			if (index === 0)
				cvTab.classList.add(`${tag}-tab-active`);
		});
	};

	const titles = () => {
		utils.waitUntil(() => document.querySelector('div[data-ts-tour-list-container]'), 0)
			.then((element) => {
				const results = document.querySelector('.l-elastic__results-text');
				const navLinks = document.querySelectorAll('#elasticSearchFiltersTabs .c-nav__link');

				if (!document.querySelector(`.${tag}-page-tabs`)) {
					element.insertAdjacentHTML('afterbegin', `
						<h1>Find your next Coach Holiday</h1>
						<p>${results.innerText}</p>
						<div class='${tag}-page-tabs'>
							${Array.from(navLinks).map((link) => `
								<div class='${tag}-page-tab'>${link.textContent}</div>
							`).join('')}
						</div>
					`);
				}

				const pageTabs = document.querySelectorAll(`.${tag}-page-tab`);
				navLinks.forEach((nav, index) => {
					if (nav.classList.contains('-is-active')) {
						pageTabs[index].classList.add(`${tag}-active-page-tab`);
						
						const headLine = document.querySelector('h1');
						const sub = document.querySelector('h1 + p');
						const planTitle = pageTabs[index].textContent.trim().replace('Holidays','Holiday');
						headLine.textContent = headLine.textContent.replace('Coach Holiday', planTitle);
						if(!headLine.textContent.toLowerCase().includes('holiday')){
							headLine.textContent += ' Holiday'
						}
						sub.textContent = sub.textContent.replace('Coach Holidays', pageTabs[index].textContent);
					}

					pageTabs[index].addEventListener('click', () => {
						document.body.classList.add(`${tag}-load`);
						setTimeout(() => document.body.classList.remove(`${tag}-load`), 3000);
						nav.click();
					});
				});
			});

		utils.waitUntil(() => document.querySelector(`.${tag}-card-cost`), 0)
			.then(() => {
				const costs = document.querySelectorAll(`.${tag}-card-cost`);
				costs.forEach(cost => {
					if (cost.innerHTML.includes('<span>pp</span>')) return;
					cost.innerHTML = cost.innerHTML.replace('pp', '<span>pp</span>');
				});
			});
	};

	const mobileNav = () => {
		if (!mobile) return;
		
		utils.waitUntil(() => document.querySelector('#elastic-search-filters'), 0)
			.then((element) => {
				!document.querySelector(`.${tag}-mobile-info`) && element.insertAdjacentHTML('beforebegin', `
					<div class='${tag}-mobile-info'>
						<div class='${tag}-mobile-info-container'>
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
								<path d="M5.13882 14.9627H12.8592C13.968 14.9627 14.8702 14.0606 14.8702 12.9518V6.0576C14.8702 4.94877 13.9681 4.04664 12.8592 4.04664H12.0436V3.75484C12.0436 3.45601 11.8024 3.21484 11.5036 3.21484C11.2047 3.21484 10.9636 3.45601 10.9636 3.75484V4.04664H7.00358V3.75484C7.00358 3.45601 6.76242 3.21484 6.46358 3.21484C6.16475 3.21484 5.92358 3.45601 5.92358 3.75484V4.04664H5.13889C4.03005 4.04664 3.12793 4.94875 3.12793 6.0576V12.9518C3.12793 14.0613 4.02996 14.9627 5.13882 14.9627ZM12.8605 13.8827H5.13882C4.62553 13.8827 4.20788 13.4651 4.20788 12.9518V8.02214H13.7893V12.9504C13.7914 13.4651 13.3737 13.8827 12.8605 13.8827ZM5.13882 5.12736H5.92351V5.51056C5.92351 5.8094 6.16467 6.05056 6.46351 6.05056C6.76235 6.05056 7.00351 5.8094 7.00351 5.51056V5.12736H10.9635V5.51056C10.9635 5.8094 11.2047 6.05056 11.5035 6.05056C11.8023 6.05056 12.0435 5.8094 12.0435 5.51056V5.12736H12.8591C13.3724 5.12736 13.7901 5.54502 13.7901 6.0583V6.94425L4.20795 6.94354V6.0576C4.20795 5.54502 4.62553 5.12736 5.13882 5.12736Z" fill="white"/>
							</svg>
							<span>Any</span>
						</div>
						<div class='${tag}-mobile-info-container'>
							<svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
								<path d="M10.5872 8.32001C11.1703 7.79814 11.516 7.06189 11.5454 6.28001C11.5741 5.49814 11.2841 4.73814 10.741 4.17505C10.1985 3.61193 9.44974 3.29318 8.66723 3.29318C7.88472 3.29318 7.13598 3.61193 6.59347 4.17505C6.05035 4.73817 5.76035 5.49817 5.7891 6.28001C5.81847 7.06189 6.16411 7.79814 6.74723 8.32001C5.94286 8.60189 5.24598 9.12627 4.75219 9.82064C4.25907 10.5156 3.99344 11.3463 3.99219 12.1981C3.99219 12.4706 4.21281 12.6912 4.48468 12.6912C4.75718 12.6912 4.9778 12.4706 4.9778 12.1981C4.97843 11.3687 5.30843 10.5731 5.89531 9.98624C6.48219 9.39936 7.27718 9.06936 8.10715 9.06873H9.23964C10.0696 9.06936 10.8652 9.39936 11.4521 9.98624C12.0384 10.5731 12.3684 11.3687 12.3696 12.1981C12.3696 12.4706 12.5903 12.6912 12.8621 12.6912C13.1346 12.6912 13.3552 12.4706 13.3552 12.1981C13.3527 11.3443 13.0852 10.5125 12.5896 9.81808C12.0934 9.12307 11.394 8.59933 10.5871 8.31995L10.5872 8.32001ZM8.66723 4.30369C9.42972 4.30369 10.1166 4.76307 10.4085 5.46744C10.7004 6.17181 10.5391 6.98245 9.99976 7.5212C9.461 8.06057 8.65038 8.22182 7.946 7.92995C7.24163 7.63808 6.78225 6.9512 6.78225 6.18867C6.78225 5.14805 7.62601 4.30369 8.66723 4.30369Z" fill="white"/>
							</svg>
							<span>2</span>
						</div>
						<div class='${tag}-mobile-info-container'>
							<div class='${tag}-mobile-close'>
								<svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
									<path d="M10.3549 2.855L9.64469 2.14484L5.99969 5.795L2.35469 2.14484L1.64453 2.855L5.29469 6.5L1.64453 10.145L2.35469 10.8552L5.99969 7.205L9.64469 10.8552L10.3549 10.145L6.70469 6.5L10.3549 2.855Z" fill="white"/>
								</svg>
							</div>
						</div>
					</div>
				`);

				const date = document.querySelector('.ES-filters__field--departureDate .ES-filters__placeholder').textContent;
				const passengers = document.querySelector('.ES-filters__field--passengers .ES-filters__placeholder').textContent;

				const values = [date, passengers];

				document
					.querySelectorAll(`.${tag}-mobile-info-container span`)
					.forEach((element, index) => {
						if (index > 1) return;
						element.textContent = values[index];
					});

				const expand = document.querySelector('.l-elastic--RS-btn');

				!document.querySelector(`.${tag}-sort`) && expand.insertAdjacentHTML('beforebegin', `<div class='${tag}-sort'></div>`);

				expand.innerHTML = `
					<div class='${tag}-refine'>
						<svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
							<g clip-path="url(#clip0_2327_16475)">
								<path d="M9.14539 12.3561C8.30375 12.3561 7.61519 11.6676 7.61519 10.8259C7.61519 9.9842 8.30371 9.29568 9.14539 9.29568C9.98707 9.29568 10.6756 9.9842 10.6756 10.8259C10.6756 11.6676 9.98707 12.3561 9.14539 12.3561ZM6.08513 1.64552C6.92677 1.64552 7.61533 2.33404 7.61533 3.17572C7.61533 4.01736 6.92681 4.70592 6.08513 4.70592C5.24345 4.70592 4.55493 4.0174 4.55493 3.17572C4.55493 2.33408 5.24345 1.64552 6.08513 1.64552ZM13.7354 10.0608H12.1287C11.8224 8.76031 10.5985 7.76548 9.14497 7.76548C7.69135 7.76548 6.54405 8.76025 6.16129 10.0608H1.26507C0.80625 10.0608 0.5 10.367 0.5 10.8259C0.5 11.2847 0.80625 11.5909 1.26507 11.5909H6.16129C6.46754 12.8914 7.69149 13.8862 9.14497 13.8862C10.5986 13.8862 11.7459 12.8915 12.1287 11.5909H13.7354C14.1943 11.5909 14.5005 11.2847 14.5005 10.8259C14.5005 10.367 14.1182 10.0608 13.7354 10.0608ZM1.26563 3.94068H3.10145C3.4077 5.24115 4.63165 6.23598 6.08513 6.23598C7.53861 6.23598 8.68605 5.24121 9.06881 3.94068H13.7353C14.1941 3.94068 14.5004 3.63443 14.5004 3.17561C14.5004 2.71678 14.1941 2.41053 13.7353 2.41053H9.06881C8.76256 1.11006 7.53861 0.115234 6.08513 0.115234C4.63165 0.115234 3.48421 1.11 3.10145 2.41053H1.26563C0.80681 2.41053 0.50056 2.71678 0.50056 3.17561C0.50056 3.63443 0.80681 3.94068 1.26563 3.94068Z" fill="#3385B3"/>
							</g>
							<defs>
								<clipPath id="clip0_2327_16475">
									<rect width="14" height="14" fill="white" transform="translate(0.5)"/>
								</clipPath>
							</defs>
						</svg>
						Refine Search
					</div>
				`;

				const sort = document.querySelector('.l-form__field--filter-results');
				document.querySelector(`.${tag}-sort`).insertAdjacentElement('afterbegin', sort);

				expand.style.display = 'flex';
				document.querySelector(`.${tag}-sort`).style.display = 'block';

				const button = document.querySelector('.l-form__field--filter-results select');
				button.addEventListener('click', (e) => {
					e.preventDefault();
					e.stopPropagation();
				}, true);

				const refine = document.querySelector(`.${tag}-refine`);
				const close = document.querySelector(`.${tag}-mobile-close`);
				close.addEventListener('click', (e) => refine.click());
			});
	};

	const tabletFixes = () => {
		utils.waitUntil(() => document.querySelector(`.${tag}-card-cost`), 0)
			.then(() => {
				const costs = document.querySelectorAll(`.${tag}-card-cost`);
				costs.forEach(cost => {
					cost.innerHTML = cost.innerHTML.replace('pp', '<span>pp</span>');
				});
			});

		// utils.waitUntil(() => document.querySelector(`.${tag}-card`), 0)
		// 	.then(() => {
		// 		const cards = document.querySelectorAll(`.${tag}-card`);
		// 		cards.forEach(card => {
		// 			card.insertAdjacentElement('afterbegin', card.querySelector(`.${tag}-card-offer`));
		// 		});
		// 	});
	};

	const labels = () => {
		const labels = [
			'[src="/images/shearings/logos/signature-collection-blue-curve-bottom.png"]',
			'.c-tour-card--signature .c-tour-card__label--signature--top',
			'.arrowGDS',
			'.c-roundel',
			'.rdlSRAapr23',
			'.c-SDElogo',
			'.c-tour-card__label--moreIncluded',
			'.MBlogoTC',
		];

		utils.waitUntil(() => document.querySelector('.c-tour-card'), 0)
			.then(() => {
				const cards = document.querySelectorAll('.c-tour-card');
				cards.forEach(card => {
					labels.forEach(label => {
						const element = card.querySelector(label)
						if (element) {
							setTimeout(() => {
								const ref = card.nextElementSibling.querySelector(`.${tag}-card-image`);
								if (ref) ref.insertAdjacentElement('afterbegin', element);
							}, 500);
						}
					});
				});
			});
	};

	const events = () => {
		utils.waitUntil(() => document.querySelector(`.${tag}-refine`), 0)
			.then((element) => {
				element.addEventListener('click', () => {
					window.Kameleoon.API.Goals.processConversion(350789);
				});
			});
	};

	init();

	utils.waitUntil(() => document.querySelector('#tour-search-results'), 0)
		.then((element) => {
			var active = true;

			const config = { childList: true, subtree: true };
			const callback = () => {
				if (!active) return;

				active = false;

				const fire = setInterval(() => init(), 200);

				setTimeout(() => {
					active = true;
					clearInterval(fire)
				}, 1000);
			};
			const observer = new MutationObserver(callback);
			observer.observe(element, config);
		});

	window.addEventListener('orientationchange', () => setTimeout(() => init(), 1000));

})(window);