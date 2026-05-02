((w) => {
	"use strict";

	const tag = "cv-12-0";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;

	if (!!window[tag]) return;

	let debug = document.cookie.includes("cfQA") || window.location.search.includes("cfQA");

	const utils = {
		// Log to the console, only in debug mode
		log: (msg, expTag = tag) => {
			!!debug && console.log(`[CONV] ${expTag} -->`, msg);
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

		// Create a cookie, mostly for debug mode
		createCookie: (name, value, expiry = "") => {
			if (!!expiry) {
				const now = new Date();

				now.setTime(now.getTime() + expiry * 24 * 60 * 60 * 1000);

				expiry = `expires=${now.toGMTString()}`;
			}

			document.cookie = `${name}=${value};domain=.deel.com;path=/;secure;${expiry}`;
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
	};

	exp.variation = "control";
	exp.init();
})(window);