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
        waitForElement: function (selector, trigger) {
          var interval = setInterval(function () {
            if (_$(selector).value.length) {
              clearInterval(interval);
              trigger();
            }
          }, 50);
          setTimeout(function () {
            clearInterval(interval);
          }, 15000);
        },
      };
      return function (selector) {
        return new bm(selector);
      };
    });
    var helper = _$();

    // Dispatch event value
    function setNativeValue(element, value) {
      element.value = value;
      let event = new Event("input", { bubbles: true });
      element.dispatchEvent(event);
    }

    /* Variation Init */
    function init() {
      var formInputs = document.querySelectorAll("form input");
      var localData = localStorage.getItem("fe_formSubmitted");
      localData = localData && JSON.parse(localData);

      // If input and localData available
      if (formInputs.length > 0 && localData) {
        // Main object
        var obj = {};
        Object.keys(localData).forEach(function (key) {
          if (key.includes("Full name")) {
            var name = localData[key],
              firstName = name.split(" ")[0],
              lastName = name.split(" ")[1] || "";

            obj["firstName"] = firstName;
            obj["lastName"] = lastName;
          } else if (key.includes("email address")) {
            obj["email"] = localData[key];
          }
        });

        var firstName = formInputs[0];
        setNativeValue(firstName, obj[firstName.getAttribute("name")]);

        setTimeout(function(){
          var lastName = formInputs[1];
          setNativeValue(lastName, obj[lastName.getAttribute("name")] || "");
        },250)

        setTimeout(function(){
          var email = formInputs[2];
          setNativeValue(email, obj[email.getAttribute("name")] || "");
        },500)

      }
    }

    /* Initialise variation */
    helper.waitForElement("form input", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();