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
          if (elements.length > 0 && elementsArray.some(element => element.href.indexOf('box-289-v1') > -1)) {
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
          const tc = "|box-289-v1";
          const url = cta[i].href;
          if (url.indexOf('annual') > -1 || url.indexOf('monthly') > -1) {
            if (url.indexOf('|box-289-v1') > -1) return;
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

      helper.checkTcParam("#pricing-plan-2 .pricing-package .pricing-package__buttons-wrapper a:not([href*='https://www.box.com/']), #pricing-plan-1 .pricing-package:not([data-formatter-id='pricing-plan-108696']) .pricing-package__buttons-wrapper a, .pricing-features__chart .pricing-features--plan-buttons a:not([href*='https://www.box.com/']), .pricing-features--sticky__container .pricing-features--plan-buttons a:not([href*='https://www.box.com/'])",helper.addTCparam);

    }

    document.addEventListener('click',(event)=>{
      if(event.target.closest('.pricing-navigation--button') || event.target.closest('.pricing-toggle')){
        helper.checkTcParam(".pricing-package__buttons .button-link,.pricing-package__buttons .button-primary", init);
      }
    })

    /* Initialize variation */
    helper.waitForTryItCTA(".pricing-package__buttons .button-link,.pricing-features--plan-buttons .button-link", init);
  } catch (e) {
    console.log(e, "Error in Box-289 v1");
  }
})();