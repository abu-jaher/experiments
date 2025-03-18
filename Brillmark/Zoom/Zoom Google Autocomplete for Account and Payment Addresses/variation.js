(function () {
  console.log("/buy/subscription", "QA log");
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "Google Autocomplete for Account and Payment Addresses";

    // location marker
    var locationMarker =
      "" +
      '  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="16px" id="Layer_1" style="enable-background:new 0 0 16 16;" version="1.1" viewBox="0 0 16 16" width="14px" xml:space="preserve"><path d="M8,0C4.687,0,2,2.687,2,6c0,3.854,4.321,8.663,5,9.398C7.281,15.703,7.516,16,8,16s0.719-0.297,1-0.602  C9.679,14.663,14,9.854,14,6C14,2.687,11.313,0,8,0z M8,10c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S10.209,10,8,10z M8,4  C6.896,4,6,4.896,6,6s0.896,2,2,2s2-0.896,2-2S9.104,4,8,4z"/></svg>';

    //wait for element
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
    //remove class
    function removeClass(selector, cls) {
      var el = document.querySelectorAll(selector);
      if (el.length > 0) {
        el.forEach(function (item) {
          item.classList.contains(cls) && item.classList.remove(cls);
        });
      }
    }
    //add Class
    function addClass(selector, cls) {
      var el = document.querySelector(selector);
      el && el.classList.add(cls);
    }
    //live click method
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
    //debounce
    function debounce(func, timeout = 300) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, timeout);
      };
    }

    /**
     * get result when user type on input field
     */
    //insert results into
    function insertSearchResults(data, selector) {
      var html = "";
      removeClass(".fe_resultListMain", "fe_showResults");
      if (data && data.result && data.result.length > 0) {
        data.result.forEach(function (item) {
          html +=
            '<li id="' +
            item.placeId +
            '" class="fe_searchResult"><span>' +
            locationMarker +
            "</span>" +
            item.positionDesc +
            "</li>";
        });
        addClass("" + selector + " .fe_resultListMain", "fe_showResults");
      }

      //insert new search results
      var resultEl = document.querySelector("" + selector + " .fe_resultList");
      resultEl && (resultEl.innerHTML = html);
    }

    //fetch search result
    function fetchSearchResult(val, callback, selector) {
      var url = "/buy/google/maps/autocomplete?input=" + val + "&language=en";

      //get location info
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          var result = JSON.parse(this.responseText);
          callback(result, selector);
        }
      };
      xmlHttp.open("GET", url, true);
      xmlHttp.send(null);
    }

    /**
     * fetch location information
     * eg. city, country, state, pin etc
     * and then fill the infomation in respective fields
     */
    function changeValue(selector, newValue) {
      var el = document.querySelector(selector);
      if (newValue == "" || newValue) {
        el && (el.value = newValue);
      }
    }
    //update form field
    function updateFieldData(data, selector) {
      var elm = document.querySelector(selector);
      if (elm) {
        //country
        var countryField = elm.querySelector("#country-input");

        //location info
        var locInfo = {
          country: null,
          state: null,
          city: null,
          postalCode: null,
          companyHq: null,
        };

        // storing api data to object
        locInfo.country = data.country || "";
        locInfo.state = data.state || "";
        locInfo.city = data.city || "";
        locInfo.postalCode = data.postalCode || "";
        locInfo.companyHq = data.country || "";

        //change city
        changeValue("" + selector + " #city-input", locInfo.city);

        //postal code
        changeValue("" + selector + " #zip-input", locInfo.postalCode);

        //company hq
        if (locInfo.companyHq) {
          var country = elm.querySelector('#country-input option[value="' + locInfo.companyHq + '"]');
          var countryHq = elm.querySelector('#company-headquarters-input option[value="' + locInfo.companyHq + '"]');

          country && (country.selected = true);
          countryHq && (countryHq.selected = true);
        }

        //change country field
        if (countryField) {
          countryField.dispatchEvent(new Event("change", { bubbles: true }));
        }

        //get new state field element
        var stateField = elm.querySelector("#state-input");
        if (stateField && (locInfo.state || locInfo.state == "")) {
          stateField.value = locInfo.state;
          stateField.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
    }
    //fill the location info in respective filds
    function fillLocationInfo(data, selector) {
      if (data.result) {
        var newData = data.result.positionDesc;
        newData = newData && JSON.parse(newData);

        //udpate field data
        updateFieldData(newData, selector);
      }
    }
    //get location information
    function fetchLocationInfo(locationId, callback, selector) {
      var url = "/buy/google/maps/place/details?place_id=" + locationId + "";

      //get location info
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          var result = JSON.parse(this.responseText);
          callback(result, selector);
        }
      };
      xmlHttp.open("GET", url, true);
      xmlHttp.send(null);
    }

    function _insertResultSection() {
      // ADDRESS FIELD
      var addressField = document.querySelectorAll(".address1 #address-line1-input");

      //insert result list
      addressField.forEach(function (item) {
        var filterListAndLabel =
          '<div class="fe_resultListMain"><ul class="fe_resultList"></ul><div class="fe_googleBadge"><span><img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/zoom/zoom-autocomplete/google.png"/></span></div></div>';
        item.parentElement.insertAdjacentHTML("afterend", filterListAndLabel);
      });
    }

    /* Variation Init */
    function init() {
      _insertResultSection();

      //type on address field
      var searchResults = debounce((val, selector) => fetchSearchResult(val, insertSearchResults, selector), 400);
      live(".address1 #address-line1-input", "input", function () {
        var val = this.value;
        if (val.length >= 3) {
          if (this.closest(".soldto_contact_info_fields")) {
            searchResults(val, ".soldto_contact_info_fields");
          } else {
            searchResults(val, ".billto_contact_info_fields");
          }
        }
      });

      //focus out
      live(".address1 #address-line1-input", "focusout", function () {
        var val = this.value;
        if (val.length == 0) {
          var data = {
            state: "",
            city: "",
            postalCode: "",
            country: "",
          };
          if (this.closest(".soldto_contact_info_fields")) {
            //udpate field data
            updateFieldData(data, ".soldto_contact_info_fields");
          } else {
            //udpate field data
            updateFieldData(data, ".billto_contact_info_fields");
          }
        }
      });

      //click on address input field show the results if already exists
      live(".address1 #address-line1-input", "click", function () {
        var mainForm = this.closest(".soldto_contact_info_fields, .billto_contact_info_fields");
        var resultList = mainForm && mainForm.querySelector(".fe_resultListMain");
        var resultLength = mainForm && mainForm.querySelectorAll(".fe_resultList .fe_searchResult");
        if (resultLength.length > 0) {
          resultList && resultList.classList.add("fe_showResults");
        }
      });

      //click on search options
      live(".fe_searchResult", "click", function () {
        // ADDRESS FIELD
        var addressField = document.querySelectorAll(".address1 #address-line1-input");

        //insert the text
        var address = this.innerText;
        address = address && address.split(",")[0];
        if (this.closest(".soldto_contact_info_fields")) {
          fetchLocationInfo(this.id, fillLocationInfo, ".soldto_contact_info_fields");
          addressField[1] && (addressField[1].value = address);
        } else {
          fetchLocationInfo(this.id, fillLocationInfo, ".billto_contact_info_fields");
          addressField[0].value = address;
        }

        removeClass(".fe_resultListMain", "fe_showResults");
      });

      //click outside of input box and autofill result
      live("body", "click", function (e) {
        if (!e.target.closest(".address1") && !e.target.closest(".fe_resultListMain")) {
          removeClass(".fe_resultListMain", "fe_showResults");
        }
      });
    }

    /* Initialize variation */
    waitForElement(".address1 #address-line1-input", init);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();