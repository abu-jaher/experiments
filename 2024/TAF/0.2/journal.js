((w) => {
    "use strict";

    const tag = 'cv-0-2';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 0.2 |') : () => { };

    const utils = {
        waitUntil: (condition, wait = 6000) => {
            return new Promise((resolve, reject) => {
                let stop = false;

                const timeout =
                    wait &&
                    setTimeout(() => {
                        stop = true;
                        reject(new Error('Timeout waiting for condition'));
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

        init: () => {
            try {
                utils.waitUntil(() => document.body, 0).then((docBody) => {
                    docBody.classList.add(tag);
                });
                initVariation();

                log('running v1');
            } catch (err) {
                log(err.message);
            }
        },
    }

    const cvSurveyModal = `
    <div class="${tag}__modal-overlay">
        <div class="${tag}__modal">
            <button class="${tag}__close-button">×</button>   
            <div class="${tag}__modal-body">        
                <h2 class="${tag}__modal-title">
                    Thank you for showing interest. This feature is not yet available on Taylor & Francis Online, but we are keen to hear your thoughts.
                </h2>
                <div class="${tag}__rating-question">
                    <p class="${tag}__question-text">
                        How useful would you find it to be able to save journals of interest to you? <span class="${tag}__error-msg">* (This field is required)</span>
                    </p>
                    <p class="${tag}__rating-subtitle">
                        (From 0 being 'Not important at all' to 4 being 'Absolutely essential')
                    </p>
                    
                    <div class="${tag}__rating-buttons">
                        <div class="${tag}__rating-group">
                            <input type="radio" name="rating" id="rating-0" value="0" class="${tag}__rating-input">
                            <label for="rating-0" class="${tag}__rating-label">
                                <div class="${tag}__rating-circle"></div>
                                <span class="${tag}__rating-number">0</span>
                            </label>
                        </div>
                        <div class="${tag}__rating-group">
                            <input type="radio" name="rating" id="rating-1" value="1" class="${tag}__rating-input">
                            <label for="rating-1" class="${tag}__rating-label">
                                <div class="${tag}__rating-circle"></div>
                                <span class="${tag}__rating-number">1</span>
                            </label>
                        </div>
                        <div class="${tag}__rating-group">
                            <input type="radio" name="rating" id="rating-2" value="2" class="${tag}__rating-input">
                            <label for="rating-2" class="${tag}__rating-label">
                                <div class="${tag}__rating-circle"></div>
                                <span class="${tag}__rating-number">2</span>
                            </label>
                        </div>
                        <div class="${tag}__rating-group">
                            <input type="radio" name="rating" id="rating-3" value="3" class="${tag}__rating-input">
                            <label for="rating-3" class="${tag}__rating-label">
                                <div class="${tag}__rating-circle"></div>
                                <span class="${tag}__rating-number">3</span>
                            </label>
                        </div>
                        <div class="${tag}__rating-group">
                            <input type="radio" name="rating" id="rating-4" value="4" class="${tag}__rating-input">
                            <label for="rating-4" class="${tag}__rating-label">
                                <div class="${tag}__rating-circle"></div>
                                <span class="${tag}__rating-number">4</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="${tag}__feedback-section">
                    <p class="${tag}__question-text">
                        How would you use this feature, and how would it help you with your work?
                    </p>
                    <textarea placeholder="Tell us more (optional)"></textarea>
                </div>
                <button class="${tag}__submit-button">Submit and close</button>
            </div>
            <div class="${tag}__success-msg">
                <p>Thank you for sharing your thoughts with us!</p>
            </div>
        </div>
    </div>`;

    const cvJournalCTAs = `
            <div class="${tag}__journal-ctas">
                <li class="${tag}__alert">
                    <a href="#">
                        <i class="fa fa-solid fa-bell" aria-hidden="true"></i>
                        Sign up to alert
                    </a>
                </li>            
                <li class="${tag}__favorite">
                    <a href="#">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        Add to favorites
                    </a>
                </li>
            </div>`;

    const initVariation = () => {
        utils.waitUntil(() => document.querySelector('body'), 0).then((element) => {
            element.insertAdjacentHTML('beforeend', cvSurveyModal);
        });

        utils.waitUntil(() => document.querySelector('.journalHomeBG .advancedSearchLinkDropZone'), 0).then((element) => {
            element.insertAdjacentHTML('afterend', cvJournalCTAs);
            if (sessionStorage.getItem(`${tag}__journal-survey`)) {
                document.querySelectorAll(`.${tag}__favorite`).forEach(element => {
                    element.remove();
                });
            }
        });

        utils.waitUntil(() => document.querySelector('.journalHomeBG .quickSearchWidget'), 0).then((element) => {
            element.insertAdjacentHTML('beforebegin', cvJournalCTAs);
            if (sessionStorage.getItem(`${tag}__journal-survey`)) {
                document.querySelectorAll(`.${tag}__favorite`).forEach(element => {
                    element.remove();
                });
            }
        });

        utils.waitUntil(() => document.querySelector('.hnm--menu .hnm--item__dropdown-content'), 0).then((element) => {
            if (!document.querySelector('.top-nav-new-content-alert')) {
                document.querySelector(`.${tag}__journal-ctas`).classList.add(`${tag}__no-alert`);
            }
        });

        document.addEventListener('click', (e) => {
            const el = e.target;

            if (el.closest(`.${tag}__favorite`) && !document.querySelector(`.${tag}__success`)) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                document.querySelector(`.${tag}__modal-overlay`).classList.add(`${tag}__visible`);
                openModal(document.querySelector(`.${tag}__modal-overlay`));
            }

            if (el.closest(`.${tag}__alert`)) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                document.querySelector('.top-nav-new-content-alert').click();
            }

            if (el.closest(`.${tag}__close-button`) || (el.closest(`.${tag}__modal-overlay`) && !el.closest(`.${tag}__modal`))) {
                document.querySelector(`.${tag}__modal-overlay`).classList.remove(`${tag}__visible`);
                closeModal(document.querySelector(`.${tag}__modal-overlay`));
            }

            if (el.closest(`.${tag}__submit-button`)) {
                cvSubmitBtnFunc();
            }
        })
    }

    const cvSubmitBtnFunc = () => {
        if (document.querySelector(`.${tag}__rating-input:checked`)) {
            const score = document.querySelector(`.${tag}__rating-input:checked`).value;
            const response = document.querySelector(`.${tag}__modal textarea`).value;
            const deviceType = cvGetDeviceType();
            const pageURL = location.href;

            cvRecordSurveyData(score, response, deviceType, pageURL);
        } else {
            document.querySelector(`.${tag}__modal`).classList.add(`${tag}__error`);
        }
    }

    const cvGetDeviceType = () => {
        if (window.matchMedia("(max-width: 767px)").matches) return 'phone';
        if (window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches) return 'tablet';
        return 'desktop';
    }

    const cvRecordSurveyData = (score, response, device, pageURL) => {
        fetch("https://docs.google.com/forms/d/e/1FAIpQLSd_zQ6Q4Ddy7thQss_7gAl0bf4pickgZM8fOj1EoHWYUDtsRw/formResponse", {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                "entry.1067652284": score,
                "entry.1602196783": response,
                "entry.1666838864": device,
                "entry.2140105284": pageURL,
            }).toString(),
        })
            .then(() => {
                document.querySelector(`.${tag}__modal`).classList.add(`${tag}__success`);
                document.querySelector(`.${tag}__modal-overlay`).classList.remove(`${tag}__visible`);
                document.querySelectorAll(`.${tag}__favorite`).forEach(element => {
                    element.remove();
                });
                sessionStorage.setItem(`${tag}__journal-survey`, true);
                setTracking();
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    function trapFocus(modal) {
        const focusableElements = modal.querySelectorAll(
            'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        function handleKeyDown(e) {
            if (e.key === "Tab") {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        }

        modal.addEventListener("keydown", handleKeyDown);
        modal._handleKeyDown = handleKeyDown;
    }

    function openModal(modal) {
        modal.setAttribute("aria-hidden", "false");
        modal._previouslyFocused = document.activeElement;
        modal.setAttribute("tabindex", "-1");
        modal.focus();
        trapFocus(modal);
    }

    function closeModal(modal) {
        modal.setAttribute("aria-hidden", "true");
        modal.removeEventListener("keydown", modal._handleKeyDown);
        modal._previouslyFocused && modal._previouslyFocused.focus();
    }

    const setTracking = () => {
        window['optimizely'] = window['optimizely'] || [];
        window['optimizely'].push({
            type: "event",
            eventName: "survey_submitted",
        });
    }

    utils.init();
})(window);