(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "SS-3 [Sitewide Nav] Sticky nav with CTA";

    function waitForElement(selector, trigger) {
      var interval = setInterval(function () {
        if (document && document.querySelector(selector) && document.querySelectorAll(selector).length > 0) {
          clearInterval(interval);
          trigger();
        }
      }, 50);
      setTimeout(function () {
        clearInterval(interval);
      }, 15000);
    }
    function TrackGAEvent($eventCategory, $eventAction, $eventLabel) {
      if ("ga" in window) {
        ga.getAll()[0].send("event", {
          eventCategory: $eventCategory,
          eventAction: $eventAction,
          eventLabel: $eventLabel,
        });
      }
    }
    function removeClass(selector, cls) {
      var el = document.querySelector(selector);
      if (el && el.classList.contains(cls)) {
        el.classList.remove(cls);
      }
    }
    function debounce(func, timeout = 300) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, timeout);
      };
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
        (function (ElementPrototype) {
          ElementPrototype.matches =
            ElementPrototype.matches ||
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
        })(Element.prototype);
      // live binding helper using matchesSelector
      function live(selector, event, callback, context) {
        addEvent(context || document, event, function (e) {
          var found,
            el = e.target || e.srcElement;
          while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
          if (found) callback.call(el, e);
        });
      }
      live(selector, event, callback, context);
    }

    var StickyNav =
      "" +
      '  <div class="fe-request-demo-cta">' +
      "         <p>Empower your organization with best-in-class case management.</p>" +
      '         <a class="wp-block-button__link has-sugar-color has-matcha-background-color has-text-color has-background" href="https://www.socialsolutions.com/request-a-demo/" style="border-radius:50px">Request a demo</a>' +
      "  </div>";

    //on scroll change function
    var lastScroll = 0;
    function scrollChangeClass(currentScroll) {
      if (lastScroll < currentScroll && currentScroll > 50) {
        document.body.classList.add("fe-nav-scroll");
      } else {
        removeClass("body", "fe-nav-scroll");
      }
      //update last scroll value
      lastScroll = currentScroll;
    }

    function init() {
      document.querySelector("header #desktop-main-menu").insertAdjacentHTML("afterend", StickyNav);

      //debounce initialization
      var scrollActive = debounce(function (scrollEl) {
        scrollChangeClass(scrollEl);
      }, 20);

      //on window scroll
      window.addEventListener("scroll", function () {
        var currentScroll = window.scrollY;
        scrollActive(currentScroll);
      });

      //goals
      live(".fe-request-demo-cta a.has-background", "click", function () {
        TrackGAEvent("funnelenvy", "Click", "Sticky nav CTA click");
      });
    }

    /* Initialise variation */
    waitForElement("header #desktop-main-menu", init);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
