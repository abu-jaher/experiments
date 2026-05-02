((w) => {
	"use strict";

	const tag = 'cv-2-24';
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const qa = document.cookie.indexOf('cfQA') > -1;
	const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 2.24 |') : () => { };

	const utils = {
		waitForElement: (cssSelector, callback) => {
			var stop,
				elementCached,
				timeout,
				check = () => {
					try {
						elementCached = document.querySelector(cssSelector);

						if (stop) return;

						if (elementCached) {
							callback(elementCached);
							clearTimeout(timeout);
						} else {
							window.requestAnimationFrame(check);
						}
					} catch (err) {
						log(err.message);
					}
				};

			window.requestAnimationFrame(check);

			timeout = setTimeout(() => {
				stop = true;
			}, 5000);
		},
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

		emitGAEvent: (label) => {
			let trackingID = 'UA-3062505-5';
			let stop;

			const check = () => {
				if (stop) return;

				if (!(
					window.ga instanceof Function &&
					window.ga.getAll instanceof Function
				)) return requestAnimationFrame(check);

				stop = true;

				const properties = window.ga.getAll();

				let analytics;

				if (trackingID)
					analytics = properties.find(
						property =>
							property.get('trackingId') === trackingID
					);

				analytics = analytics ? analytics : properties[0];

				if (analytics) analytics.send(
					'event',
					'Google Optimize experiment',
					'[CONV] TAF 2.24',
					label, { nonInteraction: true }
				);
			};
			requestAnimationFrame(check);
		},

		init: function () {
			try {
				this.waitUntil(() => document.body, 0).then((docBody) => {
					docBody.classList.add(tag, `${tag}__desktop`);
					initVariationDesktop();
				});

				log('test running');
			} catch (err) {
				log(err.message);
			}
		},
	}

	const initVariationDesktop = () => {
		utils.waitForElement('.scroll-content li a', () => {
			const stickyTab = document.querySelector(`.scroll-content`).cloneNode(true);
			document.querySelector(`.publicationContentBody`).insertAdjacentElement('afterbegin', stickyTab);
			document.querySelector(`#full-article`) ? document.querySelector(`#full-article`).innerHTML = `Full article` : '';

			const shareSocialString = `<a class="${tag}__share-social" href="javascript:void(0)">
				<i class="fas fa-share-alt share-icon" aria-hidden="true"></i>
				<span>Share</span>
			</a>
			`

			if (!document.querySelector(`.${tag}__share-social`)) {
				if (document.querySelector('.publicationContentBody .tab-nav li.pdf-tab')) {
					document.querySelector('.publicationContentBody .tab-nav li.pdf-tab').insertAdjacentHTML('beforeend', shareSocialString)
				} else {
					document.querySelector('.publicationContentBody .tab-nav').insertAdjacentHTML('beforeend',
						`
						<li class="pdf-tab epub-tab ${tag}__custom-tab" role="presentation">
							${shareSocialString}
						</li>
						`
					)
				}
			}

			const readArticle = document.querySelector('.publicationContentBody .scroll-content .tab-nav li a[role="button"].grant-access');
			if (readArticle) {
				const readArticleClone = readArticle.cloneNode(true);
				document.querySelector('.publicationContentBody .tab-nav li.pdf-tab').insertAdjacentElement('afterbegin', readArticleClone);
			}
		})

		document.addEventListener('click', (e) => {
			const elem = e.target;

			if (elem.closest(`.${tag}__share-social`)) {
				document.querySelector('.a2a_dd').click();
			}

		})
	}

	setTimeout(() => {
		document.body.style.opacity = 1;
	}, 3000)

	utils.init();
})(window);