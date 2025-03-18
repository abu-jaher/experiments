(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "USCREEN-4 [CTA] Update to Get Started";

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
          return typeof v == "undefined"
            ? this.value[0].innerHTML
            : this.each(function (i) {
                i.innerHTML = v;
              });
        },
        attr: function (a, v) {
          return this.each(function (i) {
            i.setAttribute(a, v);
          });
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
    function initHeader(){
      _$('body').addClass("fe-uscreen-4");
      _$('.header .ui-button').addClass("fe-header");
      _$('.header .ui-button').html('Get Started');
      _$('.header .ui-button').attr("href","https://www.uscreen.tv/request-demo/");

    }

    function initHomePage() {
      _$('body').addClass("fe-uscreen-4");
      _$('[data-block="hero"] .btn-primary').addClass("test04");
      _$('[data-block="hero"] .btn-primary').html("Get Started");
      _$('[data-block="hero"] .btn-primary').attr("href","https://www.uscreen.tv/request-demo/");
    }

    function initOtherPage() {
      _$('body').addClass("fe-uscreen-4");
      _$('.hero-grid [href="https://www.uscreen.tv/pricing/"]').addClass("test04");
      _$('.hero-grid [href="https://www.uscreen.tv/pricing/"]').html("Get Started");
      _$('.hero-grid [href="https://www.uscreen.tv/pricing/"]').attr("href","https://www.uscreen.tv/request-demo/");
    }

    function specialPage() {
      _$('body').addClass("fe-uscreen-4");
      _$('.hero-grid [href="https://www.uscreen.tv/request-demo/"]').addClass("test04");
      _$('.hero-grid [href="https://www.uscreen.tv/request-demo/"]').html("Get Started");
      _$('.hero-grid [href="https://www.uscreen.tv/request-demo/"]').attr("href","https://www.uscreen.tv/request-demo/");
    }

    function initAlterPage() {
      _$('body').addClass("fe-uscreen-4");
      _$('.hero .ui-button').addClass("test04");
      _$('.hero .ui-button').html("Get Started");
      _$('.hero .ui-button').attr("href","https://www.uscreen.tv/request-demo/");
    }

    function initOnlyRequestCTA(){
      _$('.uv2--header-block [href="https://www.uscreen.tv/request-demo/"]').addClass("test04");
      _$('.uv2--header-block [href="https://www.uscreen.tv/request-demo/"]').html("Get Started");
      _$('.uv2--header-block [href="https://www.uscreen.tv/request-demo/"]').attr("href","https://www.uscreen.tv/request-demo/");
    }

    /* Initialise variation */
    helper.waitForElement('.header .ui-button', initHeader, 50, 15000);
    helper.waitForElement('[data-block="hero"] .btn-primary', initHomePage, 50, 15000);
    helper.waitForElement('.hero-grid [href="https://www.uscreen.tv/pricing/"]', initOtherPage, 50, 15000);
    helper.waitForElement('.hero-grid [href="https://www.uscreen.tv/request-demo/"]', specialPage, 50, 15000);
    helper.waitForElement('.uv2--header-block [href="https://www.uscreen.tv/request-demo/"]', initOnlyRequestCTA, 50, 15000);
    // helper.waitForElement('.hero .ui-button', initAlterPage, 50, 15000);

    (function(){
      var dimension = 4; // Desired Custom Dimension
      var variationString = "USCREEN-4: [Sitewide] Single CTA Get Started to demo page V1"; //Descriptive Name Of Campaign: Variation
      var forceClearInterval = false;
    
    
      (function poll() {
          if (forceClearInterval) return;
          if (window.ga && window.ga.getAll) {
              tracker = window.ga.getAll()[0].get('name');
              // set the custom dimension
              window.ga(tracker + '.set', 'dimension' + dimension, variationString);
              // send the event to GA
              window.ga(tracker + ".send", "event", "funnelenvy", variationString, {
                  "nonInteraction": 1
                  });
          } else {
              setTimeout(poll, 250);
          }
      })();
    setTimeout(function() {
      forceClearInterval = true
    }, 10000)
    
  })();
    
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();