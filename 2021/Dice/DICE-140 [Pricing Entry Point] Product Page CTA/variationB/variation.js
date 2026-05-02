(() => {
    try {
        const shared = {
            ID: "FE",
            VARIATION: "140",
            CLIENT: "Funnelenvy"
        };

        const ID = shared.ID;
        const VARIATION = shared.VARIATION;

        const altNavHTML =
            `<div class="fe-nav">
            <div class="fe-nav-content">
                <p>Hiring isn't a one size fits all approach</p>
                <a href="https://www.dice.com/hiring/pricing" class="btn btn-primary">Find a solution</a>
            </div>
        </div>`;

        var buttonStyle = '' +
            '<style>' +
            'nav.close .small-menu > a{' +
            '  display: none;' +
            '}' +
            '</style>';

        const setup = () => {
            document.body.classList.add(ID + "-" + VARIATION);
            updateDynamicNav();
            window.addEventListener('resize', function () {
                updateDynamicNav();
            });

            document.addEventListener('click', (e) => {
                const el = e.target;
                if (el.closest('.fe-nav-content a')) {
                    dataLayer.push({ 'event': 'FE_ABTest_sticky_nav_CTA_click' });
                }
            });
        };

        const updateDynamicNav = () => {
            if (!document.querySelector('.fe-nav')) {
                document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelector('nav').insertAdjacentHTML('afterend', buttonStyle);

                document.querySelector('dhi-seds-nav-header-employer.hydrated').insertAdjacentHTML('afterend', altNavHTML);
                document.querySelector('dhi-seds-nav-header-employer.hydrated').parentElement.classList.add('fe_default_nav');

                const mobileToggle = document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelector('nav .links-toggle');
                mobileToggle.addEventListener('click', function () {
                    document.querySelector('.fe_default_nav').classList.toggle('navOpen');
                    window.scrollTo(0, 0)
                })
            }

            if (window.innerWidth < 1200) {
                // mobile
                document.querySelector('dhi-seds-nav-header-employer').style.display = 'block';
                document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelector('.dropdown-menu') ? 
                document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelector('.dropdown-menu').style.cssText = 'position: inherit; top: 54px; right: auto; left: auto; width: initial; min-width: auto;' : '';

                document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelectorAll('.dropdown-menu')[1] ?
                document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelectorAll('.dropdown-menu')[1].style.cssText = 'position: inherit; top: 54px; right: auto; left: auto; width: initial; min-width: auto;' : '';

            } else {
                // desktop nav
                dropdownOptionFn();
            }

            let lastScroll = 0;
            let flag = true;
            window.addEventListener('scroll', function () {
                let currentScroll = window.pageYOffset;
                if (lastScroll <= currentScroll) {
                    lastScroll = currentScroll;
                    if (window.pageYOffset > 400 && flag) {
                        document.querySelector('dhi-seds-nav-header-employer.hydrated').parentElement.classList.add('fe-nav-alt');
                    } else {
                        document.querySelector('dhi-seds-nav-header-employer.hydrated').parentElement.classList.remove('fe-nav-alt');
                    }
                    if (window.pageYOffset <= 400) {
                        flag = true;
                    }
                } else {
                    lastScroll = currentScroll;
                    document.querySelector('dhi-seds-nav-header-employer.hydrated').parentElement.classList.remove('fe-nav-alt');
                    flag = false;
                }
            })
        }

        const pollerLite = (conditions, callback, maxTime) => {
            if (maxTime === void 0) { maxTime = 10000; }
            const POLLING_INTERVAL = 50;
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
                }
                else if (Date.now() - startTime >= maxTime) {
                    clearInterval(interval);
                    console.log('Polling exceeded maximum time limit');
                }
            }, POLLING_INTERVAL);
        };

        function dropdownOptionFn(){
            document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelector('.dropdown-menu') ? 
            document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelector('.dropdown-menu').style.cssText = 'position: fixed; top: 54px; right: auto; left: auto; width: 193px; min-width: auto;' : '';
        
            document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelectorAll('.dropdown-menu')[4] ? 
            document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelectorAll('.dropdown-menu')[4].style.cssText = 'position: fixed; top: 54px; right: auto; left: auto; width: 197px; min-width: auto; transform: translateX(-63px);' : '';
        
            document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelectorAll('.dropdown-menu')[3] ? 
            document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelectorAll('.dropdown-menu')[3].style.cssText = 'position: fixed; top: 54px; right: auto; left: auto; width: 181px; min-width: auto;' : '';
        
            document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelectorAll('.dropdown-menu')[2] ?
            document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelectorAll('.dropdown-menu')[2].style.cssText = 'position: fixed; top: 54px; right: auto; left: auto; width: 193px; min-width: auto;': '';
            
            document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelectorAll('.dropdown-menu')[1] ?
            document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelectorAll('.dropdown-menu')[1].style.cssText = 'position: fixed; top: 54px; right: auto; left: auto; width: 156px; min-width: auto;' : '';
          }

        pollerLite([() => document.querySelector('dhi-seds-nav-header-employer')?.shadowRoot?.querySelector('dhi-seds-nav-header-display')?.shadowRoot?.querySelector('header')], setup)
    } catch (error) {
        console.log(`${error} Dice-140`);
    }
})();