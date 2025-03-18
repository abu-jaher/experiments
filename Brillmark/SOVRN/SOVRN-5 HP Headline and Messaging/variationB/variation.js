(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "snipitPractice";

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

    function waitForjQuery(trigger, delayInterval, delayTimeout) {
      if (!delayInterval) {
        delayInterval = 30;
      }

      if (!delayTimeout) {
        delayTimeout = 15000;
      }
      var interval = setInterval(function () {
        if (window.jQuery !== undefined) {
          clearInterval(interval);
          trigger(window.jQuery);
        }
      }, delayInterval);
      setTimeout(function () {
        clearInterval(interval);
      }, delayTimeout);
    }

    /* Variation functions */
    var heroHtml = '' +
      '  <div class="fe-hero">' +
      '    <div class="container">' +
      '  <div class="fe-hero-left col-lg-6">' +
      '         <p class="fe-top-subheading">The independent publisher platform</p>'+ 
      '         <h1 class="fe-main-heading">Helping publishers earn & keep more revenue</h1>'+ 
      '         <p class="fe-bottom-subheading">Thousands of the world\'s best content creators trust Sovrn to understand, operate and grow their businesses.</p>' +
      '         <p class="fe-subheading">Where would you like to start?</p>'+
      '      <div class="fe-hero-cta">' +
      '          <a href="https://www.sovrn.com/publishers/" class="fe-publishers">For Publishers</a>' +
      '          <a href="https://www.sovrn.com/advertisers/" class=" fe-buyers">For Buyers</a>' +
      '      </div>' +
      '      </div>' +
      '  <div class="fe-hero-right col-lg-6">' +
      '      <div class="banner-image">'+
      '         <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SOVRN/SOVRN-5/SOVRN-5-hero-baner.png" alt="Hero-image">'+
      '       </div>'+  
      '      </div>'+
      '      </div>'+
      '     </div>' +
      '           </div>'+
      '  <div class="fe-testimonial">' +
      '  <div class="container">' +
      '      <p>“We were amazed by how quick and meaningful the revenue impact is.”</p>' +
      '      <p>– Jan Van Der Crabben, CEO World History Encyclopedia</p>' +
      '  </div>'+
      '  </div>';

    var publishersSectionHtml = '' +
      '  <div class="fe-block-2">' +
      '      <div class="publishers container">' +
      '          <h3 class="publisher-heading-desktop">Our <span>publishers come first</span></h3>' +
      '          <h3 class="publisher-heading-mobile"><span>Our publishers</span></br> come first</h3>' +
      '          <div class="row">' +
      '              <div class="col-md-4 col-sm-1">' +
      '                  <p>443<span>M</span></p>' +
      '                  <p>Unique visitors in the past 30 days</p>' +
      '              </div>' +
      '              <div class="col-md-4 col-sm-1">' +
      '                  <p>49<span>B</span></p>' +
      '                  <p>Ads served in the past 30 days</p>' +
      '              </div>' +
      '              <div class="col-md-4 col-sm-1">' +
      '                  <p><span>$</span>452<span>M</span></p>' +
      '                  <p>Paid to publishers total to date</p>' +
      '              </div>' +
      '          </div>' +
      '      </div>' +
      '  </div>';

      var PopularToolHtml = '' +
      '  <div class="container">' +
      '   <div class="row text-center row-eq-height">' +
      '      <div class="col-xs-6 col-sm-6 col-md-4">' +
      '          <div class="post-card advertising"  style="cursor: pointer;">' +
      '              <div class="icon-holder">' +
      '                  <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/funnelenvy/SOVRN-1%3A+%5BHomepage%5D+MSF+vs.+Self-segment+%26+Social+Proof/ICON+-/advertising.png" style="width: 100px;">' +
      '              </div>' +
      '              <h3>//Advertising</h3>' +
      '              <div class="entry-content">' +
      '                  Run ad auctions to monetize your website. </div>' +
      '          </div>' +
      '      </div>' +
      '      <div class="col-xs-6 col-sm-6 col-md-4">' +
      '          <div class="post-card signal"  style="cursor: pointer;">' +
      '              <div class="icon-holder">' +
      '                  <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/funnelenvy/SOVRN-1%3A+%5BHomepage%5D+MSF+vs.+Self-segment+%26+Social+Proof/ICON+-/signal.png" style="width: 100px;">' +
      '              </div>' +
      '              <h3>//Signal</h3>' +
      '              <div class="entry-content">' +
      '                  Maximize the value of every unique visitor. </div>' +
      '          </div>' +
      '      </div>' +
      '      <div class="col-xs-6 col-sm-6 col-md-4">' +
      '          <div class="post-card commerce"  style="cursor: pointer;">' +
      '              <div class="icon-holder">' +
      '                  <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/funnelenvy/SOVRN-1%3A+%5BHomepage%5D+MSF+vs.+Self-segment+%26+Social+Proof/ICON+-/commerce.png" style="width: 100px;">' +
      '              </div>' +
      '              <h3>//Commerce</h3>' +

      '              <div class="entry-content">' +
      '                  Seamlessly connect content, audience, and commerce. </div>' +
      '          </div>' +
      '      </div>' +
      '      <div class="col-xs-6 col-sm-6 col-md-4">' +
      '          <div class="post-card managed-services"  style="cursor: pointer;">' +
      '              <div class="icon-holder">' +
      '                  <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/funnelenvy/SOVRN-1%3A+%5BHomepage%5D+MSF+vs.+Self-segment+%26+Social+Proof/ICON+-/managed%20services.png" style="width: 100px;">' +
      '              </div>' +
      '              <h3>Ad Management</h3>' +
      '              <div class="entry-content">' +
      '                  Maximize your ad revenue and reduce overhead costs. </div>' +
      '          </div>' +
      '      </div>' +
      '      <div class="col-xs-6 col-sm-6 col-md-4">' +
      '          <div class="post-card data-monetization"  style="cursor: pointer;">' +
      '              <div class="icon-holder">' +
      '                  <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/funnelenvy/SOVRN-1%3A+%5BHomepage%5D+MSF+vs.+Self-segment+%26+Social+Proof/ICON+-/data%20monetization.png" style="width: 100px;">' +
      '              </div>' +
      '              <h3>//Data Monetization</h3>' +
      '              <div class="entry-content">' +
      '                  Safe. Secure. 100% additive revenue with no risk. </div>' +
      '          </div>' +
      '      </div>' +
      '  </div>' +
      ' </div>';

      var feLogos =''+ 
      '  <div class="fe-logo-box">'+ 
      '      <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SOVRN/SOVRN-5/cnn.svg" alt="sovrn-publisher-cnn class=" logo "=" ">'+ 
      '  </div>'+ 
      '      <div class="fe-logo-box">'+ 
      '                  <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SOVRN/SOVRN-5/bustle.svg" alt="bustle class=" logo"="">'+ 
      '  </div>'+ 
      '  <div class="fe-logo-box">'+ 
      '      <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SOVRN/SOVRN-5/dwell-logo-whtite.png" alt="dwell class=" logo "=" ">'+ 
      '  </div>'+ 
      '      <div class="fe-logo-box">'+ 
      '                  <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SOVRN/SOVRN-5/gearpatrol-logo-white.png " alt="Gear Patrol Logo class=" logo"="">'+ 
      '  </div>'+ 
      '  <div class="fe-logo-box">'+ 
      '      <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SOVRN/SOVRN-5/star-logo-white.png" alt="StarTribune Logo class=" logo "=" ">'+ 
      '  </div>';

    /* Variation Init */
    function init() {
      /* start your code here */
      document.querySelector('.wrapper #content_holder').insertAdjacentHTML('beforebegin', heroHtml);
            document.querySelector('body.page-template-home #block-2').insertAdjacentHTML('afterend', publishersSectionHtml);
      document.querySelector('.blocks_popular_tools div').insertAdjacentHTML('afterend', PopularToolHtml);
      document.querySelector('body.page-template-home #block-6').insertAdjacentElement('beforebegin', document.querySelector('body.page-template-home #block-7'));
    
      document.querySelector('.blocks_popular_tools header h3').innerHTML = 'Publisher Products';
      document.querySelector('body.page-template-home #block-1 div.blocks_logos h4.top-head').innerHTML = "Powering over 60,000 independent sites";

      document.querySelector('body.page-template-home #block-1 div.blocks_logos h4:not(.top-head)').innerHTML = "Powering over 60,000 independent sites";

      document.querySelector('#block-1 .blocks_logos .row.row-eq-height ').innerHTML = feLogos;

      document.querySelector('#block-7 .row-eq-height img').setAttribute('src', 'https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SOVRN/SOVRN-1/sovrn-certifications-brand-safety-uk.jpg')

      document.querySelector('.post-card.commerce').addEventListener('click', function(){
        window.open('https://www.sovrn.com/publishers/commerce/', '_self',);        
      });
      document.querySelector('.post-card.signal').addEventListener('click', function(){
        window.open('https://www.sovrn.com/publishers/signal/', '_self',);        
      });
      document.querySelector('.post-card.advertising').addEventListener('click', function(){
        window.open('https://www.sovrn.com/advertising-tools/', '_self',);        
      });
      document.querySelector('.post-card.managed-services').addEventListener('click', function(){
        window.open('https://www.sovrn.com/publishers/managed-services/', '_self',);        
      });
      document.querySelector('.post-card.data-monetization').addEventListener('click', function(){
        window.open('https://www.sovrn.com/publishers/data/', '_self',);        
      });

    
      
      document.querySelector('.fe-publishers').addEventListener('click', function(){
        TrackGAEvent('funnelenvy', 'clicks', 'Publishers_CTA_clicks');
      });

      document.querySelector('.fe-buyers').addEventListener('click', function(){
        TrackGAEvent('funnelenvy', 'clicks', 'Buyers_CTA_click');
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




    waitForElement(".page-template-home #block-7 img", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();