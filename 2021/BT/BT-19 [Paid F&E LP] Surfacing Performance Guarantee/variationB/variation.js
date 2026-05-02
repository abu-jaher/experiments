(() => {
	try {
		const shared = {
			ID: "FE",
			VARIATION: "BT-19",
			CLIENT: "Funnelenvy"
		};

		const { ID, VARIATION } = shared;

		const tooltipIcon = `
		<svg class="fe-tooltip-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="16" height="16">
			<circle cx="50" cy="50" r="48" stroke="#59BF22" stroke-width="4" fill="#59BF22"></circle>
			<text x="50%" y="53%" text-anchor="middle" fill="white" font-size="70" font-family="sans-serif" dy=".3em" noto="">?</text>
		</svg>
		`;

		const tooltip = `
			<div class="fe-tooltip">
				${tooltipIcon}
				<span class="fe-show-txt" id="fe-show-txt"><p>With the Essentials Plan, we guarantee you'll raise more in your first year - or we'll refund you the difference.<br><br><a target="_blank" href="https://www.bonterratech.com/wp-content/uploads/2024/12/DMS-Performance-Guarantee-November-2021.pdf">Terms and conditions apply</a></p></span>
			</div>
		`;

		const stickyMessage = `
			<div class="${ID}-sticky-nav">
				<div class="sticky-menu-message">
					<span class="${ID}__desktop-copy">The only fundraising software that <span>guarantees</span> your nonprofit's success. <br>Get started now for year end! ${tooltip}</span>
					<span class="${ID}__mobile-copy">Your nonprofit’s <br>success, guaranteed. ${tooltip}</span>
				</div>
				<a class="btn bt-solid header--cta" href="#form" target="">Request a demo</a>
			</div>
		`;

		const backgroundImage = ` 
		<svg height="69.42859px" viewBox="0 0 524.9524 59.42859" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" class="fe-background-img">
		  <defs>
			  <image width="212" height="24" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANQAAAAYCAYAAACC9NPXAAAABHNCSVQICAgIfAhkiAAABVdJREFUeJztnM1rXccZxn/PzPm6+rBsC0oLWRRCIFGyaBNBcSDFCUlohBSIIdmkFLLIX5B9sFfdFLppCaF0W4oSQqDOLTIBGwpZmUJDmtJNCLFjJ7Zk2ZIt6V7rzNvFnCudWsa0wcnVVeYHw5kzc8+5zxw983HFeUckEoCZiVOnxMyMAN8Ux+PUlGNry5HnotdzAEyaZzMX3gsoAVAvYzvLY14lknDbAsV6w2O+wJth5jEKLBhkHmcFACEI5wpCUJSgo4gMw5By4MhAMGICGIvnMpwVGEcAazXtUKNvt0xMYuq0Ww9kzb3VfixgJWjqjsd1EdOHGH/Q/PxH7QqR+L+wxcVds01MiJs3HVNT0WR17clzUdeebEPUeLa8yPMcM4+U4eucbZcDHlfnGB6RUbuWEWthFDjno7EaQ0oVFhyOgqAcZ46gKtbRATmgjPc0h6lCQagxj1Fh5nHOY5YT//7x3qhEJsw8qKlrvheLepGDxvjQlNHugALczvPZ9Ve73hPNfRC8V2P8mrn5NyUZ7MNG2cmTjvl5z/q6h6sZmxMO5zJC8DiX0e/nSCW5FUBJIB6dy7FBmeVxlLOcaJgSR4GpgiCkikCGrAIJUREkZB1MiuV44qiVYThEDtY2YNGUe6K5BCrAHFDEc3KiwQZJd8m3j4nRwxDP6IWFcxAN879dZSbOnBnD36oIvqTvK3wdDStXYVbsHKGMo1uogLIZRccQHYyqMXKFWQepAqr4eSuAgquXC4wCOiVW54S6BApCXZDJAZ6ggTE94AitWV6Ks/gdk/fOwLgzPmq3Ts31aq8WBvfbk7nr6X+vNBLfE4QxD5yDe3QoW3rvB9T5K8DjyH7EX08fxjhMnR8CG4/rVRencMOBHGYti7Vm9bbx2kbWHsfvyaZxOzEC/GSQuatdrfv+DPh3gUe+M0mJxOjSR7ykFxa6exct58/nfH25i3h2GMoSiRHlEzqbx3Y6lH3wwSwKL2McQzw1TGWJxEhi9isBWPcvrwJvA+PDVZRIjDDGP2Td7oNQnwcOD1tPIjHqOKjfIHWmROJ+8C8H/HLYKhKJA4Hsdw6ohq0jkTgAXGJbiw7427CVJBIjj3hLCwvLDuOPw9aSSIw4FzD/NoCjvL0EXBiyoERihNHvNTd3FcDp2RMryH47bEmJxIjyBbXtrPJi7Eo1+RbwzpAEWSslEiOGfqOFheWds0HGlpbGqfungNeJUY73IgC9Jt0A1kBrKKxjugGsYqwjrWO2htMmsEEI/XiN76EQmmjNHt5iZ9omw1mONIg7yoAxQqhwTGJMIk0BhzDi2+9wCDENHMb4FHEbVCMbx2jioZTFUBHGgAnSGyGJ+8M/wT+pubm1QcHel2O7789g/jlkM6CjQA1cQ1wi2Fc4dwWrV/BuhW13naLYJMt6HD/eG0QtftvY2cUJNsuHwM2AzWJ6AvFDYB3ogDoxdJnijnTXNicS34CPcfaafvHi39uF+95cdvr0EXx4FPQ4xhMYDyN+DEyzG1qdSHwXrAEfY/wZ0580P7965wf2XYeybrckhMfw4eeYjgM/BR5gH2pNHAj6wFaT1oA1xA2CrSKtgK6gcIngPyOr/83zC5/fayW2L0xqi4sdJjs/IzAHPI+YIe7HkDi4BGAZtAGWsbvXRrMlAiX3x5/bwAawhnEJ8SWmzyF8Cv4ivr6CWOW2u06e95me7mt29vY3/bKhdSg7ezZjc30W0wnEHPDosLQkhoIR/6l1E7hO/P17C2MLcROp32ypMNgpaRwYAwmzgLQF1sOsD66HbAu4BayCriGWCVrGh2vIrlJnK3Q6G3r66e1vs1H/AVHnx9X+D+VjAAAAAElFTkSuQmCC" id="img_1"></image>
		  </defs>
		  <g>
			  <use xlink:href="#img_1" fill="#FFFFFF" stroke="none" transform="matrix(-2.4761906 0 0 2.4761903 524.9524 0)"></use>
		  </g>
		</svg>
		`;

		const htmlString = `
        <div class="${ID}__guarantee">
        ${backgroundImage}
            <div>
                <span>Match or exceed last year’s fundraising results - or we’ll <br> refund you the difference  ${tooltip}</span>
            </div>
        </div>`;

		const setup = () => {
			document.body.classList.add(ID + "-" + VARIATION);
			document.querySelector('#HEAD-Snippet').insertAdjacentHTML('afterend', stickyMessage);
			observeElement('#HERO-Block3-Form', () => {
				const mktForm = document.querySelector("#HERO-Block3-Form");
				mktForm.insertAdjacentHTML("afterend", htmlString);
			});

			stickyNav();
			document.addEventListener('click', (e) => {
				const el = e.target;

				if (el.closest('.fe-tooltip')) {
					el.closest('.fe-tooltip').classList.toggle("fe-tooltip-show");
				} else if (document.querySelector('.fe-tooltip.fe-tooltip-show')) {
					document.querySelectorAll('.fe-tooltip.fe-tooltip-show').forEach((el) => {
						el.classList.remove("fe-tooltip-show");
					})
				}
			})
		};


		const observeElement = (selector, callback) => {
			const waitForBody = () => {
				if (document.body) {
					startObserving();
				} else {
					setTimeout(waitForBody, 10);
				}
			};

			const startObserving = () => {
				const targetNode = document.querySelector(selector);
				if (targetNode) {
					callback();
					return;
				}

				const observer = new MutationObserver((mutations, obs) => {
					if (document.querySelector(selector)) {
						callback();
						obs.disconnect();
					}
				});
				observer.observe(document.body, {
					childList: true,
					subtree: true,
				});
			};

			waitForBody();
		};

		const stickyNav = () => {
			let lastScroll = 0;
			window.addEventListener('scroll', function () {
				let currentScroll = window.pageYOffset;
				if (lastScroll <= currentScroll) {
					lastScroll = currentScroll;
					if (window.pageYOffset > 400) {
						document.querySelector('#HEAD-Snippet').classList.add('fe-nav-alt');
					}
				} else {
					lastScroll = currentScroll;
					document.querySelector('#HEAD-Snippet').classList.remove('fe-nav-alt');
					if (document.querySelector('.FE-sticky-nav .fe-tooltip.fe-tooltip-show')) {
						document.querySelector('.FE-sticky-nav .fe-tooltip.fe-tooltip-show').classList.remove("fe-tooltip-show");
					}
				}
			});
		};

		observeElement('#HEAD-Snippet', setup);

	} catch (error) {
		console.log(`${error} BT-19 v1`);
	}
})();