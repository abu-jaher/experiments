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

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    var helper = _$();
    /* Variation Init */

    window['optimizely'] = window['optimizely'] || [];
    
    function init() {

      sessionStorage.setItem('getCookieValue',getCookie('buyplanCookie'));

    }

    function eventsTrigger(){

      if(sessionStorage.getItem('getCookieValue').indexOf('yearly_c50') > -1){
        window['optimizely'].push({
          type: "event",
          eventName: "Meetings Pro Annual Plan Purchase",
          tags: {
            revenue: 0, // Optional in cents as integer (500 == $5.00)
            value: 0.00 // Optional as float
          }
        });
      }

      if(sessionStorage.getItem('getCookieValue').indexOf('monthly_c50') > -1){
        window['optimizely'].push({
          type: "event",
          eventName: "Meetings Pro Monthly Plan Purchase",
          tags: {
            revenue: 0, // Optional in cents as integer (500 == $5.00)
            value: 0.00 // Optional as float
          }
        });
      }

    }

    /* Initialize variation */
    if(window.location.pathname == '/buy/subscription'){
      helper.waitForElement("body", init, 50, 25000);
    }

    if(window.location.pathname == '/buy/zsuccess'){
      helper.waitForElement("body", eventsTrigger, 50, 25000);
    }


  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();