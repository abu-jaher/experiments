(() => {
	try {
		const shared = {
			ID: "FE-135-LP",
			VARIATION: "001",
			CLIENT: "funnelenvy"
		};

		const { ID, VARIATION } = shared;

		const setup = () => {
			document.documentElement.classList.add(`${ID}-${VARIATION}`);
			document.body.classList.add(`${ID}`);

			// add clarity script
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.innerHTML = `(function(a,e,b,f,g,c,d){a[b]=a[b]||function(){(a[b].q=a[b].q||[]).push(arguments)};c=e.createElement(f);c.async=1;c.src="https://www.clarity.ms/tag/"+g;d=e.getElementsByTagName(f)[0];d.parentNode.insertBefore(c,d)})(window,document,"clarity","script","hiuhdldji1");`;
			document.body.appendChild(script);
		};

		let currentStep = 1;
		let previousStep = 1;
		const formID = 5456;

		window._conv_q = window._conv_q || [];

		const activate = () => {
			setup();
			stepHandler(currentStep, previousStep);

			document.querySelector('.Dice_Master_Partnership_Form').closest('.mj-column-per-40').classList.add(`${ID}-form-section`);
			
			// load CJ Marketo form
			document.querySelector('.Dice_Master_Partnership_Form form.mktoForm').insertAdjacentHTML('afterend', `<form id="mktoForm_${formID}"></form>`);
			loadMarketoFormOnStep2(formID);
			
			// insert step 1 html
			insertStep1(`.${ID}-form-section`);

			// insert back btn
			document.querySelector('.FE-135-LP-form-section .text-container:nth-of-type(3)').insertAdjacentHTML('afterend',
				`
					<div class="backButton">
						<a>
							<span class="breadcrumb-back">Back</span>
						</a>
					</div>
				`
			)

			document.addEventListener('click', (event) => {
				const elem = event.target;
				if (elem.closest(`.${ID}-btn`)) {
					if (document.querySelector(`.${ID}-options input:checked`)) {
						currentStep = 2;
						previousStep = 1;
						if (document.querySelector(`.${ID}-options input#radio-role2:checked`)) {
							document.body.classList.add(`${ID}-option-CJ`);
							_conv_q.push(["triggerConversion", "100460517"]);
						}else{
							document.body.classList.remove(`${ID}-option-CJ`);
							_conv_q.push(["triggerConversion", "100460516"]);
						}
						stepHandler(currentStep, previousStep);
					} else {
						document.querySelector(`#step1Error`).classList.add(`${ID}-error`);
					}
				}

				if (elem.closest(`.${ID}-options label`)) {
					document.querySelector(`#step1Error`).classList.remove(`${ID}-error`);
				}

				if (elem.closest(`.${ID} .backButton .breadcrumb-back`)){
					currentStep = 1;
					previousStep = 2;
					stepHandler(currentStep, previousStep);
				}
			})
		};

		const stepHandler = (currentStep, previousStep) => {
			document.body.classList.remove(`FE-step${previousStep}`);
			document.body.classList.add(`FE-step${currentStep}`);
		}

		const insertStep1 = (element) => {
			const stepHTML = htmlString();
			document.querySelector(element).insertAdjacentHTML('afterbegin', stepHTML)
		}


		const htmlString = () => {
			const elCont = `
			<div class="${ID}-step1">
					<div class="${ID}-title">
						<h3>Do you need to fill tech roles or hire professionals with security clearances? Take advantage of our exclusive offer by selecting your need below.</h3>
					</div>
					<div class="${ID}-options">
						<input type="radio" id="radio-role1" name="role" value="">
						<label for="radio-role1" id="">
							<span class="text">Hire top tech talent</span>
							<svg class="logo" style="max-width: 64px;" role="img" viewBox="0 0 101 54" xmlns="http://www.w3.org/2000/svg"><title>Dice</title><rect x="15" y="5" width="81" height="44" fill="#ffffff"></rect><path fill="#be3432" d="M14.765 0H95.037C96.6185 0.000530237 98.135 0.629081 99.2532 1.74746C100.371 2.86584 101 4.3825 101 5.964V48.035C101 49.6166 100.371 51.1334 99.2533 52.2519C98.1351 53.3704 96.6186 53.9992 95.037 54H0C5.043 52.796 8.801 48.265 8.801 42.858C8.801 42.805 8.798 42.753 8.791 42.7L8.801 5.964C8.80126 4.38233 9.4297 2.86552 10.5481 1.74711C11.6665 0.628698 13.1833 0.000265136 14.765 0ZM37.743 33.748L40.452 21.25C41.019 21.25 41.393 21.306 41.575 21.418C41.6621 21.4762 41.7331 21.5553 41.7817 21.6481C41.8302 21.7408 41.8548 21.8443 41.853 21.949C41.855 22.198 41.766 22.755 41.579 23.612L39.981 30.996C39.7 32.263 39.449 33.03 39.213 33.321C38.975 33.602 38.487 33.748 37.743 33.748ZM39.907 18H36.125L32 37H38.375C39.587 37 40.504 36.936 41.13 36.812C41.764 36.677 42.314 36.457 42.795 36.131C43.275 35.807 43.658 35.352 43.948 34.775C44.232 34.199 44.568 33.064 44.933 31.351L46.38 24.694C46.767 22.894 46.976 21.697 46.999 21.077C47.016 20.46 46.862 19.908 46.519 19.4C46.177 18.904 45.602 18.544 44.791 18.326C43.977 18.108 42.347 18 39.907 18ZM53.468 20.465L54 18H49.073L48.543 20.465H53.468ZM49.925 37L53.261 21.42H48.336L45 37H49.925ZM59.225 27.11H63.667V27.111C63.974 25.656 64.071 24.541 63.949 23.749C63.833 22.961 63.393 22.299 62.633 21.779C61.876 21.259 60.884 21 59.656 21C58.423 21 57.322 21.262 56.351 21.785C55.379 22.309 54.692 22.911 54.284 23.571C53.881 24.243 53.54 25.231 53.259 26.543L52.332 30.934C52.006 32.433 51.922 33.602 52.072 34.417C52.216 35.236 52.63 35.873 53.312 36.319C53.99 36.776 54.992 37 56.322 37C57.362 37 58.265 36.838 59.042 36.51C59.8185 36.1781 60.5108 35.6765 61.068 35.042C61.644 34.396 62.039 33.766 62.249 33.146C62.468 32.527 62.708 31.597 62.975 30.367H58.78L58.39 32.203C58.224 32.997 58.05 33.538 57.874 33.83C57.704 34.112 57.455 34.257 57.137 34.257C56.869 34.257 56.691 34.115 56.611 33.843C56.531 33.571 56.551 33.158 56.665 32.613L58.207 25.339C58.346 24.665 58.49 24.236 58.623 24.039C58.756 23.852 58.962 23.752 59.229 23.752C59.496 23.752 59.659 23.863 59.719 24.081C59.771 24.297 59.729 24.715 59.599 25.335L59.225 27.11ZM72.053 25.644L71.795 26.766H70.292L70.552 25.644C70.747 24.774 70.902 24.242 71.034 24.042C71.166 23.852 71.404 23.752 71.761 23.752C72.054 23.752 72.22 23.867 72.257 24.094C72.303 24.334 72.23 24.849 72.053 25.644ZM69.73 29.272H76.208L76.673 27.224C77.009 25.733 77.087 24.564 76.903 23.747C76.726 22.919 76.234 22.251 75.435 21.756C74.641 21.252 73.539 21 72.141 21C70.998 21 69.933 21.209 68.958 21.625C67.983 22.039 67.22 22.631 66.651 23.413C66.09 24.195 65.655 25.267 65.356 26.608L64.338 31.115C64.083 32.264 63.971 33.141 64.007 33.738C64.043 34.3309 64.2363 34.9036 64.567 35.397C64.9 35.893 65.446 36.289 66.19 36.57C66.926 36.864 67.831 37 68.886 37C69.974 37 70.913 36.863 71.696 36.566C72.4725 36.2761 73.1814 35.8303 73.779 35.256C74.373 34.675 74.796 34.131 75.04 33.616C75.284 33.099 75.513 32.364 75.728 31.414L75.986 30.268H71.248L70.788 32.305C70.615 33.066 70.433 33.587 70.248 33.851C70.058 34.129 69.775 34.257 69.393 34.257C69.085 34.257 68.898 34.155 68.838 33.953C68.778 33.748 68.829 33.305 68.98 32.61L69.73 29.272ZM80.372 19.327H79.935V18.606H80.428C80.613 18.606 80.752 18.635 80.842 18.694C80.8865 18.7216 80.9228 18.7607 80.9471 18.8072C80.9713 18.8536 80.9827 18.9057 80.98 18.958C80.98 19.089 80.933 19.183 80.842 19.241C80.748 19.298 80.592 19.327 80.372 19.327ZM79.4 18.18V20.834H79.936V19.746H80.076C80.2211 19.7402 80.3628 19.7903 80.472 19.886C80.573 19.978 80.69 20.152 80.823 20.406L81.045 20.834H81.707L81.397 20.302C81.258 20.067 81.156 19.914 81.093 19.843C81.0209 19.7671 80.9318 19.7095 80.833 19.675C81.072 19.632 81.251 19.548 81.37 19.424C81.488 19.3 81.547 19.136 81.547 18.931C81.5493 18.8325 81.5316 18.7345 81.4952 18.6429C81.4588 18.5514 81.4043 18.4681 81.335 18.398C81.194 18.253 80.967 18.18 80.657 18.18H79.4ZM79.067 18.093C79.448 17.689 79.945 17.486 80.559 17.486C80.843 17.486 81.142 17.566 81.453 17.726C81.7692 17.8911 82.0333 18.1407 82.216 18.447C82.414 18.768 82.513 19.12 82.513 19.5C82.513 20.053 82.317 20.526 81.923 20.92C81.529 21.313 81.056 21.51 80.506 21.51C79.954 21.51 79.48 21.313 79.086 20.92C78.693 20.526 78.496 20.053 78.496 19.5C78.4929 18.974 78.6982 18.4681 79.067 18.093ZM82.277 17.744C81.795 17.248 81.181 17 80.435 17H80.434C80.102 17 79.741 17.093 79.354 17.277C78.967 17.463 78.645 17.758 78.387 18.163C78.129 18.57 78 19.015 78 19.5C77.9948 19.8288 78.057 20.1552 78.1827 20.4591C78.3085 20.763 78.495 21.0379 78.731 21.267C78.96 21.5037 79.2352 21.6909 79.5395 21.817C79.8438 21.9431 80.1707 22.0054 80.5 22C81.187 22 81.775 21.755 82.265 21.265C82.755 20.776 83 20.187 83 19.5C83 18.826 82.759 18.24 82.277 17.744Z"></path></svg>
						</label>
			
						<input type="radio" id="radio-role2" name="role" value="">
						<label for="radio-role2" id="">
							<span class="text">Hire cleared <br>professionals</span>
							<img class="logo" style="max-width: 140px;" src="https://about.clearancejobs.com/hubfs/About%20Site/logos/ClearanceJobs-Secondary.svg">
						</label>
					</div>
					<div class="${ID}-btn-wrapper">
						<div id="step1Error">
							<p>A selection is required to continue.</p>
						</div>
						<p class="${ID}-btn">CONTINUE</p>
					</div>
			</div>
			`
			return elCont;
		}

		const loadMarketoFormOnStep2 = (formID) => {
			MktoForms2.loadForm('//app-sjg.marketo.com', '318-VQK-428', formID, (form) => {
				const formElem = form.getFormElem()[0];
				const firstName = formElem.querySelector('#FirstName')
				const lastName = formElem.querySelector('#LastName')
				const company = formElem.querySelector('#Company')
				const email = formElem.querySelector('#Email')

				firstName.setAttribute('placeholder', '*First Name')
				lastName.setAttribute('placeholder', '*Last Name')
				company.setAttribute('placeholder', '*Company')
				email.setAttribute('placeholder', '*Email')

			})
		}

		const pollerLite = (conditions, callback, maxTime = 20000) => {
			const POLLING_INTERVAL = 500;
			const startTime = Date.now();
			const interval = setInterval(() => {
				const allConditionsMet = conditions.every(condition =>
					typeof condition === 'function' ? condition() : !!document.querySelector(condition)
				);

				if (allConditionsMet) {
					clearInterval(interval);
					callback();
				} else if (Date.now() - startTime >= maxTime) {
					clearInterval(interval);
					console.log('Polling exceeded maximum time limit');
				}
			}, POLLING_INTERVAL);
		};

		const addStyles = (ID, css) => {
			if (!document.querySelector(`style#${ID}`)) {
				const e = document.createElement("style");
				e.textContent = css,
					e.id = ID,
					document.body.insertAdjacentElement("beforeend", e)
			}
		}

		pollerLite(['.Dice_Master_Partnership_Form'], activate);
		setTimeout(() => {
			document.body.style.opacity = 1;
		}, 3000)

		pollerLite(['#text-9k7g2epxl strong'], () => {
			document.querySelector('#text-9k7g2epxl strong').textContent = 'Dice/ClearanceJobs + DISA'
		});

		pollerLite(['body'], () => {
			addStyles(
				ID,
				`
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
				
html body.FE-135-LP {
    opacity: 1;
}

.FE-step2 .FE-135-LP-step1,
.FE-step2 form.mktoForm#mktoForm_5456,
.FE-135-LP-option-CJ form.mktoForm:not(#mktoForm_5456),
.FE-step1 .FE-135-LP-form-section>div:not(.FE-135-LP-step1) {
    display: none;
}

.FE-135-LP-option-CJ form.mktoForm#mktoForm_5456 {
    display: block;
}

.FE-135-LP .FE-135-LP-step1 {
    max-width: 430px;
    margin: auto;
}

.FE-135-LP-form-section .text-container:nth-of-type(1) p {
    text-align: center;
}

.FE-135-LP .FE-135-LP-title h3 {
    font-family: Arial;
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 53px;
}

.FE-135-LP-options {
    display: flex;
    justify-content: space-between;
    gap: 28px;
}

.FE-135-LP .FE-135-LP-options input {
    display: none;
}

.FE-135-LP .FE-135-LP-options label {
    width: 201px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 3px;
    border: 1px solid #585450;
    padding: 0 10px;
    padding-bottom: 19px;
    cursor: pointer;
}

.FE-135-LP .FE-135-LP-options input:checked+label {
    border: solid #ce2229;
}

.FE-135-LP .FE-135-LP-options input:checked+label .text {
    font-weight: 700;
}

.FE-135-LP .FE-135-LP-options label .text {
    font-family: Arial;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    text-align: center;
}

.FE-135-LP .FE-135-LP-options label[for="radio-role1"] .text {
    margin-top: 29px;
    margin-bottom: 24px;
}

.FE-135-LP .FE-135-LP-options label[for="radio-role2"] .text {
    margin-top: 19px;
    margin-bottom: 20px;
}

.FE-135-LP .FE-135-LP-step1 .FE-135-LP-btn-wrapper {
    position: relative;
}

.FE-135-LP .FE-135-LP-step1 .FE-135-LP-btn {
    color: #ffffff;
    background-color: #CE2129;
    padding: 10px 25px;
    font-size: 16px;
    border-radius: 3px;
    border: none;
    max-width: 120px;
    text-align: center;
    margin: auto;
    font-family: Arial;
    margin-top: 60px;
    cursor: pointer;
}

.FE-135-LP .FE-135-LP-step1 #step1Error {
    display: none;
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
}

.FE-135-LP .FE-135-LP-step1 #step1Error p {
    color: #991B1B;
    font-family: "IBM Plex Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    text-align: center;
}

.FE-135-LP .FE-135-LP-step1 #step1Error.FE-135-LP-error {
    display: block;
}

.FE-135-LP form button.mktoButton {
    text-transform: uppercase;
}

.FE-135-LP .backButton {
    padding-top: 10px;
    padding-bottom: 24px;
    text-align: left;
}

.FE-135-LP .backButton .breadcrumb-back {
    display: inline-flex;
    color: #0E7490;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    position: relative;
    padding-left: 20px;
    cursor: pointer;
	font-family: 'IBM Plex Sans';
}

.FE-135-LP .backButton .breadcrumb-back::before {
    content: "";
    width: 7px;
    height: 7px;
    background: #fff;
    border-color: #000;
    border-left: 2px solid;
    border-top: 2px solid;
    transform: rotate(-45deg);
    top: 4px;
    position: absolute;
    left: 8px;
}

.FE-135-LP .backButton .breadcrumb-back:hover {
    color: #164E63;
    text-decoration: underline;
}

@media screen and (min-width: 1024px){
    .FE-135-LP-options{
        height: 128px;
    }
}

@media screen and (max-width: 450px) {
    .FE-135-LP .FE-135-LP-options {
        flex-direction: column;
        align-items: center;
    }
}
				`
			)
		});

	} catch (error) {
		console.log(`${error} Dice-135`);
	}
})();