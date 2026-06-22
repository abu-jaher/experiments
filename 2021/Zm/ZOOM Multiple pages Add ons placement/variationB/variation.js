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
      live(".buy-flow-footer #save_config_btn", "mousedown", function () {
        utils.waitForElement('button[data-link-label="Skip This Step"]').then(function () {
          document.querySelector('button[data-link-label="Skip This Step"]').click();
        });
      });
    }

    init();
  } catch (e) {
    console.log(e, "error in Test" + variation_name);
  }
})();
