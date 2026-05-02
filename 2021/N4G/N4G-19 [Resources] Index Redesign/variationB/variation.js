(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "N4G-19: [Resources] Index Redesign";

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

    var bmTrendingResources = ""+
    ' <div class="bm-trending-res">'+
    '   <div class="bm-trending-inr">'+
    '     <h3>Trending Resources</h3>'+
    '     <div class="bm-trend-res">'+
    '       <div class="bm-trendings">'+
    '         <p class="bm-trendings-subhead">Blog Post:</p>'+
    '         <a href="https://www.networkforgood.com/resource/how-to-write-a-fundraising-letter-that-wins-back-lapsed-donors/">How to Write a Fundraising Letter That Wins Back Lapsed Donors</a>'+
    '       </div>'+
    '       <div class="bm-trendings">'+
    '         <p class="bm-trendings-subhead">Webinars & Events:</p>'+
    '         <a href="https://www.networkforgood.com/resource/building-legacy/">Building Legacy: Your Organization’s Guide to Planned Giving Conversations</a>'+
    '       </div>'+
    '       <div class="bm-trendings">'+
    '         <p class="bm-trendings-subhead">Guides & Templates:</p>'+
    '         <a href="https://www.networkforgood.com/resource/complete-nonprofit-annual-report-template/">Complete Nonprofit Annual Report Template</a>'+
    '       </div>'+
    '     </div>'+
    '   </div>'+
    ' </div>';

    var bmLatestResources = ""+
    ' <div class="bm-latest-res shell">'+
    '    <div class="section__title"><h3>Latest resources</h3></div>'+
    '  <div class="bm-latest-inr">'+
    '    <div class="bm-latest">'+
    '      <div class="bm-latest-card">'+
    '        <div class="resource__tags"><a href="https://www.networkforgood.com/resources/blog/">Blog Posts</a></div>'+
    '        <div class="resource__title"><h6>The Difference Between a Mission and Vision for Nonprofits</h6></div>'+
    '        <div class="resource__actions"><a class="btn-transparent" href="https://www.networkforgood.com/resource/whats-the-difference-between-mission-and-vision/"><span>Read More</span></a></div>'+
    '      </div>'+
    '      <div class="bm-latest-card">'+
    '        <div class="resource__tags"><a href="https://www.networkforgood.com/resources/guides-templates/">Guides & Templates</a></div>'+
    '        <div class="resource__title"><h6>Turning Your Board Members Into Fundraisers</h6></div>'+
    '        <div class="resource__actions"><a class="btn-transparent" href="https://www.networkforgood.com/resource/turning-your-board-members-into-fundraisers/"><span>Download</span></a></div>'+
    '      </div>'+
    '    </div>'+
    '    <div class="bm-fundraiser">'+
    '      <div class="bm-fundraiser-inr">'+
    '        <div class="bm-fundraiser__title"><h2>Want to be a better nonprofit marketer and fundraiser?</h2></div>'+
    '        <div class="bm-fundraiser__desc"><p>Our nonprofit resources are FREE and can help you meet your fundraising goals. Get alerts for tips, webinars, and new guides!</p></div>'+
    '        <div class="section__actions"><a class="btn" href="https://learn.networkforgood.com/subscribe-general.html?utm_medium=web&utm_source=webglobalcta&utm_campaign=cta_subscribe__general-subscribe"><span>Subscribe Now</span></a></div>'+
    '      </div>'+
    '    </div>'+
    '  </div>'+
    ' </div>';
    

    function init() {
      //Audience targeting for Desktop only
      if(window.screen.width > 1023){
        //Change Thank you image
        document.querySelector('.hero__body .resource__image.image-fit.js-image-fit a').innerHTML = "<img src='https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G-19/1500x750-thank-you.png'>";
        
        //Change Hero CTA -"Blog Post" to "Featured"
        document.querySelector('.hero-resource .hero__body .resource__tags a').innerHTML="Featured";
        
        //Add text under resource title
        document.querySelector(".hero__body .resource__title").insertAdjacentHTML("afterend", "<p>With the integration of technology into every area of our lives, reaching out to say thank you can be easier than ever before. To truly appreciate donors and show them some love, we need to move beyond the transactional thank-you to relational gratitude.</p>");

        //Change more resources section title text 
        document.querySelector(".section-filter:nth-of-type(2) .section__head .section__title h3").innerText = "Explore All Resources";

        //Adding new trending resources section
        document.querySelector(".hero-resource .shell .hero__body").insertAdjacentHTML("beforeend", bmTrendingResources);
        
        //ADD Latest resources section
        document.querySelector(".section-filter.section-filter--tabs").insertAdjacentHTML("beforeend", bmLatestResources);
      }

    }

    /* Initialise variation */
    waitForElement(".hero__body .resource", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
