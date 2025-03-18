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

    /* Variation Init */
    function init() {
      /* start your code here */


     
      // goals

      live('.hero__body .resource__body .resource__actions a','click',function(){
        trackGAEvent('funnelenvy','Click','Clicks on Blog posts "Read more" CTA')
      })

      live('.hero__body > .resource .resource__tags ul li a','click',function(){
        trackGAEvent('funnelenvy','Click','Clicks on Blog posts CTA')
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

    /* Initialize variation */
    if(window.screen.width > 1199){
      waitForElement('.hero__body .resource__body .resource__actions a', init, 100, 25000);   
    }

  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
