((w) => {
    "use strict";

    const tag = 'cv-9-0';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 9.0 |') : () => { };

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

    const initVariation = () => {
        utils.waitUntil(() => document.querySelector('.top-nav-new-content-alert'), 0).then((element) => {
            const alertModule = element.closest(`.hnm--menu .hnm--item`);
            const list = alertModule.querySelector('ul');

            alertModule.classList.add(`${tag}-alertModule`);

            list.insertAdjacentHTML('afterbegin', `
				<li class='${tag}-list'>
					<span class='strong'>Subscribe to updates</span>
					<br>
					Receive updates on the latest work from this journal as it's published
				</li>
			`);

            [...list.children].forEach(element => {
                element.innerHTML = element.innerHTML.replace('New content alerts', 'Email content alerts');
                element.innerHTML = element.innerHTML.replace('RSS', 'RSS feed');
            });

            utils.waitUntil(() => alertModule.querySelector('.top-nav-click-subscribe'), 0).then((subscribeLink) => {
                subscribeLink.innerHTML = `Journal subscription options & pricing`;
            })
        });
    }

    utils.init();
})(window);