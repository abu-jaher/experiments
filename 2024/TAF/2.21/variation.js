((w) => {
	"use strict";

	const tag = 'cv-2-21';
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const qa = document.cookie.indexOf('cfQA') > -1;
	const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 2.21 |') : () => { };

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
				this.waitForElement('body', function (docBody) {
					docBody.classList.add(tag);
				});

				initVariation();

				log('test running');
			} catch (err) {
				log(err.message);
			}
		},
	}

	const initVariation = () => {
		utils.waitForElement('.sectionsNavigation .sections-nav .title', () => {
			document.body.classList.add(`${tag}__have-sections`);
			document.querySelector(`.sectionsNavigation .sections-nav .title`) ? document.querySelector(`.sectionsNavigation .sections-nav .title`).innerHTML = `Sections` : '';
			document.querySelector(`.sections-nav .title-btn`) ? document.querySelector(`.sections-nav .title-btn`).innerHTML = `Sections` : '';

			if(screen.width > 981 && screen.width <1025){
				const getHeight = document.querySelector('.publicationContentBody > .wrapped');
				getHeight ? document.querySelector('.publicationContentBody .col-md-1-6 .contents').style.minHeight = (getHeight.clientHeight - 80)+'px' : 'auto';
			}

			// remove number from the sections 
			const elements = document.querySelectorAll('.cv-2-21 .sectionsNavigation .sections-nav .sections-list a');
			elements.forEach(element => {
				element.textContent = element.textContent.replace(/^\d+\.\s+/, '');
			});
		})

		utils.waitForElement('.kwd-title', () => {
			document.querySelector(`.kwd-title`).innerHTML = `Keywords`;
		})

		utils.waitForElement('.furtherReadingTitle', () => {
			document.querySelector(`.furtherReadingTitle`).closest('.collapsed-sticky').classList.add('related-research');
			document.querySelector(`.furtherReadingTitle`).closest('.collapsed-view').classList.add('related-research');
		})

		utils.waitForElement('.scroll-content li a', () => {
			const stickyTab = document.querySelector(`.scroll-content`);
			document.querySelector(`.publicationContentBody`).insertAdjacentElement('afterbegin', stickyTab);
			// document.querySelector(`#full-article`) ? document.querySelector(`#full-article`).innerHTML = `Full articles` : '';

			const shareSocialString = `<a class="${tag}__share-social" href="javascript:void(0)">
				<img src="https://d1mgcpums0qvsa.cloudfront.net/TAF/2.21/np_share.svg">
				<img src="https://d1mgcpums0qvsa.cloudfront.net/TAF/2.21/np_share_white.svg" class="hov_icon">
				<span>Share</span>
			</a>
			`

			if(!document.querySelector(`.${tag}__share-social`)){
				if(document.querySelector('.publicationContentBody .tab-nav li.pdf-tab')){
					document.querySelector('.publicationContentBody .tab-nav li.pdf-tab').insertAdjacentHTML('beforeend',shareSocialString)
				}else{
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
			if(readArticle){
				const readArticleClone = readArticle.cloneNode(true);
				document.querySelector('.publicationContentBody .tab-nav li.pdf-tab').insertAdjacentElement('afterbegin',readArticleClone);
			}

			const pdfNav = document.querySelector('.publicationContentBody .tab-nav li.pdf-tab');
			const pdfNavClone = pdfNav.cloneNode(true);

			// scroll back to top and footer sticky
			document.body.insertAdjacentHTML('beforeend',`
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

			document.querySelector(`.${tag}__footer-sticky`).insertAdjacentElement('beforeend',pdfNavClone);
		})

		utils.waitForElement('.literatumContentItemPageRangeHistory', () => {
			const pageRange = document.querySelector(`.literatumContentItemPageRangeHistory`);

			!document.querySelector(`.literatumPublicationHeader .sub-title`) && document.querySelector(`.literatumPublicationHeader h1`).insertAdjacentElement('afterend', pageRange);
			document.querySelector(`.literatumPublicationHeader .sub-title`) && document.querySelector(`.literatumPublicationHeader .sub-title`).insertAdjacentElement('afterend', pageRange);

			const totalView = document.querySelector('.articleMetricsContainer .section:nth-of-type(1) .value').innerText;
			const totalCitations = document.querySelector('.articleMetricsContainer .section:nth-of-type(2) .value').innerText;
			const altmetric = document.querySelector('.articleMetricsContainer .section .metrics-score').innerText;

			const articleInfo = `
				<span class="${tag}__views"><strong>Views </strong>${totalView}</span> |
				<span class="${tag}__citations"><strong>Citations </strong>${totalCitations}</span> |
				<span class="${tag}__metric"><strong>Altmetric </strong>${altmetric}</span> |
			`

			!document.querySelector(`.${tag}__views`) && pageRange.querySelector('.itemPageRangeHistory').insertAdjacentHTML('afterbegin', articleInfo);


			// speaker tab & access logo 

			const speakTab = document.querySelector(`#read-speaker-container`);
			const openAccess = document.querySelector(`.accessLogo`);
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

		utils.waitForElement('.literatumArticleToolsWidget .linkList li.dx-doi a', ()=>{
			DOIlink = document.querySelector('.literatumArticleToolsWidget .linkList li.dx-doi a').getAttribute('href');
			document.querySelector('.literatumArticleToolsWidget .linkList li.dx-doi a').removeAttribute('href');
		})

		utils.waitForElement('.scroll-content.stick-top', ()=>{
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

			if(elem.closest('.linkList li.dx-doi a')){
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

			if(elem.closest(`.${tag}_back-top`)){
				window.scrollTo({
					top: 0,
					behavior: 'smooth',
				});
			}

			if(elem.closest(`.${tag}__footer-sticky .${tag}__sections`)){
				document.querySelector('.sections-nav .title-btn') && document.querySelector('.sections-nav .title-btn').click();
			}

			if(elem.closest(`.${tag}__related-research`) || elem.closest(`.scroll-content .pdf-tab a`)){
				document.querySelector('.open-nav .sections-nav .title-btn') && document.querySelector('.open-nav .sections-nav .title-btn').click();
			}

			if(elem.closest(`.${tag}__footer-sticky .${tag}__related-research`)){
				const element = document.querySelector('.related-research,.widget-compact-vertical.collapsed-view');
				const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
				const offsetPosition = elementPosition - (window.innerHeight / 2) + (element.clientHeight / 2);

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
			}
		})

		window.addEventListener('scroll',()=>{
			const backToTop = document.querySelector(`.${tag}_back-top`);
			const footerSticky = document.querySelector(`.${tag}__footer-sticky`);
			if(document.querySelector('.scroll-content.stick-top')){
				backToTop && backToTop.classList.add(`${tag}__stick-top`);
				footerSticky && footerSticky.classList.add(`${tag}__stick-top`);
			}else{
				backToTop && backToTop.classList.remove(`${tag}__stick-top`);
				footerSticky && footerSticky.classList.remove(`${tag}__stick-top`);
				document.querySelector('.sectionsNavigation.open-nav') && document.querySelector('.sections-nav .title-btn').click();
			}
		})
	}

	setTimeout(() => {
		document.body.style.opacity = 1;
	}, 3000)

	utils.init();
})(window);