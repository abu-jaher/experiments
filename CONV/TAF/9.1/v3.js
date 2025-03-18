((w) => {
    "use strict";

    const tag = 'cv-9-1';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 9.1 |') : () => { };

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

                log('running v3');
            } catch (err) {
                log(err.message);
            }
        },
    }

    const initVariation = () => {
        utils.waitUntil(() => document.querySelector('.top-nav-new-content-alert'), 0).then((element) => {
            const alertModule = element.closest(`.hnm--menu .hnm--item`);
            const list = alertModule.querySelector('ul');

            alertModule.classList.add(`${tag}-alertModule`);

            alertModule.firstElementChild.innerHTML = alertModule.firstElementChild.innerHTML.replace('Alerts &amp; RSS feed', 'Follow this journal');

            [...list.children].forEach(element => {
                element.innerHTML = element.innerHTML.replace('New content alerts', 'Email content alerts');
                element.innerHTML = element.innerHTML.replace('RSS', 'RSS feed');
            });

            utils.waitUntil(() => document.querySelector('.jhp-twitterhandle'), 0).then((element) => {
                element.style.display = 'none';
                const getXhandle = element.getAttribute('href');

                list.insertAdjacentHTML('beforeend', `
                    <li class='${tag}-list'>
                        <a href="${getXhandle}" target="_blank">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_5989_175)">
                                <rect width="15" height="15" transform="translate(0.869141 0.5)" fill="#252988"/>
                                <path d="M9.76478 6.84822L15.226 0.5H13.9319L9.18989 6.01207L5.40249 0.5H1.03418L6.76147 8.83522L1.03418 15.4923H2.32838L7.33603 9.67137L11.3358 15.4923H15.7041L9.76446 6.84822H9.76478ZM7.99219 8.90866L7.41189 8.07866L2.79471 1.47426H4.78253L8.50865 6.80422L9.08895 7.63422L13.9325 14.5623H11.9446L7.99219 8.90897V8.90866Z" fill="white"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_5989_175">
                                <rect width="15" height="15" fill="white" transform="translate(0.869141 0.5)"/>
                                </clipPath>
                                </defs>
                            </svg>
                            Follow on X
                            <svg width="14" height="14" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.36914 0C7.9543 0 7.61914 0.335156 7.61914 0.75C7.61914 1.16484 7.9543 1.5 8.36914 1.5H10.3074L5.58945 6.22031C5.29648 6.51328 5.29648 6.98906 5.58945 7.28203C5.88242 7.575 6.3582 7.575 6.65117 7.28203L11.3691 2.56172V4.5C11.3691 4.91484 11.7043 5.25 12.1191 5.25C12.534 5.25 12.8691 4.91484 12.8691 4.5V0.75C12.8691 0.335156 12.534 0 12.1191 0H8.36914ZM2.74414 0.75C1.7082 0.75 0.869141 1.58906 0.869141 2.625V10.125C0.869141 11.1609 1.7082 12 2.74414 12H10.2441C11.2801 12 12.1191 11.1609 12.1191 10.125V7.5C12.1191 7.08516 11.784 6.75 11.3691 6.75C10.9543 6.75 10.6191 7.08516 10.6191 7.5V10.125C10.6191 10.3313 10.4504 10.5 10.2441 10.5H2.74414C2.53789 10.5 2.36914 10.3313 2.36914 10.125V2.625C2.36914 2.41875 2.53789 2.25 2.74414 2.25H5.36914C5.78398 2.25 6.11914 1.91484 6.11914 1.5C6.11914 1.08516 5.78398 0.75 5.36914 0.75H2.74414Z" fill="#10147E"/>
                            </svg>
                        </a>
                    </li>
                `);
            })
        });
    }

    utils.init();
})(window);