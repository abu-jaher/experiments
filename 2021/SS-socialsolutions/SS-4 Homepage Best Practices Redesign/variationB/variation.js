(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "SS-4: [Homepage] Best Practices Redesign";


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

    // GA tracker fun
    function TrackGAEvent($eventCategory, $eventAction, $eventLabel) {
      if ("ga" in window) {
        ga.getAll()[0].send("event", {
          eventCategory: $eventCategory,
          eventAction: $eventAction,
          eventLabel: $eventLabel,
        });
      }
    }

    var socilaProofHtml = `<div class="fe-social-proof">
    <div>
        <div class="social-badge"><img src="https://d27c6j8064skg9.cloudfront.net/FE/SS/04/trustradius_top_rated_badge.png" alt=""></div>
        <div class="social-badge"><img src="https://d27c6j8064skg9.cloudfront.net/FE/SS/04/TrustRadius-Most-Loved-Award.png" alt=""></div></div>
        <div class="social-proof-content">
        <blockquote class="wp-block-quote">
        <p>"The draw of Social Solutions' software is that it's robust. We were able to customize it and make it fit our exact needs because it's flexible."</p><cite><em>MAEGAN MATTOCK,  MSW, CASA LA - 
        CHIEF PROGRAM OFFICER</em></cite></blockquote>
        </div>
    </div>`

    var heroVideo = `<div class="fe-hero-video wp-block-ws-layout-column col-6">
        <iframe class="" name="iframe-1" loading="lazy" title="Apricot Product Overview Video" data-src="https://player.vimeo.com/video/604129823?h=68f5516ae9&amp;dnt=1&amp;app_id=122963" width="500" height="281" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen="" src="https://player.vimeo.com/video/604129823?h=68f5516ae9&amp;dnt=1&amp;app_id=122963"></iframe></div>`



    function initHero() {
      // new html insertion
      document.querySelector('.wp-block-buttons.has-text-align-center').insertAdjacentHTML('afterend', socilaProofHtml);
      document.querySelector('.wp-block-ws-section:nth-child(2) .row').insertAdjacentHTML('beforeend', heroVideo);
      document.querySelector('html body .wp-block-ws-section:nth-child(2)').classList.remove('width-wide');
      document.querySelector('html body section .wp-block-ws-layout-column h1.has-text-align-center').innerHTML = "Grow your impact and improve <br>your results";
      
      document.querySelector('section .wp-block-ws-layout-column p.has-text-align-center').innerHTML = "Measure social change, optimize outcomes, and drive greater impact <br>with the industry-leading software for public sector and nonprofit social <br>service organizations.";
    }

    function initMoveSection(){
      // move section below hero banner
      var beforeElement = document.querySelector('section:nth-child(5)');
      var targetElement = document.querySelector('section:nth-child(4)');
      beforeElement && targetElement && targetElement.parentNode && targetElement.parentNode.insertBefore(beforeElement, targetElement);

      var sectionHead = document.querySelector('.wp-block-ws-section:nth-child(4) .wp-block-ws-split');
      var outerParent = document.querySelector('.wp-block-ws-section:nth-child(4) .section-inner');
      sectionHead && outerParent && outerParent.parentNode && outerParent.parentNode.insertBefore(sectionHead, outerParent);
    }

    function gaEvent(){
      // GA event
      document
        .querySelector(".wp-block-ws-section:nth-child(2) .wp-block-button:not(.is-style-outline) a")
        .addEventListener("click", function () {
          TrackGAEvent(
            "funnelenvy",
            "Click",
            "Primary CTA clicks"
          );
        });

        document
        .querySelector(".wp-block-ws-section:nth-child(2) .wp-block-button.is-style-outline a")
        .addEventListener("click", function () {
          TrackGAEvent(
            "funnelenvy",
            "Click",
            "Tour the product CTA click"
          );
        });
    }

    /* Initialize variation */
    waitForElement("section .wp-block-ws-layout-column p.has-text-align-center", initHero, 50, 15000);
    waitForElement(".wp-block-ws-section:nth-child(5) .wp-block-ws-split", initMoveSection, 50, 15000);
    waitForElement(".wp-block-ws-section:nth-child(2) .wp-block-button.is-style-outline a", gaEvent, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();