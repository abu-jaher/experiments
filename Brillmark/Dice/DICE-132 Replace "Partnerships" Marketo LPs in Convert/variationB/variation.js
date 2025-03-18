(() => {
    try {
        const waitForElement = (selector, trigger) => {
            const interval = setInterval(() => {
                if (
                    document &&
                    document.querySelector(selector) &&
                    document.querySelectorAll(selector).length > 0
                ) {
                    clearInterval(interval);
                    trigger();
                }
            }, 50);
            setTimeout(() => {
                clearInterval(interval);
            }, 15000);
        }

        const waitForMarketo = (trigger) => {
            const interval = setInterval(() => {
                if (
                    window.MktoForms2
                ) {
                    clearInterval(interval);
                    trigger();
                }
            }, 50);
            setTimeout(() => {
                clearInterval(interval);
            }, 10000);
        };

        // Define waitForElement function for shadowDom
        const waitForShadowDomElement = (trigger) => {
            const interval = setInterval(() => {
                const employerElement = document.querySelector("dhi-seds-nav-header-employer");
                const navHeaderDisplayElement = employerElement &&
                    employerElement.shadowRoot &&
                    employerElement.shadowRoot.querySelector("dhi-seds-nav-header-display") &&
                    employerElement.shadowRoot.querySelector("dhi-seds-nav-header-display").shadowRoot &&
                    employerElement.shadowRoot.querySelector("dhi-seds-nav-header-display").shadowRoot.querySelector("header") &&
                    employerElement.shadowRoot.querySelector("dhi-seds-nav-header-display").shadowRoot.querySelector("header .links li a[href*='contact-us']");
                if (navHeaderDisplayElement) {
                    clearInterval(interval);
                    trigger();
                }
            }, 50);
            setTimeout(() => {
                clearInterval(interval);
            }, 15000);
        }

        const heroSection =
            `
            <section id="section-hero">
                <div id="section-hero-tint">
                    <div class="section-inner">
                        <div class="row row-centered">
                            <div class="partner_logo">
                                <div class="logo-1"><div class="mktoImg mktoGen" id="mkto_gen_partner-logo-1"><img src="https://www.dice.com/products/wp-content/uploads/2016/11/dice-logo-md.png" class="mktoImg" id="partner-logo-1" mktoname="Partner-logo-1"></div></div>
                                <div class="divider"></div>
                                <div class="logo-2"><div class="mktoImg mktoGen" id="mkto_gen_partner-logo-2"><img src="https://techhub.dice.com/rs/318-VQK-428/images/Ceipal_Logo-gradient-revised.png" class="lpimg" id="partner-logo-2" mktoname="Partner-logo-2"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        const formSection =
            `
            <section id="section-resource-intro" class="resource-page-form">
                <div class="section-inner white">
                    <div class="row row-centered section-rule">

                        <div id="resource-column-left" class="large-6 large-pull-6 columns">
                            <h2 class="heading-small">Dice + Ceipal</h2>
                            <div id="resource-author" class="author-image-hidden">
                                <div class="mktoText" id="resource-author-info">
                                    <div><span id="resource-author-name"><strong>Your Hiring Challenges Are One of a Kind. So Are
                                        Dice’s Tech Hiring Tools.</strong></span> <span id="resource-author-title"></span>
                                    </div>
                                </div>
                            </div>
                            <div id="resource-description" class="mktoText">
                                <p style="line-height: 28px;" ><span style="font-size: 20px;"><strong><span
                                    style="font-family: arial, helvetica, sans-serif;">Why Dice is a perfect complement
                                    to Ceipal</span></strong></span></p>
                                <ul>
                                    <li><span style="font-family: arial, helvetica, sans-serif;">Gain access to millions of tech
                                        professionals who join Dice and create detailed profiles to find their next
                                        opportunity.</span></li>
                                    <li><span style="font-family: arial, helvetica, sans-serif;">When you’re sourcing, our AI and
                                        matching technology helps you find the candidate – not just any candidate. We go way
                                        beyond job titles searches to help you connect with the right professionals and who have
                                        the right skills and qualifications.</span></li>
                                    <li><span style="font-family: arial, helvetica, sans-serif;">We don’t believe in
                                        nickel-and-diming. We want to have the hiring tools you need – all for a flat
                                        fee.</span></li>
                                </ul>
                                <p style="line-height: 28px;"><span style="font-size: 20px;"><strong><span
                                    style="font-family: arial, helvetica, sans-serif;">Get free access to Dice for
                                    2-months!*</span></strong></span></p>
                                <p><span style="font-family: arial, helvetica, sans-serif;">As a Ceipal customer, we’re offering you
                                    access to Dice for two months, at no cost. We don’t believe in hidden fees – just take
                                    Dice’s powerful tech hiring tools for a test drive and let us know how it’s going!</span>
                                </p>
                                <p class="offer"><span
                                    style="color: #000000; font-family: arial, helvetica, sans-serif; font-size: 12px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;"><br>*This
                                        offer is not valid for organizations who have been a Dice customer in the previous 12
                                        months.&nbsp; Acceptance of this trial offer is subject to Dice’s Terms and Conditions of
                                        Service found here:<span>&nbsp;</span></span><a
                                            href="https://www.dice.com/about/terms-and-conditions" target="_blank"
                                            style="font-family: arial, helvetica, sans-serif; font-size: 12px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff;">https://www.dice.com/about/terms-and-conditions</a><span
                                                style="color: #000000; font-family: arial, helvetica, sans-serif; font-size: 12px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">.&nbsp;
                                        Dice agrees to authorize usage of the Ceipal API in connection with this offer provided that
                                        usage of the Ceipal API is limited to the previously referenced terms and conditions and the
                                        user understands and agrees no resumes, passwords or other information received as a result
                                        of the Ceipal API interface may be shared outside of the user’s organization.</span>
                                </p>
                            </div>
                        </div>
                        <div id="resource-column-right" class="large-6 large-push-6 columns">
                            <h2 class="heading-small">Please fill out the below form</h2>
                            <!-- Resource form -->
                            <div id="resource-form-wrapper">
                                <div class="mktoForm" id="resource-form">
                                    <div id="lpeCDiv_243226" class="lpeCElement Dice_Master_Partnership_Form">
                                        <span class="lpContentsItem formSpan">
                                            <form class="mktoForm mktoHasWidth mktoLayoutLeft" id="mktoForm_4972"></form>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        const footerLogoSection =

            `    <section id="section-footer-logos">
                <div class="section-inner">
                    <div class="row row-centered">
                        <div id="section-footer-logos-title" class="small-12 columns section-title-centered">
                            <h1 class="heading-medium"><strong>You're in good company.</strong> Join the thousands of top companies using Dice.</h1>
                        </div>
                    </div>
                    <div class="row row-centered">
                        <div class="small-12 columns">
                            <ul id="footer-logo-list">
                                <li class="footer-logo">
                                    <img src="https://techhub.dice.com/rs/318-VQK-428/images/logo-att.svg" alt="AT&amp;T logo" width="45" height="70">
                                </li>
                                <li class="footer-logo">
                                    <img src="https://techhub.dice.com/rs/318-VQK-428/images/logo-dreamworks.svg" alt="Dreamworks logo" width="126" height="22">
                                </li>
                                <li class="footer-logo">
                                    <img src="https://techhub.dice.com/rs/318-VQK-428/images/logo-adobe.svg" alt="Adobe logo" width="50" height="72">
                                </li>
                                <li class="footer-logo">
                                    <img src="https://techhub.dice.com/rs/318-VQK-428/images/logo-ibm.svg" alt="IBM logo" width="79" height="32">
                                </li>
                                <li class="footer-logo">
                                    <img src="https://techhub.dice.com/rs/318-VQK-428/images/logo-dell.svg" alt="Dell logo" width="62" height="62">
                                </li>
                                <li class="footer-logo">
                                    <img src="https://techhub.dice.com/rs/318-VQK-428/images/logo-rh.svg" alt="Robert Half logo" width="69" height="48">
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        `;

        const footer =

            `<footer>
            <div class="footer-wrapper">
                Copyright © 1990 - <script type="text/javascript">document.write(new Date().getFullYear())</script>2024 Dice. All right reserved. <a href="https://www.dice.com/" target="_blank" id="">Dice</a> is a <a href="https://dhigroupinc.com/home/default.aspx" target="_blank" id="">DHI</a> service.<br> <a href="https://www.dice.com/about/terms-and-conditions" target="_blank">Terms and Conditions</a>&nbsp;| <a href="https://www.dice.com/about/privacy-policy" target="_blank" id="">Privacy Policy</a> | <a href="https://www.dice.com/about/ccpa#ccpa-form-anchor" target="_blank" id="">Do Not Sell My Personal Information</a> | <a href="https://www.dice.com/about/ccpa" target="_blank" id="">CCPA</a>
            </div>
        </footer>`;

        const init = () => {
            const { body } = document;
            body.classList.add('fe-dice-132')
            body.querySelector('.dice-base-container').insertAdjacentHTML('afterend', `${heroSection} ${formSection} ${footerLogoSection} ${footer}`);

            // insert Marketo Script 

            const jsElm = document.createElement("script");
            // set the type attribute
            jsElm.type = "application/javascript";
            // make the script element load file
            jsElm.src = "//app-sjg.marketo.com/js/forms2/js/forms2.min.js"
            // finally insert the element to the body element in order to load the script
            document.body.appendChild(jsElm);
            
            waitForMarketo(() => {
                MktoForms2.loadForm("//app-sjg.marketo.com", "318-VQK-428", 4972, function(form){
                    form.onSuccess(function(values, followUpUrl) {
                        window.open(followUpUrl,"_self");
                        return false;
                    });
                });
            })

            // hide nav dropdown
            waitForShadowDomElement(() => {
                const employerElement = document.querySelector("dhi-seds-nav-header-employer");
                employerElement.shadowRoot.querySelector("dhi-seds-nav-header-display").shadowRoot.querySelector("header .links").style.cssText = 'display: none !important';
                employerElement.shadowRoot.querySelector("dhi-seds-nav-header-display").shadowRoot.querySelector("header .small-menu").style.cssText = 'display: none !important';
            })
        }

        waitForElement(".dice-base-container", init);
    } catch (e) {
        console.log(e, "Error in BOX-288 v2");
    }
})();