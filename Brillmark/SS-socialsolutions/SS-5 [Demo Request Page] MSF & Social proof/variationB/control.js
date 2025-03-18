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

    var helper = _$();
    /* Variation Init */
    function init() {
      onLoadMktoForms2(
        function () {
          MktoForms2.whenReady(function (form) {
            form.onSuccess(function(values, followUpUrl){
              trackGAEvent('funnelenvy','Click','Submit CTA click');
            })
          });
        },50,15000);
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

    /* Initialise variation */
    helper.waitForElement("body", init, 50, 5000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();  
  