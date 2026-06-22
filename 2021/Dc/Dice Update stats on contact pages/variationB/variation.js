(() => {
	try {
		/* Main variables */
		const waitForElement = (selector, trigger, delayInterval, delayTimeout) => {
			const interval = setInterval(() => {
				if (document &&
					document.querySelector(selector) &&
					document.querySelectorAll(selector).length > 0) {
					clearInterval(interval);
					trigger();
				}
			}, delayInterval);
			setTimeout(() => {
				clearInterval(interval);
			}, delayTimeout);
		};

		const pathname = window.location.pathname;

		const targetedURL = [
			'/hiring/contact-us/',
			'/hiring/contact-us',
			'/hiring/contact-us/webstore/',
			'/hiring/contact-us/webstore',
			'/hiring/contact-us/homepage',
			'/hiring/contact-us/homepage/',
			'/hiring/contact-us/homepage-banner',
			'/hiring/contact-us/homepage-banner/',
		];

		const stats = [
			'The Dice community is expansive, diverse and growing, with more than <strong>6.5M</strong> members, and over <strong>60K</strong> new members per month.',
			'<strong>46%</strong> of active tech professionals on Dice are not actively searching for jobs on sites like LinkedIn, Indeed, Monster, ZipRecruiter and CareerBuilder.',
			'<strong>1.4M</strong> job applications per month are submitted on Dice.'
		];

		/* Variation Init */
		const updateStats = () => {
			const fePara = document.querySelectorAll('.contactUs-left .ad-row-wrapper > .align-left > div > p');
			fePara.forEach((para, i) => {
				para.innerHTML = stats[i];
			});
		};

		/* Initialize variation */
		if (targetedURL.includes(pathname)) {
			waitForElement(".contactUs-left .ad-row-wrapper > .align-left > div > p", updateStats, 50, 35000);
		}
	} catch (e) {
		console.log(e, "error in Dice Update Stats on Contact Pages");
	}
})();