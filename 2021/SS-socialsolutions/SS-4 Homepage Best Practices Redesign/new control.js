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

    function init() {
      // GA event
    document.querySelector(".wp-block-ws-section:nth-child(2) .wp-block-button:not(.is-style-outline) a")
      .addEventListener("click", function () {
        TrackGAEvent(
          "funnelenvy",
          "Click",
          "Primary CTA clicks"
        );
      });

      document.querySelector(".wp-block-ws-section:nth-child(2) .wp-block-button.is-style-outline a")
      .addEventListener("click", function () {
        TrackGAEvent(
          "funnelenvy",
          "Click",
          "Tour the product CTA click"
        );
      });

    
    }

    
  function TrackGAEvent($eventCategory, $eventAction, $eventLabel) {
    if ('ga' in window) {
      ga.getAll()[0].send('event', {
        eventCategory: $eventCategory,
        eventAction: $eventAction,
        eventLabel: $eventLabel,
      });
    }
  }

    /* Initialise variation */
    waitForElement("section .wp-block-ws-layout-column", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();