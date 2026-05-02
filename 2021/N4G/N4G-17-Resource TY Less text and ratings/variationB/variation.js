(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "";
    /* all Pure helper functions */
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
      }, 200);
      setTimeout(function () {
        clearInterval(interval);
      }, 15000);
    }

    /* Variation functions */
    var febannersec =
      "" +
      '  <div class="bm_wrap_main_container">' +
      '      <div class="bm_wrap_inner">' +
      '          <div class="bm_wrap_icon">' +
      '              <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G-4/noun-check-1743862-59BF22.png">' +
      "          </div>" +
      "          <h2>" +
      "              Thank you! <br> Your content is on its way to your inbox." +
      "          </h2>" +
      "          <p>Before you go, don't forget to request your FREE demo. See how our all-in-one platform can help your nonprofit grow.</p>" +
      '          <div class="bm_wrap_inner_btn">' +
      '              <a href="https://www.networkforgood.com/demo-request/" class="btn"><span>Get Your Free Fundraising Demo</span></a>' +
      "          </div>" +
      '          <div class="bm_wrap_review_sect">' +
      "              <h3>The top-rated fundraising software for small and growing nonprofits.</h3>" +
      '              <div class="section__content">' +
      '                  <ul class="list-partners">' +
      "                      <li>" +
      '                          <a href="https://www.trustradius.com/products/network-for-good/reviews" target="_blank">' +
      '                              <img width="128" height="152" src="https://www.networkforgood.com/wp-content/uploads/trustradius2.png" class="attachment-medium size-medium" alt="" loading="lazy"> </a>' +
      "                      </li>" +
      "                      <li>" +
      '                          <a href="https://www.g2.com/products/network-for-good/reviews" target="_blank" class="fe-best-usability">' +
      '                              <img  src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/17/SpringBest_Usability.png" class="attachment-medium size-medium" alt="" loading="lazy"> </a>' +
      "                      </li>" +
      "                      <li>" +
      '                          <a href="https://www.capterra.com/p/111128/Network-For-Good/#reviews" target="_blank">' +
      '                              <img width="165" src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G-4/Capterra-Shortlist-2022.png" class="attachment-medium size-medium" alt="" loading="lazy" srcset="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G-4/Capterra-Shortlist-2022.png 300w, https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G-4/Capterra-Shortlist-2022.png 1024w, https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G-4/Capterra-Shortlist-2022.png 768w, https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G-4/Capterra-Shortlist-2022.png 1536w, https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G-4/Capterra-Shortlist-2022.png 1200w, https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G-4/Capterra-Shortlist-2022.png 1872w"' +
      '                                  sizes="(max-width: 300px) 100vw, 300px"> </a>' +
      "                      </li>" +
      "                      <li>" +
      '                          <a href="https://sourceforge.net/software/product/Network-For-Good/" target="_blank">' +
      '                              <img width="123" height="140" src="https://www.networkforgood.com/wp-content/uploads/Source-Forge-final.png" class="attachment-medium size-medium" alt="" loading="lazy"> </a>' +
      "                      </li>" +
      "                  </ul>" +
      "              </div>" +
      "          </div>" +
      "      </div>" +
      "  </div>";

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
      /* start your code here */
      document
        .querySelector(".section-callout")
        .insertAdjacentHTML("afterbegin", febannersec);

      document.querySelector('.bm_wrap_inner_btn a').addEventListener('click', function(){
        trackGAEvent("Ga_fe17var1_click", "Ga_click", "Ga_onClick_n4g17btn")
      })  
    }

    /* Initialise variation */
    waitForElement(".section-callout", init);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();