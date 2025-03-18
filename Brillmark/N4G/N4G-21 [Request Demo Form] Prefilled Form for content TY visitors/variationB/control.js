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
    function init() {
      /* start your code here */

      document.querySelector('.mktoForm .mktoButtonWrap .mktoButton').addEventListener('click',function(){
        trackGAEvent('funnelenvy','GA-Clicks','Request Demo Clicks');
      })


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
    waitForElement(".mktoForm .mktoButtonWrap .mktoButton", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
