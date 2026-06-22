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

    function getCookie(c_name) {
      var c_value = " " + document.cookie;
      var c_start = c_value.indexOf(" " + c_name + "=");
      if (c_start == -1) {
          c_value = null;
      }
      else {
          c_start = c_value.indexOf("=", c_start) + 1;
          var c_end = c_value.indexOf(";", c_start);
          if (c_end == -1) {
              c_end = c_value.length;
          }
          c_value = unescape(c_value.substring(c_start,c_end));
      }
      return c_value;
    }
  
    function getTaxCalculated(){
  
      var token =  document.querySelector('[name="ZOOM-CSRFTOKEN"]').value
  
      var planData = decodeURIComponent(getCookie('buyplanCookie'));
      
      var adress = '';
      var city = optimizely.get('visitor').location.city;
      var state = '';
      var zip = '';
      var country = optimizely.get('visitor').location.country;
      
      var contact = JSON.stringify({adress,city,state,zip,country})
      
      var eventType = 1
      var currency = getCookie('_zm_currency');
      var taxExempt = false
      
      var myHeaders = new Headers();
      myHeaders.append("X-Requested-With", "XMLHttpRequest, XMLHttpRequest, OWASP CSRFGuard Project");
      myHeaders.append("zoom-csrftoken", token);
      
      var formdata = new FormData();
      formdata.append("buyPlan", planData);
      formdata.append("contact", contact);
      formdata.append("eventType", eventType);
      formdata.append("currency", currency);
      formdata.append("taxExempt", taxExempt);
      
      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
      };
      
      var json;

      fetch("https://zoom.us/tax/estimate", requestOptions)
        .then(response => response.text())
        .then(result => {
          json = result;
          var tax = JSON.parse(json);
          var taxAmount = (tax.data[0].tax[0].taxAmount) / 100;
          helper.waitForElement('#shopping-cart .charge-row, .shopping-cart .charge-row',function(){
            var fe_tax = ''+
            '  <p class="bm-tax-info">'+ 
            '      <span class="bm-today-tax">Estimated Taxes</span>'+ 
            '      <span class="bm-tax-summary">$'+taxAmount.toFixed(2)+'</span>'+ 
            '  </p>';
  
            document.querySelector('#shopping-cart .charge-row, .shopping-cart .charge-row').insertAdjacentHTML('beforeend',fe_tax);
          },50,25000)
          
        })
        .catch(error => console.log('error', error)); 
  
    }

    /* Variation Init */
    function init() {
      getTaxCalculated();
    }

    /* Initialize variation */
    helper.waitForElement('[name="ZOOM-CSRFTOKEN"]', init, 50, 25000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();