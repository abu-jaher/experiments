((w) => {
	"use strict";

	const tag = "cv-0-4";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["conv"].utils

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

	const checkIcon = `
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<g clip-path="url(#clip0_2150_1142)">
	<rect width="24" height="24" rx="12" fill="#6CC183"/>
	<path d="M12 1.68C17.6878 1.68 22.32 6.31224 22.32 12C22.32 17.6878 17.6878 22.32 12 22.32C6.31224 22.32 1.68 17.6878 1.68 12C1.68 6.31224 6.31224 1.68 12 1.68ZM12 0C5.37552 0 0 5.37552 0 12C0 18.6245 5.37552 24 12 24C18.6245 24 24 18.6245 24 12C24 5.37552 18.6245 0 12 0Z" fill="#2F2A85"/>
	<path d="M18.0718 8.59226L10.104 16.56C9.93622 16.7278 9.71965 16.8 9.47965 16.8C9.26402 16.8 9.02403 16.7278 8.85526 16.56L5.9275 13.6323C5.61531 13.3201 5.61531 12.7923 5.9275 12.4801C6.09532 12.3123 6.2875 12.2401 6.50312 12.2401C6.71874 12.2401 6.93531 12.3123 7.07874 12.4801L9.47874 14.8801L16.9197 7.44007C17.0875 7.27226 17.2797 7.20007 17.4953 7.20007C17.7109 7.20007 17.9275 7.27226 18.0709 7.44007C18.3841 7.75227 18.384 8.28007 18.0718 8.59226Z" fill="#2F2A85"/>
	</g>
	<defs>
	<clipPath id="clip0_2150_1142">
	<rect width="24" height="24" rx="12" fill="white"/>
	</clipPath>
	</defs>
	</svg>
	`;

	const PDP_modal = `
	<div class="${tag}__request-interest">
		<div class="${tag}__modal-body">
			<div class="${tag}__form-card">
				<button class="${tag}__close-button">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1.4342 20C1.17638 20 0.918554 19.8998 0.722669 19.6981C0.329423 19.2963 0.329423 18.6448 0.722669 18.243L18.2811 0.301371C18.6743 -0.100457 19.3119 -0.100457 19.7051 0.301371C20.0984 0.7032 20.0984 1.35466 19.7051 1.75674L2.14695 19.6981C1.94959 19.8985 1.69177 20 1.4342 20Z" fill="#2F2A85"/>
					<path d="M18.9938 20C18.736 20 18.4784 19.8998 18.2823 19.6981L0.722669 1.75674C0.329423 1.35466 0.329423 0.7032 0.722669 0.301371C1.11591 -0.100457 1.75346 -0.100457 2.14695 0.301371L19.7051 18.243C20.0984 18.6448 20.0984 19.2963 19.7051 19.6981C19.5078 19.8985 19.2502 20 18.9938 20Z" fill="#2F2A85"/>
					</svg>
				</button>
				<h3>Stay in the loop!</h3>
				<p>Interested in this holiday? We don't blame you! Simply let us know your details below and we'll keep you updated on any juicy updates.</p>
				
				<div class="${tag}__form-row">
					<div class="${tag}__form-control">
						<input type="text" placeholder="First Name">
					</div>
					<div class="${tag}__form-control">
						<input type="text" placeholder="Last Name">
					</div>
				</div>
				
				<div class="${tag}__form-control">
					<input type="email" placeholder="Email Address">
				</div>
				
				<p class="${tag}__optIn">By submitting your email address, you are opting in to receive emails from Shearings.</p>
				
				<div class="${tag}__postcode-section">
					<h3>Psst - help us out by sharing your postcode!</h3>
					<p>We can then pinpoint the best joining points for this holiday</p>
					<div class="${tag}__form-control ${tag}__postcode-input">
						<input type="text" placeholder="Postcode">
					</div>
				</div>
				
				<div class="${tag}__ticket-section">
					<h3>Which ticket type are you eyeing up?</h3>
					<p>Select your preference:</p>
					
					<div class="${tag}__ticket-options">
						<div class="${tag}__ticket-option">
							<div class="check-icon">
							${checkIcon}
							</div>
							<div class="ticket-price">£399</div>
							<div class="ticket-type">Premium Seats</div>
							<div class="dotted-line"></div>
							<div class="ticket-details">best view, central location, most expensive</div>
						</div>
						
						<div class="${tag}__ticket-option selected">
							<div class="check-icon">
							${checkIcon}
							</div>
							<div class="ticket-price">£299</div>
							<div class="ticket-type">Standard Seats</div>
							<div class="dotted-line"></div>
							<div class="ticket-details">good view with a moderate price</div>
						</div>
						
						<div class="${tag}__ticket-option">
							<div class="check-icon">
							${checkIcon}
							</div>
							<div class="ticket-price">£199</div>
							<div class="ticket-type">Budget Seats</div>
							<div class="dotted-line"></div>
							<div class="ticket-details">limited view or further away, most affordable</div>
						</div>
					</div>
				</div>
				<button class="${tag}__register-button">Register your interest</button>
			</div>
		</div>
	</div>
	`;

	const pdpModalSuccess = `
			<div class="${tag}__form-card ${tag}__success">
				<button class="${tag}__close-button">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1.4342 20C1.17638 20 0.918554 19.8998 0.722669 19.6981C0.329423 19.2963 0.329423 18.6448 0.722669 18.243L18.2811 0.301371C18.6743 -0.100457 19.3119 -0.100457 19.7051 0.301371C20.0984 0.7032 20.0984 1.35466 19.7051 1.75674L2.14695 19.6981C1.94959 19.8985 1.69177 20 1.4342 20Z" fill="#2F2A85"></path>
					<path d="M18.9938 20C18.736 20 18.4784 19.8998 18.2823 19.6981L0.722669 1.75674C0.329423 1.35466 0.329423 0.7032 0.722669 0.301371C1.11591 -0.100457 1.75346 -0.100457 2.14695 0.301371L19.7051 18.243C20.0984 18.6448 20.0984 19.2963 19.7051 19.6981C19.5078 19.8985 19.2502 20 18.9938 20Z" fill="#2F2A85"></path>
					</svg>
				</button>
				<h3>Stay in the loop!</h3>	
				<p>Thank you for showing your interest!</p>
				<p>While you wait for any updates, why not browse some more of our hassle-free holidays? There are plenty to choose from that will be right up your street...</p>
				<div class="${tag}__links-tab">
					<div>
						<a href="/our-holidays/mini-breaks">
							<p>Let’s check out Mini-Breaks!</p>
						</a>
						<a href="/coach-holidays">
							<p>Show me Coach Holidays!</p>
						</a>
					</div>
					<div>
						<a href="/brochurerequest">
							<p>Request a Brochure today!</p>
						</a>
						<a href="/toursearch/toursearchresults">
							<p>Start a search from scratch!</p>
						</a>
					</div>
				</div>
			</div>
	`;

	window[tag].initVariation = () => {
		window[tag].plpListing();

		if (location.pathname == '/preview/the-lion-king') {
			window[tag].pdpLionKing();
		}
	};

	window[tag].pdpLionKing = () => {
		document.body.insertAdjacentHTML('beforeend', PDP_modal);

		utils.waitUntil(() => document.querySelector(`.p-tour-intro .c-list--inline`), 0).then((element) => {
			document.querySelector(`.p-tour-intro h1`).innerHTML = `The Lion King`;
			document.querySelector(`.p-tour-intro h1 + p`).innerHTML = `
				It's time to visit the Pridelands as we head to the Lyceum Theatre for Disney' award winning musical, The Lion King.  Follow the powerful story of Simba, with stunning effects and enchanting music, as he journeys from wide-eyed cub to his destined role as King of the Pridelands.  With the bonus of free time in London this is a weekend not to be missed.
			`;

			element.innerHTML = `
				<li><span class="c-label c-label--list">What’s included</span></li>
				<li><span class="c-label c-label--list">Your tour includes</span></li>
			`
		});

		utils.waitUntil(() => document.querySelector(`.c-list--bulleted`), 0).then((element) => {
			document.querySelector(`.eCost__txt--daysTotal`).innerHTML = `
				<span class="eCost__txt eCost__txt--days">3 days from</span>
				<span class="eCost__txt eCost__txt--total">
                    <strong>£299</strong><sup>pp</sup>
                </span>
			`;

			document.querySelector(`.eCost .eCost__txt--costCombined`).innerHTML = `£598 for 2 people`;

			document.querySelector('.p-tour-intro__col--secondary .c-btn').innerHTML = `Register your interest`;
			document.querySelector('.pIntroStickyNav__area--button .c-btn').innerHTML = `Register your interest`;
			document.querySelector('.pIntroLinks__tab .c-btn[data-event-label="Book Now"]').innerHTML = `Register your interest`;

			element.innerHTML = `
				<li class="c-list__item">Ticket to Lion King: Lion King the Musical at the Lyceum Theatre</li>
				<li class="c-list__item">2 nights at a comfy hotel with English breakfast</li>
				<li class="c-list__item">Regional joining points</li>
				<li class="c-list__item">No lugging your luggage</li>
			`;
		})

		utils.waitUntil(() => document.querySelector(`#itinerary .cAccordian:not(.p-tour-SYHAP) .cAccordian__wrap`), 0).then((element) => {
			element.innerHTML = `
				<div class="cAccordianGroup cAccordianGroup--itinerary" data-accordiangroup="switch" data-tabgroup="">
					<div class="p-tourItinerary" data-tabcontents="">
							<div class="cTabs__content" data-tabcontent="" role="tabpanel" aria-hidden="false" tabindex="0" data-accordiangroup="switch" aria-labelledby="tabGroup0button0" data-target="tabGroup0button0">
										<div class="cAccordian accordianIsActive" data-accordian="">
											<h3 class="cAccordian__heading" data-accordiantitle="" id="accordion49_1741675227822">
												<button type="button" class="cAccordian__button p-tourItinerary__button" data-accordianbutton="" aria-expanded="false">
													<div class="btnDayText">
														<strong>Day 1:</strong>
													</div>
														
													
												</button>
											</h3>
											<div class="cAccordian__content" data-accordiancontent="" aria-labelledby="accordion49_1741675227822">
												<div class="cAccordian__body">
													<div class="cAccordian__wrap p-tourItinerary__day">
														<div class="p-tourItinerary p-tourItinerary__dayText">
															<p>After joining our coach, we travel directly to London and check in to our hotel for our two-night stay.  The remainder of the day is free at leisure.</p>

														</div>

													</div>
												</div>
											</div>
										</div>
										<div class="cAccordian accordianIsActive" data-accordian="">
											<h3 class="cAccordian__heading" data-accordiantitle="" id="accordion50_1741675227822">
												<button type="button" class="cAccordian__button p-tourItinerary__button" data-accordianbutton="" aria-expanded="false">
													<div class="btnDayText">
														<strong>Day 2:</strong>                                          
													</div>                                  
												</button>
											</h3>

											<div class="cAccordian__content" data-accordiancontent="" aria-labelledby="accordion50_1741675227822">
												<div class="cAccordian__body">
													<div class="cAccordian__wrap p-tourItinerary__day">
														<div class="p-tourItinerary p-tourItinerary__dayText">
															<p>Following a hearty breakfast to set you up for a busy day, enjoy a morning free at leisure to explore some of the sights of our fabulous capital or treat yourself to some retail therapy along Oxford Street before the highlight of our weekend.  Early afternoon we head to the Lyceum Theatre for the matinee performance of Disney's Lion King.  Take your seat, get your tissues ready as we follow the story of Simba's incredible journey.  Following the performance, our coach will be waiting to transfer us back to the hotel.</p>
														</div>                                           
													</div>
												</div>
											</div>
										</div>
										<div class="cAccordian accordianIsActive" data-accordian="">
											<h3 class="cAccordian__heading" data-accordiantitle="" id="accordion51_1741675227822">
												<button type="button" class="cAccordian__button p-tourItinerary__button" data-accordianbutton="" aria-expanded="false">
													<div class="btnDayText">
														<strong>Day 3:</strong>
													</div>
														
													
												</button>
											</h3>

											<div class="cAccordian__content" data-accordiancontent="" aria-labelledby="accordion51_1741675227822">
												<div class="cAccordian__body">
													<div class="cAccordian__wrap p-tourItinerary__day">
														<div class="p-tourItinerary p-tourItinerary__dayText">
															<p>Today we enjoy a little more free time in London, for some last-minute sightseeing before re-joining our coach early afternoon for our journey home.</p>

														</div>

													</div>
												</div>
											</div>
										</div>
							</div>
					</div>
				</div>
			`;
		})

		utils.waitUntil(() => document.querySelector(`.cAccordian__wrap.p-tourAccommodation`), 0).then((element) => {
			element.innerHTML = `
				<div class="p-tourAccommodation__area p-tourAccommodation__area--intro">
					<p>You will stay for two nights at the Britannia International Hotel or a similar hotel in the London area.</p>
				</div>
				<div class="p-tourAccommodation__area p-tourAccommodation__area--tabContents" data-tabcontents="">
					<div class="cTabs__content" data-tabcontent="" aria-hidden="false" role="tabpanel" tabindex="0" aria-labelledby="tabGroup1button0" data-target="tabGroup1button0">
						<div class="c-card c-card--IA">
							<div class="c-card__grid" style="display: block;">			
								<div class="c-card__item c-card__item--content hotel">
									<h3 class="titleAndRating">
										<span>Britannia International Hotel</span>
									</h3>
									<p class="hotelAddress">Location: <strong>163 Marsh Wall, London, E14 9SJ</strong></p>
									Situated on the water’s edge in Canary Wharf, the Britannia International Hotel is a modern, glass-fronted building close to the internationally famous business district. Offering superb views of the Thames and the London skyline, two on-site restaurants and two bars, the hotel offers a prime location for a stay in the capital. Executive rooms include more space than a standard double with en suite bathroom, complimentary Wi-Fi, TV, telephone and hairdryer and tea and coffee-making facilities. *Please note: this hotel is cashless. They only accept electronic payments such as debit cards, credit cards and mobile methods like Apple Pay for extras.
								</div>
								<div class="c-card__item c-card__item--content hotel-facilities">
									<h3 class="titleAndRating">
										<span>Hotel Facilities</span>
									</h3>
									<p><strong>Room:</strong> TV, Tea and Coffee Making Facilities, Hairdryer, Telephone, Free Wifi, Shower over Bath</p>
									<p><strong>General:</strong>  Bar, Restaurant, Lift, </p>
									<p><strong>Service:</strong>  24 Hour Front Desk, Dogs Allowed on Request</p>
									<p><strong>Hotel:</strong>  Bar, Restaurant, Lift, WiFi Available</p>
									<p><strong>Single Room Supplement</strong> from £59.00</p>
								</div>
								<div class="c-card__item c-card__item--content hotel-note">
									<p><strong>Please note:</strong> You will need to advise us at the time of booking if you have a wheelchair/mobility scooter and require an accessible/companion seat. This can only be arranged if we are made aware at the time of booking – unfortunately, we will not be able to arrange this on the day of the performance.</p>
								</div>
							</div>
						</div>						
					</div>
				</div>
			`;
		})
	}

	window[tag].plpListing = () => {
		utils.waitUntil(() => document.querySelector(`.cTourCard [title="ABBA Voyage: A Night of Pop Hits"]`), 0).then((element) => {
			const abbaLength = document.querySelectorAll(`.cTourCard [title="ABBA Voyage: A Night of Pop Hits"]`).length;

			if (abbaLength > 2) return;

			const targetedCard = element.closest(`.cTourCard`);

			const cloneData = [
				{
					title: 'The Lion King',
					description: 'Lion king bio description / placeholderLion king bio description / placeholderLion king bio description / placeholder',
					availableMonths: ['May', 'Jul', 'Sep'],
					bulletPoints: [
						'Ticket to Lion King: Lion King the Musical at the Lyceum Theatre',
						'2 nights at a comfy hotel with English breakfast',
						'Regional joining points',
						'No lugging your luggage'
					],
					price: '£299',
					totalPrice: '£598',
					supplement: '£59',
					destinationLink: 'https://www.shearings.com/preview/the-lion-king',
					imgLink: `https://d1mgcpums0qvsa.cloudfront.net/LSG/0.4/the-lion-king.png`,
				},
				{
					title: 'Les Miserables',
					description: 'Experience the world-famous musical Les Miserables at the Sondheim Theatre in London\'s West End',
					availableMonths: ['Feb', 'Apr', 'Aug', 'Dec'],
					bulletPoints: [
						'Ticket to Les Miserables at the Sondheim Theatre',
						'2 nights at a central London hotel with breakfast',
						'Optional backstage tour available',
						'Free time to explore London'
					],
					price: '£329',
					totalPrice: '£658',
					supplement: '£69',
					destinationLink: 'https://www.shearings.com/preview/les-miserables',
					imgLink: `https://d1mgcpums0qvsa.cloudfront.net/LSG/0.4/the-lion-king.png`,
				},
				{
					title: 'Mamma Mia!',
					description: 'Enjoy a feel-good musical featuring ABBA\'s greatest hits at the Novello Theatre in London\'s West End',
					availableMonths: ['Jan', 'Jun', 'Oct', 'Nov'],
					bulletPoints: [
						'Ticket to Mamma Mia! at the Novello Theatre',
						'2 nights at a quality hotel with full breakfast',
						'Return coach travel from your local area',
						'Free London city map and guide'
					],
					price: '£279',
					totalPrice: '£558',
					supplement: '£49',
					destinationLink: 'https://www.shearings.com/preview/mamma-mia',
					imgLink: `https://d1mgcpums0qvsa.cloudfront.net/LSG/0.4/the-lion-king.png`,
				}
			];

			const createAvailabilityHTML = (availableMonths) => {
				const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				return months.map(month => {
					if (availableMonths.includes(month)) {
						return `<li class="cAvailabilityList__month">${month}</li>`;
					} else {
						return `<li class="-not-available">${month}</li>`;
					}
				}).join('');
			};

			const createBulletHTML = (points) => {
				return points.map(point => `<li>${point}</li>`).join('');
			};

			const clones = cloneData.map(data => {
				const clone = targetedCard.cloneNode(true);
				clone.classList.add(`${tag}__custom-trip`);

				clone.querySelector(`.cTourCard__title`).innerText = data.title;
				clone.querySelector(`.cTabs__content p`).innerText = data.description;
				clone.querySelector(`.cAvailabilityList`).innerHTML = createAvailabilityHTML(data.availableMonths);
				clone.querySelector(`.c-list--bulleted`).innerHTML = createBulletHTML(data.bulletPoints);
				clone.querySelector(`a.c-btn`).setAttribute(`href`, data.destinationLink);
				clone.querySelector(`.cTourCard__img-blk`).setAttribute(`href`, data.destinationLink);
				clone.querySelector(`.eCost`).innerHTML = `
					<span class="eCost__txt eCost__txt--daysTotal">
						<span class="eCost__txt eCost__txt--days">3 days</span> from
							<span class="eCost__txt eCost__txt--total">
								<strong>${data.price}</strong><sup>pp</sup>
							</span>
					</span>
					<span class="eCost__txt eCost__txt--costCombined">${data.totalPrice} for 2 people</span>
					<span class="eCost__txt eCost__txt--supplement">Single Room Supplement from ${data.supplement}pp</span>
				`;

				return clone;
			});

			clones.forEach(clone => {
				const insertBefore = Math.random() > 0.5;

				if (insertBefore) {
					targetedCard.parentNode.insertBefore(clone, targetedCard);
				} else {
					if (targetedCard.nextSibling) {
						targetedCard.parentNode.insertBefore(clone, targetedCard.nextSibling);
					} else {
						targetedCard.parentNode.appendChild(clone);
					}
				}
			});
		});
	}

	utils.waitUntil(() => document.querySelector('#tour-search-results'), 0)
		.then((element) => {
			var active = true;

			const config = { childList: true, subtree: true };
			const callback = () => {
				if (!active) return;

				active = false;

				const fire = setInterval(() => window[tag].plpListing(), 200);

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

			if (el.closest(`.cv-0-4__custom-trip [role="tablist"] button`)) {
				const element = el.closest(`.cv-0-4__custom-trip [role="tablist"] button`);
				const tourCard = element.closest(`.cv-0-4__custom-trip`);
				const dataTarget = element.getAttribute(`data-target`);

				tourCard.querySelector(`.c-nav__link[aria-expanded="true"]`).setAttribute(`aria-expanded`, `false`);
				element.setAttribute(`aria-expanded`, `true`);

				tourCard.querySelector(`.cTabs__content[aria-hidden="false"]`).setAttribute(`aria-hidden`, `true`);
				tourCard.querySelector(`.cTabs__content[data-target="${dataTarget}"]`).setAttribute(`aria-hidden`, `false`);
			}

			if (el.closest(`.p-tour-intro__col--secondary .c-btn`) || el.closest(`.pIntroStickyNav__area--button .c-btn`) || el.closest(`.pIntroLinks__tab .c-btn[data-event-label="Book Now"]`)) {
				document.body.classList.add(`${tag}__modal-show`);
			}

			if (el.closest(`.cv-0-4__form-card .cv-0-4__close-button`)) {
				document.body.classList.remove(`${tag}__modal-show`);
			}

			if (el.closest(`.cv-0-4__form-card .cv-0-4__ticket-option`)) {
				document.querySelector(`.cv-0-4__form-card .cv-0-4__ticket-option.selected`).classList.remove('selected');
				el.closest(`.cv-0-4__form-card .cv-0-4__ticket-option`).classList.add('selected');
			}

			// pdp form validation
			if (el.closest(`.cv-0-4__form-card .cv-0-4__register-button`)) {
				// Get form elements
				const firstNameInput = document.querySelector('.cv-0-4__form-card input[placeholder="First Name"]');
				const lastNameInput = document.querySelector('.cv-0-4__form-card input[placeholder="Last Name"]');
				const emailInput = document.querySelector('.cv-0-4__form-card input[placeholder="Email Address"]');

				window[tag].resetErrors(firstNameInput, lastNameInput, emailInput);

				let isValid = true;

				// Validate first name
				if (!firstNameInput.value.trim()) {
					window[tag].markAsError(firstNameInput);
					isValid = false;
				}

				// Validate last name
				if (!lastNameInput.value.trim()) {
					window[tag].markAsError(lastNameInput);
					isValid = false;
				}

				// Validate email
				if (!window[tag].isValidEmail(emailInput.value)) {
					window[tag].markAsError(emailInput);
					isValid = false;
				}

				if (isValid) {
					window[tag].newsLetterSubmit(emailInput.value, firstNameInput.value, lastNameInput.value);
					document.body.classList.add(`${tag}__form-submitted`);
					document.querySelector(`.cv-0-4__modal-body`).innerHTML = pdpModalSuccess;
				}
			}

		})
	}

	window[tag].isValidEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	window[tag].markAsError = (inputElement) => {
		inputElement.style.borderColor = 'red';
	}

	window[tag].resetErrors = (firstNameInput, lastNameInput, emailInput) => {
		firstNameInput.style.borderColor = 'transparent';
		lastNameInput.style.borderColor = 'transparent';
		emailInput.style.borderColor = 'transparent';
	}

	window[tag].newsLetterSubmit = (email, firstName, lastName) => {
		fetch("https://www.shearings.com/email-signup", {
			"headers": {
				"accept": "*/*",
				"accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
				"content-type": "application/x-www-form-urlencoded",
				"hx-current-url": "https://www.shearings.com/preview/lion-king",
				"hx-request": "true",
				"hx-trigger": "form-email-signup-form-180f94d3-5a00-477d-92e2-1cd631a04b83",
				"sec-fetch-mode": "no-cors",
				"sec-fetch-site": "same-origin"
			},
			"referrer": "https://www.shearings.com/preview/lion-king",
			"referrerPolicy": "strict-origin-when-cross-origin",
			"body": "__RequestVerificationToken=CfDJ8P4nX2DROOFDu5unuK7hKf9Bqb-TspbgZpbL1VyxxG4AHVCfHz_W26yd2f1LSqslsbYTPdxHPI_-OOoB870ZcuR5u01mJ8kvahZ4RDMhSZ3APNo9ZhIV3JFPoR7VuWhI09GMHCFdzqKocNdpqFpgcEs&Email=" + email + "&Ignore=&ForeName=" + firstName + "&Surname=" + lastName,
			"method": "POST",
			"mode": "no-cors",
			"credentials": "include"
		});
	}

	window[tag].variation = "variation-1";
	window[tag].init();
})(window);