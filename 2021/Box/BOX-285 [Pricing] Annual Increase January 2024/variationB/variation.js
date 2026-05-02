(function () {
  try {
    const FEHelper = {
      onLoadElement: function (selector, trigger, delayInterval, delayTimeout) {
        const interval = setInterval(function () {
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
        const interval = setInterval(function () {
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
    function updatePriceAndCurrency(monthly, annualOldPrice, annually, data) {
      monthly && monthly.setAttribute("data-pricing-value", data.pricing.monthly.unitPrice);
      monthly && monthly.setAttribute("data-pricing-currency-code", data.currencyCode);
      monthly ? monthly.innerHTML = '$'+data.pricing.monthly.unitPrice : "";
  
      annualOldPrice && annualOldPrice.setAttribute("data-pricing-value", data.pricing.monthly.unitPrice);
      annualOldPrice && annualOldPrice.setAttribute("data-pricing-currency-code", data.currencyCode);
      annualOldPrice ? annualOldPrice.innerHTML = '$'+data.pricing.monthly.unitPrice : "";
  
      annually.setAttribute("data-pricing-value", (Math.floor((data.pricing.yearly.unitPrice / 12) * 100) / 100 ));
      annually.setAttribute("data-pricing-currency-code", data.currencyCode);
      annually.innerHTML = '$'+(Math.floor((data.pricing.yearly.unitPrice / 12) * 100) / 100 );
    }
  
    function updateButtonUrl() {
      const cta = document.querySelectorAll("#pricing-plan-2 .pricing-package .pricing-package__buttons-wrapper a:not([href*='https://www.box.com/']), #pricing-plan-1 .pricing-package:not([data-formatter-id='pricing-plan-108696']) .pricing-package__buttons-wrapper a, .pricing-features__chart .pricing-features--plan-buttons a:not([href*='https://www.box.com/']), .pricing-features--sticky__container .pricing-features--plan-buttons a:not([href*='https://www.box.com/'])");
      for (let i = 0; i < cta.length; i++) {
        const tc = "|box-285-v1";
        const url = cta[i].href;
        if (url.indexOf('annual') > -1 || url.indexOf('monthly') > -1) {
          if (url.indexOf('|box-285-v1') > -1) return;
          const referrer = url.concat(tc);
          cta[i].setAttribute("href", referrer);
        }
      }
    }
  
    function updateAttribute(data) {
      // pricing section
      const pricingPlan = document.querySelector(".pricing-plans-row [data-pricing-api-id=" + data.productName + "]");
      // monthly price
      const monthly = pricingPlan.querySelector(".monthly-price");
      // monthly / annual old price
      const annualOldPrice = pricingPlan.querySelector(".annual-price--old");
      // annual price
      const annually = pricingPlan.querySelector(".annual-price");
      pricingPlan.querySelector('.pricing-package--price b').style.opacity = '1';
      // updating price and currency attribute
      updatePriceAndCurrency(monthly, annualOldPrice, annually, data);
      // changing pricing text
    }
  
    // requesting data
    function requestData(planId, countryCode) {
      countryCode = 'US';
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const response = JSON.parse(this.responseText);
          updateAttribute(response);
        }
      }; "https://www.box.com/pricing-api?plan"
      xhttp.open("GET", "https://www.box.com/pricing-api?plan=" + planId + "&cc=" + countryCode + "&tc=box-285-v1");
      xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhttp.send();
    }
  
    function init() {
      
      // country code wait 
      FEHelper.onLoadBoxGlobal(function () {
        // change enterprise price
  
        const pricingPackage = document.querySelectorAll("#pricing-plan-2 .pricing-package[data-pricing-api-id], #pricing-plan-1 .pricing-package[data-pricing-api-id]");
        for (let i = 0; i < pricingPackage.length; i++) {
          const planId = pricingPackage[i].getAttribute("data-pricing-api-id");
          const countryCode = window.drupalSettings.boxGlobal.countryCode;
          requestData(planId, countryCode);
        }
  
        // updating button url 
        const interval = setInterval(() => {
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
  }catch (e) {
    console.log(e, "error in Test Box-285");
  }
})();