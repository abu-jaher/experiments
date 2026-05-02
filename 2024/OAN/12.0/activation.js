function callbackFn(activate, options) {
	const utils = window.optimizely.get("utils");

	utils
		.waitUntil(() => {
			return typeof window["cv-pjs"] !== "undefined";
		})
		.then(activate);
}