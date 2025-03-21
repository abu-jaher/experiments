((w) => {
    "use strict";

    const tag = "cv-1-4";
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const utils = window["conv"].utils;

    window[tag] = window[tag] || {
        init: () => {
            try {
                utils.waitUntil((() => document.body), 0).then((body) => {
                    body.classList.add(tag);
                    window[tag].initVariation();
                    window[tag].eventListener();
                });
                console.log(`${window[tag].variation} is running`, tag);
            } catch (err) {
                console.log(err, tag);
            }
        },
    };

    if (window[tag].variation) return;

    const klarnaLogo = `
        <svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" fill="#FEB4C7"/>
        <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" stroke="#F9F7F6"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.26922 15.3796H3.88574V9H5.26922V15.3796ZM8.72318 9H7.36971C7.36971 10.174 6.85968 11.2516 5.97043 11.9565L5.43421 12.3815L7.51189 15.3799H9.22015L7.3084 12.6209C8.2146 11.666 8.72318 10.3811 8.72318 9ZM10.9298 15.3779H9.6233V9.00122H10.9298V15.3779ZM14.8773 10.9669V11.2491C14.5247 10.9945 14.0992 10.845 13.6403 10.845C12.4257 10.845 11.441 11.887 11.441 13.1725C11.441 14.4579 12.4257 15.5 13.6403 15.5C14.0992 15.5 14.5247 15.3504 14.8773 15.096V15.3779H16.1252V10.9669H14.8773ZM14.8735 13.1725C14.8735 13.7993 14.3672 14.3074 13.7427 14.3074C13.1183 14.3074 12.612 13.7993 12.612 13.1725C12.612 12.5457 13.1183 12.0377 13.7427 12.0377C14.3672 12.0377 14.8735 12.5457 14.8735 13.1725ZM28.0424 11.2491V10.9669H29.2902V15.3779H28.0424V15.096C27.6898 15.3504 27.2643 15.5 26.8053 15.5C25.5907 15.5 24.606 14.4579 24.606 13.1725C24.606 11.887 25.5907 10.845 26.8053 10.845C27.2643 10.845 27.6898 10.9945 28.0424 11.2491ZM26.9078 14.3074C27.5323 14.3074 28.0385 13.7993 28.0385 13.1725C28.0385 12.5457 27.5323 12.0377 26.9078 12.0377C26.2833 12.0377 25.7771 12.5457 25.7771 13.1725C25.7771 13.7993 26.2833 14.3074 26.9078 14.3074ZM29.8318 14.6421C29.8318 14.1844 30.1824 13.8134 30.6149 13.8134C31.0473 13.8134 31.398 14.1844 31.398 14.6421C31.398 15.0998 31.0473 15.4709 30.6149 15.4709C30.1824 15.4709 29.8318 15.0998 29.8318 14.6421ZM22.3885 10.8482C21.89 10.8482 21.4183 11.012 21.1029 11.4639V10.9671H19.8604V15.3779H21.1181V13.0599C21.1181 12.3891 21.5432 12.0607 22.0549 12.0607C22.6033 12.0607 22.9186 12.4074 22.9186 13.0508V15.3779H24.165V12.5728C24.165 11.5463 23.3938 10.8482 22.3885 10.8482ZM18.0556 10.967V11.5415C18.3058 11.1969 18.7719 10.9672 19.2786 10.9672V12.2507L19.2717 12.2505L19.2638 12.2502C18.7701 12.2502 18.0585 12.6237 18.0585 13.3185V15.3779H16.778V10.967H18.0556Z" fill="#17120F"/>
        </svg>
    `;

    window[tag].initVariation = () => {
        utils.waitUntil((() => document.querySelector(`#purchase-info #add-to-basket-fixed-anchor, .add-to-basket #button-wrapper`)), 0).then((element) => {

            const priceElement = document.querySelector('#purchase-info .main-price span, #prices .main-price') || document.querySelector('#purchase-info .main-price')
            const result = priceElement && window[tag].isPriceLessThan499(priceElement);

            if (result && result.isBelow499) {
                const klarnaWidget = `
                    <div class="${tag}__klarna-widget">
                        <p>3 payments of ${result.installmentPrice} with ${klarnaLogo} 18+ T&C apply,</p>
                        <p>Credit subject to status. <a target="_blank" href="https://www.klarna.com/uk/buyer-protection-description/">Learn more</a></p>
                    </div>
                `;

                const pdp1InsertionElement = document.querySelector(`#purchase-info .finance-message`)?.parentElement;
                const pdp1MobileElement = document.querySelector(`.product-display-default-partial-accordion .finance-message`)?.parentElement;

                pdp1InsertionElement?.classList.add(`${tag}__hide`);
                pdp1MobileElement?.classList.add(`${tag}__hide`);
                pdp1InsertionElement?.insertAdjacentHTML(`beforebegin`, klarnaWidget);

                const pdp2InsertionElement = document.querySelector(`#add-to-basket-form`);
                pdp2InsertionElement?.insertAdjacentHTML(`afterend`, klarnaWidget);
            }

        });
    };


    window[tag].isPriceLessThan499 = (element) => {
        const priceText = element.textContent;
        const priceValue = parseFloat(priceText.replace('£', '').replace(',', ''));
        const installmentValue = Math.floor((priceValue * 100) / 3) / 100;
        const installmentPrice = `£${installmentValue.toFixed(2)}`;
        const isBelow499 = priceValue < 499;

        return { isBelow499, installmentPrice };
    }

    window[tag].eventListener = () => {
        document.addEventListener(`click`, (e) => {
            const el = e.target;

            if (el.closest(`.cv-1-4__klarna-widget p a`)) {
                Kameleoon.API.Goals.processConversion(368998)
            }
        })
    }

    window[tag].variation = "variation-1";
    window[tag].init();
})(window);