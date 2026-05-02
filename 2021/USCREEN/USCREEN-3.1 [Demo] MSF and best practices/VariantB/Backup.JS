(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "USCREEN-3: [Demo] MSF and best practices";

    /* helper library */
    var _$;
    !(function (factory) {
      _$ = factory();
    })(function () {
      var bm = function (s) {
        if (typeof s === "string") {
          this.value = Array.prototype.slice.call(document.querySelectorAll(s));
        }
        if (typeof s === "object") {
          this.value = [s];
        }
      };
      bm.prototype = {
        eq: function (n) {
          this.value = [this.value[n]];
          return this;
        },
        each: function (fn) {
          [].forEach.call(this.value, fn);
          return this;
        },
        log: function () {
          console && console.log(this);
        },
        append: function (v) {
          return this.each(function (i) {
            i.insertAdjacentHTML('beforeEnd', v);
          });
        },
        live: function(selector, event, callback, context) {
        /****Helper Functions****/
        // helper for enabling IE 8 event bindings
        function addEvent(el, type, handler) {
          if (el.attachEvent) el.attachEvent("on" + type, handler);
          else el.addEventListener(type, handler);
        }
        // matches polyfill
        this && this.Element &&
          (function(ElementPrototype) {
          ElementPrototype.matches =
            ElementPrototype.matches ||
            ElementPrototype.matchesSelector ||
            ElementPrototype.webkitMatchesSelector ||
            ElementPrototype.msMatchesSelector ||
            function(selector) {
            var node = this,
              nodes = (
              node.parentNode || node.document
              ).querySelectorAll(selector),
              i = -1;
            while (nodes[++i] && nodes[i] != node);
            return !!nodes[i];
            };
          })(Element.prototype);
        // live binding helper using matchesSelector
        function live(selector, event, callback, context) {
          addEvent(context || document, event, function(e) {
          var found,
            el = e.target || e.srcElement;
          while (
            el &&
            el.matches &&
            el !== context &&
            !(found = el.matches(selector))
          )
            el = el.parentElement;
          if (found) callback.call(el, e);
          });
        }
        live(selector, event, callback, context);
        },
        waitForElement: function (
          selector,
          trigger,
          delayInterval,
          delayTimeout
        ) {
          var interval = setInterval(function () {
            if (_$(selector).value.length) {
              clearInterval(interval);
              trigger();
            }
          }, delayInterval);
          setTimeout(function () {
            clearInterval(interval);
          }, delayTimeout);
        },
      };
      return function (selector) {
        return new bm(selector);
      };
    });


      function insertHtml(selector, content, position) {
      var el = document.querySelector(selector);
      if (!position) {
        position = "afterend";
      }
      if (el && content) {
        el.insertAdjacentHTML(position, content);
      }
      }

      function addClass(el, cls) {
      var el = document.querySelector(el);
      if (el) {
        el.classList.add(cls);
      }
      }

      function removeClass(el, cls) {
      var el = document.querySelector(el);
      if (el) {
        el.classList.contains(cls) && el.classList.remove(cls);
      }
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

      function decorateUrl(urlString) {	
        var ga = window[window['GoogleAnalyticsObject']];	
        var tracker;	
        if (ga && typeof ga.getAll === 'function') {	
          tracker = ga.getAll()[0]; // Uses the first tracker created on the page	
          urlString = (new window.gaplugins.Linker(tracker)).decorate(urlString);	
        }	
        return urlString;	
      }
    
      var feHeader = '' + 
      '<h1 class="hero-main-heading fe03-header-mobile">' + 
      '  See how you can <br><span class="highlited-heading">earn recurring revenue</span> <br>from your video content' + 
      '</h1>' + 
      '              <div class="fe03-quote-mobile"> <span class="fe03-quotedots"><img src="https://d27c6j8064skg9.cloudfront.net/FE/USCREEN/3.1/Bitmap.svg"></span> <span>\"I 10x\'ed my business when I launched my membership site. It changed the game. Uscreen had the things that I wanted and needed.\"</span> <span></span></div>'+ 
      '              <p class="fe03-quote-footer-mobile">Sarah Beth</p>'+ 
      '              <p class="fe03-quote-footer-mobile fe03-quote-footer-mobile1">Founder of <span>SarahBethYoga</span></p>'+ 
      '        <div class="fe03-quote-footer-image"><img src="https://d27c6j8064skg9.cloudfront.net/FE/USCREEN/06/bg-image.png" alt=""></div>'+
      '';
   
      var feFooter = '' + 
      '<div class="fe03-footer fe03-footer-mobile">' + 
      '  <div class="fe03-card">' + 
      '    <h1>$120M+</h1>' + 
      '    <p>earned by creators each year</p>' + 
      '  </div>' + 
      '  <div class="fe03-card">' + 
      '    <h1>25,000+</h1>' + 
      '    <p>creators on Uscreen</p>' + 
      '  </div>' + 
      '  <div class="fe03-card">' + 
      '    <h1>8.5M+</h1>' + 
      '    <p>subscribers from 95 countries</p>' + 
      '  </div>' + 
      '</div>' + 
      '' + 
      '';
    var heroHtml = '' +
    '  <div class="fe03-hero-container-test-6 container">'+ 
    '      <div class="wp-block-columns margin-bottom-0 justify-space-between has-bunker-color has-text-color">'+ 
    '          <div class="wp-block-column margin-bottom-0 padding-top-7" style="flex-basis: 40%;">'+ 
    '              <h1 class="hero-main-heading"> See how you can <span class="highlited-heading">earn recurring revenue</span> from your video content </h1>'+ 
    '              <div class="fe03-hero-list">'+ 
    '                  <ol>'+ 
    '                      <li>Have all your questions answered by our video monetization experts.</li>'+ 
    '                      <li>Get an exclusive introduction to the platform and its features.</li>'+ 
    '                      <li>Explore growth opportunities unique for your business.</li>'+ 
    // '                      <li>Painless migration, set-up and ongoing support from a dedicated business coach</li>'+ 
    // '                      <li>Own your user data and payment stream</li>'+ 
    '                  </ol>'+ 
    '              </div>'+ 
    '  <div class="ready-to-scale">'+ 
'      <h1>Ready To Scale?</h1>'+ 
'      <p>Uscreen customers are already generating <br>over $100 million in revenue per year. <br>Join them.</p>'+ 
'      <div id="fe03-1-request-demo" class=""><span>Request 1-on-1 Demo</span></div>'+ 
'  </div>'+
    '              <div class="fe03-quote"> <span class="fe03-quotedots"><img src="https://d27c6j8064skg9.cloudfront.net/FE/USCREEN/3.1/Bitmap.svg"></span> <span>\"I 10x\'ed my business when I launched my membership site. It changed the game. Uscreen had the things that I wanted and needed.\"</span> <span></span></div>'+ 
    '              <p class="fe03-quote-footer">Sarah Beth</p>'+ 
    '              <p class="fe03-quote-footer">Founder of <span >SarahBethYoga</span></p>'+ 
    '          </div>'+ 
    '          <div class="fe03-form-container">'+ 
    '              <div class="fe03-form-wrapper">'+ 
    '                  <div class="fe03-form-step-header">'+ 
    '                      <div class="fe03-form-step-header-one">'+ 
    '                          <p>Schedule your free demo</p>'+ 
      '                          <p class="fe03-final-heading">Schedule your free demo</p>' + 
      '                          <p class="fe03-heading">Learn more about Uscreen</p>'+ 
    '                      </div>'+ 
    '                      <div class="fe03-form-step-header-two">'+ 
    '                          <div class="fe03-form-step-header-two-for-step-one"></div>'+ 
    '                          <div class="fe03-form-step-header-two-for-step-two"></div>'+ 
    '                          <div class="fe03-form-step-header-two-for-step-three"></div>'+ 
    '                          <div class="fe03-form-step-header-two-for-step-four"></div>'+ 
    '                      </div>'+ 
    '                  </div>'+ 
    '                  <div class="fe03-form-step-content-form">'+ 
    '                      <div class="fe03-form-main" data-value="what_describes_you">'+ 
    '                          <div class="fe03-form-step-content-for-step-one-header">'+ 
    '                              <div class="fe03-form-step-content-for-step-one-header-main">'+ 
    '                                  <p>Which of these best describes you?</p>'+ 
    '                              </div>'+ 
    '                              <div class="fe03-form-step-content-for-step-one-header-sub"></div>'+ 
    '                          </div>'+ 
    '                          <div class="fe03-form-step-content">'+ 
    '                              <div class="fe03-form-step-content-for-step-one-form-content-one fe03-button" data-button="1" data-GA4click="I\'m_already_using_a_membership">I\'m already using a Membership, Course, or<br> Mobile & TV App Platform</div>'+ 
    '                              <div class="fe03-form-step-content-for-step-one-form-content-two fe03-button" data-button="2" data-GA4click="I_operate_primarily_online">I operate primarily online (e.g. YouTube, Instagram, email newsletter) </div>'+ 
    '                              <div class="fe03-form-step-content-for-step-one-form-content-three fe03-button" data-button="3" data-GA4click="I\'m_an_offline_entrepreneur">I\'m an offline entrepreneur looking to expand online</div>'+ 
    '                              <div class="fe03-form-step-content-for-step-one-form-content-four fe03-button" data-button="4" data-GA4click="I\'m_an_existing_customer">I\'m an existing customer</div>'+ 
    '                          </div>'+ 
    '                          <div class="fe03-form-step-footer">'+ 
    '                              <div class="fe03-form-step-footer-next-step-1"> <span>Next Step</span> </div>'+ 
    '                          </div>'+ 
    '                      </div>'+ 
    '                      <div class="fe03-form-button-one fe03-card fe03-hide">'+ 
    '                          <div class="fe03-step-one-content1 fe03-hide" data-value="platform">'+ 
    '                              <div class="fe03-form-step-content-header">'+ 
    '                                  <div class="fe03-form-step-content-header-main">'+ 
    '                                      <p>What platform are you using today?</p>'+ 
    '                                  </div>'+ 
    '                                  <div class="fe03-form-step-header-sub">We provide an all-in-one platform. We\'ll help you consolidate your platforms in one place.</div>'+ 
    '                              </div>'+ 
    '                              <div class="fe03-form-step-content" dataform-value="S2B1">'+ 
    '                                  <div class="fe03-button" dataform-goalContent="Mobile_&_TV_Apps" data-GA4click="mobile_&_tv_apps_s2b1">Mobile & TV Apps - i.e. Vimeo OTT, VidApp</div>'+ 
    '                                  <div class="fe03-button" dataform-goalContent="Course" data-GA4click="course_s2b1">Course - i.e. Thinkific, Kajabi</div>'+ 
    '                                  <div class="fe03-button" dataform-goalContent="Membership" data-GA4click="membership_s2b1">Membership - i.e. Patreon, OnlyFans</div>'+ 
    '                                  <div class="fe03-button" dataform-goalContent="Community" data-GA4click="community_s2b1">Community - i.e. Mighty Networks, Facebook Groups, Discord</div>'+ 
    '                              </div>'+ 
    '                              <div class="fe03-form-step-footer">'+ 
    '                                  <div class="fe03-form-step-button fe03-next fe03-btn1-next-content-2"> <span>Next Step</span> </div>'+ 
    '                                  <div class="fe03-form-step-button fe03-back fe03-back-main"> <span>Back</span> </div>'+ 
    '                              </div>'+ 
    '                          </div>'+ 
    '  '+ 
    '  '+ 
    '                          <div class="fe03-step-one-content2 fe03-hide" data-value="interested_in">'+ 
    '                              <div class="fe03-form-step-content-header">'+ 
    '                                  <div class="fe03-form-step-content-header-main">'+ 
    '                                      <p class="fe-03-most">What feature are you most interested in?</p>'+ 
    '                                  </div>'+ 
    '                                  <div class="fe03-form-step-header-sub">This will help us customize your experience.</div>'+ 
    '                              </div>'+ 
    '                              <div class="fe03-form-step-content" dataform-value="S3B1">'+ 
    '                                  <div class="fe03-button" dataform-goalContent="Video_membership" data-GA4click="video_membership_s3b1">Video <br>memberships</div>'+ 
    '                                  <div class="fe03-button" dataform-goalContent="Mobile_&_TV_apps" data-GA4click="mobile_&_tv_apps_s3b1">Mobile & <br>TV apps</div>'+ 
    '                                  <div class="fe03-button" dataform-goalContent="Community" data-GA4click="community_s3b1">Community</div>'+ 
    '                                  <div class="fe03-button" dataform-goalContent="Live_streaming" data-GA4click="live_streaming_s3b1">Live streaming</div>'+ 
    '                                  <div class="fe03-button" dataform-goalContent="E-commerce_&_merch" data-GA4click="e-commerce_&_merch_s3b1">E-commerce <br>& merch</div>'+ 
    '                                  <div class="fe03-button" dataform-goalContent="Access_to_a_business_coach" data-GA4click="access_to_a_business_coach_s3b1">Access to a <br>business coach</div>'+ 
    '                              </div>'+ 
    '                              <div class="fe03-form-step-footer">'+ 
    '                                  <div class="fe03-form-step-button fe03-next-final fe03-btn1-next-content-2"> <span>Next Step</span> </div>'+ 
    '                                  <div class="fe03-form-step-button fe03-back"> <span>Back</span> </div>'+ 
    '                              </div>'+ 
    '                          </div>'+ 
    '                      </div>'+ 
    '  '+ 
    '  <div class="fe03-form-button-two fe03-card fe03-hide">'+ 
    '      <div class="fe03-step-one-content1 fe03-hide" data-value="audience_size">'+ 
    '          <div class="fe03-form-step-content-header">'+ 
    '              <div class="fe03-form-step-content-header-main">'+ 
    '                  <p>How large is your audience?</p>'+ 
    '              </div>'+ 
    '              <div class="fe03-form-step-header-sub">(i.e. on YouTube, Instagram, TikTok, newsletter)</div>'+ 
    '          </div>'+ 
    '          <div class="fe03-form-step-content fe03-social-audience" dataform-value="S2B2">'+ 
    '              <div class="fe03-button fe03-redirect fe03-newContent" dataform-goalContent="Less_than_10K" data-GA4click="less_than_10k_s2b2">Less than 10,000</div>'+ 
    '              <div class="fe03-button" value="11k-40k" dataform-goalContent="10K_to_50K" data-GA4click="10k_to_50k_s2b2">10,000 to 50,000</div>'+ 
    '              <div class="fe03-button" value="41k-100k" dataform-goalContent="50K_to_250K"  data-GA4click="50k_to_250k_s2b2">50,000 to 250,000</div>'+ 
    '              <div class="fe03-button" value="100k+" dataform-goalContent="Over_250K" data-GA4click="over_250k_s2b2">Over 250,000</div>'+ 
    '          </div>'+ 
    '          <div class="fe03-form-step-footer">'+ 
    '              <div class="fe03-form-step-button fe03-next fe03-btn1-next-content-2"> <span>Next Step</span> </div>'+ 
    '              <div class="fe03-form-step-button fe03-back fe03-back-main"> <span>Back</span> </div>'+ 
    '          </div>'+ 
    '      </div>'+ 
    '      <div class="fe03-step-one-content2 fe03-hide" data-value="money_method">'+ 
    '          <div class="fe03-form-step-content-header">'+ 
    '              <div class="fe03-form-step-content-header-main">'+ 
    '                  <p>How do you make money today?</p>'+ 
    '              </div>'+ 
    '              <div class="fe03-form-step-header-sub">This will help us customize your experience.</div>'+ 
    '          </div>'+ 
    '          <div class="fe03-form-step-content" dataform-value="S3B2">'+ 
    '              <div class="fe03-button" dataform-goalContent="Ads" data-GA4click="ads_s3b2">Ads & brand<br> sponsorships</div>'+ 
    '              <div class="fe03-button" dataform-goalContent="Subscription" data-GA4click="subscription_s3b2">Subscription <br>(membership or community)</div>'+ 
    '              <div class="fe03-button" dataform-goalContent="Courses" data-GA4click="courses_s3b2">Courses</div>'+ 
    '              <div class="fe03-button" dataform-goalContent="Coaching" data-GA4click="coaching_s3b2">Coaching</div>'+ 
    '              <div class="fe03-button" dataform-goalContent="E-commerce" data-GA4click="e-commerce_s3b2">E-commerce & <br>merchandise</div>'+ 
    '              <div class="fe03-button" dataform-goalContent="I\'m_not_monetizing" data-GA4click="i\'m_not_monetizing_s3b2">I\'m not monetizing <br>my audience yet</div>'+ 
    '          </div>'+ 
    '          <div class="fe03-form-step-footer">'+ 
    '              <div class="fe03-form-step-button fe03-next-final fe03-btn1-next-content-2"> <span>Next Step</span> </div>'+ 
    '              <div class="fe03-form-step-button fe03-back"> <span>Back</span> </div>'+ 
    '          </div>'+ 
    '      </div>'+ 
    '  </div>'+
    '  <div class="fe03-form-button-three fe03-card fe03-hide">'+ 
    '      <div class="fe03-step-one-content1 fe03-hide" data-value="team_size">'+ 
    '          <div class="fe03-form-step-content-header">'+ 
    '              <div class="fe03-form-step-content-header-main">'+ 
    '                  <p>How many people are on your team?</p>'+ 
    '              </div>'+ 
    '              <div class="fe03-form-step-header-sub">(i.e. full-time employees, contractors, volunteers)</div>'+ 
    '          </div>'+ 
    '          <div class="fe03-form-step-content" dataform-value="S2B3">'+ 
    '              <div class="fe03-button fe03-redirect fe03-newContent" dataform-goalContent="It\'s_just_me" data-GA4click="it\'s_just_me_s2b3">It\'s just me!</div>'+ 
    '              <div class="fe03-button" dataform-goalContent="1_to_10_people" data-GA4click="1_to_10_people_s2b3">1 to 10 people</div>'+ 
    '              <div class="fe03-button" dataform-goalContent="10_to_50_people" data-GA4click="10_to_50_people_s2b3">10 to 50 people</div>'+ 
    '              <div class="fe03-button" dataform-goalContent="Over_50" data-GA4click="over_50_s2b3">Over 50</div>'+ 
    '          </div>'+ 
    '          <div class="fe03-form-step-footer">'+ 
    '              <div class="fe03-form-step-button fe03-next fe03-btn1-next-content-2"> <span>Next Step</span> </div>'+ 
    '              <div class="fe03-form-step-button fe03-back fe03-back-main"> <span>Back</span> </div>'+ 
    '          </div>'+ 
    '      </div>'+ 
    '      <div class="fe03-step-one-content2 fe03-hide" data-value="features_interest">'+ 
    '          <div class="fe03-form-step-content-header">'+ 
    '              <div class="fe03-form-step-content-header-main">'+ 
    '                  <p class="fe-03-most">What feature are you most interested in?</p>'+ 
    '              </div>'+ 
    '              <div class="fe03-form-step-header-sub">This will help us customize your experience.</div>'+ 
    '          </div>'+ 
    '          <div class="fe03-form-step-content" dataform-value="S3B3">'+ 
    '              <div class="fe03-button" dataform-goalContent="Video_membership" data-GA4click="video_membership_s3b3">Video <br>memberships</div>'+ 
    '              <div class="fe03-button" dataform-goalContent="Mobile_&_TV_apps" data-GA4click="mobile_&_tv_apps_s3b3">Mobile & <br>TV apps</div>'+ 
    '              <div class="fe03-button" dataform-goalContent="Community" data-GA4click="community_s3b3">Community</div>'+ 
    '              <div class="fe03-button" dataform-goalContent="Live_streaming" data-GA4click="live_streaming_s3b3">Live streaming</div>'+ 
    '              <div class="fe03-button" dataform-goalContent="E-commerce_&_merch" data-GA4click="e-commerce_&_merch_s3b3">E-commerce<br> & merch</div>'+ 
    '              <div class="fe03-button" dataform-goalContent="Access_to_a_business_coach" data-GA4click="access_to_a_business_coach_s3b3">Access to a<br> business coach</div>'+ 
    '          </div>'+ 
    '          <div class="fe03-form-step-footer">'+ 
    '              <div class="fe03-form-step-button fe03-next-final fe03-btn1-next-content-2"> <span>Next Step</span> </div>'+ 
    '              <div class="fe03-form-step-button fe03-back"> <span>Back</span> </div>'+ 
    '          </div>'+ 
    '      </div>'+ 
    '  </div>'+
    '  <div class="fe03-form-button-four fe03-card fe03-hide">'+ 
    '      <div class="fe03-step-one-content1 fe03-hide" data-value="how_can_help">'+ 
    '          <div class="fe03-form-step-content-header">'+ 
    '              <div class="fe03-form-step-content-header-main">'+ 
    '                  <p>How can we help you today?</p>'+ 
    '              </div>'+ 
    '              <div class="fe03-form-step-header-sub"></div>'+ 
    '          </div>'+ 
    '          <div class="fe03-form-step-content" dataform-value="S2B4">'+ 
    '              <div class="fe03-button fe03-redirect-final" dataform-goalContent="I_want_to_add_something_to_my_account" data-GA4click="I_want_to_add_something_to_my_account_s2b4">I want to add something to my account<br> (Mobile or TV app, Live Streaming, etc.</div>'+ 
    '              <div class="fe03-button" dataform-goalContent="I_need_help_with_my_account" data-GA4click="I_need_help_with_my_account_s2b4">I need help with my account</div>'+ 
    '          </div>'+ 
    '          <div class="fe03-form-step-footer">'+ 
    '              <div class="fe03-form-step-button fe03-next fe03-btn1-next-content-2"> <span>Next Step</span> </div>'+ 
    '              <div class="fe03-form-step-button fe03-back fe03-back-main"> <span>Back</span> </div>'+ 
    '          </div>'+ 
    '      </div>'+ 
    '      <div class="fe03-step-one-content2 fe03-hide" data-value="final">'+ 
    '          <div class="fe03-form-step-content-header">'+ 
    '              <div class="fe03-form-step-content-header-main">'+ 
    '                  <p>Thanks for being part of the Uscreen community!</p>'+ 
    '              </div>'+ 
    '              <div class="fe03-form-step-header-sub"></div>'+ 
    '          </div>'+ 
    '          <div class="fe03-form-step-content">'+ 
    '              <div class="fe03-paragraph">Please send us a message using the live chat tool on the bottom right corner of the screen and a customer support rep will be in touch.'+ 
    '              </div>'+ 
    '              <div class="fe03-paragraph">You can also find answers to common questions on our <a href="https://help.uscreen.tv/en/">Help Center</a>'+ 
    '              </div>'+ 
    '          </div>'+ 
    '          <div class="fe03-form-step-footer">'+ 
    '              <div class="fe03-form-step-button fe03-back"> <span>Back</span> </div>'+ 
    '          </div>'+ 
    '      </div>'+ 
    '  </div>'+
    '<div class="fe03-final-form fe03-hide"><span></span></div>'+
    '                  </div>'+ 
    '              </div>'+ 
    '  <div class="fe_excellent">'+ 
    '      <div class="fe_text">Excellent <img src="https://d27c6j8064skg9.cloudfront.net/FE/USCREEN/3.1/Group+4.svg" alt="image-112"></div>'+ 
    '      <p>"Best place to monetize your video content without any worries"</p>'+ 
    '  </div>'+
    '          </div>'+ 
    '      </div>'+ 
    '  </div>'+ 
    '  <div class="fe03-footer">'+ 
    '      <div class="fe03-card">'+ 
    '          <h1>$120M+</h1>'+ 
    '          <p>earned by creators each year</p>'+ 
    '      </div>'+ 
    '      <div class="fe03-card">'+ 
    '          <h1>25,000+</h1>'+ 
    '          <p>creators on Uscreen</p>'+ 
    '      </div>'+ 
    '      <div class="fe03-card">'+ 
    '          <h1>8.5M+</h1>'+ 
    '          <p>subscribers from 95 countries</p>'+ 
    '      </div>'+ 
    '  </div>';
    
    var mainForm =''+ 
    '<div class="fe03-finalMessage">Thanks! Our team will get back to you very soon to schedule your 1-on-1 demo call.</div>'+
    '  <div class="gf_browser_chrome gform_wrapper gravity-theme gf_uscreen_form_wrapper" id="fe03-gform_wrapper_4">'+ 
    '      <form method="post" id="fe03-gform_4" class="gf_uscreen_form" action="/request-demo/" novalidate="">'+ 
    '          <div class="gform_body gform-body">'+ 
    '              <div id="gform_fields_4" class="gform_fields top_label form_sublabel_below description_below">'+ 
    '                  <div id="field_4_23" class="gfield gfield--width-full gfield_error margin-top-0 gfield_contains_required field_sublabel_below field_description_below hidden_label gfield_visibility_visible"><label class="gfield_label" for="input_4_23">Full name<span class="gfield_required"><span class="gfield_required gfield_required_asterisk">*</span></span></label>'+ 
    '                      <div class="ginput_container ginput_container_text"><input name="input_23" id="input_4_23" type="text" value="" class="large" aria-describedby="validation_message_4_23" placeholder="Full name*" aria-required="true" aria-invalid="true"> </div>'+ 
    '                      <div id="validation_message_4_23" class="gfield_description validation_message gfield_validation_message">This field is required.</div>'+ 
    '                  </div>'+ 
    '                  <div id="field_4_20" class="gfield gfield--width-full gfield_error margin-top-3 field_sublabel_below field_description_below hidden_label gfield_visibility_visible"><label class="gfield_label" for="input_4_20">Email Address</label>'+ 
    '                      <div class="ginput_container ginput_container_email">'+ 
    '                          <input name="input_20" id="input_4_20" type="email" value="" class="large" placeholder="Business email address*" aria-invalid="true" aria-describedby="validation_message_4_20">'+ 
    '                      </div>'+ 
    '                      <div id="validation_message_4_20" class="gfield_description validation_message gfield_validation_message">The email address entered is invalid, please check the formatting (e.g. email@domain.com).</div>'+ 
    '                  </div>'+ 
    '                  <div id="field_4_3" class="gfield gfield--width-full gfield_error margin-top-3 gfield_contains_required field_sublabel_below field_description_below hidden_label gfield_visibility_visible"><label class="gfield_label" for="input_4_3">Company name<span class="gfield_required"><span class="gfield_required gfield_required_asterisk">*</span></span></label>'+ 
    '                      <div class="ginput_container ginput_container_text"><input name="input_3" id="input_4_3" type="text" value="" class="large" aria-describedby="validation_message_4_3" placeholder="Company name*" aria-required="true" aria-invalid="true"> </div>'+ 
    '                      <div id="validation_message_4_3" class="gfield_description validation_message gfield_validation_message">This field is required.</div>'+ 
    '                  </div>'+ 
    '                  <div id="field_4_6" class="gfield gfield--width-full margin-top-3 field_sublabel_below field_description_below hidden_label gfield_visibility_visible"><label class="gfield_label" for="input_4_6">Phone Number</label>'+ 
    '                      <div class="ginput_container ginput_container_phone"><input name="input_6" id="input_4_6" type="tel" value="" class="large" placeholder="Phone number" aria-invalid="false"></div>'+ 
    '                  </div>'+ 
    '                  <div id="field_4_7" class="gfield gfield--width-full gfield_error margin-top-3 has-white-background-color border-radius gfield_contains_required field_sublabel_below field_description_below hidden_label gfield_visibility_visible"><label class="gfield_label" for="input_4_7">Social Audience Size<span class="gfield_required"><span class="gfield_required gfield_required_asterisk">*</span></span></label>'+ 
    '                      <div class="ginput_container ginput_container_select"><select name="input_7" id="input_4_7" class="large gfield_select" aria-describedby="validation_message_4_7" aria-required="true" aria-invalid="true">'+ 
    '                <option value="" selected="selected" class="gf_placeholder">How large is your social audience?</option>'+ 
    '                <option value="0-10k">0-10k</option>'+ 
    '                <option value="11k-40k">11k-40k</option>'+ 
    '                <option value="41k-100k">41k-100k</option>'+ 
    '                <option value="100k+">100k+</option>'+ 
    '              </select></div>'+ 
    '                      <div id="validation_message_4_7" class="gfield_description validation_message gfield_validation_message">This field is required.</div>'+ 
    '                  </div>'+ 
    '              </div>'+ 
    '          </div>'+ 
    '          <div class="gform_footer top_label fe03-form-step-footer"> <input type="submit" id="fe03-gform_submit_button_4" class="gform_button button" value="Request 1-on-1 Demo">'+ 
    '<div class="fe03-form-step-button fe03-back-prev"> <span>Back</span> </div>'+
    '          </div>'+ 
    '  '+ 
    '      </form>'+ 
    '  </div>';
  
  var newhtmlString =''+ 
  '  <div class="fe03-step-one-content3 fe03-hide" data-value="How_would_you_proceed">'+ 
  '      <div class="fe03-form-step-content-header">'+ 
  '          <div class="fe03-form-step-header-sub">Based on your selection a free trial would be the best option for you. Alternatively, you can watch a demo. </div>'+ 
  '          <div class="fe03-form-step-content-header-main">'+ 
  '              <p>How would you like to proceed?</p>'+ 
  '          </div>'+ 
  '      </div>'+ 
  '      <div class="fe03-form-step-content" dataform-value="S3B4">'+ 
  '          <div class="fe03-button fe03-redirect" data-GA4click="watch_our_on-demand_demo_s3b4">Watch our on-demand demo</div>'+ 
  '          <div class="fe03-button fe03-redirect-final" data-GA4click="start_free_trial_s3b4">Start free trial</div>'+ 
  '      </div>'+ 
  '      <div class="fe03-form-step-footer">'+ 
  '          <div class="fe03-form-step-button fe03-next-final fe03-btn1-next-content-2 fe03-next-final_Get_Started"> <span>Get Started</span> </div>'+ 
  '      </div>'+ 
  '  </div>';
    var helper = _$();
    var dataset = {}
  
    // var datasetTwo = {
    //   []
      
    // }
    function fillUpForm(dataset){
      // console.log(dataset);
      if(dataset["audience_size"]){
        // console.log(dataset["audience_size"]);
        document.querySelector("#input_17_42").value = dataset["audience_size"];
        
      }
      if(dataset["what_describes_you"]){
        // console.log(dataset["what_describes_you"]);
        document.querySelector("#input_17_38").value = dataset["what_describes_you"];
        
      }
      if(dataset["platform"]){
        // console.log(dataset["platform"]);
        document.querySelector("#input_17_39").value = dataset["platform"];
        
      }
      if(dataset["interested_in"]){
        // console.log(dataset["interested_in"]);
        document.querySelector("#input_17_40").value = dataset["interested_in"];
      
      }
      if(dataset["team_size"]){
        // console.log(dataset["team_size"]);
        document.querySelector("#input_17_43").value = dataset["team_size"];
       
        
      }
      // if(dataset["features_interest"]){
      //   console.log(dataset["features_interest"]);
      //   document.querySelector("#input_17_42").value = dataset["features_interest"];
      // }
      if(dataset["money_method"]){
        // console.log(dataset["money_method"]);
        document.querySelector("#input_17_41").value = dataset["money_method"];
       
      }
      if(dataset["how_can_help"]){
        // console.log(dataset["how_can_help"]);
        document.querySelector("#input_17_42").value = dataset["how_can_help"];
        
      }
     }

    // function getTheValueDescribe(){
    //   helper.waitForElement("div.fe03-form-main > div.fe03-form-step-content",function(){
    //     document.querySelectorAll(" div.fe03-form-main > div.fe03-form-step-content > div").forEach(function(item){
    //       item.addEventListener("click",function(){
    //       })
    //     });
    //     document.querySelector(" div.fe03-form-main > div.fe03-form-step-footer > div").addEventListener("click",function(e){
    //       if(document.querySelector(" div.fe03-form-main > div.fe03-form-step-footer > div").parentElement.previousElementSibling.querySelector(".fe03-active")){
    //         document.querySelector("#input_17_38").value = document.querySelector(" div.fe03-form-main > div.fe03-form-step-footer > div").parentElement.previousElementSibling.querySelector(".fe03-active").textContent;
    //       }   
    //     })
    //     document.querySelector(".fe03-back-main").addEventListener("click",function(e){
    //       console.log(e.target.parentElement);
    //       document.querySelector("#input_17_38").value = "";
    //     })
    //   },50,15000);
       
      
    //   // document.querySelector("fe03-form-main")


    // }

    // getTheValueDescribe();

   

    // function getTheValueDescribe(){
    //   helper.waitForElement("div.fe03-form-main > div.fe03-form-step-content",function(){
    //     document.querySelectorAll(" div.fe03-form-main > div.fe03-form-step-content > div").forEach(function(item){
    //       item.addEventListener("click",function(){
    //       })
    //     });
    //     document.querySelector(" div.fe03-form-main > div.fe03-form-step-footer > div").addEventListener("click",function(e){
    //       if(document.querySelector(" div.fe03-form-main > div.fe03-form-step-footer > div").parentElement.previousElementSibling.querySelector(".fe03-active")){
    //         document.querySelector("#input_17_38").value = document.querySelector(" div.fe03-form-main > div.fe03-form-step-footer > div").parentElement.previousElementSibling.querySelector(".fe03-active").textContent;
    //       }   
    //     })
    //   },50,15000);
    // }



   





    function dataSet() {
      if (document.querySelector('.fe03-form-step-content > div')) {
        document.querySelectorAll('.fe03-form-step-content > div').forEach(function(e){
          e.addEventListener('click',function(){
              var dataValue = this.closest('[data-value]')
              var getValue = dataValue.getAttribute('data-value')
              dataset[getValue] = ''+this.innerText.replace('\n', ' ')+''; 
              
              // console.log(e.parentElement.previousElementSibling.querySelector("p").textContent); 

              // document.querySelectorAll("#gform_17 input").forEach(function(item){
              //   if(item.parentElement.parentElement.querySelector("label")){
              //     if(item.parentElement.parentElement.querySelector("label").textContent.indexOf(e.parentElement.previousElementSibling.querySelector(".fe03-form-step-content-for-step-one-header-main p").textContent) > -1){
              //       item.parentElement.parentElement.querySelector("input").value = e.textContent;
              //       console.log(item.parentElement.parentElement.querySelector("input").value);
              //     }
              //   }
              //   // item.parentElement.parentElement.querySelector("label") && console.log(item.parentElement.parentElement.querySelector("label").textContent);
                
              // })
              // document.querySelector("#input_17_38").value = e.parentElement;

              
          })    
        })
      }

      if (document.querySelector('.fe03-form-step-footer > div:nth-child(2)')) {
        document.querySelectorAll('.fe03-form-step-footer > div:nth-child(2)').forEach(function(e){
          e.addEventListener('click',function(){
              var dataValue = this.closest('[data-value]')
              var getValue = dataValue.getAttribute('data-value')

              dataset[getValue] = ''; 
              // console.log(dataValue[getValue]);
          })      
        })
      }

    }


    function clean(obj) {
      for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === '') {
          delete obj[propName];
        }
      }
      return obj
    }
    
    function finalForm() {
      if (document.querySelector('.fe03-final-form #fe03-gform_4 #input_4_23') && document.querySelector('.fe03-final-form #fe03-gform_4 #input_4_20') && document.querySelector('.fe03-final-form #fe03-gform_4 #input_4_3') && document.querySelector('.fe03-final-form #fe03-gform_4 #input_4_6') && document.querySelector('.fe03-final-form #fe03-gform_4 #input_4_7')) {
        
        //Name
        var uName = document.querySelector('.fe03-final-form #fe03-gform_4 #input_4_23').value  
        if (uName != '') {
          removeClass('.fe03-final-form #fe03-gform_4 #field_4_23','fe03-show-notValid')
          dataset['name'] = '' + uName + '';
          // document.querySelector("#input_17_38").value = uName;
          // console.log(document.querySelector("#input_17_38").value);

        } else {
          addClass('.fe03-final-form #fe03-gform_4 #field_4_23','fe03-show-notValid')
        }
          
        //Email
        var email = document.querySelector('.fe03-final-form #fe03-gform_4 #input_4_20').value  
        
        if (email != '' && /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(email)) {
          removeClass('.fe03-final-form #fe03-gform_4 #field_4_20','fe03-show-notValid')
          dataset['email'] = '' + email + '';

        } else {
          addClass('.fe03-final-form #fe03-gform_4 #field_4_20','fe03-show-notValid')
        }
          
        //Company Name
        var company_Name = document.querySelector('.fe03-final-form #fe03-gform_4 #input_4_3').value
        if (company_Name != '') {
          removeClass('.fe03-final-form #fe03-gform_4 #field_4_3','fe03-show-notValid')
          dataset['company'] = '' + company_Name + '';
        } else {
          addClass('.fe03-final-form #fe03-gform_4 #field_4_3','fe03-show-notValid')
        }

        //Phone Number
        var phn_nbr = document.querySelector('.fe03-final-form #fe03-gform_4 #input_4_6').value
        if (phn_nbr != '') {
          dataset['phone'] = '' + phn_nbr + '';

        } else {
          dataset['phone'] = 'null';
        }
          
        
        //social audience
        var social_audience = document.querySelector('.fe03-final-form #fe03-gform_4 #input_4_7').value 
        if (social_audience != '') {
          removeClass('.fe03-final-form #fe03-gform_4 #field_4_7','fe03-show-notValid')
          dataset['audience_size'] = '' + social_audience + ''; 
          // document.querySelector("#input_17_42").value = social_audience;
        } else {
          addClass('.fe03-final-form #fe03-gform_4 #field_4_7','fe03-show-notValid')
        }
      }    
    }
      
    helper.waitForElement(".fe03-form-step-footer",function(){
      document.querySelectorAll(".fe03-form-step-footer").forEach(function(item){
          item.addEventListener("click",function(){
            document.querySelector("div.fe03-hero-container-test-6.container > div > div.fe03-form-container").classList.contains("fe03-showFinalForm");
            fillUpForm(dataset);
          })
      })
    },50,15000);
    

    function sendingForm() {
      // console.log(dataset);
      
  
      var string = String(JSON.stringify(dataset))
      
          string = string.replaceAll('&','%26')
          string = string.replaceAll('","','&')
          string = string.replaceAll('":"','=')
          string = string.replaceAll('@','%40')
          string = string.replaceAll(' ','%20')
          string = string.replaceAll(',','%2C')
          string = string.replaceAll('{"','')
          string = string.replaceAll('"}','')
          // console.log(string)
       
          
      if (string.indexOf('what_describes_you') < 0) { 

        string = string + '&what_describes_you=null'
      }

      if (string.indexOf('platform') < 0) { 
        string = string + '&platform=null'
      }

      if (string.indexOf('audience_size') < 0) { 
        string = string + '&audience_size=null'
      }

      if (string.indexOf('team_size') < 0) { 
        string = string + '&team_size=null'
      }

      if (string.indexOf('features_interest') < 0) { 
        string = string + '&features_interest=null'
      }

      if (string.indexOf('money_method') < 0) { 
        string = string + '&money_method=null'
      }

      if (string.indexOf('how_can_help') < 0) { 
        string = string + '&how_can_help=null'
      }

      if (string.indexOf('name') < 0) { 
        string = string + '&name=null'
      }

      if (string.indexOf('email') < 0) { 
        string = string + '&email=null'
      }

      if (string.indexOf('company') < 0) { 
        string = string + '&company=null'
      }

      if (string.indexOf('audience_size') < 0) { 
        string = string + '&audience_size=null'
      }
      console.log(string);
      // Sending POst Request
          var data = null;
          var xhr = new XMLHttpRequest();

          xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
              // console.log(this.responseText);
            }
          });
          
          xhr.open("POST", "https://hooks.zapier.com/hooks/catch/10780775/bcspzk0/?"+string+"");
          xhr.send(data);
    }

    helper.live('#fe03-1-request-demo', 'click', function () {
      var MoreComputing = window.scrollY + document.querySelector('.fe03-form-container').getBoundingClientRect().top;
          window.scrollTo({
            top: MoreComputing - 80,
            behavior: 'smooth',
          });
          // scroll(document.querySelector('#fe03-1-request-demo'), document.querySelector('.fe03-form-container'))
    })

    // step 1 Next:
    helper.live('.fe03-form-step-footer-next-step-1', 'click', function () {
      // [data-value="what_describes_you"] .fe03-button.fe03-active
       //It  will trigger if active
      if (document.querySelector('[data-value="what_describes_you"] .fe03-button.fe03-active')) {
        dataLayer.push({event:'step_1_completion'})
      }
    })

    // step 2 Next:
    helper.live('.fe03-btn1-next-content-2:not(.fe03-next-final)', 'click', function () {
      // [dataform-value="S2B1"] .fe03-button.fe03-active, [dataform-value="S2B2"] .fe03-button.fe03-active, [dataform-value="S2B3"] .fe03-button.fe03-active, [dataform-value="S2B4"] .fe03-button.fe03-active

      //It  will trigger if active
      if (document.querySelector('[dataform-value="S2B1"] .fe03-button.fe03-active') || document.querySelector('[dataform-value="S2B2"] .fe03-button.fe03-active') || document.querySelector('[dataform-value="S2B3"] .fe03-button.fe03-active') || document.querySelector('[dataform-value="S2B4"] .fe03-button.fe03-active')) {
        dataLayer.push({event:'step_2_completion'})
      }  
      
    })

    // step 3 Next:
    helper.live('.fe03-next-final', 'click', function () {
      // [dataform-value="S3B1"] .fe03-button.fe03-active, [dataform-value="S3B2"] .fe03-button.fe03-active, [dataform-value="S3B3"] .fe03-button.fe03-active
      
       //It  will trigger if active
       if (document.querySelector('[dataform-value="S3B1"] .fe03-button.fe03-active') || document.querySelector('[dataform-value="S3B2"] .fe03-button.fe03-active') || document.querySelector('[dataform-value="S3B3"] .fe03-button.fe03-active')) {
        dataLayer.push({event:'step_3_completion'})
      }
      
    })

    // step 2 back:
    helper.live('.fe03-back-main', 'click', function () {
      dataLayer.push({event:'step_2_back_click'})
    })

    // step 3 back:
    helper.live('.fe03-back:not(.fe03-back-main)', 'click', function () {
      dataLayer.push({event:'step_3_back_click'})
    })

    /* Variation Init */
    function init() {

      addClass('body','fe03');
      
    //For TY page logo
    helper.waitForElement('svg [mask="url(#b)"]',function(){
      document.querySelector('svg [mask="url(#a)"]').setAttribute('mask', '');
      document.querySelector('svg [mask="url(#b)"]').setAttribute('mask', '');

    },50,5000);

      _$('header.header + .main-nav-overlay +  .wp-block-group').append(heroHtml);
  if(document.querySelector('[data-value="money_method"]')){
    document.querySelector('[data-value="money_method"]').insertAdjacentHTML('afterend',newhtmlString)
  }
  
  if(document.querySelector('[data-value="features_interest"]')){
    document.querySelector('[data-value="features_interest"]').insertAdjacentHTML('afterend',newhtmlString)
  }
  // [data-value="features_interest"]
      // _$('#demo-form').append(heroHtml);
      document.querySelector("body").classList.add("fe03-hidden-form-show");  
      
      if(jQuery('.validation_message').length){
        addClass('body', 'f3-03-show-hide-form');
        var bmHeight = document.querySelector("#gform_wrapper_17").offsetHeight;
        // console.log(bmHeight);
        bmHeight = bmHeight+200;
        helper.waitForElement(".fe03-form-container.fe03-showFinalForm",function(){
          document.querySelector(".fe03-form-container.fe03-showFinalForm").style.height = ""+(bmHeight)+"px";
        },50,5000);
      
        
      }

     

      if(jQuery('#gform_confirmation_wrapper_17').length){
        jQuery('.fe03-form-wrapper').html(jQuery('#gform_confirmation_wrapper_17').html());
        dataLayer.push({
          event:'formSubmission',
          formId: 17,
        })
      
        return true;
      }

      if(jQuery(".gfield_validation_message").length){
            document.querySelector(".fe03-form-container").classList.add("fe03-showFinalForm")
            document.querySelector(".fe03-form-main").classList.add("fe03-hide");
            document.querySelector(".fe03-final-form").classList.remove("fe03-hide");
            document.querySelector(" div.fe03-form-container.fe03-showFinalForm > div > div.fe03-form-step-header > div.fe03-form-step-header-two").classList.add("fe03-step2","fe03-step3","fe03-step4");
            // sessionStorage.setItem("showing-final-form-for-fist-time","active");
      }

      

      
      // Removing Mask on the top of the nav SVG
      if (document.querySelectorAll('.header-logo svg g')) {
        document.querySelectorAll('.header-logo svg g').forEach(function (e) {
          e.setAttribute('mask', '');
        })  
      }

      //Selecting Buttons
      if (document.querySelector('.fe03-form-step-content > .fe03-button')) {
        document.querySelectorAll('.fe03-form-step-content > .fe03-button').forEach(function(e){
          e.addEventListener('click', function () {
            if(document.querySelector('.fe03-form-step-content > .fe03-button.fe03-active')){
              removeClass('.fe03-form-step-content > .fe03-button.fe03-active', 'fe03-active')
            }
            this.classList.add('fe03-active')
          })
        })
      }

      //Clicking Main form next button
      if (document.querySelector('.fe03-form-step-footer-next-step-1')) {
        document.querySelector('.fe03-form-step-footer-next-step-1').addEventListener('click',function(e){
          if(document.querySelector('.fe03-button.fe03-active')){
              var databutton = document.querySelector('.fe03-button.fe03-active').getAttribute('data-button')
               addClass('.fe03-form-step-header-two', 'fe03-step2')
               TrackGAEvent("funnelenvy", "click", "Step_1_completion");
              if (databutton == '1') {
                //Hide main form
                addClass('.fe03-form-main', 'fe03-hide')
                removeClass('.fe03-form-button-one', 'fe03-hide')
                removeClass('.fe03-form-button-one .fe03-step-one-content1', 'fe03-hide')
                TrackGAEvent("funnelenvy", "select", "I'm_already_using_a_Membership");
              }

              if(databutton == '2'){                  
                //Hide main form
                addClass('.fe03-form-main', 'fe03-hide')
                removeClass('.fe03-form-button-two', 'fe03-hide')
                removeClass('.fe03-form-button-two .fe03-step-one-content1', 'fe03-hide')
                TrackGAEvent("funnelenvy", "select", "I_operate_primarily_online");
              }
            
              if(databutton == '3'){
                //Hide main form
                addClass('.fe03-form-main', 'fe03-hide')
                removeClass('.fe03-form-button-three', 'fe03-hide')
                removeClass('.fe03-form-button-three .fe03-step-one-content1', 'fe03-hide')
                TrackGAEvent("funnelenvy", "select", "I'm_an_offline_entrepreneur");
              }
            
            if(databutton == '4'){
                addClass('.fe03-form-step-header-two', 'fe03-step2-Hide')
                //Hide main form
                addClass('.fe03-form-main', 'fe03-hide')
                removeClass('.fe03-form-button-four', 'fe03-hide')
                removeClass('.fe03-form-button-four .fe03-step-one-content1', 'fe03-hide')
                TrackGAEvent("funnelenvy", "select", "I'm_an_existing_customer");
            }
  
          }        
        })  
      }

      //Content-1 Next button
      if (document.querySelector('.fe03-next')) {
        document.querySelectorAll('.fe03-next').forEach(function(e){
          e.addEventListener('click',function(){
              var parent = this.closest('.fe03-card')
              var firstDiv = parent.querySelector('.fe03-step-one-content1')
      var secondDiv = parent.querySelector('.fe03-step-one-content2')
      var thirdDiv = parent.querySelector('.fe03-step-one-content3')
              
            if (firstDiv.querySelector('.fe03-button.fe03-active') && !firstDiv.querySelector('.fe03-button.fe03-redirect.fe03-active') && !firstDiv.querySelector('.fe03-button.fe03-redirect-final.fe03-active')) {
                  addClass('.fe03-form-step-header-two', 'fe03-step3')
                  firstDiv.classList.add('fe03-hide');
                  secondDiv.classList.remove('fe03-hide');    
                  TrackGAEvent("funnelenvy", "click", "Step_2_completion");
              }
              
              if (firstDiv.querySelector('.fe03-button.fe03-active') && firstDiv.querySelector('.fe03-button.fe03-redirect.fe03-active') && !firstDiv.querySelector('.fe03-button.fe03-redirect-final.fe03-active')) {
                TrackGAEvent("funnelenvy", "click", "Step_2_completion");
                var URLtoGenerate=document.querySelector('#new_registration').attributes.href.value;
                var UpdateURLred=decorateUrl(URLtoGenerate);
                var highlightedItems=document.querySelectorAll('#new_registration')
                    highlightedItems.forEach((urlToupdate) => {
                        urlToupdate.setAttribute('href',UpdateURLred);
                    });
      
      //fe03-redirect fe03-newContent fe03-active
      if(firstDiv.querySelector('.fe03-button.fe03-redirect.fe03-newContent.fe03-active')){
        // console.log('ok')
        firstDiv.classList.add('fe03-hide');
        secondDiv.classList.add('fe03-hide'); 
        addClass('.fe03-form-step-header-two', 'fe03-step3')
        thirdDiv.classList.remove('fe03-hide'); 
        addClass('.fe03-form-step-header-one', 'fe03-step3_Heading')
        // 
      }
      
              //   document.querySelector('#new_registration').click();
              }
              
            if (firstDiv.querySelector('.fe03-button.fe03-redirect-final.fe03-active')) {
                removeClass('.fe03-final-form', 'fe03-hide')
                addClass('.fe03-form-step-header-two', 'fe03-step4')
                addClass('body', 'f3-03-show-hide-form');
                TrackGAEvent("funnelenvy", "click", "Step_3_completion");
                  parent.classList.add('fe03-hide');
                  firstDiv.classList.add('fe03-hide');
                  secondDiv.classList.add('fe03-hide'); 
                  
                  addClass('.fe03-form-container', 'fe03-showFinalForm')
                  firstDiv.classList.add('fe03-active-final');      
                  
                 clean(dataset);
                //  console.log(dataset);
            }
          })
        })
      }

      //Go to Main Back button
      if (document.querySelector('.fe03-back-main')) { 
        document.querySelectorAll('.fe03-back-main').forEach(function(e){
          e.addEventListener('click', function () {
            removeClass('.fe03-form-step-header-two', 'fe03-step2')
            TrackGAEvent("funnelenvy", "click", "Step_2_Back_click");
              if (document.querySelector('.fe03-form-step-header-two.fe03-step2-Hide')) {
                removeClass('.fe03-form-step-header-two.fe03-step2-Hide', 'fe03-step2-Hide')
              }
            
              var parent = this.closest('.fe03-card')
              parent.classList.add('fe03-hide');
             
              this.closest('.fe03-step-one-content1').classList.add('fe03-hide');
              removeClass('.fe03-form-main', 'fe03-hide')
              
              if (document.querySelector('.fe03-form-step-content > .fe03-button.fe03-active')) {
                removeClass('.fe03-form-step-content > .fe03-button.fe03-active', 'fe03-active')
              }
          })
        })
      }

      //Go to 2nd Content Back button
      if (document.querySelector('.fe03-back')) {
        document.querySelectorAll('.fe03-back').forEach(function(e){
          e.addEventListener('click', function () {
            removeClass('.fe03-form-step-header-two', 'fe03-step3')
          
            if (document.querySelector('.fe03-form-step-content > .fe03-button.fe03-active')) {
              removeClass('.fe03-form-step-content > .fe03-button.fe03-active', 'fe03-active')
            }

            var parent = this.closest('.fe03-card')
            var firstDiv = parent.querySelector('.fe03-step-one-content1');
                firstDiv.classList.remove('fe03-hide');
            var secondDiv = parent.querySelector('.fe03-step-one-content2');
                secondDiv.classList.add('fe03-hide');    
          })
        })
      }

      helper.live('.fe03-back:not(.fe03-back-main)', 'click', function () {
        TrackGAEvent("funnelenvy", "click", "Step_3_Back_click");
      })

      helper.live('.fe03-button', 'click', function () {
        TrackGAEvent('funnelenvy','click','Form_Engagement')
      })

      helper.live('.fe03-next.fe03-btn1-next-content-2', 'click', function () {
        var parent = this.closest('[data-value]')
        var attr = parent.querySelector('.fe03-form-step-content')
        var activeButton = attr.querySelector('.fe03-button.fe03-active')
        if(activeButton){      
            // console.log(attr.getAttribute("dataform-value"))
            // console.log(activeButton.getAttribute("dataform-goalcontent"))
            if(activeButton.getAttribute("dataform-goalcontent") != null){
              TrackGAEvent("funnelenvy", "select", activeButton.getAttribute("dataform-goalcontent")+"_"+attr.getAttribute("dataform-value"));
            }
        }
      })

      helper.live('.fe03-next-final', 'click', function () {
        var parent = this.closest('[data-value]')
        var attr = parent.querySelector('.fe03-form-step-content')
        var activeButton = attr.querySelector('.fe03-button.fe03-active')
        if(activeButton){      
            // console.log(attr.getAttribute("dataform-value"))
            // console.log(activeButton.getAttribute("dataform-goalcontent"))
            if(activeButton.getAttribute("dataform-goalcontent") != null){
              TrackGAEvent("funnelenvy", "select", activeButton.getAttribute("dataform-goalcontent")+"_"+attr.getAttribute("dataform-value"));
            }
        }
      })

  // fe03-newContent
  // helper.live('.fe03-next-final_Get_Started', 'click', function () {
  // 	// fe03-step-one-content3
  // 	addClass('.fe03-step-one-content3', 'fe03-hide')
  // })
    
        if (!document.querySelector('#fe03-gform_wrapper_4')) {
          // document.querySelector('.fe03-final-form').insertAdjacentHTML('beforeend', mainForm);
          // jQuery('#gform_wrapper_17').insertBefore('.fe03-final-form span');
          if(document.querySelector(".gfield_validation_message")){
            // document.querySelector(".fe03-form-container").classList.add(".fe03-showFinalForm")
            // document.querySelector(".fe03-form-main").classList.add("fe03-hide");
            // document.querySelector(".fe03-final-form").classList.remove("fe03-hide");
     
            
           }
        

          //document.querySelector(".fe03-final-form").insertAdjacentElement('beforeend', document.querySelector(""))
        }



      //Shoing final form
      if (document.querySelector('.fe03-next-final')) {
        document.querySelectorAll('.fe03-next-final').forEach(function(e){
          e.addEventListener('click', function () {

              var parent = this.closest('.fe03-card')
              var firstDiv = parent.querySelector('.fe03-step-one-content1')
      var secondDiv = parent.querySelector('.fe03-step-one-content2')
      var thirdDiv = parent.querySelector('.fe03-step-one-content3')

              if (secondDiv.querySelector('.fe03-button.fe03-active')) {
                removeClass('.fe03-final-form', 'fe03-hide')
                addClass('.fe03-form-step-header-two', 'fe03-step4')
                addClass('body', 'f3-03-show-hide-form');
                  parent.classList.add('fe03-hide');
                  firstDiv.classList.add('fe03-hide');
                  secondDiv.classList.add('fe03-hide'); 

                  addClass('.fe03-form-container', 'fe03-showFinalForm')
                  secondDiv.classList.add('fe03-active-final');      
                  TrackGAEvent("funnelenvy", "click", "Step_3_completion");
                clean(dataset);
                if (dataset.hasOwnProperty('audience_size')) {
                  addClass('.fe03-final-form', 'fe03-hide-audince')
                } else {
                  removeClass('.fe03-final-form', 'fe03-hide-audince')
                  if(document.querySelector('#fe03-gform_4 #input_4_7')){
                    document.querySelector('#fe03-gform_4 #input_4_7').value = '';
                  }
                  
                }
                // console.log(dataset);
      }
      // -------------------------------------------------------------------------
      if (thirdDiv.querySelector('.fe03-button.fe03-active')) {
        if (document.querySelector('.fe03-button.fe03-redirect-final.fe03-active')) {
          TrackGAEvent("funnelenvy", "click", "start_free_trial_s3b4");
          // document.querySelector('#new_registration').click();
          window.location.href = 'https://www.uscreen.io/admin/registrations/new';
        } else { 
          
          TrackGAEvent("funnelenvy", "click", "watch_our_on-demand_demo_s3b4");
          
          window.location.href = 'https://www.uscreen.tv/on-demand-demo/';
          // removeClass('.fe03-final-form', 'fe03-hide')
          // addClass('.fe03-form-step-header-two', 'fe03-step4')
          // addClass('body', 'f3-03-show-hide-form');
          //   parent.classList.add('fe03-hide');
          //   firstDiv.classList.add('fe03-hide');
          //   secondDiv.classList.add('fe03-hide'); 
          //   thirdDiv.classList.add('fe03-hide');
          // addClass('.fe03-form-container', 'fe03-showFinalForm')
          // TrackGAEvent("funnelenvy", "click", "start_free_trial_s3b4");
          // secondDiv.classList.add('fe03-active-final');      
          
          // clean(dataset);
          // if (dataset.hasOwnProperty('audience_size')) {
          // addClass('.fe03-final-form', 'fe03-hide-audince')
          // } else {
          // removeClass('.fe03-final-form', 'fe03-hide-audince')
          // if(document.querySelector('#fe03-gform_4 #input_4_7')){
          //   document.querySelector('#fe03-gform_4 #input_4_7').value = '';
          // }
          
          // }
        }
      }
          })
        })
      }


      if (document.querySelector('.fe03-social-audience .fe03-button:not(.fe03-redirect)')) {
        document.querySelectorAll('.fe03-social-audience .fe03-button:not(.fe03-redirect)').forEach(function(e){
          e.addEventListener('click',function(){
              var Elementval = this.getAttribute('value')
            document.querySelector('#fe03-gform_4 #input_4_7').value = Elementval;
          })    
        })
      }

      
      //Final Form back button
      helper.live('.fe03-back-prev', 'click', function () {
        // fe03-show-notValid
        if (document.querySelector('.fe03-show-notValid')) {
          document.querySelectorAll('.fe03-show-notValid').forEach(function (e) {
            e.classList.remove('fe03-show-notValid')
          })
         }

        removeClass('.fe03-active-final', 'fe03-hide')
        removeClass('.fe03-form-container', 'fe03-showFinalForm')
        addClass('.fe03-final-form', 'fe03-hide')
        TrackGAEvent("funnelenvy", "click", "Step_4_Back_click");
        document.querySelector('.fe03-active-final').closest('.fe03-card').classList.remove('fe03-hide')
        removeClass('.fe03-active-final', 'fe03-active-final')
        removeClass('.fe03-form-step-header-two', 'fe03-step4')

        if (document.querySelector('.fe03-form-step-content > .fe03-button.fe03-active')) {
          removeClass('.fe03-form-step-content > .fe03-button.fe03-active', 'fe03-active')
        }
      })

      helper.live('#fe03-gform_submit_button_4', 'click', function (e) {
        e.preventDefault()
        finalForm();

        if (!document.querySelector('.fe03-show-notValid')) { 
          addClass('.fe03-form-container', 'fe03-submitted')
          sendingForm();
          TrackGAEvent("funnelenvy", "click", "Request_1-on-1_Demo");
          TrackGAEvent("Form submission", "Request Demo", "/request-demo/");
          dataLayer.push({event:'formSubmission'})
        }
      })

      dataSet();
     

      if (!document.querySelector(".fe03-header-mobile")) {
        insertHtml('div.fe03-hero-container-test-6.container > div > div.wp-block-column.margin-bottom-0.padding-top-7', feHeader, "beforebegin");
      }

      if (!document.querySelector(".fe03-footer-mobile")) {
        insertHtml('div.fe03-hero-container-test-6.container > div > div.wp-block-column.margin-bottom-0.padding-top-7', feFooter, "beforebegin");
      }
    }

    function initAddAnchor(){	
      var newlink=decorateUrl('https://www.uscreen.io/admin/registrations/new');	
      var newCTA='<a href="'+newlink+'" style="display:none;" id="new_registration">New Registration</a>';	
      document.querySelector('body').insertAdjacentHTML('beforeend', newCTA);	
  };	
    helper.waitForElement("body", initAddAnchor, 50, 5000);

    /* Initialise variation */
    helper.waitForElement("#gform_confirmation_wrapper_17, #gform_wrapper_17", init, 50, 5000);


  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();