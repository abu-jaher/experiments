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
         live : function(selector, event, callback, context) {
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
        setCookie: function (name,value,days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days*24*60*60*1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "")  + expires + "; path=/";
        },  
        getCookie: function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
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

    function onDataHelperLoad(callback) {
            var waitForDatalayer = setInterval(function () {
                if (typeof window.dataLayer != 'undefined') {
                    for (var i = 0; i < dataLayer.length; i++) {
                        if (dataLayer[i].event === 'gtm.formSubmit' && dataLayer[i]["gtm.elementClasses"].indexOf('interested-contact-form-component') > -1) {
                            // Break out of the loop since we found the event
                            clearInterval(waitForDatalayer);
                            callback();
                            break;
                        }
                    }
                }
            }, 30);
    }    

    var helper = _$();
    function validateEmail(email) {
      var re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    /* Variation Init */
    window._vis_opt_queue = window._vis_opt_queue || [];
    function init() {
      if(window.location.pathname == '/courses/software-engineering-career-track/'){
        helper.live('.fe_bottom_stickyContButton','click',function(){
          helper.setCookie('fe_SecSticky_cta','fe_click_1',1)
        })
      }
      if(window.location.pathname == '/courses/data-science-career-track/'){
        helper.live('.fe_bottom_stickyContButton','click',function(){
          helper.setCookie('fe_DscSticky_cta','fe_click_1',1)
        })
      }
      // sec custom events
      if(window.location.pathname == '/courses/foundations-to-core-software-engineering/'){
        helper.live('.start-application-form button','click',function(){
          if(helper.getCookie('fe_SecSticky_cta') == 'fe_click_1'){
            email = document.querySelector('.start-application-form input').value;
            // validate the email
            var validate = /^([A-Za-z0-9_\+\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (email.match(validate)) {
              helper.setCookie('fe_SecFormSubmit','fe_click_2',1)
            }
          }
        })
      }
      if(window.location.pathname.indexOf('post-app/sec-qual') > -1 ){
        if(helper.getCookie('fe_SecFormSubmit') == 'fe_click_2'){
          window._vis_opt_queue.push(function() {_vis_opt_goal_conversion(303);});
          helper.setCookie('fe_SecFormSubmit','',1)
          helper.setCookie('fe_SecSticky_cta','',1)
        }
      }
      // DSC custom events
      if(window.location.pathname == '/courses/foundations-to-core-data-science/'){
        helper.live('.start-application-form button','click',function(){
          if(helper.getCookie('fe_DscSticky_cta') == 'fe_click_1'){
            email = document.querySelector('.start-application-form input').value;
            // validate the email
            var validate = /^([A-Za-z0-9_\+\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (email.match(validate)) {
              helper.setCookie('fe_DscFormSubmit','fe_click_2',1)
            }
          }
        })
      }
      if(window.location.pathname.indexOf('post-app/dsc-qual') > -1){
        if(helper.getCookie('fe_DscFormSubmit') == 'fe_click_2'){
          window._vis_opt_queue.push(function() {_vis_opt_goal_conversion(302);});
          helper.setCookie('fe_DscFormSubmit','',1)
          helper.setCookie('fe_DscSticky_cta','',1)
        }
      }

      // NEW -  Begin Application (Aggregate)
      helper.live('#apply-now button', 'mousedown', function () {
          var email = document.querySelector('#apply-now input');
          if (email && validateEmail(email.value)) {
            window._vis_opt_queue.push(function() {_vis_opt_goal_conversion(316);});
          }
      })      
      
      // NEW - Request Syllabus (Aggregate)
      onDataHelperLoad(function () {
        // syllabus requested
        window._vis_opt_queue.push(function() {_vis_opt_goal_conversion(321);});
      })

    }
    /* Initialize variation */
    helper.waitForElement("body", init, 50, 5000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();