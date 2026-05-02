((w) => {
	"use strict";

	const tag = "cv-5-3";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["conv"].utils;

	window[tag] = window[tag] || {
		init: () => {
			try {
				utils.waitUntil(() => document.body, 0).then((body) => {
					body.classList.add(tag);
					window[tag].initVariation();
				});

				console.log(`${window[tag].variation} is running`, tag);
			} catch (err) {
				console.error(err, tag);
			}
		},
	};

	if (window[tag].variation) return;

	const closeIcon = `
		<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0.90926 0C0.668044 0 0.436699 0.0959447 0.266323 0.266323C-0.0887744 0.621413 -0.0887744 1.19708 0.266323 1.55217L3.71423 5.00068L0.266323 8.44851C-0.0887744 8.8036 -0.0887744 9.37926 0.266323 9.73435C0.621421 10.0885 1.1971 10.0885 1.5522 9.73435L5.00079 6.28584L8.4487 9.73435C8.8038 10.0885 9.37858 10.0885 9.73368 9.73435C10.0888 9.37926 10.0888 8.8036 9.73368 8.44851L6.28577 5.00068L9.73368 1.55217C10.0888 1.19708 10.0888 0.621413 9.73368 0.266323C9.5633 0.0959539 9.33196 0 9.09164 0C8.85042 0 8.61908 0.0959447 8.4487 0.266323L5.00079 3.71484L1.5522 0.266323C1.38093 0.0959539 1.15048 0 0.90926 0Z" fill="white"/>
		</svg>
	`;

	const modalTemplate = `
		<div class="${tag}__got-questions-modal">
			<div class="${tag}__modal-overlay"></div>
			<div class="${tag}__modal">
				<button class="${tag}__close-btn">${closeIcon}</button>
				<h4><span>Got a question </span>about this holiday?</h4>
				<p>Our team (based right here in the UK) will be more than happy to talk you through things - just give us a buzz!</p>
				<a href="tel:01709833543">
					<div class="${tag}__pill">
						Call us on <span class="${tag}__phone">01709 833 543</span>
					</div>
				</a>
			</div>
		</div>
	`;

	const triggerPoint = {
		'/Step1Coach': {
			mobile: '108000',
			desktop: '85200'
		},
		'/Step2Rooms/SelectAccommodation': {
			mobile: '74400',
			desktop: '51600'
		},
		'/Step2Rooms/EditPassengers': {
			mobile: '181200',
			desktop: '144000'
		},
		'/Step3Extras': {
			mobile: '103200',
			desktop: '76800'
		},
		'/Step4Payment': {
			mobile: '140400',
			desktop: '88800'
		},
	}

	let hasExited = false;
	let modalVisible = false;
	const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

	window[tag].initVariation = () => {
		utils.waitUntil(() => document.body, 0).then(() => {
			if (!document.querySelector(`.${tag}__got-questions-modal`)) {
				insertModal(document.body);

				let showTime = triggerPoint[location.pathname].desktop;

				if (isMobile) {
					document.querySelector(`.${tag}__got-questions-modal`).classList.add(`${tag}__mobile`);
					showTime = triggerPoint[location.pathname].mobile;
				}

				setTimeout(() => {
					if (!modalVisible) {
						showModal();

						// Popover activated (time on page)
						Kameleoon.API.Goals.processConversion(364912);
					}
				}, showTime);

				addEventListeners();
			}
		});
	};

	function showModal() {
		const modal = document.querySelector(`.${tag}__got-questions-modal`);
		if (modal && !sessionStorage.getItem(`${tag}__modalShown`)) {
			modal.classList.add(`${tag}__active`);
			modalVisible = true;
			if (isMobile) {
				document.body.classList.add(`${tag}__no-scroll`);
			}
			sessionStorage.setItem(`${tag}__modalShown`, "true");

			// Popover activated (any)
			Kameleoon.API.Goals.processConversion(364910);
		}
	}

	function addEventListeners() {
		if (!window[tag].hasClickListener) {
			document.addEventListener("click", (e) => {
				if (e.target.closest(`.${tag}__close-btn`)) {
					closeModal();

					// Clicks on ‘Close’ button on pop-up
					Kameleoon.API.Goals.processConversion(364931)
				}

				// Clicks on ‘Call’ CTA on pop-up
				if (e.target.closest(`.${tag}__modal a`)) {
					Kameleoon.API.Goals.processConversion(364930)
				}

				// Clicks on any call CTA, including pop-up CTA
				if (e.target.closest('[href*="tel"]')) {
					Kameleoon.API.Goals.processConversion(364933)
				}
			});

			document.addEventListener("mouseleave", () => {
				if (!hasExited && !modalVisible) {
					showModal();

					// Popover activated (exit-intent)
					Kameleoon.API.Goals.processConversion(364911);
				}
				hasExited = true;
			});

			window[tag].hasClickListener = true;
		}
	}

	function closeModal() {
		document.body.classList.remove(`${tag}__no-scroll`);
		document.querySelector(`.${tag}__got-questions-modal`).classList.remove(`${tag}__active`);
		modalVisible = false;
	}

	function insertModal(element) {
		element.insertAdjacentHTML("beforeend", modalTemplate);

		utils.waitUntil(() => document.querySelector('[data-source-phone-number]'), 0).then((element) => {
			const update = (element) => {
				const getPhoneNum = element.textContent;
				const cvElement = document.querySelector(`.${tag}__modal a`);

				cvElement.querySelector(`.${tag}__phone`).textContent = getPhoneNum;
				cvElement.href = `tel:${getPhoneNum.replaceAll(' ', '')}`;
			};

			update(element);
			const observer = new MutationObserver(() => { update(element) });
			observer.observe(element, { attributes: true, childList: false, subtree: true });
		});
	}

	window[tag].variation = "variation-1";
	window[tag].init();
})(window);