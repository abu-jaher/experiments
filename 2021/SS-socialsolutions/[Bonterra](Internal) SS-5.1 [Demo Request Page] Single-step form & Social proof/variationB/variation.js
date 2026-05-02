(function () {
  try {
    /* main variables */
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
        html: function (v) {
          return typeof v == 'undefined'
            ? this.value[0].innerHTML
            : this.each(function (i) {
              i.innerHTML = v;
            });
        },
        insertAfter: function (v) {
          return this.each(function (i) {
            i.insertAdjacentHTML('afterEnd', v);
          });
        },
        insertBefore: function (v) {
          return this.each(function (i) {
            i.insertAdjacentHTML('beforeBegin', v);
          });
        },

        live: function (selector, event, callback, context) {
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


    function TrackGAEvent($eventCategory, $eventAction, $eventLabel) {
      if ('ga' in window) {
        ga.getAll()[0].send('event', {
          eventCategory: $eventCategory,
          eventAction: $eventAction,
          eventLabel: $eventLabel,
        });
      }
    }
    
    var helper = _$();
    var feList = '' +
      '<li>Keeping confidential data secure</li>' +
      '<li>Customizing forms and building reports</li>' +
      '<li>Observing all necessary statistics</li>' +
      '<li>Providing actionable insights</li>';

    var fe_circles = '' +
      '  <div class="fe-circle-content">' +
      '      <div class="fe-circle-up">' +
      '          <div class="fe-circles">' +
      '              <div class="fe-circle-img">' +
      '                  <img src="https://d27c6j8064skg9.cloudfront.net/FE/SS/5.1/circlebackground.png">' +
      '                  <span class="fe-circle-text">35%</span>' +
      '              </div>' +
      '              <p class="fe-logo-text">Time saved on <br> data entry</p>' +
      '          </div>' +
      '          <div class="fe-circles">' +
      '              <div class="fe-circle-img">' +
      '                  <img src="https://d27c6j8064skg9.cloudfront.net/FE/SS/5.1/circlebackground.png">' +
      '                  <span class="fe-circle-text">40%</span>' +
      '              </div>' +
      '              <p class="fe-logo-text">Time saved on <br> reporting</p>' +
      '          </div>' +
      '          <div class="fe-circles fe-third-circle">' +
      '              <div class="fe-circle-img">' +
      '                  <img src="https://d27c6j8064skg9.cloudfront.net/FE/SS/5.1/circlebackground.png">' +
      '                  <span class="fe-circle-text">25%</span>' +
      '              </div>' +
      '              <p class="fe-logo-text">Time saved on data <br> integrity & maintenance</p>' +
      '          </div>' +
      '      </div>';

    var fe_circlesMob = '' +
      '  <div class="fe-circle-content fe-circle-mob">' +
      '      <div class="fe-circle-up">' +
      '          <div class="fe-circles">' +
      '              <div class="fe-circle-img">' +
      '                  <img src="https://d27c6j8064skg9.cloudfront.net/FE/SS/5.1/circlebackground.png">' +
      '                  <span class="fe-circle-text">35%</span>' +
      '              </div>' +
      '              <p class="fe-logo-text">Time saved on <br> data entry</p>' +
      '          </div>' +
      '          <div class="fe-circles">' +
      '              <div class="fe-circle-img">' +
      '                  <img src="https://d27c6j8064skg9.cloudfront.net/FE/SS/5.1/circlebackground.png">' +
      '                  <span class="fe-circle-text">40%</span>' +
      '              </div>' +
      '              <p class="fe-logo-text">Time saved on <br> reporting</p>' +
      '          </div>' +
      '      </div>' +
      '      <div class="fe-circle-down">' +
      '          <div class="fe-circles">' +
      '              <div class="fe-circle-img">' +
      '                  <img src="https://d27c6j8064skg9.cloudfront.net/FE/SS/5.1/circlebackground.png">' +
      '                  <span class="fe-circle-text">25%</span>' +
      '              </div>' +
      '              <p class="fe-logo-text">Time saved on data <br> integrity & maintenance</p>' +
      '          </div>' +
      '      </div>' +
      '  </div>';

    var fe_servingLogo = '' +
      '  <div class="fe-serving-logo-content">' +
      '      <p class="fe-servingLogo-headline">Serving social good organizations <br> for over 20 years</p>' +
      '      <div class="fe-serving-logo">' +
      '          <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SS/05/cis_logo.svg" alt="" class="fe-logo-1">' +
      '          <img src="https://d27c6j8064skg9.cloudfront.net/FE/SS/5.1/logo-linc.svg" alt="" class="fe-logo-2">' +
      '          <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SS/05/HAWC45thAnnivLogo.svg" alt="" class="fe-logo-3">' +
      '          <img src="https://www.aafscny.org/wp-content/uploads/2018/11/logo.png" alt="" class="fe-logo-4">' +
      '          <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SS/05/BCS_logo.svg" alt="" class="fe-logo-5">' +
      '      </div>' +
      '  </div>';

    /* Variation Init */

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

    function init() {

      document.querySelector('.wp-block-ws-section.has-background h1.wp-block-ws-page-title').innerHTML = 'See how Apricot 360 can work </br> for your organization';
      document.querySelector('.wp-block-ws-section.has-background h1.wp-block-ws-page-title').insertAdjacentHTML('afterend', '<p class="fe-subheading">Purpose-built to support our clients’ needs, Apricot 360 provides:</p>');
      document.querySelector('.wp-block-ws-section.has-background  .wp-block-ws-split-half > ul').innerHTML = feList;

      document.querySelector(".wp-block-ws-section.has-background .wp-block-ws-split-half>ul").insertAdjacentHTML("afterend", fe_circles);

      document.querySelector(".wp-block-ws-section.has-background").insertAdjacentHTML("afterend", fe_servingLogo);
      document.querySelector(".desktop-nav .container-full").classList.add("container");
      document.querySelector(".mobile-nav .container-fluid").classList.add("container");

      onLoadMktoForms2(function(){
        MktoForms2.whenReady(function (form) {
          document.querySelector(".card-body .mktoFormRow").insertAdjacentHTML("beforebegin", "<div class='fe-firstRow-mktfrm'></div><div class='fe-secondRow-mktfrm'></div><div class='fe-thirdRow-mktfrm'></div>");

          var firstMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow:nth-child(5)");
          var secMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow:nth-child(6)");
          var thirdMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow:nth-child(7)");
          var fourthMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow:nth-child(8)");
          var fifthMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow:nth-child(9)");
          var sixMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow:nth-child(10)");
    
          // 1st row
          document.querySelector(".fe-firstRow-mktfrm").insertAdjacentElement("afterbegin", secMkto);
          document.querySelector(".fe-firstRow-mktfrm").insertAdjacentElement("afterbegin", firstMkto);
    
          // sec row
          document.querySelector(".fe-secondRow-mktfrm").insertAdjacentElement("afterbegin", fourthMkto);
          document.querySelector(".fe-secondRow-mktfrm").insertAdjacentElement("afterbegin", thirdMkto);
    
          // third row
          document.querySelector(".fe-thirdRow-mktfrm").insertAdjacentElement("afterbegin", sixMkto);
          document.querySelector(".fe-thirdRow-mktfrm").insertAdjacentElement("afterbegin", fifthMkto);
    
          // Set Placeholder form work
          document.querySelector("#FirstName").setAttribute("placeholder", "First Name");
          document.querySelector("#LastName").setAttribute("placeholder", "Last Name");
          document.querySelector("#Email").setAttribute("placeholder", "Email Address");
          document.querySelector("#Phone").setAttribute("placeholder", "Phone number");
          document.querySelector("#Company").setAttribute("placeholder", "Organization name");
          document.querySelector(".card-body .wp-block-ws-form").insertAdjacentHTML("beforebegin", "<h2 class='fe-form-heading'>Get your free <br> personalized demo</h2>");
    
          document.querySelector("#industryType option").innerHTML = "What type of organization are you?...";
          document.querySelector("#jobDepartment option").innerHTML = "Which best describes your department?...";
          document.querySelector("#jobLevel option").innerHTML = "What is your job?...";
          document.querySelector("#Country option").innerHTML = "Country...";
          document.querySelector("[type='submit']").innerText = 'Get your free demo';
          if (window.screen.width < 768){
            document.querySelector("#industryType option").innerHTML = "What type of organization are you?";
            document.querySelector("#jobDepartment option").innerHTML = "Which best describes your department?";
            document.querySelector("#jobLevel option").innerHTML = "What is your job?";
            document.querySelector("#Country option").innerHTML = "Country";
          }
  
          helper.live('#Country','change',function(){
            if(document.querySelector("#State option")){
              document.querySelector("#State option").innerHTML = "State...";
              if (window.screen.width < 768){
                document.querySelector("#State option").innerHTML = "State";
              }
            } 
            helper.waitForElement('#State option',function(){
              document.querySelector("#State option").innerHTML = "State...";
              if (window.screen.width < 768){
                document.querySelector("#State option").innerHTML = "State";
              }
            },50,15000)
          })
  
          helper.live('#industryType','change',function(){
            if(document.querySelector("#Industry option")){
              document.querySelector("#Industry option").innerHTML = "What best describes your programs?...";
              if (window.screen.width < 768){
                document.querySelector("#Industry option").innerHTML = "What best describes your programs?";
              }
            }   
            helper.waitForElement('#State option',function(){
              document.querySelector("#Industry option").innerHTML = "What best describes your programs?...";
              if (window.screen.width < 768){
                document.querySelector("#Industry option").innerHTML = "What best describes your programs?";
              }
            },50,15000)
          })
  
          form.onSuccess(function(values, followUpUrl) {
            TrackGAEvent('funnelenvy', 'Click', 'Submit CTA click');  
          });

        })
      },50,15000)

      // mobile
      _$(".wp-block-ws-section.has-background").insertAfter(fe_circlesMob);

      // goal part 
      helper.live("#FirstName, #LastName, #Email, #Company, #Phone, #Country, #State,#industryType, #Industry, #jobDepartment, #jobLevel", "click", function () {
        TrackGAEvent('funnelenvy', 'Click', 'Form engagement');
      }) 

    }

    /* Initialize variation */
    helper.waitForElement(".card-body .mktoFormRow", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();