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
          document.querySelectorAll(selector).length > 0 && window.fe_sections
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

    



    /* Variation Init */
    function init() {
      /* start your code here */
      document.querySelector('#siteThreecol').insertAdjacentHTML('afterend',window.fe_sections);
    }

    var leftContent = ''+
    '<a href="https://www.sovrn.com/ad-management/" target="_self"><p class="fe_logo"><img src="https://1g3v9y2l2llh2lksnu1v316y-wpengine.netdna-ssl.com/wp-content/uploads/2021/10/adv-sm-36x36.png"><span>Ad Management</span></p></a>'+
    '<h1 class="fe_heading">Learn how you can earn more and keep more</h1>'+
    '<p class="fe_description">See how Sovrn Ad Management can help you generate the greatest outcome from your advertising - through dedicated expert AdOps strategy and support, transparent, fixed rate pricing, and access to more demand partners.</p>'+
    '<p class="fe_point_title">Your demo will include:</p>'+
    '<ul class="fe_bullet_points">'+
    '     <li><img src="https://d27c6j8064skg9.cloudfront.net/FE/SOVRN/04/plus_icon.png">Better insights and reporting: Unified, granular reporting platform with real time analytics </li>'+
    '     <li><img src="https://d27c6j8064skg9.cloudfront.net/FE/SOVRN/04/plus_icon.png">Higher CPMs through our bid technology: Proprietary wrapper and unified auction that maximizes yield </li>'+
    '     <li><img src="https://d27c6j8064skg9.cloudfront.net/FE/SOVRN/04/plus_icon.png">Performance: Ads are optimized for high viewability and high performance</li>'+
    '</ul>';


    var form1 = ''+
    '<div class="fe_form1 fe_show fe_multiStep_form">'+
    '       <div class="fe_form_content">'+
    '              <h2>See Sovrn in Action</h2>'+
    '              <hr>'+
    '              <p class="subheading">Answer a couple of questions and get your free personalized demo.</p>'+
    '              <div class="fe-step-container">'+
		'                   <p class="step one fe-active"></p>'+
		'                   <p class="step two"></p>'+
		'                   <p class="step three"></p>'+
	  '              </div>'+
    '              <h3>How many monthly pageviews does your site get?</h3>'+
    '              <div class="fe_btn-grid">'+
    '                       <input type="radio" id="fe_unknown" name="fe_step1" fe-data="Unknown"></input>'+
    '                       <label for="fe_unknown">Unknown</label>'+
    '                       <input type="radio" id="fe_one_million" name="fe_step1" fe-data="<1M"></input>'+
    '                       <label for="fe_one_million"><1M</label>'+
    '                       <input type="radio" id="fe_5_million" name="fe_step1" fe-data="1-5M"></input>'+
    '                       <label for="fe_5_million">1-5M</label>'+
    '                       <input type="radio" id="fe_more_million" name="fe_step1" fe-data="5M+"></input>'+
    '                       <label for="fe_more_million">5M+</label>'+
    '              </div>'+
    '              <div class="fe_button_wrapper">'+
    '                   <p class="fe-btn">Next Step</p>'+
    '              </div>'+
    '       </div>'+
    '</div>';


    // Step 2 mock up 
    var form2 = ''+
    '<div class="fe_form2 fe_multiStep_form">'+
    '       <div class="fe_form_content">'+
    '              <h2>See Sovrn in Action</h2>'+
    '              <hr>'+
    '              <p class="subheading">Answer a couple of questions and get your free personalized demo. </p>'+
    '              <div class="fe-step-container">'+
		'                   <p class="step one fe-active"></p>'+
		'                   <p class="step two fe-active"></p>'+
		'                   <p class="step three"></p>'+
	  '              </div>'+
    '              <h3>Are you currently using any of these on your site?</h3>'+
    '              <div class="fe_cta">'+
    '                       <input type="radio" id="fe_programmatic" name="fe_step2"></input>'+
    '                       <label for="fe_programmatic">Programmatic advertising</label>'+
    '                       <input type="radio" id="fe_affiliate" name="fe_step2"></input>'+
    '                       <label for="fe_affiliate">Affiliate links</label>'+
    '              </div>'+
    '              <div class="fe_button_wrapper">'+
    '                   <p class="fe-btn">Next Step</p>'+
    '              </div>'+
    '       </div>'+
    '</div>';

    // Step 3 not qualified leads 
    var form3 = ''+
    '<div class="fe_form3 fe_multiStep_form">'+
    '       <div class="fe_form_content">'+
    '              <h2>Thank you for your interest in Sovrn</h2>'+
    '              <hr>'+
    '              <p class="subheading">In order for our services to help you earn more, we require a minimum of 5M pageviews/month.</p>'+
    '              <div class="fe-step-container">'+
		'                   <p class="step one fe-active"></p>'+
		'                   <p class="step two fe-active"></p>'+
		'                   <p class="step three fe-active"></p>'+
	  '              </div>'+
    '              <h3>Here is a resource with other ways to grow your revenue with advertising.</h3>'+
    '              <div class="fe_cta">'+
    '                   <a href="https://www.sovrn.com/blog/making-advertising-work-for-you/"><p>Making advertising work for you</p></a>'+
    '                   <p class="fe_or">or</p>'+
    '                   <a href="https://www.sovrn.com/exchange/"><p>Get started with our Ad Exchange</p></a>'+
    '              </div>'+
    '       </div>'+
    '</div>';


    // Step 3 email
    var form4 = ''+
    '       <div class="step_email">'+
    '              <h2>See Sovrn in Action</h2>'+
    '              <hr>'+
    '              <p class="subheading">Answer a couple of questions and get your free personalized demo. </p>'+
    '              <div class="fe-step-container">'+
		'                   <p class="step one fe-active"></p>'+
		'                   <p class="step two fe-active"></p>'+
		'                   <p class="step three fe-active"></p>'+
	  '              </div>'+
    '              <h3>Where should we send you the demo <br>confirmation email?</h3>'+
    '       </div>';



    // step 3 details
    var form5 = ''+
    '         <diV class="fe_last_step">'+
    '              <h2>See Sovrn in Action</h2>'+
    '              <hr>'+
    '              <div class="fe-step-container">'+
		'                   <p class="step one fe-active"></p>'+
		'                   <p class="step two fe-active"></p>'+
		'                   <p class="step three fe-active"></p>'+
	  '              </div>'+
    '              <h3>Last step. What is the best way to reach you?</h3>'+
    '         </div>';



    var fe_submit = ''+
    '              <div class="fe_button_wrapper fe_submit">'+
    '                   <p class="fe-btn">Schedule Your Free Demo</p>'+
    '              </div>';

    var fe_email_next = ''+
    '              <div class="fe_button_wrapper email">'+
    '                   <p class="fe-btn">Next Step</p>'+
    '              </div>';

    // TY screen 
    var fe_thankyou = ''+
    '<div class="fe_thankyou fe_multiStep_form">'+
    '       <div class="fe_form_content">'+
    '              <h2>Thank you for submitting the form</h2>'+
    '              <hr>'+
    '              <h3>Someone from our team will contact you shortly. In the meantime, checkout a resource to help you grow your revenue.</h3>'+
    '              <div class="fe_cta">'+
    '                   <a href="http://www.sovrn.com/blog/make-more-keep-more/"><p>Get the most out of your ad revenue</p></a>'+
    '                   <p class="fe_or">or</p>'+
    '                   <a href="https://www.sovrn.com/blog/ad-ops-providers/"><p>7 signs it\'s time to change your Ad Ops provider</p></a>'+
    '              </div>'+
    '       </div>'+
    '</div>';

    var matched;

    function initLeftContent(){
      // insert hero left section
      document.querySelector('.LeftContent .sbTwoCol_content > div').innerHTML = leftContent;

      // insert all the form
      document.querySelector('#siteThreecol .row > .mt-5').insertAdjacentHTML('afterbegin',form1+form2+form3);
      document.querySelector('.RightContent h2').insertAdjacentHTML('afterend',form5+form4);
      document.querySelector('.RightContent').insertAdjacentHTML('beforeend',fe_submit + fe_email_next);
      document.querySelector('.RightContent').insertAdjacentHTML('afterend',fe_thankyou);

      // step1 submit
      live('.fe_form1 .fe-btn','click',function(){
        if(document.querySelector('.fe_form1 .fe_btn-grid input:checked')){
          var selectedData = document.querySelector('.fe_form1 .fe_btn-grid input:checked').getAttribute('fe-data');
          document.querySelector('.fe_form1').classList.remove('fe_show');

          // if select more than 5M
          if(selectedData === "5M+"){
            var element = document.querySelector('[name="monthly_pageviews"]');
            triggerOption(element,'5 - 10 Million');
            document.querySelector('.fe_form2').classList.add('fe_show');
            trackGAEvent('FunnelEnvy','GA-Clicks','Step 1 clicks on 5M+');
          }
          // if select other than 5M
          else{
            document.querySelector('.fe_form3').classList.add('fe_show');
            trackGAEvent('FunnelEnvy','GA-Clicks','Step 1 clicks on '+selectedData+'');
          }
        }
      })

      // step2 submit 
      live('.fe_form2 .fe-btn','click',function(){
        if(document.querySelector('.fe_form2 .fe_cta input:checked')){
          var selectedData = document.querySelector('.fe_form2 .fe_cta input:checked + label').innerHTML;
          document.querySelector('[value="'+selectedData+'"]').click();
          document.querySelector('.fe_form2').classList.remove('fe_show');
          document.querySelector('.RightContent').classList.add('fe_show');

          // remove the * from placeholder
          setPlaceholder();
          document.querySelector('[name="country_hubspot_"] option').innerHTML = 'Country';
          // GA event
          trackGAEvent('FunnelEnvy','GA-Clicks','Step 2 clicks on '+selectedData+'');

          // for return user
          if(document.querySelector('[name="email"]').value !== ''){
            if(document.querySelector('[name="jobtitle"]').value !== ''){
              document.querySelector('[name="jobtitle"]').value = '';
              triggerInput(document.querySelector('[name="jobtitle"]'));
            }
          } 
        }
      })


      // verified the email and check the known and unknown leads
      live('.RightContent .fe_button_wrapper.email .fe-btn','click',function(){
          document.querySelector('.hs_submit .actions .hs-button').click();
          setTimeout(function(){
            if(document.querySelectorAll('.hs-error-msgs').length > 1){
              
              if(!document.querySelector('.hs_email .hs-error-msgs')){
                // GA event
                trackGAEvent('FunnelEnvy','GA-Clicks','Step 3 email submitted');
                document.querySelector('.RightContent').classList.add('fe_final');
                document.querySelector('.RightContent').classList.remove('fe_show');
                document.querySelector('.RightContent').classList.add('fe_error');
              }
            }

          },20)
      })


      // schedule demo cta click
      live('.hs_submit .actions .hs-button','click',function(){
        setTimeout(function(){
          if(!document.querySelector('.hs-error-msgs')){
            if(document.querySelector('.RightContent.fe_final')){
              document.querySelector('.RightContent').classList.remove('fe_final');
            }
            document.querySelector('.RightContent').classList.remove('fe_show');
            document.querySelector('.fe_thankyou').classList.add('fe_show');
            
            // GA event
            trackGAEvent('FunnelEnvy','GA-Clicks','Step 3 details submitted');
          }
        },50);
      })

      // click the submit button on final step
      live('.RightContent .fe_button_wrapper.fe_submit .fe-btn','click',function(){
        document.querySelector('.hs_submit .actions .hs-button').click();
        if(document.querySelector('.hs-error-msgs')){
          document.querySelector('.RightContent').classList.remove('fe_error');
        }
      })

      live('.RightContent .hs-input','mousedown',function(){
            // GA event
            trackGAEvent('FunnelEnvy','GA-Clicks','Step 3 form engagement');
      })
      // // check the known leads email
      checkAjax();

    }



    function checkAjax(){
      var send = XMLHttpRequest.prototype.send
          XMLHttpRequest.prototype.send = function() { 
              this.addEventListener('load', function() {
                if(this.readyState === 4 && this.status === 200 && this.responseURL.indexOf('ws.zoominfo.com/form-complete/match?') !=-1){
                  matched = true; 
                  document.querySelector('.RightContent').classList.add('fe_show2');
                }
              })
              return send.apply(this, arguments)
          }
    }




    // remove the * from placeholder
    function setPlaceholder(){
      var inputField = document.querySelectorAll('.RightContent .hs-input[placeholder]')
      for(var i = 0; i<inputField.length; i++){
        var getValue = inputField[i].getAttribute("placeholder").replace('*','');
          inputField[i].setAttribute("placeholder",getValue);
        }
    }

    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(email).toLowerCase())) {
        return true;
      }
      else {
        return false;
      }
    }

    function triggerInput(element) {
      element.dispatchEvent(
          new window.Event('input', { bubbles: true })
      );
    }

    function triggerOption(element, value){
      var trigger = Object.getOwnPropertyDescriptor(
        window.HTMLSelectElement.prototype,
        "value"
      ).set;
      trigger.call(element, value);
      var event = new Event("change", { bubbles: true });
      element.dispatchEvent(event);
    }
    

    function trackGAEvent(eventCategory, eventAction, eventLabel) {
            if ('ga' in window) {
              ga.getAll()[0].send('event', {
                eventCategory: eventCategory,
                eventAction: eventAction,
                eventLabel: eventLabel,
              });
            }
          }

    /* Initialize variation */    
    waitForElement("#siteThreecol", init, 50, 15000);
    waitForElement(".LeftContent .sbTwoCol_content > div", initLeftContent, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
