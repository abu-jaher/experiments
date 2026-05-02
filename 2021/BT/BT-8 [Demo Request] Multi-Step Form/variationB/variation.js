(function () {
	try {
		const shared = {
			ID: "FE-multi-step-form",
			VARIATION: "1",
			CLIENT: "bonterra"
		};

		const { ID, VARIATION } = shared;

		const setup = () => {
			document.documentElement.classList.add(ID);
			document.documentElement.classList.add(`${ID}-${VARIATION}`);
		};

		let mktoForm;
		let step1BtnText;
		let step1FieldString;
		let step2FieldString;
		let step1FieldList;
		let formLabel;
		let step = 1;
		let stepOneValid;
		let stepTwoValid;

		const interactiveStep = `
		<h3 class="fe-section-title">GET A PERSONALIZED DEMO!</h3>
		<div class="fe-step-display">Step <span class="fe-step-counter">1</span> of 3</div>
		<div id="fe-interactive-step">
			<div class="fe-interactive-heading">
				<h3>What are you looking for?</h3>
			</div>
			<div class="fe-btn-grid">
				<button class="fe-answer-btn"><input type="radio" id="fe-checkbox1" name="fe-step2"><label for="fe-checkbox1"><span class="checkmark" data="Fundraising and Engagement" >Fundraising and Engagement</span></label></button>
				<button class="fe-answer-btn"><input type="radio" id="fe-checkbox2" name="fe-step2"><label for="fe-checkbox2"><span class="checkmark" data="Impact Management" >Impact Management</span></label></button>
				<button class="fe-answer-btn"><input type="radio" id="fe-checkbox3" name="fe-step2"><label for="fe-checkbox3"><span class="checkmark" data="Strategic Philanthropy" >Strategic Philanthropy</span></label></button>
			</div>
			<div class="step1ErrorMessage">
					<div class="step1error">A selection is required to continue.</div>
			</div>
			<div class="fe-next-button">
				<div id="tempStep1Btn" tabindex="0" class="multi-step-btn">Next Step</div>
			</div>
		</div>	
		`

		const activate = () => {
			setup();

			document.body.classList.add(`${ID}__step-1`);
			const formHeading = document.querySelector('.form-include .section-title');
			formHeading.insertAdjacentHTML('afterend', interactiveStep);

			document.addEventListener('click', (e) => {
				if (e.target.closest('#tempStep1Btn')) {
					stepOneValid = true;
					step1Validation();
					showSecondStep();
				}

				if (e.target.closest('#tempStep2Btn')) {
					stepTwoValid = true;
					stepTwoValidation(mktoForm, step1FieldList)
					if (stepTwoValid) {
						showThirdStep(formLabel);
						step++;
						document.querySelector('.fe-step-display').textContent = `Last step`;
						document.querySelector('#capability').value = document.querySelector('#fe-interactive-step .fe-answer-btn input:checked + label span').getAttribute('data');
						gtag('step_2_completion');
					}
				}

				if (e.target.closest('.fe-btn-grid') || e.target.closest('.mktoFieldWrap')) {
					gtag('form_engagement');
				}
			})
		};

		const step1Validation = () => {
			if (!document.querySelector('#fe-interactive-step .fe-answer-btn input:checked')) {
				stepOneValid = false;
				document.querySelector('#fe-interactive-step').classList.add('step1-error');
			}
		}

		const showSecondStep = () => {
			if (step === 1 && stepOneValid) {
				document.querySelector('#fe-interactive-step').classList.remove('step1-error');
				step++
				setupMarketo('Next Step', 'FirstName, LastName, Email', 'Phone, Company, Industry, Number_of_Employees_Range__c');
				setTimeout(() => {
					document.body.classList.remove(`${ID}__step-1`);
					document.body.classList.add(`${ID}__step-2`);
					document.querySelector('.fe-step-display .fe-step-counter').textContent = step;
					gtag('step_1_completion');
				}, 100)
			}
		}

		const showThirdStep = (fieldLabel) => {
			for (let i = 0; i < fieldLabel.length; i++) {
				const field = fieldLabel[i].closest(".multi-step-step1");
				const field2 = fieldLabel[i].closest(".multi-step-step2");

				if (field && field.classList.contains("multi-step-step1")) {
					field.classList.remove("multi-step-show");
					field.classList.add("multi-step-hide");
				} else {
					field2 && field2.classList.add("multi-step-show");
					field2 && field2.classList.remove("multi-step-hide");
					document.querySelector('#tempStep2Btn').classList.add('multi-step-hide');
					document.querySelector("button[type='submit']").classList.remove('multi-step-hide');
				}
			}
		}

		const validateEmail = (email) => {
			const re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(email).toLowerCase());
		}

		const stepTwoValidation = (form, fieldList) => {
			for (let i = fieldList.length - 1; i >= 0; i--) {
				const field1ElementName = fieldList[i].trim();
				const formVal = document.getElementById(field1ElementName).value;
				if (formVal == "") {
					const formElem = form.getFormElem().find("#" + field1ElementName);
					form.showErrorMessage("This field is required.", formElem);
					stepTwoValid = false;
				}
				else if (field1ElementName.includes('email') || field1ElementName.includes('Email')) {
					if (!validateEmail(formVal) || document.getElementById(field1ElementName).classList.contains('mktoInvalid') || !formVal.split("@").pop().includes('.')) {
						const emailElem = form.getFormElem().find("#" + field1ElementName);
						form.showErrorMessage('Must be valid email. <span class="mktoErrorDetail">example@yourdomain.com</span>', emailElem);
						stepTwoValid = false;
					}
				}
			}
		}

		const createStep1Button = (btnText) => {
			let temp = document.createElement('div');
			btnText = btnText.trim();
			temp.innerHTML = btnText;
			return temp.firstChild;
		}

		const setButtonText = (form) => {
			const btn = form.querySelector("button[type='submit']");

			if (step === 2) {
				btn.classList.add('multi-step-hide'); //don't show form submit button in step1
				btn.setAttribute('id', 'formSubmitBtn');
				//create step1 button which will trigger moving to step2 when clicked
				const tempStep1ButtonHtml = '<div id="tempStep2Btn" tabindex="0" class="multi-step-btn">' + step1BtnText + '</div>';
				let tempStep1Button = createStep1Button(tempStep1ButtonHtml);
				btn.parentNode.append(tempStep1Button);
			} else {
				btn.classList.remove('multi-step-hide'); //now show form submit button
				btn.classList.add('multi-step-btn');
				form.querySelector('#tempStep2Btn').classList.add('multi-step-hide'); //remove step1 button
				btn.setAttribute("tabindex", "0");
			}
		}

		const getClassForField = (id) => {
			if (step1FieldString.includes(id)) {
				if (step === 2) {
					return 'multi-step-step1 multi-step-show';
				} else {
					return 'multi-step-step1 multi-step-hide';
				}
			}

			if (step2FieldString.includes(id)) {
				if (step === 2) {
					return 'multi-step-step2 multi-step-hide';
				} else {
					return 'multi-step-step2 multi-step-show';
				}
			}

			return "";
		}

		const addThemeKitStyling = (form) => {
			form.querySelectorAll('input, select').forEach((element) => {
				const currentStepFieldClass = getClassForField(element.id).split(" ");
				if (element.id === 'capability') {
					if (!element.closest('.mktoFormRowSingle')) {
						element.closest('.mktoFormCol') && element.closest('.mktoFormCol').classList.add('multi-step-hide');
					} else {
						element.closest('.mktoFormRow') && element.closest('.mktoFormRow').classList.add('multi-step-hide');
					}
				} else {
					if (!element.closest('.mktoFormRowSingle')) {
						element.closest('.mktoFormCol') && element.closest('.mktoFormCol').classList.add(currentStepFieldClass[0], currentStepFieldClass[1]);
					} else {
						element.closest('.mktoFormRow') && element.closest('.mktoFormRow').classList.add(currentStepFieldClass[0], currentStepFieldClass[1]);
					}
				}
			});
		}

		const setupMarketo = (firstStepBtnText, step1Fields, step2Fields) => {
			MktoForms2.whenReady((form) => {
				mktoForm = form;
				step1BtnText = firstStepBtnText;
				step1FieldString = step1Fields;
				step2FieldString = step2Fields;
				step1FieldList = step1Fields.split(',');

				const formElem = form.getFormElem();
				formLabel = formElem[0].querySelectorAll(".mktoFormRow label");

				const orgName = formElem[0].querySelector('#Company').closest('.mktoFormCol');
				const orgSize = formElem[0].querySelector('#Number_of_Employees_Range__c').closest('.mktoFormCol');

				formElem[0].querySelector('#Phone').closest('.mktoFormCol').insertAdjacentElement('afterend', orgName);
				formElem[0].querySelector('#Industry').closest('.mktoFormCol').insertAdjacentElement('afterend', orgSize);

				setButtonText(formElem[0]);
				addThemeKitStyling(formElem[0]);
			});
		}

		window.dataLayer = window.dataLayer || [];
		const gtag = (event) => {
			window.dataLayer.push({
				'event': event
			});
		}

		const pollerLite = (conditions, callback, maxTime = 40000) => {
			const POLLING_INTERVAL = 250;
			const startTime = Date.now();
			const interval = setInterval(() => {
				const allConditionsMet = conditions.every((condition) => {
					if (typeof condition === 'function') {
						return condition();
					}
					return !!document.querySelector(condition);
				});
				if (allConditionsMet) {
					clearInterval(interval);
					callback();
				} else if (Date.now() - startTime >= maxTime) {
					clearInterval(interval);
					console.log('Polling exceeded maximum time limit');
				}
			}, POLLING_INTERVAL);
		};

		pollerLite(['.form-include .section-title'], activate);
	} catch (error) {
		console.log(`${error} Test BT-8`)
	}
})();