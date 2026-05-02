(() => {
	try {
		const shared = {
			ID: "FE",
			VARIATION: "13",
			CLIENT: "Funnelenvy"
		};

		const ID = shared.ID;
		const VARIATION = shared.VARIATION;

		const setup = () => {
			document.body.classList.add(ID + "-" + VARIATION);
		};

		const tooltipIcon = `
			<svg class="fe-tooltip-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="16" height="16">
				<circle cx="50" cy="50" r="48" stroke="#59BF22" stroke-width="4" fill="#59BF22"></circle>
				<text x="50%" y="53%" text-anchor="middle" fill="white" font-size="70" font-family="sans-serif" dy=".3em" noto="">?</text>
			</svg>
		`

		const moneyBillWave = `
	<svg class="money_bill_icon" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="56.99945px" height="35px" viewBox="0 0 56.99945 35" version="1.1">
  <g id="money-bill-wave-copy-2">
    <path d="M55.3201 1.75136C52.0339 0.561125 48.5073 -0.034082 44.9522 0.00150671C33.9802 0.00150671 23.0148 4.87097 12.045 4.87097C9.24814 4.89125 6.4646 4.5305 3.79389 3.80161C3.49575 3.71818 3.18474 3.67555 2.8718 3.67523C2.11428 3.66639 1.38426 3.92398 0.844724 4.39048C0.305189 4.85698 0.00106227 5.49355 0.000240412 6.15808L0.000240412 30.9419C-0.0146309 31.934 0.645096 32.8387 1.67818 33.2429C4.96344 34.4355 8.4898 35.0327 12.045 34.9986C23.017 34.9986 33.989 30.1282 44.9533 30.1282C47.7502 30.1079 50.5337 30.4687 53.2044 31.1975C53.5026 31.281 53.8136 31.3236 54.1265 31.3239C54.8846 31.333 55.6153 31.0753 56.1551 30.6083C56.6949 30.1414 56.999 29.5042 56.9992 28.8391L56.9992 4.05826C57.0154 3.06406 56.3551 2.1569 55.3201 1.75136ZM4.27488 7.83017C6.10873 8.21132 7.97839 8.44495 9.86063 8.52816C9.32918 10.8657 6.99229 12.5503 4.27488 12.5548L4.27488 7.83017ZM4.27488 30.0922L4.27488 26.3621C7.32515 26.3709 9.82649 28.4852 9.94929 31.1587C8.0117 31.0302 6.10287 30.6721 4.27488 30.0942L4.27488 30.0922ZM28.4986 24.9972C24.5631 24.9972 21.3735 21.6385 21.3735 17.4981C21.3735 13.3578 24.5631 9.99902 28.4986 9.99902C32.4341 9.99902 35.6237 13.3578 35.6237 17.5001C35.6237 21.6424 32.433 24.9992 28.4986 24.9992L28.4986 24.9972ZM52.7223 27.167C51.1324 26.8344 49.5147 26.614 47.8847 26.5079C48.4127 24.4595 50.3468 22.9204 52.7223 22.6582L52.7223 27.167ZM52.7223 8.72259C49.9411 8.41315 47.8315 6.37251 47.7517 3.91438C49.4475 4.06913 51.1162 4.40104 52.7223 4.90305L52.7223 8.72259Z" id="money-bill-wave" fill="#59BF22" stroke="none"/>
  </g>
</svg>
	`

		const tooltip = `
			<div class="fe-tooltip">
				${tooltipIcon}
				<span class="fe-show-txt" id="fe-show-txt"><p>With the Essentials Plan, we guarantee you'll raise more in your first year - or we'll refund you the difference.<br><br><a target="_blank" href="https://www.bonterratech.com/sites/default/files/2024-10/bonterra-fundraising-and-engagement-essentials-package-performance-guarantee.pdf">Terms and conditions apply</a></p></span>
			</div>
		`

		const moneyBackString = `
			<div class="${ID}__guarantee">
				<div class="">
					${moneyBillWave}
					<span>Match or exceed last year’s fundraising results - or we'll <br>refund you the difference ${tooltip}</span>
				</div>
			</div>
		`

		const activate = () => {
			setup();

			pollerLite([".sticky-menu-message p"], () => {

				document.body.insertAdjacentHTML("beforeend", '<div class="fe-overlay"></div>');

				document.querySelector(`.sticky-menu-message p`).innerHTML = `
					<span class="${ID}__desktop-copy">The only fundraising software that <span>guarantees</span> your nonprofit's success. <br>Get started now for year end! ${tooltip}</span>
					<span class="${ID}__mobile-copy">Your nonprofit’s <br>success, guaranteed. ${tooltip}</span>
				`;
			})

			pollerLite([".hero--high-level-page-hero .text-content"], () => {
				document.querySelector('.hero--high-level-page-hero .text-content').insertAdjacentHTML('afterbegin', moneyBackString);
			})

			document.addEventListener('click', (e) => {
				const el = e.target;

				if (el.closest('.fe-tooltip')) {
					el.closest('.fe-tooltip').classList.toggle("fe-tooltip-show");
				}else if(document.querySelector('.fe-tooltip.fe-tooltip-show')){
					document.querySelector('.fe-tooltip.fe-tooltip-show').classList.remove("fe-tooltip-show");
				}
			})

			window.addEventListener('scroll',()=>{
				document.querySelectorAll('.fe-tooltip').forEach((el)=>{
					el.classList.remove('fe-tooltip-show')
				})
			})
		};

		const pollerLite = (conditions, callback, maxTime) => {
			if (maxTime === void 0) { maxTime = 10000; }
			const POLLING_INTERVAL = 50;
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
				}
				else if (Date.now() - startTime >= maxTime) {
					clearInterval(interval);
					console.log('Polling exceeded maximum time limit');
				}
			}, POLLING_INTERVAL);
		};

		pollerLite(['body'], activate);

	} catch (error) {
		console.log('Error in BT-13 v1')
	}
})();