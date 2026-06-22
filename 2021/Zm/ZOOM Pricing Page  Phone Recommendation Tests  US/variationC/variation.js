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
    '     <div class="fe-usage-headline">determine your bEST value</div>'+
    '   <div class="fe-usage-inr">'+
    '     <div class="fe-usage-txt">Average Amount of Daily Outbound Minutes per user: </div>'+
    '     <div class="fe-usage-optns">'+
    '      <span class="fe-fewer">8 minutes or fewer</span><label class="switch"><input type="checkbox" checked><span class="slider round"></span></label><span class="fe-above">8 minutes or above</span>'+
    '      <span><button class="zm-tooltip button-icon" tabindex="0" aria-expanded="false"><span id="tooltip-icon" class="sr-only"> Help Tooltip icon</span><i class="zm-icon-help-outline"></i><span class="fe-tooltip-txt"><div x-arrow="" class="popper__arrow" style="left: 118px;"></div>Annual Price difference between Metered and Unlimited Plan: $60 <br>Outbound calls metered Rate: $.0318<br>Working days in a year = 240<br>$60 / $.0138 / 240 ≈ 8 minutes of daily outbound minutes<span></button></span>'+
    '     </div>'+
    '   </div>'+
    ' </div>';

  
    /* Variation Init */
    function init() {
      /* start your code here */
      document.querySelector('.Ja-tips-wrapper.phone-msg-box').insertAdjacentHTML("afterend", ZoomUsage);

      //Add toggle functionality
      document.querySelector('.fe-usage .fe-usage-optns input').addEventListener('click', function () {
        if(document.querySelector('.fe-usage .fe-usage-optns input').checked == true){
          if (document.querySelector('.plan-wrapper .col-md-3:nth-of-type(1).bm-selected')){
            document.querySelector('.plan-wrapper .col-md-3:nth-of-type(1)').classList.remove("bm-selected");
          }
          document.querySelector('.plan-wrapper .col-md-3:nth-of-type(2)').classList.toggle("bm-selected");
          document.querySelector('.plan-wrapper .col-md-3:nth-of-type(2).bm-selected').insertAdjacentHTML("afterbegin", "<div class='fe-best-value'>BEST VALUE</div>");
          document.querySelector('.fe-usage-optns span.fe-fewer').style.color = "#8A8A8A";
          document.querySelector('.fe-usage-optns span.fe-above').style.color = "#131619";
        }
        else{
          if (document.querySelector('.plan-wrapper .col-md-3:nth-of-type(2).bm-selected')){
            document.querySelector('.plan-wrapper .col-md-3:nth-of-type(2)').classList.remove("bm-selected");
          }
          document.querySelector('.plan-wrapper .col-md-3:nth-of-type(1)').classList.toggle("bm-selected");
          document.querySelector('.plan-wrapper .col-md-3:nth-of-type(1).bm-selected').insertAdjacentHTML("afterbegin", "<div class='fe-best-value'>BEST VALUE</div>");
          document.querySelector('.fe-usage-optns span.fe-above').style.color = "#8A8A8A";
          document.querySelector('.fe-usage-optns span.fe-fewer').style.color = "#131619";
        }
      })
      document.querySelector('.plan-wrapper .col-md-3:nth-of-type(2)').classList.add("bm-selected");
      document.querySelector('.plan-wrapper .col-md-3:nth-of-type(2).bm-selected').insertAdjacentHTML("afterbegin", "<div class='fe-best-value'>BEST VALUE</div>");
      document.querySelector('.fe-usage-optns span.fe-fewer').style.color = "#8A8A8A";
        
    }

    /* Initialize variation */
    waitForElement(".Ja-tips-wrapper.phone-msg-box", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();