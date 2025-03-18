((w) => {
	"use strict";

	const tag = 'cv-5-18';
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const qa = document.cookie.indexOf('cfQA') > -1;
	const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 5.18 |') : () => { };

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
		document.addEventListener('click', (e) => {
			const elem = e.target;
			if (elem.closest('.related-research .view-more')) {
				elem.closest('.related-research .view-more').classList.toggle(`${tag}__toggle`);
			}
		})
	}

	utils.init();
})(window);