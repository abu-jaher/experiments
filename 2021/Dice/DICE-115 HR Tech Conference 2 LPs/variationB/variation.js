(function () {
    try {
        /* main variables */
        var debug = 1;
        var variation_name = "test123";

        function waitForElement(selector, trigger, delayInterval, delayTimeout) {
            var interval = setInterval(function () {
                if (
                    document &&
                    document.querySelector(selector) &&
                    document.querySelectorAll(selector).length > 0 && window.dhi && dhi.marketo2 && dhi.marketo2.init
                ) {
                    clearInterval(interval);
                    trigger();
                }
            }, delayInterval);
            setTimeout(function () {
                clearInterval(interval);
            }, delayTimeout);
        }

        function waitforMarketo(trigger){
              var interval = setInterval(function() {
                if ( 
                  window.MktoForms2
                ) {
                  clearInterval(interval); 
                  trigger(); 
                }
              }, 50); 
              setTimeout(function() {
                clearInterval(interval);
              }, 10000);
            }

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
        addJsToPage('//app-sjg.marketo.com/js/forms2/js/forms2.min.js', 'mkto');
        addJsToPage('https://fe-test-dev.s3.amazonaws.com/Dice/dice-109/code/dhi_marketo_2_step_form.js', 'mkto-add');


        var shared = {
            ID: "fe-education",
            VARIATION: "1",
            CLIENT: "Dice",
            FORMURL: "//app-sjg.marketo.com",
            FORMCODE: "318-VQK-428",
            FORMID: "4656",
            TYURL: ""
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
                        document.querySelector('.form_wrap .step-wrap .current-step').innerHTML = step;
                    }
                }, 50);
            },
            triggerBackStep: function (steps, formLabel) {
                setTimeout(function () {
                    step--;
                    document.querySelector('.form_wrap .step-wrap .current-step').innerHTML = step;
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

        const generate_form_section = (id) => {
            const { FORMID } = shared;
    
            const fe_form_content = {
                title: 'Hiring for tech isn’t easy, but it can be easier. Find engineers, developers, analysts, technicians and more on Dice, the only career platform specializing in tech. ',
                subTitle: 'If you’re ready to learn more about our solutions, fill out the form and someone from our team will be in touch soon.',
            };
    
            const heroHtml =
                `<div class="fe_form_section container">
              <div>
                  <div class="form_wrap">
                      <div>
                        <div>
                            <div class="left_title">${fe_form_content.title}</div>
                        </div>
                        <div>
                            <div class="desktop-show left_sub_title">${fe_form_content.subTitle}</div>
                        </div>
                      </div>
                      <div class="hero-form marketo-form">
                          <div class="multi-step-bm-form-heading">
                              <div class="multi-step-step-sections-bar"><span class="multi-step-step1">1</span><span class="multi-step-step2">2</span><span class="multi-step-progressBar"></span></div>
                          </div>
                          <form id="mktoForm_${FORMID}">
                              <div class="form_title">We’re excited to help with your tech recruiting needs!</div>
                              <div class="step-wrap">Step <span class="current-step">1</span> of 2</div>
                              <div id="disclaimer_${FORMID}" class="disclaimer text-muted text-center mt-4 multi-step-hide">
                                  <p>By submitting information I agree to the <a href="/about/privacy-policy" target="_blank">Privacy Policy</a>and <a href="/about/terms-and-conditions" target="_blank">Terms of Use</a>.</p>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>`;
            return heroHtml;
        };

        const formLoad = () => {
            const { FORMURL, FORMCODE, FORMID, TYURL } = shared;
            dhi.marketo2.init(`${FORMID}`, `${FORMCODE}`, `${TYURL}`, "Continue", "FirstName, LastName, Email", "Submit", "Phone, Company");
            MktoForms2.whenReady((form) => {
                updateFormField('.form_wrap .mktoForm .mktoFormRow');
                addInputName('.form_wrap .mktoForm .mktoFormRow');
                var formLabel = document.querySelectorAll(".form_wrap form[id*='mktoForm'] .mktoFormRow label");
                var steps = document.querySelectorAll(".form_wrap form[id*='mktoForm'] .mktoFormRow.fe_show");
                var formRow = document.querySelectorAll(".form_wrap form[id*='mktoForm'] .mktoFormRow");

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
                document.querySelector('.form_wrap .hero-form').classList.add('load');
            });
        };
        

        const fe_employer_page = `
        <div class="fe_employer_page">
            ${generate_form_section()}
        </div>
      `;

        /* Variation Init */
        function init() {
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

            document.querySelector('.layout-main-content-wrapper').insertAdjacentHTML('beforeend', fe_employer_page);
            waitforMarketo(formLoad);

            // document.querySelector('.layout-main-content-wrapper').insertAdjacentHTML('beforeend', fe_employer_page);

        }


        waitForElement('.layout-main-content-wrapper', init, 50, 15000);

    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();