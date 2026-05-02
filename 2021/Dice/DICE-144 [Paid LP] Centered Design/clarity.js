(() => {
    try {

        const waitForElement = (selector, trigger, delayInterval, delayTimeout) => {
            const interval = setInterval(() => {
                if (
                    document &&
                    document.querySelector(selector) &&
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

        waitForElement('body', () => {
            // add clarity script
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.innerHTML = `(function(a,e,b,f,g,c,d){a[b]=a[b]||function(){(a[b].q=a[b].q||[]).push(arguments)};c=e.createElement(f);c.async=1;c.src="https://www.clarity.ms/tag/"+g;d=e.getElementsByTagName(f)[0];d.parentNode.insertBefore(c,d)})(window,document,"clarity","script","hiuhdldji1");`;
            document.body.appendChild(script);
        }, 50, 15000)

    } catch (e) {
        console.log(e, "Error in Dice-144 clarity script");
    }
})();