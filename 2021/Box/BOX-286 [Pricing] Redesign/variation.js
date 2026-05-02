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

    const enterpriseTag =
      `<div class="pricing-package--label__wrapper pricing-package--left-col">
      <span style="background: #F26430" class="pricing-package--label__tag">RECOMMENDED</span>
    </div>`;

    const enterprisePlusBanner =
      `<div class="fe_enterprisePlusBanner">
      <span class="fe_banner"><img src="https://fe-test-dev.s3.amazonaws.com/box/Box+286/box_ai.png"/></span>
      <span class="fe_tooltip">
            <img src="https://fe-test-dev.s3.amazonaws.com/box/Box+286/tooltip_icon.png"/>
            <p class="fe_tooltip_text">20 Box AI queries/user + 2,000 per month included</p>
      </span>
    </div>`;


    const businessBullet = `
      <p class="included"><i class="icon-check-2"></i><strong>Unlimited storage</strong></p>
      <p class="included"><i class="icon-check-2"></i><strong>Upload files up to 5GB</strong></p>
      <p class="included"><i class="icon-check-2"></i>File sharing, insights, unlimited Notes and whiteboarding</p>
      <p class="included"><i class="icon-check-2"></i><strong>Built-in content security and permissions</strong></p>
      <p class="included"><i class="icon-check-2"></i>SOC 1/SOC 2/SOC 3</p>
      <p class="included"><i class="icon-check-2"></i><strong>Unlimited e-sign via web app</strong></p>
      <p class="included"><i class="icon-check-2"></i>Access to 1,500+ integrations like Microsoft Office, Copilot, Salesforce, Google Workspace, Slack, and more</p>
      <p class="included"><i class="icon-check-2"></i>50K API calls per month</p>
      <p class="included"><i class="icon-check-2"></i>Standard workflow capabilities</p>
      <p class="included"><i class="icon-check-2"></i>Standard support during local business hours</p>
    `;

    const businessPlusBullet = `
      <p class="included"><i class="icon-check-2"></i><strong>Unlimited storage</strong></p>
      <p class="included"><i class="icon-check-2"></i><strong>Upload files up to 15GB</strong></p>
      <p class="included"><i class="icon-check-2"></i>File sharing, insights, unlimited Notes and whiteboarding</p>
      <p class="included"><i class="icon-check-2"></i><strong>Built-in content security and permissions</strong></p>
      <p class="included"><i class="icon-check-2"></i>SOC 1/SOC 2/SOC 3</p>
      <p class="included"><i class="icon-check-2"></i><strong>Unlimited e-sign via web app</strong></p>
      <p class="included"><i class="icon-check-2"></i>Access to 1,500+ integrations like Microsoft Office, Copilot, Salesforce, Google Workspace, Slack, and more</p>
      <p class="included"><i class="icon-check-2"></i>50K API calls per month</p>
      <p class="included"><i class="icon-check-2"></i>Standard workflow capabilities</p>
      <p class="included"><i class="icon-check-2"></i>Standard support during local business hours</p>
    `;

    const enterpriseBullet = `
      <p class="included"><i class="icon-check-2"></i><strong>Unlimited storage</strong></p>
      <p class="included"><i class="icon-check-2"></i><strong>Upload files up to 50GB</strong></p>
      <p class="included"><i class="icon-check-2"></i>File sharing, insights, unlimited Notes and whiteboarding</p>
      <p class="included"><i class="icon-check-2"></i><strong>Advanced content security features, endpoint protection, and multi-factor authentication</strong></p>
      <p class="included"><i class="icon-check-2"></i>SOC 1/SOC 2/SOC 3, HIPAA, FedRAMP</p>
      <p class="included"><i class="icon-check-2"></i><strong>Unlimited e-sign and advanced features</strong></p>
      <p class="included"><i class="icon-check-2"></i>1,500+ integrations like Microsoft Office, Copilot, Salesforce, Google Workspace, Slack, and more</p>
      <p class="included"><i class="icon-check-2"></i>100K API calls per month</p>
      <p class="included"><i class="icon-check-2"></i>Advanced workflow capabilities</p>
      <p class="included"><i class="icon-check-2"></i>Standard support during local business hours</p>
    `;

    const enterprisePlusBullet = `
      <p class="included"><i class="icon-check-2"></i><strong>Unlimited storage</strong></p>
      <p class="included"><i class="icon-check-2"></i><strong>Upload files up to 150GB</strong></p>
      <p class="included"><i class="icon-check-2"></i>File sharing, insights, unlimited Notes and whiteboarding</p>
      <p class="included"><i class="icon-check-2"></i><strong>Core security features + automated controls protecting against threats and data leaks</strong></p>
      <p class="included"><i class="icon-check-2"></i>SOC 1/SOC 2/SOC 3, HIPAA, FedRAMP, GxP, 21 CFR Part 11</p>
      <p class="included"><i class="icon-check-2"></i><strong>Unlimited e-sign and advanced features</strong></p>
      <p class="included"><i class="icon-check-2"></i>1,500+ integrations like Microsoft Office, Copilot, Salesforce, Google Workspace, Slack, and more</p>
      <p class="included"><i class="icon-check-2"></i>100K API calls per month</p>
      <p class="included"><i class="icon-check-2"></i>Advanced workflow capabilities</p>
      <p class="included"><i class="icon-check-2"></i>Enhanced support services 24/7/365 coverage</p>
    `;


    const updateBtnCopy = () => {
      document.querySelectorAll('.pricing-package__buttons .button-primary, .pricing-features--plan-buttons .button-primary').forEach(element => {
        if (element.innerText.toLowerCase() === "buy it") {
          element.innerHTML = `Buy now`;
        }
      });
    }

    const initPricingPlan = () => {
      const { body } = document;

      !body.querySelector('[data-pricing-api-id="box_enterprise"] .pricing-package--left-col__wrapper .pricing-package--label__tag') &&
        body.querySelector('[data-pricing-api-id="box_enterprise"] .pricing-package--left-col__wrapper').insertAdjacentHTML('afterbegin', enterpriseTag);

      !body.querySelector('[data-pricing-api-id="box_enterprise"] + .pricing-package .pricing-package--price fe_enterprisePlusBanner') &&
        body.querySelector('[data-pricing-api-id="box_enterprise"] + .pricing-package .pricing-package--price').insertAdjacentHTML('beforeend', enterprisePlusBanner);

      body.querySelector('[data-pricing-api-id="box_business"] .pricing-featured_features__chart').innerHTML = businessBullet;
      body.querySelector('[data-pricing-api-id="box_business_plus"] .pricing-featured_features__chart').innerHTML = businessPlusBullet;
      body.querySelector('[data-pricing-api-id="box_enterprise"] .pricing-featured_features__chart').innerHTML = enterpriseBullet;
      body.querySelector('[data-pricing-api-id="box_enterprise"] + .pricing-package .pricing-featured_features__chart').innerHTML = enterprisePlusBullet;
      body.querySelector('.pricing-navigation--tabs .pricing-navigation--button[name="tab-2"]').innerHTML = 'Businesses';
      body.querySelector('.pricing-navigation--selector [value="tab-2"]').innerHTML = 'Businesses';

      // update btn COPY

      updateBtnCopy();

      document.addEventListener('click', (event) => {
        if (event.target.closest('.pricing-navigation--button') || event.target.closest('.pricing-toggle')) {
          waitForElement(".pricing-package__buttons .button-primary,.pricing-features--plan-buttons .button-primary", updateBtnCopy, 50, 15000);
        }
      })
    };


    const comparisonTableStickyNav = () => {
      const targetElement = document.querySelector('.pricing-features__chart-wrapper');
      const targetElementHeight = targetElement.getBoundingClientRect().height;

      const stickyNav = document.querySelector('.pricing-features__chart-wrapper--super .pricing-features--sticky');

      const calcPaddingTop = (document.querySelector('#site-header') && document.querySelector('#site-header').getBoundingClientRect().height) + (document.querySelector('#page--area__top') && document.querySelector('#page--area__top').getBoundingClientRect().height);

      if (targetElement.getBoundingClientRect().top <= calcPaddingTop) {
        stickyNav.classList.add('fe_sticky');
        stickyNav.style.paddingTop = (calcPaddingTop + 2) + 'px';
      } else {
        stickyNav.classList.remove('fe_sticky');
      }

      if (targetElement.getBoundingClientRect().top < -(targetElementHeight - (stickyNav.getBoundingClientRect().height + 100))) {
        stickyNav.classList.remove('fe_sticky');
      }
    }


    const initPlanComparison = () => {
      const { body } = document;
      body.querySelector('.pricing-features .pricing-features-heading').innerHTML = `Plan comparison`;

      body.querySelectorAll('.pricing-features--plan-buttons .button-primary[href*="https://account.box.com/signup/enterprise-plan/buynow"]').forEach((element) => {
        element.closest('.pricing-features__column').classList.add('fe_enterprise_features');
        element.closest('.pricing-features__column').querySelector('.pricing-features--plan-label').innerHTML = 'RECOMMENDED';
      })

      body.querySelectorAll('.pricing-features--plan-buttons .button-link[href*="https://www.box.com/enterprise-plus"]').forEach((element) => {
        element.closest('.pricing-features__column').classList.add('fe_enterprisePlus_features');
        element.closest('.pricing-features__column').querySelector('.pricing-features--plan-label').innerHTML = 'NOW WITH BOX AI';
        //`<span class="pricing-features--plan-label fe-box-ai">NOW WITH BOX AI</span>`;
      })

      comparisonTableStickyNav();

      document.addEventListener('scroll', () => {
        comparisonTableStickyNav();
      })

    }


    waitForElement('[data-pricing-api-id="box_enterprise"] + .pricing-package .pricing-featured_features__chart', initPricingPlan, 50, 15000);
    waitForElement('.pricing-features--plan-buttons .button-link[href*="https://www.box.com/enterprise-plus"]', initPlanComparison, 1000, 15000);

    function restyleTabs() {
      document.querySelector('body').classList.add('fe_restyleTabs');
    }

    waitForElement('ul.pricing-features__bullets-navigation', restyleTabs, 1000, 25000);

  } catch (error) {
    console.error(error, 'Error in test BOX 286 v1');
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
          if (elements.length > 0 && elementsArray.some(element => element.innerText.toLowerCase() === "try it")) {
            clearInterval(interval);
            trigger();
          }
        }, 200);
        setTimeout(() => {
          clearInterval(interval);
        }, 15000);
      },
      checkTcParam: (selector,trigger)=>{
        const interval = setInterval(() => {
          trigger();          
          const elements = document.querySelectorAll(selector);
          const elementsArray = Array.from(elements);         
          if (elements.length > 0 && elementsArray.some(element => element.href.indexOf('box-286-v1') > -1)) {
            clearInterval(interval);
          }
        },100);
        setTimeout(() => {
          clearInterval(interval);
        },5000);
      },
      addTCparam: ()=> {
        const cta = document.querySelectorAll("#pricing-plan-2 .pricing-package .pricing-package__buttons-wrapper a:not([href*='https://www.box.com/']), #pricing-plan-1 .pricing-package:not([data-formatter-id='pricing-plan-108696']) .pricing-package__buttons-wrapper a, .pricing-features__chart .pricing-features--plan-buttons a:not([href*='https://www.box.com/']), .pricing-features--sticky__container .pricing-features--plan-buttons a:not([href*='https://www.box.com/'])");
        for (let i = 0; i < cta.length; i++) {
          const tc = "|box-286-v1";
          const url = cta[i].href;
          if (url.indexOf('annual') > -1 || url.indexOf('monthly') > -1) {
            if (url.indexOf('|box-286-v1') > -1) return;
            const referrer = url.concat(tc);
            cta[i].setAttribute("href", referrer);
          }
        }
      }
    }

    /* Variation Init */
    const init = () => {
      document.querySelectorAll('.pricing-package__buttons .button-link,.pricing-features--plan-buttons .button-link').forEach(element => {
        if (element.innerText.toLowerCase() === "try it") {
          element.innerHTML = `<span>Try for free</span>`;
        }
      });
    }

    document.addEventListener('click',(event)=>{
      if(event.target.closest('.pricing-navigation--button') || event.target.closest('.pricing-toggle')){
        helper.checkTcParam(".pricing-package__buttons .button-link,.pricing-package__buttons .button-primary", init);
        helper.checkTcParam("#pricing-plan-2 .pricing-package .pricing-package__buttons-wrapper a:not([href*='https://www.box.com/']), #pricing-plan-1 .pricing-package:not([data-formatter-id='pricing-plan-108696']) .pricing-package__buttons-wrapper a, .pricing-features__chart .pricing-features--plan-buttons a:not([href*='https://www.box.com/']), .pricing-features--sticky__container .pricing-features--plan-buttons a:not([href*='https://www.box.com/'])",helper.addTCparam);
      }
    })

    /* Initialize variation */
    helper.waitForTryItCTA(".pricing-package__buttons .button-link,.pricing-features--plan-buttons .button-link", init);
    helper.checkTcParam("#pricing-plan-2 .pricing-package .pricing-package__buttons-wrapper a:not([href*='https://www.box.com/']), #pricing-plan-1 .pricing-package:not([data-formatter-id='pricing-plan-108696']) .pricing-package__buttons-wrapper a, .pricing-features__chart .pricing-features--plan-buttons a:not([href*='https://www.box.com/']), .pricing-features--sticky__container .pricing-features--plan-buttons a:not([href*='https://www.box.com/'])",helper.addTCparam);
  } catch (e) {
    console.log(e, "Error in Box-286 v1");
  }
})();