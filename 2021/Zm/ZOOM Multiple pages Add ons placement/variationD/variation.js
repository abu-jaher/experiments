(function () {
  "use strict";
  try {
    var variation_name = "ZOOM-4: [Multiple pages] Add ons placementy";
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

    function init() {
      //check the current active tab
      utils.waitForElement(".plan-tabs .zm-tabs__nav > div.is-active", function () {
        if (!this.innerText.includes("Phone")) {
          document.body.add("fe_hideAddons");
        }
      });

      live(".buy-flow-footer #save_config_btn", "mousedown", function () {
        utils.waitForElement('button[data-link-label="Skip This Step"]').then(function () {
          document.querySelector('button[data-link-label="Skip This Step"]').click();
        });
      });

      //change tab
      live(
        ".plan-tabs .zm-tabs__nav > div, .zm-message-box__wrapper .zm-message-box__btns button",
        "mousedown",
        function () {
          var bodyClassList = document.body.classList;
          //if button type
          if (this.type) return bodyClassList.add("fe_hideAddons");
          if (this.innerText && !this.innerText.includes("Phone")) {
            bodyClassList.add("fe_hideAddons");
          } else {
            bodyClassList.contains("fe_hideAddons") && bodyClassList.remove("fe_hideAddons");
          }
        }
      );
    }

    init();
  } catch (e) {
    console.log(e, "error in Test" + variation_name);
  }
})();
