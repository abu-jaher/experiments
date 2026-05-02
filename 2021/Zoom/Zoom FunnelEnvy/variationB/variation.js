(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "";

    //search results from the API
    var searchResult = {
      status: true,
      errorCode: 0,
      errorMessage: null,
      result: [
        {
          positionDesc: "Amoeba Music, Hollywood Boulevard, Los Angeles, CA, USA",
          placeId: "ChIJRdmfADq_woARYaVhnfQSUTI",
        },
        {
          positionDesc: "Bmoeba Music, Haight Street, San Francisco, CA, USA",
          placeId: "ChIJ5YQQf1GHhYARPKG7WLIaOko",
        },
        {
          positionDesc: "Cmoeba Music, Telegraph Avenue, Berkeley, CA, USA",
          placeId: "ChIJr7uwwy58hYARBY-e7-QVwqw",
        },
        {
          positionDesc: "Dmoeba Church, North 9th Street, Philadelphia, PA, USA",
          placeId: "ChIJ50tJgVrJxokR_xMjl10cDB0",
        },
        {
          positionDesc: "Emoeba - HM Leisure, Church Street, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka, India",
          placeId: "ChIJ8yiiSnwWrjsRmVzwBO5BqJo",
        },
      ],
    };

    //place results
    var placeData = {
      status: true,
      errorCode: 0,
      errorMessage: null,
      result: [
        {
          positionDesc:
            '{"country":"United States","state":"California","city":"Los Angeles","postalCode":"90028","street":"Hollywood Boulevard","streetNumber":"6200"}',
          placeId: "ChIJRdmfADq_woARYaVhnfQSUTI",
        },
        {
          positionDesc:
            '{"country":"United States","state":"California","city":"Los Angeles","postalCode":"90028","street":"Hollywood Boulevard","streetNumber":"6200"}',
          placeId: "ChIJ5YQQf1GHhYARPKG7WLIaOko",
        },
      ],
    };

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
    function removeClass(selector, cls) {
      var el = document.querySelector(selector);
      if (el) {
        el.classList.contains(cls) && el.classList.remove(cls);
      }
    }
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
    function insertSearchResults(data) {
      var html = "";
      console.log(data);
      removeClass(".fe_resultList", "fe_showResults");
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
        addClass(".fe_resultList", "fe_showResults");
      }

      //insert new search results
      var resultEl = document.querySelector(".fe_resultList");
      resultEl && (resultEl.innerHTML = html);
    }
    //fetch search result
    function fetchSearchResult(val, callback) {
      var url = "/buy/google/maps/autocomplete?input=" + val + "&language=en";

      //call the callback function for testing only
      callback(searchResult);

      //get location info
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          var result = JSON.parse(this.responseText);
          callback(result);
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
    var locationInfoObj = {
      country: null,
      state: null,
      city: null,
      postalCode: null,
      companyHq: null,
      reset: function () {
        this.country = null;
        this.state = null;
        this.city = null;
        this.postalCode = null;
        this.companyHq = null;
      },
    };
    function changeValue(selector, newValue) {
      var el = document.querySelector(selector);
      el && (el.value = newValue);
    }
    function updateFieldData(data) {
      var countryField = document.querySelector(".billto_contact_info_fields #country-input");

      //reseting the object data
      locationInfoObj.reset();

      // storing api data to object
      locationInfoObj.country = data.country;
      locationInfoObj.state = data.state;
      locationInfoObj.city = data.city;
      locationInfoObj.postalCode = data.postalCode;
      locationInfoObj.companyHq = data.country;

      //object data to input field
      var foundSelectedCountry = "";
      countryField.options.forEach(function (i) {
        if (i.innerText == data.country) {
          foundSelectedCountry = i.value;
        }
      });

      //change country field
      if (countryField) {
        countryField.value = foundSelectedCountry;
        countryField.dispatchEvent(new Event("change", { bubbles: true }));
      }

      //change city
      changeValue(".billto_contact_info_fields #city-input", locationInfoObj.city);

      //postal code
      changeValue(".billto_contact_info_fields #zip-input", locationInfoObj.postalCode);

      //company hq
      changeValue(".billto_contact_info_fields #company-headquarters-input", foundSelectedCountry);

      //get new state field element
      var stateField = document.querySelector(".billto_contact_info_fields #state-input");
      if (stateField) {
        stateField.value = locationInfoObj.state;
        stateField.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
    //fill the location info in respective filds
    function fillLocationInfo(data) {
      if (data.result.length > 0) {
        var newData = data.result[0].positionDesc;
        newData = newData && JSON.parse(newData);

        //udpate field data
        updateFieldData(newData);
      }
    }
    //get location information
    function fetchLocationInfo(locationId, callback) {
      var url = "/buy/google/maps/place/details?place_id=" + locationId + "";

      //for test call the callback function
      callback(placeData);

      //get location info
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          console.log(this.responseText);
          var result = JSON.parse(this.responseText);
          callback(result);
        }
      };
      xmlHttp.open("GET", url, true);
      xmlHttp.send(null);
    }

    /* Variation Init */
    function init() {
      // var countryField=document.querySelector("");
      var addressField = document.querySelector(".address1 #address-line1-input");
      //insert result list
      addressField.parentElement.insertAdjacentHTML("afterend", '<ul class="fe_resultList"></ul>');

      //type on address field
      var searchResults = debounce((val) => fetchSearchResult(val, insertSearchResults), 50);
      live(".address1 #address-line1-input", "input", function () {
        var val = this.value;
        searchResults(val);
      });

      //click on address input field show the results if already exists
      live(".address1 #address-line1-input", "click", function () {
        var resultLength = document.querySelectorAll(".fe_resultList .fe_searchResult");
        if (resultLength.length > 0) {
          addClass(".fe_resultList", "fe_showResults");
        }
      });

      //click on search options
      live(".fe_searchResult", "click", function () {
        fetchLocationInfo(this.id, fillLocationInfo);
        //insert the text
        addressField.value = this.innerText;
        removeClass(".fe_resultList", "fe_showResults");
      });

      //click outside of input box and autofill result
      live("body", "click", function (e) {
        if (!e.target.closest(".address1") && !e.target.closest(".fe_resultList")) {
          removeClass(".fe_resultList", "fe_showResults");
        }
      });
    }

    /* Initialise variation */
    waitForElement(".address1 #address-line1-input", init);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
