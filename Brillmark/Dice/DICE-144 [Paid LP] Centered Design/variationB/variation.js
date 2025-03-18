(() => {
    try {
        const shared = {
            ID: "FE",
            VARIATION: "144",
            CLIENT: "Funnelenvy"
        };

        const ID = shared.ID;
        const VARIATION = shared.VARIATION;

        const heroBottom = `
            <div class="FE-hero-bottom">
                <div class="FE-hero-bottom-item">
                    <img src="https://www.dice.com/binaries/content/gallery/dice/hiring/contact-us/qualified.svg">
                    <div class="FE-item-text">
                        <p>
                            <span>Unique Talent:</span>
                            Access millions of qualified and engaged tech professionals
                        </p>
                    </div>
                </div>
                <div class="FE-hero-bottom-item">
                    <img src="https://www.dice.com/binaries/content/gallery/dice/hiring/contact-us/fill-tech.svg/">
                    <div class="FE-item-text">
                        <p>
                            <span>Precise AI Matching:</span>
                            Cut through the noise by matching with the most relevant candidates
                        </p>
                    </div>
                </div>
                <div class="FE-hero-bottom-item">
                    <img src="https://www.dice.com/binaries/content/gallery/dice/hiring/contact-us/access.svg">
                    <div class="FE-item-text">
                        <p>
                            <span>Active Seekers:</span>                                               
                            Put your jobs in front of tech professionals actively searching for jobs
                        </p>
                    </div>
                </div>
            </div>
        `;


        const setup = () => {
            document.body.classList.add(ID + "-" + VARIATION);

            observeElement('#__fe-hero .form-background', () => {
                const h1Br = document.querySelector('#__fe-hero h1 br');
                const space = document.createTextNode(' ');
                h1Br.replaceWith(space);

                document.querySelector('#__fe-hero .form-background').insertAdjacentHTML('afterend', heroBottom);
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

        observeElement('body', setup);

    } catch (error) {
        console.log(`${error} Dice-144 v1`);
    }
})();