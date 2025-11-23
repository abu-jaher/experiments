((w) => {
	"use strict";

	const tag = "cv-12-0";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;

	if (!!window[tag]) return;

	let debug = document.cookie.includes("cfQA") || window.location.search.includes("cfQA");

	const utils = {
		// Send metric event to Amplitude
		sendEvt: (obj, expTag = tag) => {
			utils.waitUntil(
				() => typeof window.dataLayer !== "undefined" && typeof window.dataLayer.push !== "undefined",

				() => {
					dataLayer.push(obj);

					utils.log(`metric event (Amplitude): \n-- params = ${JSON.stringify(obj, 0, 2)}`, expTag);
				},

				expTag
			);
		},

		// Retrieves the CDN URL where we host images and other assets
		getCDN: (tag) => {
			if (!tag) return;

			return `https://d1mgcpums0qvsa.cloudfront.net/DEE/${tag.replaceAll("cv-", "").replaceAll("-", ".")}`;
		},

		// Log to the console, only in debug mode
		log: (msg, expTag = tag) => {
			!!debug && console.log(`[CONV] ${expTag} -->`, msg);
		},

		// Wait until a certain condition is true, or a certain element is present in the DOM
		waitUntil: (cond, cb, expTag = tag, timeout = 5000) => {
			let stop;

			const timer = setTimeout(() => {
				stop = true;
			}, timeout);

			const end = () => {
				clearTimeout(timer);
				stop = true;
			};

			const check = () => {
				try {
					const eCached = typeof cond === "string" ? document.querySelector(cond) : undefined;
					const condSuccess = typeof cond === "function" ? cond() : undefined;

					if (stop) {
						return;
					} else if (eCached) {
						cb(eCached);
						end();
					} else if (condSuccess) {
						cb();
						end();
					}

					window.requestAnimationFrame(check);
				} catch (err) {
					utils.log(err, expTag);
				}
			};

			window.requestAnimationFrame(check);
		},

		// Reapply changes if they are undone by the frontend engine
		apply: (cond, cb, expTag = tag, timeout = 5000) => {
			let stop;

			const timer = setTimeout(() => {
				stop = true;
			}, timeout);

			const check = () => {
				try {
					const success = cond();

					if (stop) return;
					else if (!success) cb();

					window.requestAnimationFrame(check);
				} catch (err) {
					utils.log(err, expTag);
				}
			};

			window.requestAnimationFrame(check);
		},

		// Observe the dataLayer for events being pushed
		observeDataLayer: (cb) => {
			utils.waitUntil(
				() => typeof window.dataLayer !== "undefined" && typeof window.dataLayer.push !== "undefined",

				() => {
					// Check existing items in datalayer
					window.dataLayer.forEach((dlItem) => {
						cb(dlItem);
					});

					// Check new items pushed to datalayer
					const getPushData = window.dataLayer.push;

					window.dataLayer.push = function (dlItem) {
						try {
							getPushData.apply(this, arguments);

							cb(dlItem);
						} catch (err) {
							utils.log(err);
						}
					};
				},

				tag
			);
		},

		// Attach an event listener to the document; used when elements aren't necessarily in the DOM yet
		on: (action, sel, cb) => {
			document.addEventListener(action, (e) => {
				try {
					let eTarget = e.target;

					if (eTarget && eTarget.matches && eTarget.matches(sel)) {
						cb(e);
					} else {
						for (; eTarget && eTarget.parentNode !== document.documentElement;) {
							if (!(eTarget = eTarget.parentNode)) return;

							eTarget.matches(sel) && cb(e);
						}
					}
				} catch (err) {
					utils.log(err);
				}
			});
		},

		// Calculate if an element is in the viewport
		isInViewport: (el) => {
			const rect = el.getBoundingClientRect();

			if (!el || !rect.height) return;

			const windowHeight = window.innerHeight || document.documentElement.clientHeight;
			const windowWidth = window.innerWidth || document.documentElement.clientWidth;
			const isVertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
			const isHorInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

			return isVertInView && isHorInView;
		},

		// Create a cookie, mostly for debug mode
		createCookie: (name, value, expiry = "") => {
			if (!!expiry) {
				const now = new Date();

				now.setTime(now.getTime() + expiry * 24 * 60 * 60 * 1000);

				expiry = `expires=${now.toGMTString()}`;
			}

			document.cookie = `${name}=${value};domain=.deel.com;path=/;secure;${expiry}`;
		},

		// Read the contents of a given cookie
		readCookie: (name) => {
			const cookie = document.cookie.split("; ").find((row) => row.startsWith(name));

			if (cookie) return cookie.split("=")[1];
		},

		// Deletes a given cookie
		deleteCookie: (name) => {
			document.cookie = `${name}=;domain=.deel.com;path=/;secure;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
		},
	};

	const exp = (window[tag] = {
		init: () => {
			try {
				utils.apply(
					() => !document.querySelector(`body:not(.${tag})`),

					() => {
						document.body.classList.add(`${tag}`);

						const cfQaValue = new URLSearchParams(window.location.search).get("cfQA");

						// Enable debug mode when cfQA is present in the URL
						if (!!cfQaValue) {
							if (cfQaValue === "false") {
								utils.deleteCookie("cfQA");
								utils.log("QA mode disabled");

								debug = false;
							} else {
								utils.createCookie("cfQA", cfQaValue);
								utils.log(`QA mode enabled: ${cfQaValue}`);
							}
						}

						// Quickly tell when debug mode is active
						if (!!debug && !document.title.includes("CONV QA")) {
							document.title = `[CONV QA] ${document.title}`;
						}
					},

					tag,
					15000
				);

				exp.initVariation();
				exp.initTracking();

				utils.log(`${exp.variation} is running`, tag);
			} catch (err) {
				utils.log(err, tag);
			}
		},

		initTracking: () => { },
	});

	exp.initVariation = () => {
		if (window.location.pathname === "/payroll/peo/") {
			utils.sendEvt({ "event": "interaction", "event_product": "Website", "event_action": "Pageview", "event_name": "[CONV] [12.0] User views PEO page", }, tag);
		}

		utils.apply(
			() => {
				const nav = document.querySelector("header nav");
				const promoBanner = document.querySelector(`.${tag}__banner`);
				if (nav && !promoBanner) return false;
				return true;
			},

			() => {
				utils.waitUntil(() => document.querySelector("#top-banner"), () => {
					const banners = document.querySelectorAll("#top-banner");
					if (banners.length > 1) {
						banners[0].style.display = "none";
					}
				}, tag, 5000)

				document.querySelector(`header nav`).insertAdjacentHTML(`beforebegin`, cv_banner);

				const banner = document.querySelector(`#${tag}__promoBanner`);
				const countdownEl = document.querySelector(`#${tag}__countdown`);
				const closeBtn = document.querySelector(`#${tag}__closeBanner`);
				const CTA_URL = "https://www.deel.com/payroll/peo";
				const END_TIME = new Date("2025-10-31T23:59:59-07:00");
				const HIDE_KEY = "cv__BannerDismissed";

				if (localStorage.getItem(HIDE_KEY)) {
					banner.classList.add("hidden");
				}

				const updateCountdown = () => {
					const now = new Date();
					const diff = END_TIME - now;

					if (diff <= 0) {
						banner.classList.add("hidden");
						return;
					}

					const days = Math.floor(diff / (1000 * 60 * 60 * 24));
					const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
					const minutes = Math.floor((diff / (1000 * 60)) % 60);
					const seconds = Math.floor((diff / 1000) % 60);

					if (days === 0) {
						if(hours == 0){
							banner.classList.add("hidden");
							return;
						}
						
						countdownEl.innerHTML = `
						<div class="${tag}__time-box"><span>Hours</span>${hours}</div>
						<div class="${tag}__time-box"><span>Minutes</span>${minutes}</div>
						<div class="${tag}__time-box"><span>Seconds</span>${seconds}</div>
					`;
					} else {
						countdownEl.innerHTML = `
						<div class="${tag}__time-box"><span>Days</span>${days}</div>
						<div class="${tag}__time-box"><span>Hours</span>${hours}</div>
						<div class="${tag}__time-box"><span>Minutes</span>${minutes}</div>
						<div class="${tag}__time-box"><span>Seconds</span>${seconds}</div>
					`;
					}
				}

				setInterval(updateCountdown, 1000);
				updateCountdown();

				banner.addEventListener("click", (e) => {
					if (!e.target.classList.contains(`${tag}__close-btn`)) {
						window.open(CTA_URL, "_self");
						localStorage.setItem(HIDE_KEY, true);
						banner.classList.add("hidden");
						utils.sendEvt({ "event": "interaction", "event_product": "Website", "event_action": "CTA Click", "event_name": "[CONV] [12.0] User clicks CTA", }, tag);
					}
				});

				closeBtn.addEventListener("click", (e) => {
					e.stopPropagation();
					localStorage.setItem(HIDE_KEY, true);
					banner.classList.add("hidden");
				});
			},

			tag,
			1200000
		);

		const cv_banner = `
			<div class="${tag}__banner" id="${tag}__promoBanner">
				<div class="${tag}__banner-content">
					<span id="${tag}__bannerText">Limited time offer! <span class="desktop">Get</span> 3 free months of Deel PEO <br><span class="mobile">Claim offer today</span></span>
					<div class="${tag}__countdown" id="${tag}__countdown"></div>
					<div class="${tag}__cta">Claim offer today</div>
				</div>
				<div class="${tag}__close-btn" id="${tag}__closeBanner">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="black"/>
					</svg>
				</div>
			</div>
		`;
	};

	exp.variation = "variation-1";
	exp.init();
})(window);