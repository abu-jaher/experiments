((w) => {
	"use strict";

	const tag = "cv-6-2";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["cv-pjs"] ? window["cv-pjs"].utils : undefined;

	if (!utils) return;

	const companySize = `
	<div class="${tag}__company-size-container">
        <div class="${tag}__question-header">
            <h2 class="${tag}__question-text">What is the size of your company?</h2>
            <div class="${tag}__info-container">
				<span class="${tag}__info-icon">i</span> 
				<span class="${tag}__info">Our experts can help you get pricing personalized to your company’s size and needs.</span></div>
        </div>
        
        <div class="${tag}__options-container">
            <div class="${tag}__option">
                <input type="radio" id="size-1-20" name="company-size" value='1-20 people'>
                <label for="size-1-20">1-20 people</label>
            </div>
                
            <div class="${tag}__option">
                <input type="radio" id="size-21-200" name="company-size" value='21-200 people'>
                <label for="size-21-200">21-200 people</label>
            </div>
                
            <div class="${tag}__option">
                <input type="radio" id="size-201-2000" name="company-size" value='201-2000 people'>
                <label for="size-201-2000">201-2,000 people</label>
            </div>
                
            <div class="${tag}__option">
                <input type="radio" id="size-2000-plus" name="company-size" value='2000+ people'>
                <label for="size-2000-plus">2,000+ people</label>
            </div>
        </div>
    </div>
	`;

	const originalModalText = {};

	const storeOriginalModalText = () => {
		const selectors = [
			'#show-demo-form.dom-modal .submit-btn p',
			'#show-demo-form.dom-modal h2',
			'#show-demo-form.dom-modal h2 + p',
		];

		selectors.forEach((selector) => {
			const el = document.querySelector(selector);
			if (el) {
				originalModalText[selector] = el.textContent;
			}
		});
	}

	const updateModalText = () => {
		const h2 = document.querySelector('#show-demo-form.dom-modal h2');
		const h2p = document.querySelector('#show-demo-form.dom-modal h2 + p');
		const btnText = document.querySelector('#show-demo-form.dom-modal .submit-btn p');

		if (h2) h2.textContent = 'See how Deel fits your business with a custom quote';
		if (h2p) h2p.textContent = 'Chat with a Deel expert to explore the platform, ask questions, and get pricing personalized to your company’s size and needs.';
		if (btnText) btnText.textContent = 'Get a quote & book your demo';
	}

	const restoreModalText = () => {
		for (const selector in originalModalText) {
			const el = document.querySelector(selector);
			if (el) {
				el.textContent = originalModalText[selector];
			}
		}
	}

	window[tag].initVariation = () => {
		utils.waitUntil('h1 + p', () => {
			storeOriginalModalText();

			const interval = setInterval(()=>{
				if(!document.querySelector(`.${tag}__company-size-container`)){
					document.querySelector(`h1 + p`).insertAdjacentHTML(`afterend`, companySize);
				}
			},20)

			setTimeout(()=>{
				clearInterval(interval)
			},8000)
		}, tag);

		eventListener();
	};

	const eventListener = () => {
		document.addEventListener(`click`, (e) => {
			const el = e.target;
			if (el.closest(`.${tag}__option`)) {
				setTimeout(()=>{
					const value = document.querySelector(`.${tag}__option input[type="radio"]:checked`).value;
					const inputField = document.querySelector(`#show-demo-form.dom-modal #how_many_people`)
					selectMUIOption(inputField, value);

					const elModal = document.querySelector("#show-demo-form.dom-modal");
					elModal.querySelector("div:nth-of-type(2)").scrollTop = 0;
					document.body.classList.add(`${tag}__shown`);
				},20)

				updateModalText();
			}

			if (el.closest(`#show-demo-form.dom-modal > div:nth-of-type(1)`) || el.closest(`#show-demo-form.dom-modal > div:nth-of-type(2) > button`)) {
				document.body.classList.remove(`${tag}__shown`);
				restoreModalText();
			}

			if (el.closest(`#show-demo-form.dom-modal .submit-btn`)) {
				utils.waitUntil("cal-modal-box[state='loaded']", () => {
					document.body.classList.remove(`${tag}__shown`);
					restoreModalText();
				}, tag)
			}

			if (el.closest('main button')) {
				utils.waitUntil(`.MuiDialog-container #how_many_people`, (inputField) => {
					const value = document.querySelector(`.${tag}__option input[type="radio"]:checked`).value;
					if (value !== '') {
						selectMUIOption(inputField, value);
					}
				}, tag)
			}
		})
	}

	const hideAutocompletePopper = ()=> {
		const styleId = 'hide-autocomplete-popper-style';
		let styleElement = document.getElementById(styleId);
		
		if (!styleElement) {
			styleElement = document.createElement('style');
			styleElement.id = styleId;
			styleElement.innerHTML = `
				body .MuiAutocomplete-popper {
					opacity: 0;
				}
			`;
			document.head.appendChild(styleElement);
		}
	}

	const showAutocompletePopper = ()=> {
		const styleElement = document.getElementById('hide-autocomplete-popper-style');
		if (styleElement) {
			styleElement.remove();
		}
	}

	const selectMUIOption = (input, labelText) => {
		if (!input) return;
		hideAutocompletePopper();
		input.setAttribute('readonly', 'true');
		input.focus();
		const keyboardEvent = new KeyboardEvent('keydown', {
			key: 'ArrowDown',
			bubbles: true,
		});
		input.dispatchEvent(keyboardEvent);
		setTimeout(() => {
			const options = [...document.querySelectorAll('li[role="option"]')];
			const match = options.find(opt => opt.textContent.trim() === labelText);
			if (match) {
				match.click();
				input.blur();
				showAutocompletePopper();
			}
			input.removeAttribute('readonly');
		}, 20);
	}

	window[tag].variation = "variation-1";
	window[tag].init();
})(window);