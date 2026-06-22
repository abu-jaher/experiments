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

    var fe_webinar = ''+
    '<p class="fe_subtitle">'+
    '     A flexible tool for <span>simple virtual events,</span> with industry leading integrations to match your existing workflows.'+
    '</p>';

    var fe_events = ''+
    '<p class="fe_subtitle">'+
    '     The perfect solution for organizing <span>complex events,</span> making it easy to manage tickets, sessions, sponsors and more.'+
    '</p>';

    /* Variation Init */
    function init() {
      /* start your code here */

      document.querySelector('.webinar-plans .pricing-details .wbn-type').insertAdjacentHTML('afterend',fe_webinar);
      document.querySelector('.webinar-plans.grey .pricing-details .wbn-type').insertAdjacentHTML('afterend',fe_events);
      

    }


    /* Initialize variation */
    waitForElement(".webinar-plans .pricing-details .wbn-type", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
