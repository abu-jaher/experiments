(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "N4G-23: [Homepage] Bulleted copy & brand logos ATF";

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

    var reviewsBadgesHtml = '' +
      '<section class="fe-logo-section">'+
      ' <div class="shell">'+
      ' <div class="fe-section-head">'+
      '   <h2>Trusted by <span class="fe-blue">over 7,000</span> passionate non-profits</h2>'+
      '     </div>'+
      '  <div class="fe-reviews-badges">' +
      '      <ul class="fe-list-partners">' +
      '          <li class="logo-1">' +
      '              <img src="https://d9hhrg4mnvzow.cloudfront.net/www.networkforgood.com/reviews/7345402f-habitat-logo_1000000000000000000028.png" alt="Habitat-logo">' +
      '          </li>' +
      '          <li class="logo-2">' +
      '              <img src="https://d9hhrg4mnvzow.cloudfront.net/www.networkforgood.com/reviews/d8732e43-creativets-logo_10d302c000000000000028.png" alt="partners-2">' +
      '          </li>' +
      '          <li class="logo-3">' +
      '              <img src="https://d9hhrg4mnvzow.cloudfront.net/www.networkforgood.com/reviews/6665dfb8-seton-center-logo_106o04i000000000000028.png" alt="seton-center-logo">' +
      '          </li>' +
      '          <li class="logo-4">' +
      '              <img src="https://d9hhrg4mnvzow.cloudfront.net/www.networkforgood.com/reviews/b9ea69c1-atlas-logo_104604o000000000000028.png" alt="Atlas-logo">' +
      '          </li>' +
      '          <li class="logo-5">' +
      '              <img src="https://d9hhrg4mnvzow.cloudfront.net/www.networkforgood.com/reviews/4c962e39-cef-logo_10a004u000000000000028.png" alt="cef-logo">' +
      '          </li>' +
      '      </ul>' +
      '  </div>'+
      '  </div>'+
      '</section>';

      var feList =''+ 
      '  <div class="fe-list-details">'+ 
      '      <p class="fe-list"><img src="https://www.networkforgood.com/wp-content/uploads/NFG-home-features-1_checkmark_green-01-1-150x1501-1.png"> Manage all your fundraising activities in one place</p>'+ 
      '      <p class="fe-list"><img src="https://www.networkforgood.com/wp-content/uploads/NFG-home-features-1_checkmark_green-01-1-150x1501-1.png"> Lasting relationships with donors</p>'+ 
      '      <p class="fe-list"><img src="https://www.networkforgood.com/wp-content/uploads/NFG-home-features-1_checkmark_green-01-1-150x1501-1.png"> Observe trends and spot opportunities</p>'+ 
      '      <p class="fe-list"><img src="https://www.networkforgood.com/wp-content/uploads/NFG-home-features-1_checkmark_green-01-1-150x1501-1.png"> Work with a dedicated onboarding specialists</p>'+ 
      '  </div>';

    function init() {

      document.querySelector('.wrapper .main .organization__content h1').insertAdjacentHTML('afterend', feList);

      document.querySelector('.wrapper .main .section-offers').insertAdjacentHTML('beforebegin',reviewsBadgesHtml);


      document.querySelector('.organization .section__actions .btn').addEventListener('click', function(){
        if (typeof ga == 'function'){
          console.log('>>primary');
          ga.getAll()[0].send('event', {
              eventCategory: 'fe_cta',
              eventAction: 'fe_click',
              eventLabel: 'fe_primary',
          });
        }

      });

    }

    function init2() {
      document.querySelector('.bm-CTA-container .bm-CTA').addEventListener('click', function(){
        debugMessage('>>bm-CTA click');
        if (typeof ga == 'function'){
          console.log('>>secondary');
          ga.getAll()[0].send('event', {
            eventCategory: 'fe_cta',
            eventAction: 'fe_click',
            eventLabel: 'fe_secondary',
          });
        }
      });
    }
    /* Initialise variation */
    waitForElement(".wrapper .organization .organization__image", init, 50, 15000);

    waitForElement(".bm-CTA-container .bm-CTA", init2, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
