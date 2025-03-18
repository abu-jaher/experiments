((w) => {
	"use strict";

	const tag = 'cv-2-21';
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const qa = document.cookie.indexOf('cfQA') > -1;
	const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 2.21 |') : () => { };

	let mobileVar = false;
	let desktopVar = false;

	const utils = {
		waitForElement: (cssSelector, callback) => {
			var stop,
				elementCached,
				timeout,
				check = () => {
					try {
						elementCached = document.querySelector(cssSelector);

						if (stop) return;

						if (elementCached) {
							callback(elementCached);
							clearTimeout(timeout);
						} else {
							window.requestAnimationFrame(check);
						}
					} catch (err) {
						log(err.message);
					}
				};

			window.requestAnimationFrame(check);

			timeout = setTimeout(() => {
				stop = true;
			}, 5000);
		},
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

		emitGAEvent: (label) => {
			let trackingID = 'UA-3062505-5';
			let stop;

			const check = () => {
				if (stop) return;

				if (!(
					window.ga instanceof Function &&
					window.ga.getAll instanceof Function
				)) return requestAnimationFrame(check);

				stop = true;

				const properties = window.ga.getAll();

				let analytics;

				if (trackingID)
					analytics = properties.find(
						property =>
							property.get('trackingId') === trackingID
					);

				analytics = analytics ? analytics : properties[0];

				if (analytics) analytics.send(
					'event',
					'Google Optimize experiment',
					'[CONV] TAF 2.21',
					label, { nonInteraction: true }
				);
			};
			requestAnimationFrame(check);
		},

		init: function () {
			try {
				this.waitUntil(() => document.body, 0).then((docBody) => {
					docBody.classList.add(tag);

					if (isMobile()) {
						docBody.classList.add(`${tag}__mobile`);
						initVariationMobile();
					} else {
						docBody.classList.add(`${tag}__desktop`);
						initVariationDesktop();
					}

					window.addEventListener('resize', function () {
						if (window.innerWidth < 768) {
							docBody.classList.remove(`${tag}__desktop`);
							docBody.classList.add(`${tag}__mobile`)
							initVariationMobile();
						} else {
							docBody.classList.remove(`${tag}__mobile`);
							docBody.classList.add(`${tag}__desktop`);
							initVariationDesktop();
						}
					});

				});

				log('test running');
			} catch (err) {
				log(err.message);
			}
		},
	}

	const isMobile = () => {
		return /Mobi|Android/i.test(navigator.userAgent) && !/iPad/i.test(navigator.userAgent);
	}

	const sectionIcon = `
	<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
	<path fill-rule="evenodd" clip-rule="evenodd" d="M7.24886 14.5861C7.24886 16.0858 5 16.0858 5 14.5861C5 13.0872 7.24886 13.0872 7.24886 14.5861Z" fill="currentColor"/>
	<path fill-rule="evenodd" clip-rule="evenodd" d="M9.49997 13.9106H15.1264C15.4362 13.9106 15.6884 14.1628 15.6884 14.4726V14.6973C15.6884 15.007 15.4362 15.2592 15.1264 15.2592L9.49997 15.2601C9.19017 15.2601 8.93799 15.0079 8.93799 14.6981V14.4735C8.93799 14.1628 9.19017 13.9106 9.49997 13.9106Z" fill="currentColor"/>
	<path fill-rule="evenodd" clip-rule="evenodd" d="M7.24886 10.2111C7.24886 11.71 5 11.71 5 10.2111C5 8.71219 7.24886 8.71219 7.24886 10.2111Z" fill="currentColor"/>
	<path fill-rule="evenodd" clip-rule="evenodd" d="M9.56198 10H15.1884C15.4982 10 15.7504 10.2522 15.7504 10.562V10.7866C15.7504 11.0964 15.4982 11.3486 15.1884 11.3486H9.56198C9.25218 11.3486 9 11.0964 9 10.7866V10.562C9 10.2522 9.25218 10 9.56198 10Z" fill="currentColor"/>
	<path fill-rule="evenodd" clip-rule="evenodd" d="M7.24886 6.83573C7.24886 8.33462 5 8.33462 5 6.83573C5 5.33601 7.24886 5.33601 7.24886 6.83573Z" fill="currentColor"/>
	<path fill-rule="evenodd" clip-rule="evenodd" d="M9.49997 6.16016H15.1264C15.4362 6.16016 15.6884 6.41234 15.6884 6.72214V6.94676C15.6884 7.25656 15.4362 7.50874 15.1264 7.50874H9.49997C9.19017 7.50874 8.93799 7.25656 8.93799 6.94676V6.72214C8.93799 6.41234 9.19017 6.16016 9.49997 6.16016Z" fill="currentColor"/>
  </svg>
	`;
	const pdfIcon = `
	<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
	<g clip-path="url(#clip0_4151_5166)">
	  <path d="M2.5 15H4V16.5H2.5C1.39688 16.5 0.5 15.6031 0.5 14.5V2.5C0.5 1.39688 1.39688 0.5 2.5 0.5H7.67188C8.20312 0.5 8.7125 0.709375 9.0875 1.08438L11.9156 3.9125C12.2906 4.2875 12.5 4.79688 12.5 5.32812V10H11V5.5H8.5C7.94688 5.5 7.5 5.05312 7.5 4.5V2H2.5C2.225 2 2 2.225 2 2.5V14.5C2 14.775 2.225 15 2.5 15ZM6 11.5H7C7.96562 11.5 8.75 12.2844 8.75 13.25C8.75 14.2156 7.96562 15 7 15H6.5V16C6.5 16.275 6.275 16.5 6 16.5C5.725 16.5 5.5 16.275 5.5 16V14.5V12C5.5 11.725 5.725 11.5 6 11.5ZM7 14C7.41563 14 7.75 13.6656 7.75 13.25C7.75 12.8344 7.41563 12.5 7 12.5H6.5V14H7ZM10 11.5H11C11.8281 11.5 12.5 12.1719 12.5 13V15C12.5 15.8281 11.8281 16.5 11 16.5H10C9.725 16.5 9.5 16.275 9.5 16V12C9.5 11.725 9.725 11.5 10 11.5ZM11 15.5C11.275 15.5 11.5 15.275 11.5 15V13C11.5 12.725 11.275 12.5 11 12.5H10.5V15.5H11ZM13.5 12C13.5 11.725 13.725 11.5 14 11.5H15.5C15.775 11.5 16 11.725 16 12C16 12.275 15.775 12.5 15.5 12.5H14.5V13.5H15.5C15.775 13.5 16 13.725 16 14C16 14.275 15.775 14.5 15.5 14.5H14.5V16C14.5 16.275 14.275 16.5 14 16.5C13.725 16.5 13.5 16.275 13.5 16V14V12Z" fill="currentColor"/>
	</g>
	<defs>
	  <clipPath id="clip0_4151_5166">
		<rect width="16" height="16" fill="currentColor" transform="translate(0.5 0.5)"/>
	  </clipPath>
	</defs>
  </svg>
	`;
	const moreIcon = `
	<svg xmlns="http://www.w3.org/2000/svg" width="6" height="19" viewBox="0 0 6 19" fill="none">
	<path d="M3.0463 12.4074C2.7025 12.4074 2.37278 12.544 2.12968 12.7871C1.88657 13.0302 1.75 13.3599 1.75 13.7037C1.75 14.0475 1.88657 14.3772 2.12968 14.6203C2.37278 14.8634 2.7025 15 3.0463 15C3.3901 15 3.71981 14.8634 3.96292 14.6203C4.20602 14.3772 4.34259 14.0475 4.34259 13.7037C4.34259 13.3599 4.20602 13.0302 3.96292 12.7871C3.71981 12.544 3.3901 12.4074 3.0463 12.4074ZM3.0463 8.7037C2.7025 8.7037 2.37278 8.84028 2.12968 9.08338C1.88657 9.32648 1.75 9.6562 1.75 10C1.75 10.3438 1.88657 10.6735 2.12968 10.9166C2.37278 11.1597 2.7025 11.2963 3.0463 11.2963C3.3901 11.2963 3.71981 11.1597 3.96292 10.9166C4.20602 10.6735 4.34259 10.3438 4.34259 10C4.34259 9.6562 4.20602 9.32648 3.96292 9.08338C3.71981 8.84028 3.3901 8.7037 3.0463 8.7037ZM4.34259 6.2963C4.34259 5.9525 4.20602 5.62278 3.96292 5.37968C3.71981 5.13657 3.3901 5 3.0463 5C2.7025 5 2.37278 5.13657 2.12968 5.37968C1.88657 5.62278 1.75 5.9525 1.75 6.2963C1.75 6.6401 1.88657 6.96981 2.12968 7.21292C2.37278 7.45602 2.7025 7.59259 3.0463 7.59259C3.3901 7.59259 3.71981 7.45602 3.96292 7.21292C4.20602 6.96981 4.34259 6.6401 4.34259 6.2963Z" fill="currentColor"/>
  </svg>
	`;
	const closeIcon = `
	<svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 15 20" fill="none">
	<path d="M13.3828 5.88281C13.8711 5.39453 13.8711 4.60156 13.3828 4.11328C12.8945 3.625 12.1016 3.625 11.6133 4.11328L7.5 8.23047L3.38281 4.11719C2.89453 3.62891 2.10156 3.62891 1.61328 4.11719C1.125 4.60547 1.125 5.39844 1.61328 5.88672L5.73047 10L1.61719 14.1172C1.12891 14.6055 1.12891 15.3984 1.61719 15.8867C2.10547 16.375 2.89844 16.375 3.38672 15.8867L7.5 11.7695L11.6172 15.8828C12.1055 16.3711 12.8984 16.3711 13.3867 15.8828C13.875 15.3945 13.875 14.6016 13.3867 14.1133L9.26953 10L13.3828 5.88281Z" fill="currentColor"/>
  </svg>
	`;
	const relatedResearchIcon = `
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
	<path d="M3.80816 3.26367H1.63184V15.6H11.5037V13.44H3.808L3.80816 3.26367Z" fill="currentColor"/>
	<path d="M11.5684 0.511719V3.19988H14.2565L11.5684 0.511719Z" fill="currentColor"/>
	<path d="M10.8636 3.90358V0.399902H4.49609V12.7362H14.3524L14.3518 3.90374L10.8636 3.90358ZM12.2236 11.0561H6.62361V10.3523H12.2236V11.0561ZM12.2236 8.67174H6.62361V7.968H12.2236V8.67174ZM12.2236 6.28806H6.62361V5.58432H12.2236V6.28806Z" fill="currentColor"/>
  </svg>
	`;
	const shareIcon = `
	<svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
	 <path d="M11.5004 10.3341C11.1335 10.3341 10.8004 10.4673 10.5004 10.6673L6.13349 8.16726C6.13349 8.10038 6.16662 8.03413 6.16662 8.00038C6.16662 7.96725 6.16662 7.86725 6.13349 7.8335L10.5004 5.33414C10.7673 5.53414 11.1335 5.66726 11.5004 5.66726C12.4335 5.66726 13.1673 4.93414 13.1673 4.00038C13.1673 3.06726 12.4341 2.3335 11.5004 2.3335C10.5673 2.3335 9.83349 3.06662 9.83349 4.00038C9.83349 4.06725 9.83349 4.10038 9.86662 4.16726L5.50038 6.6679C5.2335 6.4679 4.90038 6.33478 4.50038 6.33478C3.56726 6.33478 2.8335 7.0679 2.8335 8.00166C2.8335 8.93478 3.56662 9.66854 4.50038 9.66854C4.86726 9.66854 5.20038 9.53541 5.50038 9.33542L9.86726 11.8354C9.86726 11.9023 9.83413 11.9354 9.83413 12.0023C9.83413 12.9354 10.5673 13.6692 11.501 13.6692C12.4341 13.6692 13.1679 12.9361 13.1679 12.0023C13.1673 11.0679 12.4335 10.3341 11.5004 10.3341Z" fill="currentColor"/>
  </svg>
	`;

	const initVariationDesktop = () => {
		if(desktopVar == true) return;
		desktopVar = true;

		utils.waitForElement('.sectionsNavigation .sections-nav .title', () => {
			document.body.classList.add(`${tag}__have-sections`);
			document.querySelector(`.sectionsNavigation .sections-nav .title`) ? document.querySelector(`.sectionsNavigation .sections-nav .title`).innerHTML = `Sections` : '';
			document.querySelector(`.sections-nav .title-btn`) ? document.querySelector(`.sections-nav .title-btn`).innerHTML = `Sections` : '';

			if (screen.width > 981 && screen.width < 1025) {
				const getHeight = document.querySelector('.publicationContentBody > .wrapped');
				getHeight ? document.querySelector('.publicationContentBody .col-md-1-6 .contents').style.minHeight = (getHeight.clientHeight - 80) + 'px' : 'auto';
			}

			// remove number from the sections 
			const elements = document.querySelectorAll('.cv-2-21 .sectionsNavigation .sections-nav .sections-list a');
			elements.forEach(element => {
				element.textContent = element.textContent.replace(/^\d+\.\s+/, '');
			});
		})

		// utils.waitForElement('.kwd-title', () => {
		// 	document.querySelector(`.kwd-title`).innerHTML = `Keywords`;
		// })

		utils.waitForElement('.furtherReadingTitle', () => {
			document.querySelector(`.furtherReadingTitle`).closest('.collapsed-sticky').classList.add('related-research');
			document.querySelector(`.furtherReadingTitle`).closest('.collapsed-view').classList.add('related-research');
		})

		utils.waitForElement('.scroll-content li a', () => {
			const stickyTab = document.querySelector(`.scroll-content`);
			document.querySelector(`.publicationContentBody`).insertAdjacentElement('afterbegin', stickyTab);
			document.querySelector(`#full-article`) ? document.querySelector(`#full-article`).innerHTML = `Full article` : '';

			const shareSocialString = `<a class="${tag}__share-social" href="javascript:void(0)">
				<img src="https://d1mgcpums0qvsa.cloudfront.net/TAF/2.21/np_share.svg">
				<img src="https://d1mgcpums0qvsa.cloudfront.net/TAF/2.21/np_share_white.svg" class="hov_icon">
				<span>Share</span>
			</a>
			`

			if (!document.querySelector(`.${tag}__share-social`)) {
				if (document.querySelector('.publicationContentBody .tab-nav li.pdf-tab')) {
					document.querySelector('.publicationContentBody .tab-nav li.pdf-tab').insertAdjacentHTML('beforeend', shareSocialString)
				} else {
					document.querySelector('.publicationContentBody .tab-nav').insertAdjacentHTML('beforeend',
						`
						<li class="pdf-tab epub-tab ${tag}__custom-tab" role="presentation">
							${shareSocialString}
						</li>
						`
					)
				}
			}

			const readArticle = document.querySelector('.publicationContentBody .scroll-content .tab-nav li a[role="button"].grant-access');
			if (readArticle) {
				const readArticleClone = readArticle.cloneNode(true);
				document.querySelector('.publicationContentBody .tab-nav li.pdf-tab').insertAdjacentElement('afterbegin', readArticleClone);
			}

			const pdfNav = document.querySelector('.publicationContentBody .tab-nav li.pdf-tab');
			const pdfNavClone = pdfNav.cloneNode(true);

			// scroll back to top and footer sticky
			document.body.insertAdjacentHTML('beforeend', `
				<div class="${tag}_back-top">
					<span>Back to top</span>
				</div>
				<div class="${tag}__footer-sticky">
					<div class="${tag}__sections">
						<p>Sections</p>
					</div>
					<div class="${tag}__related-research">
						<p>Related research</p>
					</div>
				</div>
			`)

			document.querySelector(`.${tag}__footer-sticky`).insertAdjacentElement('beforeend', pdfNavClone);
		})

		utils.waitForElement('.literatumContentItemPageRangeHistory', () => {
			const pageRange = document.querySelector(`.literatumContentItemPageRangeHistory`);
			document.querySelector(`.literatumAuthors`) && document.querySelector(`.literatumAuthors`).insertAdjacentElement('beforebegin', pageRange);

			const totalView = document.querySelector('.articleMetricsContainer .section:nth-of-type(1) .value').innerText;
			const totalCitations = document.querySelector('.articleMetricsContainer .section:nth-of-type(2) .value').innerText;
			const altmetric = document.querySelector('.articleMetricsContainer .section .metrics-score').innerText;

			const articleInfo = `
				<span class="${tag}__views"><strong>Views </strong>${totalView}</span> |
				<span class="${tag}__citations"><strong>Citations </strong>${totalCitations}</span> |
				<span class="${tag}__metric desktop"><strong>Altmetric </strong>${altmetric}</span> |
			`

			!document.querySelector(`.${tag}__views`) && pageRange.querySelector('.itemPageRangeHistory').insertAdjacentHTML('afterbegin', articleInfo);

			const metricInterval = setInterval(() => {
				document.querySelector(`.${tag}__metric.desktop`).innerHTML = `<strong>Altmetric </strong>${document.querySelector('.articleMetricsContainer .section .metrics-score').innerText}`;
			}, 1000)

			setTimeout(() => {
				clearInterval(metricInterval);
			}, 3000)


			// speaker tab & access logo 

			const speakTab = document.querySelector(`#read-speaker-container`);
			const openAccess = document.querySelector(`.accessLogo`).cloneNode(true);
			const journalInfo = document.querySelector(`.info .issue-heading`);
			const tocHeading = document.querySelector(`.toc-heading`);

			const cvSpeakerSection = document.createElement('div');
			cvSpeakerSection.className = `${tag}__speaker-section`;

			// for screen size below 1025
			const clonedCvSpeakerSection = cvSpeakerSection.cloneNode(true);
			const clonedJournalInfo = journalInfo.cloneNode(true);
			const clonedTocHeading = tocHeading.cloneNode(true);
			clonedCvSpeakerSection.appendChild(clonedTocHeading);
			clonedCvSpeakerSection.appendChild(clonedJournalInfo);
			!document.querySelector(`.literatumPublicationHeader .${tag}__speaker-section`) && document.querySelector(`.literatumPublicationHeader h1`).insertAdjacentElement('beforebegin', clonedCvSpeakerSection);

			// for desktop
			speakTab && cvSpeakerSection.appendChild(speakTab);
			openAccess && cvSpeakerSection.appendChild(openAccess);
			tocHeading && cvSpeakerSection.appendChild(tocHeading);
			journalInfo && cvSpeakerSection.appendChild(journalInfo);

			!document.querySelector(`.publicationSerialHeader .${tag}__speaker-section`) && document.querySelector(`.search_container`).insertAdjacentElement('afterend', cvSpeakerSection);


			// insert article title
			const getArticleHeading = document.querySelector('.title-container .journal-heading').innerHTML;
			document.querySelector('.literatumPublicationHeader h1').insertAdjacentHTML('beforebegin',`<div class="${tag}__article-heading">${getArticleHeading}</div>`)

		})

		utils.waitForElement('.searchDropDownDivRight select [data-search-in="thisJournal"]', () => {
			document.querySelector('.searchDropDownDivRight select [data-search-in="thisJournal"]').innerText = 'This journal';
		})

		utils.waitForElement('.literatumArticleMetricsWidget .articleMetricsContainer', () => {
			const journalCover = document.querySelector(`.issueSerialNavigation.journal`);
			const clonedJournalCover = journalCover.cloneNode(true);
			clonedJournalCover.classList.add(`${tag}__cloned`);

			document.querySelector(`.literatumArticleMetricsWidget .articleMetricsContainer`).insertAdjacentElement('afterend', journalCover);
			document.querySelector(`.publicationContentHeader .literatumPublicationHeader`).parentElement.insertAdjacentElement('beforeend', clonedJournalCover);
		})

		let DOIlink;

		utils.waitForElement('.literatumArticleToolsWidget .linkList li.dx-doi a', () => {
			DOIlink = document.querySelector('.literatumArticleToolsWidget .linkList li.dx-doi a').getAttribute('href');
			document.querySelector('.literatumArticleToolsWidget .linkList li.dx-doi a').removeAttribute('href');
		})

		utils.waitForElement('.scroll-content.stick-top', () => {
			document.body.style.marginTop = '225px';
		})

		document.addEventListener('click', (e) => {
			const elem = e.target;

			if (elem.closest('.related-research .view-more')) {
				elem.closest('.related-research .view-more').classList.toggle(`${tag}__toggle`);
			}

			if (elem.closest('.publicationContentAuthors .show-all-link')) {
				elem.closest('.publicationContentAuthors .show-all-link').classList.toggle(`${tag}__toggle`);
			}

			if (elem.closest(`.${tag}__share-social`)) {
				document.querySelector('.a2a_dd').click();
			}

			if (elem.closest('.linkList li.dx-doi a')) {
				const link = DOIlink;

				const tempInput = document.createElement('textarea');
				tempInput.value = link;
				document.body.appendChild(tempInput);

				tempInput.select();
				document.execCommand('copy');

				document.body.removeChild(tempInput);

				const button = elem.closest('.linkList li.dx-doi a');
				button.classList.add(`${tag}__copied`);

				setTimeout(() => {
					button.classList.remove(`${tag}__copied`);
				}, 2000);
			}

			if (elem.closest(`.${tag}_back-top`)) {
				window.scrollTo({
					top: 0,
					behavior: 'smooth',
				});
			}

			if (elem.closest(`.${tag}__footer-sticky .${tag}__sections`)) {
				document.querySelector('.sections-nav .title-btn') && document.querySelector('.sections-nav .title-btn').click();
			}

			if (elem.closest(`.${tag}__related-research`) || elem.closest(`.scroll-content .pdf-tab a`)) {
				document.querySelector('.open-nav .sections-nav .title-btn') && document.querySelector('.open-nav .sections-nav .title-btn').click();
			}

			if (elem.closest(`.${tag}__footer-sticky .${tag}__related-research`)) {
				const element = document.querySelector('.related-research,.widget-compact-vertical.collapsed-view');
				const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
				const offsetPosition = elementPosition - (window.innerHeight / 2) + (element.clientHeight / 2);

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
			}

			if(elem.closest('.issueSerialNavigation.journal .cover')){
				document.querySelector('.jHomepage').click();
			}
		})

		window.addEventListener('scroll', () => {
			const backToTop = document.querySelector(`.${tag}_back-top`);
			const footerSticky = document.querySelector(`.${tag}__footer-sticky`);
			if (document.querySelector('.scroll-content.stick-top')) {
				backToTop && backToTop.classList.add(`${tag}__stick-top`);
				footerSticky && footerSticky.classList.add(`${tag}__stick-top`);
			} else {
				backToTop && backToTop.classList.remove(`${tag}__stick-top`);
				footerSticky && footerSticky.classList.remove(`${tag}__stick-top`);
				document.querySelector('.sectionsNavigation.open-nav') && document.querySelector('.sections-nav .title-btn').click();
			}
		})
	}

	function addContent(content) {
		if (!content) return;
		if (content === 'sections') {
			window.optimizely.push({
				type: 'event',
				eventName: 'Sections_clicks',
			});
			utils.waitForElement(
				'ul.sections-list',
				(oldSectionList = document.querySelector('ul.sections-list')) => {
					const sectionList = oldSectionList.cloneNode(true);
					sectionList.classList.add(`${tag}__sectionList`);
					const items = sectionList.querySelectorAll('li a');
					// items.forEach((item) => {
					// 	item.textContent = item.textContent.replace(/^\d+\s*/, '');
					// });
					const sectionContent = document.querySelector(`#${tag}__sections`);
					if (sectionContent) {
						const oldSectionList = document.querySelector(
							`.${tag}__sectionList`
						);
						if (oldSectionList) {
							oldSectionList.remove();
						}
						sectionContent
							.querySelector(`.${tag}__dynamicContent`)
							.appendChild(sectionList);

						let found = false;
						document.querySelectorAll(`.cv-2-21__sectionList li a`).forEach(item => {
							if (found) return;
							const targetId = item.getAttribute('href');
							const targetElement = document.querySelector(`${targetId}`);
							if (targetElement) {
								const rect = targetElement.getBoundingClientRect();
								if (rect.top >= 0 && rect.top <= window.innerHeight) {
									found = true;
									document.querySelector(`.cv-2-21__sectionList li a.active`) && document.querySelector(`.cv-2-21__sectionList li a.active`).classList.remove('active')
									item.classList.add('active');
								}
							}
						});	
					}
				}
			);
		}

		if (content === 'pdf') {
			utils.waitForElement('.epub-tab', () => {
				const items = Array.from(
					document.querySelectorAll('.publication-tabs .epub-tab a')
				);
				const markup = `
		   <ul class="${tag}__pdfList">
		   ${items
						.map((item) => {
							const label = item.querySelector('.mobile-label');
							if (!label) return '';
							label.textContent = label.textContent.replace('EPUB', 'ePub');
							return `
				<li class="${tag}__pdfItem">
				   ${item.outerHTML}
				</li>
			 `;
						})
						.join('')}
		   </ul>
		  `;
				const pdfContent = document.querySelector(`#${tag}__pdf`);
				if (pdfContent) {
					const oldPdfList = document.querySelector(`.${tag}__pdfList`);
					if (oldPdfList) {
						oldPdfList.remove();
					}
					pdfContent
						.querySelector(`.${tag}__dynamicContent`)
						.insertAdjacentHTML('beforeend', markup);
				}
			});
		}
		if (content === 'more') {
			window.optimizely.push({
				type: 'event',
				eventName: 'More_clicks',
			});
			utils.waitForElement(
				'[data-stick-observer-id="publication-tabs-dropdown-tab-nav"]',
				() => {
					const oldTabNav = document.querySelector(
						'[data-stick-observer-id="publication-tabs-dropdown-tab-nav"] > ul'
					);
					const tabNav = oldTabNav.cloneNode(true);
					tabNav.classList.add(`${tag}__tabNav`);
					tabNav.insertAdjacentHTML(
						'beforeend',
						`<li class="${tag}__tabNav__relatedResearch">
				 <button class="${tag}__tabNav__relatedResearch__btn ${tag}__relatedResearch">
				  ${relatedResearchIcon}
					<span>Related Research</span>
				 </button>
			  </li>`
					);
					const moreContent = document.querySelector(`#${tag}__more`);
					if (moreContent) {
						const oldTabNav = document.querySelector(`.${tag}__tabNav`);
						if (oldTabNav) {
							oldTabNav.remove();
						}
						moreContent
							.querySelector(`.${tag}__dynamicContent`)
							.appendChild(tabNav);

						// Add share Btn to the sticky menu
						utils.waitForElement('.a2a_dd', () => {
							const shareBtn = `
					<button class="${tag}__tabNav__share__btn ${tag}__share">
					   ${shareIcon}
					   <span>Share</span>
					</button>
				 `;
							const researchBtn = document.querySelector(
								`.${tag}__relatedResearch`
							);
							if (shareBtn) {
								researchBtn.insertAdjacentHTML('afterend', shareBtn);
							}
						});

						// Add "Check for Update" button
						utils.waitForElement('.cross_mark', () => {
							const oldCrossMark = document.querySelector('.cross_mark');
							const crossMark = oldCrossMark.cloneNode(true);
							crossMark.classList.add(`${tag}__crossMark`);
							const insertBefore = document.querySelector(
								`.${tag}__tabNav__relatedResearch`
							);
							if (!document.querySelector(`.${tag}__crossMark`)) {
								insertBefore.insertAdjacentElement('beforebegin', crossMark);
							}
						});

						// Add "Cite this article" button
						utils.waitForElement('.downloadCitations', () => {
							const oldCiteList = document.querySelector('.downloadCitations');
							const citeList = oldCiteList.cloneNode(true);
							citeList.classList.add(`${tag}__citeList`);
							const insertBefore =
								document.querySelector(`.${tag}__crossMark`) ||
								document.querySelector(`.${tag}__tabNav__relatedResearch`);
							if (!document.querySelector(`.${tag}__citeList`)) {
								insertBefore.insertAdjacentElement('beforebegin', citeList);
							}
						});
					}
				}
			);
		}
	}
	function toggleTabActiveClass(isCloseBtn = false, activeBtn, activeContent) {
		if ((!activeBtn || !activeContent) && !isCloseBtn) return;
		const wasBtnActive = isCloseBtn
			? false
			: activeBtn.parentElement.classList.contains(
				`${tag}__tabMenu__item--active`
			);
		const wasContentActive = isCloseBtn
			? false
			: activeContent.classList.contains(`${tag}__tabContent__item--active`);
		const tabs = document.querySelectorAll(`.${tag}__tabMenu__item`);
		const tabContents = document.querySelectorAll(`.${tag}__tabContent__item`);
		tabs.forEach((tab) =>
			tab.classList.remove(`${tag}__tabMenu__item--active`)
		);
		tabContents.forEach((tabContent) =>
			tabContent.classList.remove(`${tag}__tabContent__item--active`)
		);

		if ((wasBtnActive && wasContentActive) || isCloseBtn) return;
		activeBtn.parentElement.classList.add(`${tag}__tabMenu__item--active`);
		activeContent.classList.add(`${tag}__tabContent__item--active`);
		addContent(activeBtn.getAttribute('data-id'));
	}

	function initVariationMobile() {
		if(mobileVar == true) return;
		mobileVar = true;

		utils.waitForElement('.issueSerialNavigation .cover img', () => {
			const infoBanner = document.querySelector('.issueSerialNavigation');
			infoBanner.classList.add(`${tag}__infoBanner`);
			const issueHeading = document.querySelector('.issue-heading');
			if (issueHeading) {
				issueHeading.innerHTML = issueHeading.innerHTML.replace(
					'Volume',
					'Vol'
				);

				utils.waitForElement('.itemPageRangeHistory', () => {
					const items = document.querySelectorAll(
						'.itemPageRangeHistory > span'
					);
					items.forEach((item) => {
						const text = item.textContent.trim().toLowerCase();
						if (text.includes('published')) {
							const published = text.split(': ')[1];
							if (
								!issueHeading.querySelector(`.${tag}__issuePublished`) &&
								published
							) {
								const pageData = issueHeading.querySelector(
									`.${tag}__issueHeadingPages`
								);
								(pageData ? pageData : issueHeading).insertAdjacentHTML(
									`${pageData ? 'beforebegin' : 'beforeend'}`,
									`<span class="${tag}__issuePublished">, ${published}</span>`
								);
							}
						}
						if (text.includes('pages') || text.includes('article')) {
							if (!issueHeading.querySelector(`.${tag}__issueHeadingPages`)) {
								issueHeading.insertAdjacentHTML(
									'beforeend',
									`<span class="${tag}__issueHeadingPages">, ${text}</span>`
								);
							}
						}
					});
				});
			}

			// Heading and Metric section
			utils.waitForElement('h1 > span.NLM_article-title', () => {
				const heading = document.querySelector('h1 > span.NLM_article-title');
				if (heading) {
					const metric = document.querySelector('.articleMetricsContainer');
					if (metric) {
						metric.classList.add(`${tag}__metric`);
						const titles = metric.querySelectorAll('.title');
						titles.forEach((title) => {
							if (title.textContent.toLowerCase().includes('crossref')) {
								title.textContent = 'CrossRef';
							}
						});

						if(document.querySelector('.literatumPublicationHeader .sub-title')){
							document.querySelector('.literatumPublicationHeader .sub-title').insertAdjacentElement('afterend', metric);
						}else{
							heading.parentElement.insertAdjacentElement('afterend', metric);
						}
					}

					// Access logo and Article length
					utils.waitForElement('.accessLogo', () => {
						const accessLogo = document.querySelector('.accessLogo');
						const tocHeading = document.querySelector('.toc-heading');
						if (tocHeading) {
							const accessLogoWrapper = document.createElement('div');
							accessLogoWrapper.classList.add(`${tag}__accessLogoWrapper`);
							accessLogoWrapper.insertAdjacentElement('afterbegin', accessLogo);
							accessLogoWrapper.insertAdjacentElement('beforeend', tocHeading);
							heading.parentElement.insertAdjacentElement(
								'beforebegin',
								accessLogoWrapper
							);
						}
					});
				}
			});

			// Add "Share" button
			utils.waitForElement('.a2a_dd', () => {
				const shareBtn = `
			  <button class="${tag}__share--header">
				 ${shareIcon}
				 <span>Share</span>
			  </button>
		   `;
				const shareContainer = document.querySelector(
					'#read-speaker-container'
				);
				if (shareContainer) {
					shareContainer.insertAdjacentHTML('beforeend', shareBtn);
				}
			});

			// Author names
			// utils.waitForElement('.publicationContentAuthors .show-all-link', () => {
			// 	const authors = document.querySelectorAll('.contribDegrees');

			// 	authors[authors.length - 2].innerHTML = authors[4].innerHTML
			// 		.replace(
			// 			' & ',

			// 			''
			// 		)
			// 		.replace(' amp; ', '')
			// 		.replace(/,\s*$/, '');
			// 	authors[authors.length - 1].insertAdjacentHTML('afterbegin', ' & ');
			// });

			// Sticky Tab Menu
			utils.waitForElement(
				'.col-md-7-12:not(.serNav_container) [data-pb-dropzone="contents1"]',
				() => {
					const parent = document.querySelector(
						'.col-md-7-12:not(.serNav_container) [data-pb-dropzone="contents1"]'
					);
					const tabMarkup = `
		   <div class="${tag}__tabWrapper">
			  <ul class="${tag}__tabMenu">
				 <li class="${tag}__tabMenu__item hidden">
					<button class="${tag}__tabMenu__item__btn" data-id="sections">
					${sectionIcon}
					<span>Sections</span>
					</button>
				 </li>
				 <li class="${tag}__tabMenu__item hidden">
					<button class="${tag}__tabMenu__item__btn" data-id="pdf">
					${pdfIcon}
					<span>PDF/ePub</span>
					</button>
				 </li>
				 <li class="${tag}__tabMenu__item">
					<button class="${tag}__tabMenu__item__btn" data-id="more">
					${moreIcon}
					<span>More</span>
					</button>
				 </li>
			  </ul>
			  <div class="${tag}__tabContent">
				 <div
					id="${tag}__sections"
					class="${tag}__tabContent__item">
					<h4 class="${tag}__tabContent__item__heading">
					   Sections 
					   <button class="${tag}__tabClose">${closeIcon}</button>
					</h4>
					<div class="${tag}__dynamicContent"></div>
				 </div>
				 <div id="${tag}__pdf" class="${tag}__tabContent__item">
					<h4 class="${tag}__tabContent__item__heading">
					   View 
					   <button class="${tag}__tabClose">${closeIcon}</button>
					</h4>
					<div class="${tag}__dynamicContent"></div>
				 </div>
				 <div id="${tag}__more" class="${tag}__tabContent__item">
					<h4 class="${tag}__tabContent__item__heading">
					   More 
					   <button class="${tag}__tabClose">${closeIcon}</button>
					</h4>
					<div class="${tag}__dynamicContent"></div>
				 </div>
			  </div>
		   </div>
		  `;

					if (!document.querySelector(`.${tag}__tabWrapper`)) {
						parent.insertAdjacentHTML('afterbegin', tabMarkup);

						utils.waitForElement('.section-nav, .sections-nav', () => {
							const sectionTab = document.querySelector('[data-id="sections"]');
							if (sectionTab) {
								sectionTab.parentElement.classList.remove('hidden');
							}
						});
						utils.waitForElement('.pdf-tab, .epub-tab', () => {
							const pdfTab = document.querySelector('[data-id="pdf"]');
							if (pdfTab) {
								pdfTab.parentElement.classList.remove('hidden');
							}
						});

						utils.waitForElement('.grant-access', () => {
							const pdfTab = document.querySelector('[data-id="pdf"]');

							if (pdfTab) {
								pdfTab.parentElement.classList.add('hidden');

								const wrapper = document.querySelector(`.${tag}__tabWrapper`);
								wrapper.classList.add('noAccess');
								if (!wrapper.querySelector(`.${tag}__tabMenu__item--access`)) {
									wrapper
										.querySelector(`.${tag}__tabMenu__item:not(.hidden)`)
										.insertAdjacentHTML(
											'beforebegin',
											`
					   <li class="${tag}__tabMenu__item ${tag}__tabMenu__item--access">
						  <button class="${tag}__grantAccess">
							 Read this article
						  </button>
					   </li>
					   `
										);
								}

								utils.waitForElement('.a2a_dd', () => {
									if (!wrapper.querySelector(`.${tag}__tabMenu__item--share`)) {
										const accessBtn = wrapper.querySelector(
											`.${tag}__tabMenu__item--access`
										);
										const moreBtn = wrapper.querySelector(
											`.${tag}__tabMenu__item:not(.hidden)`
										);

										(accessBtn || moreBtn).insertAdjacentHTML(
											`${accessBtn ? 'afterend' : 'beforebegin'}`,
											`
							<li class="${tag}__tabMenu__item ${tag}__tabMenu__item--share">
							   <button class="${tag}__share--additional">
								  ${shareIcon}
								  <span>Share</span>
							   </button>
							</li>
							`
										);
									}
								});
							}
						});

						const tabWrapper = document.querySelector(`.${tag}__tabWrapper`);
						const header = document.querySelector('.publicationContentHeader');

						const observer = new IntersectionObserver(
							([entry]) => {
								if (!entry.isIntersecting) {
									tabWrapper.classList.add('sticky');
								} else {
									tabWrapper.classList.remove('sticky');
								}
							},
							{
								threshold: 0,
								rootMargin: `0px 0px 0px 0px`,
							}
						);

						observer.observe(header);
					}
				}


			);

			// Page headings
			// utils.waitForElement('h2.section-heading-2', () => {
			// 	const headings = document.querySelectorAll('h2.section-heading-2');
			// 	headings.forEach((heading) => {
			// 		heading.textContent = heading.textContent.replace(/^\d+\s*/, '');
			// 	});
			// });
		});

		document.body.addEventListener('click', (e) => {
			const el = e.target;
			if (el.closest(`.${tag}__tabMenu__item__btn`)) {
				const btn = el.closest(`.${tag}__tabMenu__item__btn`);
				const id = btn.getAttribute('data-id');
				const content = document.querySelector(`#${tag}__${id}`);
				if (btn && content) {
					toggleTabActiveClass(false, btn, content);
					btn.scrollIntoView({
						behavior: 'smooth',
						block: 'start',
					});
				}
				return;
			}
			if (el.closest(`.${tag}__tabClose`)) {
				toggleTabActiveClass(true);
				return;
			}

			if (el.closest(`.${tag}__relatedResearch`)) {
				utils.waitForElement(
					'.related-research, .further-tab-margin',
					(relatedResearchSection) => {
						const offset = -60;
						const elementPosition = relatedResearchSection.getBoundingClientRect().top + window.pageYOffset + offset;
						window.scrollTo({
							top: elementPosition,
							behavior: 'smooth'
						});
						toggleTabActiveClass(true);
					}
				);
				return;
			}
			if (
				el.closest(`.${tag}__share`) ||
				el.closest(`.${tag}__share--header`) ||
				el.closest(`.${tag}__share--additional`)
			) {
				utils.waitForElement('.a2a_dd', () => {
					const shareBtn = document.querySelector('.a2a_dd');
					shareBtn.click();
					toggleTabActiveClass(true);
				});
				return;
			}
			if (el.closest(`.${tag}__crossMark a`)) {
				e.preventDefault();
				utils.waitForElement(
					`.cross_mark:not(.${tag}__crossMark) a`,
					(updateLink) => {
						updateLink.click();
						toggleTabActiveClass(true);
					}
				);
				return;
			}
			if (el.closest(`.${tag}__grantAccess`)) {
				utils.waitForElement(`.grant-access`, (accessLink) => {
					accessLink.click();
					toggleTabActiveClass(true);
				});
				return;
			}

			if (el.closest(`#${tag}__sections .${tag}__dynamicContent ul li`)) {
				e.preventDefault();
				toggleTabActiveClass(true);
				const getDatabehaviour = el.closest(`.${tag}__dynamicContent ul li`).querySelector(`[data-behaviour-ref]`).getAttribute('data-behaviour-ref');
				const element = document.querySelector(getDatabehaviour);
				const elementPosition = element.getBoundingClientRect().top + window.scrollY; 
				window.scrollTo({
				  top: elementPosition - 70,
				  behavior: 'smooth'
				});
				return;
			}

			if(el.closest(`#${tag}__pdf .${tag}__dynamicContent ul li`) || el.closest(`#${tag}__more .${tag}__dynamicContent ul li`)){
				toggleTabActiveClass(true);
				return;
			}
		});
	}

	setTimeout(() => {
		document.body.style.opacity = 1;
	}, 3000)

	utils.init();
})(window);