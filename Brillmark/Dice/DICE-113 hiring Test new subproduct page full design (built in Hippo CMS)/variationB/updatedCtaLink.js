(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "";

    function waitForElement(selector, trigger) {
          var interval = setInterval(function () {
            if (
              document &&
              document.querySelector(selector) &&
              document.querySelectorAll(selector).length > 0
            ) {
              clearInterval(interval);
              trigger();
            }
          }, 20);
          setTimeout(function () {
            clearInterval(interval);
          }, 15000);
        }

    /* Variation Init */
    function init() {
        
    }

    /* Initialize variation */
    waitForElement("body", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();