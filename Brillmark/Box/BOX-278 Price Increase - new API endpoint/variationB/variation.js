(function () {
  var FEHelper = {
    onLoadElement: function (selector, trigger, delayInterval, delayTimeout) {
      var interval = setInterval(function () {
        if (
          document &&
          document.querySelectorAll(selector) &&
          document.querySelectorAll(selector).length > 0
        ) {
          clearInterval(interval);
          trigger();
        }
      }, delayInterval);
      setTimeout(function () {
        clearInterval(interval);
      }, delayTimeout);
    },
    onLoadBoxGlobal: function (trigger) {
      var interval = setInterval(function () {
        if (
          window.drupalSettings &&
          window.drupalSettings.boxGlobal &&
          window.drupalSettings.boxGlobal.countryCode
        ) {
          clearInterval(interval);
          trigger();
        }
      }, 50);
      setTimeout(function () {
        clearInterval(interval);
      }, 10000);
    }
  };

  // updating price
  function updatePriceAndCurrency(monthly, annually, data) {
    monthly.setAttribute("data-pricing-value", data.pricing.monthly.unitPrice);
    monthly.setAttribute("data-pricing-currency-code", data.currencyCode);
    monthly.innerHTML = '$'+data.pricing.monthly.unitPrice;

    annually.setAttribute("data-pricing-value", (Math.floor((data.pricing.yearly.unitPrice / 12) * 100) / 100 ));
    annually.setAttribute("data-pricing-currency-code", data.currencyCode);
    annually.innerHTML = '$'+(Math.floor((data.pricing.yearly.unitPrice / 12) * 100) / 100 );
  }

  function updateButtonUrl() {
    var cta = document.querySelectorAll("#pricing-plan-2 .pricing-package .pricing-package__buttons-wrapper a:not([href*='https://www.box.com/']), #pricing-plan-1 .pricing-package:not([data-formatter-id='pricing-plan-108696']) .pricing-package__buttons-wrapper a, .pricing-features__chart .pricing-features--plan-buttons a:not([href*='https://www.box.com/']), .pricing-features--sticky__container .pricing-features--plan-buttons a:not([href*='https://www.box.com/'])");
    for (var i = 0; i < cta.length; i++) {
      var tc = "|box-278-v1";
      var url = cta[i].href;
      if (url.indexOf('annual') > -1 || url.indexOf('monthly') > -1) {
        if (url.indexOf('|box-278-v1') > -1) return;
        var referrer = url.concat(tc);
        cta[i].setAttribute("href", referrer);
      }
    }
  }

  function addEnterprisePriceElement() {
    var pricingElement = '' +
      '  <span class="monthly-price" data-pricing-value="" data-pricing-currency-code=""></span>' +
      '  <span class="annual-price" data-pricing-value="" data-pricing-currency-code=""></span>';
    document.querySelector("#pricing-plan-2 [data-pricing-api-id='box_enterprise']  .pricing-package--price b").innerHTML = pricingElement;
  }

  function updateAttribute(data) {
    // pricing section
    var pricingPlan = document.querySelector(".pricing-plans-row [data-pricing-api-id=" + data.productName + "]");
    // monthly price
    var monthly = pricingPlan.querySelector(".monthly-price");
    // annual price
    var annually = pricingPlan.querySelector(".annual-price");
    pricingPlan.querySelector('.pricing-package--price b').style.opacity = '1';
    // updating price and currency attribute
    updatePriceAndCurrency(monthly, annually, data);
    // changing pricing text
    // window.boxFormatPricing("[data-pricing-api-id=" + data.productName + "] [data-pricing-value]", data.currencyCode);

  }
  // requesting data
  function requestData(planId, countryCode) {
    var countryCode = 'US';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        updateAttribute(response);
      }
    }; "https://www.box.com/pricing-api?plan"
    xhttp.open("GET", "https://www.box.com/pricing-api?plan=" + planId + "&cc=" + countryCode + "&tc=box-278-v1");
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send();
  }

  function changeDiscountPercentage() {
    var interval = setInterval(function () {
      document.querySelector(".pricing-toggle-button .toggle-discount-percentage").textContent = " 25%";
    }, 20);

    setTimeout(function () {
      clearInterval(interval);
    }, 3000)
  }

  function init() {
    // country code wait 
    FEHelper.onLoadBoxGlobal(function () {
      // change enterprise price
      addEnterprisePriceElement();

      var pricingPackage = document.querySelectorAll("#pricing-plan-2 .pricing-package[data-pricing-api-id], #pricing-plan-1 .pricing-package[data-pricing-api-id]");
      for (var i = 0; i < pricingPackage.length; i++) {
        var planId = pricingPackage[i].getAttribute("data-pricing-api-id");
        var countryCode = window.drupalSettings.boxGlobal.countryCode;
        requestData(planId, countryCode);
      }
      // updating discount percentage 
      changeDiscountPercentage();
      var tabs = document.querySelectorAll(".pricing-navigation--tabs button");
      for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", function () {
          changeDiscountPercentage();
        })
      }

      // updating button url 
      var interval = setInterval(() => {
        updateButtonUrl();
      }, 20);

      setTimeout(() => {
        clearInterval(interval)
      }, 5000);

      document.querySelector("div.pricing-toggle input[type='checkbox']").addEventListener("click", function () {
        // updating button url 
        setTimeout(function () {
          updateButtonUrl();
        }, 1000);

      });
    });
  }

  FEHelper.onLoadElement('#pricing-plan-2 .pricing-package', init, 50, 10000);

})();