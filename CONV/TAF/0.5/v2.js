((w) => {
    const tag = 'cv-0-5';
    const exp = 'TAF 0.5';
    const window = typeof unsafeWindow !== 'undefined' ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const utils = window['conv'].utils;
    const log = qa ? Function.prototype.bind.call(console.log, console, `[CONV] ${exp} |`) : () => { };

    log('Running v2');

    utils.waitUntil(() => document.body, 0).then((docBody) => {
        docBody.classList.add(tag);
    });

    let step;

    const triggerJournal = () => {
        const element = document.querySelector(`.social-links li`);

        if (document.querySelector(`.${tag}__content`) || !element || !document.querySelector(`.sign-in-link`)) return;

        step = 1;

        element.innerHTML = `
            <div class="${tag}__wrapper">
                <p class="${tag}__text">
                    <i class="fa fa-envelope" aria-hidden="true" style="font-size: 22px; color:#10147E" focusable="false"></i>
                    <span>Keep informed with <b>new content alerts</b> from <br>this journal</span>
                </p>
                <div class="${tag}__content">
                    <div class="${tag}__email-field">
                        <input type="email" placeholder="" autocomplete="off"/>
                        <span class="${tag}__placeholder">Enter your email address<span>*</span></span>
                    </div>
                    <label>
                        <input type="checkbox" autocomplete="off"/>
                        <span>I agree to the <a target="_blank" href="/terms-and-conditions"><span class="${tag}__link-text">terms and conditions</span>. <span>*</span><i class="fa fa-external-link" aria-hidden="true"></i></a>
                        </span>
                    </label>
                    <label class="${tag}__marketable">
                        <input type="checkbox" autocomplete="off"/>
                        <span>If you do not want to receive additional, related resources and offers
                        from us, please tick the box. You may opt out of receiving these
                        messages at any time by clicking unsubscribe. You can find more
                        information in our <a target="_blank" href="https://privacy.informa.com/policies/en/"><span class="${tag}__link-text">Privacy Policy</span>. <i class="fa fa-external-link" aria-hidden="true"></i></a>
                        </span>
                    </label>
                    <button class="${tag}__btn">Continue</button>
                </div>
            <div>
            `;

    }

    const buttonClasses = ['button.btn.save-search-show-dialog', 'button.btn.export-search', 'a.top-nav-new-content-alert'];
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleAction = () => {
        const emailInput = document.querySelector(
            `.${tag}__wrapper input[type="email"]`
        );
        const termsCheckbox = document.querySelector(
            `.${tag}__wrapper input[type="checkbox"]`
        );

        const privacyPolicy = document.querySelectorAll(`.${tag}__wrapper input[type="checkbox"]`)[1];

        // Validate email
        if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add(`${tag}__error`);
            emailInput.focus();
            return;
        }
        emailInput.classList.remove(`${tag}__error`);

        // Step 1: Show second step
        if (step === 1) {
            window['optimizely'] = window['optimizely'] || [];
            window['optimizely'].push({
                type: "event",
                eventName: "_conv___0_5__email_address_submitted",
            });
            document.querySelector(`.${tag}__btn`).textContent = "Subscribe for free";
            document
                .querySelector(`.${tag}__wrapper .${tag}__content`)
                .classList.add(`${tag}__step-2`);

            step = 2;
            emailInput.focus();
            return;
        }

        // Step 2: Validate checkbox and redirect
        if (step === 2) {
            if (termsCheckbox && termsCheckbox.checked) {
                termsCheckbox.classList.remove(`${tag}__error`);
                sessionStorage.setItem(`${tag}__email-value`, emailInput.value);
                if (privacyPolicy.checked) {
                    sessionStorage.setItem(`${tag}__privacy-policy`, 'checked');
                } else {
                    window['optimizely'] = window['optimizely'] || [];
                    window['optimizely'].push({
                        type: "event",
                        eventName: "_conv___0_5__subscribe_cta_clicked__without_opt-out_for_marketing_ticked_",
                    });
                }

                window['optimizely'] = window['optimizely'] || [];
                window['optimizely'].push({
                    type: "event",
                    eventName: "_conv___0_5__subscribe_cta_clicked",
                });
                window.open(
                    "https://www.tandfonline.com/action/registration?redirectUri=%2F",
                    "_self"
                );
            } else if (termsCheckbox) {
                termsCheckbox.classList.add(`${tag}__error`);
                termsCheckbox.focus();
            }
        }
    }

    document.addEventListener('mousedown', (event) => {
        buttonClasses.forEach((className, index) => {
            if (event.target.matches(className)) {
                step = 1;
                triggerJournal();
            }
        });

        if (event.target.closest(`.${tag}__btn`)) {
            handleAction();
        }

        if (event.target.closest(`.${tag}__marketable`)) {
            window['optimizely'] = window['optimizely'] || [];
            window['optimizely'].push({
                type: "event",
                eventName: "_conv___0_5__marketing_opt_out_on_new_elements_clicked_",
            });
        }

    });

    document.addEventListener("input", (e) => {
        if (e.target.matches(`.${tag}__wrapper input[type="email"]`)) {
            e.target.classList.remove(`${tag}__error`);
            const placeholder = document.querySelector(`.${tag}__placeholder`);
            if (e.target.value === "") {
                placeholder.style.display = "block";
            } else {
                placeholder.style.display = "none";
            }

            window['optimizely'] = window['optimizely'] || [];
            window['optimizely'].push({
                type: "event",
                eventName: "_conv___0_5__any_interaction_with_email_field",
            });
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;

        if (e.target.matches(`.${tag}__wrapper input[type="email"]`)) {
            e.preventDefault();
            e.target.blur();
            handleAction();
        }

        if (e.target.matches(`.${tag}__btn`)) {
            e.target.blur();
            handleAction();
        }

        if(e.target.matches(`.${tag}__wrapper label input`) && e.target.checked == false){
           e.target.checked = true; 
        }
    });

    utils.waitUntil(() => document.querySelector('.social-links li'), 0).then(triggerJournal);
}
)(window);