((w) => {
	"use strict";

	const tag = 'cv-4-16';
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const qa = document.cookie.indexOf('cfQA') > -1;
	const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 4.16 |') : () => { };

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

	// Step 1: Create an object to store data for the 4 sections with nested child elements
	const browseBySubjectData = {
		"Social Sciences": {
			ID: `${tag}__social-sciences`,
			title: 'Social Sciences & Humanities',
			destination: [
				{ name: "Area Studies", link: "/subjects/area-studies" },
				{ name: "Arts", link: "/subjects/arts" },
				{ name: "Communication Studies", link: "/subjects/communication-studies" },
				{ name: "Economics, Finance, Business & Industry", link: "/subjects/economics-finance-business-industry" },
				{ name: "Education", link: "/subjects/education" },
				{ name: "Geography", link: "/subjects/geography" },
				{ name: "Humanities", link: "/subjects/humanities" },
				{ name: "Language & Literature", link: "/subjects/language-and-literature" },
				{ name: "Law", link: "/subjects/law" },
				{ name: "Museum and Heritage Studies", link: "/subjects/museum-and-heritage-studies" },
				{ name: "Politics & International Relations", link: "/subjects/politics-and-international-relations" },
				{ name: "Social Sciences", link: "/subjects/social-sciences" },
				{ name: "Sports and Leisure", link: "/subjects/sports-and-leisure" },
				{ name: "Tourism, Hospitality and Events", link: "/subjects/tourism-hospitality-and-events" },
			],
		},
		"Physical Science": {
			ID: `${tag}__phy-science`,
			title: 'Physical Sciences & Engineering',
			destination: [
				{ name: "Computer Science", link: "/subjects/computer-science" },
				{ name: "Engineering & Technology", link: "/subjects/engineering-and-technology" },
				{ name: "Food Science & Technology", link: "/subjects/food-science-and-technology" },
				{ name: "Information Science", link: "/subjects/information-science" },
				{ name: "Mathematics & Statistics", link: "/subjects/mathematics-and-statistics" },
				{ name: "Physical Sciences", link: "/subjects/physical-sciences" },
			],
		},
		"Medicine Health": {
			ID: `${tag}__medicine-health`,
			title: 'Medicine, Health & Life Sciences',
			destination: [
				{ name: "Behavioral Sciences", link: "/subjects/behavioral-sciences" },
				{ name: "Bioscience", link: "/subjects/bioscience" },
				{ name: "Health and Social Care", link: "/subjects/health-and-social-care" },
				{ name: "Medicine, Dentistry, Nursing & Allied Health", link: "/subjects/medicine-dentistry-nursing-and-allied-health" },
			],
		},
		"Environmental Science": {
			ID: `${tag}__environmental-science`,
			title: 'Earth & Environmental Sciences',
			destination: [
				{ name: "Built Environment", link: "/subjects/built-environment" },
				{ name: "Earth Sciences", link: "/subjects/earth-sciences" },
				{ name: "Environment & Agriculture", link: "/subjects/environment-and-agriculture" },
				{ name: "Environment and Sustainability", link: "/subjects/environment-and-sustainability" },
				{ name: "Global Development", link: "/subjects/global-development" },
				{ name: "Urban Studies", link: "/subjects/urban-studies" },
			],
		},
	};

	const subjectData = [
		{ name: "Area Studies", link: "/subjects/area-studies", subjectName: "social-sciences" },
		{ name: "Arts", link: "/subjects/arts", subjectName: "social-sciences" },
		{ name: "Behavioral Sciences", link: "/subjects/behavioral-sciences", subjectName: "medicine-health" },
		{ name: "Bioscience", link: "/subjects/bioscience", subjectName: "medicine-health" },
		{ name: "Built Environment", link: "/subjects/built-environment", subjectName: "environmental-science" },
		{ name: "Communication Studies", link: "/subjects/communication-studies", subjectName: "social-sciences" },
		{ name: "Computer Science", link: "/subjects/computer-science", subjectName: "phy-science" },
		{ name: "Earth Sciences", link: "/subjects/earth-sciences", subjectName: "environmental-science" },
		{ name: "Economics, Finance, Business & Industry", link: "/subjects/economics-finance-business-industry", subjectName: "social-sciences" },
		{ name: "Education", link: "/subjects/education", subjectName: "social-sciences" },
		{ name: "Engineering & Technology", link: "/subjects/engineering-and-technology", subjectName: "phy-science" },
		{ name: "Environment & Agriculture", link: "/subjects/environment-and-agriculture", subjectName: "environmental-science" },
		{ name: "Environment and Sustainability", link: "/subjects/environment-and-sustainability", subjectName: "environmental-science" },
		{ name: "Food Science & Technology", link: "/subjects/food-science-and-technology", subjectName: "phy-science" },
		{ name: "Geography", link: "/subjects/geography", subjectName: "social-sciences" },
		{ name: "Global Development", link: "/subjects/global-development", subjectName: "environmental-science" },
		{ name: "Health and Social Care", link: "/subjects/health-and-social-care", subjectName: "medicine-health" },
		{ name: "Humanities", link: "/subjects/humanities", subjectName: "social-sciences" },
		{ name: "Information Science", link: "/subjects/information-science", subjectName: "phy-science" },
		{ name: "Language & Literature", link: "/subjects/language-and-literature", subjectName: "social-sciences" },
		{ name: "Law", link: "/subjects/law", subjectName: "social-sciences" },
		{ name: "Mathematics & Statistics", link: "/subjects/mathematics-and-statistics", subjectName: "phy-science" },
		{ name: "Medicine, Dentistry, Nursing & Allied Health", link: "/subjects/medicine-dentistry-nursing-and-allied-health", subjectName: "medicine-health" },
		{ name: "Museum and Heritage Studies", link: "/subjects/museum-and-heritage-studies", subjectName: "social-sciences" },
		{ name: "Physical Sciences", link: "/subjects/physical-sciences", subjectName: "phy-science" },
		{ name: "Politics & International Relations", link: "/subjects/politics-and-international-relations", subjectName: "social-sciences" },
		{ name: "Social Sciences", link: "/subjects/social-sciences", subjectName: "social-sciences" },
		{ name: "Sports and Leisure", link: "/subjects/sports-and-leisure", subjectName: "social-sciences" },
		{ name: "Tourism, Hospitality and Events", link: "/subjects/tourism-hospitality-and-events", subjectName: "social-sciences" },
		{ name: "Urban Studies", link: "/subjects/urban-studies", subjectName: "environmental-science" },
	];

	const generateHTML = (sections) => {
		let htmlString = '';

		// Loop through each section and generate HTML for each child element
		Object.keys(sections).forEach(section => {
			const { ID, title, destination } = sections[section];

			htmlString += `
				<div class="child" id="${ID}">
					<h2>${angleDown} ${title}</h2>
					<div class="${tag}__destination">
						<ul>
						${destination.map(dest => `
							<li><a href="https://www.tandfonline.com${dest.link}">${dest.name}</a></li>
							`).join('')}
						</ul>
					</div>
				</div>
			`;
		});

		return htmlString;
	};

	const angleDown = `<svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M5.29414 0.293848C5.68477 -0.0967774 6.31914 -0.0967774 6.70977 0.293848L11.7098 5.29385C12.1004 5.68447 12.1004 6.31885 11.7098 6.70947C11.3191 7.1001 10.6848 7.1001 10.2941 6.70947L6.00039 2.41572L1.70664 6.70635C1.31602 7.09697 0.681641 7.09697 0.291016 6.70635C-0.0996094 6.31572 -0.0996094 5.68135 0.291016 5.29072L5.29102 0.290722L5.29414 0.293848Z" fill="#0F147E"/>
	</svg>`;

	const externalLinkIcon = `
	<svg class="link-icon" width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path fill-rule="evenodd" clip-rule="evenodd" d="M8.75347 1.78824C8.90105 1.78824 9.01904 1.90788 9.01904 2.05546V2.65671C9.01904 2.8043 8.8994 2.92394 8.75181 2.92394H2.30876C2.30809 2.92395 2.30714 2.92398 2.30592 2.92403C2.30041 2.92422 2.2895 2.92472 2.27397 2.92592C2.24273 2.92832 2.19405 2.93345 2.13398 2.94423C2.01135 2.96624 1.85552 3.00926 1.7058 3.08988C1.5591 3.16887 1.42342 3.28082 1.32233 3.44412C1.22222 3.60583 1.13595 3.85014 1.13595 4.22665V12.1393C1.13597 12.1398 1.13599 12.1406 1.13602 12.1414C1.1362 12.1463 1.13664 12.1563 1.13772 12.1705C1.1399 12.1993 1.14457 12.2443 1.15442 12.3C1.17455 12.4138 1.21381 12.5577 1.28683 12.6953C1.35833 12.8301 1.45851 12.9526 1.60295 13.0433C1.74542 13.1328 1.96352 13.212 2.30506 13.212H10.2191C10.2201 13.212 10.2219 13.212 10.2246 13.2119C10.2318 13.2117 10.2446 13.2112 10.2623 13.21C10.2979 13.2077 10.3521 13.2029 10.4185 13.1928C10.554 13.1723 10.7252 13.1324 10.8888 13.0582C11.0516 12.9843 11.1891 12.8848 11.2858 12.7532C11.3779 12.6279 11.4574 12.4409 11.4574 12.1431V8.93646C11.4574 8.78887 11.5771 8.66923 11.7247 8.66923H12.3259C12.4735 8.66923 12.5931 8.78887 12.5931 8.93646V12.1431C12.5931 12.6637 12.4473 13.0905 12.2011 13.4256C11.9596 13.7543 11.6462 13.9616 11.358 14.0924C11.0707 14.2228 10.791 14.2851 10.5883 14.3158C10.4855 14.3313 10.3988 14.3393 10.3358 14.3433C10.3042 14.3454 10.2783 14.3465 10.259 14.3471C10.2493 14.3474 10.2413 14.3475 10.235 14.3476C10.2319 14.3477 10.2292 14.3477 10.2269 14.3477L10.2239 14.3477L10.2221 14.3477C9.47392 14.3477 4.5072 14.3477 2.30506 14.3477C1.77812 14.3477 1.34486 14.2224 0.998815 14.005C0.654732 13.7888 0.42924 13.5021 0.283615 13.2277C0.13952 12.9561 0.0702185 12.6908 0.0360751 12.4978C0.0187796 12.4 0.00987947 12.3172 0.00527317 12.2564C0.0029625 12.2259 0.0017107 12.2007 0.00103524 12.1816C0.000697253 12.172 0.000502616 12.164 0.000392396 12.1575C0.000357929 12.1555 0.000331743 12.1537 0.000311993 12.152C0.000300143 12.151 0.000290586 12.15 0.000283004 12.1491L0.000262043 12.1458L0.000257584 12.1444L0.000256564 12.1437C-0.00032052 11.4466 0.000256246 7.48305 0.000256246 4.22665C0.000256246 3.66788 0.131108 3.21073 0.356682 2.84634C0.581267 2.48355 0.879825 2.24476 1.16736 2.08993C1.45188 1.93673 1.73029 1.86284 1.93334 1.8264C2.03611 1.80795 2.12313 1.79847 2.18687 1.79356C2.24284 1.78926 2.28161 1.78841 2.29894 1.78826L2.30233 1.78824L2.30378 1.78824L2.30444 1.78824C2.70319 1.78791 6.77368 1.78821 8.75347 1.78824Z" fill="#10147E"/>
	<path d="M10.3884 1.55431L12.0586 3.15765L6.24648 8.93635C5.97926 9.17685 6.14627 9.40399 6.14627 9.40399L7.18176 10.4395C7.44899 10.6399 7.6494 10.3727 7.6494 10.3727L13.4615 4.62738L14.9646 6.16391C15.4991 6.69836 16.0001 6.16391 16.0001 5.76308V1.45411C16.0001 0.786048 15.488 0.641302 15.2319 0.652436H11.0231C10.0878 0.652436 10.2214 1.45411 10.3884 1.55431Z" fill="#10147E"/>
	</svg>`;


	const htmlStringMobile = `
	<div class="${tag}__browse-nav__mobile">
		<div class="${tag}__browse accordion">
			<h2>Browse ${angleDown}</h2>
			<div class="${tag}__destination">
				<ul>
					<li data-name="${tag}__browse-subject" class="has-child">Browse by subject ${angleDown}</li>
					<li><a href="/action/showPublications?pubType=journal&ejf=on">Browse all journals A-Z</a></li>
					<li><a href="/openaccess/openjournals">Open access journals</a></li>
					<li><a href="/openaccess/openselect">Open Select (hybrid) journals</a></li>
					<li><a target="_blank" href="https://www.taylorfrancis.com/">Explore Taylor & Francis eBooks ${externalLinkIcon}</a></li>
				</ul>
			</div>
		</div>
		<div class="${tag}__publish accordion">
			<h2>Publish ${angleDown}</h2>
			<div class="${tag}__destination">
				<ul>
					<li><a href="/action/showPublications?pubType=journal&amp;ejf=on">Find a journal</a></li>
					<li><a href="https://authorservices.taylorandfrancis.com/call-for-papers">Search calls for papers</a></li>
					<li><a href="https://authorservices.taylorandfrancis.com/publishing-your-research/choosing-a-journal/journal-suggester/">Journal Suggester</a></li>
					<li><a href="/openaccess">Open access publishing</a></li>
					<li><a href="https://authorservices.taylorandfrancis.com">Find guidance on <span>Author Services</span></a></li>
				</ul>				
			</div>
		</div>
		<div class="child" id="${tag}__browse-subject">
			<h2>${angleDown} Browse by subject</h2>
			<div class="${tag}__destination">
				<ul>
					<li data-name="${tag}__social-sciences" class="has-child">Social Sciences & Humanities ${angleDown}</li>
					<li data-name="${tag}__phy-science" class="has-child">Physical Sciences & Engineering ${angleDown}</li>
					<li data-name="${tag}__medicine-health" class="has-child">Medicine, Health & Life Sciences ${angleDown}</li>
					<li data-name="${tag}__environmental-science" class="has-child">Earth & Environmental Sciences ${angleDown}</li>
				</ul>
			</div>
		</div>
		${generateHTML(browseBySubjectData)}
	</div>	
	`;

	const htmlStringDesktop = `
		<div class="navigation--item__dropdown-content ${tag}__desktopNavItem">
			<div class="${tag}__nav-container">
				<button class="close-search ${tag}__close-btn" data-behaviour="close-dropdown">
                    <span class="off-screen">Close search</span>
                    <i aria-hidden="true" class="fa fa-times"></i>
                </button>
				<div class="${tag}__browse-column ${tag}__left">
					<div class="${tag}__column-left">
						<div class="${tag}__browse-journals">
							<p class="${tag}__nav-title">Browse all journals</p>
							<ul>
								<li>
									<a href="/action/showPublications?pubType=journal&ejf=on">Browse all journals A-Z</a>
								</li>
								<li>
									<a href="/openaccess/openjournals">Open access journals</a>
								</li>
								<li>
									<a href="/openaccess/openselect">Open Select (hybrid) journals</a>
								</li>
							</ul>
						</div>
						<div class="${tag}__browse-books">
							<p class="${tag}__nav-title">Browse all books</p>
							<ul>
								<li>
									<a target="_blank" href="https://www.taylorfrancis.com/">Explore Taylor & Francis eBooks ${externalLinkIcon}</a>
								</li>
							</ul>
						</div>
					</div>
					<div class="${tag}__column-right ${tag}__publish">
						<div class="${tag}__browse-publish">
							<p class="${tag}__nav-title">Publish</p>
							<ul>
								<li>
									<a href="/action/showPublications?pubType=journal&ejf=on">Find a journal</a>
								</li>
								<li>
									<a href="https://authorservices.taylorandfrancis.com/call-for-papers">Search calls for papers</a>
								</li>
								<li>
									<a href="https://authorservices.taylorandfrancis.com/publishing-your-research/choosing-a-journal/journal-suggester/">Journal Suggester</a>
								</li>
								<li>
									<a href="/openaccess">Open access publishing</a>
								</li>
								<li>
									<a href="https://authorservices.taylorandfrancis.com">Find guidance on Author Services</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="${tag}__browse-column ${tag}__right">
					<div class="${tag}__browse-subject">
						<p class="${tag}__nav-title">Browse by subject</p>
						<ul>
							<div class="${tag}__column">
								${subjectData.slice(0, 15).map(dest =>`<li><a href="https://www.tandfonline.com${dest.link}" class="${dest.subjectName}">${dest.name}</a></li>`
								).join('')}
							</div>
							<div class="${tag}__column">
								${subjectData.slice(15, 30).map(dest =>`<li><a href="https://www.tandfonline.com${dest.link}" class="${dest.subjectName}">${dest.name}</a></li>`
								).join('')}
							</div>
						</ul>
					</div>				
				</div>
			</div>
        </div>
	`

	function toggleOverlay(element) {
		if (element.style.display === "none" || element.style.display === "") {
			element.style.display = "block";
			document.body.style.overflow = 'hidden';
		} else {
			element.style.display = "none";
			document.body.style.overflow = 'auto';
		}
	}

	const initVariation = () => {
		utils.waitForElement('.first-top-navigation .topnav-browse-button', () => {
			const browseNav = document.querySelector(`.first-top-navigation .topnav-browse-button`);
			browseNav.insertAdjacentHTML('afterend', `
				<button class="${tag}__browse-nav">
            		<span>Browse</span>
            		<i aria-hidden="true" class="fa fa-chevron-down"></i>
        		</button>
			`);
		})

		utils.waitForElement('.navigation--item__dropdown-content-mobile', (element) => {
			element.insertAdjacentHTML('beforeend', htmlStringMobile + htmlStringDesktop);
		})


		document.addEventListener('click', (e) => {
			const elem = e.target;

			if (elem.closest(`.cv-4-16__browse-nav`)) {
				if(!document.querySelector(`.topnav-browse-button ~ .cv-4-16__desktopNavItem`)){
					elem.closest(`.cv-4-16__browse-nav`).insertAdjacentHTML('afterend',htmlStringDesktop);
				}

				const searchNavActive = document.querySelector(`.search--item__dropdown.active`);
				const publishNavActive = document.querySelector(`.publish--item__dropdown.active`);
				const overlay = document.querySelector('.modal-overlay.top-nav');

				searchNavActive && searchNavActive.classList.remove(`active`);
				searchNavActive && searchNavActive.nextElementSibling.classList.add(`hidden`);
				if (searchNavActive) overlay.style.display = "none";
				publishNavActive && publishNavActive.classList.remove(`active`);
				publishNavActive && publishNavActive.nextElementSibling.classList.add(`hidden`);

				elem.closest(`.cv-4-16__browse-nav`).classList.toggle('active');
				toggleOverlay(overlay);
			} else {
				if ((!elem.closest(`.cv-4-16__desktopNavItem`) || elem.closest(`.cv-4-16__close-btn`)) && document.querySelector(`.cv-4-16__browse-nav.active`)) {
					document.querySelector(`.cv-4-16__browse-nav`).classList.remove('active');
					document.querySelector('.modal-overlay.top-nav').style.display = "none";
					document.body.style.overflow = 'auto';
				}
			}

			if (elem.closest(`.cv-4-16__destination li.has-child`)) {
				const getID = elem.closest(`.cv-4-16__destination li.has-child`).getAttribute(`data-name`);
				document.querySelector(`#${getID}`).classList.add('active');
			}

			if (elem.closest(`.cv-4-16__browse-nav__mobile .child h2`)) {
				elem.closest(`.cv-4-16__browse-nav__mobile .child h2`).closest('.child').classList.remove('active');
			}

			if (elem.closest('.burger-menu-button')) {
				document.querySelector(`.cv-4-16__browse-nav__mobile .child.active`) &&
					document.querySelectorAll(`.cv-4-16__browse-nav__mobile .child.active`).forEach((el) => {
						el.classList.remove('active');
					})
			}

			if (elem.closest(`.cv-4-16__browse-nav__mobile .accordion h2`)) {
				elem.closest(`.cv-4-16__browse-nav__mobile .accordion h2`).classList.toggle('active');
			}

		})
	}

	utils.init();
})(window);