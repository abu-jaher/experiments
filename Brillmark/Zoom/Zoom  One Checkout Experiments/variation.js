(function () {
  try {
    /* main variables */
    var persistentCart = true;
    var eliminateReviewStep = true;
    var noPopUps = true;

    var debug = 0;
    var variation_name = "";

    /* helper library */
    var _$;
    !(function (factory) {
      _$ = factory();
    })(function () {
      var bm = function (s) {
        if (typeof s === "string") {
          this.value = Array.prototype.slice.call(document.querySelectorAll(s));
        }
        if (typeof s === "object") {
          this.value = [s];
        }
      };
      bm.prototype = {
        eq: function (n) {
          this.value = [this.value[n]];
          return this;
        },
        each: function (fn) {
          [].forEach.call(this.value, fn);
          return this;
        },
        log: function () {
          console && console.log(this);
        },
        addClass: function (v) {
                  var a = v.split(" ");
                  return this.each(function (i) {
                    for (var x = 0; x < a.length; x++) {
                      if (i.classList) {
                        i.classList.add(a[x]);
                      } else {
                        i.className += " " + a[x];
                      }
                    }
                  });
                },
         removeClass: function (v) {
                  var a = v.split(' ');
                  return this.each(function (i) {
                    for (var x = 0; x < a.length; x++) {
                      if (i.classList) {
                        i.classList.remove(a[x]);
                      } else {
                        i.className = i.className.replace(
                          new RegExp('\\b' + a[x] + '\\b', 'g'),
                          ''
                        );
                      }
                    }
                  });
                },        
        insertAfterEnd: function (v) {
                  return this.each(function (i) {
                    i.insertAdjacentHTML('afterEnd', v);
                  });
                },   
        insertAfterBegin: function (v) {
                  return this.each(function (i) {
                    i.insertAdjacentElement('afterbegin', v);
                  });
                },   
        insertBeforeEnd: function (v) {
                  return this.each(function (i) {
                    i.insertAdjacentElement('beforeend', v);
                  });
                },     
         html: function (v) {
                  return typeof v == 'undefined'
                    ? this.value[0].innerHTML
                    : this.each(function (i) {
                        i.innerHTML = v;
                      });
                },              
        waitForElement: function (
          selector,
          trigger,
          delayInterval,
          delayTimeout
        ) {
          var interval = setInterval(function () {
            if (_$(selector).value.length) {
              clearInterval(interval);
              trigger();
            }
          }, delayInterval);
          setTimeout(function () {
            clearInterval(interval);
          }, delayTimeout);
        },
      };
      return function (selector) {
        return new bm(selector);
      };
    });

      function live (selector, event, callback, context) {
        /****Helper Functions****/
        // helper for enabling IE 8 event bindings
        function addEvent(el, type, handler) {
          if (el.attachEvent) el.attachEvent("on" + type, handler);
          else el.addEventListener(type, handler);
        }
        // matches polyfill
        this.Element &&
          (function (ElementPrototype) {
            ElementPrototype.matches =
              ElementPrototype.matches ||
              ElementPrototype.matchesSelector ||
              ElementPrototype.webkitMatchesSelector ||
              ElementPrototype.msMatchesSelector ||
              function (selector) {
                var node = this,
                  nodes = (
                    node.parentNode || node.document
                  ).querySelectorAll(selector),
                  i = -1;
                while (nodes[++i] && nodes[i] != node);
                return !!nodes[i];
              };
          })(Element.prototype);
        // live binding helper using matchesSelector
        function live(selector, event, callback, context) {
          addEvent(context || document, event, function (e) {
            var found,
              el = e.target || e.srcElement;
            while (
              el &&
              el.matches &&
              el !== context &&
              !(found = el.matches(selector))
            )
              el = el.parentElement;
            if (found) callback.call(el, e);
          });
        }
        live(selector, event, callback, context);
      }

    var helper = _$();
    /* Variation Init */

    // step1 Persistent Cart
    function init() {
      _$('body').addClass('fe_opt1');
      helper.waitForElement('.shopping-cart .title',function(){
        _$('.shopping-cart .title').html('Order Summary');
      },50,15000);
      
    }

    // step2 Persistent Cart
    function init2() {
      _$('body').addClass('fe_opt2');
      // Recurring charge
      _$('#recurly_subscription .recurly .server_errors').insertAfterEnd(
        '<div class="fe_recurring">'+
        '     <div class="sub-title recurring">Recurring Charge</div>'+
        '     <div class="sub-title-desc recurring-charge-desc">'+
        '         <p>Recurring plans will auto-renew using the payment method on file that you use today and can access and update from zoom.us/billing. You will be charged each period of renewal until you cancel. You can cancel by navigating to zoom.us/billing and clicking \'Cancel Subscription\'. You may request cancellation up until the day before auto-renewal for it to go into effect.</p>'+
        '     </div>'+
        '</div>'
      );
      helper.waitForElement('.shopping-cart .title',function(){
        _$('.shopping-cart .title').html('Order Summary');
      },50,15000);

      _$('.bottom-section.bt #plan_submit').html('Place Order');
    }

    // hide popup
    function init3(){
      _$('body').addClass('fe_popup-none');
      live('.buy-flow-footer .zm-button--primary','mousedown',function(){
        helper.waitForElement('.zm-dialog__wrapper.available-products-dialog-wrapper [data-link-label="Skip This Step"]', function(){
          document.querySelector('.zm-dialog__wrapper.available-products-dialog-wrapper [data-link-label="Skip This Step"]').click();
        }, 50, 25000);
      });
    }

    // remove Review Step
    function init4(){
      _$('body').addClass('fe_remove_review');
      checkAjax();
    }

    // copy inside cart drawer
    function init5(){
      _$('.cart-add-charge.cart-action-charge').insertAfterEnd('<div class="fe_disclaimer">Based on the billing information you have provided, your purchase may be subject to local taxes.  The final charge may be different than the amount shown here and will be displayed on your invoice.</div>');
    }

    function checkAjax(){
      const send = XMLHttpRequest.prototype.send;
      XMLHttpRequest.prototype.send = function() { 
          this.addEventListener('load', function() {
            if(this.status == 200 && (this.responseURL.indexOf('subscription') > -1 || this.responseURL.indexOf('https://zoom.us/tax/estimate') > -1)){
              helper.waitForElement('[value="Place Order"]',function(){
                document.querySelector('[value="Place Order"]').click();
              },50,25000);   
            }
          });
          return send.apply(this, arguments);
      }
    }

    function getCookie(c_name) {
      var c_value = " " + document.cookie;
      var c_start = c_value.indexOf(" " + c_name + "=");
      if (c_start == -1) {
          c_value = null;
      }
      else {
          c_start = c_value.indexOf("=", c_start) + 1;
          var c_end = c_value.indexOf(";", c_start);
          if (c_end == -1) {
              c_end = c_value.length;
          }
          c_value = unescape(c_value.substring(c_start,c_end));
      }
      return c_value;
    }
  
    function getTaxCalculated(){

      if(!document.querySelector('[name="ZOOM-CSRFTOKEN"]')) return;
      var token =  document.querySelector('[name="ZOOM-CSRFTOKEN"]').value;
  
      var planData = decodeURIComponent(getCookie('buyplanCookie'));
      
      var address = '';
      var city = '';
      var state = '';
      var zip = '';
      var country = '' ;

      var addressInput = document.querySelector('.billto_contact_info_fields #address-line1-input');
      if(addressInput && addressInput.value &&  addressInput.value.trim() != ""){
        address = addressInput.value;
      }

      var stateInput = document.querySelector('.billto_contact_info_fields #state-input');
      if(stateInput && stateInput.value &&  stateInput.value.trim() != "-"){
        state = stateInput.value;
      }

      var zipInput = document.querySelector('.billto_contact_info_fields #zip-input');
      if(zipInput && zipInput.value &&  zipInput.value.trim() != ""){
        zip = zipInput.value;
      }

      var countryInput = document.querySelector('.billto_contact_info_fields #country-input');
      if(countryInput && countryInput.value &&  countryInput.value.trim() != ""){
        country = countryInput.value;
      }else {
        country = optimizely.get('visitor').location.country;
      }

      var cityInput = document.querySelector('.billto_contact_info_fields #city-input');
      if(cityInput && cityInput.value && cityInput.value.trim() != ""){
        city = cityInput.value;
      }else {
        city = optimizely.get('visitor').location.city;
      }
      
      var contact = JSON.stringify({address,city,state,zip,country});
      
      var eventType = 1;
      var currency = getCookie('_zm_currency');
      var taxExempt = false;
      
      var myHeaders = new Headers();
      myHeaders.append("X-Requested-With", "XMLHttpRequest, XMLHttpRequest, OWASP CSRFGuard Project");
      myHeaders.append("zoom-csrftoken", token);
      
      var formdata = new FormData();
      formdata.append("buyPlan", planData);
      formdata.append("contact", contact);
      formdata.append("eventType", eventType);
      formdata.append("currency", currency);
      formdata.append("taxExempt", taxExempt);
      
      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
      };
      
      var json;

      fetch("https://zoom.us/tax/estimate", requestOptions)
        .then(response => response.text())
        .then(result => {
          json = result;
          var taxJson = JSON.parse(json);
          var taxTotal = 0;
          
          if(taxJson.data && taxJson.data[0] && taxJson.data[0].tax && taxJson.data[0].tax.length == 0){
            if(document.querySelector('.bm-tax-info')){
              document.querySelector('.bm-tax-info').remove();
            } 
            return;
          } 


          for ( var i = 0; i < taxJson.data.length; i++){
            taxTotal = taxTotal + ((taxJson.data[i].tax[0].taxAmount) / 100);
          }
          helper.waitForElement('#shopping-cart .charge-row, .shopping-cart .charge-row',function(){

            if(document.querySelector('.bm-tax-info')){
              document.querySelector('.bm-tax-info').remove();
            }
						
            var currency = document.querySelector('#currency_symbol') && document.querySelector('#currency_symbol').value;
            var fe_tax = ''+
            '  <p class="bm-tax-info">'+ 
            '      <span class="bm-today-tax">Estimated Taxes</span>'+ 
            '      <span class="bm-tax-summary">'+currency +taxTotal.toFixed(2)+'</span>'+ 
            '  </p>';
  
            sessionStorage.setItem('fe-tax',taxTotal.toFixed(2));
            document.querySelector('#shopping-cart .charge-row, .shopping-cart .charge-row').insertAdjacentHTML('beforeend',fe_tax);
          },50,25000);
          
        })
        .catch(error => console.log('error', error)); 
  
    }

    function initTaxEstimated() {
      getTaxCalculated();

      var addressInput = document.querySelector('.billto_contact_info_fields #address-line1-input');
      if(addressInput){
        addressInput.addEventListener('blur', function(event) {
          getTaxCalculated();
        });
      }
      var zipInput = document.querySelector('.billto_contact_info_fields #zip-input');
      if(zipInput){
        zipInput.addEventListener('blur', function(event) {
          getTaxCalculated();
        });
      }
      var cityInput = document.querySelector('#city-input');
      if(cityInput){
        cityInput.addEventListener('blur', function(event) {
          getTaxCalculated();
        });
      }
      live('.billto_contact_info_fields #state-input','change',function(){
        getTaxCalculated(); 
      });
      live('#country-input','change',function(){
        getTaxCalculated(); 
      });

      live('[aria-label^=Remove ],.zm-button--small','click',function(){
        setTimeout(function(){
          getTaxCalculated(); 
        },1000);
      })
    }

    checkCouponAjax();

    function checkCouponAjax(){
      const send = XMLHttpRequest.prototype.send;
      XMLHttpRequest.prototype.send = function() { 
          this.addEventListener('load', function() {
            if(this.status == 200 && this.responseURL.indexOf('https://zoom.us/verify_coupon') > -1){
              helper.waitForElement('[name="ZOOM-CSRFTOKEN"]', initTaxEstimated, 50, 25000);
            }
          });
          return send.apply(this, arguments);
      }
    }

    // Buy Flow - Persistent Cart
    if(persistentCart == true){
      helper.waitForElement(".buy-flow-footer, .zoom-buy-flow#age_gating_question .not_eligible", init, 50, 25000);
      helper.waitForElement("#recurly_subscription .recurly .footer", init2, 50, 25000);
      helper.waitForElement(".cart-add-charge.cart-action-charge", init5, 50, 25000);
      helper.waitForElement('.billing-step.completed',function(){
        if(document.querySelectorAll('.billing-step.completed').length < 2){
          document.body.classList.add('fe_hideEdit');
        }
      },50,25000);

      helper.waitForElement('[name="ZOOM-CSRFTOKEN"]', initTaxEstimated, 50, 25000);
    }

    // test Checkout with No Pop-Ups
    if(noPopUps == true){
      helper.waitForElement(".buy-flow-footer .zm-button--primary", init3, 50, 25000);
    }

    // Eliminate Review Step
    if(eliminateReviewStep == true){
      helper.waitForElement("body", init4, 50, 25000);
    }

  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();