(function () {
  try {

 function waitForElement(selector, trigger) {
    var interval = setInterval(function() {
      if (
        document &&
        document.querySelector(selector) &&
        document.querySelectorAll(selector).length > 0
      ) {
        clearInterval(interval);
        trigger();
      }
    }, 50);
    setTimeout(function() {
      clearInterval(interval);
    }, 15000);
  }
         /* Variation functions */
    function trackGAEvent(eventCategory, eventAction, eventLabel) {
      if ("ga" in window) {
        ga.getAll()[0].send("event", {
          eventCategory: eventCategory,
          eventAction: eventAction,
          eventLabel: eventLabel,
        });
      }
    }

    /* Variation Init */
    function init() {

      document.querySelector('.section__actions > a.btn').addEventListener('click', function(){
        console.log('click')
        trackGAEvent("Ga_fe17Control_click", "Ga_click", "Ga_onClick_n4g17btn")
      })  
    }

    /* Initialise variation */
    waitForElement(".section__actions > a.btn", init);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();