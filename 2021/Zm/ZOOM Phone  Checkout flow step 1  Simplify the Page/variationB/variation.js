(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "ZOOM: [A/B | ECOMM] 2022.07 - Phone - Checkout flow step 1 - Simplify the Page VB";

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

    function live(selector, event, callback, context) {
      /****Helper Functions****/
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


    var fe_plans = '' +
      '  <div class="fe-plan-detail-container">' +
      '      <div class="fe-headline">' +
      '          <img src="https://st1.zoom.us/fe-static/billing-web/img/form-item-add.ef6b61d1.svg" alt="">' +
      '          <div class="fe-title-body">' +
      '              <h3>Plan details</h3>' +
      '          </div>' +
      '      </div>' +
      '      <div class="fe-plan-container">' +
      '          <p>'+
      '               <span class="fe_country">US & CANADA</span>'+
      '               <span class="fe_plan"></span>'+
      '               <br>'+
      '               <span class="fe_plans_tag">Unlimited Regional Calling</span>'+
      '          </p>' +
      '          <small><strong>'+
      '               <span class="fe_plan_price"></span>'+
      '               <span class="fe_user_plan">/year/user </span>'+
      '               <br>'+
      '               <span class="fe_bill_plan">Billed annualy</span>'+
      '          </strong></small>' +
      '          <a class="fe_change_plan" href="/pricing/zoom-phone">Change plan</a>' +
      '      </div>' +
      '  </div>';

    /* Variation Init */
    function init() {
      /* start your code here */
      document.querySelector('#config-product .form-item-title').insertAdjacentHTML('afterend','<p class="form-item-title fe_title">Let\'s select your new phone number.</p>');
      document.querySelector(".zoom-phone-form-v2").insertAdjacentHTML('afterend', fe_plans);

      var getCountry = document.querySelector('.select-with-label .zm-select .zm-select-span__inner').innerText;
      document.querySelector('.fe_country').innerHTML = getCountry;

      var fe_plan = document.querySelector('.zoom-phone-form-v2 .form-item-title .zm-select .zm-select-span__inner').innerText;
      document.querySelector('.fe_plan').innerHTML = fe_plan;

      if(fe_plan.includes('Metered')){
        document.querySelector('.fe_plans_tag').innerHTML = 'Pay As You Go';
      }

      var fe_plan_price = document.querySelector('#shopping-cart .charge-summary, .shopping-cart .charge-summary').innerHTML
      document.querySelector('.fe_plan_price').innerHTML = fe_plan_price;

      if(document.querySelector('[value="monthly"]').checked){
        document.querySelector('.fe_bill_plan').innerHTML = 'Billed '+document.querySelector('[value="monthly"]').value;
        document.querySelector('.fe_user_plan').innerHTML = '/month/user';
      }

      document.addEventListener('click',function(){
        var interval = setInterval(function(){
          if(!document.querySelector('.fe_title')){
            document.querySelector('#config-product .form-item-title').insertAdjacentHTML('afterend','<p class="form-item-title fe_title">Let\'s select your new phone number.</p>');
          }
        },5)

        setTimeout(function(){
          clearInterval(interval);
        },500)
      })

    }

    /* Initialize variation */
    waitForElement("#config-product .form-item-title", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
