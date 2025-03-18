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

    function live(selector, event, callback, context) {
      // helper for enabling IE 8 event bindings
      function addEvent(el, type, handler) {
        if (el.attachEvent) el.attachEvent('on' + type, handler);
        else el.addEventListener(type, handler);
      }
      // matches polyfill
      this.Element && function (ElementPrototype) {
        ElementPrototype.matches = ElementPrototype.matches ||
          ElementPrototype.matchesSelector ||
          ElementPrototype.webkitMatchesSelector ||
          ElementPrototype.msMatchesSelector ||
          function (selector) {
            var node = this,
              nodes = (node.parentNode || node.document).querySelectorAll(selector),
              i = -1;
            while (nodes[++i] && nodes[i] != node);
            return !!nodes[i];
          };
      }(Element.prototype);
      // live binding helper using matchesSelector
      function live(selector, event, callback, context) {
        addEvent(context || document, event, function (e) {
          var found, el = e.target || e.srcElement;
          while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
          if (found) callback.call(el, e);
        });
      }
      live(selector, event, callback, context);
    }

    /* Variation functions */
    var heroHtml = '' +
      '  <div class="fe-hero">' +
      '    <div class="container">' +
      '      <h1 class="fe-heading"><span>More ways to</span> <strong>grow your revenue.</strong></h1>' +
      '      <p class="fe-subheading">WHERE WOULD YOU LIKE TO START?</p>' +
      '      </div>' +
      '      <div class="fe-hero-cta container">' +
      '       <div class="row">' +
      '       <div class="button-outer">' +
      '          <button type="button fe-affiliate-marketing">Affiliate Marketing</button>' +
      '           <div class="options-mobile">'+
      '           <div class="options-mobile-inr">'+
      '           <div class="container">'+
      '                  <div class="col-md-3">' +
      '                      <p class="fe-affiliate-link-heading"><img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SOVRN/SOVRN-1/second_step_options_icon.png" alt="dropdown-link">Affiliate Links</p>' +
      '                      <p class="fe-affiliate-link-subheading">Affiliate marketing made easy.</p>' +
      '                      <p class="fe-affiliate-link"><a href="#">Check it out →</a></p>' +
      '                  </div>' +
      '                  <div class="col-md-3">' +
      '                      <p class="fe-affiliate-link-heading"><img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SOVRN/SOVRN-1/second_step_options_icon.png" alt="dropdown-link">Comparisons</p>' +
      '                      <p class="fe-affiliate-link-subheading">On-page comparison shopping.</p>' +
      '                      <p class="fe-affiliate-link"><a href="#">Check it out →</a></p>' +
      '                  </div>' +
      '                  <div class="col-md-3">' +
      '                      <p class="fe-affiliate-link-heading"><img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SOVRN/SOVRN-1/second_step_options_icon.png" alt="dropdown-link">Content</p>' +
      '                      <p class="fe-affiliate-link-subheading">Custom-written content.</p>' +
      '                      <p class="fe-affiliate-link"><a href="#">Check it out →</a></p>' +
      '                  </div>' +
      '                  </div>' +
      '                  </div>' +
      '           </div>'+
      '       </div>' +
      '       <div class="button-outer">' +
      '          <button type="button fe-programmatic-advertising">Programmatic Advertising</button>' +
      '           <div class="options-mobile">'+
      '           <div class="options-mobile-inr">'+
      '           <div class="container">'+
      '                  <div class="col-md-3">' +
      '                      <p class="fe-affiliate-link-heading"><img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SOVRN/SOVRN-1/second_step_options_icon.png" alt="dropdown-link">Affiliate Links</p>' +
      '                      <p class="fe-affiliate-link-subheading">Affiliate marketing made easy.</p>' +
      '                      <p class="fe-affiliate-link"><a href="#">Check it out →</a></p>' +
      '                  </div>' +
      '                  <div class="col-md-3">' +
      '                      <p class="fe-affiliate-link-heading"><img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SOVRN/SOVRN-1/second_step_options_icon.png" alt="dropdown-link">Comparisons</p>' +
      '                      <p class="fe-affiliate-link-subheading">On-page comparison shopping.</p>' +
      '                      <p class="fe-affiliate-link"><a href="#">Check it out →</a></p>' +
      '                  </div>' +
      '                  <div class="col-md-3">' +
      '                      <p class="fe-affiliate-link-heading"><img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SOVRN/SOVRN-1/second_step_options_icon.png" alt="dropdown-link">Content</p>' +
      '                      <p class="fe-affiliate-link-subheading">Custom-written content.</p>' +
      '                      <p class="fe-affiliate-link"><a href="#">Check it out →</a></p>' +
      '                  </div>' +
      '                  </div>' +
      '                  </div>' +
      '           </div>'+
      '       </div>' +
      '       <div class="button-outer">' +
      '          <button type="button fe-diversify-revenue">Diversify Revenue</button>' +
      '           <div class="options-mobile">'+
      '           <div class="options-mobile-inr">'+
      '           <div class="container">'+
      '                  <div class="col-md-3">' +
      '                      <p class="fe-affiliate-link-heading"><img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SOVRN/SOVRN-1/second_step_options_icon.png" alt="dropdown-link">Affiliate Links</p>' +
      '                      <p class="fe-affiliate-link-subheading">Affiliate marketing made easy.</p>' +
      '                      <p class="fe-affiliate-link"><a href="#">Check it out →</a></p>' +
      '                  </div>' +
      '                  <div class="col-md-3">' +
      '                      <p class="fe-affiliate-link-heading"><img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SOVRN/SOVRN-1/second_step_options_icon.png" alt="dropdown-link">Comparisons</p>' +
      '                      <p class="fe-affiliate-link-subheading">On-page comparison shopping.</p>' +
      '                      <p class="fe-affiliate-link"><a href="#">Check it out →</a></p>' +
      '                  </div>' +
      '                  <div class="col-md-3">' +
      '                      <p class="fe-affiliate-link-heading"><img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SOVRN/SOVRN-1/second_step_options_icon.png" alt="dropdown-link">Content</p>' +
      '                      <p class="fe-affiliate-link-subheading">Custom-written content.</p>' +
      '                      <p class="fe-affiliate-link"><a href="#">Check it out →</a></p>' +
      '                  </div>' +
      '                  </div>' +
      '                  </div>' +
      '           </div>'+
      '       </div>' +
      '       </div>' +
      '      </div>' +
      '     </div>' +
      '           <div class="left-cta-dropdown">' +
      '             <div class="container">' +
      '              <div class="row">' +
      '                  <div class="col-md-3">' +
      '                      <p class="fe-affiliate-link-heading"><img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SOVRN/SOVRN-1/second_step_options_icon.png" alt="dropdown-link">Affiliate Links</p>' +
      '                      <p class="fe-affiliate-link-subheading">Affiliate marketing made easy.</p>' +
      '                      <p class="fe-affiliate-link"><a href="#">Check it out →</a></p>' +
      '                  </div>' +
      '                  <div class="col-md-3">' +
      '                      <p class="fe-affiliate-link-heading"><img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SOVRN/SOVRN-1/second_step_options_icon.png" alt="dropdown-link">Comparisons</p>' +
      '                      <p class="fe-affiliate-link-subheading">On-page comparison shopping.</p>' +
      '                      <p class="fe-affiliate-link"><a href="#">Check it out →</a></p>' +
      '                  </div>' +
      '                  <div class="col-md-3">' +
      '                      <p class="fe-affiliate-link-heading"><img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SOVRN/SOVRN-1/second_step_options_icon.png" alt="dropdown-link">Content</p>' +
      '                      <p class="fe-affiliate-link-subheading">Custom-written content.</p>' +
      '                      <p class="fe-affiliate-link"><a href="#">Check it out →</a></p>' +
      '                  </div>' +
      '              </div>' +
      '             </div>' +
      '     </div>' +
      '           </div>'+
      '  <div class="fe-testimonial container">' +
      '      <p>“We were amazed with how quick and meaningful the revenue impact is.”</p>' +
      '      <p>– Jan Van Der Crabben CEO World History Encyclopedia</p>' +
      '  </div>';

    var publishersSectionHtml = '' +
      '  <div class="fe-block-2">' +
      '      <div class="publishers container">' +
      '          <h3 class="publisher-heading-desktop">Our <span>publishers come first</span></h3>' +
      '          <h3 class="publisher-heading-mobile"><span>Our publishers</span></br> come first</h3>' +
      '          <div class="row">' +
      '              <div class="col-md-4 col-sm-1">' +
      '                  <p>170<span>M</span></p>' +
      '                  <p>Unique visitors in the past 30 days</p>' +
      '              </div>' +
      '              <div class="col-md-4 col-sm-1">' +
      '                  <p>7<span>B</span></p>' +
      '                  <p>Ads served in the past 30 days</p>' +
      '              </div>' +
      '              <div class="col-md-4 col-sm-1">' +
      '                  <p><span>$</span>225<span>M</span></p>' +
      '                  <p>Paid to publishers total to date</p>' +
      '              </div>' +
      '          </div>' +
      '      </div>' +
      '  </div>';

    var PopularToolHtml = '' +
      '  <div class="container">' +
      '   <div class="row text-center row-eq-height">' +
      '      <div class="col-xs-6 col-sm-6 col-md-4">' +
      '          <div class="post-card advertising" onclick="location.href=;" style="cursor: pointer;">' +
      '              <div class="icon-holder">' +
      '                  <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/funnelenvy/SOVRN-1%3A+%5BHomepage%5D+MSF+vs.+Self-segment+%26+Social+Proof/ICON+-/advertising.png" style="width: 100px;">' +
      '              </div>' +
      '              <h3>//Advertising</h3>' +
      '              <div class="entry-content">' +
      '                  Run ad auctions to monetize your website. </div>' +
      '          </div>' +
      '      </div>' +
      '      <div class="col-xs-6 col-sm-6 col-md-4">' +
      '          <div class="post-card signal" onclick="location.href=;" style="cursor: pointer;">' +
      '              <div class="icon-holder">' +
      '                  <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/funnelenvy/SOVRN-1%3A+%5BHomepage%5D+MSF+vs.+Self-segment+%26+Social+Proof/ICON+-/signal.png" style="width: 100px;">' +
      '              </div>' +
      '              <h3>//Signal</h3>' +
      '              <div class="entry-content">' +
      '                  Maximize the value of every unique visitor. </div>' +
      '          </div>' +
      '      </div>' +
      '      <div class="col-xs-6 col-sm-6 col-md-4">' +
      '          <div class="post-card commerce" style="cursor: pointer;">' +
      '              <div class="icon-holder">' +
      '                  <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/funnelenvy/SOVRN-1%3A+%5BHomepage%5D+MSF+vs.+Self-segment+%26+Social+Proof/ICON+-/commerce.png" style="width: 100px;">' +
      '              </div>' +
      '              <h3>//Commerce</h3>' +

      '              <div class="entry-content">' +
      '                  Seamlessly connect content, audience, and commerce. </div>' +
      '          </div>' +
      '      </div>' +
      ' </div>';


    /* Variation Init */
    function init() {
      /* start your code here */
      document.querySelector('.wrapper #content_holder').insertAdjacentHTML('beforebegin', heroHtml);
            document.querySelector('body.page-template-home #block-2').insertAdjacentHTML('afterend', publishersSectionHtml);
      document.querySelector('.blocks_popular_tools div').insertAdjacentHTML('afterend', PopularToolHtml);
      document.querySelector('body.page-template-home #block-6').insertAdjacentElement('beforebegin', document.querySelector('body.page-template-home #block-7'));
    
      document.querySelector('.blocks_popular_tools header h3').innerHTML = 'Publisher Products';
      document.querySelector('body.page-template-home #block-1 div.blocks_logos h4.top-head').innerHTML = "<span>Powering over</span><strong>40,000 independent sites</strong>";

      document.querySelector('body.page-template-home #block-1 div.blocks_logos h4:not(.top-head)').innerHTML = "<span>Powering over 40,000</span><strong> independent sites</strong>";

      document.querySelector('#block-7 .row-eq-height img').setAttribute('src', 'https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SOVRN/SOVRN-1/sovrn-certifications-brand-safety-uk.jpg')

      document.querySelector('.post-card.commerce').addEventListener('click', function(){
        window.open('https://www.sovrn.com/publishers/commerce/', '_self',);        
      });
      document.querySelector('.post-card.signal').addEventListener('click', function(){
        window.open('https://www.sovrn.com/publishers/signal/', '_self',);        
      });
      document.querySelector('.post-card.advertising').addEventListener('click', function(){
        window.open('https://www.sovrn.com/advertising-tools/', '_self',);        
      })

      live('.options-mobile .options-mobile-inr .col-md-3:nth-child(1) .fe-affiliate-link', 'mousedown', function () {
        TrackGAEvent('MSF_Affiliate_Link_clicks', 'GA_Clicks', 'MSF_Affiliate_Link_click');
      });
      
      live('.options-mobile .options-mobile-inr .col-md-3:nth-child(1) .fe-affiliate-link', 'click', function () {
        TrackGAEvent('MSF_Affiliate_Link_clicks', 'GA_Clicks', 'MSF_Affiliate_Link_click');
      });

      live('.options-mobile .options-mobile-inr .col-md-3:nth-child(2) .fe-affiliate-link', 'mousedown', function () {
        TrackGAEvent('MSF_Comparison_clicks', 'GA_Clicks', 'MSF_Comparison_click');
      });
      
      live('.options-mobile .options-mobile-inr .col-md-3:nth-child(2) .fe-affiliate-link', 'click', function () {
        TrackGAEvent('MSF_Comparison_clicks', 'GA_Clicks', 'MSF_Comparison_click');
      });

      live('.options-mobile .options-mobile-inr .col-md-3:nth-child(3) .fe-affiliate-link', 'mousedown', function () {
        TrackGAEvent('MSF_Content_clicks', 'GA_Clicks', 'MSF_Content_clicks');
      });


      live('.options-mobile .options-mobile-inr .col-md-3:nth-child(3) .fe-affiliate-link', 'click', function () {
        TrackGAEvent('MSF_Content_clicks', 'GA_Clicks', 'MSF_Content_clicks');
      });

      document.querySelector('.fe-affiliate-marketing').addEventListener('mouseover', function(){
        TrackGAEvent('MSF_Affiliate_clicks', 'GA_Clicks', 'MSF_Affiliate_click');
      });

      
      document.querySelector('.fe-affiliate-marketing').addEventListener('click', function(){
        TrackGAEvent('MSF_Affiliate_clicks', 'GA_Clicks', 'MSF_Affiliate_click');
      });
      
      document.querySelector('.fe-programmatic-advertising').addEventListener('mouseover', function(){
        TrackGAEvent('MSF_Programmatic_clicks', 'GA_Clicks', 'MSF_Programmatic_click');
      });

      document.querySelector('.fe-programmatic-advertising').addEventListener('click', function(){
        TrackGAEvent('MSF_Programmatic_clicks', 'GA_Clicks', 'MSF_Programmatic_click');
      });

      document.querySelector('.fe-diversify-revenue').addEventListener('mouseover', function(){
        TrackGAEvent('MSF_Diversify_clicks', 'GA_Clicks', 'MSF_Diversify_click');
      });

      document.querySelector('.fe-diversify-revenue').addEventListener('click', function(){
        TrackGAEvent('MSF_Diversify_clicks', 'GA_Clicks', 'MSF_Diversify_click');
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


