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

            body.querySelector('.hero--copy h3').innerHTML = `Try free for 14 days and get 2 months off when you sign up`;
            body.querySelector('.hero--copy .button-primary').setAttribute('href','https://account.box.com/signup/business-plus?tc=annual&pc=BFtrial');
            waitForElement('.cta-module .button-primary',()=>{
                body.querySelector('.cta-module .button-primary').setAttribute('href','https://account.box.com/signup/business-plus?tc=annual&pc=BFtrial');
            })
        }

        waitForElement(".hero--copy .button-primary", init);
    } catch (e) {
        console.log(e, "Error in BOX-288 v2");
    }
})();