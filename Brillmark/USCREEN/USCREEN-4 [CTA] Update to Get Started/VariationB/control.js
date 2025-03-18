(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "USCREEN-7 -Nav-Simplified What You Get";

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
        insertAfter: function (v) {
          return this.each(function (i) {
            i.insertAdjacentHTML("afterEnd", v);
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
                    nodes = (node.parentNode || node.document).querySelectorAll(
                      selector
                    ),
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
        addClass: function (v) {
          var a = v.split(" ");
          return this.each(function (i) {
            for (var x = 0; x < a.length; x++) {
              if (i.classList) {
                i.classList.add(a[x]);
              } else {
                i.className += " " + a[x];
              }
            }
          });
        },
        trackGAEvent(eventCategory, eventAction, eventLabel) {
          if ("ga" in window) {
            ga.getAll()[0].send("event", {
              eventCategory: eventCategory,
              eventAction: eventAction,
              eventLabel: eventLabel,
            });
          }
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
      // click gaol for both control and variation
      // click on What you get
      helper.live(
        "header .main-nav-item:first-child >button",
        "click",
        function () {
          helper.trackGAEvent("funnelenvy", "click", "What you get click");
        }
      );

      // variation goals
      // click on Video Content Management
      helper.live(".fe-uscreen7 .fe-link_one", "click", function () {
        helper.trackGAEvent("funnelenvy", "click", "Video Content Management");
      });
      // click on Video Monetization
      helper.live(".fe-uscreen7 .fe-link_two", "click", function () {
        helper.trackGAEvent("funnelenvy", "click", "Video Monetization");
      });
      // click on Marketing Tools
      helper.live(".fe-uscreen7 .fe-link_three", "click", function () {
        helper.trackGAEvent("funnelenvy", "click", "Marketing Tools");
      });
      // click on Mobile & TV Apps
      helper.live(".fe-uscreen7 .fe-mobile-tv-nav", "click", function () {
        helper.trackGAEvent("funnelenvy", "click", "Mobile & TV Apps");
      });

      // control goals
      // click on Mobile & TV Apps
      helper.live(
        "header .main-nav-item:first-child .dropdown-blocks a:nth-child(1)",
        "click",
        function () {
          helper.trackGAEvent("funnelenvy", "click", "Mobile & TV Apps");
        }
      );
      // click on Live Streaming
      helper.live(
        "header .main-nav-item:first-child .dropdown-blocks a:nth-child(2)",
        "click",
        function () {
          helper.trackGAEvent("funnelenvy", "click", "Live Streaming");
        }
      );
      // click on Video Monetization
      helper.live(
        "header .main-nav-item:first-child .dropdown-blocks a:nth-child(3)",
        "click",
        function () {
          helper.trackGAEvent("funnelenvy", "click", "Video Monetization");
        }
      );
      // click on Marketing and Analytics
      helper.live(
        "header .main-nav-item:first-child .dropdown-blocks a:nth-child(4)",
        "click",
        function () {
          helper.trackGAEvent("funnelenvy", "click", "Marketing and Analytics");
        }
      );
      // click on Video CMS
      helper.live(
        "header .main-nav-item:first-child .dropdown-blocks a:nth-child(5)",
        "click",
        function () {
          helper.trackGAEvent("funnelenvy", "click", "Video CMS");
        }
      );
      // click on Video Player
      helper.live(
        "header .main-nav-item:first-child .dropdown-blocks a:nth-child(6)",
        "click",
        function () {
          helper.trackGAEvent("funnelenvy", "click", "Video Player");
        }
      );
      // click on Customization
      helper.live(
        "header .main-nav-item:first-child .dropdown-blocks a:nth-child(7)",
        "click",
        function () {
          helper.trackGAEvent("funnelenvy", "click", "Customization");
        }
      );
      // click on Community
      helper.live(
        "header .main-nav-item:first-child .dropdown-blocks a:nth-child(8)",
        "click",
        function () {
          helper.trackGAEvent("funnelenvy", "click", "Community");
        }
      );
      // click on Security
      helper.live(
        "header .main-nav-item:first-child .dropdown-blocks a:nth-child(9)",
        "click",
        function () {
          helper.trackGAEvent("funnelenvy", "click", "Security");
        }
      );

      // uscreen test -04 goal

      // variation goal
      //  click on Get_Started_CTA
      helper.live(
        '.test04[href="https://www.uscreen.tv/request-demo/"]',
        "click",
        function () {
          helper.trackGAEvent("funnelenvy", "click", "Get_Started_CTA");
        }
      );

      // click on Nav CTA
      helper.live(
        '.fe-header[href="https://www.uscreen.tv/request-demo/"]',
        "click",
        function () {
          helper.trackGAEvent("funnelenvy", "click", "header_CTA");
        }
      );
    }

    /* Initialise variation */
    helper.waitForElement("header .main-nav-item", init, 50, 5000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();