(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "";
    var $;
    /* all Pure helper functions */

    function waitForElement(selector, trigger, delayInterval, delayTimeout) {
      var interval = setInterval(function () {
        if (document && document.querySelector(selector) && document.querySelectorAll(selector).length > 0) {
          clearInterval(interval);
          trigger();
        }
      }, delayInterval);
      setTimeout(function () {
        clearInterval(interval);
      }, delayTimeout);
    }

    function live(selector, event, callback, context) {
      /****Helper Functions****/
      // helper for enabling IE 8 event bindings
      function addEvent(el, type, handler) {
        if (el.attachEvent) el.attachEvent("on" + type, handler);
        else el.addEventListener(type, handler);
      }
      // matches polyfill
      this.Element &&
        (function (ElementPrototype) {
          ElementPrototype.matches =
            ElementPrototype.matches ||
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
        })(Element.prototype);
      // live binding helper using matchesSelector
      function live(selector, event, callback, context) {
        addEvent(context || document, event, function (e) {
          var found,
            el = e.target || e.srcElement;
          while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
          if (found) callback.call(el, e);
        });
      }
      live(selector, event, callback, context);
    }

    function waitForjQuery(trigger) {
      var interval = setInterval(function () {
        if (window.jQuery !== undefined) {
          clearInterval(interval);
          trigger(window.jQuery);
        }
      }, 50);
      setTimeout(function () {
        clearInterval(interval);
      }, 15000);
    }

    /* Variation functions */

    var fe_section =
      "" +
      // testimonials
      '  <section class="section-testimonials">' +
      '      <div class="section__bg">' +
      '          <img src="https://www.networkforgood.com/wp-content/themes/networkforgood/resources/images/temp/bg-5.svg" alt="" title="">' +
      "      </div>" +
      '      <div class="shell">' +
      '          <div class="section__content">' +
      '              <div class="testimonials">' +
      '                      <h3 class="testimonials_heading">Nonprofit leaders and fundraisers like you rely on Network for Good to grow their good.</h3>' +
      '                  <div class="testimonials__items">' +
      '                      <div class="testimonials__item">' +
      '                          <div class="testimonial">' +
      '                              <div class="testimonial__image image-fit js-image-fit">' +
      '                                  <img src="https://www.networkforgood.com/wp-content/uploads/2021/04/okc-metro-150x150.jpeg" alt="" title="">' +
      "                              </div>" +
      '                              <div class="testimonial__body">' +
      '                                  <div class="testimonial__content">' +
      "                                      <p>“It’s really changed our lives for the better. It’s a dream to use the system and I’ve been recommending Network for Good like crazy to all of my nonprofit friends.”</p>" +
      "                                  </div>" +
      '                                  <div class="testimonial__title">' +
      "                                      <p>" +
      "                                          <strong>Jennifer Francis</strong> Executive Director<br> OKC Metro Alliance </p>" +
      "                                  </div>" +
      "                              </div>" +
      "                          </div>" +
      "                      </div>" +
      '                      <div class="testimonials__item">' +
      '                          <div class="testimonial">' +
      '                              <div class="testimonial__image image-fit js-image-fit">' +
      '                                  <img src="https://www.networkforgood.com/wp-content/uploads/2021/04/ntc-foundation-150x150.jpg" alt="" title="">' +
      "                              </div>" +
      '                              <div class="testimonial__body">' +
      '                                  <div class="testimonial__content">' +
      '                                      <div class="testimonial-content">' +
      "                                          <p>“We’ve been using Network for Good’s fundraising software since 2017, and it’s been great. They quickly helped us import our donor data, the support team is responsive and helpful whenever we need them, and the" +
      "                                              software helps us stay organized and on target with our fundraising efforts. 10/10!”</p>" +
      "                                      </div>" +
      "                                  </div>" +
      '                                  <div class="testimonial__title">' +
      "                                      <p>" +
      "                                          <strong>Alan Ziter</strong> Executive Director<br> NTC Foundation </p>" +
      "                                  </div>" +
      "                              </div>" +
      "                          </div>" +
      "                      </div>" +
      '                      <div class="testimonials__item">' +
      '                          <div class="testimonial">' +
      '                              <div class="testimonial__image image-fit js-image-fit">' +
      '                                  <img src="https://www.networkforgood.com/wp-content/uploads/2021/04/jamie-150x150.jpg" alt="" title="">' +
      "                              </div>" +
      '                              <div class="testimonial__body">' +
      '                                  <div class="testimonial__content">' +
      "                                      <p>“What is not to LOVE! Data migration is excellent! I have ALWAYS received help and/or answers to questions right away. If the person that I spoke with did not know the answer, they were always willing to have someone" +
      "                                          else get with our office to answer the questions.”</p>" +
      "                                  </div>" +
      '                                  <div class="testimonial__title">' +
      "                                      <p>" +
      "                                          <strong>Jamie Brown</strong> Chaplain & Administrator<br> Madison County Sheriff’s Department Chaplaincy Program </p>" +
      "                                  </div>" +
      "                              </div>" +
      "                          </div>" +
      "                      </div>" +
      "                  </div>" +
      "              </div>" +
      "          </div>" +
      "      </div>" +
      "  </section>" +
      // help you section
      '  <section class="section-advantages">' +
      '      <header class="section__head">' +
      '          <div class="shell" >' +
      "              <h2>" +
      "                  We'll help you... </h2>" +
      "          </div>" +
      "      </header>" +
      '      <div class="section__content" >' +
      '          <div class="advantages" >' +
      '              <div class="advantages__items" >' +
      '                  <div class="advantages__item" >' +
      '                      <div class="advantage" >' +
      '                          <div class="shell" >' +
      '                              <div class="advantage__inner" >' +
      '                                  <div class="advantage__image" >' +
      '                                      <div class="advantage__image-bg" style="background-image: url(https://www.networkforgood.com/wp-content/themes/networkforgood/resources/images/temp/bg-2.svg)" ></div>' +
      '                                      <div class="advantage__image-content" >' +
      '                                          <img width="1024" height="576" src="https://www.networkforgood.com/wp-content/uploads/2021/03/NFG-home-1-relationships-1-1024x576.png" class="attachment-large size-large" alt="" loading="lazy" srcset="https://www.networkforgood.com/wp-content/uploads/2021/03/NFG-home-1-relationships-1-1024x576.png 1024w, https://www.networkforgood.com/wp-content/uploads/2021/03/NFG-home-1-relationships-1-300x169.png 300w, https://www.networkforgood.com/wp-content/uploads/2021/03/NFG-home-1-relationships-1-768x432.png 768w, https://www.networkforgood.com/wp-content/uploads/2021/03/NFG-home-1-relationships-1-1536x864.png 1536w, https://www.networkforgood.com/wp-content/uploads/2021/03/NFG-home-1-relationships-1-1200x675.png 1200w, https://www.networkforgood.com/wp-content/uploads/2021/03/NFG-home-1-relationships-1.png 1920w"' +
      '                                              sizes="(max-width: 1024px) 100vw, 1024px"> </div>' +
      "                                  </div>" +
      '                                  <div class="advantage__body" >' +
      '                                      <div class="advantage__body-inner" >' +
      '                                          <div class="advantage__content richtext-entry" >' +
      "                                              <h2>Manage all your fundraising activities in one place.</h2>" +
      "                                              <p>Stop paying for multiple tools and storing important donor data in spreadsheets or clunky databases. Network for Good puts everything you need to fundraise at your fingertips.</p>" +
      "                                          </div>" +
      '                                          <div class="advantage__actions" >' +
      '                                              <a href="https://networkforgood.com/all-in-one-platform/" class="btn-arrow">See the All-In-One Software</a>' +
      "                                          </div>" +
      '                                          <div class="advantage__review" >' +
      '                                              <div class="review" >' +
      '                                                  <div class="review__content" >' +
      "                                                      <p>“We chose Network for Good because it suits our needs the best. Other platforms had too many functions and options that we’d never use. Plus, I like having our fundraising platform and database come" +
      "                                                          from one source.”</p>" +
      "                                                  </div>" +
      '                                                  <div class="review__author" >' +
      '                                                      <div class="review__image" style="background-image: url(https://www.networkforgood.com/wp-content/uploads/2021/02/person-3-150x150.png)" ></div>' +
      '                                                      <div class="review__title" >' +
      "                                                          <p>" +
      "                                                              <strong>" +
      "  Emily Dean </strong>" +
      "                                                              <em>" +
      "  Managing Director<br>" +
      "  Atlas Preparatory School </em>" +
      "                                                          </p>" +
      "                                                      </div>" +
      "                                                  </div>" +
      "                                              </div>" +
      "                                          </div>" +
      "                                      </div>" +
      "                                  </div>" +
      "                              </div>" +
      "                          </div>" +
      "                      </div>" +
      "                  </div>" +
      '                  <div class="advantages__item" >' +
      '                      <div class="advantage advantage--reverse" >' +
      '                          <div class="shell" >' +
      '                              <div class="advantage__inner" >' +
      '                                  <div class="advantage__image" >' +
      '                                      <div class="advantage__image-bg" style="background-image: url(https://www.networkforgood.com/wp-content/themes/networkforgood/resources/images/temp/bg-3.svg)" ></div>' +
      '                                      <div class="advantage__image-content" >' +
      '                                          <img width="1024" height="1024" src="https://www.networkforgood.com/wp-content/uploads/2021/03/NFG-home-3-message_3_1500x1500-1024x1024.png" class="attachment-large size-large" alt="" loading="lazy" srcset="https://www.networkforgood.com/wp-content/uploads/2021/03/NFG-home-3-message_3_1500x1500-1024x1024.png 1024w, https://www.networkforgood.com/wp-content/uploads/2021/03/NFG-home-3-message_3_1500x1500-300x300.png 300w, https://www.networkforgood.com/wp-content/uploads/2021/03/NFG-home-3-message_3_1500x1500-150x150.png 150w, https://www.networkforgood.com/wp-content/uploads/2021/03/NFG-home-3-message_3_1500x1500-768x768.png 768w, https://www.networkforgood.com/wp-content/uploads/2021/03/NFG-home-3-message_3_1500x1500-1030x1030.png 1030w, https://www.networkforgood.com/wp-content/uploads/2021/03/NFG-home-3-message_3_1500x1500.png 1500w"' +
      '                                              sizes="(max-width: 1024px) 100vw, 1024px"> </div>' +
      "                                  </div>" +
      '                                  <div class="advantage__body" >' +
      '                                      <div class="advantage__body-inner" >' +
      '                                          <div class="advantage__content richtext-entry" >' +
      "                                              <h2>Build better relationships with your donors.</h2>" +
      "                                              <p>Simple ways to connect with your donors through email, text message, personal videos, and direct mail.</p>" +
      "                                          </div>" +
      '                                          <div class="advantage__actions" >' +
      '                                              <a href="https://networkforgood.com/all-in-one-platform/communication/" class="btn-arrow">Explore Communication Tools</a>' +
      "                                          </div>" +
      '                                          <div class="advantage__review" >' +
      '                                              <div class="review" >' +
      '                                                  <div class="review__content" >' +
      "                                                      <p>“We LOVE the video messaging. The feedback we get is amazing… we’ve had people text us after they received their video to tell us that they were in tears over their personal messages. The system is user-friendly" +
      "                                                          and you guys have just been great. Thank you so much for everything.”</p>" +
      "                                                  </div>" +
      '                                                  <div class="review__author" >' +
      '                                                      <div class="review__image" style="background-image: url(https://www.networkforgood.com/wp-content/uploads/2021/04/2137-936198-ed91d9d7_f-150x150.jpg)" ></div>' +
      '                                                      <div class="review__title" >' +
      "                                                          <p>" +
      "                                                              <strong>" +
      "  Jessica Chapman, CFRE </strong>" +
      "                                                              <em>" +
      "  Director of Development<br>" +
      "  Child Abuse Prevention Association </em>" +
      "                                                          </p>" +
      "                                                      </div>" +
      "                                                  </div>" +
      "                                              </div>" +
      "                                          </div>" +
      "                                      </div>" +
      "                                  </div>" +
      "                              </div>" +
      "                          </div>" +
      "                      </div>" +
      "                  </div>" +
      '                  <div class="advantages__item" >' +
      '                      <div class="advantage" >' +
      '                          <div class="shell" >' +
      '                              <div class="advantage__inner" >' +
      '                                  <div class="advantage__image" >' +
      '                                      <div class="advantage__image-bg" style="background-image: url(https://www.networkforgood.com/wp-content/themes/networkforgood/resources/images/temp/bg-4.svg)" ></div>' +
      '                                      <div class="advantage__image-content" >' +
      '                                          <img width="1024" height="1024" src="https://www.networkforgood.com/wp-content/uploads/2021/03/NFG-home-2-ticketing_3_1500x1500-1024x1024.png" class="attachment-large size-large" alt="" loading="lazy" srcset="https://www.networkforgood.com/wp-content/uploads/2021/03/NFG-home-2-ticketing_3_1500x1500-1024x1024.png 1024w, https://www.networkforgood.com/wp-content/uploads/2021/03/NFG-home-2-ticketing_3_1500x1500-300x300.png 300w, https://www.networkforgood.com/wp-content/uploads/2021/03/NFG-home-2-ticketing_3_1500x1500-150x150.png 150w, https://www.networkforgood.com/wp-content/uploads/2021/03/NFG-home-2-ticketing_3_1500x1500-768x768.png 768w, https://www.networkforgood.com/wp-content/uploads/2021/03/NFG-home-2-ticketing_3_1500x1500-1030x1030.png 1030w, https://www.networkforgood.com/wp-content/uploads/2021/03/NFG-home-2-ticketing_3_1500x1500.png 1500w"' +
      '                                              sizes="(max-width: 1024px) 100vw, 1024px"> </div>' +
      "                                  </div>" +
      '                                  <div class="advantage__body" >' +
      '                                      <div class="advantage__body-inner" >' +
      '                                          <div class="advantage__content richtext-entry" >' +
      "                                              <h2>Become a more confident fundraiser.</h2>" +
      "                                              <p>We know fundraising can be complicated, so we’re here to help. Create a beautiful, branded fundraising page in minutes using our guided tool and expert recommendations. Plus, free data migration and onboarding" +
      "                                                  support is always included.</p>" +
      "                                          </div>" +
      '                                          <div class="advantage__actions" >' +
      '                                              <a href="https://networkforgood.com/all-in-one-platform/online-fundraising/" class="btn-arrow">Learn about Fundraising Pages</a>' +
      "                                          </div>" +
      '                                          <div class="advantage__review" >' +
      '                                              <div class="review" >' +
      '                                                  <div class="review__content" >' +
      "                                                      <p>“What is not to LOVE! Data migration is excellent! I have ALWAYS received help and/or answers to questions right away. If the person that I spoke with did not know the answer, they were always willing" +
      "                                                          to have someone else get with our office to answer the questions.”</p>" +
      "                                                  </div>" +
      '                                                  <div class="review__author" >' +
      '                                                      <div class="review__image" style="background-image: url(https://www.networkforgood.com/wp-content/uploads/2021/04/jamie-150x150.jpg)" ></div>' +
      '                                                      <div class="review__title" >' +
      "                                                          <p>" +
      "                                                              <strong>" +
      "  Jamie Brown </strong>" +
      "                                                              <em>" +
      "  Chaplain & Administrator<br>" +
      "  Madison County Sheriff’s Department Chaplaincy Program </em>" +
      "                                                          </p>" +
      "                                                      </div>" +
      "                                                  </div>" +
      "                                              </div>" +
      "                                          </div>" +
      "                                      </div>" +
      "                                  </div>" +
      "                              </div>" +
      "                          </div>" +
      "                      </div>" +
      "                  </div>" +
      '                  <div class="advantages__item" >' +
      '                      <div class="advantage advantage--reverse" >' +
      '                          <div class="shell" >' +
      '                              <div class="advantage__inner" >' +
      '                                  <div class="advantage__image" >' +
      '                                      <div class="advantage__image-bg" style="background-image: url(https://www.networkforgood.com/wp-content/themes/networkforgood/resources/images/temp/bg-2.svg)" ></div>' +
      '                                      <div class="advantage__image-content" >' +
      '                                          <img width="491" height="450" src="https://www.networkforgood.com/wp-content/uploads/2021/02/advantage-3.png" class="attachment-large size-large" alt="" loading="lazy" srcset="https://www.networkforgood.com/wp-content/uploads/2021/02/advantage-3.png 491w, https://www.networkforgood.com/wp-content/uploads/2021/02/advantage-3-300x275.png 300w"' +
      '                                              sizes="(max-width: 491px) 100vw, 491px"> </div>' +
      "                                  </div>" +
      '                                  <div class="advantage__body" >' +
      '                                      <div class="advantage__body-inner" >' +
      '                                          <div class="advantage__content richtext-entry" >' +
      "                                              <h2>Collaborate with your team.</h2>" +
      "                                              <p>Share tasks and set reminders to improve collaboration with your team, volunteers, and board.</p>" +
      "                                          </div>" +
      '                                          <div class="advantage__actions" >' +
      '                                              <a href="https://networkforgood.com/all-in-one-platform/measurement-and-tracking/" class="btn-arrow">Start Working Better as a Team</a>' +
      "                                          </div>" +
      '                                          <div class="advantage__review" >' +
      '                                              <div class="review" >' +
      '                                                  <div class="review__content" >' +
      "                                                      <p>“We’re really happy with Network for Good. After we’ve had it, I don’t know how we could survive without it. My life is so much easier.”</p>" +
      "                                                  </div>" +
      '                                                  <div class="review__author" >' +
      '                                                      <div class="review__image" style="background-image: url(https://www.networkforgood.com/wp-content/uploads/2021/04/Scan0001_EDIT1_0002-150x150.jpeg)" ></div>' +
      '                                                      <div class="review__title" >' +
      "                                                          <p>" +
      "                                                              <strong>" +
      "  Kyle Yepsen </strong>" +
      "                                                              <em>" +
      "  Development Director<br>" +
      "  CreatiVets </em>" +
      "                                                          </p>" +
      "                                                      </div>" +
      "                                                  </div>" +
      "                                              </div>" +
      "                                          </div>" +
      "                                      </div>" +
      "                                  </div>" +
      "                              </div>" +
      "                          </div>" +
      "                      </div>" +
      "                  </div>" +
      "              </div>" +
      "          </div>" +
      "      </div>" +
      "  </section>" +
      // logo section
      '  <section class="section-partners">' +
      '      <div class="shell" >' +
      '          <div class="section__title" >' +
      "              <h3>Trusted by growing nonprofits with 100 to 20,000 donors.</h3>" +
      "          </div>" +
      '          <div class="section__content" >' +
      '              <ul class="list-partners">' +
      "                  <li>" +
      '                      <a href="https://networkforgood.com/resource/creativets-taps-virtual-events-to-grow-individual-donors/">' +
      '                          <img width="300" height="56" data-cfsrc="https://www.networkforgood.com/wp-content/uploads/2021/04/creativets-300x56.png" class="attachment-medium size-medium" alt="CreatiVets" loading="lazy" srcset="https://www.networkforgood.com/wp-content/uploads/2021/04/creativets-300x56.png 300w, https://www.networkforgood.com/wp-content/uploads/2021/04/creativets.png 384w"' +
      '                              sizes="(max-width: 300px) 100vw, 300px" src="https://www.networkforgood.com/wp-content/uploads/2021/04/creativets-300x56.png"> </a>' +
      "                  </li>" +
      "                  <li>" +
      '                      <a href="https://networkforgood.com/resource/achieve-tahoe-made-the-switch-from-salesforce/">' +
      '                          <img width="186" height="74" data-cfsrc="https://www.networkforgood.com/wp-content/uploads/2021/04/achieve-tahoe-logo-v3.png" class="attachment-medium size-medium" alt="Achieve Tahoe" loading="lazy" src="https://www.networkforgood.com/wp-content/uploads/2021/04/achieve-tahoe-logo-v3.png">                        </a>' +
      "                  </li>" +
      "                  <li>" +
      '                      <a href="https://networkforgood.com/resource/rise-for-youth-raises-3x-their-goal-by-creating-a-virtual-march/">' +
      '                          <img width="227" height="74" data-cfsrc="https://www.networkforgood.com/wp-content/uploads/2021/04/RISE-for-youth-logo-1.png" class="attachment-medium size-medium" alt="RISE for Youth" loading="lazy" src="https://www.networkforgood.com/wp-content/uploads/2021/04/RISE-for-youth-logo-1.png">                        </a>' +
      "                  </li>" +
      "                  <li>" +
      '                      <a href="https://networkforgood.com/resource/the-jacksonville-humane-society-raises-over-30000-with-only-a-2000-investment/">' +
      '                          <img width="195" height="81" data-cfsrc="https://www.networkforgood.com/wp-content/uploads/2021/04/Jacksonville-Humane-Society-Logo.png" class="attachment-medium size-medium" alt="Jacksonville Humane Society" loading="lazy" src="https://www.networkforgood.com/wp-content/uploads/2021/04/Jacksonville-Humane-Society-Logo.png">                        </a>' +
      "                  </li>" +
      "              </ul>" +
      "          </div>" +
      '          <div class="fe_request_demo">' +
      '               <a class="fe_btn">' +
      "                  <span>Get Your Demo</span>" +
      "               </a>" +
      "          </div>" +
      "      </div>" +
      "  </section>" +
      // footer
      '  <div class="footer__bar" >' +
      '      <div class="shell" >' +
      '          <p>Network for Good. 1140 Connecticut Ave NW #700 Washington, DC 20036 © 2022. Network for Good. All rights reserved. <a href="https://www.networkforgood.com/privacy-policy/">Privacy Policy</a> <a href="https://www.networkforgood.com/legal/terms/">Terms & Conditions</a></p>' +
      "      </div>" +
      "  </div>";

    var fe_privacy =
      "" +
      '<div class="fe_privacy_wrapper">' +
      '     <p class="fe-privacy">' +
      '         <img src="https://www.networkforgood.com/wp-content/uploads/respect.svg">' +
      "         <span>We respect your privacy</span>" +
      "     </p>" +
      '     <p class="mktoHtmlText">' +
      '         By providing the above phone number, you consent to our <br><a href="https://www.networkforgood.com/about/terms/" target="_blank">call recording policy.</a>' +
      "     </p>" +
      "</div>";

    var fe_guarantee =
      "" +
      '<div class="fe-guarantee">' +
      '       <div class="money_icon">' +
      '             <img src="https://www.networkforgood.com/wp-content/uploads/2021/02/money-bill-wave.svg">' +
      "       </div>" +
      '       <div class="fe-guarantee__text">' +
      '             We guarantee you\'ll raise more in your first year or your money back.<em><a href="https://www.networkforgood.com/wp-content/uploads/2020/08/DMS-Performance-Guarantee-April-2020.pdf" target="_blank" rel="noopener"> Terms and conditions apply.</a></em>' +
      "       </div>" +
      "</div>";

    var fe_hero_logo =
      "" +
      '<div class="fe_hero_logo">' +
      '       <img src="https://d9hhrg4mnvzow.cloudfront.net/www.networkforgood.com/network-for-good-request-a-demo/7a180e36-small-stripe-bottom-left-3x_101j02d000000000000028.png">' +
      '       <div class="fe_logo">' +
      '             <img src="https://www.networkforgood.com/wp-content/uploads/Capterra-Shortlist1-2022.png">' +
      '             <img src="https://d27c6j8064skg9.cloudfront.net/FE/N4G/20/SpringBest-Usability.png">' +
      '             <img src="https://d27c6j8064skg9.cloudfront.net/FE/N4G/20/Source-Forge-final.png">' +
      "       </div>" +
      '       <div class="fe_hero_description">' +
      '             <p class="fe_review">“Network for Good offers incredible help and support. It even prompts me when it thinks I can do something that will support my fundraising efforts.“</p>' +
      '             <p class="fe_customer">Susan Hepler <br> Massachusetts Hospital School Foundation</p>' +
      "       </div>" +
      "</div>";

    var feEmail =
      "" +
      '  <div class="fe-tooltip-N4G-20">' +
      '      <img class="fe-tooltip-img-18" src="https://www.networkforgood.com/wp-content/uploads/Tooltip.png">' +
      '      <span class="fe-show-txt" id="fe-show-email">' +
      "          <p>We'll send you a demo confirmation.</p>" +
      "      </span>" +
      "  </div>";

    var fePhone =
      "" +
      '  <div class="fe-tooltip-N4G-20">' +
      '      <img class="fe-tooltip-img-18" src="https://www.networkforgood.com/wp-content/uploads/Tooltip.png">' +
      '      <span class="fe-show-txt" id="fe-show-phone">' +
      "          <p>In case we need to contact you about your demo.</p>" +
      "      </span>" +
      "  </div>";

    /* Variation Init */
    function init() {
      /* start your code here */
      document.querySelector("body").classList.add("fe_n4g20");

      onLoadMktoForms2(
        function () {
          MktoForms2.whenReady(function (form) {
            document.querySelector(".mktoForm input#FirstName").setAttribute("placeholder", "First Name");
            document.querySelector(".mktoForm input#LastName").setAttribute("placeholder", "Last Name");
            document.querySelector(".mktoForm input#Company").setAttribute("placeholder", "Organization Name");
            document.querySelector(".mktoForm input#Email").setAttribute("placeholder", "Work Email");
            document.querySelector(".mktoForm input#Phone").setAttribute("placeholder", "Work Phone Number");
            document.querySelector(".mktoForm .mktoFormRow .mktoHtmlText").closest(".mktoFormRow").style.display = "none";
            document.querySelector(".mktoForm .mktoButtonRow").insertAdjacentHTML("beforebegin", fe_privacy);
            // document.querySelector('.mktoForm .mktoButtonWrap.mktoShadow .mktoButton').innerHTML = '<span>Request Demo</span>';

            document.querySelector(".mktoForm .mktoButtonWrap.mktoShadow .mktoButton").insertAdjacentHTML("afterend", '<a class="fe_btn"><span>Request Demo</span></a>');

            document.querySelector(".mktoForm input#Email").insertAdjacentHTML("beforebegin", feEmail);
            document.querySelector(".mktoForm input#Phone").insertAdjacentHTML("beforebegin", fePhone);

            form.onSuccess(function (values, followUpUrl) {
              document.querySelector(".mktoForm .mktoButtonWrap.mktoShadow .fe_btn").innerHTML = "<span>Please Wait</span>";
            });
          });
        },
        50,
        15000
      );

      live(".mktoForm .mktoButtonWrap.mktoShadow .fe_btn", "click", function () {
        document.querySelector(".mktoForm .mktoButtonWrap.mktoShadow .mktoButton").click();
      });

      live(".fe-tooltip-N4G-20", "click", function () {
        document.querySelector(".fe-Tshow") && document.querySelector(".fe-Tshow").classList.remove("fe-Tshow");
        document.querySelector("body").classList.toggle("fe-tooltip-bm_show");
        this.parentElement.classList.toggle("fe-Tshow");
      });

      live(".fe-Overlay-N4G-20", "click", function () {
        document.querySelector("body").classList.remove("fe-tooltip-bm_show");
      });
    }

    function init2() {
      document.querySelector("body").insertAdjacentHTML("beforeend", fe_section);
      document.querySelector("body").insertAdjacentHTML("beforeend", '<div class="fe-Overlay-N4G-20"></div>');

      document.querySelector("#lp-pom-text-17").insertAdjacentHTML("beforeend", fe_guarantee);
      document.querySelector("#lp-pom-text-20").insertAdjacentHTML("beforeend", fe_hero_logo);

      if (window.screen.width > 767) {
        live(".fe_request_demo .fe_btn", "click", function () {
          document.querySelector("#lp-pom-block-16").scrollIntoView({ behavior: "smooth", block: "start" });
          trackGAEvent("FunnelEnvy", "GA-Clicks", "bottom CTA clicks");
        });
      } else {
        live(".fe_request_demo .fe_btn", "click", function () {
          document.querySelector("#lp-pom-box-36").scrollIntoView({ behavior: "smooth", block: "start" });
          trackGAEvent("FunnelEnvy", "GA-Clicks", "bottom CTA clicks");
        });
      }

      window.addEventListener("resize", function () {
        if (window.screen.width > 767) {
          live(".fe_request_demo .fe_btn", "click", function () {
            document.querySelector("#lp-pom-block-16").scrollIntoView({ behavior: "smooth", block: "start" });
            trackGAEvent("FunnelEnvy", "GA-Clicks", "bottom CTA clicks");
          });
        } else {
          live(".fe_request_demo .fe_btn", "click", function () {
            document.querySelector("#lp-pom-box-36").scrollIntoView({ behavior: "smooth", block: "start" });
            trackGAEvent("FunnelEnvy", "GA-Clicks", "bottom CTA clicks");
          });
        }
      });

      // change the logo for mobile
      document.querySelector("#lp-pom-image-13 .lp-pom-image-container").insertAdjacentHTML("beforeend", '<a class="fe_mobileLogo" href="https://www.networkforgood.com/"></a>');
      document.querySelector("#lp-pom-button-93 .label").insertAdjacentHTML("afterend", '<span class="fe_mobile_phone">888.284.7978</span>');
    }

    function onLoadMktoForms2(trigger, delayInterval, delayTimeout) {
      var intervalForMktoForms2 = setInterval(function () {
        if (typeof window.MktoForms2 != "undefined") {
          clearInterval(intervalForMktoForms2);
          trigger();
        }
      }, delayInterval);
      setTimeout(function () {
        clearInterval(intervalForMktoForms2);
      }, delayTimeout);
    }

    function trackGAEvent(eventCategory, eventAction, eventLabel) {
      if ("ga" in window) {
        ga.getAll()[0].send("event", {
          eventCategory: eventCategory,
          eventAction: eventAction,
          eventLabel: eventLabel,
        });
      }
    }

    /* Initialize variation */
    waitForElement("#lp-pom-text-20", init2, 100, 25000);
    waitForElement("form.mktoForm", init, 100, 25000);
    waitForjQuery(function () {
      $ = window.jQuery;
      waitForElement(
        ".mktoForm .mktoFieldWrap input[placeholder]",
        function () {
          setTimeout(function () {});
          $(".mktoForm .mktoFieldWrap input[placeholder]").removeAttr("placeholder");
          $("body").delegate(".mktoForm .mktoFieldWrap input", "focus", function () {
            $(this).parents(".mktoFieldWrap").addClass("placeholderStage");
          });
          $("body").delegate(".mktoForm .mktoFieldWrap input", "keyup, focusout, blur", function () {
            if ($(this).val()) {
              $(this).parents(".mktoFieldWrap").addClass("placeholderStage");
            } else {
              $(this).parents(".mktoFieldWrap").removeClass("placeholderStage");
            }
          });
        },
        50,
        15000
      );
    });
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
