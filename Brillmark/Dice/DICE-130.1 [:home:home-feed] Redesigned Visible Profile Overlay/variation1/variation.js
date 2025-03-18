(()=> {

	const feList = `
	<p class="fe-list-text"><b>Don’t miss your dream job.</b> Employers don’t always post their open opportunities, but they’re always looking for tech professionals with a unique skill set.</p>
	<p class="fe-list-text fe-list-text-desktop"><b>Keeping your information secure.</b> When you become visible, we replace your personal email address with a Dice-generated address that routes messages to your normal inbox, giving you control over when you share your personal email address. <a href="https://www.dice.com/support/candidate/candidate-profile/profile---private-email.html" class="fe-link" target="_blank">Learn more</a> about our privacy protections.</p>
	<p class="fe-list-text fe-list-text-mobile"><b>Keeping your information secure.</b> <a href="https://www.dice.com/support/candidate/candidate-profile/profile---private-email.html" class="fe-link" target="_blank">Learn more</a> about our privacy protections.</p>
	`;

	const activate = ()=> {
		document.body.classList.add("feDice130-variation1");

		document.querySelector('.fe-popup70 h2.fe-heading').innerHTML = `Employers are looking for tech professionals like you!`;
		document.querySelector('.fe-popup70 .fe-subheading').innerHTML = `Make your profile visible to actively searching employers.`;
		document.querySelector('.fe-popup70 .fe-subheading.fe-subheading-mobile').innerHTML = `Make your profile visible to actively searching employers.`;
		document.querySelector('.fe-popup70 .fe-list').innerHTML = feList;

	};

	const pollerLite = (conditions, callback, maxTime) => {
		if (maxTime === void 0) {
			maxTime = 20000;
		}
		const POLLING_INTERVAL = 500;
		const startTime = Date.now();
		const interval = setInterval(() => {
			const allConditionsMet = conditions.every((condition) => {
				if (typeof condition === "function") {
					return condition();
				}
				return !!document.querySelector(condition);
			});
			if (allConditionsMet) {
				clearInterval(interval);
				callback();
			} else if (Date.now() - startTime >= maxTime) {
				clearInterval(interval);
				console.log("Polling exceeded maximum time limit");
			}
		}, POLLING_INTERVAL);
	};

	pollerLite(['.fe-popup70 .fe-list'], activate);

})();