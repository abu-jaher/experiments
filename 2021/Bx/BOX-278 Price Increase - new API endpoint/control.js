(function () {
    var FEHelper = {
        onLoadElement: function (selector, trigger, delayInterval, delayTimeout) {
            var interval = setInterval(function () {
                if (
                    document &&
                    document.querySelectorAll(selector) &&
                    document.querySelectorAll(selector).length > 0
                ) {
                    clearInterval(interval);
                    trigger();
                }
            }, delayInterval);
            setTimeout(function () {
                clearInterval(interval);
            }, delayTimeout);
        },
        onLoadBoxGlobal: function (trigger) {
            var interval = setInterval(function () {
                if (
                    window.drupalSettings &&
                    window.drupalSettings.boxGlobal &&
                    window.drupalSettings.boxGlobal.countryCode
                ) {
                    clearInterval(interval);
                    trigger();
                }
            }, 50);
            setTimeout(function () {
                clearInterval(interval);
            }, 10000);
        }
    };


    function updateButtonUrl() {
        var cta = document.querySelectorAll("#pricing-plan-2 .pricing-package .pricing-package__buttons-wrapper a:not([href*='https://www.box.com/']), #pricing-plan-1 .pricing-package:not([data-formatter-id='pricing-plan-108696']) .pricing-package__buttons-wrapper a, .pricing-features__chart .pricing-features--plan-buttons a:not([href*='https://www.box.com/']), .pricing-features--sticky__container .pricing-features--plan-buttons a:not([href*='https://www.box.com/'])");
        for (var i = 0; i < cta.length; i++) {

            var tc = "|box-278-v0";
            var url = cta[i].href;
            if (url.indexOf('annual') > -1 || url.indexOf('monthly') > -1) {
                if (url.indexOf('|box-278-v0') > -1 ) return;
                var referrer = url.concat(tc);
                cta[i].setAttribute("href", referrer);
            }
        }
    }

    function init() {
        // country code wait 
        FEHelper.onLoadBoxGlobal(function () {
            // updating button url 
            var interval = setInterval(() => {
                updateButtonUrl();
            }, 20);

            setTimeout(() => {
                clearInterval(interval)
            }, 5000);
            document.querySelector("div.pricing-toggle input[type='checkbox']").addEventListener("click", function () {
                // updating button url 
                setTimeout(function () {
                    updateButtonUrl();
                }, 1000);

            });
        });
    }

    FEHelper.onLoadElement('#pricing-plan-2 .pricing-package .pricing-package__buttons-wrapper a', init, 50, 10000);

})();