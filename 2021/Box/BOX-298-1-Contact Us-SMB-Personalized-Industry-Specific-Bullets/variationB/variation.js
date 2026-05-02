(() => {
  try {
    const shared = {
      ID: "FE",
      VARIATION: "298-1",
      CLIENT: "Funnelenvy"
    };

    const { ID, VARIATION } = shared;

    const observeElement = (selector, callback) => {
      const waitForBody = () => {
        if (document.body) {
          startObserving();
        } else {
          setTimeout(waitForBody, 10);
        }
      };

      const startObserving = () => {
        const targetNode = document.querySelector(selector);
        if (targetNode) {
          callback();
          return;
        }

        const observer = new MutationObserver((mutations, obs) => {
          if (document.querySelector(selector)) {
            callback();
            obs.disconnect();
          }
        });
        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      };

      waitForBody();
    };

    const onLoadBombora = (trigger) => {
      const interval = setInterval(() => {
        const bomboraStoredData = sessionStorage.getItem('bombora');
        if (bomboraStoredData !== null && typeof bomboraStoredData !== "undefined") {
          trigger();
          clearInterval(interval);
        }
      }, 50);

      setTimeout(() => clearInterval(interval), 15000);
    };

    const personalizationData = {
      "small business": [
        "Unlimited storage, e-signatures, and AI insights to simplify your workflows",
        "Small business solutions that offer great value and scale with your business",
        "Seamless collaboration (from anywhere!) with teams, clients, and partners",
        "Enterprise-grade security to protect your business as it scales",
      ],
      "finance": [
        "Unlimited storage, e-signatures, and AI insights to simplify your workflows",
        "Financial Services solutions that offer great value and scale with your institution",
        "Seamless collaboration (from anywhere!) with teams, clients, and partners",
        "Enterprise-grade security to protect your institution as it scales",
      ],
      "healthcare": [
        "Unlimited storage, e-signatures, and AI insights to simplify your workflows",
        "Healthcare solutions that offer great value and scale with your organization",
        "Seamless collaboration (from anywhere!) with teams, clients, and partners",
        "Enterprise-grade security to protect your organization as it scales",
      ],
      "life sciences": [
        "Unlimited storage, e-signatures, and AI insights to simplify your workflows",
        "Life Sciences solutions that offer great value and scale with your company",
        "Seamless collaboration (from anywhere!) with teams, clients, and partners",
        "Enterprise-grade security to protect your company as it scales",
      ],
      "professional services": [
        "Unlimited storage, e-signatures, and AI insights to simplify your workflows",
        "Professional Services solutions that offer great value and scale with your business",
        "Seamless collaboration (from anywhere!) with teams, clients, and partners",
        "Enterprise-grade security to protect your business as it scales",
      ],
      "retail": [
        "Unlimited storage, e-signatures, and AI insights to simplify your workflows",
        "Retail & Consumer Goods solutions that offer great value and scale with your business",
        "Seamless collaboration (from anywhere!) with teams, clients, and partners",
        "Enterprise-grade security to protect your business as it scales",
      ],
      "consumer goods": [
        "Unlimited storage, e-signatures, and AI insights to simplify your workflows",
        "Retail & Consumer Goods solutions that offer great value and scale with your business",
        "Seamless collaboration (from anywhere!) with teams, clients, and partners",
        "Enterprise-grade security to protect your business as it scales",
      ],
    }

    const createBulletSection = (htmlString) => {
      const bulletSection = document.createElement('div');
      bulletSection.className = 'fe-bullet';
      bulletSection.innerHTML = htmlString;
      return bulletSection;
    };

    const insertBulletSection = (targetSelector, htmlString) => {
      const targetContainer = document.querySelector(targetSelector);
      const sibling = targetContainer?.querySelector('.checkList + *');

      if (targetContainer && sibling && !targetContainer.querySelector('.fe-bullet')) {
        const bulletSection = createBulletSection(htmlString);
        targetContainer.insertBefore(bulletSection, sibling);
      }
    };

    const generateAndInsertBullet = (data) => {
      if (!data) return;

      const bulletsHtml = data
        .map(item => `<p class="bullet"><i class="icon-check-2"></i>` + item + `</p>`)
        .join('');

      document.querySelectorAll('.fe-bullet div').forEach((bullet, index) => {
        if (index < 2) bullet.innerHTML = bulletsHtml;
      });
    };

    const defaultKey = "small business";

    /* Variation Init */
    const init = () => {
      document.body.classList.add(ID + "-" + VARIATION);

      const bomboraData = sessionStorage.getItem('bombora');
      const bomboraParsedData = bomboraData ? JSON.parse(bomboraData) : null;
      const key = bomboraParsedData?.industry?.toLowerCase() || defaultKey;
      const matchedKey = findMatchingKey(key, personalizationData);
      const data = personalizationData[matchedKey] || personalizationData[defaultKey];

      // Add body class
      document.body.classList.add('fe_newBulletsActive');

      // Insert bullet sections
      const htmlStringTablet = `<p>Let's connect about:</p><div class="fe-point"></div>`;
      insertBulletSection('.contact-form .show-tablet', htmlStringTablet);
      insertBulletSection('.contact-form .show-mobile', htmlStringTablet);

      // Generate and insert bullets
      generateAndInsertBullet(data);
    };

    const findMatchingKey = (targetKey, data) => {
      const normalizedTargetKey = targetKey.toLowerCase();
      for (const property in data) {
        if (normalizedTargetKey.includes(property.toLowerCase())) {
          return property;
        }
      }
      return null;
    }

    onLoadBombora(() => {
      observeElement(".contact-form-description .show-tablet .checkList", init);
    });
  } catch (e) {
    if (debug) console.log(e, "error in Box-298-1");
  }
})();