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

    function insertAfter(afterElement, targetElement) {
      targetElement.parentNode.insertBefore(
        afterElement,
        targetElement.nextSibling
      );
    }

    function insertBefore(beforeElement, targetElement) {
      targetElement.parentNode.insertBefore(beforeElement, targetElement);
    }

    function live(selector, event, callback, context) {
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
                nodes = (node.parentNode || node.document).querySelectorAll(
                  selector
                ),
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


    /* Variation Init */
    function init() {
      /* start your code here */
      var fe_sponseredSection =''+ 
      '  <div class="fe_sponseredSection">'+ 
      '          <div class="section__title">'+ 
      '              <h6>The advanced fundraising software that <br> small nonprofits choose</h6>'+ 
      '          </div>'+ 
      '          <div class="section__content">'+ 
      '              <ul class="list-partners">'+
      '                  <li>'+ 
      '                      <a href="https://www.capterra.com/p/111128/Network-For-Good/#reviews" target="_blank">'+ 
      '                          <img width="170" height="134" src="https://www.networkforgood.com/wp-content/uploads/2021/04/capterra1.png" class="attachment-medium size-medium" alt="" loading="lazy"> </a>'+ 
      '                  </li>'+  
      '                  <li>'+ 
      '                      <a href="https://www.softwareadvice.com/nonprofit/network-for-good-profile/reviews/" target="_blank">'+ 
      '                          <img width="126" height="145" src="https://www.networkforgood.com/wp-content/uploads/2021/04/softwareadvice.png" class="attachment-medium size-medium" alt="" loading="lazy"> </a>'+ 
      '                  </li>'+ 
      '                  <li>'+ 
      '                      <a href="https://www.getapp.com/nonprofit-software/a/network-for-good/reviews/" target="_blank">'+ 
      '                          <img width="172" height="144" src="https://www.networkforgood.com/wp-content/uploads/2021/04/getapp.png" class="attachment-medium size-medium" alt="GetApp Category Leader" loading="lazy"> </a>'+ 
      '                  </li>'+ 
      '              </ul>'+ 
      '          </div>'+ 
      '  </div>';

      var fe_guarantee =''+ 
      '  <div class="fe-guarantee">'+ 
      '      <div class="money_icon"><img src="https://www.networkforgood.com/wp-content/uploads/2021/02/money-bill-wave.svg" alt="" title=""></div>'+ 
      '      <div class="fe-guarantee__text">'+ 
      '          We guarantee you\'ll raise more in your first year or your money back. <em><a target="_blank" href="https://www.networkforgood.com/wp-content/uploads/2020/08/DMS-Performance-Guarantee-April-2020.pdf"> Terms and conditions apply.</a></em>'+ 
      '      </div>'+ 
      '  </div>';

      var feEmail =''+ 
      '  <div class="fe-tooltip-N4G6">'+ 
      '      <img class="fe-tooltip-img" src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/6/Tooltip.png">'+ 
      '      <span class="fe-show-txt" id="fe-show-email">'+ 
      '          <p>We\'ll send you pricing information.</p>'+ 
      '      </span>'+ 
      '  </div>';

      var fePhone =''+ 
      '  <div class="fe-tooltip-N4G6">'+ 
      '      <img class="fe-tooltip-img" src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/6/Tooltip.png">'+ 
      '      <span class="fe-show-txt" id="fe-show-phone">'+ 
      '          <p>In case we need to contact you about pricing.</p>'+ 
      '      </span>'+ 
      '  </div>';

      var fePrivacy = ''+
      '  <p class="fe-privacy"><svg height="100px" width="100px" fill="#fff" xmlns:x="http://ns.adobe.com/Extensibility/1.0/" xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/" xmlns:graph="http://ns.adobe.com/Graphs/1.0/" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"'+ 
      '          version="1.1" x="0px" y="0px" viewBox="-949 951 100 100" style="enable-background:new -949 951 100 100;" xml:space="preserve"><g><g i:extraneous="self"><g><path d="M-899,953l-38.7,12.2v23.7c0,20.6,10.1,40,27,51.9l11.7,8.2l11.7-8.2c16.9-11.8,27-31.2,27-51.9v-23.7L-899,953z      M-865.7,988.9c0,18.9-9.2,36.6-24.7,47.4l-8.6,6l-8.6-6c-15.5-10.8-24.7-28.6-24.7-47.4v-19.8l33.3-10.5l33.3,10.5V988.9z"></path><path d="M-910.3,983.6v5.4h-4.2v25.1h31V989h-4.2v-5.4c0-6.2-5.1-11.3-11.3-11.3S-910.3,977.4-910.3,983.6z M-896.4,1008h-5.2     l0.9-6.7c-0.9-0.6-1.5-1.6-1.5-2.7c0-1.8,1.4-3.2,3.2-3.2c1.8,0,3.2,1.4,3.2,3.2c0,1.1-0.6,2.1-1.5,2.7L-896.4,1008z      M-905.6,983.6c0-3.7,3-6.6,6.6-6.6c3.7,0,6.6,3,6.6,6.6v5.4h-13.2V983.6z"></path></g></g></g></svg>We'+ 
      '  respect your privacy</p>';
      // change heading 
      var mainHeading = document.querySelector('.fe_looking_header h1');
      if(mainHeading){
        mainHeading.innerHTML = "Pricing Personalized For Your Needs"
      }
    
      
      var targetElement = document.querySelector('.fe_allPlans .allPlans__content');
      var targetElementMobile = document.querySelector('.fe_tobco_looking');
      var afterElement = document.createElement('div');
      afterElement.setAttribute('class', 'fe_sponseredSection_parent');
      afterElement.innerHTML = fe_sponseredSection;

      if(window.screen.width > 1023){
        insertAfter(afterElement, targetElement);
      }else{
        insertAfter(afterElement, targetElementMobile);
      }

      var targetElement = document.querySelector('.fe_looking_row .fe_form');
      var beforeElement = document.createElement('div');
      beforeElement.setAttribute('class', 'fe_guaranty_section');
      beforeElement.innerHTML = fe_guarantee;
      insertBefore(beforeElement, targetElement);

      document.querySelector("body").insertAdjacentHTML("beforeend", '<div class="fe-Overlay-N4G6"></div>');
      waitForElement('.mktoForm input[type=email]', function(){
        document.querySelector('.mktoForm input[type=email]').parentElement.insertAdjacentHTML('afterbegin',feEmail);
        document.querySelector('.mktoForm input[type="tel"]').parentElement.insertAdjacentHTML('afterbegin',fePhone);
        document.querySelector('.marketoFormWidget .fe_looking_row .marketoForm .mktoHtmlText').insertAdjacentHTML('beforebegin',fePrivacy);
        document.querySelector('.mktoButtonWrap .mktoButton').innerHTML = 'Get Pricing';
      },50,15000);

      live(".fe-tooltip-N4G6", "click", function () {
        document.querySelector('.fe-show') && document.querySelector('.fe-show').classList.remove('fe-show');
        document.querySelector("body").classList.toggle("fe-tooltip-show");
        this.parentElement.classList.toggle('fe-show');
        TrackGAEvent('N4G-8_tooltip_click', 'GA_Clicks', 'clicks_on_tooltip');
      });

      live(".fe-Overlay-N4G6", "click", function () {
        document.querySelector("body").classList.remove("fe-tooltip-show");
      });

      waitforMarketo(function () {
        MktoForms2.whenReady(function(form) {
          if(form.getId() == 1076) {
            form.onSubmit(function(callback) {
              form.addHiddenFields({ 'CRM_Vendor__c': document.querySelector('[data-step="2"] .contentSec .inputbox.active').innerText });
            });
          }
        });
      });

    }

    function waitforMarketo(trigger) {
      var interval = setInterval(function () {
        if (window &&
          window.MktoForms2
        ) {
          clearInterval(interval);
          trigger();
        }
      }, 50);
      setTimeout(function () {
        clearInterval(interval);
      }, 10000);
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

    /* Initialise variation */
    waitForElement(".fe_allPlans .allPlans__content", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
