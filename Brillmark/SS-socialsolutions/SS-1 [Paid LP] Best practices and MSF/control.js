(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "";

    /* all Pure helper functions */

    function waitForElement(selector, trigger, delayInterval, delayTimeout) {
      var interval = setInterval(function () {
        if (
          document &&
          document.querySelector(selector) &&
          document.querySelectorAll(selector).length > 0
        ) {
          clearInterval(interval);
          trigger();
        }
      }, delayInterval);
      setTimeout(function () {
        clearInterval(interval);
      }, delayTimeout);
    }

    /* Variation functions */

    /* Variation Init */
    function init(){
        onLoadMktoForms2(
            function () {
              MktoForms2.whenReady(function (form) {
    
                form.onSuccess(function(values, followUpUrl){
                  trackGAEvent('funnelenvy','Click','CTA clicks');
                })
    
              });
            },
            50,
            15000
            );
    }

    function onLoadMktoForms2(trigger, delayInterval, delayTimeout) {
        var intervalForMktoForms2 = setInterval(function () {
          if (typeof window.MktoForms2 != "undefined") {
            clearInterval(intervalForMktoForms2);
            trigger();
          }
        }, delayInterval);
        setTimeout(function () {
          clearInterval(intervalForMktoForms2);
        }, delayTimeout);
      }

      function trackGAEvent(eventCategory, eventAction, eventLabel) {
              if ('ga' in window) {
                ga.getAll()[0].send('event', {
                  eventCategory: eventCategory,
                  eventAction: eventAction,
                  eventLabel: eventLabel,
                });
              }
            }
    /* Initialize variation */
    waitForElement("body", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
