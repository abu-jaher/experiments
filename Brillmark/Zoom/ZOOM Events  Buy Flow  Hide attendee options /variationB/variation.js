(function () {
  try {
    /* main variables */
    var debug = window.location.search.indexOf('qa') > -1;
    var variation_name = "ZOOM: [AB | ECOMM] 2022.06 - Events - Buy Flow - Hide attendee options - US";

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
 
    var attendeesLink =''+ 
    '  <div class="fe_link"><a>Change attendees number</a></div>';

    /* Variation Init */
    function init() {
      /* start your code here */
      document.querySelector(".zm-tabs__content .zoom-form .option-panel-wrap.option-panel-wrap-select").insertAdjacentHTML("afterend", attendeesLink);
      document.querySelector(".zm-tabs__content .zoom-form .option-panel-wrap.option-panel-wrap-select").classList.add('fe_selected');
      // Click Link
      document.querySelector(".fe_link").addEventListener("click", function(){
       document.querySelector('.form-item-body').classList.add("fe_transition_class");
          document.querySelector('.fe_link').classList.add("fe_display_none");    
      });

    }

    /* Initialize variation */
    waitForElement(".zoom-form .option-panel-wrap", init, 50, 15000);

  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();