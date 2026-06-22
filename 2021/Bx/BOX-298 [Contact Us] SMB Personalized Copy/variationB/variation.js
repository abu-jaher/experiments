(() => {
  try {
    const shared = {
      ID: "FE",
      VARIATION: "298",
      CLIENT: "funnelenvy"
    };

    const ID = shared.ID;
    const VARIATION = shared.VARIATION;

    const setup = () => {
      document.body.classList.add(ID + "-" + VARIATION);
    };

    const personalizationData = [
      "Unlimited storage, e-signatures, and AI insights to simplify <span>your workflows</span>",
      "Scalable solutions that offer great value and grow with <span>your business</span>",
      "Seamless collaboration (from anywhere!) with teams, clients, <span>and partners</span>",
      "Enterprise-grade security to protect your business as <span>it scales</span>",
    ];

    const htmlStringTablet = `
        <p>Let\'s connect about:</p>
        <div class="fe-point"></div>`;

    const activate = () => {
      setup();

      const data = personalizationData;
      if (data) {

        //create bullet section for tablet
        const bulletHtml = document.createElement('div');
        bulletHtml.setAttribute('class', 'fe-bullet');
        bulletHtml.innerHTML = htmlStringTablet;

        //create bullet section for mobile
        const bulletHtmlMob = document.createElement('div');
        bulletHtmlMob.setAttribute('class', 'fe-bullet');
        bulletHtmlMob.innerHTML = htmlStringTablet;


        if (!document.querySelector('.fe-bullet')) {
          // insert the bullet section to tablet
          const insertInto = document.querySelector('.contact-form .show-tablet');
          const checkListElm = insertInto?.querySelector('.checkList + *');
          checkListElm && insertInto.insertBefore(bulletHtml, checkListElm);

          // insert the bullet section to mobile
          const insertIntoMobile = document.querySelector('.contact-form .show-mobile');
          const checkListElmMob = insertIntoMobile?.querySelector('.checkList + *');
          checkListElmMob && insertIntoMobile.insertBefore(bulletHtmlMob, checkListElmMob);
        }

        // Insert data in bullet
        generateAndInsertBullet(data)

      }

    };

    function generateAndInsertBullet(data) {
      let innerData = '';
      data?.forEach(function (val) {
        innerData += `<p class="bullet1"><i class="icon-check-2"></i> ` + val + `</p>`;
      });

      const bullets = document.querySelectorAll('.fe-bullet div');
      bullets?.forEach(function (bullet, i) {
        if (i < 2) {
          bullet.innerHTML = innerData;
        }
      });
    }

    const pollerLite = (conditions, callback, maxTime) => {
      if (maxTime === void 0) { maxTime = 20000; }
      const POLLING_INTERVAL = 50;
      const startTime = Date.now();
      const interval = setInterval(() => {
        const allConditionsMet = conditions.every((condition) => {
          if (typeof condition === 'function') {
            return condition();
          }
          return !!document.querySelector(condition);
        });
        if (allConditionsMet) {
          clearInterval(interval);
          callback();
        }
        else if (Date.now() - startTime >= maxTime) {
          clearInterval(interval);
          console.log('Polling exceeded maximum time limit');
        }
      }, POLLING_INTERVAL);
    };

    pollerLite(['.contact-form-description'], activate);

  } catch (e) {
    console.log(e, 'Error in v1')
  }
})();