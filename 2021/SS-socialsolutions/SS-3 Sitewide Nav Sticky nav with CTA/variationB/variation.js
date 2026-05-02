(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "SS-3 [Sitewide Nav] Sticky nav with CTA";


    function waitForElement(selector, trigger, delayInterval, delayTimeout) {
      var interval = setInterval(function () {
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

    function TrackGAEvent($eventCategory, $eventAction, $eventLabel) {
      if ("ga" in window) {
        ga.getAll()[0].send("event", {
          eventCategory: $eventCategory,
          eventAction: $eventAction,
          eventLabel: $eventLabel,
        });
      }
    }
     
  function removeClass(selector, cls){
    var el = document.querySelector(selector);
    if(el && el.classList.contains(cls)){
        el.classList.remove(cls);
    }
  }


    var StickyNav = '' +
    '              <div class="fe-request-demo-cta">' +
    '                  <a class="wp-block-button__link has-sugar-color has-matcha-background-color has-text-color has-background" href="https://www.socialsolutions.com/request-a-demo/" style="border-radius:50px">Request a demo</a>' +
    '              </div>';

    function init() {
      document.querySelector('header #desktop-main-menu').insertAdjacentHTML('afterend', StickyNav);
     
    
    var lastScroll = 0;
    window.addEventListener('scroll', function() {
      var currentScroll = window.scrollY;
      if(lastScroll < currentScroll){
        document.body.classList.add('fe-nav-scroll'); 
      }else{
        removeClass('body', 'fe-nav-scroll');
      }
    
      //update last scroll value
      lastScroll = currentScroll;
    })

      document.querySelector(".fe-request-demo-cta a.has-background").addEventListener("click", function () {
          TrackGAEvent("Sticky_nav_CTA_click", "GA_Clicks", "Clicks_on_Request_demo");
        });
    }

    /* Initialise variation */
    waitForElement("header #desktop-main-menu", init, 100, 25000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
