((w) => {
	"use strict";

	const tag = 'cv-4-15';
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

	const customTracking = (label)=>{
		window['optimizely'] = window['optimizely'] || [];
		window['optimizely'].push({
			type: "event",
			eventName: label,
		});
	}

	function trackSectionBottom(sectionId) {
		const trackingMap = {
			'social-sciences': 'social_sciences___humanities_bottom_of_section_reached',
			'phy-science': 'physical_sciences___engineering_bottom_of_section_reached',
			'medicine-health': 'medicine__health___life_sciences_bottom_of_section_reached',
			'environmental-science': 'earth___environmental_sciences_bottom_of_section_reached'
		};
	
		const eventLabel = trackingMap[sectionId];
		if (eventLabel) {
			customTracking(eventLabel);
		}
	}

	// Step 1: Create an object to store data for the 4 sections with nested child elements
	const sectionsData = {
		"Social Sciences": {
			ID: `social-sciences`,
			title: 'Social Sciences & Humanities',
			destination: [
				{ name: "Area Studies", link: "/topic/allsubjects/as" },
				{ name: "Language & Literature", link: "/topic/allsubjects/la" },
				{ name: "Arts", link: "/topic/allsubjects/ar" },
				{ name: "Law", link: "/topic/allsubjects/lw" },
				{ name: "Communication Studies", link: "/topic/allsubjects/cs" },
				{ name: "Museum & Heritage Studies", link: "/topic/allsubjects/ah" },
				{ name: "Economics, Finance, Business & Industry", link: "/topic/allsubjects/eb" },
				{ name: "Politics & International Relations", link: "/topic/allsubjects/pi" },
				{ name: "Education", link: "/topic/allsubjects/ed" },
				{ name: "Social Sciences", link: "/topic/allsubjects/sn" },
				{ name: "Geography", link: "/topic/allsubjects/ge" },
				{ name: "Sport & Leisure", link: "/topic/allsubjects/sl" },
				{ name: "Humanities", link: "/topic/allsubjects/hu" },
				{ name: "Tourism, Hospitality and Events", link: "/topic/allsubjects/sp" },
			],
			featuredJournals: [
				{
					title: "Journal of Psychology and AI",
					img: "/cms/asset/83188e88-b6a4-4257-bcd5-e0c9342232c3/default_cover.jpg",
					text: "Fostering dialogue between technologists developing AI systems and psychologists; bridging understanding between AI technology and its applications.",
					link: "/journals/tpai20",
				},
				{
					title: "The Journal of Higher Education",
					img: "/cms/asset/9e656ee9-284f-46c1-91b4-3403e66697f1/uhej20.v095.i06.cover.jpg",
					text: "The Journal of Higher Education publishes research into the academic study of higher education addressing institutional and educational developments issues.",
					link: "/journals/uhej20",
				},
				{
					title: "Cogent Business & Management",
					img: "/cms/asset/2e4eabc6-a0ee-44b7-8277-9dc990d880f8/ujhe20.v055.i05.cover.jpg",
					text: "Publishes research that strives for inclusivity and global reach in all areas of business and management, from operations research to corporate governance.",
					link: "/journals/oabm20",
				}
			],
			popularArticles: [
				{
					title: "Representations of calendars and time at Göbekli Tepe and Karahan Tepe support an astronomical interpretation of their symbolism",
					authorName: "Martin B. Sweatman",
					journalType: "Time and Mind",
					date: "Published online: 24 Jul 2024",
					articleLink: "/doi/full/10.1080/1751696X.2024.2373876",
				},
				{
					title: "A multidisciplinary scientific investigation of the 1916 Hawthorn Mine Crater, Beaumont Hamel, Somme, Northern France",
					authorName: "K.D. Wisniewski",
					journalType: "Journal of Conflict Archaeology",
					date: "Published online: 07 Jan 2024",
					articleLink: "/doi/full/10.1080/15740773.2023.2297202",
				},
				{
					title: "‘Instructive types’ or mere ‘fancies’: assessing French fashion prints in the library of Samuel Pepys",
					authorName: "Marlo Avidon",
					journalType: "The Seventeenth Century",
					date: "Published online: 21 Jul 2024",
					articleLink: "/doi/full/10.1080/0268117x.2024.2373990",
				}
			]
		},
		"Physical Science": {
			ID: `phy-science`,
			title: 'Physical Sciences & Engineering',
			destination: [
				{ name: "Computer Science", link: "/topic/allsubjects/cm" },
				{ name: "Information Science", link: "/topic/allsubjects/if" },
				{ name: "Engineering & Technology", link: "/topic/allsubjects/ec" },
				{ name: "Mathematics & Statistics", link: "/topic/allsubjects/ma" },
				{ name: "Food Science and Technology", link: "/topic/allsubjects/fs" },
				{ name: "Physical Sciences", link: "/topic/allsubjects/pc" },
			],
			featuredJournals: [
				{
					title: "Applied Operations and Analytics",
					img: "/cms/asset/9d23548a-f5a6-4a40-b5a6-d8137589f004/default_cover.jpg",
					text: "An open access, cross-disciplinary journal publishing analytical research to enable decision making, comprehension of complex systems, and problem-solving.",
					link: "/journals/taoa20",
				},
				{
					title: "Journal of the American Statistical Association",
					img: "/cms/asset/881e3f33-5a4c-44e5-9ab2-f7d536cfa304/uasa20.v119.i546.cover.jpg",
					text: "Journal of the American Statistical Association is a journal of statistical science that publishes research in statistical applications, theory and methods.",
					link: "/journals/uasa20",
				},
				{
					title: "Cogent Engineering",
					img: "/cms/asset/09544a91-e5ee-4a5b-ad91-ae50922a285f/oaen20.v011.i01.cover.jpg",
					text: "Publishes research on all areas of engineering and technology including computer science, chemical, mechanical, biomedical, civil and environmental engineering.",
					link: "/journals/oaen20",
				}
			],
			popularArticles: [
				{
					title: "Stand-Capable Workstations Reduce Occupational Sedentary Time Among Administrative Workers",
					authorName: "Tricia Lynn Salzar",
					journalType: "IISE Transactions on Occupational Ergonomics and Human Factors",
					date: "Published online: 17 Jun 2024",
					articleLink: "/doi/full/10.1080/24725838.2024.2362720",
				},
				{
					title: "Belonging in the workplace: Methodology for fair and equitable data analysis",
					authorName: "A. D. Carter",
					journalType: "CIM Journal",
					date: "Published online: 31 Jan 2024",
					articleLink: "/doi/full/10.1080/19236026.2023.2267941",
				},
				{
					title: "The impact of bicycle theft on ridership behavior",
					authorName: "Achituv Cohen",
					journalType: "International Journal of Sustainable Transportation",
					date: "Published online: 14 May 2024",
					articleLink: "/doi/full/10.1080/15568318.2024.2350946"
				}
			]
		},
		"Medicine Health": {
			ID: `medicine-health`,
			title: 'Medicine, Health & Life Sciences',
			destination: [
				{ name: "Behavioural Science", link: "/topic/allsubjects/be" },
				{ name: "Health and Social Care", link: "/topic/allsubjects/hs" },
				{ name: "Bioscience", link: "/topic/allsubjects/bs" },
				{ name: "Medicine, Dentistry, Nursing & Allied Health", link: "/topic/allsubjects/me" },
			],
			featuredJournals: [
				{
					title: "Gut Microbes Reports",
					img: "/cms/asset/69032fcb-5117-4570-9b1e-914a779c2198/kgmr20.v001.i01.cover.jpg",
					text: "With a holistic, microbial ecology focus, this journal covers research data on intestinal microorganisms, their role, and their impact on health and disease.",
					link: "/journals/kgmr20",
				},
				{
					title: "Annals of Medicine",
					img: "/cms/asset/a4790af3-2b39-48dc-8dd8-f078d4c37fdf/iann20.v056.i01.cover.jpg",
					text: "A peer-reviewed OA journal publishing across all areas of medicine as part of the Elevate Series",
					link: "/journals/iann20",
				},
				{
					title: "Molecular and Cellular Biology",
					img: "/cms/asset/6ab8de42-622b-4210-bf19-593b6e393713/tmcb20.v044.i09.cover.jpg",
					text: "This journal covers advancements in research around the molecular biology of all eukaryotic cells. It includes gene expression and genome organization, and studies of chronic diseases and conditions.",
					link: "/journals/tmcb20",
				}
			],
			popularArticles: [
				{
					title: "ADHD Prevalence Among U.S. Children and Adolescents in 2022: Diagnosis, Severity, Co-Occurring Disorders, and Treatment",
					authorName: "Melissa L. Danielson",
					journalType: "Journal of Clinical Child & Adolescent Psychology",
					date: "Published online: 22 May 2024",
					articleLink: "/doi/full/10.1080/15374416.2024.2335625",
				},
				{
					title: "Cognitive components of aging-related increase in word-finding difficulty",
					authorName: "Hsi T. Wei",
					journalType: "Aging, Neuropsychology, and Cognition",
					date: "Published online: 14 Feb 2024",
					articleLink: "/doi/full/10.1080/13825585.2024.2315774",
				},
				{
					title: "Highly pathogenic avian influenza A(H5N1) virus of clade 2.3.4.4b isolated from a human case in Chile causes fatal disease and transmits between co-housed ferrets",
					authorName: "Joanna A. Pulit-Penaloza",
					journalType: "Emerging Microbes & Infections",
					date: "Published online: 13 Jun 2024",
					articleLink: "/doi/full/10.1080/22221751.2024.2332667"
				}
			]
		},
		"Environmental Science": {
			ID: `environmental-science`,
			title: 'Earth & Environmental Sciences',
			destination: [
				{ name: "Built Environment", link: "/topic/allsubjects/bu" },
				{ name: "Environment and Sustainability", link: "/topic/allsubjects/es" },
				{ name: "Earth Sciences", link: "/topic/allsubjects/ea" },
				{ name: "Global Development", link: "/topic/allsubjects/ds" },
				{ name: "Environment & Agriculture", link: "/topic/allsubjects/ag" },
				{ name: "Urban Studies", link: "/topic/allsubjects/us" },
			],
			featuredJournals: [
				{
					title: "Digital Water",
					img: "/cms/asset/b4c3a422-07dd-4bf3-bf5f-0e5bdcaaf9e8/tdwa20.v001.i01.cover.jpg",
					text: "Digital Water covers digital transformation across water resources research, including water uses, systems, environment preservation and disaster mitigation.",
					link: "/journals/tdwa20",
				},
				{
					title: "Critical Reviews in Environmental Science and Technology",
					img: "/cms/asset/79eca8fe-4ebb-4c1f-bd58-eac2fb4791b6/best20.v054.i20.cover.jpg",
					text: "Publishes research on a range of topics in environmental science, including earth and agricultural sciences, environmental toxicology and risk assessment.",
					link: "/journals/best20",
				},
				{
					title: "All Earth",
					img: "/cms/asset/6041f79c-4d7e-414d-b4cd-fc3be5eb1e9a/tgda21.v036.i01.cover.jpg",
					text: "Formerly Geodinamica Acta, this open access journal publishes across Earth Science fields including multi-disciplinary studies and sound, reproducible research.",
					link: "/journals/tgda21",
				}
			],
			popularArticles: [
				{
					title: "Comptonatus chasei, a new iguanodontian dinosaur from the Lower Cretaceous Wessex Formation of the Isle of Wight, southern England",
					authorName: "Jeremy A. F. Lockwood",
					journalType: "Journal of Systematic Palaeontology",
					date: "Published online: 09 Jul 2024",
					articleLink: "/doi/full/10.1080/14772019.2024.2346573",
				},
				{
					title: "What if Germany had invested in nuclear power? A comparison between the German energy policy the last 20 years and an alternative policy of investing in nuclear power",
					authorName: "Jan Emblemsvåg",
					journalType: "International Journal of Sustainable Energy",
					date: "Published online: 02 Jun 2024",
					articleLink: "/doi/full/10.1080/14786451.2024.2355642",
				},
				{
					title: "A new pterosaur from the Middle Jurassic of Skye, Scotland and the early diversification of flying reptiles",
					authorName: "Elizabeth Martin-Silverstone",
					journalType: "Journal of Vertebrate Paleontology",
					date: "Published online: 05 Feb 2024",
					articleLink: "/doi/full/10.1080/02724634.2023.2298741"
				}
			]
		},
	};

	const generateHTML = (sections) => {
		let htmlString = '';

		// Loop through each section and generate HTML for each child element
		Object.keys(sections).forEach(section => {
			const { ID, title, destination, featuredJournals, popularArticles } = sections[section];

			htmlString += `
		<div class="${tag}__row" id="${ID}">
		  <h2>${title}</h2>
		  <div class="${tag}__destination">
			<ul>
			  ${destination.map(dest => `
				<li><a href="${dest.link}">${dest.name}</a></li>
			  `).join('')}
			</ul>
		  </div>
  
		  <div class="${tag}__journals">
			<h3>Featured journals</h3>
			<div class="journals">
			  ${featuredJournals.map(journal => `
				<a href="${journal.link}">
					<div class="journal">
					<div>
						<img src="${journal.img}" alt="${journal.title}">
						<h4>${journal.title}</h4>
					</div>
					<p>${journal.text}</p>
					</div>
				</a>
			  `).join('')}
			</div>
		  </div>
  
		  <div class="${tag}__articles">
			<h3>Popular articles</h3>
			<div class="articles">
			  ${popularArticles.map(article => `
				<div class="article">
				  <a class="article-title" href="${article.articleLink}">${article.title}</a>
				  <div class="article-details">
				  		<p class="author-name">${article.authorName}</p>
				  		<p class="journal-type">${article.journalType}</p>
				  		<p class="published-date">${article.date}</p>
				  </div>
				</div>
			  `).join('')}
			</div>
		  </div>
		</div>
	  `;
		});

		return htmlString;
	};

	const htmlString = `
	<div class="${tag}__curation-section">
		<div class="${tag}__curation-header">
			<h2>Explore journals and articles by subject</h2>
			<p>Search and explore the millions of quality, peer-reviewed journal articles published under the Taylor & Francis, Routledge and Dove Medical Press imprints</p>
		</div>
		<div class="${tag}__curation-nav">
			<div class="${tag}__nav-container">
				<div class="${tag}__nav-items">
					<a data-id="social-sciences">Social Sciences & Humanities</a>
					<a data-id="phy-science">Physical Sciences & Engineering</a>
					<a data-id="medicine-health">Medicine, Health & Life Sciences</a>
					<a data-id="environmental-science">Earth & Environmental Sciences</a>
				</div>
			</div>
		</div>
		<div class="${tag}__curation">
			${generateHTML(sectionsData)}
		</div>
	</div>	
	`

	function isInViewport(element) {
		const rect = element.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}

	const navStickyFunc = (sections)=>{
		const scrollY = window.pageYOffset;
		const heroHeight = document.querySelector('.cv-4-15__curation-section').offsetTop;


		// make nav sticky
		if (document.querySelector('.cv-4-15__curation-nav').getBoundingClientRect().top < 0 && document.querySelector('.cv-4-15__curation-section').getBoundingClientRect().bottom > 100) {
			document.querySelector('.cv-4-15__nav-container').classList.add(`${tag}__sticky`);
		} else {
			document.querySelector('.cv-4-15__nav-container').classList.remove(`${tag}__sticky`);
		}

		// add active class
		sections.forEach(current => {
			const sectionHeight = current.offsetHeight;
			const sectionTop = (current.offsetTop + heroHeight) - 40;
			const sectionId = current.getAttribute('id');

			const articleElem = current.querySelector(`.${tag}__articles`);

			if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
				document.querySelector(`.${tag}__curation-nav a[data-id*='${sectionId}']`).classList.add(`${tag}__active`);
			} else {
				document.querySelector(`.${tag}__curation-nav a[data-id*='${sectionId}']`).classList.remove(`${tag}__active`);
			}

			if (isInViewport(articleElem) && !articleElem.classList.contains(`${tag}__bottom-reached`)) {
				articleElem.classList.add(`${tag}__bottom-reached`);
				trackSectionBottom(sectionId);
			}

		})
	}

	const initVariation = () => {
		utils.waitForElement('.secondary-audience .full', () => {
			document.querySelector('[aria-label="Topic Navigation"]') && document.querySelector('[aria-label="Topic Navigation"]').closest('.widget').classList.add(`${tag}__hide`);
			document.querySelector('.secondary-audience').insertAdjacentHTML('beforebegin', htmlString);
			const sections = document.querySelectorAll('.cv-4-15__curation .cv-4-15__row');

			navStickyFunc(sections);

			window.addEventListener('scroll', () => {
				navStickyFunc(sections);
			})
		})

		document.addEventListener('click', (e) => {
			const elem = e.target;
			if (elem.closest('.cv-4-15__curation-nav a')) {
				document.querySelector(`.cv-4-15__curation-nav a.${tag}__active`) && document.querySelector(`.cv-4-15__curation-nav a.${tag}__active`).classList.remove(`${tag}__active`);
				elem.closest(`.cv-4-15__curation-nav a`).classList.add(`${tag}__active`);
			}

			if (elem.closest(`.${tag}__nav-items a`)) {
				const getId = elem.closest(`.${tag}__nav-items a`).getAttribute('data-id');
				document.querySelector(`#${getId}`).scrollIntoView({
					block: 'start',
				});
			}
		})
	}

	utils.init();

	setTimeout(() => {
		document.body.style.display = 'block';
	}, 3000)
})(window);