(function () {
  "use strict";
  try {
    var debug = 0;
    var variation_name = "ZOOM-3: [Phone Configure] Add urgency";
    window["optimizely"] = window["optimizely"] || [];
    var utils = window["optimizely"].get("utils");

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

    var feContainer =
      "" +
      '<div class="fe-notice-container">' +
      '    <p class="fe-heading-orange">Hurry up! Get your number before someone else grabs it. *</p>' +
      '   <p class="fe-subheading">Phone number reservations are made after checkout is completed.</p>' +
      "</div>";

    function insertInfoBar() {
      if (!document.querySelector(".fe-notice-container")) {
        var inputEl = document.querySelector(
          ".mode-config-module.left .content:not(.is-disabled) .zm-select__input, .form-item-body .config-number-body"
        );
        inputEl && inputEl.insertAdjacentHTML("afterend", feContainer);
      }
    }

    //Change info heading according to input value
    function changeInfoHeading() {
      setTimeout(function () {
        var heading = document.querySelector(".fe-notice-container .fe-heading-orange");
        var input = document.querySelector(".config-number-body .zm-select-input input");
        if (!heading || !input) return;
        var seletedItem = input.value;
        if (parseInt(seletedItem) > 1) {
          heading.innerText = "Hurry up! Get your numbers before someone else grabs them. *";
        } else {
          heading.innerText = "Hurry up! Get your number before someone else grabs it. *";
        }
      }, 300);
    }

    function init() {
      //click on first step options and last step close button
      live(
        ".form-container .phone-number-config >  button:not(:nth-child(3)), .form-item .panel-close-button",
        "mousedown",
        function () {
          utils &&
            utils
              .waitForElement(".mode-config-module.left .content:not(.is-disabled) .zm-select__input")
              .then(insertInfoBar);
          changeInfoHeading();
        }
      );
      //click on let's go button
      live(".mode-config-module.left .footer .go-btn, .select-number-dialog .save-btn", "mousedown", function () {
        utils && utils.waitForElement(".form-item-body .config-number-body").then(insertInfoBar);
        changeInfoHeading();
      });

      //select phone numbers
      live(
        ".config-number-body .zm-select-dropdown__list .zm-select-dropdown__item, .number-form-item .form-item-action button:not(.config-btn)",
        "mousedown",
        function () {
          changeInfoHeading();
        }
      );

      //lets go button click
      live(".phone-number-config .toll-free-number-button", "mousedown", function () {
        utils && utils.waitForElement(".form-item-body .config-number-body").then(insertInfoBar);
        changeInfoHeading();
      });
    }

    /* Initialise variation */
    init();
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
