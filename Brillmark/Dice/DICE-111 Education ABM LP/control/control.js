(function(){
    const addJsToPage = (src, id, cb, classes) => {
        if (document.querySelector(`#${id}`)) { return; }
        const s = document.createElement('script');
        if (typeof cb === 'function') { s.onload = cb; }
        if (classes) { s.className = classes; }
        s.type = 'text/javascript';
        s.src = src;
        s.setAttribute('id', id);
        document.body.appendChild(s);
    };
    
    const waitForElement = (selector, trigger) =>{
          var interval = setInterval(function () {
            if (
              document &&
              document.querySelector(selector) &&
              document.querySelectorAll(selector).length > 0
            ) {
              clearInterval(interval);
              trigger();
            }
          }, 50);
          setTimeout(function () {
            clearInterval(interval);
          }, 15000);
        };
    
    waitForElement('body',function(){
        addJsToPage('//app-sjg.marketo.com/js/forms2/js/forms2.min.js', 'mkto');
        addJsToPage('https://fe-test-dev.s3.amazonaws.com/Dice/dice-109/code/dhi_marketo_2_step_form.js', 'mkto-add');
    })    
})();    

(function () {
    'use strict';
    var shared = {
        ID: "fe-education",
        VARIATION: "1",
        CLIENT: "Dice",
        FORMURL: "//app-sjg.marketo.com",
        FORMCODE: "318-VQK-428",
        FORMID: "4587",
        TYURL: "/hiring/contact-us/thank-you"
    };
    var step = 1;
    var isEmailValid = false;
    var isFirstNameValid = false;
    var isLastNameValid = false;
    const modifyForm = {
        addClass: function (formLabel) {
            for (var i = 0; i < formLabel.length; i++) {
                if (i <= 2) {
                    formLabel[i].closest(".mktoFormRow").classList.add("fe_step1");
                    formLabel[i].closest(".mktoFormRow").classList.add("fe_show");
                } else {
                    formLabel[i].closest(".mktoFormRow").classList.add("fe_step2");
                }
            }
        },
        removeError: function (formRow) {
            setTimeout(() => {
                for (var i = 0; i < formRow.length; i++) {
                    if (formRow[i].querySelector(".mktoError") != null) {
                        formRow[i].querySelector(".mktoError").remove();
                        formRow[i].querySelector("input").blur();
                    }
                }
            }, 20);
        },
        changeButtonText: function () {
            var btn = document.querySelector("form button[type='submit']");
            if (step === 1) {
                btn.textContent = "Continue";
            } else {
                btn.textContent = "Submit";
            }
        },
        showSecondStep: function (formLabel) {
            for (var i = 0; i < formLabel.length; i++) {
                var field = formLabel[i].closest(".mktoFormRow");
                if (field.classList.contains("fe_step1")) {
                    field.classList.remove("fe_show");
                } else {
                    field.classList.add("fe_show");
                    document.querySelector('.mktoForm').classList.add('fe-form-step2');
                    if (document.querySelector('.mktoForm').classList.contains('fe-form-step1')) {
                        document.querySelector('.mktoForm').classList.remove('fe-form-step1');
                    }
                }
            }
        },
        checkFieldValidate: function (steps) {
            for (var i = 0; i < steps.length; i++) {
                var input = steps[i].querySelector("input");
                if (input.classList.contains("mktoInvalid") || input.value.length === 0) {
                    return false;
                }
            }
            return true;
        },
        triggerNextStep: function (steps, formRow, formLabel) {
            setTimeout(function () {
                var isValid = modifyForm.checkFieldValidate(steps);
                if (isValid && step === 1 && isFirstNameValid && isEmailValid && isLastNameValid) {
                    modifyForm.removeError(formRow);
                    modifyForm.showSecondStep(formLabel);
                    step++;
                    modifyForm.changeButtonText();
                    document.querySelector('.hero-wrap .step-wrap .current-step').innerHTML = step;
                }
            }, 50);
        },
        triggerBackStep: function (steps, formLabel) {
            setTimeout(function () {
                step--;
                document.querySelector('.hero-wrap .step-wrap .current-step').innerHTML = step;
                for (var i = 0; i < formLabel.length; i++) {
                    var field = formLabel[i].closest(".mktoFormRow");
                    if (field.classList.contains("fe_step2")) {
                        field.classList.remove("fe_show");
                    } else {
                        field.classList.add("fe_show");
                        document.querySelector('.mktoForm').classList.add('fe-form-step1');
                        if (document.querySelector('.mktoForm').classList.contains('fe-form-step2')) {
                            document.querySelector('.mktoForm').classList.remove('fe-form-step2');
                        }
                    }
                }
                trackGAEvents('click', 'Back_button');
            }, 50);
        },
        validateEmail: function (form) {
            var emailElem = form.getFormElem().find("#Email");
            var excludeEmail = ["gmail", "yahoo", "hotmail", "aol", "me", "icloud", "comcast", "msn", "att", "ios", "outlook", "inbox", "mail", "hotmail", "live", "verizon", "bellsouth", "charter", "earthlink", "mac", "cox", "email", "cloudassociates", "ril", "work", "w", "gmai", "microsoft", "ail", "suddenlink", "ymail", "asdasd", "abc", "ya", "yah", "ccb", "aa", "aim"];
            var vals = form.vals();
            var str = vals.Email.split("@").pop();
            var domain = str.slice(0, str.indexOf("."));
            if (excludeEmail.indexOf(domain.toLowerCase()) != -1 || !validateEmail(vals.Email)) {
                if (emailElem.hasClass('mktoValid')) {
                    emailElem.removeClass('mktoValid').addClass('mktoInvalid');
                }
                form.showErrorMessage("Must be valid work email. example@yourdomain.com", emailElem);
                isEmailValid = false;
            } else {
                isEmailValid = true;
            }
        },
        validateFirstName: function (form) {
            var firstName = form.getFormElem().find("#FirstName");
            var vals = form.vals();
            var str = vals.FirstName;
            str = String(str);
            str = str.split('');
            if (str && str.length < 1) {
                if (firstName.hasClass('mktoValid')) {
                    firstName.removeClass('mktoValid').addClass('mktoInvalid');
                }
                form.showErrorMessage("This field is required.", firstName);
                isFirstNameValid = false;
            } else {
                isFirstNameValid = true;
            }
        },
        validateLastName: function (form) {
            var lastName = form.getFormElem().find("#LastName");
            var vals = form.vals();
            var str = vals.LastName;
            str = String(str);
            str = str.split('');
            if (isFirstNameValid) {
                if (str && str.length == 1) {
                    if (lastName.hasClass('mktoValid')) {
                        lastName.removeClass('mktoValid').addClass('mktoInvalid');
                    }
                    form.showErrorMessage("Must be a valid last name.", lastName);
                    isLastNameValid = false;
                } else if (str && str.length < 1) {
                    if (lastName.hasClass('mktoValid')) {
                        lastName.removeClass('mktoValid').addClass('mktoInvalid');
                    }
                    form.showErrorMessage("This field is required.", lastName);
                    isLastNameValid = false;
                } else {
                    isLastNameValid = true;
                }
            }
        },
    };
    const addFileToSite = (filePath) => {
        const fileExtension = filePath.slice(filePath.lastIndexOf('.') + 1);
        if (!['js', 'css'].includes(fileExtension)) {
            console.error(`Error: unsupported file type for file path ${filePath}`);
            return;
        }
        const fileElement = fileExtension === 'js' ? document.createElement('script') : document.createElement('link');
        if (fileExtension === 'js') {
            fileElement.src = filePath;
            fileElement.type = 'module';
        } else {
            fileElement.rel = 'stylesheet';
            fileElement.type = 'text/css';
            fileElement.href = filePath;
        }
        fileElement.onerror = () => { console.error(`Error loading file: ${filePath}`); };
        document.head.appendChild(fileElement);
    };
    const pollerLite = (conditions, callback, maxTime = 10000) => {
        const POLLING_INTERVAL = 25;
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
                console.error('Polling exceeded maximum time limit');
            }
        }, POLLING_INTERVAL);
    };
    const addInputName = (selector) => {
        document.querySelectorAll(selector).forEach((ele) => {
            ele.removeAttribute("input-name");
            if (ele.querySelector('input, select, textarea')) {
                var currentID = ele.querySelector('input, select, textarea').getAttribute('name');
                ele.setAttribute('input-name', 'parent-' + currentID);
            } else { ele.setAttribute('input-name', 'parent-noinput'); }
        });
    };
    const updateFormField = (selector) => {
        document.querySelectorAll(selector).forEach((ele) => {
            if (ele.querySelector('input, select, textarea')) {
                var currentName = ele.querySelector('input, select').getAttribute('name');
                if (currentName == 'FirstName') { currentName = 'First Name'; }
                if (currentName == 'LastName') { currentName = 'Last Name'; }
                if (currentName == 'Email') { currentName = 'Email Address'; }
                if (currentName == 'Phone') { currentName = 'Phone Number'; }
                if (ele.querySelector('label')) { ele.querySelector('label').innerHTML = currentName + ' <div class="mktoAsterix">*</div>'; }
                ele.querySelector('input, select').setAttribute('placeholder', currentName);
            }
        });
    };
    const validateEmail = (email) => {
        var re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const secondaryCta = (text, link = '#') => {
        return `<dhi-seds-core-button class="section-secondary-cta" prominence="secondary" sentiment="danger" url="${link}">${text}</dhi-seds-core-button>`;
    };
    const sectionTitle = (id, title) => {
        return `<dhi-seds-row class="${id}__sectiontitle"><dhi-seds-column size="12"><dhi-seds-typography-heading class="desktop-hide" size="200" weight="bold">${title}</dhi-seds-typography-heading><dhi-seds-typography-heading class="desktop-show" size="250" weight="bold">${title}</dhi-seds-typography-heading></dhi-seds-column></dhi-seds-row>`;
    };
    const trackGAEvents = (action, label) => {
        pollerLite([() => typeof window.ga.getAll === 'function'], () => {
            window.ga.getAll().forEach((tracker) => {
                tracker.send('event', {
                    eventCategory: 'funnelenvy',
                    eventAction: action,
                    eventLabel: label
                });
            });
        });
    };
    const setup = () => {
        const { ID, VARIATION } = shared;
        document.documentElement.classList.add(ID);
        document.documentElement.classList.add(`${ID}-${VARIATION}`);
    };
    const heroSection = (id) => {
        const { FORMID } = shared;
        const heroSectionData = [{
            imgSrc: 'https://fe-test-dev.s3.amazonaws.com/Dice/dice-109/bank-of-america.png',
            altText: 'Bank of America'
        }, {
            imgSrc: 'https://fe-test-dev.s3.amazonaws.com/Dice/dice-109/state-farm.png',
            altText: 'State Farm'
        }, {
            imgSrc: 'https://fe-test-dev.s3.amazonaws.com/Dice/dice-109/capital-one.png',
            altText: 'Capital One'
        }, {
            imgSrc: 'https://fe-test-dev.s3.amazonaws.com/Dice/dice-109/pnc.png',
            altText: 'PNC'
        }, {
            imgSrc: 'https://fe-test-dev.s3.amazonaws.com/Dice/dice-109/northwestern-mutual.png',
            altText: 'Northwestern Mutual'
        }];
        const singleLogoHtml = ({ imgSrc, altText }, index) => `<div class="logo-item item-${index + 1}"><img src="${imgSrc}" alt="${altText}"></div>`;
        const heroHtml = `
        <div class="${id}__herosection ${id}__section"><dhi-seds-container><dhi-seds-row class="header-wrap"><dhi-seds-column size="5" size-lg="10"><dhi-seds-link url="/hiring"><dhi-seds-dice-logo prominence="primary"></dhi-seds-dice-logo></dhi-seds-link></dhi-seds-column><dhi-seds-column class="section-cta" size="7" size-lg="2">${secondaryCta('Get Started', 'javascript:void(0)')}</dhi-seds-column></dhi-seds-row><dhi-seds-row class="hero-wrap"><dhi-seds-column size="12" size-lg="7"><dhi-seds-row><dhi-seds-column size="12" size-lg="12"><dhi-seds-typography-display level="h1" class="desktop-show" size="350" weight="bold">Hire A+ tech talent</dhi-seds-typography-display><dhi-seds-typography-display level="h1" class="desktop-hide" size="300" weight="bold">Hire A+ tech talent</dhi-seds-typography-display></dhi-seds-column></dhi-seds-row><dhi-seds-row><dhi-seds-column size="12"><dhi-seds-typography-heading class="desktop-show sub-title" size="175" weight="regular" margin="default">With millions of tech professionals and the AI-powered recruiting tools to connect with the ones right for you, Dice is the platform you need to elevate your institution.</dhi-seds-typography-heading><dhi-seds-typography-heading class="desktop-hide sub-title" size="150" weight="regular" margin="default">With millions of tech professionals and the AI-powered recruiting tools to connect with the ones right for you, Dice is the platform you need to elevate your institution.</dhi-seds-typography-heading></dhi-seds-column></dhi-seds-row><dhi-seds-row><dhi-seds-column size="12"><dhi-seds-typography-heading class="logo-title" size="150" weight="bold" margin="default"></dhi-seds-typography-heading>
        </dhi-seds-column></dhi-seds-row></dhi-seds-column><dhi-seds-column class="hero-form marketo-form" size="12" size-lg="5"><div class="multi-step-bm-form-heading"><div class="multi-step-step-sections-bar"><span class="multi-step-step1">1</span><span class="multi-step-step2">2</span><span class="multi-step-progressBar"></span></div></div><form id="mktoForm_${FORMID}"><div class="form-title">Start finding top tech talent!</div><div class="step-wrap">Step <span class="current-step">1</span> of 2</div><div id="disclaimer_${FORMID}" class="disclaimer text-muted text-center mt-4 multi-step-hide"><p>By submitting information I agree to the <a href="/about/privacy-policy" target="_blank">Privacy Policy</a>and <a href="/about/terms-and-conditions" target="_blank">Terms of Use</a>.</p></div></form></dhi-seds-column></dhi-seds-row></dhi-seds-container></div>`;
        return heroHtml;
    };
    const { ID } = shared;
    var activate = () => {
        setup();
        const header = document.querySelector('dhi-seds-nav-header-employer');
        const landingpage = (id) => `<div class="${id}__landingpage container">${heroSection(id)}</div>`;
        if (document.querySelector(`.${ID}__landingpage`)) return;
        header.insertAdjacentHTML('afterend', landingpage(ID));
        const formLoad = () => {
            const { FORMURL, FORMCODE, FORMID, TYURL } = shared;
            dhi.marketo2.init(`${FORMID}`, `${FORMCODE}`, `${TYURL}`, "Continue", "FirstName, LastName, Email", "Get In Touch", "Phone, Company");
            MktoForms2.whenReady((form) => {
                updateFormField('.hero-wrap .mktoForm .mktoFormRow');
                addInputName('.hero-wrap .mktoForm .mktoFormRow');
                var formLabel = document.querySelectorAll(".hero-wrap form[id*='mktoForm'] .mktoFormRow label");
                var steps = document.querySelectorAll(".hero-wrap form[id*='mktoForm'] .mktoFormRow.fe_show");
                var formRow = document.querySelectorAll(".hero-wrap form[id*='mktoForm'] .mktoFormRow");
                document.querySelector('.mktoButtonWrap > button').insertAdjacentHTML('afterend', '<p class="fe-back-button"><img src="https://fe-test-dev.s3.amazonaws.com/Dice/dice-109/arrow-left.svg" alt="Back Arrow"> Back</p>');
                document.querySelector('.mktoForm').classList.add('fe-form-step1');
                modifyForm.addClass(formLabel);
                document.querySelector('.mktoButtonWrap > #tempStep1Btn').addEventListener('click', () => {
                    setTimeout(() => {
                        modifyForm.validateEmail(form);
                        modifyForm.validateFirstName(form);
                        modifyForm.validateLastName(form);
                        modifyForm.triggerNextStep(steps, formRow, formLabel);
                    }, 500);
                });
                document.querySelector('.mktoButtonWrap > .fe-back-button').addEventListener('click', () => {
                    setTimeout(() => {
                        modifyForm.triggerBackStep(steps, formLabel);
                        if (document.querySelector('#FE-Form-Validator__tempStep1Btn').classList.contains('FE-Form-Validator__hide')) { document.querySelector('#FE-Form-Validator__tempStep1Btn').classList.remove('FE-Form-Validator__hide'); }
                        document.querySelector('body').classList.add('FE-Form-Validator__step1');
                        if (document.querySelector('body').classList.contains('FE-Form-Validator__step2')) { document.querySelector('body').classList.remove('FE-Form-Validator__step2'); }
                    }, 500);
                });
                document.querySelector('.hero-wrap .hero-form').classList.add('load');
            });
        };
        formLoad();
    };
    if (window.location.pathname.includes('/hiring/education')) {
        const mainLayoutSelector = '.layout-main-content-wrapper';
        const cssFile = 'https://seds.prod.design-prod.dhiaws.com/dhi-snake-eyes@0.14.2/dist/dhi-snake-eyes/dhi-snake-eyes.css';
        const jsFile = 'https://seds.prod.design-prod.dhiaws.com/dhi-snake-eyes@0.14.2/dist/dhi-snake-eyes/dhi-snake-eyes.esm.js';
        const mktocssFile = 'https://app-sjg.marketo.com/js/forms2/css/forms2.css';
        const mktothemecssFile = 'https://app-sjg.marketo.com/js/forms2/css/forms2-theme-simple.css';
        const metaNoIndex = document.querySelector('meta[content="noindex"]');
        metaNoIndex?.remove();
        addFileToSite(jsFile);
        addFileToSite(cssFile);
        addFileToSite(mktocssFile);
        addFileToSite(mktothemecssFile);
        pollerLite([mainLayoutSelector, () => typeof window.dhi != "undefined" && typeof window.MktoForms2 != "undefined"], activate);
    }
})();

(function () {
    'use strict';
    var shared = {
        ID: "fe-education",
        VARIATION: "1",
        CLIENT: "Dice",
        VIDEOLINK: "https://www.youtube.com/embed/P6H1o4OIB88"
    };
    const { ID } = shared;
    const heroSelector = '.fe-education__herosection';
    const arrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.6893 5.93934C16.2751 5.35355 17.2249 5.35355 17.8107 5.93934L26.8107 14.9393C27.3964 15.5251 27.3964 16.4749 26.8107 17.0607L17.8107 26.0607C17.2249 26.6464 16.2751 26.6464 15.6893 26.0607C15.1036 25.4749 15.1036 24.5251 15.6893 23.9393L22.1287 17.5H6.25C5.42157 17.5 4.75 16.8284 4.75 16C4.75 15.1716 5.42157 14.5 6.25 14.5H22.1287L15.6893 8.06066C15.1036 7.47487 15.1036 6.52513 15.6893 5.93934Z" fill="#4D7880"/></svg>`;
    const bulletIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="26" viewBox="0 0 48 26" fill="none"><path d="M5.13 0.910156L0 25.0902H9.93L15.06 0.910156H5.13Z" fill="#CC0000"/><path d="M21.1901 0.910156L16.0601 25.0902H25.9901L31.1201 0.910156H21.1901Z" fill="#1C4A50"/><path d="M37.2501 0.910156L32.1201 25.0902H42.0501L47.1801 0.910156H37.2501Z" fill="#BFD3D7"/></svg>`;
    const heartIcon = `<svg class="heart-logo" xmlns="http://www.w3.org/2000/svg" width="65" height="35" viewBox="0 0 65 35" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M60.7215 0H9.85604C8.85379 0.000167147 7.89264 0.396343 7.18395 1.10141C6.47525 1.80647 6.07704 2.7627 6.07687 3.75981L6.07053 26.9188C6.07497 26.9522 6.07687 26.985 6.07687 27.0184C6.07687 30.4271 3.69556 33.2835 0.5 34.0426H60.7215C61.7237 34.0421 62.6846 33.6457 63.3932 32.9405C64.1017 32.2354 64.4998 31.2792 64.5 30.2821V3.75981C64.4998 2.76281 64.1017 1.80668 63.3931 1.10163C62.6846 0.396583 61.7236 0.00033427 60.7215 0Z" fill="#BE3432"/><path d="M42.2216 9.50953C38.3641 5.87067 33.8571 10.8091 33.8571 10.8091C33.8571 10.8091 29.3502 5.87067 25.4927 9.50953C19.9918 14.7079 27.9922 24.065 33.8571 25.874C39.7221 24.013 47.7421 14.7079 42.2216 9.50953Z" fill="white"/></svg>`;
    const pollerLite = (conditions, callback, maxTime = 10000) => {
        const POLLING_INTERVAL = 25;
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
                console.error('Polling exceeded maximum time limit');
            }
        }, POLLING_INTERVAL);
    };
    const changeCssProperty = (shadowRoot, selector, property, value) => {
        const element = shadowRoot.querySelector(selector);
        if (element) { element.style.setProperty(property, value); }
    };
    const trackGAEvents = (action, label) => {
        pollerLite([() => typeof window.ga.getAll === 'function'], () => {
            window.ga.getAll().forEach((tracker) => {
                tracker.send('event', {
                    eventCategory: 'funnelenvy',
                    eventAction: action,
                    eventLabel: label
                });
            });
        });
    };
    const primaryCta = (text, link = '#') => {
        return `<dhi-seds-core-button class="section-cta" prominence="primary" sentiment="danger" url="${link}">${text}</dhi-seds-core-button>`;
    };
    const secondaryCta = (text, link = '#') => {
        return `<dhi-seds-core-button class="section-secondary-cta" prominence="secondary" sentiment="danger" url="${link}">${text}</dhi-seds-core-button>`;
    };
    const sectionTitle = (id, title) => {
        return `<dhi-seds-row class="${id}__sectiontitle"><dhi-seds-column size="12"><dhi-seds-typography-heading class="desktop-hide" size="200" weight="bold">${title}</dhi-seds-typography-heading><dhi-seds-typography-heading class="desktop-show" size="250" weight="bold">${title}</dhi-seds-typography-heading></dhi-seds-column></dhi-seds-row>`;
    };
    const ourFinanceSection = (id) => {
        const ourFinanceSectionData = [{
            title: 'Tech talent for a changing industry',
            details: 'Remote learning. Digital transitions. Shifting demand. Get the tech professional talent you need to propel your team and evolve your institution.'
        },
        {
            title: 'Branding tools to highlight your unique culture',
            details: 'Dice’s employer branding tools let you showcase your culture and cutting-edge jobs.'
        },
        {
            title: 'Matches made for your open roles',
            details: 'Filter by factors like desired salary and "likely to switch” to help you find the right people, every time.'
        }
        ];
        const singleListHtml = ({ title, details }, index) => `<dhi-seds-column size="12" class="bullet-points"><dhi-seds-row><dhi-seds-typography-heading level="h3" size="150" weight="bold"><span>${arrowIcon}</span>${title}</dhi-seds-typography-heading></dhi-seds-row><dhi-seds-row><dhi-seds-typography-heading size="125" weight="regular">${details}</dhi-seds-typography-heading></dhi-seds-row></dhi-seds-column>`;
        const ourFinanceHtml = `<div class="${id}__ourfinancesection ${id}__section"><dhi-seds-container>${sectionTitle(id, 'What our education clients get with Dice')}
        <dhi-seds-row class="content-wrap"><dhi-seds-column size="0" size-lg="2"></dhi-seds-column><dhi-seds-column size="12" size-lg="6">${ourFinanceSectionData.map((data, i) => singleListHtml(data, i)).join('\n')}
        </dhi-seds-column><dhi-seds-column size="12" size-lg="2"><div class="result-wrap"><div class="apply-rate"><dhi-seds-typography-display class="apply-rate-count count" size="400" weight="bold">19%</dhi-seds-typography-display><dhi-seds-typography-heading class="apply-rate-text text" size="150" weight="regular">Apply Rate</dhi-seds-typography-heading></div><div class="divider"></div><div class="applicants-per-job"><dhi-seds-typography-display class="applicants-per-job-count count" size="400" weight="bold">9+</dhi-seds-typography-display><dhi-seds-typography-heading class="applicants-per-job-text text" size="150" weight="regular">Applications <br>Per Job</dhi-seds-typography-heading></div></div></dhi-seds-column><dhi-seds-column size="0" size-lg="2"></dhi-seds-column></dhi-seds-row></dhi-seds-container></div>`;
        return ourFinanceHtml;
    };
    const reviewSection = (id) => {
        const reviewHtml = `<div class="${id}__revsection ${id}__section ${id}__full-bleed"><dhi-seds-container><dhi-seds-row><dhi-seds-column size="12">${heartIcon}
        <dhi-seds-typography-heading class="title-container" size="150" weight="bold">“We have partnered extremely closely with Dice to capitalize on our brand presence. There aren’t a lot of solutions in the marketplace focusing on tech talent and for us Dice continues to be a leading solution for us to get in front of the right talent.”
        </dhi-seds-typography-heading><dhi-seds-typography-heading class="title-container sub-title" size="150" weight="regular">BNY Mellon
        </dhi-seds-typography-heading></dhi-seds-column></dhi-seds-row></dhi-seds-container></div>`;
        return reviewHtml;
    };
    const whyChooseSection = (id) => {
        const whyChooseSectionData = [
            {
                imgSrc: 'https://fe-test-dev.s3.amazonaws.com/Dice/dice-109/we-know-tech.png',
                altText: 'We know tech',
                title: 'We know tech — and the people <br>who make it possible',
                content: 'Hundreds of thousands of tech professionals skilled in areas like computer science, information technology and data analysis rely on Dice to find their next job.',
            },
            {
                imgSrc: 'https://fe-test-dev.s3.amazonaws.com/Dice/dice-109/you-wont-loose-candidates.png',
                altText: 'You wont loose candidates',
                title: 'You won’t lose candidates to a <br>long application process',
                content: 'Dice\'s Easy Apply lets tech professionals apply to your jobs in just a few clicks.',
            },
            {
                imgSrc: 'https://fe-test-dev.s3.amazonaws.com/Dice/dice-109/you-can-post-jobs.png',
                altText: 'You can post jobs',
                title: 'You can post jobs <br>without extra fees',
                content: 'You don\'t pay for applications or views. Simply post your jobs and review all qualified candidates.',
            },
            {
                imgSrc: 'https://fe-test-dev.s3.amazonaws.com/Dice/dice-109/we-take-sourcing.png',
                altText: 'We take sourcing',
                title: 'We take sourcing and <br>screening off your plate',
                title: 'We take sourcing and <br>screening off your plate',
                content: 'You’ll work with a dedicated team who will source and screen candidates. All you have to do is hire.',
            },
        ];
        const singleTechHtml = ({ imgSrc, altText, title, content }, index) => `<dhi-seds-column size="12" size-lg="6"><img class="tech-img" src="${imgSrc}" alt="${altText}"><div class="tech-content"><dhi-seds-typography-heading level="h3" class="title-container desktop-show hydrated" size="200" weight="bold">${title}</dhi-seds-typography-heading><dhi-seds-typography-heading level="h3" class="title-container desktop-hide hydrated" size="150" weight="bold">${title}</dhi-seds-typography-heading><dhi-seds-typography-heading size="125" weight="regular" class="hydrated">${content}</dhi-seds-typography-heading></div></dhi-seds-column>`;
        const whyChooseHtml = `<div class="${id}__whychoosesection ${id}__section ${id}__full-bleed"><dhi-seds-container><dhi-seds-row><dhi-seds-column size="12" size-lg="12"><dhi-seds-row class="fe-education__sectiontitle"><dhi-seds-column size="12"><dhi-seds-typography-heading class="desktop-hide" size="200" weight="bold">Why you should choose Dice as your tech hiring partner</dhi-seds-typography-heading><dhi-seds-typography-display class="desktop-show" size="300" weight="bold">Why you should choose Dice as your tech hiring partner</dhi-seds-typography-display></dhi-seds-column></dhi-seds-row></dhi-seds-column></dhi-seds-row><dhi-seds-row class="content-wrap">${whyChooseSectionData.map((data, i) => singleTechHtml(data, i)).join('\n')}</dhi-seds-row><dhi-seds-row class="btn-wrap">${primaryCta('Try Dice Today', 'javascript:void(0)')}</dhi-seds-row></dhi-seds-container></div>`;
        return whyChooseHtml;
    };
    const solutionsSection = (id) => {
        const { VIDEOLINK } = shared;
        const solutionsSectionData = [{
            title: 'Elevate your posts',
            details: 'Leverage our tech-focused AI to match your open roles with the most relevant candidates.'
        },
        {
            title: 'Source ideal talent',
            details: 'Gain access to thousands of EdTech professionals with complete profiles — and the tools to find which ones best fit your needs.'
        },
        {
            title: 'Network and connect',
            details: 'Dice’s career events can be tailored to your personal hiring needs so you can connect 1:1 with EdTech professionals searching for their next opportunity.'
        }
        ];
        const singleSolutionHtml = ({ title, details }) => `<dhi-seds-column size="12" class="bullet-points"><dhi-seds-row><dhi-seds-typography-heading level="h3" size="150" weight="bold"><span>${bulletIcon}</span>${title} </dhi-seds-typography-heading></dhi-seds-row><dhi-seds-row><dhi-seds-typography-heading size="125" weight="regular">${details}</dhi-seds-typography-heading></dhi-seds-row></dhi-seds-column>`;
        const solutionsHtml = `<div class="${id}__solutionssection ${id}__section ${id}__full-bleed"><dhi-seds-container>${sectionTitle(id, 'Solutions tailor-made to your hiring needs')}
        <dhi-seds-row class="md-col-rev"><dhi-seds-column size="12" size-lg="6">${solutionsSectionData.map((data) => singleSolutionHtml(data)).join('\n')}
        </dhi-seds-column><dhi-seds-column class="add-frame" size="12" size-lg="6"><iframe src="${VIDEOLINK}" title="YouTube video player" autoplay clipboard-write encrypted-media gyroscope picture-in-picture web-share allowfullscreen></iframe></div></dhi-seds-column></dhi-seds-row></dhi-seds-container></div>`;
        return solutionsHtml;
    };
    const getStartSection = (id) => {
        const getStartHtml = `<div class="${id}__getstartsection ${id}__section ${id}__full-bleed"><dhi-seds-container class="container"><dhi-seds-row class="md-col-rev"><dhi-seds-column size="12" size-lg="12"><dhi-seds-row class="fe-education__sectiontitle"><dhi-seds-column size="12"><dhi-seds-typography-heading size="200" weight="bold" margin="default">Ready to get started?</dhi-seds-typography-heading></dhi-seds-column></dhi-seds-row><dhi-seds-row><dhi-seds-column size="12"><dhi-seds-typography-heading class="sub-title" size="150" weight="regular" margin="default">We\'ll take it from here.</dhi-seds-typography-heading></dhi-seds-column></dhi-seds-row><dhi-seds-row><dhi-seds-column size="12" size-md="12">${secondaryCta('Hire With Dice', 'javascript:void(0)')}
        </dhi-seds-column></dhi-seds-row></dhi-seds-column></dhi-seds-row></dhi-seds-container></div>`;
        return getStartHtml;
    };
    const footerSection = (id) => {
        const footerSectionData = [{
            anchorText: 'Terms &amp; Conditions',
            anchorLink: '/about/terms-and-conditions'
        }, {
            anchorText: 'Privacy Policy',
            anchorLink: '/about/privacy-policy'
        }, {
            anchorText: 'Do Not Sell My Personal Information',
            anchorLink: '/about/ccpa#ccpa-form-anchor'
        }, {
            anchorText: 'CCPA',
            anchorLink: '/about/ccpa'
        }];
        const singleLinkHtml = ({ anchorText, anchorLink }, index) => `<dhi-seds-typography-paragraph class="list-item" size="75" weight="regular"><dhi-seds-link url="${anchorLink}">${anchorText}</dhi-seds-link></dhi-seds-typography-paragraph>`;
        const date = new Date();
        const currentYear = date.getFullYear();
        const footerHtml = `<div class="${id}__footersection ${id}__section"><dhi-seds-container><dhi-seds-row><dhi-seds-column size="0" size-lg="6"><dhi-seds-typography-paragraph class="copy-right" size="75" weight="regular">Copyright © 1990 - ${currentYear} Dice. All Rights Reserved. <dhi-seds-link url="http://dice.com">Dice</dhi-seds-link> is a <dhi-seds-link url="https://dhigroupinc.com">DHI service</dhi-seds-link>.</dhi-seds-typography-paragraph></dhi-seds-column><dhi-seds-column size="0" size-lg="6"><div class="list">${footerSectionData.map((data, i) => singleLinkHtml(data, i)).join('\n')}</div></dhi-seds-column></dhi-seds-row></dhi-seds-container></div>`;
        return footerHtml;
    }
    var activate2 = () => {
        const otherSections = (id) => `
			${ourFinanceSection(id)}
		    ${whyChooseSection(id)}
		    ${solutionsSection(id)}
		    ${getStartSection(id)}
		    ${footerSection(id)}`;
        document.querySelector(heroSelector).insertAdjacentHTML('afterend', otherSections(ID));
        const landingpageElement = document.querySelector(`.${ID}__landingpage`);
        const defaultBtn = landingpageElement.querySelectorAll('dhi-seds-core-button.section-cta');
        const defaultLink = landingpageElement.querySelectorAll('dhi-seds-link');
        const getShadowRoot = (element) => element.shadowRoot;
        defaultBtn.forEach((btn) => {
            pollerLite(
                [() => getShadowRoot(btn) !== null && getShadowRoot(btn).querySelector('a') !== null],
                () => {
                    changeCssProperty(btn.shadowRoot, 'a', 'background-color', '#CE2129');
                    changeCssProperty(btn.shadowRoot, 'a', 'box-shadow', 'inset 0 0 0 #CE2129');
                }
            );
        });
        defaultLink.forEach((link) => {
            pollerLite(
                [() => getShadowRoot(link) !== null && getShadowRoot(link).querySelector('a') !== null],
                () => { changeCssProperty(link.shadowRoot, 'a', 'color', '#FFFFFF'); }
            );
        });
        document.body.addEventListener('click', (e) => {
            const { target } = e;
            if (target.closest('dhi-seds-core-button') && target.hasAttribute('url')) {
                const targetUrl = target.getAttribute('url');
                const ctaText = target.closest('dhi-seds-core-button').textContent;
                const formElement = document.querySelector(".hero-form");
                formElement.scrollIntoView({ behavior: "smooth" });
                // window.location.pathname = targetUrl;
                // trackGAEvents('click', `${ctaText}`);
            }
        });

        document.body.style.opacity = 1;
    };
    pollerLite([heroSelector], activate2);
})();