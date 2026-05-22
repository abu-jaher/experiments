((w) => {
    const exp = 'TAF 11.0';
    const tag = 'cv-11-0';
    const qa = document.cookie.indexOf('cfQA') > -1;
    const window = typeof unsafeWindow !== 'undefined' ? unsafeWindow : w;
    const log = qa ? Function.prototype.bind.call(console.log, console, `[CONV] ${exp} |`) : () => { };

    const utils = {
        waitUntil: (condition, wait = 5000) => {
            return new Promise((resolve, reject) => {
                let stop;

                const timeout =
                    wait && setTimeout(() => {
                        stop = true;
                        reject();
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

        setCookie: (name, value, days = 1) => {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = "; expires=" + date.toUTCString();
            document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
        },

        getCookie: (name) => {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },

        init: () => {
            try {
                utils.waitUntil(() => document.body, 0).then((docBody) => {
                    docBody.classList.add(tag);
                });

                initRegistration();
                initConfirmation();

                log('running v2');
            } catch (err) {
                log(err.message);
            }
        },
    };

    const reorderFormRows = () => {
        const tbody = document.querySelector('.cv-11-0__regForm tbody');
        if (!tbody) return;
        const selectors = [
            '[for="firstName"]',
            '[for="lastName"]',
            '[for="email"]',
            '[for="email2"]',
            '[for="password1"]',
            '[for="password2"]',
            '[for="countryCode"]',
            '.privacy-message',
            '.marketablerow',
            '#acceptTermsConditions'
        ];

        selectors.forEach(selector => {
            const row = tbody.querySelector(`.form-group:has(${selector})`) || tbody.querySelector(selector);
            if (row) {
                tbody.appendChild(row);
            }
        });
    };

    const updateStateByCountry = (country) => {
        if (country === "US") {
            const stateUS = document.querySelector('.regForm #stateUS select');
            if (stateUS) {
                stateUS.value = "AL";
                const event = new Event('change', { bubbles: true });
                stateUS.dispatchEvent(event);
            }
        } else if (country === "CA") {
            const stateCA = document.querySelector('.regForm #stateCA select');
            if (stateCA) {
                stateCA.value = "AB";
                const event = new Event('change', { bubbles: true });
                stateCA.dispatchEvent(event);
            }
        } else if (country === "BR") {
            const stateBR = document.querySelector('.regForm #stateBR select');
            if (stateBR) {
                stateBR.value = "AC";
                const event = new Event('change', { bubbles: true });
                stateBR.dispatchEvent(event);
            }
        }
    };
    const updateSelectColor = (el) => {
        if (el.value === "-1") {
            el.setAttribute('data-placeholder', 'true');
        } else {
            el.removeAttribute('data-placeholder');
        }
    };

    const ragBenefits = `
    <p class="${tag}__title">Register to boost your research <br>and gain these benefits:</p>
    <i class="fa fa-envelope fa-2x" aria-hidden="true" style="color: #11325f;  float:left; width: 40px; font-size:1.5em;"></i>
    <p><strong>Choose new content alerts</strong> <br>Be informed about new research of interest to you</p>
    <i class="fa fa-search-plus fa-2x" aria-hidden="true" style="color: #11325f;  float:left; width: 40px; font-size:1.5em;"></i>
    <p><strong>Save your searches</strong> <br>Save your searches and schedule alerts to send you results when new matches are found</p>
    <i class="fa fa-file-excel-o fa-2x" aria-hidden="true" style="color: #11325f;  float:left; width: 40px; font-size:1.5em;"></i>
    <p><strong>Download your search results</strong> <br>Download your search results and save as a .csv file to support your research</p>
    `;

    const getUserCountry = async () => {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            return data.country_code;
        } catch (error) {
            return null;
        }
    };


    const initRegistration = () => {
        utils
            .waitUntil(() => document.querySelector('.regForm .requiredField') && document.querySelector('.reg-benefits'), 0)
            .then(() => {
                const element = document.querySelector('.regForm .requiredField');
                document.body.classList.add(`${tag}__registration-page`)
                document.querySelector(`.login-title h1`).textContent = `Register for free today`;
                element.innerHTML = `<div class="${tag}__wrap"><span>*</span> Fields are required</div>`;
                element.insertAdjacentHTML('afterbegin', `
                    <div class="${tag}__login">
                        <p>
                            Already have an account?
                            <a href="/action/showLogin?redirectUri=/"> Log in now</a>
                        </p>
                    </div>
                `);

                element.closest(`.wrapped`).classList.add(`${tag}__regForm`);

                reorderFormRows();

                const countrySelect = document.querySelector('.regForm #countryCode');
                if (countrySelect) {
                    getUserCountry().then(country => {
                        if (!country) {
                            Kameleoon.API.Goals.processConversion(406606);
                            return;
                        }
                        countrySelect.value = country;
                        const event = new Event('change', { bubbles: true });
                        countrySelect.dispatchEvent(event);
                        countrySelect.closest(`.form-group`).style.display = `none`;

                        setTimeout(() => { updateStateByCountry(country);}, 1000);
                    });

                    updateSelectColor(countrySelect);
                    countrySelect.addEventListener('change', (e) => {
                        updateSelectColor(e.target);
                        setTimeout(() => { updateStateByCountry(e.target.value);}, 1000);
                        utils.setCookie(`${tag}__country-select`, e.target.value);
                    });

                    if (countrySelect.value == '-1') {
                        setTimeout(() => { updateStateByCountry(countrySelect.value);}, 1000);
                    }
                }

                const firstName = document.querySelector('.regForm #firstName');
                const lastName = document.querySelector('.regForm #lastName');
                const email1 = document.querySelector('.regForm #email');
                const email2 = document.querySelector('.regForm #email2');
                const password1 = document.querySelector('.regForm #password1');
                const password2 = document.querySelector('.regForm #password2');

                firstName.setAttribute('placeholder', 'Enter your first name');
                lastName.setAttribute('placeholder', 'Enter your last name');
                email1.setAttribute('placeholder', 'Enter your email address');
                email2.setAttribute('placeholder', 'Confirm your Email address');
                password1.setAttribute('placeholder', 'Create a password');
                password2.setAttribute('placeholder', 'Confirm your a password');

                email1.addEventListener('input', (e) => {
                    email2.value = e.target.value;
                })

                document.querySelector(`.reg-benefits`).innerHTML = ragBenefits;
                document.querySelector(`.reg-benefits`).parentElement.classList.add(`${tag}__benefits-wrap`);

                const targetText = "already registered on our website";
                const errorRows = document.querySelectorAll('tr.error.rtl');
                const emailFieldContainer = document.querySelector('.regForm #email')?.closest('.form-group');
                const registrationError = Array.from(errorRows).find(row => 
                    row.textContent.toLowerCase().includes(targetText.toLowerCase())
                );

                if (registrationError && emailFieldContainer) {
                    registrationError.classList.add(`${tag}__moved-error`);
                    emailFieldContainer.insertAdjacentElement('afterend', registrationError);
                }
            });
    }

    const subjects = ['Area Studies', 'Arts', 'Behavioral Sciences', 'Bioscience', 'Built Environment', 'Communication Studies', 'Computer Science', 'Earth Sciences', 'Economics, Finance, Business & Industry', 'Education', 'Engineering & Technology', 'Environment & Agriculture', 'Environment and Sustainability', 'Food Science & Technology', 'Geography', 'Global Development', 'Health and Social Care', 'Humanities', 'Information Science', 'Language & Literature', 'Law', 'Mathematics & Statistics', 'Medicine, Dentistry, Nursing & Allied Health', 'Museum and Heritage Studies', 'Physical Sciences', 'Politics & International Relations', 'Social Sciences', 'Sports and Leisure', 'Tourism, Hospitality and Events', 'Urban Studies'];

    const countryList = `
<option selected="selected" value="-1">Select A Country/Region</option>
<option value="US">United States</option>
<option value="GB">United Kingdom</option>
<option value="AF">Afghanistan</option>
<option value="AX">Aland Islands</option>
<option value="AL">Albania</option>
<option value="DZ">Algeria</option>
<option value="AS">American Samoa</option>
<option value="AD">Andorra</option>
<option value="AO">Angola</option>
<option value="AI">Anguilla</option>
<option value="AQ">Antarctica</option>
<option value="AG">Antigua and Barbuda</option>
<option value="AR">Argentina</option>
<option value="AM">Armenia</option>
<option value="AW">Aruba</option>
<option value="AU">Australia</option>
<option value="AT">Austria</option>
<option value="AZ">Azerbaijan</option>
<option value="BS">Bahamas</option>
<option value="BH">Bahrain</option>
<option value="BD">Bangladesh</option>
<option value="BB">Barbados</option>
<option value="BY">Belarus</option>
<option value="BE">Belgium</option>
<option value="BZ">Belize</option>
<option value="BJ">Benin</option>
<option value="BM">Bermuda</option>
<option value="BT">Bhutan</option>
<option value="BO">Bolivia</option>
<option value="BQ">Bonaire, Sint Eustatius and Saba</option>
<option value="BA">Bosnia and Herzegovina</option>
<option value="BW">Botswana</option>
<option value="BV">Bouvet Island</option>
<option value="BR">Brazil</option>
<option value="IO">British Indian Ocean Territory</option>
<option value="BN">Brunei Darussalam</option>
<option value="BG">Bulgaria</option>
<option value="BF">Burkina Faso</option>
<option value="BI">Burundi</option>
<option value="KH">Cambodia</option>
<option value="CM">Cameroon</option>
<option value="CA">Canada</option>
<option value="CV">Cape Verde</option>
<option value="KY">Cayman Islands</option>
<option value="CF">Central African Republic</option>
<option value="TD">Chad</option>
<option value="CL">Chile</option>
<option value="CN">China</option>
<option value="CX">Christmas Island</option>
<option value="CC">Cocos (Keeling) Islands</option>
<option value="CO">Colombia</option>
<option value="KM">Comoros</option>
<option value="CG">Congo</option>
<option value="CD">Congo, The Democratic Republic of the</option>
<option value="CK">Cook Islands</option>
<option value="CR">Costa Rica</option>
<option value="CI">Cote D'ivoire</option>
<option value="HR">Croatia</option>
<option value="CU">Cuba</option>
<option value="CW">Curaçao</option>
<option value="CY">Cyprus</option>
<option value="CZ">Czech Republic</option>
<option value="DK">Denmark</option>
<option value="DJ">Djibouti</option>
<option value="DM">Dominica</option>
<option value="DO">Dominican Republic</option>
<option value="EC">Ecuador</option>
<option value="EG">Egypt</option>
<option value="SV">El Salvador</option>
<option value="GQ">Equatorial Guinea</option>
<option value="ER">Eritrea</option>
<option value="EE">Estonia</option>
<option value="SZ">Eswatini</option>
<option value="ET">Ethiopia</option>
<option value="FK">Falkland Islands (Malvinas)</option>
<option value="FO">Faroe Islands</option>
<option value="FJ">Fiji</option>
<option value="FI">Finland</option>
<option value="FR">France</option>
<option value="GF">French Guiana</option>
<option value="PF">French Polynesia</option>
<option value="TF">French Southern Territories</option>
<option value="GA">Gabon</option>
<option value="GM">Gambia</option>
<option value="GE">Georgia</option>
<option value="DE">Germany</option>
<option value="GH">Ghana</option>
<option value="GI">Gibraltar</option>
<option value="GR">Greece</option>
<option value="GL">Greenland</option>
<option value="GD">Grenada</option>
<option value="GP">Guadeloupe</option>
<option value="GU">Guam</option>
<option value="GT">Guatemala</option>
<option value="GG">Guernsey</option>
<option value="GN">Guinea</option>
<option value="GW">Guinea-Bissau</option>
<option value="GY">Guyana</option>
<option value="HT">Haiti</option>
<option value="HM">Heard Island and Mcdonald Islands</option>
<option value="VA">Holy See (Vatican City State)</option>
<option value="HN">Honduras</option>
<option value="HK">Hong Kong</option>
<option value="HU">Hungary</option>
<option value="IS">Iceland</option>
<option value="IN">India</option>
<option value="ID">Indonesia</option>
<option value="IR">Iran, Islamic Republic of</option>
<option value="IQ">Iraq</option>
<option value="IE">Ireland</option>
<option value="IM">Isle of Man</option>
<option value="IL">Israel</option>
<option value="IT">Italy</option>
<option value="JM">Jamaica</option>
<option value="JP">Japan</option>
<option value="JE">Jersey</option>
<option value="JO">Jordan</option>
<option value="KZ">Kazakhstan</option>
<option value="KE">Kenya</option>
<option value="KI">Kiribati</option>
<option value="KP">Korea, Democratic People's Republic of</option>
<option value="KR">Korea, Republic of</option>
<option value="XK">Kosovo</option>
<option value="KW">Kuwait</option>
<option value="KG">Kyrgyzstan</option>
<option value="LA">Lao People's Democratic Republic</option>
<option value="LV">Latvia</option>
<option value="LB">Lebanon</option>
<option value="LS">Lesotho</option>
<option value="LR">Liberia</option>
<option value="LY">Libyan Arab Jamahiriya</option>
<option value="LI">Liechtenstein</option>
<option value="LT">Lithuania</option>
<option value="LU">Luxembourg</option>
<option value="MO">Macau</option>
<option value="MG">Madagascar</option>
<option value="MW">Malawi</option>
<option value="MY">Malaysia</option>
<option value="MV">Maldives</option>
<option value="ML">Mali</option>
<option value="MT">Malta</option>
<option value="MH">Marshall Islands</option>
<option value="MQ">Martinique</option>
<option value="MR">Mauritania</option>
<option value="MU">Mauritius</option>
<option value="YT">Mayotte</option>
<option value="MX">Mexico</option>
<option value="FM">Micronesia, Federated States of</option>
<option value="MD">Moldova, Republic of</option>
<option value="MC">Monaco</option>
<option value="MN">Mongolia</option>
<option value="ME">Montenegro</option>
<option value="MS">Montserrat</option>
<option value="MA">Morocco</option>
<option value="MZ">Mozambique</option>
<option value="MM">Myanmar</option>
<option value="NA">Namibia</option>
<option value="NR">Nauru</option>
<option value="NP">Nepal</option>
<option value="NL">Netherlands</option>
<option value="AN">Netherlands Antilles</option>
<option value="NC">New Caledonia</option>
<option value="NZ">New Zealand</option>
<option value="NI">Nicaragua</option>
<option value="NE">Niger</option>
<option value="NG">Nigeria</option>
<option value="NU">Niue</option>
<option value="NF">Norfolk Island</option>
<option value="MK">North Macedonia</option>
<option value="MP">Northern Mariana Islands</option>
<option value="NO">Norway</option>
<option value="OM">Oman</option>
<option value="PK">Pakistan</option>
<option value="PW">Palau</option>
<option value="PA">Panama</option>
<option value="PG">Papua New Guinea</option>
<option value="PY">Paraguay</option>
<option value="PE">Peru</option>
<option value="PH">Philippines</option>
<option value="PN">Pitcairn</option>
<option value="PL">Poland</option>
<option value="PT">Portugal</option>
<option value="PR">Puerto Rico</option>
<option value="QA">Qatar</option>
<option value="RE">Reunion</option>
<option value="RO">Romania</option>
<option value="RU">Russian Federation</option>
<option value="RW">Rwanda</option>
<option value="BL">Saint Barthelemy</option>
<option value="SH">Saint Helena</option>
<option value="KN">Saint Kitts and Nevis</option>
<option value="LC">Saint Lucia</option>
<option value="MF">Saint Martin</option>
<option value="PM">Saint Pierre and Miquelon</option>
<option value="VC">Saint Vincent and the Grenadines</option>
<option value="WS">Samoa</option>
<option value="SM">San Marino</option>
<option value="ST">Sao Tome and Principe</option>
<option value="SA">Saudi Arabia</option>
<option value="SN">Senegal</option>
<option value="RS">Serbia</option>
<option value="SC">Seychelles</option>
<option value="SL">Sierra Leone</option>
<option value="SG">Singapore</option>
<option value="SX">Sint Maarten (Dutch part)</option>
<option value="SK">Slovakia</option>
<option value="SI">Slovenia</option>
<option value="SB">Solomon Islands</option>
<option value="SO">Somalia</option>
<option value="ZA">South Africa</option>
<option value="GS">South Georgia and the South Sandwich Islands</option>
<option value="SS">South Sudan</option>
<option value="ES">Spain</option>
<option value="LK">Sri Lanka</option>
<option value="SD">Sudan</option>
<option value="SR">Suriname</option>
<option value="SJ">Svalbard and Jan Mayen</option>
<option value="SE">Sweden</option>
<option value="CH">Switzerland</option>
<option value="SY">Syrian Arab Republic</option>
<option value="TW">Taiwan</option>
<option value="TJ">Tajikistan</option>
<option value="TZ">Tanzania, United Republic of</option>
<option value="TH">Thailand</option>
<option value="TL">Timor-Leste</option>
<option value="TG">Togo</option>
<option value="TK">Tokelau</option>
<option value="TO">Tonga</option>
<option value="TT">Trinidad and Tobago</option>
<option value="TN">Tunisia</option>
<option value="TR">Türkiye</option>
<option value="TM">Turkmenistan</option>
<option value="TC">Turks and Caicos Islands</option>
<option value="TV">Tuvalu</option>
<option value="UG">Uganda</option>
<option value="UA">Ukraine</option>
<option value="AE">United Arab Emirates</option>
<option value="GB">United Kingdom</option>
<option value="US">United States</option>
<option value="UM">United States Minor Outlying Islands</option>
<option value="UY">Uruguay</option>
<option value="UZ">Uzbekistan</option>
<option value="VU">Vanuatu</option>
<option value="VE">Venezuela</option>
<option value="VN">Vietnam</option>
<option value="VG">Virgin Islands, British</option>
<option value="VI">Virgin Islands, U.S.</option>
<option value="WF">Wallis and Futuna</option>
<option value="PS">West Bank and Gaza Strip</option>
<option value="EH">Western Sahara</option>
<option value="YE">Yemen</option>
<option value="ZM">Zambia</option>
<option value="ZW">Zimbabwe</option>
	`;

    const initConfirmation = () => {
        utils
            .waitUntil(() => document.querySelector('h2:not(.widget-header),h3:not(.widget-header)') && document.querySelector(`.subjectInterestsWidget`), 0)
            .then(() => {
                document.body.classList.add(`${tag}__confirmation-page`);
                const element = document.querySelector('h2:not(.widget-header),h3:not(.widget-header)');
                element.parentElement.innerHTML = `
				<div class='${tag}-container'>
					<h1>Thank you! <br>Your registration is now complete</h1>
					<p>Review <a href='https://www.tandfonline.com/action/showPreferences'>your account setting</a>. If you registered while purchasing an item, you may <a href='https://www.tandfonline.com/action/showCart'>return to your cart.</a></p>
					<p class="${tag}__step-indicator">Step 1 of 2</p>
                    <div class='${tag}__content-wrap'>
						<div class="${tag}__step-1 ${tag}-active">
							<h3>Complete your profile</h3>
							<p>Help us personalise your experience</p>
							<div class="${tag}__form-container">
								<div class="${tag}__input-group">
									<label for="${tag}__country">Country/Region</label>
									<div class="${tag}__select-wrapper">
										<select id="${tag}__country" name="${tag}__country">
											${countryList}
										</select>
									</div>
								</div>
								<div class="${tag}__input-group">
									<label for="${tag}__region">County/State/Province</label>
									<input type="text" id="${tag}__region" placeholder="Enter your county, state, or province">
								</div>
								<div class="${tag}__input-group">
									<label for="${tag}__organization">Organization</label>
									<div class="${tag}__icon-input-wrapper">
										<input type="text" id="${tag}__organization" placeholder="Enter your organization name">
									</div>
								</div>
							</div>
							<a class='btn ${tag}__next' tabindex='0' role='button'>Next</a>
						</div>
						<div class="${tag}__step-2">
							<h3>Select subjects of interest</h3>
							<p>To help us provide you with a tailored experience, choose your subjects of interest below.</p>
							<div class='${tag}-subjects-overlay-mobile'></div>
							<div class='${tag}-outer-subjects'>
								<div class='${tag}-subjects-overlay-desktop'></div>
								<div class='${tag}-subjects'>
									${subjects.map(item => {
                    return `
											<div class='${tag}-subject' tabindex='0' role='button' aria-pressed='false'>
												${item}
											</div>
										`;
                }).join('')}
								</div>
							</div>
							<a href='/' class='btn ${tag}-subject-submit'>Submit and go to homepage</a>
							<a class='${tag}__back' tabindex='0' role='button'>Back</a>
						</div>
					</div>
				</div>
			`;

                if (utils.getCookie(`${tag}__country-select`) !== null) {
                    document.querySelector(`#${tag}__country`).value = utils.getCookie(`${tag}__country-select`);
                }

                // Clicks on subjects
                const events = ['click', 'keypress'];

                events.forEach(event => {
                    document
                        .querySelectorAll(`.${tag}-subject`)
                        .forEach(element => {
                            element.addEventListener(event, () => {
                                element.classList.toggle(`${tag}-active`);

                                element.getAttribute('aria-pressed') === 'false'
                                    ? element.setAttribute('aria-pressed', 'true')
                                    : element.setAttribute('aria-pressed', 'false');

                                if (element.classList.contains(`${tag}-active`))
                                    Kameleoon.API.Goals.processConversion(406610);
                            });
                        });

                    document.querySelector(`.${tag}__next`).addEventListener(event, () => {
                        document.querySelector(`.${tag}__step-1`).classList.remove(`${tag}-active`);
                        document.querySelector(`.${tag}__step-2`).classList.add(`${tag}-active`);
                        document.querySelector(`.${tag}__step-indicator`).textContent = "Step 2 of 2";
                        Kameleoon.API.Goals.processConversion(406613);
                    })

                    document.querySelector(`.${tag}__back`).addEventListener(event, () => {
                        document.querySelector(`.${tag}__step-2`).classList.remove(`${tag}-active`);
                        document.querySelector(`.${tag}__step-1`).classList.add(`${tag}-active`);
                        document.querySelector(`.${tag}__step-indicator`).textContent = "Step 1 of 2";
                        Kameleoon.API.Goals.processConversion(406614);
                    })
                });

                // Subject container scroll
                const subjectContainer = document.querySelector(`.${tag}-subjects`);
                const subjectOverlayDesktop = document.querySelector(`.${tag}-subjects-overlay-desktop`);
                const subjectOverlayMobile = document.querySelector(`.${tag}-subjects-overlay-mobile`);
                const subjectOuter = document.querySelector(`.${tag}-outer-subjects`);

                subjectContainer.addEventListener('scroll', () => {
                    const percentScrolledTop = Math.round(subjectContainer.scrollTop / (subjectContainer.scrollHeight - subjectContainer.clientHeight) * 100);

                    percentScrolledTop > 95
                        ? subjectOverlayDesktop.style.opacity = 0
                        : subjectOverlayDesktop.style.opacity = 1;
                });

                subjectOuter.addEventListener('scroll', () => {
                    const percentScrolledLeft = Math.round(100 * subjectOuter.scrollLeft / (subjectOuter.scrollWidth - subjectOuter.clientWidth));

                    percentScrolledLeft > 95
                        ? subjectOverlayMobile.style.opacity = 0
                        : subjectOverlayMobile.style.opacity = 1;
                });
            });
    }

    utils.init();

})(window);