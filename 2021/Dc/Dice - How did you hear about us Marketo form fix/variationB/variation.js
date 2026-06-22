(() => {
  try {
    /* main variables */
    const debug = 0;
    let variation_name = "";

    function waitforMarketo(trigger) {
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

    const listOfID = [3221, 3225];

    /* Variation Init */
    waitforMarketo(() => {
      MktoForms2.whenReady(form => {
        const marketoForm = MktoForms2.allForms()[0].getFormElem()[0];
        const formId = MktoForms2.allForms()[0].getId();
        if (listOfID.includes(formId)) {
          const selfReportedAttribution = marketoForm.querySelector('#diceSelfreportedattribution');
          if (selfReportedAttribution) {
            selfReportedAttribution.closest('.mktoFormRow').classList.add('multi-step-step2', 'multi-step-hide', 'fe_new_field');
          }
        }
      });
    });
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
