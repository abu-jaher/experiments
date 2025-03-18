(() => {
    try {
        const shared = {
            ID: "FE",
            VARIATION: "312",
            CLIENT: "Funnelenvy"
        };

        const ID = shared.ID;
        const VARIATION = shared.VARIATION;

        const setup = () => {
            document.body.classList.add(ID + "-" + VARIATION);
        };

        const playIcon = `
            <span class="svg-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-labelledby="field-icon-svg-title-0"><title id="field-icon-svg-title-0">Icon filled Play 20x20</title><g clip-path="url(#clip0_709_2835)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2384 13.8278C19.7412 12.6143 20 11.3136 20 10C20 8.68643 19.7412 7.38574 19.2384 6.17221C18.7356 4.95869 17.9986 3.85611 17.0696 2.92747C16.1406 1.99883 15.0377 1.26232 13.824 0.760018C12.6102 0.257715 11.3094 -0.000541835 9.99586 8.5351e-07C7.3443 0.00073325 4.80161 1.05467 2.92706 2.92999C1.05251 4.80532 -0.000365693 7.34844 9.52791e-08 10C-0.000365693 12.6516 1.05251 15.1947 2.92706 17.07C4.80161 18.9453 7.3443 19.9993 9.99586 20C11.3094 20.0005 12.6102 19.7423 13.824 19.24C15.0377 18.7377 16.1406 18.0012 17.0696 17.0725C17.9986 16.1439 18.7356 15.0413 19.2384 13.8278ZM7.12096 6.88971V13.041C7.1238 13.2018 7.1681 13.3591 7.2496 13.4976C7.33109 13.6362 7.44701 13.7514 7.58611 13.832C7.72521 13.9126 7.88277 13.9559 8.04353 13.9577C8.20428 13.9595 8.36277 13.9198 8.50365 13.8423L14.0417 10.7618C14.1873 10.6813 14.3087 10.5633 14.3933 10.42C14.4778 10.2767 14.5224 10.1134 14.5224 9.94704C14.5224 9.78067 14.4778 9.61737 14.3933 9.47408C14.3087 9.3308 14.1873 9.21278 14.0417 9.13233L8.50609 6.07622C8.36435 5.99693 8.20433 5.95613 8.04193 5.95783C7.87953 5.95954 7.7204 6.00369 7.58035 6.08594C7.44031 6.16819 7.32422 6.28567 7.24363 6.42668C7.16304 6.56768 7.12076 6.7273 7.12096 6.88971Z" fill="white"></path></g><defs><clipPath id="clip0_709_2835"><rect width="20" height="20" fill="white"></rect></clipPath></defs>
                </svg>
            </span>
        `

        const activate = () => {
            setup();

            document.querySelector('.hero--copy .button-primary[href*="demo"],.hero--copy .button-primary[href*="youtube"]').insertAdjacentHTML("afterbegin",playIcon);
            observeElement('.cta-module .button-primary[href*="demo"]', ()=>{
                document.querySelector('.cta-module .button-primary[href*="demo"]').insertAdjacentHTML("afterbegin",playIcon);
            });
        };

        const observeElement = (selector, callback) => {
            const targetNode = document.querySelector(selector);
            if (targetNode) {
                callback();
                return;
            }

            const observer = new MutationObserver((mutations, obs) => {
                if (document.querySelector(selector)) {
                    callback();
                    obs.disconnect();
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
        };

        observeElement('.hero--copy .button-primary', activate);

    } catch (e) {
        console.log(e, 'Error in Box-312 v1')
    }
})();