(() => {
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
    setTimeout(function () {
      clearInterval(interval);
    }, delayTimeout);
  }

  /* Variation functions */

  const fe_left_copy = `
     <div class="fe-static-page-content">
          <h4>Where tech connects</h4>
          <p>With over <strong>6.2M members</strong> on Dice, we\'re here to help you connect with the tech talent to power your business forward.
          </p>
          <ul>
              <li>Find pre-screened tech candidates, many verified.</li>
              <li>Enhance your job posting.</li>
              <li>Hire with confidence.</li>
          </ul>
          <p><strong>Contact us today</strong>, and let one of our team members show you why Dice is the trusted partner by companies that are transforming the world through technology.</p>
      </div>`;


  const init = () => {
    document.querySelector('body').classList.add('fe-dice75');

    // insert left copy
    const targetElement = document.querySelector('.sales-form-title');
    targetElement.innerHTML = fe_left_copy;

  }

  waitForElement('.sales-form-title', init, 50, 10000);
})();