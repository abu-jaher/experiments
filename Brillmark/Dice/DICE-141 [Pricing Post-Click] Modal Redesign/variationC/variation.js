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
                <img src="https://cdn-3.convertexperiments.com/uf/10042981/10044140/hero_image_v2_6745a850f06c1.png"></img>
            </div>
            <div class="FE-modal-footer">
                <div class="FE-modal-testimonial">  
                    <div class="FE-testimonial-desc">
                        <span>“When it's a technical position, I always go to Dice first to quickly find quality candidates my clients love.”</span>
                    </div>
                    <div class="FE-testimonial-author">
                        <span>— TECHNICAL RECRUITER, EXCELL, A DIVISION OF COMPUCOM</span>
                    </div>
                </div>
                <div class="FE-footer-details">
                    <div class="FE-footer-info">
                        <span class="FE-info-title">6.8M</span>
                        <span class="FE-info-desc">total members</span>
                    </div>
                    <div class="FE-footer-info">
                        <span class="FE-info-title">60K</span>
                        <span class="FE-info-desc">new members / month</span>
                    </div>
                    <div class="FE-footer-info">
                        <span class="FE-info-title">1.6M</span>
                        <span class="FE-info-desc">visits per month</span>
                    </div>
                </div>
            </div>
        `;

        const setup = () => {
            document.body.classList.add(ID + "-" + VARIATION);

            // wrap form elements into one 
            wrapFormElements();

            document.querySelector('.custom-modal-area').insertAdjacentHTML('beforeend', FeModalFooter + closeIcon);

            document.querySelector('.custom-modal-area .formHeader').textContent = 'Get personalized pricing for your tech hiring needs';

            document.querySelector('.custom-modal-area .mktoForm #tempSubmitBtn').textContent = 'Get a Custom Quote';

            document.querySelector('.FE-modal-closeIcon').addEventListener('click', () => {
                document.querySelector('#custom-modal-close').click();
            })

            document.querySelectorAll('.carousel-item .openFormBtn').forEach((el)=>{
                el.addEventListener('click',()=>{
                    document.querySelector('.custom-modal-area .mktoForm #tempSubmitBtn').textContent = 'Get a Custom Quote';
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

        observeElement('.custom-modal-area .mktoForm #tempSubmitBtn', setup);

    } catch (error) {
        console.log(`${error} Dice-141 v2`);
    }
})();