((w) => {
	"use strict";

	const tag = "cv-5-1";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["conv"].utils;
	let newProduct = true;
	let step = 0;
	let totalPeople, duration, driveOption, tripCost, tripCostPerPerson, accommodationPrice, pickupCost, departDate, returnDate, departLocation, returnLocation, discountElement, accommodationElement, currency, departElement, returnElement, extrasElement;

	if (window[tag].variation) return;

	const userIcon = `
	<svg class="svg-inline--fa fa-user fa-w-14 fa-lg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="#000" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
	`;

	const durationIcon = `
	<svg class="svg-inline--fa fa-clock fa-w-16 fas fa-lg" aria-hidden="true" focusable="false" data-prefix="far" data-icon="clock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="#000" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"></path></svg>
	`;

	const driveIcon = `
	<svg class="svg-inline--fa fa-bus fa-w-16 fa-lg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="#000" d="M488 128h-8V80c0-44.8-99.2-80-224-80S32 35.2 32 80v48h-8c-13.25 0-24 10.74-24 24v80c0 13.25 10.75 24 24 24h8v160c0 17.67 14.33 32 32 32v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h192v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h6.4c16 0 25.6-12.8 25.6-25.6V256h8c13.25 0 24-10.75 24-24v-80c0-13.26-10.75-24-24-24zM112 400c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm16-112c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h256c17.67 0 32 14.33 32 32v128c0 17.67-14.33 32-32 32H128zm272 112c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path></svg>
	`

	const carIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 24.2 21.2" style="enable-background:new 0 0 24.2 21.2;" xml:space="preserve">
	<path d="M6.4,4L5.2,7.6H19L17.8,4c-0.2-0.6-0.8-1-1.4-1H7.8C7.2,3,6.6,3.4,6.4,4z M1.9,7.8L3.5,3c0.6-1.8,2.4-3,4.3-3h8.6  c1.9,0,3.6,1.2,4.3,3l1.7,4.7c1.1,0.5,1.9,1.5,1.9,2.8v6.8v2.3c0,0.8-0.7,1.5-1.5,1.5h-1.5c-0.8,0-1.5-0.7-1.5-1.5v-2.3H4.5v2.3  c0,0.8-0.7,1.5-1.5,1.5H1.5c-0.8,0-1.5-0.7-1.5-1.5v-2.3v-6.8C0,9.3,0.8,8.2,1.9,7.8z M6,12.1c0-0.8-0.7-1.5-1.5-1.5S3,11.3,3,12.1  s0.7,1.5,1.5,1.5S6,12.9,6,12.1z M19.7,13.6c0.8,0,1.5-0.7,1.5-1.5s-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5  C18.1,12.9,18.8,13.6,19.7,13.6z"/>
	</svg>`

	const angleDown = `<svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M5.9999 -2.38419e-05L0.399902 5.59998L1.63201 6.83154L5.99987 2.46368L10.3677 6.83154L11.5998 5.59998L5.9999 -2.38419e-05Z" fill="black"/>
	</svg>
	`;

	const arrow = `
	<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M5.95246 13.6771L6.64613 14.3708C6.93985 14.6645 7.4148 14.6645 7.70539 14.3708L13.7797 8.29958C14.0734 8.00586 14.0734 7.53091 13.7797 7.24032L7.70851 1.16912C7.4148 0.875406 6.93985 0.875406 6.64926 1.16912L5.95558 1.8628C5.65874 2.15964 5.66499 2.64396 5.96808 2.93455L9.73016 6.51853L0.749916 6.51853C0.334338 6.51853 -3.38247e-07 6.85286 -3.20082e-07 7.26844L-2.76375e-07 8.26833C-2.5821e-07 8.68391 0.334338 9.01825 0.749916 9.01825L9.73016 9.01825L5.96496 12.6053C5.65874 12.8959 5.65249 13.3803 5.95246 13.6771Z" fill="#333333"/>
	</svg>`;

	const hostCDN = 'https://d1mgcpums0qvsa.cloudfront.net/LSG/5.1/';

	const addTracking = () => {
		window.Kameleoon.API.Goals.processConversion(350723);
	};

	window[tag].initVariation = () => {
		utils.waitUntil((() => document.querySelector('.summary .aside-label')), 0).then((element) => {

			if (location.pathname.indexOf('Step1') > -1) {
				step = 1;
			} else if (location.pathname.indexOf('Step2') > -1) {
				step = 2;
			} else if (location.pathname.indexOf('Step3') > -1) {
				step = 3;
			} else if (location.pathname.indexOf('Step4') > -1) {
				step = 4
			}

			document.body.classList.add(`${tag}__step-${step}`);

			// summary section
			summarySection();

			// holiday details
			holidayDetails();

			const tourNameText = document.querySelector('.summary .tour-name strong').innerText;
			const priceElement = document.querySelector('.summary .price strong');
			currency = getCurrency(priceElement);

			extrasElement = document.querySelector('.summary .fa-check');
			departElement = document.querySelector('.summary .fa-arrow-up ~ strong');
			returnElement = document.querySelector('.summary .fa-arrow-down ~ strong');
			accommodationElement = document.querySelectorAll('.summary .fa-bed  ~ ul');
			discountElement = document.querySelector('.summary .price + p');
			totalPeople = document.querySelector('.summary ul .fa-user + strong').innerText;
			duration = document.querySelector('.summary ul .fa-clock + strong').innerText;
			driveOption = document.querySelector('.summary ul .fa-bus+ strong').innerText;
			departDate = document.querySelector('.fa-calendar-alt + strong').innerText;
			returnDate = document.querySelectorAll('.fa-calendar-alt + strong')[1].innerText;
			departLocation = departElement && departElement.innerText;
			returnLocation = returnElement && returnElement.innerText;

			extrasElement && extrasElement.closest('div').classList.add(`${tag}__extras`);
			tripCost = formatPrice(priceElement);
			accommodationPrice = accommodationCost('.fa-bed  ~ ul strong', totalPeople);
			pickupCost = getPickupCost(totalPeople);

			document.querySelector(`.${tag}__summary h3`).insertAdjacentHTML(`beforeend`, `<span class="${tag}__mobile">${currency}${tripCost}</span>${angleDown}`)

			if (sessionStorage.getItem(`${tourNameText}__depart-date`) === null || sessionStorage.getItem(`${tourNameText}__duration`) === null) {
				sessionStorage.setItem(`${tourNameText}__depart-date`, departDate);
				sessionStorage.setItem(`${tourNameText}__return-date`, returnDate);
				sessionStorage.setItem(`${tourNameText}__duration`, duration);
			} else if (sessionStorage.getItem(`${tourNameText}__depart-date`) !== null) {
				if (sessionStorage.getItem(`${tourNameText}__depart-date`) === departDate && sessionStorage.getItem(`${tourNameText}__duration`) === duration) {
					newProduct = false
				} else {
					newProduct = true;
					sessionStorage.setItem(`${tourNameText}__depart-date`, departDate);
					sessionStorage.setItem(`${tourNameText}__return-date`, returnDate);
					sessionStorage.setItem(`${tourNameText}__duration`, duration);
				}
			}


			//set trip cost/pp
			if (step === 1 && sessionStorage.getItem(`${tourNameText}__trip-cost`) === null && newProduct === true) {
				tripCostPerPerson = (tripCost / totalPeople);
				sessionStorage.setItem(`${tourNameText}__trip-cost`, tripCostPerPerson);
			} else {
				tripCostPerPerson = sessionStorage.getItem(`${tourNameText}__trip-cost`);
			}

			// insert detailsInfo
			detailsInfoString();

			// pricing break down
			pricingBreakDownString();

			updateAccommodationPricingText(`.${tag}__accommodation-details .${tag}__list small`, currency);
			updateExtrasPricingText(`.${tag}__extras-details .${tag}__list li`);


			document.addEventListener('click', (e) => {
				const elem = e.target;
				if (elem.closest(`.${tag}__accordion-header`)) {
					document.querySelector(`.${tag}__pricing-accordion`).classList.toggle(`${tag}__active`);
				}

				if (window.innerWidth < 992 && elem.closest(`.${tag}__summary`)) {
					document.querySelector(`.${tag} .summary`).classList.toggle(`${tag}__active`)
				}

				if (elem.closest(`.fa-phone ~ a`)) {
					addTracking();
				}
			})

		});
	};

	const detailsInfoString = () => {
		const detailsInfo = `
		<div class="${tag}__details-info">
			<ul>
				<li class="${tag}_total-people">
					${userIcon}
					<span>${totalPeople} People</span>
				</li>
				<li class="${tag}_duration">
					${durationIcon}
					<span>${duration.replace('days', 'Days').replace('nights', 'Nights')}</span>
				</li>
				<li class="${tag}_drive">
					${driveOption.toLocaleLowerCase().indexOf('self') == -1 ? driveIcon : carIcon}
					<span>${driveOption}</span>
				</li>	
			</ul>				
		</div>
	`

		document.querySelector(`.${tag}__holiday-details`).insertAdjacentHTML('beforeend', detailsInfo);
	}

	const pricingBreakDownString = () => {
		const pricingBreakDown = `
		<div class="${tag}__pricing-breakdown ${tag}__padding-wide">
			<div class="${tag}__pricing-col">
				<ul>
					<li class="${tag}_trip-price">
						<p class="${tag}__text">
							<img src="${hostCDN}trip_icon.svg">
							<span>${duration.replace(' days', '-Day Tour').replace(' nights', '-Nights Trip')}</span>
						</p>
						<p class="${tag}__price">${currency}${(tripCostPerPerson * totalPeople).toLocaleString()}</p>
					</li>
					${accommodationPrice !== undefined ? `<li class="${tag}_accommodation-price">
						<p class="${tag}__text">
							<img src="${hostCDN}accommodation_icon.svg">
							<span>Accommodation</span>
						</p>
						${accommodationPrice !== 0 ? `<p class="${tag}__price">${currency}${accommodationPrice.toLocaleString()}</p>` : ''}
						${accommodationPrice == 0 ? `<p class="${tag}__price">Included</p>` : ''}
					</li>` : ''
			}
					${(departElement && driveOption.toLocaleLowerCase().indexOf('self') == -1) ? `<li class="${tag}_pickup-price">
						<p class="${tag}__text">
							<img src="${hostCDN}pickup_icon.svg">
							<span>Pick Up</span>
						</p>
						<p class="${tag}__price">${currency}${pickupCost}</p>
					</li>` : ''
			}
					${extrasElement ? `<li class="${tag}_extras-price">
						<p class="${tag}__text">
							<img src="${hostCDN}extras_icon.svg">
							<span>Extras</span>
						</p>
						<p class="${tag}__price">${currency}${extrasCost()}</p>
					</li>` : ''
			}
				</ul>
			</div>
			<div class="${tag}__total-price">
				<p class="${tag}__text">Total Cost (${totalPeople} people)</p>
				<p class="${tag}__price">${currency}${tripCost.toLocaleString()}</p>
			</div>
			${discountElement ? `<p class="${tag}__discount"> ${discountElement.innerText}</p>` : ''}
		</div>
		${departElement ? `<div class="${tag}__pricing-accordion ${tag}__active">
			<div class="${tag}__accordion-header">
				<p class="${tag}__accordion-title">Booking Details & Price Breakdown ${angleDown}</p>
				<p class="${tag}__title-span">(Showing price per person)</p>
			</div>
			<div class="${tag}__accordion-body">
				<div class="${tag}__departure-details">
					<div class="${tag}__depart-from">
						${arrow}
						<div class="${tag}__title">Depart from</div>
						<div class="${tag}__text">${departLocation.replace(/\*+/g, '')}</div>
						<div class="${tag}__text">${departDate}</div>
					</div>
					<div class="${tag}__return-from">
						${arrow}
						<div class="${tag}__title">Return from </div>
						<div class="${tag}__text">${returnLocation.replace(/\*+/g, '')}</div>
						<div class="${tag}__text">${returnDate}</div>
					</div>
				</div>
				${accommodationElement.length > 0 ? `<div class="${tag}__accommodation-details">
					<img src="${hostCDN}accommodation_icon.svg">
					<div class="${tag}__title">Accommodation</div>
					<div class="${tag}__list">
						${Array.from(accommodationElement).map(element => {
				if (!element.querySelector('li small')) {
					element.querySelector('li').insertAdjacentHTML('beforeend', '<p>Included</p>');
				}
				return `${element.innerHTML}`;
			}).join('')}
					</div>
				</div>` : ''
				}
				${driveOption.toLocaleLowerCase().indexOf('self') == -1 ? `<div class="${tag}__pickup-details">
					 <img src="${hostCDN}pickup_icon.svg">
					<div class="${tag}__title">Pick Up</div>
					${Array.from({ length: totalPeople }, () =>
					`<div class="${tag}__text">
						<span>1 x ${departLocation.replace(/\*+/g, '')}</span>
						<span>${currency}${pickupCost / totalPeople}pp</span>
					</div>`).join('')}
				</div>` : ''
				}
				${extrasElement ? `<div class="${tag}__extras-details">
					 <img src="${hostCDN}extras_icon.svg">
					<div class="${tag}__title">Extras</div>
					<div class="${tag}__list">${document.querySelector(`.${tag}__extras ul`).innerHTML}</div>
				</div>` : ''
				}
			</div>
		</div>`: ''
			}
	`

		document.querySelector(`.${tag}__holiday-details`).insertAdjacentHTML('afterend', pricingBreakDown);
	}

	const summarySection = () => {
		const summaryTitle = document.querySelector('.summary .aside-title');
		const tourRef = document.querySelector('.summary .tour-refid');
		summaryTitle.innerText = `Your Holiday Summary`;

		const summaryDiv = document.createElement('div');
		summaryDiv.className = `${tag}__summary ${tag}__padding-wide`;

		summaryDiv.appendChild(summaryTitle);
		summaryDiv.appendChild(tourRef);

		document.querySelector('.destination').insertAdjacentElement('beforebegin', summaryDiv)
	}

	const holidayDetails = () => {
		const detailsDiv = document.createElement('div');
		detailsDiv.className = `${tag}__holiday-details ${tag}__padding-wide`;

		const destinationImg = document.querySelector('.summary .destination');
		const tourName = document.querySelector('.summary .tour-name');

		detailsDiv.appendChild(destinationImg);
		detailsDiv.appendChild(tourName);

		document.querySelector(`.${tag}__summary`).insertAdjacentElement('afterend', detailsDiv);
	}

	const extrasCost = () => {
		const totalCost = (tripCostPerPerson * totalPeople) + accommodationPrice + pickupCost;
		if (totalCost !== tripCost) {
			const extrasPrice = tripCost - totalCost;
			return extrasPrice;
		}
	}


	const formatPrice = (element) => {
		if (element) {
			const priceElement = element;
			const priceText = priceElement.textContent;
			const numericPrice = priceText.replace(/[^\d.]/g, '');
			const priceValue = parseFloat(numericPrice);
			return priceValue;
		}
	}

	const getCurrency = (element) => {
		const priceElement = element
		const priceText = priceElement.textContent;
		const currencySymbol = priceText.replace(/[\d,.]/g, '').trim();
		return currencySymbol;
	}

	const getRoomsNo = (element) => {
		const text = element.textContent;
		const match = text.match(/x\s*(\d+)/);
		const roomsNumber = match ? match[1] : text.indexOf('Single') > - 1 ? 1 : text.indexOf('Double') > - 1 ? 2 : 0;
		const totalRoom = parseInt(text.charAt(0));
		return roomsNumber * totalRoom;
	}

	const accommodationCost = (selector, totalPeople) => {
		if (!document.querySelector(selector)) return;
		let totalCost = 0;

		document.querySelectorAll(selector).forEach((element) => {
			const roomPriceElement = element.nextElementSibling;
			if (roomPriceElement) {
				const roomNumber = parseInt(getRoomsNo(element));
				const roomCost = parseInt(formatPrice(element.nextElementSibling));
				totalCost += (roomNumber * roomCost);
			}
		})

		return totalCost;
	}

	const updateAccommodationPricingText = (selector, currency) => {
		if (!document.querySelector(selector)) return;
		document.querySelectorAll(selector).forEach((element) => {
			const getPrice = formatPrice(element);
			element.innerHTML = `${currency}${getPrice}pp`;
		})
	}

	const updateExtrasPricingText = (selector) => {
		if (!document.querySelector(selector)) return;

		document.querySelectorAll(selector).forEach((element) => {
			const priceMatch = element.innerHTML.match(/£\d+(\.\d{2})?pp/);
			const price = priceMatch && priceMatch[0];
			const htmlString = element.innerHTML.replace(`${price}`, '').replace('for', '<br>').trim();
			const breakString = htmlString.split('<br>');
			element.innerHTML = `<p>${breakString[0]} <br><span class="${tag}__name">${breakString[1].trim()}</span></p><p>${price.replace('.00', '')}</p>`;

			const subElement = element.querySelector('sub');
			subElement.outerHTML = subElement.outerHTML.replace('<sub', '<p').replace('</sub>', '</p>');
		})
	}

	const getPickupCost = (totalPeople) => {
		const priceElement = document.querySelector('.fa-arrow-up ~ small');
		if (priceElement) {
			const departLocation = document.querySelector('.fa-arrow-up ~ strong').innerText;
			const returnLocation = document.querySelector('.fa-arrow-down ~ strong').innerText;
			const text = priceElement.textContent;
			const match = text.match(/£\d+(\.\d{2})?/);
			const firstPrice = match ? match[0] : null;
			const finalPrice = parseFloat(firstPrice.replace(/[^\d.]/g, ''));

			if (departLocation === returnLocation) {
				return finalPrice;
			} else {
				if (departLocation.indexOf('*') > -1 && returnLocation.indexOf('*') > -1) {
					return 2 * parseInt(finalPrice);
				} else {
					return finalPrice;
				}
			}
		} else {
			return 0;
		}
	}

	window[tag].variation = "variation-1";
	window[tag].init();
})(window);