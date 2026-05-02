(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "";

    var calculatedPrices;
    var pricing_data = [];

    /* helper library */
    function waitForPricingObject(selector,trigger, delayInterval, delayTimeout) {
          var interval = setInterval(function () {
            var newPricing = document.querySelector('#new-pricing')
            if (
              window && window.dataModel && window.dataModel.currencyValue &&
              newPricing && newPricing.__vue__ && newPricing.__vue__.$store && 
              newPricing.__vue__.$store.state && newPricing.__vue__.$store.state.priceJson &&
              newPricing.__vue__.$store.state.priceJson[window.dataModel.currencyValue]
            ) {
              clearInterval(interval);
              trigger();
            }
          }, delayInterval);
          setTimeout(function () {
            clearInterval(interval);
          }, delayTimeout);
        }

    function live(selector, event, callback, context) {
      /****Helper Functions****/
      // helper for enabling IE 8 event bindings
      function addEvent(el, type, handler) {
        if (el.attachEvent) el.attachEvent("on" + type, handler);
        else el.addEventListener(type, handler);
      }
      // matches polyfill
      this.Element &&
        (function (ElementPrototype) {
          ElementPrototype.matches =
            ElementPrototype.matches ||
            ElementPrototype.matchesSelector ||
            ElementPrototype.webkitMatchesSelector ||
            ElementPrototype.msMatchesSelector ||
            function (selector) {
              var node = this,
                nodes = (
                  node.parentNode || node.document
                ).querySelectorAll(selector),
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
          while (
            el &&
            el.matches &&
            el !== context &&
            !(found = el.matches(selector))
          )
            el = el.parentElement;
          if (found) callback.call(el, e);
        });
      }
      live(selector, event, callback, context);
    }

    function funcInterval(trigger) {
      var interval = setInterval(function () {
        trigger();
      }, 20);
      setTimeout(function () {
        clearInterval(interval);
      }, 5000);
    }

    function calculatePrices() {
      const currencyValueToFind = window.dataModel.currencyValue;
      const priceJson = document.getElementById('new-pricing').__vue__.$store.state.priceJson[currencyValueToFind];
    
      const getProMonthlyPrice = ((priceJson.zo_pro_monthly ? priceJson.zo_pro_monthly : priceJson.monthly_c50) / 100).toFixed(2);
      const getProYearlyPrice = (((priceJson.zo_pro_yearly ? priceJson.zo_pro_yearly : priceJson.yearly_c50) / 100) / 12).toFixed(2);
      const getProYearlyInteger = Math.floor(getProYearlyPrice);
      const getProYearlyDecimal = Math.round((getProYearlyPrice - getProYearlyInteger) * 100);
    
      const getBizMonthlyPrice = ((priceJson.business_monthly_c50) / 100).toFixed(2);
      const getBizYearlyPrice = (((priceJson.business_yearly_c50) / 100) / 12).toFixed(2);
      const getBizYearlyInteger = Math.floor(getBizYearlyPrice);
      const getBizYearlyDecimal = Math.round((getBizYearlyPrice - getBizYearlyInteger) * 100);
    
      const getBizPlusMonthlyPrice = ((priceJson.zonebizpzau_monthly) / 100).toFixed(2);
      const getBizPlusYearlyPrice = (((priceJson.zonebizpzau_yearly) / 100) / 12).toFixed(2);
      const getBizPlusYearlyInteger = Math.floor(getBizPlusYearlyPrice);
      const getBizPlusYearlyDecimal = Math.round((getBizPlusYearlyPrice - getBizPlusYearlyInteger) * 100);
    
      return {
        getProMonthlyPrice,
        getProYearlyPrice,
        getProYearlyInteger,
        getProYearlyDecimal,
        getBizMonthlyPrice,
        getBizYearlyPrice,
        getBizYearlyInteger,
        getBizYearlyDecimal,
        getBizPlusMonthlyPrice,
        getBizPlusYearlyPrice,
        getBizPlusYearlyInteger,
        getBizPlusYearlyDecimal,
      };
    }

    waitForPricingObject('#new-pricing',()=>{
      calculatedPrices = calculatePrices();

      pricing_data.push(
        {
          "name": 'US',
          "currencyValue": 'USD',
          "currency_flag": '$',
          "Pro": calculatedPrices.getProYearlyInteger + '<span class="subtext">' + calculatedPrices.getProYearlyDecimal + '</span>',
          "Business": calculatedPrices.getBizYearlyInteger + '<span class="subtext">' + calculatedPrices.getBizYearlyDecimal + '</span>',
          "Business_Plus": calculatedPrices.getBizPlusYearlyInteger + '<span class="subtext">'+ calculatedPrices.getBizPlusYearlyDecimal +'</span>',
          "Pro_monthly": '$' + calculatedPrices.getProMonthlyPrice,
          "Business_monthly": '$' + calculatedPrices.getBizMonthlyPrice,
          "Business_Plus_monthly": '$' + calculatedPrices.getBizPlusMonthlyPrice,
          "save_up_label": '<span class="fe-save-up-label-new">Save 21%</span>',
          "save_up_label_biz": '<span class="fe-save-up-label-new">Save 16%</span>',
        },
        {
          "name": "NZ",
          "currencyValue": 'NZD',
          "currency_flag": 'NZ$',
          "Pro": calculatedPrices.getProYearlyInteger + '<span class="subtext">' + calculatedPrices.getProYearlyDecimal + '</span>',
          "Business": calculatedPrices.getBizYearlyInteger + '<span class="subtext">' + calculatedPrices.getBizYearlyDecimal + '</span>',
          "Business_Plus": calculatedPrices.getBizPlusYearlyInteger + '<span class="subtext">'+ calculatedPrices.getBizPlusYearlyDecimal +'</span>',
          "Pro_monthly": 'NZ$' + calculatedPrices.getProMonthlyPrice,
          "Business_monthly": 'NZ$' + calculatedPrices.getBizMonthlyPrice,
          "Business_Plus_monthly": 'NZ$' + calculatedPrices.getBizPlusMonthlyPrice,
          "save_up_label": '<span class="fe-save-up-label-new">Save 22%</span>',
          "save_up_label_biz": '<span class="fe-save-up-label-new">Save 16%</span>',
        },
        {
          "name": "GB",
          "currencyValue": 'GBP',
          "currency_flag": '£',
          "Pro": calculatedPrices.getProYearlyInteger + '<span class="subtext">' + calculatedPrices.getProYearlyDecimal + '</span>',
          "Business": calculatedPrices.getBizYearlyInteger + '<span class="subtext">' + calculatedPrices.getBizYearlyDecimal + '</span>',
          "Business_Plus": calculatedPrices.getBizPlusYearlyInteger + '<span class="subtext">'+ calculatedPrices.getBizPlusYearlyDecimal +'</span>',
          "Pro_monthly": '£' + calculatedPrices.getProMonthlyPrice,
          "Business_monthly": '£' + calculatedPrices.getBizMonthlyPrice,
          "Business_Plus_monthly": '£' + calculatedPrices.getBizPlusMonthlyPrice,
          "save_up_label": '<span class="fe-save-up-label-new">Save 23%</span>',
          "save_up_label_biz": '<span class="fe-save-up-label-new">Save 16%</span>',
        },
        {
          "name": "CA",
          "currencyValue": 'CAD',
          "currency_flag": 'CAD',
          "Pro": calculatedPrices.getProYearlyInteger + '<span class="subtext">' + calculatedPrices.getProYearlyDecimal + '</span>',
          "Business": calculatedPrices.getBizYearlyInteger + '<span class="subtext">' + calculatedPrices.getBizYearlyDecimal + '</span>',
          "Business_Plus": calculatedPrices.getBizPlusYearlyInteger + '<span class="subtext">'+ calculatedPrices.getBizPlusYearlyDecimal +'</span>',
          "Pro_monthly": 'CAD' + calculatedPrices.getProMonthlyPrice,
          "Business_monthly": 'CAD' + calculatedPrices.getBizMonthlyPrice,
          "Business_Plus_monthly": 'CAD' + calculatedPrices.getBizPlusMonthlyPrice,
          "save_up_label": '<span class="fe-save-up-label-new">Save 22%</span>',
          "save_up_label_biz": '<span class="fe-save-up-label-new">Save 16%</span>',
        },
        {
          "name": "IE",
          "currencyValue": 'EUR',
          "currency_flag": '€',
          "Pro": calculatedPrices.getProYearlyInteger + '<span class="subtext">' + calculatedPrices.getProYearlyDecimal + '</span>',
          "Business": calculatedPrices.getBizYearlyInteger + '<span class="subtext">' + calculatedPrices.getBizYearlyDecimal + '</span>',
          "Business_Plus": calculatedPrices.getBizPlusYearlyInteger + '<span class="subtext">'+ calculatedPrices.getBizPlusYearlyDecimal +'</span>',
          "Pro_monthly": '€' + calculatedPrices.getProMonthlyPrice,
          "Business_monthly": '€' + calculatedPrices.getBizMonthlyPrice,
          "Business_Plus_monthly": '€' + calculatedPrices.getBizPlusMonthlyPrice,
          "save_up_label": '<span class="fe-save-up-label-new">Save 22%</span>',
          "save_up_label_biz": '<span class="fe-save-up-label-new">Save 16%</span>',
        },
        {
          "name": 'AU',
          "currencyValue": 'AUD',
          "currency_flag": 'A$',
          "Pro": calculatedPrices.getProYearlyInteger + '<span class="subtext">' + calculatedPrices.getProYearlyDecimal + '</span>',
          "Business": calculatedPrices.getBizYearlyInteger + '<span class="subtext">' + calculatedPrices.getBizYearlyDecimal + '</span>',
          "Business_Plus": calculatedPrices.getBizPlusYearlyInteger + '<span class="subtext">'+ calculatedPrices.getBizPlusYearlyDecimal +'</span>',
          "Pro_monthly": 'A$' + calculatedPrices.getProMonthlyPrice,
          "Business_monthly": 'A$' + calculatedPrices.getBizMonthlyPrice,
          "Business_Plus_monthly": 'A$' + calculatedPrices.getBizPlusMonthlyPrice,
          "save_up_label": '<span class="fe-save-up-label-new">Save 21%</span>',
          "save_up_label_biz": '<span class="fe-save-up-label-new">Save 16%</span>'
        }
      );

    },50,15000)
  
        
    /* Variation Init */

    function waitForElement(selector, trigger, delayInterval, delayTimeout) {
      var interval = setInterval(function () {
        if (
          document &&
          document.querySelector(selector) &&
          document.querySelectorAll(selector).length > 0 && 
          pricing_data.length > 0
        ) {
          clearInterval(interval);
          trigger();
        }
      }, delayInterval);
      setTimeout(function () {
        clearInterval(interval);
      }, delayTimeout);
    }


    // Function to update text for monthly billing
    function monthlyTextChange() {
      const elements = document.querySelectorAll('.new-pricing-row .rate');
      const newText = '/month/user, billed monthly';
      updateText(elements, newText);
    }

    // Function to update text for monthly billing (comparison tables)
    function monthlyTextChangeComp() {
      const elements = document.querySelectorAll('.zm-table.comparison-table-new th.comparison-table-header-cell .cell .rate');
      const newText = '/month/user, billed monthly';
      updateText(elements, newText);
    }

    // Function to update text for monthly billing (mobile comparison tables)
    function monthlyTextChangeCompMobile() {
      const elements = document.querySelectorAll('.comparison-tree-table-mobile  .new-price .rate');
      const newText = '/month/user, billed monthly';
      updateText(elements, newText);
    }

    // Function to update text for elements
    function updateText(elements, newText) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].innerText = newText;
      }
    }

    // Function to add a class to the "Enterprise" pricing plan
    function addClassToEnterprise() {
      const contactSalesBtn = document.querySelector('.new-buy-btn [data-link-term="Contact Sales"]');
      if (contactSalesBtn) {
        contactSalesBtn.closest('th').classList.add('fe-enterprise');
      }
    }
    
    // Function to insert pricing information
    function insertPricingInfo(pricing, currencyFlag, monthlyPrice, className, saveUpLabel) {
      const headerCells = document.querySelectorAll('.new-tab-content .feature-plan-card .title-words');
    
      headerCells.forEach(headerCell => {
        headerCell.closest('.title').classList.add('fe-tab-content');
        if (headerCell.innerText === className) {
          const priceClassName = 'fe-' + className.toLowerCase().replace(' ', '');
          if (!document.querySelector('.' + priceClassName)) {
            const insertIndex = Array.from(headerCells).findIndex(cell => cell.innerText === className);
            const priceHTML = `<div class="fe-price-num ${priceClassName}">
              <div class="fe-pro-pricing">
                <strike class="fe-monthly-price">${monthlyPrice}</strike>
                <sup class="fe-sup">${currencyFlag}</sup>
                <span class="fe-subtext">${pricing}</span>
              </div>
              <p class="fe-year">${saveUpLabel}</p>
            </div>
            <span class="fe-rate">/month/user, billed annually</span>`;
            headerCells[insertIndex].insertAdjacentHTML('afterend', priceHTML);
          }
        }
      });
    }
    
    // Function to update pricing information for desktop
    function priceListObject() {
      addClassToEnterprise();
      const currencyValueToFind = window.dataModel.currencyValue;
      const country = pricing_data.find(item => item.currencyValue === currencyValueToFind);

      if (country) {
        if(document.querySelector('.save-up-label-new') && document.querySelector('.save-up-label-new').textContent.includes('16%')){
          insertPricingInfo(country.Pro, country.currency_flag, country.Pro_monthly, 'Pro', country.save_up_label_biz);
        }else{
          insertPricingInfo(country.Pro, country.currency_flag, country.Pro_monthly, 'Pro', country.save_up_label);
        }
        insertPricingInfo(country.Business, country.currency_flag, country.Business_monthly, 'Business', country.save_up_label_biz);
        insertPricingInfo(country.Business_Plus, country.currency_flag, country.Business_Plus_monthly, 'Business Plus', country.save_up_label_biz);
      }
    
    }
    
    // Function to add a class to the "Enterprise" pricing plan (comparison tables)
    function addClassToCompEnterprise() {
      const contactSalesBtn = document.querySelector('.new-buy-btn [data-link-term="Contact Sales"]');
      if (contactSalesBtn) {
        contactSalesBtn.closest('th').classList.add('fe-enterprise');
      }
    }
    // Function to insert pricing information into comparison tables
    function insertComparisonPricingInfo(pricing, currencyFlag, className, saveUpLabel) {
      const comparisonTables = document.querySelectorAll('.comparison-table-new .type-title');
    
      comparisonTables.forEach(comparisonTable => {
        comparisonTable.closest('.cell').classList.add('fe-tab-content');
        if (comparisonTable.innerText === className) {
          const priceClassName = 'fe-' + className.toLowerCase().replace(' ', '');
          if (!document.querySelector('.' + priceClassName + '1')) {
            const insertIndex = Array.from(comparisonTables).findIndex(table => table.innerText === className);
            const priceHTML = `<div class="fe-price-num ${priceClassName + '1'}">
              <div class="fe-pro-pricing">
                <sup class="fe-sup">${currencyFlag}</sup>
                <span class="fe-subtext">${pricing}</span>
              </div>
              <p class="fe-year">  ${saveUpLabel}</p>
            </div>
            <span class="fe-rate">/month/user, billed annually</span>`;
            comparisonTables[insertIndex].insertAdjacentHTML('afterend', priceHTML);
          }
        }
      });
    }
    
     // Function to update pricing information for comparison tables
    function priceListobjectComp() {
      addClassToCompEnterprise();
      const currencyValueToFind = window.dataModel.currencyValue;
      const country = pricing_data.find(item => item.currencyValue === currencyValueToFind);

      if (country) {
        if(document.querySelector('.save-up-label-new') && document.querySelector('.save-up-label-new').textContent.includes('16%')){
          insertComparisonPricingInfo(country.Pro, country.currency_flag, 'Pro', country.save_up_label_biz);
        }else{
          insertComparisonPricingInfo(country.Pro, country.currency_flag, 'Pro', country.save_up_label);
        }

        insertComparisonPricingInfo(country.Business, country.currency_flag, 'Business', country.save_up_label_biz);
        insertComparisonPricingInfo(country.Business_Plus, country.currency_flag, 'Business Plus', country.save_up_label_biz);
      }
    
    }

    function getSaveUpLabel(country) {
      const label = document.querySelector('.save-up-label-new');
      
      if (label && label.textContent.includes('16%')) {
        return country.save_up_label_biz;
      } else {
        return country.save_up_label;
      }
    }

    

    // Function to update pricing information for mobile comparison tables
    function priceListobjectCompMobile() {
      const currencyValueToFind = window.dataModel.currencyValue;
      const country = pricing_data.find(item => item.currencyValue === currencyValueToFind);
      if (country) {
        const selectedLabel = getSaveUpLabel(country)
        
        var comparison_tables = document.querySelectorAll('.comparison-tree-table-mobile .zm-select-span__inner');
        comparison_tables.forEach(comparison_table => {

          var feMonthlyBusinessPlus = document.querySelector('.comparison-tree-table-mobile .fe-monthlybp-pricing1');
          var feMonthlyBusiness = document.querySelector('.comparison-tree-table-mobile .fe-monthly-pricing1');
          var fePro = document.querySelector('.comparison-tree-table-mobile .fe-pro1');
          var fePro2 = document.querySelector('.comparison-tree-table-mobile .fe-pro2');

          var activeNavHeading =  document.querySelector('.pricing_nav_dropdown .active-nav-item h2');

          // Basic plan selected
          if (comparison_table.innerText === 'Basic') {
              fePro && fePro.classList.add('fe-hide');
          }
         
          // 
          if (activeNavHeading.innerText === 'Business') {                
            if (comparison_table.innerText === 'Pro') {
                fePro && fePro.classList.remove('fe-hide');
                !fePro && document.querySelector('.comparison-tree-table-mobile__header-left-col .type-price').insertAdjacentHTML('afterend', '<div class="fe-price-num fe-pro1"><div class="fe-pro-pricing"><sup class="fe-sup">' + country.currency_flag + '</sup><span class="fe-subtext"> ' + country.Pro + '</span></div><p class="fe-year">  ' + selectedLabel + '</p><span class="fe-rate">/month/user, billed annually</span></div>');
            }
          }

           // persona plan for mobile
          if (document.querySelector('[current-usage-type="personal"]')) {
         
            feMonthlyBusiness && feMonthlyBusiness.classList.add('fe-hide')
            feMonthlyBusinessPlus && feMonthlyBusinessPlus.classList.add('fe-hide');
            fePro && fePro.classList.add('fe-hide');

            fePro2 && fePro2.classList.remove('fe-hide');

            if (comparison_table.innerText === 'Pro') {                  
              !fePro2 && document.querySelector('[current-usage-type="personal"] .comparison-tree-table-mobile__header-right-col .type-price').insertAdjacentHTML('afterend', '<div class="fe-price-num fe-pro2"><div class="fe-pro-pricing"><sup class="fe-sup">' + country.currency_flag + '</sup><span class="fe-subtext"> ' + country.Pro + '</span></div><p class="fe-year">  ' + selectedLabel + '</p><span class="fe-rate">/month/user, billed annually</span></div>');
            }
          }
          // persona plan end

           // Business plan for mobile
         
          if (comparison_table.innerText === 'Business') {
            feMonthlyBusinessPlus && feMonthlyBusinessPlus.classList.add('fe-hide');
            feMonthlyBusiness && feMonthlyBusiness.classList.remove('fe-hide')

            if (activeNavHeading.innerText === 'Personal') {
              fePro2 && fePro2.classList.add('fe-hide');
            }

            fePro2 && fePro2.classList.add('fe-hide');
            !feMonthlyBusiness && document.querySelector('.comparison-tree-table-mobile__header-right-col .type-price').insertAdjacentHTML('afterend', '<div class="fe-price-num fe-monthly-pricing1"><sup class="fe-sup">' + country.currency_flag + '</sup><span class="fe-subtext"> ' + country.Business + '</span><p class="fe-year">  ' + country.save_up_label_biz + '</p><span class="fe-rate">/month/user, billed annually</span></div>');

          }

          
          // Business plan for mobile end

          if (comparison_table.innerText === 'Business Plus') {
              feMonthlyBusinessPlus && feMonthlyBusinessPlus.classList.remove('fe-hide');
              feMonthlyBusiness && feMonthlyBusiness.classList.add('fe-hide')
              !feMonthlyBusinessPlus && document.querySelector('.comparison-tree-table-mobile__header-right-col .type-price').insertAdjacentHTML('afterend', '<div class="fe-price-num fe-monthlybp-pricing1"><sup class="fe-sup">' + country.currency_flag + '</sup><span class="fe-subtext"> ' + country.Business_Plus + '</span><p class="fe-year">  ' + country.save_up_label_biz + '</p><span class="fe-rate">/month/user, billed annually</span></div>');
          }

          if (comparison_table.innerText === 'Enterprise') {
              feMonthlyBusinessPlus && feMonthlyBusinessPlus.classList.add('fe-hide');
              feMonthlyBusiness && feMonthlyBusiness.classList.add('fe-hide')
          }

        });
      }

    }

    // Function to initialize the tile section
    function initTileSection() {
      document.querySelector('body').classList.add('fe-savings-promo');
      priceListObject();
      monthlyTextChange();
      const featurePlanCard = document.querySelector('[plan="business plus"][action="contact sales"]');
      featurePlanCard && featurePlanCard.classList.add('fe-contactsales');
    }

    // Function to initialize the feature comparison section
    function initCompareFeatures() {
      priceListobjectComp();
      monthlyTextChangeComp();
    }

     // Function to initialize the mobile section
    function initMobile() {
      priceListobjectCompMobile();
      monthlyTextChangeCompMobile();
    }

    // Event listener for changes in the switch 
    live('.zm-switch input, .FE-Addon-Opt__togglecontainer input', 'change', function () {
      funcInterval(initTileSection);
      funcInterval(initCompareFeatures);
    })

    // Event listener for dropdown menu selections
    live('.zm-dropdown-menu__item-content .pricing_nav_dropdown_item,[aria-label*="switch types for row 2"], [aria-label="Basic"],[aria-label="Pro"],[aria-label="Business"],[aria-label="Business Plus"],[aria-label="Enterprise"],.zm-select-dropdown__item, .dropdown-detail-item', 'mousedown', function () {
      funcInterval(initTileSection);
      funcInterval(initCompareFeatures);
      funcInterval(initMobile);
    });


  // Wait for elements to appear and trigger initialization functions
    waitForElement(".new-tab-content .feature-plan-card .new-price", function(){
      funcInterval(initTileSection);
    }, 150, 50000);
    waitForElement(".comparison-table-new .price-num", function(){
      funcInterval(initCompareFeatures);
    }, 200, 50000);
    waitForElement(".comparison-tree-table-mobile .zm-select-span__inner", function(){
      funcInterval(initMobile);
    }, 200, 50000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();