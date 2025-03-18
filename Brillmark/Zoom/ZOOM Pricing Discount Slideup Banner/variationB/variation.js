/*
 ** Author: Subhash Dogra
 ** Company: Funnelenvy
 ** Date: April 2022
 */

 (function() {

  "use strict";

  try {
      /* main variables */

      var fe_debug = document.cookie.indexOf("feQA") > -1 || window.location.search.indexOf('feQA') > -1,
      variation_name = "ZOOM-1: [Pricing] Discount Slideup Banner | Variation 1",
      auto_slide_time = 3000;

      window['optimizely'] = window['optimizely'] || [];
      var utils = window['optimizely'].get('utils')


      window[variation_name] = {

          fe_event_listener: function(selector, event, callback, context) {
              // helper for enabling IE 8 event bindings
              function addEvent(el, type, handler) {
                  if (el.attachEvent) el.attachEvent('on' + type, handler);
                  else el.addEventListener(type, handler);
              }
              // matches polyfill
              this.Element && function(ElementPrototype) {
                  ElementPrototype.matches = ElementPrototype.matches ||
                      ElementPrototype.matchesSelector ||
                      ElementPrototype.webkitMatchesSelector ||
                      ElementPrototype.msMatchesSelector ||
                      function(selector) {
                          var node = this,
                              nodes = (node.parentNode || node.document).querySelectorAll(selector),
                              i = -1;
                          while (nodes[++i] && nodes[i] != node);
                          return !!nodes[i];
                      };
              }(Element.prototype);
              // live binding helper using matchesSelector
              function live(selector, event, callback, context) {
                  addEvent(context || document, event, function(e) {
                      var found, el = e.target || e.srcElement;
                      while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
                      if (found) callback.call(el, e);
                  });
              }
              live(selector, event, callback, context);
          },

          fe_log: function(msg) {
              if (fe_debug) console.log("[FE]", variation_name, "-->", msg);
          }

      }

      var fe_slideup = '' +
          '  <test-01>' +
          '  <div class="fe-zm-tabs-bottom">' +
          '   <div class="fe-zm-overlay"></div>' +
          '    <div class="fe-box-content">' +
          '   <div class="pricing-container pricing-meeting">' +
          '    <div class="plan-section">' +
          '      <div class="fe-slidebtn">Special Savings <i class="zm-select__caret zm-input__icon zm-icon-up"></i></div>' +
          '      <div class="plan-wrapper">' +
          '          <div class="row">' +
          '              <div class="col-md-3">' +
          '                 <div class="fe-item">' +
          '                  <span class="fe-hide">Personal meetings</span>' +
          '                  <h3>20% off</h3>' +
          '                  <p>when you buy Zoom Bundles.</p>' +
          '                  <a type="button" target="_self" href=""><span class="buy-plan-btn zm-button--primary zm-button--small zm-button">Buy Now</span></a>' +
          '                 </div>' +
          '              </div>' +
          '              <div class="col-md-3">' +
          '                 <div class="fe-item">' +
          '                  <span class="fe-hide">Personal meetings</span>' +
          '                  <h3>17% off</h3>' +
          '                  <p>when you switch from monthly to annual billing.</p>' +
          '                  <a type="button" target="_self" href=""><span class="buy-plan-btn zm-button--primary zm-button--small zm-button">Update My Account</span></a>' +
          '                </div>' +
          '              </div>' +
          '              <div class="col-md-3">' +
          '                 <div class="fe-item">' +
          '                  <span class="fe-hide">Personal meetings</span>' +
          '                  <h3>Get $20</h3>' +
          '                  <p>when you friend buy Zoom products via your link.</p>' +
          '                  <a type="button" target="_self" href=""><span class="buy-plan-btn zm-button--primary zm-button--small zm-button">Refer A Friend</span></a>' +
          '                 </div>' +
          '              </div>' +
          '              <div class="col-md-3">' +
          '                <div class="fe-item">' +
          '                  <span class="fe-hide">Personal meetings</span>' +
          '                  <span>Until 12/25</span>' +
          '                  <h3>20% off</h3>' +
          '                  <p>when your buy Zoom Events or Webinar.</p>' +
          '                  <a type="button" target="_self" href=""><span class="buy-plan-btn zm-button--primary zm-button--small zm-button">Buy Now</span></a>' +
          '                 </div>' +
          '              </div>' +
          '          </div>' +
          '      </div>' +
          '    </div>' +
          '    </div>' +
          '    </div>' +
          '  </div>' +
          '  </test-01>';

      /* Variation Init */
      function init(footerElement) {

          window[variation_name].fe_log(variation_name);

          /* addding SLIDER */
          footerElement.insertAdjacentHTML('beforebegin', fe_slideup);

          // clicking on slide btn
          window[variation_name].fe_event_listener('.fe-slidebtn', 'click', function(e) {
              e.preventDefault();
              document.querySelector('body').classList.toggle('fe-show')
          })
      }


      utils.waitForElement('#footer_container').then(function(){
        setTimeout(init,auto_slide_time)
        })

  } catch (e) {
      if (fe_debug) console.log(e, "error in Test" + variation_name);
  }
})();