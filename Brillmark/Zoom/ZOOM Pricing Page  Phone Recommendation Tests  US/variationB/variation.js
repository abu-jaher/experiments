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
    var ZoomUsage = ""+
    ' <div class="fe-usage">'+
    '   <div class="fe-usage-inr">'+
    '     <div class="fe-usage-txt">Average amount of daily outbound minutes per user: </div>'+
    '     <div class="fe-usage-optns">'+
    '      <span class="zm-radio"><span class="zm-radio-wrap"><input type="radio" id="zm-radio1" name="ZoomTime" aria-checked="true" tabindex="0" class="zm-radio__original" value="fewer" autocomplete="off"><label for="zm-radio1" class="zm-radio__label"><span class="zm-radio__inner"></span>8 minutes or fewer</label></span></span>'+
    '      <span class="zm-radio"><span class="zm-radio-wrap is-checked"><input type="radio" id="zm-radio2" name="ZoomTime" aria-checked="false" tabindex="-1" class="zm-radio__original" value="above" autocomplete="off" checked><label for="zm-radio2" class="zm-radio__label"><span class="zm-radio__inner"></span>8 minutes or above</label></span></span>'+
    '     </div>'+
    '   </div>'+
    ' </div>';

    var Recommendation = ""+
    ' <div class="FE-recommended">'+
    '   <div class="fe-recommend-text">*Based on 8 minutes or more outbound calling a day per user</div>'+
    ' </div>';


    /* Variation Init */
    function init() {
      /* start your code here */
      document.querySelector('.plan-wrapper .col-md-3:nth-of-type(2)').insertAdjacentHTML("afterbegin", "<div class='fe-best-value'>BEST VALUE *</div>");
      document.querySelector('.plan-wrapper .col-md-3:nth-of-type(2)').insertAdjacentHTML("beforeend", Recommendation);

    }



    /* Initialize variation */
    waitForElement(".Ja-tips-wrapper.phone-msg-box", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();