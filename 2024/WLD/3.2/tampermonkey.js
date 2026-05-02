// ==UserScript==
// @name         WLD #.# variation-[var-num]
// @author       <name>

// @match        https://www.wearewild.com/

// @resource     cssS file:///Users/ashleynibloe/Documents/Git/experiments/WLD/#.#/shared.css
// @resource     cssV file:///Users/ashleynibloe/Documents/Git/experiments/WLD/#.#/variation-[var-num].css
// @resource     jsS file:///Users/ashleynibloe/Documents/Git/experiments/WLD/#.#/shared.js
// @resource     jsV file:///Users/ashleynibloe/Documents/Git/experiments/WLD/#.#/variation-[var-num].js

// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

((w) => {
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;

	let isTimedOut;

	const timeout = setTimeout(() => {
		isTimedOut = true;
	}, 5000);

	const checkForPrereqs = () => {
		try {
			const prereqs = typeof window["cv-pjs"] !== "undefined";

			if (isTimedOut) return;
			else if (!prereqs) window.requestAnimationFrame(checkForPrereqs);
			else {
				clearTimeout(timeout);

				const newScript = document.createElement("script");
				const cssShared = GM_getResourceText("cssS");
				const cssVariation = GM_getResourceText("cssV");

				GM_addStyle(cssShared);
				GM_addStyle(cssVariation);

				newScript.textContent = GM_getResourceText("jsS") + GM_getResourceText("jsV");
				document.head.insertAdjacentElement("beforeend", newScript);
			}
		} catch (err) {
			console.log(`[CONV] TM: ${err}`);
		}
	};

	window.requestAnimationFrame(checkForPrereqs);
})(window);
