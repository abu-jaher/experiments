
(() => {
  try {
    const waitForElement = (selector, trigger, delayInterval, delayTimeout) => {
      const interval = setInterval(() => {
        const elements = document.querySelectorAll(selector);
        if (document && elements && elements.length > 0) {
          clearInterval(interval);
          trigger();
        }
      }, delayInterval);
      setTimeout(() => {
        clearInterval(interval);
      }, delayTimeout);
    };

    const updateBtnCopy = () => {
      document.querySelectorAll('.pricing-package__buttons .button-primary, .pricing-features--plan-buttons .button-primary').forEach(element => {
        if (element.innerText.toLowerCase() === "buy it") {
          element.innerHTML = `Buy now`;
        }
      });
    }

    const initPricingPlan = () => {
      const { body } = document;

      body.querySelector('.pricing-navigation--tabs .pricing-navigation--button[name="tab-2"]').innerHTML = '<span>Businesses</span>';
      body.querySelector('.pricing-navigation--selector [value="tab-2"]').innerHTML = '<span>Businesses</span>';
      body.querySelector('.pricing-navigation--tabs .pricing-navigation--button[name="tab-1"]').innerHTML = '<span>Individuals & Teams</span>';
      body.querySelector('.pricing-navigation--selector [value="tab-1"]').innerHTML = '<span>Individuals & Teams</span>';

      // update btn COPY

      updateBtnCopy();

      document.addEventListener('click', (event) => {
        if (event.target.closest('.pricing-navigation--button') || event.target.closest('.pricing-toggle')) {
          waitForElement(".pricing-package__buttons .button-primary,.pricing-features--plan-buttons .button-primary", updateBtnCopy, 50, 15000);
        }
      })
    };


    const priceSectionForEnterprisePlus = `
          
            <b
              ><span class="annual-price--wrapper"
                ><span
                  class="annual-price"
                  data-pricing-value="50"
                  data-pricing-currency-code="USD"
                  >$50</span
                ></span
              
              ></b
            ><i>
              per user/month
              <span class="annual-price-info">paid annually</span></i
            ><span class="minimum-users-info">minimum of 3 users</span>
         
        `;

    const priceSectionForEnterprisePlusMonthly = `
        <div class='fe-enterprise-plus-monthly'>Switch to Annual billing to view Enterprise Plus pricing</div>
        `;

    function changeUrl(text, btnurl, linktext, linkurl) {
      const enterpricePlan = document.querySelector(".fe-enterprise-plus");
      if (enterpricePlan) {
        const btn = enterpricePlan.querySelector(
          ".pricing-package__buttons .button-primary"
        );
        const link = enterpricePlan.querySelector(
          ".pricing-package__buttons .button-link"
        );

        if (btn && link) {
          btn.innerHTML = text;
          btn.setAttribute("href", btnurl);
          link.innerHTML = linktext;
          link.setAttribute("href", linkurl);
        }
      }

      const featureHeader = document.querySelectorAll(
        ".pricing-features__chart-wrapper .pricing-features__row .pricing-features__column .pricing-features--plan-name"
      );
      if (featureHeader) {
        featureHeader.forEach((el) => {
          if (el.textContent.includes("Enterprise Plus")) {
            const parentElement = el.parentElement;
            const btn = parentElement.querySelector(".button-primary");
            const link = parentElement.querySelector(".button-link");
            if (btn && link) {
              btn.innerHTML = text;
              btn.setAttribute("href", btnurl);
              link.innerHTML = linktext;
              link.setAttribute("href", linkurl);
            }
          }
        });
      }

      const stickyBanner = document.querySelector(
        ".fe_enterprisePlus_features"
      );
      if (stickyBanner) {
        const btn = stickyBanner.querySelector(".button-primary");
        const link = stickyBanner.querySelector(".button-link");
        if (btn && link) {
          btn.innerHTML = text;
          btn.setAttribute("href", btnurl);
          link.innerHTML = linktext;
          link.setAttribute("href", linkurl);
        }
      }
    }

    const monthlyChanges = () => {
      document
        .querySelector(".fe-enterprise-plus")
        .classList.add("monthly-activated");
      document.querySelector(
        ".fe-enterprise-plus .pricing-package--price"
      ).innerHTML = priceSectionForEnterprisePlusMonthly;

      changeUrl(
        "<span>Contact us</span>",
        "https://www.box.com/quote?tc=monthly|box-297-v0",
        "<span>Learn more</span>",
        "https://www.box.com/enterprise-plus?tc=monthly|box-297-v0"
      );
    };

    const annualChanges = () => {
      document
        .querySelector(".fe-enterprise-plus")
        .classList.remove("monthly-activated");
      document.querySelector(
        ".fe-enterprise-plus .pricing-package--price"
      ).innerHTML = priceSectionForEnterprisePlus;
      changeUrl(
        "Buy now",
        "https://account.box.com/signup/enterprise-plus/buynow?tc=annual|box-297-v0",
        "<span>Contact us</span>",
        "https://www.box.com/quote?tc=annual|box-297-v0"
      );
    };

    const updateURLs = () => {
      document
        .querySelector(
          '.pricing-package__buttons [href*="/enterprise-plus"]'
        )
        .closest("[data-formatter-id]")
        .classList.add("fe-enterprise-plus");

      if (document.querySelector("#pricing-toggle-checkbox").checked) {
        annualChanges();
      }

      document
        .querySelector("#pricing-toggle-checkbox")
        .addEventListener("change", () => {
          if (document.querySelector("#pricing-toggle-checkbox").checked) {
            annualChanges();
          } else {
            monthlyChanges();
          }
        });
    };

    /* Initialize variation */
    waitForElement('[data-pricing-api-id="box_enterprise"] + div .button-primary', ()=>{
      document.querySelector(`[data-pricing-api-id="box_enterprise"] + div .pricing-package--price`).innerHTML = priceSectionForEnterprisePlus;
      document.querySelector(`[data-pricing-api-id="box_enterprise"] + div .pricing-package--price`).style.opacity = '1';
      const enterpricePlan = document.querySelector(`[data-pricing-api-id="box_enterprise"] + div`);
      if (enterpricePlan) {
        const btn = enterpricePlan.querySelector(
          ".pricing-package__buttons .button-primary"
        );
        const link = enterpricePlan.querySelector(
          ".pricing-package__buttons .button-link"
        );

        if (btn && link) {
          btn.innerHTML = 'Buy now';
          btn.setAttribute("href", 'https://account.box.com/signup/enterprise-plus/buynow?tc=annual|box-297-v1');
          link.innerHTML = "<span>Contact us</span>";
          link.setAttribute("href", "https://www.box.com/quote?tc=annual|box-297-v1");
        }
        
      }
    }, 50, 15000);
    waitForElement('.fe_enterprisePlus_features',updateURLs, 50, 15000);
    waitForElement('.fe_enterprisePlusBanner', initPricingPlan, 50, 15000);

  } catch (error) {
    console.error(error, 'Error in test BOX 297 v0');
  }
})();

// TC param
(() => {
  try {
    /* main variables */
    const helper = {
      waitForTryItCTA: (selector, trigger) => {
        const interval = setInterval(() => {
          const elements = document.querySelectorAll(selector);
          const elementsArray = Array.from(elements);
          if (elements.length > 0 && elementsArray.some(element => element.innerText.toLowerCase() === "try for free")) {
            clearInterval(interval);
            trigger();
          }
        }, 200);
        setTimeout(() => {
          clearInterval(interval);
        }, 15000);
      },
      checkTcParam: (selector, trigger) => {
        const interval = setInterval(() => {
          trigger();
          const elements = document.querySelectorAll(selector);
          const elementsArray = Array.from(elements);
          if (elements.length > 0 && elementsArray.some(element => element.href.indexOf('box-297-v0') > -1)) {
            clearInterval(interval);
          }
        }, 100);
        setTimeout(() => {
          clearInterval(interval);
        }, 5000);
      },
      addTCparam: () => {
        const cta = document.querySelectorAll("#pricing-plan-2 .pricing-package .pricing-package__buttons-wrapper a:not([href*='https://www.box.com/']):not([href*='enterprise-plus']), #pricing-plan-1 .pricing-package .button-link, #pricing-plan-1 .pricing-package .button-primary, .pricing-features__chart .pricing-features--plan-buttons a:not([href*='https://www.box.com/']):not([href*='enterprise-plus']), .pricing-features--sticky__container .pricing-features--plan-buttons a:not([href*='https://www.box.com/']):not([href*='enterprise-plus'])");
        for (let i = 0; i < cta.length; i++) {
          const tc = "|box-297-v0";
          const url = cta[i].href;
          if (url.indexOf('annual') > -1 || url.indexOf('monthly') > -1) {
            if (url.indexOf('|box-297-v0') > -1) return;
            const referrer = url.concat(tc);
            cta[i].setAttribute("href", referrer);
          }
        }
      }
    }

    /* Variation Init */
    const init = () => {
      document.querySelectorAll('.pricing-package__buttons .button-link,.pricing-features--plan-buttons .button-link, .pricing-features--plan-buttons .button-secondary').forEach(element => {
        if (element.innerText.toLowerCase() === 'try for free') {
          element.innerHTML = `<span>Try now</span>`;
        }
      });

      document.querySelector(".pricing-toggle-button .pricing-toggle-discount").innerHTML = 'Save<span id="toggle-discount-percentage" class="toggle-discount-percentage"> 25%</span>*';
    }

    document.addEventListener('click', (event) => {
      if (event.target.closest('.pricing-navigation--button') || event.target.closest('.pricing-toggle')) {
        helper.checkTcParam(".pricing-package__buttons .button-link,.pricing-package__buttons .button-primary", init);
        helper.checkTcParam("#pricing-plan-2 .pricing-package .pricing-package__buttons-wrapper a:not([href*='https://www.box.com/']), #pricing-plan-1 .pricing-package:not([data-formatter-id='pricing-plan-108696']) .pricing-package__buttons-wrapper a, .pricing-features__chart .pricing-features--plan-buttons a:not([href*='https://www.box.com/']), .pricing-features--sticky__container .pricing-features--plan-buttons a:not([href*='https://www.box.com/'])", helper.addTCparam);
      }
    })
    helper.waitForTryItCTA(".pricing-package__buttons .button-link,.pricing-features--plan-buttons .button-link", init);
    helper.checkTcParam("#pricing-plan-2 .pricing-package .pricing-package__buttons-wrapper a:not([href*='https://www.box.com/']), #pricing-plan-1 .pricing-package:not([data-formatter-id='pricing-plan-108696']) .pricing-package__buttons-wrapper a, .pricing-features__chart .pricing-features--plan-buttons a:not([href*='https://www.box.com/']), .pricing-features--sticky__container .pricing-features--plan-buttons a:not([href*='https://www.box.com/'])", helper.addTCparam);
  } catch (e) {
    console.log(e, "Error in Box-297 v1");
  }
})();