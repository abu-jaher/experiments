(() => {
    try {
        const shared = {
            ID: "FE",
            VARIATION: "141",
            CLIENT: "Funnelenvy"
        };

        const ID = shared.ID;
        const VARIATION = shared.VARIATION;

        const closeIcon = `
            <span class="FE-modal-closeIcon">
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon s-ion-icon" viewBox="0 0 512 512">
                    <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
                </svg>
            </span>`;

        const FeModalFooter = `
            <div class="FE-modal-img">
                <img src="https://cdn-3.convertexperiments.com/uf/10042981/10044140/hero_image_v1_6745a8378b218.png"></img>
            </div>
            <div class="FE-modal-footer">
                <div class="FE-footer-details">
                    <div class="FE-footer-quote">
                        <span>"When it's a technical position, I always go to Dice first to quickly find quality candidates my clients love."</span>
                    </div>
                    <div class="FE-footer-info">
                        <span>TECHNICAL RECRUITER, EXCELL, A Division Of COMPUCOM</span>
                    </div>
                </div>
                <div class="FE-footer-logo">
                    <div class="FE-logo-title">
                        <p>Thousands of companies trust Dice</p>
                    </div>
                    <div class="FE-logo-wrapper">
                        <img src="/binaries/content/gallery/dice/leadgen/logos/logos/statefarm.svg" alt="StateFarm">
                        <img src="/binaries/content/gallery/dice/leadgen/logos/logos/pnc.svg" alt="PNC">
                        <img src="/binaries/content/gallery/dice/leadgen/logos/logos/capitalone.svg" alt="Capital One">
                    </div>
                </div>
            </div>
        `;

        const setup = () => {
            document.body.classList.add(ID + "-" + VARIATION);

            // wrap form elements into one 
            wrapFormElements();

            document.querySelector('.custom-modal-area').insertAdjacentHTML('beforeend', FeModalFooter + closeIcon);

            document.querySelector('.custom-modal-area .formHeader').textContent = 'Get pricing for your unique hiring needs';

            document.querySelector('.custom-modal-area .mktoForm #tempSubmitBtn').textContent = 'Get Pricing';

            document.querySelector('.FE-modal-closeIcon').addEventListener('click', () => {
                document.querySelector('#custom-modal-close').click();
            })

            document.querySelectorAll('.carousel-item .openFormBtn').forEach((el)=>{
                el.addEventListener('click',()=>{
                    document.querySelector('.custom-modal-area .mktoForm #tempSubmitBtn').textContent = 'Get Pricing';
                })
            })

        };

        const wrapFormElements = () => {
            const parentElement = document.querySelector('.custom-modal-area');
            const wrapper = document.createElement('div');
            wrapper.classList.add('FE-modal-form');
            while (parentElement.firstChild) {
                wrapper.appendChild(parentElement.firstChild);
            }
            parentElement.appendChild(wrapper);
        }

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

        observeElement('.custom-modal-area .mktoForm #tempSubmitBtn', setup);

    } catch (error) {
        console.log(`${error} Dice-141 v1`);
    }
})();