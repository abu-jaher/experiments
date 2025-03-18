(() => {
    try {
        // Utility function to wait for an element to be available in the DOM
        const waitForElement = (selector, trigger) => {
            const interval = setInterval(() => {
                if (document?.querySelector(selector)) {
                    clearInterval(interval);
                    trigger();
                }
            }, 50);
            setTimeout(() => clearInterval(interval), 15000);
        };

        // Function to track link clicks
        const linkClickGoal = () => {
            window.s_c_il.forEach((value) => {
                if (value._c === 's_c') {
                    window.st = value;
                }
            });
            if (st.linkTrackVars) {
                st.linkTrackVars = "evar47";
                st.eVar88 = "Box: Start your free trial";
                st.events = "event150";
                st.linkTrackEvents = "event150";
                st?.tl?.(true, "o", "Box: Start your free trial");
            }
        };

        // CTA Wrapper HTML
        const ctaWrapper = `
          <div class="cta-wrapper FE-303">
              <a class="button-link" href="https://account.box.com/signup/business-plus?tc=monthly">
                  <span>Start your free trial</span>
              </a>
          </div>
      `;

        // Initialize function to add CTA and set up click tracking
        const init = () => {
            const ctaContainers = document.querySelectorAll('[class*="module"]:not(.hero) .leftRight--copy .leftRight--intro');

            ctaContainers.forEach(container => {
                container.parentElement.insertAdjacentHTML('beforeend', ctaWrapper);
            });

            const links = document.querySelectorAll('[class*="module"]:not(.hero) .leftRight--copy .button-link');

            links.forEach(link => {
                link.addEventListener('click', linkClickGoal);
            });
        };

        // Wait for the hero button to be available and then initialize
        waitForElement(".hero--copy .button-primary", init);

    } catch (error) {
        console.error("Error in BOX-300 v1:", error);
    }
})();