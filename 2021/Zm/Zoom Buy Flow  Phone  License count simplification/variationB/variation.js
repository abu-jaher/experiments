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

      document.addEventListener("click", function () {
        console.log('clicked');
        helper.waitForElement('.numbers-config h1', function(){

          var fe_callnumber = document.querySelector('.numbers-config .zm-input__inner').value;
          if (document.querySelector('.fe_local')) return;
          if(document.querySelector('.numbers-config h1').innerText.toLocaleLowerCase().indexOf('toll') > -1){
            document.querySelector('.numbers-config h1').insertAdjacentHTML('afterend', '<p class="fe_local">Your New Toll-Free Number is:<span class="fe_span">' + fe_callnumber + '</span></p>');
          }

          if(document.querySelector('.numbers-config h1').innerText.toLocaleLowerCase().indexOf('local') > -1){
            document.querySelector('.numbers-config h1').insertAdjacentHTML('afterend', '<p class="fe_local">Your New Local Number is:<span class="fe_span">' + fe_callnumber + '</span></p>');
          }
          
        }, 50, 15000);

        helper.waitForElement('.numbers-config h2', function(){

          var fe_callnumber = document.querySelector('.numbers-config .zm-input__inner').value;

          if (document.querySelector('.fe_local')) return;

          if(document.querySelector('.numbers-config h2').innerText.toLocaleLowerCase().indexOf('toll') > -1){
            document.querySelector('.numbers-config h2').insertAdjacentHTML('afterend', '<p class="fe_local">Your New Toll-Free Number is:<span class="fe_break"></span><span class="fe_span">' + fe_callnumber + '</span></p>');
          }

          if(document.querySelector('.numbers-config h2').innerText.toLocaleLowerCase().indexOf('local') > -1){
            document.querySelector('.numbers-config h2').insertAdjacentHTML('afterend', '<p class="fe_local">Your New Local Number is:<span class="fe_break"></span><span class="fe_span">' + fe_callnumber + '</span></p>');
          }
          
        }, 50, 15000);

      });

    }

    /* Initialize variation */

    helper.waitForElement("body", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();