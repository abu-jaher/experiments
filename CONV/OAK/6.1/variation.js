((w) => {
    "use strict";

    const tag = "cv-6-1";
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const utils = window["conv"].utils;

    window[tag] = window[tag] || {
        init: () => {
            try {
                utils.waitUntil((() => document.body), 0).then((body) => {
                    body.classList.add(tag);
                });
                window[tag].initVariation();
                console.log(`${window[tag].variation} is running`, tag);
            } catch (err) {
                console.log(err, tag);
            }
        },
    };

    if (window[tag].variation) return;
    window[tag].initVariation = () => {
        utils.waitUntil((() => document.querySelector('.header-top-container')), 0).then((element) => {
            element.insertAdjacentHTML('afterbegin', `
                <a href="/account/login/" class="${tag}__account">
                    <img src="https://d1mgcpums0qvsa.cloudfront.net/OAK/6.1/icons-account.png">
                    <span>Account</span>
                </a>
            `)
        });

        utils.waitUntil((() => document.querySelector('.mobile-menu-header li:last-of-type img')), 0).then((element) => {
            element.setAttribute('src', 'https://d1mgcpums0qvsa.cloudfront.net/OAK/6.1/np_close.png');
            document.querySelector('.mobile-menu-header li:last-of-type').insertAdjacentHTML('afterbegin', `<p class="header-title">Menu</p>`);
        });

        utils.waitUntil((() => document.querySelector('.nav-footer>div>[role="menuitem"] svg')), 0).then((element) => {
            document.querySelectorAll('.nav-footer>div>[role="menuitem"] svg').forEach((element) => {
                const mainTitle = element.closest('[role="menuitem"]').querySelector('.main-title');
                mainTitle.insertAdjacentElement('beforeend', element);
            })
        });

        document.addEventListener('click', (e) => {
            const elem = e.target;

            if (elem.closest('.top-nav-item-link')) {
                const submenuParent = elem.closest('.top-nav-item-link').parentElement;
                utils.waitUntil((() => submenuParent.querySelector('.submenu:not(.cv-6-3-submenu)')), 0).then((element) => {
                    element.querySelector('.submenu .close-button img').setAttribute('src', 'https://d1mgcpums0qvsa.cloudfront.net/OAK/6.1/np_close.png');
                    element.querySelector('.submenu #back-arrow img').setAttribute('src', 'https://d1mgcpums0qvsa.cloudfront.net/OAK/6.1/np_arrow.png');

                    // change chairs set copy
                    document.querySelector('[href="/category/dining-table-and-4-chairs/"]') ? document.querySelector('[href="/category/dining-table-and-4-chairs/"]').childNodes[2].nodeValue = '4 Chairs set' : '';
                    document.querySelector('[href="/category/dining-table-and-6-chairs/"]') ? document.querySelector('[href="/category/dining-table-and-6-chairs/"]').childNodes[2].nodeValue = '6 Chairs set' : '';
                    document.querySelector('[href="/category/dining-table-and-8-chairs/"]') ? document.querySelector('[href="/category/dining-table-and-8-chairs/"]').childNodes[2].nodeValue = '8 Chairs set' : '';
                    document.querySelector('[href="/category/dining-table-and-10-chairs/"]') ? document.querySelector('[href="/category/dining-table-and-10-chairs/"]').childNodes[2].nodeValue = '10 Chairs set' : '';

                    // change seaters set copy
                    document.querySelector('[href="/category/4-seater-dining-tables/"]') ? document.querySelector('[href="/category/4-seater-dining-tables/"]').childNodes[2].nodeValue = '4 Seater' : '';
                    document.querySelector('[href="/category/6-seater-dining-tables/"]') ? document.querySelector('[href="/category/6-seater-dining-tables/"]').childNodes[2].nodeValue = '6 Seater' : '';
                    document.querySelector('[href="/category/8-seater-dining-tables/"]') ? document.querySelector('[href="/category/8-seater-dining-tables/"]').childNodes[2].nodeValue = '8 Seater' : '';
                    document.querySelector('[href="/category/10-seater-dining-tables/"]') ? document.querySelector('[href="/category/10-seater-dining-tables/"]').childNodes[2].nodeValue = '10 Seater' : '';

                    // accordion
                    submenuParent.querySelectorAll('.top-nav-menu-column .heading').forEach(element => {
                        const getAttr = element.getAttribute('href');
                        if (!element.parentElement.querySelector(`.${tag}_viewAll`)) {
                            element.parentElement.insertAdjacentHTML('beforeend', `<a href="${getAttr}" class="${tag}_viewAll">View all</a>`);
                        }
                        element.removeAttribute('href');
                    });

                    submenuParent.querySelector('.top-nav-menu-column').classList.add('cv-6-1__active');

                    const activeSubMenu = document.querySelector('.is-drilldown');
                    utils.waitUntil((() => document.querySelector('.top-nav-menu .is-active li')), 0).then((element) => {
                        activeSubMenu.scrollIntoView({
                            block: 'start',
                        });

                        const getHeight = document.querySelector('.is-drilldown-submenu.is-active').scrollHeight;
                        document.querySelector('.navigation-mobile.off-canvas.position-left .is-drilldown').style.cssText = `min-height: ${getHeight}px !important`;
                    })
                });
            }

            if (elem.closest('.top-nav-menu .top-nav-menu-column .heading')) {
                elem.closest('.top-nav-menu .top-nav-menu-column .heading').parentElement.classList.toggle(`${tag}__active`);
                const getHeight = document.querySelector('.is-drilldown-submenu.is-active').scrollHeight;
                document.querySelector('.navigation-mobile.off-canvas.position-left .is-drilldown').style.cssText = `min-height: ${getHeight}px !important`;
            }

            if (elem.closest('.close-button[aria-label="Close menu"]') || elem.closest('.menu .js-drilldown-back')) {
                document.querySelector(`.${tag}__active`) && document.querySelectorAll(`.${tag}__active`).forEach((element) => {
                    element.classList.remove(`${tag}__active`)
                })

                document.querySelector('.navigation-mobile.off-canvas.position-left .is-drilldown').style.cssText = `min-height: 0px !important`;
            }
        })
    };

    window[tag].variation = "variation-1";
    window[tag].init();
})(window);