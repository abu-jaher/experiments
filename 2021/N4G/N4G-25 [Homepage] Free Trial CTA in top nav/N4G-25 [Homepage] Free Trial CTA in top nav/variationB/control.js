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
        append: function (v) {
                  return this.each(function (i) {
                    i.insertAdjacentHTML('beforeEnd', v);
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
        }
      };
      return function (selector) {
        return new bm(selector);
      };
    });
    function trackGAEvent(eventCategory, eventAction, eventLabel) {
      if ('ga' in window) {
        ga.getAll()[0].send('event', {
          eventCategory: eventCategory,
          eventAction: eventAction,
          eventLabel: eventLabel,
        });
      }
    }

    var helper = _$();
    /* Variation Init */
    function init() {
      helper.live('.header__inner .header__content .nav-access>ul li:nth-child(2) a','click',function(){
        trackGAEvent('funnelenvy','Click','Request Demo top nav CTA');
      });

      helper.live('.fe-nav .buttonSectionHeader>a:nth-child(1)','click',function(){
        trackGAEvent('funnelenvy','Click','Primary CTA clicks (dynamic nav)');
      });

      helper.live('.fe-nav .buttonSectionHeader>a:nth-child(2)','click',function(){
        trackGAEvent('funnelenvy','Click','Secondary CTA clicks (dynamic nav)');
      });
      
    }

    /* Initialise variation */
    helper.waitForElement(".header__inner .header__content .nav-access>ul li:nth-child(2) a", init, 50, 5000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();