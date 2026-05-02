(() => {
  try {
    /* main variables */
    const debug = 0;
    const variation_name = "";

    const waitForElement = (selector, trigger, delayInterval, delayTimeout) => {
      const interval = setInterval(() => {
        if (
          document &&
          document.querySelector(selector) &&
          document.querySelectorAll(selector).length > 0
        ) {
          clearInterval(interval);
          trigger();
        }
      }, delayInterval);
      setTimeout(() => {
        clearInterval(interval);
      }, delayTimeout);
    }

    const waitForMarketo = (trigger) => {
      const interval = setInterval(() => {
        if (window.MktoForms2) {
          clearInterval(interval);
          trigger();
        }
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
      }, 10000);
    }

    const setValue = (selector, value) => {
      const getFormElement = MktoForms2.allForms()[0].getFormElem()[0];
      const element = getFormElement.querySelector(selector);
      if (element) {
        element.value = value;
      }
    }

    const addClass = (element_selector, className) => {
      const element = document.querySelectorAll(element_selector);
      for (let i = 0; i < element.length; i++) {
        if (element[i].classList)
          element[i].classList.add(className);
        else if (!BmHelperUtils.hasClass(element[i], className))
          element[i].className += ' ' + className;
      }
    }
    const removeClass = (element_selector, className) => {
      const element = document.querySelectorAll(element_selector);
      for (let i = 0; i < element.length; i++) {
        if (element[i].classList)
          element[i].classList.remove(className);
        else
          element[i].className = element[i].className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
      }
    }

    //progress bar
    const fe_progress = `
      <div class="fe-progress-bar">
        <span class="step1">1</span>
        <span class="step2">2</span>
        <span class="step3">3</span>
      </div>`;

    //Step 1 Section Structure
    const multi_step_form = `
      <div class="fe-multistep-form">
        <div class="fe-step step_one active">
          <div id="fe-form-question">
            <h3>How would you describe your role?</h3>
          </div>
          <div id="fe-form-answers" class="fe-btn-grid">
            <button class="fe-answer-btn"><input type="radio" id="fe-checkbox8" name="fe-step2"><label for="fe-checkbox8"><span class="checkmark" data="Staffing and recruiting agency" >I am with a staffing and recruiting agency</span></label></button>
            <button class="fe-answer-btn"><input type="radio" id="fe-checkbox9" name="fe-step2"><label for="fe-checkbox9"><span class="checkmark" data="In-house hiring team" >I am part of an in-house hiring team</span></label></button>
            <button class="fe-answer-btn"><input type="radio" id="fe-checkbox10" name="fe-step2"><label for="fe-checkbox10"><span class="checkmark" data="Other" >Other</span></label></button>
          </div>
          <div class="fe-next-button">
            <button id="fe-next-one" class="fe-disable">Continue</button>
          </div>
        </div>
      </div>`;

    let formEngagement = false;  

    /* Variation Init */
    const init = () => {
      document.querySelector('.bm_form_heading').insertAdjacentHTML("beforeend", fe_progress);
      document.querySelector('#sales-form').insertAdjacentHTML("afterbegin", multi_step_form);

      // create hidden field
      waitForMarketo(() => {
        MktoForms2.whenReady((form) => {
          form.addHiddenFields({
            "formTypeofCompany": ''
          });
        });
      })

      document.addEventListener('click', (e) => {
        // option selection
        if (e.target.closest('#fe-form-answers button')) {
          removeClass('.step_one #fe-form-answers button', 'fe-active');
          e.target.closest('#fe-form-answers button').classList.add('fe-active')
        }
        // step 1 continue btn clicked
        if (e.target.matches('.step_one div.fe-next-button button') && document.querySelector('div.step_one #fe-form-answers button.fe-active')) {
          removeClass('div.step_one', 'active');
          addClass('.Dice_Master_Contact_Us_Form', 'active');
          addClass('.fe-progress-bar', 'fe-step1-complete');

          // set the value to the hidden field & trigger the event
          const selectedOption = document.querySelector('div.step_one #fe-form-answers button.fe-active span').getAttribute('data');
          setValue('[name="formTypeofCompany"]', selectedOption);
          trackGAEvent('funnelenvy', 'Qualifying question', selectedOption)
        }

        // form engagement event
        if(e.target.closest('button.fe-answer-btn') && formEngagement == false){
          trackGAEvent('funnelenvy', 'click', 'form_engagement_LP')
          formEngagement = true;
        }
      })

      // UA event tracker
      let dimension = 175;
      let tracker = '';
      if (window.ga && window.ga.getAll) {
        if (tracker == '' || tracker == ' ') {
          tracker = window.ga.getAll()[0].get('name');
        }

        window.ga(
          tracker + '.set',
          'dimension' + dimension,
          'DICE-125-v1',
        );

        window.ga(
          tracker + '.send',
          'event',
          'FunnelEnvy',
          'DICE-125-v1',
          {
            Interaction: 1,
          },
        );

      }

    }

    const trackGAEvent = (eventCategory, eventAction, eventLabel) => {
      if ('ga' in window) {
        ga.getAll()[0].send('event', {
          eventCategory: eventCategory,
          eventAction: eventAction,
          eventLabel: eventLabel,
        });
      }
    }

    /* Initialize variation */
    waitForElement(".mktoButtonWrap .mktoButton", init, 50, 25000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();