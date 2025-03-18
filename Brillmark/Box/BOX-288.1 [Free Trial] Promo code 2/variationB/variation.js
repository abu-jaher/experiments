(() => {
    try {
        const waitForElement = (selector, trigger) => {
            const interval = setInterval(() => {
                if (
                    document &&
                    document.querySelector(selector) &&
                    document.querySelectorAll(selector).length > 0
                ) {
                    clearInterval(interval);
                    trigger();
                }
            }, 50);
            setTimeout(() => {
                clearInterval(interval);
            }, 15000);
        }

        const init = () => {
            const { body } = document;

            body.querySelector('.hero--messaging h1').textContent = `Get 20% off`;
            body.querySelector('.hero--copy h3').textContent = `Try before you buy. No risk.`;
            body.querySelector('.hero--copy .button-primary').textContent = `Claim discount`;
            body.querySelector('.hero--copy .button-primary').setAttribute('href','https://account.box.com/signup/business-plus?tc=monthly&pc=20percentmonthlyv1');
        }

        waitForElement(".hero--copy .button-primary", init);
        waitForElement(".cta-module .button-primary", ()=>{
            document.querySelector('.cta-module .button-primary').textContent = `Claim discount`;
            document.querySelector('.cta-module .button-primary').setAttribute('href','https://account.box.com/signup/business-plus?tc=monthly&pc=20percentmonthlyv1');
        });
    } catch (e) {
        console.log(e, "Error in BOX-288.1 v1");
    }
})();