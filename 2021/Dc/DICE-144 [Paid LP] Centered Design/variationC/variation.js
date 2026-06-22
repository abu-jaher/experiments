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
            <div class="FE-hero-img">
                <img src="https://cdn-3.convertexperiments.com/uf/10042981/10044140/hero_2x_674d461538a6a.png">
            </div>
        `;

        const images = [
            { src: 'https://www.dice.com/binaries/content/gallery/dice/hiring/contact-us/capital-one-logo.png', alt: 'Capital One' },
            { src: 'https://www.dice.com/binaries/content/gallery/dice/hiring/contact-us/rh-logo.png', alt: 'RH' },
            { src: 'https://www.dice.com/binaries/content/gallery/dice/hiring/contact-us/disney-logo.png', alt: 'Disney' },
            { src: 'https://www.dice.com/binaries/content/gallery/dice/hiring/contact-us/att-logo.png', alt: 'Att' },
            { src: 'https://www.dice.com/binaries/content/gallery/dice/hiring/contact-us/kforce-logo.png', alt: 'kforce' }
        ];

        const testimonial = `
        <section class="FE-testimonial-wrapper">
            <div class="testimonial-item">
                <div class="testimonialImage">
                        <img src="https://www.dice.com/binaries/content/gallery/dice/hiring/icons/heartchatbubble_64x35.png" alt="">
                </div>
                <div class="quote-row ">
                        <blockquote class="testimonial-quote-style"><p>"My collaboration with Dice has far surpassed my expectations. With a user-friendly interface and extensive database, Dice swiftly connects us with skilled professionals who align seamlessly with our needs and company culture. Their personalized approach and tailored support have been pivotal to our success."</p></blockquote>
                    <div class="attribution-text">
                        TalentConnect360
                    </div>
                </div>
            </div>
        </section>    
        `;


        const setup = () => {
            document.body.classList.add(ID + "-" + VARIATION);

            observeElement('#__fe-hero .form-background', () => {
                document.querySelector('#__fe-hero h1').textContent = `Find the Perfect Tech Candidates Faster`;
                document.querySelector('#__fe-hero h1').insertAdjacentHTML("afterend", `
                        <p class="sub-heading">Leverage Dice's AI-powered tools to cut through the noise and connect with with millions of qualified professionals.</p>
                    `);

                document.querySelector('#__fe-hero .form-background').insertAdjacentHTML('afterend', heroBottom);
            });

            observeElement('#__fe-hero + section p strong', () => {
                document.querySelector('#__fe-hero + section p strong').textContent = `Thousands of top tech employers on Dice, including...`;

                document.querySelectorAll('#__fe-hero + section .mj-column-per-55 .mj-column-per-20 img').forEach((img, index) => {
                    if (images[index]) {
                        img.src = images[index].src;
                        img.alt = images[index].alt;
                    }
                });

                document.querySelector('#__fe-hero + section').insertAdjacentHTML('afterend', testimonial);
            });
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
        console.log(`${error} Dice-144 v2`);
    }
})();