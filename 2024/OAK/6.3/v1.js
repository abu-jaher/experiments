((w) => {
    "use strict";

    const tag = "cv-6-3";
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

    const storageCategoryHTML =
        `<li class="cell auto top-nav-item Storage is-drilldown-submenu-parent" data-title="Storage" role="none" aria-expanded="false">
            <a class="top-nav-item-link nav-link" role="menuitem" aria-haspopup="true" aria-label="Storage" tabindex="0">
                Storage 
                <svg class="svg-inline--fa fa-chevron-right fa-w-10 hide-for-large" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg><!-- <i class="fa fa-chevron-right hide-for-large" aria-hidden="true"></i> Font Awesome fontawesome.com -->
            </a>
            <ul class="menu vertical submenu ${tag}-submenu is-drilldown-submenu drilldown-submenu-cover-previous invisible" data-submenu="" role="group" aria-hidden="true">
                <li class="js-drilldown-back">
                    <a tabindex="0"></a>
                </li>
                <li class="grid-x grid-margin-x is-submenu-item is-drilldown-submenu-item" role="none">
                    <div class="cell large-auto top-nav-menu-column ${tag}__active">
                        <a href="/category/bookcases/" class="top-nav-menu-item" role="menuitem">
                            <img src="https://d2kz53n3bzvihv.cloudfront.net/resized/50_50_1_255_255_255/media/gbu0/site-nav/nav_Bookcases.jpg.webp" class="product-icon" data-pagespeed-url-hash="2630850607" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
                                Bookcases
                        </a>
                        <a href="/category/display-cabinets/" class="top-nav-menu-item" role="menuitem">
                            <img src="https://d2kz53n3bzvihv.cloudfront.net/resized/50_50_1_255_255_255/media/gbu0/site-nav/nav_Display_cabinets.jpg.webp" class="product-icon" data-pagespeed-url-hash="1050721481" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
                                Display Cabinets
                        </a>
                        <a href="/category/hallway-furniture-storage/" class="top-nav-menu-item" role="menuitem">
                            <img src="https://d2kz53n3bzvihv.cloudfront.net/resized/50_50_1_255_255_255/media/gbu0/site-nav/nav_Hallway_furniture.jpg.webp" class="product-icon" data-pagespeed-url-hash="482102412" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
                                Hallway Furniture & Storage
                        </a>
                        <a href="/category/shelving-units/" class="top-nav-menu-item" role="menuitem">
                            <img src="https://d2kz53n3bzvihv.cloudfront.net/resized/50_50_1_255_255_255/media/gbu0/site-nav/NAV_Ladder_Shelving.jpg.webp" class="product-icon" data-pagespeed-url-hash="592378652" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
                                Shelving Units
                        </a>
                        <a href="/category/shoe-storage/" class="top-nav-menu-item" role="menuitem">
                            <img src="https://d2kz53n3bzvihv.cloudfront.net/resized/50_50_1_255_255_255/media/gbu0/site-nav/brockwell-shoe_storage-cuttout-150x150.jpg.webp" class="product-icon" data-pagespeed-url-hash="3265570544" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
                                Shoe Storage
                        </a>
                        <a href="/category/sideboards/" class="top-nav-menu-item" role="menuitem">
                            <img src="https://d2kz53n3bzvihv.cloudfront.net/resized/50_50_1_255_255_255/media/gbu0/site-nav/nav_Sideboards.jpg.webp" class="product-icon" data-pagespeed-url-hash="148219545" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
                                Sideboards
                        </a>
                        <a href="/category/storage-cabinets/" class="top-nav-menu-item" role="menuitem">
                            <img src="https://d2kz53n3bzvihv.cloudfront.net/resized/50_50_1_255_255_255/media/gbu0/site-nav/nav_Storage_cabinets.jpg.webp" class="product-icon" data-pagespeed-url-hash="172589798" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
                                Storage Cabinets
                        </a>
                        <a href="/category/painted-living-room-furniture/" class="top-nav-menu-item" role="menuitem">
                            <img src="https://d2kz53n3bzvihv.cloudfront.net/resized/50_50_1_255_255_255/media/gbu0/site-nav/nav_Painted_livingroom_furniture.jpg.webp" class="product-icon" data-pagespeed-url-hash="3618356520" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
                                Painted Living Room Furniture
                        </a>
                        <a href="/category/furniture-wax-polish-and-care-kits/" class="top-nav-menu-item" role="menuitem">
                            <img src="https://d2kz53n3bzvihv.cloudfront.net/resized/50_50_1_255_255_255/media/gbu0/site-nav/nav_Furniture_wax.jpg.webp" class="product-icon" data-pagespeed-url-hash="2140356656" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
                                Furniture Wax and Care Kits
                        </a>
                </li>
            </ul>
        </li>`;

    const subCategoryHeader = `
        <div class="mobile-menu-header hidden" style="display: flex;">
            <img src="/media/ofl-responsive/icons/left-arrow.png" alt="Back" aria-hidden="true">
            <span class="header-title">Storage</span>
            <a aria-label="Close menu" data-close="offCanvasNavigationMobile" role="menuitem" aria-expanded="true" aria-controls="offCanvasNavigationMobile" class="close-button"><img src="/media/ofl-responsive/icons/close.png" alt="Close"></a>
        </div>`;

    window[tag].initVariation = () => {
        utils.waitUntil((() => document.querySelector('.off-canvas-content .top-nav-wrap .menu-wrapper .top-nav-item.Bedroom')), 0).then((element) => {
            element.insertAdjacentHTML('afterend', storageCategoryHTML);
        });

        document.addEventListener('click', (e) => {
            const el = e.target;
            const storageNavItem = document.querySelector('.top-nav-item.Storage');
            const storageMenu = storageNavItem?.querySelector('ul');
            const mainMenu = document.querySelector('.off-canvas-content .top-nav-wrap .menu-wrapper .top-nav-menu');

            if (el.closest('.top-nav-item.Storage .top-nav-item-link')) {
                mainMenu?.classList.add('invisible');
                storageMenu?.classList.remove('invisible');
                storageMenu?.classList.add('is-active', 'visible');
            }

            if (el.closest('.top-nav-item.Storage .js-drilldown-back')) {
                mainMenu?.classList.remove('invisible');
                storageMenu?.classList.add('invisible');
                storageMenu?.classList.remove('is-active', 'visible');
            }

            if (el.closest('.menu-wrapper .Storage .top-nav-item-link')) {
                if (!document.querySelector('.menu-wrapper .top-nav-item.Storage .header-title')) {
                    document.querySelector('.menu-wrapper .top-nav-item.Storage .js-drilldown-back a').innerHTML = subCategoryHeader;
                }
            }
        });

    };

    window[tag].variation = "variation-1";
    window[tag].init();
})(window);