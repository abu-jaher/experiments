(() => {
  const waitforMarketo = (trigger) => {
    const interval = setInterval(() => {
      if (window.MktoForms2) {
        clearInterval(interval);
        trigger();
      }
    }, 50);
    setTimeout(() => {
      clearInterval(interval);
    }, 15000);
  }

  const waitForElement = (selector, trigger, delayInterval, delayTimeout) => {
    const interval = setInterval(() => {
      if (document &&
        document.querySelector(selector) &&
        document.querySelectorAll(selector).length > 0) {
        clearInterval(interval);
        trigger();
      }
    }, delayInterval);
    setTimeout(() => {
      clearInterval(interval);
    }, delayTimeout);
  };

  const errorMsg = `<div class="fe_errorMsg mktoError"><div class="mktoErrorArrowWrap"><div class="mktoErrorArrow"></div></div><div id="ValidMsg" role="alert" tabindex="-1" class="mktoErrorMsg">This field is required.</div></div>`;

  /* Variation Init */

  const NewFieldValidation = () => {
    waitforMarketo(() => {
      MktoForms2.whenReady(form => {
        document.querySelector('#formSubmitBtn').disabled = true;

        const marketoForm = MktoForms2.allForms()[0].getFormElem()[0];
        const selfReportedAttribution = marketoForm.querySelector('#diceSelfreportedattribution');
        if (selfReportedAttribution) {
          selfReportedAttribution.closest('.mktoFormRow').classList.add('fe_about_field');
          updateFormValidation(selfReportedAttribution);
        }
      });
    });
  }


  const submitBtnClick = (newField) => {
    const submitBtn = document.querySelector('#FE-Form-Validator__tempStep2Btn');

    submitBtn.addEventListener('click', (e) => {

      waitForElement('#Phone.FE-Form-Validator__valid-green',()=>{
        const phoneValidate = document.querySelector('#Phone.FE-Form-Validator__valid-green');
        const company = document.querySelector('.mktoForm #Company');
  
        if ( phoneValidate && company.value === '') {
          MktoForms2.allForms()[0].validate();
        }
  
        if ( phoneValidate &&  company.value !== '' && newField.value === '') {
          !document.querySelector('.fe_errorMsg') && newField.insertAdjacentHTML('afterend', errorMsg);
          const interval = setInterval(() => {
            if(submitBtn.textContent === 'Please Wait'){
              submitBtn.textContent = "Submit";
              clearInterval(interval)
            }
          }, 20);

          setTimeout(function(){
            clearInterval(interval)
          },5000)

        }
        
        if(phoneValidate && company.value !== '' && newField.value !== ''){
          MktoForms2.allForms()[0].submit();
        }

      },50,15000)

    })
  }

  const updateFormValidation = (newField) => {
    submitBtnClick(newField);

    document.querySelector('.mktoForm').addEventListener('click', (e) => {
      if (e.target.matches(".mktoForm input")) {
        document.querySelector('.fe_errorMsg') && document.querySelector('.fe_errorMsg').remove();
      }

      if (e.target.matches(".fe_about_field input")) {
        trackGAEvent('funnelenvy','click','Click on How did you hear about us')
      }

    })

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

  waitForElement('#FE-Form-Validator__tempStep2Btn', NewFieldValidation, 50, 15000)

})();