(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "";
    /* all Pure helper functions */
    function waitForElement(
      selector,
      trigger,
      delayInterval,
      delayTimeout
    ) {
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
    /* Variation functions */
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

    var htmlString =
      "" +
      '<div class="sectionContent">' +
      "  <ul>" +
      "      <li>Manage all your fundraising activities in one place</li>" +
      "      <li>Build stronger relationships with your donors and raise more</li>" +
      "      <li>Become a more confident fundraiser with built-in guidance and free support</li>" +
      "  </ul>" +
      "</div>";
    /* Variation Init */
    function init() {
      /* start your code here */

      document
        .querySelector("#multistepId")
        .classList.add("fe_step1");
      firstStepInputValidate();
      // insert bullet points for mobile
      document
        .querySelector(".section-mob-heading")
        .insertAdjacentHTML("afterend", htmlString);
      // add heading in the form box
      document
        .querySelector(".stepPaginationContainer")
        .insertAdjacentHTML(
          "beforebegin",
          '<h3 class="fe_mobile_heading">Fill out the form below to get your personalized demo!</h3>'
        );
      // add heading in 3rd step
      document
        .querySelector(".sectionRight .marketoForm[data-step='3']")
        .insertAdjacentHTML(
          "afterbegin",
          '<h3 class="fe_step3_heading">You\'re one step away from getting a personalized demo!</h3>'
        );

      live(".stepField #bm-next-one-1", "mousedown", function () {
        if ("ga" in window) {
          ga.getAll()[0].send("event", {
            eventCategory: "funnelenvy",
            eventAction: "click",
            eventLabel: "MSF N4g14-1_variation Step 1",
          });
        }
      });
      live(".stepField #bm-next-one-2", "mousedown", function () {
        if ("ga" in window) {
          ga.getAll()[0].send("event", {
            eventCategory: "funnelenvy",
            eventAction: "click",
            eventLabel: "MSF N4g14-1_variation Step 2",
          });
        }
      });
      live(
        "[for='Email'] .fe-tooltip-N4G4-paid>img.fe-tooltip-img",
        "mousedown",
        function () {
          if ("ga" in window) {
            ga.getAll()[0].send("event", {
              eventCategory: "funnelenvy",
              eventAction: "click",
              eventLabel: "N4G-14-1_variation mail_ToolTip Click",
            });
          }
        }
      );
      live(
        "[for='Phone'] .fe-tooltip-N4G4-paid>img.fe-tooltip-img",
        "mousedown",
        function () {
          if ("ga" in window) {
            ga.getAll()[0].send("event", {
              eventCategory: "funnelenvy",
              eventAction: "click",
              eventLabel: "N4G-14-1_variation phone_ToolTip Click",
            });
          }
        }
      );

      live(" .contentSec .inputbox", "mousedown", function () {
        if ("ga" in window) {
          ga.getAll()[0].send("event", {
            eventCategory: "MSF engagement",
            eventAction: "click",
            eventLabel: "N4G-1_1-variation Form Engagement",
          });
        }
      });
    }

    function firstStepInputValidate() {
      var signupField = document.querySelectorAll(
        ".resourceMarketoForm .section__form .mktoForm .mktoFormRow input"
      );
      signupField.forEach(function (el) {
        el.addEventListener("input", function (evt) {
          var value = el.value;
          if (!value) {
            el.parentElement.classList.remove("fe_opacity");
            el.parentElement.classList.add("fe_opacity_one");
            return;
          }
          if (value) {
            el.parentElement.classList.remove("fe_opacity_one");
            el.parentElement.classList.add("fe_opacity");
            return;
          }
        });
      });
      document
        .querySelector(".resourceMarketoForm .section__form form ")
        .addEventListener("click", function () {
          if ("ga" in window) {
            ga.getAll()[0].send("event", {
              eventCategory: "funnelenvy",
              eventAction: "click",
              eventLabel: "N4G-14-1_variation Step 3 Form Engagement",
            });
          }
        });
    }
    /* Initialize variation */
    waitForElement(
      ".resourceMarketoForm .section__form .mktoForm .mktoFormRow input",
      init,
      50,
      15000
    );
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
