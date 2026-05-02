(function () {
    var FEHelper = {
        onLoadElement: function (selector, trigger, delayInterval, delayTimeout) {
            if (
                document &&
                document.querySelectorAll(selector) &&
                document.querySelectorAll(selector).length > 0
            ) {
                trigger();
            } else {
                var interval = setInterval(function () {
                    if (
                        document &&
                        document.querySelectorAll(selector) &&
                        document.querySelectorAll(selector).length > 0
                    ) {
                        clearInterval(interval);
                        trigger();
                    }
                }, delayInterval);
                setTimeout(function () {
                    clearInterval(interval);
                }, delayTimeout);
            }
        },
        after: function (targetElement, afterElement) {
            if (targetElement) {
                targetElement.insertAdjacentHTML('afterend', afterElement);
            }
        },
        insertAfter: function (afterElement, targetElement) {
            targetElement.parentNode.insertBefore(
                afterElement,
                targetElement.nextSibling
            );
        },
        append: function (targetElement, appendElement) {
            if (targetElement) {
                targetElement.insertAdjacentHTML('beforeend', appendElement);
            }
        },
        prepend: function (targetElement, prependElement) {
            if (targetElement) {
                targetElement.insertAdjacentHTML('afterbegin', prependElement);
            }
        },
        live: function (selector, event, callback, context) {
            function addEvent(el, type, handler) {
                if (el.attachEvent) el.attachEvent('on' + type, handler);
                else el.addEventListener(type, handler);
            }
            this.Element && function (ElementPrototype) {
                ElementPrototype.matches = ElementPrototype.matches ||
                    ElementPrototype.matchesSelector ||
                    ElementPrototype.webkitMatchesSelector ||
                    ElementPrototype.msMatchesSelector ||
                    function (selector) {
                        var node = this,
                            nodes = (node.parentNode || node.document).querySelectorAll(selector),
                            i = -1;
                        while (nodes[++i] && nodes[i] != node);
                        return !!nodes[i];
                    };
            }(Element.prototype);
            function live(selector, event, callback, context) {
                addEvent(context || document, event, function (e) {
                    var found, el = e.target || e.srcElement;
                    while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
                    if (found) callback.call(el, e);
                });
            }
            live(selector, event, callback, context);
        },

        updateInnerHtml: function (ele, value) {
            if (ele) {
                ele.innerHTML = value;
            }
        },
        getScript: function (source, callback) {
            var el = document.createElement("script");
            el.onload = callback;
            el.src = source;
            document.body.appendChild(el);
        }
    };
   
    function waitForElm(selector) {
        return new Promise(function (resolve) {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }
            const observer = new MutationObserver(function (mutations) {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    };
    function addHTML(Element, content, Name) {
        var mainSelector = document.querySelector('#fe-main');
        var createElement = document.createElement(Element);
        createElement.className = Name;
        createElement.innerHTML = content;
        mainSelector.append(createElement);
    };
    function init() {
        /*main section*/
        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.2/min/tiny-slider.js';
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/tiny-slider.css';
        document.getElementsByTagName('head')[0].appendChild(link);
        document.body.classList.add('usc-homepage');
        document.querySelector('header').insertAdjacentHTML('afterend', '<div id="fe-main"></div>');

        /*Hero section*/
        var heroSectionHTML = `<div class="fe-container"><h1 class="main-heading">Engage and keep your members with mobile and TV apps. </h1><p class="main-sub-heading">Deliver a premium content experience on your members' favorite devices. Make it happen without stressing over technical details - we do the heavy lifting. </p><a href="https://www.uscreen.tv/request-demo/" class="demo-cta hero-request-demo-cta">Request Demo</a><div class="hero-footer"><div class="flex-box"><div class="img-block"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/iPhone.png" alt="Iphone"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/iPhone-l.png" alt="Iphone"></div><div class="img-block"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/Apple-Watch.png" alt="Apple Watch"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/AppleWatch-l.png" alt="Apple Watch"></div><div class="img-block"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/apple-tv.png" alt="Apple TV"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/appleTV-l.png" alt="Apple TV"></div><div class="img-block"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/Roku.png" alt="ROKU"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/Roku-l.png" alt="ROKU"></div><div class="img-block"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/fire-tv.png" alt="Fire tv"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/fireTV-l.png" alt="Fire tv"></div><div class="img-block"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/AndroidTV.png" alt="Android TV"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/AndroidTV-l.png" alt="Android TV"></div><div class="img-block"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/Android1.png" alt="Android"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/Android-l.png" alt="Android"></div></div></div></div>`;
        /*standout section*/
        var standoutSectonHTML = `<div class="fe-container"><h2 class="main-heading-2">Why your membership stands out with apps</h2><div class="flex-box"><div class="flex-left"><div class="img-block"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/ImageOwner.png" alt="Power with Ceejay"></div></div><div class="flex-right"><div class="info-wraper"><div class="info-block"><h4>Raise your brand's profile</h4><p>Launch apps for a more professional and legitimate brand. Your subscribers enjoy a seamless, high-end experience that’s ahead of what other creators are offering.</p></div><div class="info-block"><h4>Grow retention and fan love</h4><p>Having your content, community, and offers in one place. With everything they need in one app and optimal user experience, your members have every reason to stay.</p></div><div class="info-block"><h4>Engage your members anytime, anywhere</h4><p>More than 70% of viewing happens on phones & TVs. The distraction-free experience and downloadable content keep your members immersed. Plus, nudge them back to your platform with app push notifications.</p></div></div></div></div>`;
        /*app number section*/
        var appnumberSectionHTML = `<div class="fe-container"><h2 class="main-heading-2">Apps by the numbers</h2><div class="flex-box"><div class="number-card"><h6>Increased watch time</h6><p class="card-num">70%</p><p class="card-info">Our customers generate 70% more watch time via their apps, compared to website.</p></div><div class="number-card"><h6>Better engagement</h6><p class="card-num">10x</p><p class="card-info">Our customers with apps have 10x more active users.</p></div><div class="number-card"><h6>Happy users</h6><p class="card-num">4.9</p><p class="card-info">Average app rating on iOS app store</p></div></div><div class="trusted"><h6>Trusted by forward-thinking creators</h6><div class="flex-box"><div class="img-card"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/wo.png" alt="Find What Feels Good"><p class="trust-info">Find What Feels Good</p><p class="trust inf">by Yoga with Adrienne</p></div><div class="img-card"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/walk.png" alt="Walk at Home"><p class="trust-info">Walk at Home</p><p class="trust inf">by Leslie Sansone</p></div><div class="img-card"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/aplus.png" alt="Abudance Plus"><p class="trust-info">Abudance Plus</p><p class="trust inf">by Justin Rhodes</p></div><div class="img-card"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/fa.png" alt="Filmmakers Academy"><p class="trust-info">Filmmakers Academy</p><p class="trust inf">Filmmakers academy</p></div><div class="img-card"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/music.png" alt="Jazzercise On Demand"><p class="trust-info">Jazzercise On Demand</p><p class="trust inf">Jazzercise</p></div><div class="img-card"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/ombe.png" alt="OMBE Surf"><p class="trust-info">OMBE Surf</p><p class="trust inf">OMBE Surf</p></div></div></div></div>`;
        /*everything section*/
        var everythingSectionHTML = `<div class="fe-container"><div class="flex-box"><div class="flex-left"><div class="img-block"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/saraBeth.png" alt="Everything you need from your apps platform>"></div></div><div class="flex-right"><div class="info-wraper"><h4>Everything you need from your apps platform</h4><p>Get to market quickly and with little effort. With our time-to-launch averaging 30-60 days, Uscreen takes care of everything involved with building your apps. When they’re ready, we submit them to app stores for you. After you launch, your apps get better and better with constant updates and exciting new features.</p><a href="https://www.uscreen.tv/examples/" class="example-cta">Check examples <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.43451 2.43451C9.74693 2.12209 10.2535 2.12209 10.5659 2.43451L15.5659 7.43451C15.8783 7.74693 15.8783 8.25346 15.5659 8.56588L10.5659 13.5659C10.2535 13.8783 9.74693 13.8783 9.43451 13.5659C9.12209 13.2535 9.12209 12.7469 9.43451 12.4345L13.0688 8.8002H1.0002C0.558368 8.8002 0.200195 8.44202 0.200195 8.0002C0.200195 7.55837 0.558368 7.2002 1.0002 7.2002H13.0688L9.43451 3.56588C9.12209 3.25346 9.12209 2.74693 9.43451 2.43451Z" fill="#006AFF" /></svg></span></a></div></div></div><div class="flex-box"><div class="flex-left"><div class="info-wraper"><h4>Centralized CMS with dynamic changes</h4><p>Upload and manage your content in one central admin area. Any updates to your videos, playlist, and extras will be rolled out to all your apps instantly. Everything is easier with an all-in-one platform.</p><a href="https://www.uscreen.tv/examples/" class="example-cta">Check examples <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.43451 2.43451C9.74693 2.12209 10.2535 2.12209 10.5659 2.43451L15.5659 7.43451C15.8783 7.74693 15.8783 8.25346 15.5659 8.56588L10.5659 13.5659C10.2535 13.8783 9.74693 13.8783 9.43451 13.5659C9.12209 13.2535 9.12209 12.7469 9.43451 12.4345L13.0688 8.8002H1.0002C0.558368 8.8002 0.200195 8.44202 0.200195 8.0002C0.200195 7.55837 0.558368 7.2002 1.0002 7.2002H13.0688L9.43451 3.56588C9.12209 3.25346 9.12209 2.74693 9.43451 2.43451Z" fill="#006AFF" /></svg></span></a></div></div><div class="flex-right"><div class="img-block"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/cms.png" alt="Centralized CMS with dynamic changes"></div></div></div><div class="flex-box"><div class="flex-left"><div class="img-block"><img src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/detailed.png" alt="Detailed analytics"></div></div><div class="flex-right"><div class="info-wraper"><h4>Detailed analytics</h4><p>Dive deep into our built-in analytics for a detailed insight: dig into watch-time per device to crack your users’ behavior. Identify your best performing videos and focus your future efforts on replicating success for your video streaming service.</p><a href="https://www.uscreen.tv/examples/" class="example-cta">Check examples <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.43451 2.43451C9.74693 2.12209 10.2535 2.12209 10.5659 2.43451L15.5659 7.43451C15.8783 7.74693 15.8783 8.25346 15.5659 8.56588L10.5659 13.5659C10.2535 13.8783 9.74693 13.8783 9.43451 13.5659C9.12209 13.2535 9.12209 12.7469 9.43451 12.4345L13.0688 8.8002H1.0002C0.558368 8.8002 0.200195 8.44202 0.200195 8.0002C0.200195 7.55837 0.558368 7.2002 1.0002 7.2002H13.0688L9.43451 3.56588C9.12209 3.25346 9.12209 2.74693 9.43451 2.43451Z" fill="#006AFF" /></svg></span></a></div></div></div></div></section>`;
        /*footer section*/
        var footerSectionHTML = `<div class="fe-container"><div class="footer-wraper"><h2 class="main-heading-2">Let’s talk!</h2><p>Book a demo with our 5-star support team to see how you can fulfill your video business’ potential.</p><a href="https://www.uscreen.tv/request-demo/" class="footer-cta demo-cta">Request Demo</a></div></div>`;
        var heading = `<div class="heading"><h2 class="main-heading-2">You’re in good company</h2><p class="main-sub-heading">Join these brands, and many others, who are already in love with their 5-star apps.</p></div>`;
        var sliderImg = `<div class="tns-item tns-normal" id="tns1-item5" aria-hidden="true" tabindex="-1"><div class="main-image"><img loading="lazy" src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/sarah-main.png" alt="Sarah Beth Yoga"></div><div class="customer-showcase-slider--description"><div><img loading="lazy" src="https://fe-test-dev.s3.amazonaws.com/USCREEN/homepageredsign/sarah.png" alt="FWFG logo"></div><div><h4>SarahBethYoga</h4><p>Sarah Beth</p></div></div></div>`;
        /*why section*/
        addHTML('section', heroSectionHTML, 'fe-hero-section');
        addHTML('section', standoutSectonHTML, 'fe-standout-section');
        addHTML('section', appnumberSectionHTML, 'fe-section-app-numbers');
        addHTML('section', everythingSectionHTML, 'fe-section-everything');
        addHTML('section', '', "fe-section-why");
        addHTML('section', '', "fe-section-convinced");
        addHTML('section', '', 'fe-section-FQA');
        addHTML('footer', footerSectionHTML, 'fe-footer');
        var whycontrolSection = document.querySelector('.wp-container-21.wp-block-group');
        document.querySelector('.fe-section-why').append(whycontrolSection);
        var convincedControlSection = document.querySelector(".wp-container-24.wp-block-group");
        document.querySelector('.fe-section-convinced').append(convincedControlSection);
        var FAQControlSection = document.querySelector('.wp-container-25.wp-block-group .well-what-about.small-faq');
        document.querySelector('.fe-section-FQA').append(FAQControlSection);
        document.querySelector('.customer-showcase-slider').insertAdjacentHTML('afterbegin', heading);
        var siderControlSection = document.querySelector('.customer-showcase-slider');
        document.querySelector('.fe-section-everything').insertAdjacentElement('afterend', siderControlSection);
        document.querySelector('.customer-showcase-slider--init').insertAdjacentHTML('afterbegin', sliderImg);
        function customerShowcaseSlider() {
                var e = document.querySelectorAll(".customer-showcase-slider--init");
                e && e.forEach(function (e) {
                    var slider = tns({
                        mode: "gallery",
                        autoplay: !1,
                        items: 1,
                        gutter: 0,
                        mouseDrag: !0,
                        swipeAngle: !1,
                        center: !0,
                        container: e,
                        speed: 400,
                        nav: !1,
                        loop: !0,
                        controlsText: ['<svg width="65" height="66" viewBox="0 0 65 66" fill="none" xmlns="http://www.w3.org/2000/svg"><circle r="32" transform="matrix(-1 0 0 1 32.5 33)" stroke="#ACACAC"/><path d="M41.1668 33.9286L41.1668 32.0714L27.4485 32.0714L31.0634 28.3571L30.1597 26.5L23.8335 33L30.1597 39.5L31.0634 37.6429L27.4485 33.9286L41.1668 33.9286Z" fill="#252525"/></svg>', '<svg fill="none" height="66" viewBox="0 0 65 66" width="65" xmlns="http://www.w3.org/2000/svg"><circle cx="32.5" cy="33" r="32" stroke="#acacac"/><path d="m23.8332 33.9286v-1.8572h13.7183l-3.6149-3.7143.9037-1.8571 6.3262 6.5-6.3262 6.5-.9037-1.8571 3.6149-3.7143z" fill="#252525"/></svg>']
                    })
                    slider.destroy();
                    slider.rebuild();
                })
                   var slideSelector = tns({
                container: '.hero-footer .flex-box',
                items: 1,
                gutter: 0,
                loop: false,
                autoplay: false,
                controls: false,
                nav: false,
                speed: 400,
                responsive: {

                    1099: {
                        items: 7
                    },
                    500: {
                        items: 4
                    },
                    300: {
                        items: 2,
                        mouseDrag: true,

                    },
                }

            })
            }
        customerShowcaseSlider();
        waitForElm('#tns1-item4').then(function () {
            customerShowcaseSlider();
        })
    }
    FEHelper.onLoadElement('body', init, 50, 10000);
})();