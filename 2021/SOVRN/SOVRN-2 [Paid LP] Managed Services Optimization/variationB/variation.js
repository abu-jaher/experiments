(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "";

    /* all Pure helper functions */

    function waitForElement(
      selector,
      trigger,
      delayInterval,
      delayTimeout
    ) {
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
    function live(selector, event, callback, context) {
      // helper for enabling IE 8 event bindings
      function addEvent(el, type, handler) {
        if (el.attachEvent) el.attachEvent('on' + type, handler);
        else el.addEventListener(type, handler);
      }
      // matches polyfill
      this.Element && function (ElementPrototype) {
        ElementPrototype.matches = ElementPrototype.matches ||
          ElementPrototype.matchesSelector ||
          ElementPrototype.webkitMatchesSelector ||
          ElementPrototype.msMatchesSelector ||
          function (selector) {
            var node = this,
              nodes = (node.parentNode || node.document).querySelectorAll(selector),
              i = -1;
            while (nodes[++i] && nodes[i] != node);
            return !!nodes[i];
          };
      }(Element.prototype);
      // live binding helper using matchesSelector
      function live(selector, event, callback, context) {
        addEvent(context || document, event, function (e) {
          var found, el = e.target || e.srcElement;
          while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
          if (found) callback.call(el, e);
        });
      }
      live(selector, event, callback, context);
    }


    var sovrnmanageHTML =
      "" +
      '  <div class="fe-sovrn-managed">' +
      "      <h3 class='fe-sovrn-heading'>" +
      "          Sovrn //Managed Services <span>partners with publishers</span> to help them <span>Earn More. Keep More.</span>" +
      "      </h3>" +
      '      <ul class="fe-bullet-points">' +
      "          <li>Dedicated expert AdOps strategy and support</li>" +
      "          <li>Customized data-driven advice</li>" +
      "          <li>Efficient multi-channel bid response</li>" +
      "          <li>Access to more demand partners</li>" +
      "          <li>Transparent, fixed rate CPM across all sold impressions</li>" +
      "          <li>Light set-up</li>" +
      "          <li>Fast payments</li>" +
      "          <li>No fixed contracts</li>" +
      "      </ul>" +
      '      <div class="demo-cta">' +
      '          <a class="fe-cta  btn btn-primary waves-effect waves-light" href="https://info.sovrn.com/request-managed-services-demo" target="_self" rel="noopener">GET YOUR PERSONALIZED DEMO</a>' +
      "      </div>" +
      "  </div>";
    helpsectionHTML =
      "" +
      '  <div class="fe-help-section container">' +
      "      <p>Learn how Sovrn <span>//Managed Services</span> can help you <span> Earn More. Keep More.</span>" +
      "      </p>" +
      '      <div class="demo-cta"><a class="fe-cta btn btn-primary waves-effect waves-light" href="https://info.sovrn.com/request-managed-services-demo" target="_self" rel="noopener">SCHEDULE 1-1 DEMO</a></div>' +
      "  </div>";

    var feRightSection =
      "" +
      '<div class="col-lg-6 fe-right-content"><div class="banner-image"><div class="paid-total"><p>$225M</p><p>PAID TO PUBLISHERS TOTAL TO DATE</p></div><img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/funnelenvy/SOVRN-2%3A+%5BPaid+LP%5D+Managed+Services+Optimization/data-monetization-image.png" alt="data-monetization-image"></div></div>';

    var subHeadingtext =
      '<p class="fe-subheading-text">GENERATE MORE REVENUE with innovative auction logic and an experienced, dedicated growth team.</p><a class="fe-cta fe-hero-cta btn btn-primary waves-effect waves-light" href="https://info.sovrn.com/request-managed-services-demo" target="_self" rel="noopener">SCHEDULE 1-1 DEMO</a>';

    //change text
    function changeText(selector, text) {
      var el = document.querySelector(selector);
      el && (el.innerHTML = text);
    }

    function init() {
      document
        .querySelector(".site-main .blocks_stats_block")
        .insertAdjacentHTML("beforebegin", helpsectionHTML);

      //heading text
      changeText(
        "#hero  header.entry-content  h1.h3",
        "Maximize your <span>ad revenue</span> and <span> reduce overhead costs</span>"
      );

      //change subheding text
      changeText(
        "#hero div.container header.entry-content  .content",
        subHeadingtext
      );

      document
        .querySelector("#hero .row .col-lg-6")
        .insertAdjacentHTML("afterend", feRightSection);

      //change keep more of your column content
      changeText(
        "#block-1 .image-side +.content-side",
        sovrnmanageHTML
      );

        document.querySelector('html body #block-1  div.col-lg-6.image-side').innerHTML = '<img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/funnelenvy/SOVRN-2%3A+%5BPaid+LP%5D+Managed+Services+Optimization/Side-Image.png" alt="Chart Image">';


      //change block position
      document
        .querySelector("main.site-main #block-1")
        .insertAdjacentElement(
          "beforebegin",
          document.querySelector("main.site-main #block-2")
        );

      //change block position
      document
        .querySelector("main.site-main #block-3")
        .insertAdjacentElement(
          "beforebegin",
          document.querySelector("main.site-main #block-5")
        );


        live('#hero .fe-hero-cta', 'click', function () {
          TrackGAEvent('Hero_CTA_clicks', 'GA_Clicks', 'Hero_CTA_click');
        });

        live('.fe-sovrn-managed .fe-cta, .fe-help-section .fe-cta', 'click', function () {
          TrackGAEvent('Body_CTA_clicks', 'GA_Clicks', 'Body_CTA_click');
        });

      }
 

function TrackGAEvent($eventCategory, $eventAction, $eventLabel) {
  if ('ga' in window) {
    ga.getAll()[0].send('event', {
      eventCategory: $eventCategory,
      eventAction: $eventAction,
      eventLabel: $eventLabel,
    });
  }
}

    /* Initialise variation */
    waitForElement("main.site-main #block-2", init, 100, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
