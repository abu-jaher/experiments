(() => {
	try {
        const activityId = '${campaign.id}';
		const activityName = '${campaign.name}';
		const experienceId = '${campaign.recipe.id}';
		const experienceName = '${campaign.recipe.name}';

		window._mfq = window._mfq || [];
		window._mfq.push(["tag", "ACTIVITY_ID", activityId]);
		window._mfq.push(["tag", "ACTIVITY_NAME", activityName]);
		window._mfq.push(["tag", "EXPERIENCE_ID", experienceId]);
		window._mfq.push(["tag", "EXPERIENCE_NAME", experienceName]);
        
		const FEHelper = {
			onLoadElement: (selector, trigger, delayInterval, delayTimeout) => {
				const interval = setInterval(() => {
					if (
						document &&
						document.querySelectorAll(selector) &&
						document.querySelectorAll(selector).length > 0
					) {
						clearInterval(interval);
						trigger();
					}
				}, delayInterval);
				setTimeout(() => {
					clearInterval(interval);
				}, delayTimeout);
			}
		};


		const updateButtonUrl = () => {
			const cta = document.querySelectorAll("#pricing-plan-2 .pricing-package .pricing-package__buttons-wrapper a:not([href*='https://www.box.com/']), #pricing-plan-1 .pricing-package:not([data-formatter-id='pricing-plan-108696']) .pricing-package__buttons-wrapper a, .pricing-features__chart .pricing-features--plan-buttons a:not([href*='https://www.box.com/']), .pricing-features--sticky__container .pricing-features--plan-buttons a:not([href*='https://www.box.com/'])");
			for (let i = 0; i < cta.length; i++) {

				const tc = "|box-292-2-v0";
				const url = cta[i].href;
				if (url.indexOf('annual') > -1 || url.indexOf('monthly') > -1) {
					if (url.indexOf('box-292-2-v0') == -1){
						var referrer = url.concat(tc);
						cta[i].setAttribute("href", referrer);
					}
				}
			}
		}

		const init = () => {
			// updating button url 
			const interval = setInterval(() => {
				updateButtonUrl();
			}, 20);

			setTimeout(() => {
				clearInterval(interval)
			}, 5000);
			document.querySelector("div.pricing-toggle input[type='checkbox']").addEventListener("click", function () {
				// updating button url 
				setTimeout(() => {
					updateButtonUrl();
				}, 1000);
			});
		}

		FEHelper.onLoadElement('#pricing-plan-2 .pricing-package .pricing-package__buttons-wrapper a', init, 50, 10000);
	} catch (e) {
		console.log(e, "Error in Box-292.2 v0");
	}
})();