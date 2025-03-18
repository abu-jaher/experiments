(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "N4G-30 [Homepage] Money-Back Guarantee v1";

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
        beforeEnd: function (v) {
          return this.each(function (i) {
            i.insertAdjacentHTML('beforeend', v);
          });
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
    function live(selector, event, callback, context) {
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
    }

    var helper = _$();

    var moneyGrnty = '' +
      '  <div class="fe_30_guaranty_section" >' +
      '      <div class="fe-30-guarantee" >' +
      '          <div class="fe-30-money_icon" >' +
      '                <img src="https://fe-test-dev.s3.amazonaws.com/N4G/30/Money_Icon.svg" alt="" title="">' +
      '          </div>' +
      '          <div class="fe-30-guarantee__text" >' +
      '             <p> <span class="fe-30-bold">We guarantee you\'ll raise more in your first year or your money back. </span><a href="https://www.networkforgood.com/money-back-guarantee/" target="_blank" class="fe-30-terms">Terms and conditions apply.</a></p>' +
      '         </div>' +
      '      </div>' +
      '  </div>';

    /* Variation Init */
    function init() {
      _$(".organization__image-figure").beforeEnd(moneyGrnty);

      // Goal part
      live(".fe-30-terms", "click", function () {
        trackGAEvent("funnelenvy", "click", "T&C clicks")
      });
    }

    function trackGAEvent(eventCategory, eventAction, eventLabel) {
      if ("ga" in window) {
        ga.getAll()[0].send("event", {
          eventCategory: eventCategory,
          eventAction: eventAction,
          eventLabel: eventLabel,
        });
      }
    }


    /* Initialize variation */
    helper.waitForElement(".organization__image-figure", init, 50, 25000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();