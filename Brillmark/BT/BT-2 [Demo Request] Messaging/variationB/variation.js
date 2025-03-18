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
  
      const init = () => {
        document.querySelector(
          '#main-wrapper .region-hero .section-title',
        ).innerHTML = 'Boost your impact with Bonterra';
        const listItems = document.querySelectorAll(
          '#main-wrapper .region-content .section-body ul li',
        );
        listItems[0].querySelector('p').innerHTML =
          'A response from our team within an hour to schedule a 30-minute call.';
        listItems[1].querySelector('p').innerHTML =
          'An exploration of your unique needs and how we can help.';
        listItems[2].querySelector('p').innerHTML =
          "Custom solutions, engineered to maximize your organization's impact.";
        document.querySelector(
          '#main-wrapper .region-content .body-content .form-include .section-title',
        ).innerHTML = 'REQUEST A DEMO';
      };
  
      waitForElement('#main-wrapper .region-content .section-body ul li', function(){
        var interval = setInterval(function(){
          init();
        },50)

        setTimeout(function(){
          clearInterval(interval)
        },3000)

      });
    } catch (error) {
      console.error(error, 'Error in test BT-2 v1');
    }
  })();