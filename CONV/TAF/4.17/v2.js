((w) => {
	"use strict";

	const tag = 'cv-4-17';
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const qa = document.cookie.indexOf('cfQA') > -1;
	const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 4.17 |') : () => { };
	let pageSize = 10;

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

		init: function () {
			try {
				utils.waitUntil(() => document.body, 0).then((docBody) => {
					docBody.classList.add(tag);
				});

				initVariation();

				log('v2 running');
			} catch (err) {
				log(err.message);
			}
		},
	}

	const getCoverImg = (url) => {
		fetch(url)
			.then(response => response.text())
			.then(html => {
				const parser = new DOMParser();
				const doc = parser.parseFromString(html, 'text/html');
				const imageElement = doc.querySelector('.journal .cover img');
				document.querySelector(`.sourceArticle .${tag}__cover`).insertAdjacentHTML('afterbegin', `<img src="${imageElement ? imageElement.src : ''}">`);
			})
			.catch(error => console.error('Error fetching the page:', error));
	}

	const initVariation = () => {
		utils.waitUntil(() => document.querySelector('.sourceArticle .article-card .header a'), 0).then((element) => {
			document.querySelector('.sourceArticle .article-card').insertAdjacentHTML('afterbegin', `<div class="${tag}__cover"></div>`);
			const getUrl = element.getAttribute('href');
			getCoverImg(getUrl);
		});

		utils.waitUntil(() => document.querySelector('.newSearchResults .paginationLinkContainer'), 0).then((element) => {
			insertShowMoreBtn();
		});

		document.addEventListener('click', (e) => {
			const el = e.target;

			if (el.closest(`.${tag}__show-btn-wrapper button`)) {
				e.preventDefault();
				e.stopImmediatePropagation();
				showMoreBtnFn(pageSize);
				const ctaPosition = window.scrollY;
				const interval = setInterval(() => {
					if(ctaPosition !== window.scrollY){
						window.scrollTo(0, ctaPosition);
					}
				}, 100);
		
				setTimeout(() => {
					clearInterval(interval);
				}, 2000);
			}

			if (el.closest('.sourceArticle .article-card img')) {
				document.querySelector('.sourceArticle .article-card .header a').click();
			}
		});

		listener();

	}

	const showMoreBtnFn = (pageSize)=>{
		if (location.href.indexOf('pageSize') == -1) {
			pageSize = 20;
			const newUrl = `${location.pathname}?startPage=&pageSize=${pageSize}`;
			document.querySelector('#sort-options li a').setAttribute('href', newUrl);
			document.querySelector('#sort-options li a').click();
		} else {
			const url = new URL(window.location.href);
			pageSize = parseInt(url.searchParams.get('pageSize'));
			pageSize += 10;
			url.searchParams.set('pageSize', pageSize);
			document.querySelector('#sort-options li a').setAttribute('href', url);
			document.querySelector('#sort-options li a').click();
		}

		insertShowMoreBtn();
	}

	const insertShowMoreBtn = ()=>{
		const interval = setInterval(() => {
			if(location.href.indexOf('pageSize') > -1){
				clearInterval();
				return;
			}
			!document.querySelector(`.${tag}__show-btn-wrapper`) && document.querySelector('.newSearchResults .paginationLinkContainer').insertAdjacentHTML('afterend', `
				<div class="${tag}__show-btn-wrapper">
					<button>Show more</button>
				</div>
			`);
		}, 500);

		setTimeout(() => {
			clearInterval(interval);
		}, 5000);
	}

	const listener = () => {
		/* These are the modifications: */
		window.addEventListener("locationchange", () => {
			insertShowMoreBtn();
		});

		history.pushState = ((originalPushState) =>
			function pushState(...args) {
				const result = originalPushState.apply(this, args);
				window.dispatchEvent(new Event("pushstate"));
				window.dispatchEvent(new Event("locationchange"));
				return result;
			}
		)(history.pushState);

		history.replaceState = ((originalReplaceState) =>
			function replaceState(...args) {
				const result = originalReplaceState.apply(this, args);
				window.dispatchEvent(new Event("replacestate"));
				window.dispatchEvent(new Event("locationchange"));
				return result;
			}
		)(history.replaceState);

		window.addEventListener("popstate", () => {
			window.dispatchEvent(new Event("locationchange"));
		});
	};

	setTimeout(() => {
		document.body.style.opacity = 1;
	}, 3000)

	utils.init();
})(window);