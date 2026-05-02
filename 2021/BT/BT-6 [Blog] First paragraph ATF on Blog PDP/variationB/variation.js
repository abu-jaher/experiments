(function () {

	const shared = {
		ID: "BT-006",
		VARIATION: "1",
		CLIENT: "bonterra"
	};

	const { ID, VARIATION } = shared;
	const setup = () => {
		document.documentElement.classList.add(ID);
		document.documentElement.classList.add(`${ID}-${VARIATION}`);
	};

	const activate = () => {
		setup();
	};

	const pollerLite = (conditions, callback, maxTime = 10000) => {
		const POLLING_INTERVAL = 25;
		const startTime = Date.now();
		const interval = setInterval(() => {
			const allConditionsMet = conditions.every((condition) => {
				if (typeof condition === 'function') {
					return condition();
				}
				return !!document.querySelector(condition);
			});
			if (allConditionsMet) {
				clearInterval(interval);
				callback();
			} else if (Date.now() - startTime >= maxTime) {
				clearInterval(interval);
				console.log('Polling exceeded maximum time limit');
			}
		}, POLLING_INTERVAL);
	};

	pollerLite(['.blogauthorsection'], activate);

})();