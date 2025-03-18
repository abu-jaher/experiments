(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "N4G-16 [Homepage] Hero Revamp";

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

    var heroImage = '' +
      '  <div class="fe-hero-image">' +
      '      <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/16/hero+image.svg" alt="hero-image">' +
      '  </div>';

    var reviewsBadgesHtml = '' +
      '  <div class="fe-reviews-badges">' +
      '      <ul class="fe-list-partners">' +
      '          <li>' +
      '              <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/16/social-1.svg" alt="partners-1">' +
      '          </li>' +
      '          <li>' +
      '              <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/16/Spring_2022_Best_Usability.png" alt="partners-2">' +
      '          </li>' +
      '          <li>' +
      '              <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/16/Capterra-Shortlist-2022.png" alt="partners-3">' +
      '          </li>' +
      '          <li>' +
      '              <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/16/social-4.svg" alt="partners-4">' +
      '          </li>' +
      '          <li>' +
      '              <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/16/social-5.svg" alt="partners-5">' +
      '          </li>' +
      '      </ul>' +
      '  </div>';

    function init() {
      document.querySelector('.wrapper .organization .organization__image').insertAdjacentHTML('afterbegin', heroImage);
      document.querySelector('.wrapper .main .section-offers .section__head>h2').innerHTML = "The top-rated fundraising software for growing nonprofits.";
      document.querySelector('.wrapper .main .section-offers .shell .section__head').insertAdjacentHTML('afterend',reviewsBadgesHtml);
    }

    /* Initialise variation */
    waitForElement(".wrapper .organization .organization__image", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
