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
     var feStarIcon =''+ 
    '  <div class="fe-icon">'+ 
    '      <img src="https://d27c6j8064skg9.cloudfront.net/FE/SS/01/Apricot_Social_Solutions.png" alt="" />'+ 
    '      <div class="fe-line">'+ 
    '          <p>"Completely customizable and easy to use"</p>'+ 
    '      </div>'+ 
    '  </div>';
    var sticker =''+ 
    '  <div class="fe_sticker">'+ 
    '      <div class="fe_img">'+ 
    '          <span class="fe_skyblue"><img src="https://d27c6j8064skg9.cloudfront.net/FE/SS/01/top_rated_2022.png" alt=""></span>'+ 
    '          <span class="fe_black"><img src="https://d27c6j8064skg9.cloudfront.net/FE/SS/01/Bitmap.png" alt=""></span>'+ 
    '      </div>'+ 
    '      <div class="fe_content">'+ 
    '          <p class="fe_text_main">“We get requests all the time from funders on how many people we are serving and their outcomes. When a funder asks, we can show them all the information quickly.”</p>'+ 
    '          <p class="fe_text_name">Marilyn Heffink, Casa of LA</p>'+ 
    '      </div>'+ 
    '  </div>';

    var imgform =''+ 
    '  <div class="fe_img_form">'+ 
    '      <span class="fe_transparent"><img src="https://d27c6j8064skg9.cloudfront.net/FE/SS/01/logo-lockup-apricot-347x244-1.png" alt=""></span>'+ 
    '  </div>';
   var stepForm =
      "" +
      '  <div id="fe-request-a-demo" class="card">' +
      '      <div class="card-body fe-card-body">' +
      '          <h4 class="has-text-align-center"><p class="fe_perdemo">Get your free <br>personalized demo</p></h4>' +
      '          <div class="fe-status-bar">' +
      '              <a class="active" id="fe-st-1">1</a>' +
      '              <a id="fe-st-2">2</a>' +
      '              <a id="fe-st-3">3</a>' +
      "          </div>" +
      '          <div class="fe-form">' +
      '              <div class="fe-step-form active" id="fe-step-1">' +
      '                  <p class="fe-step-text">Step 1 of 3</p>' +
      '                  <h6 class="has-text-align-center">What type of organization are you?</h6>' +
      '                  <div class="fe-form-inputs">' +
      '                      <div class="fe-organization-type">' +
      '  <div class="fe-firstRow">'+ 
      '      <input type="radio" value="Foundation" id="fe_foundation" name="radio">'+ 
      '      <label for="fe_foundation" class="fe_labl">Foundation</label>' +
      '                          <input type="radio" value="Public-Sector Federal" name="radio" id="fe_ps_federal"> ' +
      '                          <label for="fe_ps_federal"  class="fe_labl"> Public-Sector Federal</label>' +
      '      <input type="radio" value="Non-Profit" name="radio" id="np" class="fe-required">'+ 
      '      <label for="np">Non Profit</label>'+ 
      
      '  </div>'+
      '  <div class="fe-secondRow">'+ 
      '                          <input type="radio" value="Public-Sector State" name="radio" id="fe_ps_state">' +
      '                          <label for="fe_ps_state"  class="fe_labl">   Public-Sector State</label>' +
      '                          <input type="radio" value="Public-Sector Local" name="radio" id="fe_ps_local">' +
      '                          <label for="fe_ps_local"  class="fe_labl">  Public-Sector Local</label>' +
      '      <input type="radio" value="Other" name="radio" id="fe_other">'+ 
      '      <label for="fe_other"> Other</label>'+ 
      '  </div>'+
      "                      </div>" +
      '                  <p class="err-txt">Please select an Organization Type</p>' +
      "                  </div>" +
      '                  <button class="fe-nxt-btn" id="nxt-1">Next Step</button>' +
      feStarIcon+
      "              </div>" +
      "  " +
      '              <div class="fe-step-form" id="fe-step-2">' +
      '                  <p class="fe-step-text">Step 2 of 3</p>' +
      '                  <h6 class="has-text-align-center">Where should we send you the <br>demo confirmation?</h6>' +
      '                  <div class="fe-form-inputs">' +
      '                      <div class="fe-rel"><input type="text" placeholder="First Name" class="fe-required fe-FirstName"/></div>' +
      '                      <div class="fe-rel"><input type="text" placeholder="Last Name" class="fe-required fe-LastName"/></div>' +
      '                      <div class="fe-rel"><input type="email" placeholder="Email" class="fe-required fe-Email"/></div>' +
      "                  </div>" +
      '                  <div class="fe_back_btn">'+
      '                      <button class="fe-nxt-btn" id="nxt-2">Next Step</button>' +
      '                      <p class="fe_back"><a>Back</a></p>'+
      '                  </div>'+
      feStarIcon+
      "              </div>" +
      "  " +
      '              <div class="fe-step-form" id="fe-step-3">' +
      '                  <p class="fe-step-text">Step 3 of 3</p>' +
      '                  <h6 class="has-text-align-center">Just a few more details and you will get your demo in seconds.</h6>' +
      "              </div>" +
      "          </div>" +
      "      </div>" +
      "  </div>";

      function validateEmail(email) {
        var re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
      
    function init() {
    
      var heading = document.querySelector('h3.has-text-color');
      document.querySelector(".section-inner > div:nth-child(2)").querySelector(".wp-block-ws-split-half").insertAdjacentElement('afterbegin',heading);
      document.querySelector(".section-inner > div:nth-child(2)").querySelector(".wp-block-ws-split-half").insertAdjacentHTML('beforeend',sticker);
      if(!document.querySelector('.section-inner > div:nth-child(2) .wp-block-button.mobile_only')){
        var getRequestDemoCTA = document.querySelector('.section-inner > div:nth-child(1) .wp-block-button.mobile_only') && document.querySelector('.section-inner > div:nth-child(1) .wp-block-button.mobile_only').parentElement;
        document.querySelector('.section-inner > div:nth-child(2) ul').insertAdjacentElement('afterend',getRequestDemoCTA);
      }

      document.querySelector('#request-a-demo').insertAdjacentHTML('afterend',imgform);

      // insert quote
      var getQuote = document.querySelector('.card .card-body .wp-block-quote p').innerHTML;
      document.querySelector('.fe_sticker .fe_text_main').innerHTML = getQuote;

      var getReviewer = document.querySelector('.card .card-body .wp-block-quote cite').innerHTML
      document.querySelector('.fe_sticker .fe_text_name').innerHTML = getReviewer;

      
      document
        .querySelector("#request-a-demo")
        .insertAdjacentHTML("beforebegin", stepForm);

      document.querySelectorAll(".fe-status-bar a").forEach((step) => {
        step.addEventListener("click", function (e) {
          switch (e.target.id) {
            case "fe-st-1":
              setActive(1);
              break;
            case "fe-st-2":
              setActive(2);
              break;
            case "fe-st-3":
              setActive(3);
              break;
          }
        });
      });

      document.querySelector("#nxt-1").addEventListener("click", function () {
        setActive(2);
      });

      document.querySelector("#nxt-2").addEventListener("click", function () {
        setActive(3);
      });

      function setActive(id) {
        if (id === 1) {
          // active step 1
          document.getElementById(`fe-st-1`).classList.add("active");
          // deactivate step 2
          document.getElementById(`fe-st-2`).classList.remove("active");
          // deactivate step 3
          document.getElementById(`fe-st-3`).classList.remove("active");
          // active form 2
          document
            .querySelectorAll(".fe-step-form")
            .forEach((item) => item.classList.remove("active"));
          document.getElementById(`fe-step-1`).classList.add("active");
        }

        if (id === 2) {
          // validate radio 1
          var a = stepOneValidate();
          if (!a) {
            return;
          }

          // active step 1
          document.getElementById(`fe-st-1`).classList.add("active");
          // active step 2
          document.getElementById(`fe-st-2`).classList.add("active");
          // deactivate step 3
          document.getElementById(`fe-st-3`).classList.remove("active");
          // active form 2
          document
            .querySelectorAll(".fe-step-form")
            .forEach((item) => item.classList.remove("active"));
          document.getElementById(`fe-step-2`).classList.add("active");

          trackGAEvent('funnelenvy','Click','step-1 completed')
        }

        if (id === 3) {
          // validate form 1
          var a = stepOneValidate();
          var b = false;
          
          var step2 = document.querySelector("#fe-st-2").classList.contains("active");
          // validate form 2
          if (step2) {
            b = stepTwoValidate();
          }
          if (!a || !b) {
            return;
          }
          // active step 1
          document.getElementById(`fe-st-1`).classList.add("active");
          // active step 2
          document.getElementById(`fe-st-2`).classList.add("active");
          // active step 3
          document.getElementById(`fe-st-3`).classList.add("active");
          // active form 2
          document
            .querySelectorAll(".fe-step-form")
            .forEach((item) => item.classList.remove("active"));
          document.getElementById(`fe-step-3`).classList.add("active");

          let firstName = document.querySelector(".mktoForm #FirstName");
          let lastName = document.querySelector(".mktoForm #LastName");
          let email = document.querySelector(".mktoForm #Email");
          let industryType = document.querySelector(".mktoForm #industryType");

          // Fe-Form
          let fe_firstName = document.querySelector(".fe-form .fe-FirstName");
          let fe_lastName = document.querySelector(".fe-form .fe-LastName");
          let fe_email = document.querySelector(".fe-form .fe-Email");
          let fe_orgType = document.querySelector(
            '.fe-form input[name="radio"]:checked'
          );

          firstName.value = fe_firstName.value;
          lastName.value = fe_lastName.value;
          email.value = fe_email.value;
          industryType.value = fe_orgType.value;

          trackGAEvent('funnelenvy','Click','step-2 completed')
        }
      }

      // insert form into step 3
      onLoadMktoForms2(
        function () {
          MktoForms2.whenReady(function (form) {
            var mkform = document.querySelector(".mktoForm");
            var stepThree = document.querySelector("#fe-step-3");
            stepThree.insertAdjacentElement("beforeend", mkform);

            document
              .querySelector("#FirstName")
              .closest(".mktoFormRow").style.display = "none";
            document
              .querySelector("#LastName")
              .closest(".mktoFormRow").style.display = "none";
            document
              .querySelector("#Email")
              .closest(".mktoFormRow").style.display = "none";
            document
              .querySelector("#industryType")
              .closest(".mktoFormRow").style.display = "none";

            document.querySelector("#Country option").innerHTML = "Country...";
            document
              .querySelector("#Phone")
              .setAttribute("placeholder", "Phone number");
            document
              .querySelector("#Company")
              .setAttribute("placeholder", "Organization name");
                 document.querySelector("#mktoForm_4432").insertAdjacentHTML('afterend', feStarIcon);

            if (document.querySelector("#jobDepartment option")) {
              document.querySelector("#jobDepartment option").innerHTML =
                "Which best describes your department?...";
            }

            if (document.querySelector("#jobLevel option")) {
              document.querySelector("#jobLevel option").innerHTML =
                "What is your job?...";
            }

            if (document.querySelector("#Annual_Operating_Budget__c")) {
              document.querySelector("#Annual_Operating_Budget__c option").closest(".mktoFormRow").style.display = "none";
            }

            if (document.querySelector("#numberofPrograms")) {
              document.querySelector("#numberofPrograms option").innerHTML =
                "How many programs does your organization have?...";
            }

            document.querySelector('.mktoForm .mktoButton').innerHTML = 'Get your demo';

            if(!document.querySelector('.mktoForm .fe_back')){
              document.querySelector('.mktoForm .mktoButton').insertAdjacentHTML('afterend','<p class="fe_back"><a>Back</a></p>');
            }

            form.onSuccess(function(values, followUpUrl){
              trackGAEvent('funnelenvy','Click','CTA clicks');
            })

          });

        },
        50,
        15000
      );


      live('#fe-step-2 .fe-form-inputs input','input',function(){
        if(this.nextElementSibling){
          this.nextElementSibling.remove();
        }
      })

      live('[href="#request-a-demo"]','click',function(){
        document.querySelector('#fe-request-a-demo').scrollIntoView({behavior: "smooth", block: "center"})
      })


      live('#fe-step-2 .fe_back','click',function(){
          // active step 1
          document.getElementById(`fe-st-1`).classList.add("active");
          // deactivate step 2
          document.getElementById(`fe-st-2`).classList.remove("active");
          // deactivate step 3
          document.getElementById(`fe-st-3`).classList.remove("active");
          // active form 1
          document
            .querySelectorAll(".fe-step-form")
            .forEach((item) => item.classList.remove("active"));
          document.getElementById(`fe-step-1`).classList.add("active");
      })

      live('#fe-step-3 .fe_back','click',function(){
          // active step 1
          document.getElementById(`fe-st-1`).classList.add("active");
          // active step 2
          document.getElementById(`fe-st-2`).classList.add("active");
          // deactivate step 3
          document.getElementById(`fe-st-3`).classList.remove("active");
          // active form 2
          document
            .querySelectorAll(".fe-step-form")
            .forEach((item) => item.classList.remove("active"));
          document.getElementById(`fe-step-2`).classList.add("active");
      })


    }
    // step 1 validation
    function stepOneValidate() {
      let valid = false;
      const errTxt = document.querySelector(`#fe-step-1 .err-txt`);
      document
        .querySelectorAll(`#fe-step-1 input[type="radio"]`)
        .forEach((item) => {
          item.checked ? (valid = true) : null;
        });

      if (valid) {
        errTxt.style.display = "none";
      } else {
        errTxt.style.display = "block";
      }

      return valid;
    }

    // step 2 validation
    function stepTwoValidate() {
      // Clear all Error div
      document.querySelectorAll("#fe-step-2 .mktoError").forEach(item => item.remove());
      // First name
      const firstName = document.querySelector("#fe-step-2 .fe-FirstName");
      if (!firstName.value) {
        firstName.insertAdjacentElement("afterend",mkErrorMsg("This field is required.", 'fe-FirstName'));
        firstName.focus();
        return false;
      }
      // Last Name
      const lastName = document.querySelector("#fe-step-2 .fe-LastName");
      if (!lastName.value) {
        lastName.insertAdjacentElement("afterend",mkErrorMsg("This field is required.", 'fe-LastName'));
        lastName.focus();
        return false;
      }
      // Email
      const email = document.querySelector("#fe-step-2 .fe-Email");
      if (email.value == "" || !validateEmail(email.value)) {
        email.insertAdjacentElement("afterend",mkErrorMsg("Must be valid email.<br>example@yourdomain.com", 'fe-Email'));
        email.focus();
        return false;
      }
      return true;
    }

    // Error Message Generator
    function mkErrorMsg(msg, id) {
      var mktoError =
        "" +
        '      <div class="mktoErrorArrowWrap">' +
        '          <div class="mktoErrorArrow"></div>' +
        "      </div>" +
        '      <div role="alert" tabindex="-1" class="mktoErrorMsg">' +
        msg +
        ".</div>";

      var div = document.createElement('div');
      div.className = "mktoError";
      div.id = id;
      div.innerHTML = mktoError;
      return div;
    }

    function onLoadMktoForms2(trigger, delayInterval, delayTimeout) {
      var intervalForMktoForms2 = setInterval(function () {
        if (typeof window.MktoForms2 != "undefined") {
          clearInterval(intervalForMktoForms2);
          trigger();
        }
      }, delayInterval);
      setTimeout(function () {
        clearInterval(intervalForMktoForms2);
      }, delayTimeout);
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

    waitForElement('#request-a-demo', init, 50, 15000);

  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();