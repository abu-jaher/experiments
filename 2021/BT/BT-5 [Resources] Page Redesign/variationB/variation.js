(() => {
  try {
    const waitForElement = (selector, trigger) => {
      const interval = setInterval(() => {
        const elements = document.querySelectorAll(selector);
        if (document && elements && elements.length > 0) {
          clearInterval(interval);
          trigger();
        }
      }, 50);
      setTimeout(() => {
        clearInterval(interval);
      }, 15000);
    };

    const waitforMarketo = (trigger) => {
      const interval = setInterval(() => {
        if (
          window.MktoForms2
        ) {
          clearInterval(interval);
          trigger();
        }
      }, 50);
      setTimeout(()=> {
        clearInterval(interval);
      }, 10000);
    }

    const guideAcquireParagraph = `
      <p>For nonprofit organizations, finding new donors and making sure they stick around is paramount.</p>
      <p class="fe_desc">This guide by Bonterra\'s Fundraising and Engagement solutions offers strategies for acquiring and retaining donors, including how to launch peer-to-peer donation campaigns, maximize corporate partnerships, host cultivation parties and other free events.</p>
    `;

    const transformMedicalParagraph = `
    <p class="fe_desc">Time is of the essence when it comes to medical grantmaking. Explore how Bonterra's medical grants software can simplify grantmaking complexities and reduce your regulatory risk.</p>
    `

    const init = () => {
      const { body } = document;

      const path = location.pathname;

      path.indexOf('transform-your-medical') > -1 ? body.classList.add('fe_new_target') : '';

      !body.querySelector('.fe_desc') ? body.querySelector('.hero .section-description').innerHTML = path.indexOf('transform-your-medical') > -1 ? transformMedicalParagraph : guideAcquireParagraph : null;

      const shareThisPage = body.querySelector('#block-bettersocialsharingbuttons');
      body.querySelector('#block-recirculation').insertAdjacentElement('afterend', shareThisPage);
    };

    const moveMarketoForm = () => {
      const { body } = document;
      const mktoFormSection = body.querySelector('.region-content .form-include');
      mktoFormSection.querySelector('.section-title').innerHTML = 'Fill in the form to download this resource';

      body.querySelector('.region-hero .hero').insertAdjacentHTML('beforeend', '<div class="fe_form"></div>');
      body.querySelector('.region-hero .hero .fe_form').insertAdjacentElement('beforeend', mktoFormSection);

      waitforMarketo(() => {
        MktoForms2.whenReady((form)=> {
          body.querySelector('#LblCapability__c') &&
            body.querySelector('#LblCapability__c').closest('.mktoFormRow').classList.add('fe_full-width');
        });
      })
    }

    waitForElement('#block-recirculation', init);
    waitForElement('.region-content .form-include', moveMarketoForm);
  } catch (error) {
    console.error(error, 'Error in test BT-5 v1');
  }
})();