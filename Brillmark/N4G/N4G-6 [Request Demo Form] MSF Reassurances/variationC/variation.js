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
  
    // https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/6/respect.svg

    var feEmail =''+ 
    '   <div class="mktoAsterix">*</div>Work Email'+
    '  <div class="fe-tooltip-N4G6">'+ 
    '      <img class="fe-tooltip-img" src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/6/Tooltip.png">'+ 
    '      <span class="fe-show-txt" id="fe-show-txt">'+ 
    '          <p>We\'ll send you a demo confirmation.</p>'+ 
    '      </span>'+ 
    '  </div>';

    var fePhone =''+ 
    '   <div class="mktoAsterix">*</div>Work Phone Number'+
    '  <div class="fe-tooltip-N4G6">'+ 
    '      <img class="fe-tooltip-img" src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/6/Tooltip.png">'+ 
    '      <span class="fe-show-txt" id="fe-show-txt">'+ 
    '          <p>In case we need to contact you about your demo.</p>'+ 
    '      </span>'+ 
    '  </div>';


    var feTestimonialLogo =''+ 
    // '  <div class="fe-logo-section-n4g6 step-2">'+ 
    // '      <h2 class="logo-heading">Take the top-rated fundraising software for small and growing nonprofits for a test drive.</h2>'+ 
    // '      <div class="fe-logo-outer">'+ 
    // '          <div class="fe-logo-box"> <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/6/g2crowd1.png" alt="High Performer"> </div>'+ 
    // '          <div class="fe-logo-box"> <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/6/bcorp_logo.png" alt="Bcorp logo"> </div>'+ 
    // '          <div class="fe-logo-box"> <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/1/capterra.png" alt="capterra"> </div>'+ 
    // '          <div class="fe-logo-box"> <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/6/frontrunners_logo.png" alt="frontrunners logo"> </div>'+ 
    // '  '+ 
    // '      </div>'+ 
    // '  </div>'+ 
    '  <div class="fe-logo-section-n4g6 step-3">'+ 
    '      <h2 class="logo-heading">See why over 7,000+ growing nonprofits trust us to grow their mission.</h2>'+ 
    '      <div class="fe-logo-outer">'+ 
    '          <div class="fe-logo-box"> <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/6/creativets.png" alt="creativets"> </div>'+ 
    '          <div class="fe-logo-box"> <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/6/achieve-tahoe-logo-v3.png" alt="achieve tahoe logo"> </div>'+ 
    '          <div class="fe-logo-box"> <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/6/Jacksonville-Humane-Society-Logo.png" alt="Jacksonville Humane Society Logo "> </div>'+ 
    '          <div class="fe-logo-box"> <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/6/RISE-for-youth-logo-1.png" alt="RISE for youth logo"> </div>'+ 
    '      </div>'+ 
    '  </div>';

    /* Variation Init */
    function init() {

      document.querySelector('.mktoFieldWrap #LblEmail').innerHTML = feEmail;

      document.querySelector('.mktoFieldWrap #LblPhone').innerHTML = fePhone;


      document.querySelector("body").insertAdjacentHTML("beforeend", '<div class="fe-Overlay-N4G6"></div>');


      document.querySelector('.termsSection .mktoFieldWrap').innerHTML = 'By providing the above phone number, you consent to <a href="https://www.networkforgood.com/about/terms/" target="_blank" id="">our call recording policy.</a>';

      document.querySelector('.termsSection .mktoFieldWrap').insertAdjacentHTML('beforebegin', '<p class="fe-privacy"><img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/6/respect.svg" alt="shield">We respect your privacy</p>');

      

      live(".fe-tooltip-N4G6", "click", function () {
        document.querySelector('.fe-show') && document.querySelector('.fe-show').classList.remove('fe-show');
        document.querySelector("body").classList.toggle("fe-tooltip-show-N4G-6");
        this.parentElement.classList.toggle('fe-show');
        TrackGAEvent('Clicks_on_Tool_Tip', 'GA_Clicks', 'Click_on_Tool_Tip');  
      });

      live(".fe-Overlay-N4G6", "click", function () {
        document.querySelector("body").classList.remove("fe-tooltip-show-N4G-6");
        document.querySelector('.fe-tooltip-N4G6').parentElement.classList.remove('fe-show');
      });



      document.querySelector('body').classList.add('fe-first-step-show');
      document.querySelector('.section-guide .quoteSection').insertAdjacentHTML('afterend', feTestimonialLogo);

      
      live(".bm-next-button button", "click", function () {
        if(document.querySelector('.stepField[data-step="2"]').style.display == 'none'){
         // console.log('2st');
         document.querySelector('body').classList.remove('fe-first-step-show');
//          document.querySelector('body').classList.remove('fe-step1-complete-show');
         document.querySelector('body').classList.add('fe-step2-complete-show');
       }
     });
      // live(".bm-next-button button", "click", function () {
      //   if((document.querySelector('.stepField[data-step="1"]').style.display == 'none') && (document.querySelector('.stepField[data-step="2"]').style.display == 'block')){
      //     // console.log('1st');
      //     document.querySelector('body').classList.add('fe-step1-complete-show');
      //     document.querySelector('body').classList.remove('fe-first-step-show');
      //   }else if(document.querySelector('.stepField[data-step="2"]').style.display == 'none'){
      //     // console.log('2st');
      //     document.querySelector('body').classList.remove('fe-step1-complete-show');
      //     document.querySelector('body').classList.add('fe-step2-complete-show');
      //   }
      // });
    }

    
    function init2() {
      document.querySelector('.section-guide .section__inner h1').insertAdjacentHTML('afterend', '<p class="fe-subheading">Take our all-in-one fundraising solution for a test drive.</p>');


      document.querySelector('#multistepId .stepPaginationContainer').insertAdjacentHTML('afterend', '<p class="fe-form-heading">You\'re one step away from getting a <b>personal demo!</b></p>');
      // document.querySelector('.resourceMarketoForm .stepPaginationContainer').insertAdjacentHTML('beforebegin', '<h3 class="step1">Answer a couple of questions and get your </br> <b>personalized demo!</b></h3>');

      live('.marketoForm .mktoFormRow input[name="FirstName"]', 'click', function() {
        TrackGAEvent('N4G-6_first_name_click', 'GA_Clicks', 'click_on_first_name_input');
      })
      live('.marketoForm .mktoFormRow input[name="LastName"]', 'click', function() {
        TrackGAEvent('N4G-6_last_name_click', 'GA_Clicks', 'click_on_last_name_input');
      })
      live('.marketoForm .mktoFormRow input[name="Company"]','click', function() {
        TrackGAEvent('N4G-6_company_click', 'GA_Clicks', 'click_on_company_input');
      })
      live('.marketoForm .mktoFormRow input[name="Email"]','click', function() {
        TrackGAEvent('N4G-6_email_click', 'GA_Clicks', 'click_on_email_input');
      })
      live('.marketoForm .mktoFormRow input[name="Phone"]','click', function() {
        TrackGAEvent('N4G-6_phone_click', 'GA_Clicks', 'click_on_phone_input');
      })
      live('.marketoForm .mktoFormRow input[name="Reason_for_Demo_Request__c"]','click', function() {
        TrackGAEvent('N4G-6_product_demonstration_click', 'GA_Clicks', 'click_on_demonstration_input');
      })

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
    waitForElement(".termsSection .mktoFieldWrap", init, 100, 25000);
    waitForElement(".section-guide .section__inner h1", init2, 100, 25000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();