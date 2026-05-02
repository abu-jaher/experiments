(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "";
    var $;
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

    function onLoadMktoForms2(trigger, delayInterval, delayTimeout) {
      var intervalForMktoForms2 = setInterval(
        function () {
          if (typeof window.MktoForms2 != 'undefined') {
            clearInterval(intervalForMktoForms2);
            trigger();
          }
        }, delayInterval);
      setTimeout(function () {
        clearInterval(intervalForMktoForms2);
      }, delayTimeout);
    }

    function live(selector, event, callback, context) {
      // helper for enabling IE 8 event bindings
      function addEvent(el, type, handler) {
        if (el.attachEvent) el.attachEvent("on" + type, handler);
        else el.addEventListener(type, handler);
      }
      // matches polyfill
      this &&
        this.Element &&
        (function(ElementPrototype) {
          ElementPrototype.matches =
            ElementPrototype.matches ||
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
        })(Element.prototype);
      // live binding helper using matchesSelector
      function live(selector, event, callback, context) {
        addEvent(context || document, event, function(e) {
          var found,
            el = e.target || e.srcElement;
          while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
          if (found) callback.call(el, e);
        });
      }
      live(selector, event, callback, context);
    }

    /* Variation functions */

    var fe_form = ''+
    '  <div class="fe_modal">'+ 
    '      <div class="fe_overlay"></div>'+ 
    '      <div class="fe_form_wrapper">'+ 
    '          <span class="fe_close"><img src="https://d27c6j8064skg9.cloudfront.net/FE/SS/02/noun-exit.svg"></span>'+
    '          <div class="fe_form">'+
    '               <h3>Get your Apricot 360 demo</h3>'+
    '               <p>With robust reporting capabilities and customizable dashboards, Apricot 360® <br>helps nonprofits and public sector agencies develop programs to deliver <br>effective, sustainable services for current and future participants</p>'+
    '               <div class="fe_form_field"></div>'+
    '          </div>'+ 
    '          <div class="fe_desc">'+ 
    '              <div class="fe_logo"><img src="https://www.socialsolutions.com/wp-content/uploads/2021/03/2021-03-02-150x48.png"></div>'+ 
    '              <div class="fe_desc_wrapper">'+ 
    '                  <p class="fe-para">“I was stunned. We sent an email <br>around July when we typically <br>don\’t have as ready access to <br>parents and had a <span>49% open rate</span>, <br>which is very high. As soon as we <br>sent that first email, people were <br>acting on it immediately.'+ 
    '                      Then, we <br>sent a follow-up in early August, <br>and we saw a <span>56% open rate</span>. <br>The immediate response to the <br>pre-enrollment intake form was <br>extraordinary.”</p>'+ 
    '                  <p class="fe_reviewer"> <span class="fe-name">- Brent Schondelmeyer</span> <br><span class="fe-designation">Deputy Director of Community Engagement - LINK</span></p>'+ 
    '              </div>'+ 
    '          </div>'+ 
    '      </div>'+ 
    '  </div>';

    /* Variation Init */
    function init() {
      /* start your code here */

      document.querySelector('body').insertAdjacentHTML('beforeend',fe_form);

      document.querySelector('.home-hero .wp-block-button__link').removeAttribute('href');

      live('.home-hero .wp-block-button__link.has-background','click',function(){
        document.querySelector('.fe_modal').classList.add('fe-show');
        document.querySelector('body').classList.add('fe-ss2');

        trackGAEvent('funnelenvy','click','HP Request a demo CTA clicks');
        trackGAEvent('funnelenvy','view','Saw the overlay')
      })
      
      var jsElm = document.createElement("script");
      // set the type attribute
      jsElm.type = "application/javascript";
      // make the script element load file
      jsElm.src="//landing.socialsolutions.com/js/forms2/js/forms2.min.js"
      // finally insert the element to the body element in order to load the script
      document.body.appendChild(jsElm);
      var marketoForm = document.createElement('form');
      marketoForm.id = 'mktoForm_3835';
      document.querySelector('.fe_form_field').appendChild(marketoForm);

      onLoadMktoForms2(function(){

        MktoForms2.loadForm("//landing.socialsolutions.com", "868-XCN-629", 3835, function(form){

          MktoForms2.whenReady(function (form){

            document
              .querySelector(".fe_form #FirstName")
              .setAttribute("placeholder", "First Name");
            document
              .querySelector(".fe_form #LastName")
              .setAttribute("placeholder", "Last Name");
            document
              .querySelector(".fe_form #Email")
              .setAttribute("placeholder", "Email Address");
            document
              .querySelector(".fe_form #industryType option").innerHTML = 'What type of organization are you?'

            document.querySelector(".fe_form #Country option").innerHTML = "Country...";
            document
              .querySelector(".fe_form #Phone")
              .setAttribute("placeholder", "Phone number");
            document
              .querySelector(".fe_form #Company")
              .setAttribute("placeholder", "Organization name");

            if (document.querySelector(".fe_form #jobDepartment option")) {
              document.querySelector("#jobDepartment option").innerHTML =
                "Which best describes your department?...";
            }

            if (document.querySelector(".fe_form #jobLevel option")) {
              document.querySelector("#jobLevel option").innerHTML =
                "What is your job?...";
            }

            
            if (document.querySelector(".fe_form #Annual_Operating_Budget__c")) {
              document.querySelector("#Annual_Operating_Budget__c option").closest(".mktoFormRow").style.display = "none";
            }

            if (document.querySelector(".fe_form #numberofPrograms")) {
              document.querySelector("#numberofPrograms option").innerHTML =
                "How many programs does your organization have?...";
            }

            if (document.querySelector(".fe_form #Litmos__NumberofLocations__c")) {
              document.querySelector("#Litmos__NumberofLocations__c option").innerHTML =
                "How many locations does your organization have?...";
            }

            document.querySelector('.fe_form .mktoForm .mktoButton').innerHTML = 'Request a demo';

            var stateField = document.querySelector('.fe_form .mktoPlaceholderState').closest('.mktoFormRow');           
            document.querySelector('.fe_form #industryType').closest('.mktoFormRow').insertAdjacentElement('beforebegin', stateField);

            var industryField = document.querySelector('.fe_form .mktoPlaceholderIndustry').closest('.mktoFormRow');           
            document.querySelector('.fe_form #industryType').closest('.mktoFormRow').insertAdjacentElement('afterend', industryField);

            live('.fe_form #Country', 'change', function(){
              if(document.querySelector('.fe_form .mktoForm #State')){
                document.querySelector('.fe_form .mktoForm #State option').innerHTML = 'State...'
              }
            })

            live('.fe_form #industryType', 'change', function(){
              if(document.querySelector('.fe_form .mktoForm #Industry')){
                document.querySelector('.fe_form .mktoForm #Industry option').innerHTML = 'What best describes your programs?'
              }
            })

          })

        },50,15000)
        
      },50,15000)

      live('.fe_close','click',function(){
        document.querySelector('.fe_modal').classList.remove('fe-show');
        document.querySelector('body').classList.remove('fe-ss2');
        trackGAEvent('funnelenvy','click','Closed the overlay');
       })

      live('.fe_modal .mktoForm select, .fe_modal .mktoForm input', 'click', function(){
        trackGAEvent('funnelenvy','click','Form engagement');
      }) 

      live('.fe_modal .mktoForm select, .fe_modal .mktoForm input', 'keydown', function(evt){
        if (evt.key === 'Tab' || evt.key === 'Enter') {
          trackGAEvent('funnelenvy','click','Form engagement');
        }
      }) 

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

    /* Initialise variation */

    if(window.screen.width > 1079){
      waitForElement(".home-hero .wp-block-button__link", init, 50, 15000);
    }
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();


