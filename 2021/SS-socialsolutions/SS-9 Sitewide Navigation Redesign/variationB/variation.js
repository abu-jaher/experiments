(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "ss9";

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
         live : function(selector, event, callback, context) {
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
              addEvent(context || document, event, function (e) {
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
           html: function (v) {
                    return typeof v == 'undefined'
                      ? this.value[0].innerHTML
                      : this.each(function (i) {
                          i.innerHTML = v;
                        });
                  },
          addClass: function (v) {
            var a = v.split(" ");
            return this.each(function (i) {
              for (var x = 0; x < a.length; x++) {
                if (i.classList) {
                  i.classList.add(a[x]);
                } else {
                  i.className += " " + a[x];
                }
              }
            });
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

      function live(selector, event, callback, context) {
        /****Helper Functions****/
        // helper for enabling IE 8 event bindings
        function addEvent(el, type, handler) {
          if (el.attachEvent) el.attachEvent("on" + type, handler);
          else el.addEventListener(type, handler);
        }
        // matches polyfill
        this && this.Element &&
          (function (ElementPrototype) {
            ElementPrototype.matches =
              ElementPrototype.matches ||
              ElementPrototype.matchesSelector ||
              ElementPrototype.webkitMatchesSelector ||
              ElementPrototype.msMatchesSelector ||
              function (selector) {
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
          addEvent(context || document, event, function (e) {
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
      }

    var febutton = '<button class="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="Toggle Sub Menu" tabindex="0"><svg width="24" height="24" viewBox="0 0 24 24" fill-rule="evenodd"><title>Caret Down</title><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"></path></svg></button>';

    var feMenu = ''+
    '      <ul class="fe-menu menu">'+ 
    '          <li class="menu-item menu-item-type-post_type menu-item-object-page depth-1  menu-item-has-children fe-who-we-serve">'+ 
    '              <a href="https://www.socialsolutions.com/who-we-serve/" tabindex="0">'+ 
    '                  <div class="title-description">Who We Serve</div>'+ 
    '              </a>'+ febutton +
    '              <div class="sub-menu depth-2">'+ 
    '                  <ul>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/who-we-serve/nonprofit-organizations/" tabindex="0">'+ 
    '                              <div class="title-description"><img src="https://www.socialsolutions.com/wp-content/uploads/2021/03/SocialSolutions_Icons_Heart-150x150.png" alt="SocialSolutions_Icons_Heart"> Nonprofit Organizations</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/who-we-serve/public-sector/" tabindex="0">'+ 
    '                              <div class="title-description"><img src="https://www.socialsolutions.com/wp-content/uploads/2021/03/SocialSolutions_Icons_Community-Network-150x150.png" alt="SocialSolutions_Icons_Community-Network">Public Sector</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="/who-we-serve/impact-partners/" tabindex="0">'+ 
    '                              <div class="title-description"><img src="https://www.socialsolutions.com/wp-content/uploads/2021/03/SocialSolutions_Icons_CommunityDoneRight.png" alt="SocialSolutions_Icons_CommunityDoneRight">Philanthropists</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/case-studies/" tabindex="0">'+ 
    '                              <div class="title-description"><img src="https://www.socialsolutions.com/wp-content/uploads/2021/03/SocialSolutions_Icons_Mail-150x150.png" alt="SocialSolutions_Icons_Mail">Case Studies</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                  </ul>'+ 
    '                  <div class="fe-sub-side">'+ 
    '                      <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/SS/05/cis_logo.svg" alt="cis_logo">'+ 
    '                      <p class="fe-sub-para">“Here’s what I believe: do the work and the outcomes will show. But in order for outcomes to show, I need the data. So, that means I need the right database and technology to prove the work and results.”</p>'+ 
    '                      <p class="fe-sub-note">LAUREN SLY, VICE PRESIDENT OF PROGRAMS</p>'+ 
    '                  </div>'+ 
    '              </div>'+ 
    '          </li>'+ 
    '          <li class="menu-item menu-item-type-post_type menu-item-object-page depth-1  menu-item-has-children fe-products">'+ 
    '              <a href="https://www.socialsolutions.com/products/" tabindex="0">'+ 
    '                  <div class="title-description">Products</div>'+ 
    '              </a>'+ febutton +
    '              <div class="sub-menu depth-2">'+ 
    '                  <ul>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/products/apricot-360/" tabindex="0">'+ 
    '                              <div class="title-description">Apricot 360</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/products/apricot-essentials/" tabindex="0">'+ 
    '                              <div class="title-description">Apricot Essentials</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/products/apricot-core/" tabindex="0">'+ 
    '                              <div class="title-description">Apricot Core</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/products/penelope/" tabindex="0">'+ 
    '                              <div class="title-description">Penelope</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/products/eto/" tabindex="0">'+ 
    '                              <div class="title-description">ETO</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                  </ul>'+ 
    '                  <div class="fe-sub-side">'+ 
    '                      <img src="https://www.socialsolutions.com/wp-content/uploads/2021/03/Global_Footer-576x427.png" alt="Global_Footer">'+ 
    '                      <h2 class="fe-sub-heading">Apricot 360®</h2>'+ 
    '                      <p class="fe-sub-para">Accelerate change with our most comprehensive case management solution.</p>'+ 
    '                      <p class="fe-sub-note"><a href="https://www.socialsolutions.com/products/apricot-360/" class="fe-link">Learn More</a></p>'+ 
    '                  </div>'+ 
    '              </div>'+ 
    '          </li>'+ 
    '          <li class="menu-item menu-item-type-post_type menu-item-object-page depth-1  menu-item-has-children fe-solutions">'+ 
    '              <a href="https://www.socialsolutions.com/solutions/" tabindex="0">'+ 
    '                  <div class="title-description">Solutions</div>'+ 
    '              </a>'+ febutton +
    '              <div class="sub-menu depth-2">'+ 
    '                  <ul>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/solutions/case-management/" tabindex="0">'+ 
    '                              <div class="title-description">Case Management</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/solutions/community-network/" tabindex="0">'+ 
    '                              <div class="title-description">Community Network</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/solutions/participant-connection/" tabindex="0">'+ 
    '                              <div class="title-description">Participant Connection</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/solutions/data-analytics/" tabindex="0">'+ 
    '                              <div class="title-description">Data Analytics</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/solutions/security/" tabindex="0">'+ 
    '                              <div class="title-description">Security</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/solutions/everyaction-fundraising-crm/" tabindex="0">'+ 
    '                              <div class="title-description">Fundraising + CRM</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                  </ul>'+ 
    '                  <div class="fe-sub-side">'+ 
    '                      <img src="https://trial.socialsolutions.com/static/media/Apricot_360_worker.8d99679e.png" alt="Apricot_360_worker">'+ 
    '                      <h2 class="fe-sub-heading">Case Management Software Solutions</h2>'+ 
    '                      <p class="fe-sub-para">Our product portfolio is built to solve your most pervasive problems.</p>'+ 
    '                      <p class="fe-sub-note"><a href="https://www.socialsolutions.com/solutions/case-management/" class="fe-link">Learn More</a></p>'+ 
    '                  </div>'+ 
    '              </div>'+ 
    '          </li>'+ 
    '          <li class="menu-item menu-item-type-post_type menu-item-object-page depth-1  menu-item-has-children fe-packages">'+ 
    '              <a tabindex="0">'+ 
    '                  <div class="title-description">Packages</div>'+ 
    '              </a>'+ febutton +
    '              <div class="sub-menu depth-2">'+ 
    '                  <ul>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/products/apricot-essentials/" tabindex="0">'+ 
    '                              <div class="title-description logo_apricot_essentials"><img src="https://www.socialsolutions.com/wp-content/uploads/2021/03/Logo_Apricot_essentials-1-150x63.png" alt="Logo_Apricot_essentials"> Break free from spreadsheets and simplify with case management software.</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/products/apricot-core/" tabindex="0">'+ 
    '                              <div class="title-description logo_core"><img src="https://www.socialsolutions.com/wp-content/uploads/2021/03/Logo_Core-768x292.png">Increase engagement and streamline communication with the people you serve.</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/products/apricot-360/" tabindex="0">'+ 
    '                              <div class="title-description logo_apricot_360"><img src="https://www.socialsolutions.com/wp-content/uploads/2021/03/Logo_Apricot_360-1-150x63.png" alt="Logo_Apricot_360">Get a complete view and accelerate impact in your community.</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/packages/" tabindex="0">'+ 
    '                              <div class="title-description">Explore packages</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                  </ul>'+ 
    '              </div>'+ 
    '          </li>'+ 
    '          <li class="menu-item menu-item-type-post_type menu-item-object-page depth-1  menu-item-has-children fe-support">'+ 
    '              <a tabindex="0">'+ 
    '                  <div class="title-description">Support</div>'+ 
    '              </a>'+ febutton +
    '              <div class="sub-menu depth-2">'+ 
    '                  <ul class="fe-services">'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/services-support/" tabindex="0">'+ 
    '                              <div class="title-description">Services + Support</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/services-support/implementation-services/" tabindex="0">'+ 
    '                              <div class="title-description">Implementation Services</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/services-support/training/" tabindex="0">'+ 
    '                              <div class="title-description">Training</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/services-support/support/" tabindex="0">'+ 
    '                              <div class="title-description">Support</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                  </ul>'+ 
    '                  <ul class="fe-partnership">'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a tabindex="0">'+ 
    '                              <div class="title-description">Partnerships</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/ballmer-group/" tabindex="0">'+ 
    '                              <div class="title-description">Ballmer Group</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/implementation-partners/" tabindex="0">'+ 
    '                              <div class="title-description">Implementation Partners</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://landing.socialsolutions.com/client-recommendation-program.html" tabindex="0">'+ 
    '                              <div class="title-description">Referral Partners</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/resellers/" tabindex="0">'+ 
    '                              <div class="title-description">Partner Resellers</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/data-driven-champions/" tabindex="0">'+ 
    '                              <div class="title-description">Data-Driven Champions</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                  </ul>'+ 
    '              </div>'+ 
    '          </li>'+ 
    '          <li class="menu-item menu-item-type-post_type menu-item-object-page depth-1  menu-item-has-children fe-about-us">'+ 
    '              <a tabindex="0">'+ 
    '                  <div class="title-description">About Us</div>'+ 
    '              </a>'+ febutton + 
    '              <div class="sub-menu depth-2">'+ 
    '                  <ul>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/story-mission/" tabindex="0">'+ 
    '                              <div class="title-description">Story + Mission</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/impact-report-2020/" tabindex="0">'+ 
    '                              <div class="title-description">Impact Report</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/our-people/" tabindex="0">'+ 
    '                              <div class="title-description logo_apricot_360">Our People</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/culture-careers/" tabindex="0">'+ 
    '                              <div class="title-description">Culture + Careers</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/news-press/" tabindex="0">'+ 
    '                              <div class="title-description">News + Press</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://www.socialsolutions.com/contact-us/" tabindex="0">'+ 
    '                              <div class="title-description">Contact Us</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
        '                      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item">'+ 
    '                          <a href="https://landing.socialsolutions.com/apricot-referral-network-availability.html" tabindex="0">'+ 
    '                              <div class="title-description">Join the Network</div>'+ 
    '                          </a>'+ 
    '                      </li>'+ 
    '                  </ul>'+ 
    '              </div>'+ 
    '          </li>'+ 
    '          <li class="menu-item menu-item-type-post_type menu-item-object-page depth-1 fe-blog">'+ 
    '              <a href="https://www.socialsolutions.com/blog/" tabindex="0">'+ 
    '                  <div class="title-description">Blog</div>'+ 
    '              </a>'+ 
    '          </li>'+ 
    '          <li class="menu-item menu-item-type-post_type menu-item-object-page depth-1 fe-search">'+ 
    '          </li>'+ 
    '          <li class="menu-item menu-item-type-post_type menu-item-object-page depth-1 fe-login">'+ 
    '              <a href="https://www.socialsolutions.com/login/" tabindex="0">'+ 
    '                  <div class="title-description">Login</div>'+ 
    '              </a>'+ 
    '          </li>'+ 
    '          <li class="menu-item menu-item-type-post_type menu-item-object-page depth-1 fe-demo">'+ 
    '              <a href="https://www.socialsolutions.com/request-a-demo/" tabindex="0">'+ 
    '                  <div class="title-description">Request a demo</div>'+ 
    '              </a>'+ 
    '          </li>'+ 
    '      </ul>';

    var feDesktopMenu =''+ 
    '  <div class="fe-header-primary">'+ 
    feMenu
    '  </div>';

    var helper = _$();
    /* Variation Init */

    function init() {

      _$('body').addClass(variation_name)

      document.querySelector('.desktop-nav .header-primary').insertAdjacentHTML('afterend', feDesktopMenu)

      document.querySelector('.desktop-nav .fe-search').insertAdjacentElement('beforeend', document.querySelector('.desktop-nav .menu-search-form'));

      _$('.mobile-nav .menu-container .header-primary').html(feMenu);
      

      var menuLinks = document.querySelectorAll('#mobile-main-menu .dropdown');

      menuLinks.forEach(function(menuLink) {
        menuLink.addEventListener('click', function() {
          var expanded = menuLink.getAttribute('aria-expanded');
      
          if (expanded === 'false') {
            menuLink.classList.add('opened');
            menuLink.setAttribute('aria-expanded', 'true');
          } else if (expanded === 'true') {
            menuLink.classList.add('closed');
            menuLink.setAttribute('aria-expanded', 'false');
          }
        });
      });
        



      var desktopWhoWeserve = 0;
      var desktopSolutions = 0;
      var desktopProducts = 0;
      var desktopPackages = 0;
      var desktopSupportServices = 0;
      var desktopBlogResources = 0;
      var desktopAboutUs = 0;
      
      var desktopProductsSpotlightLearnMore = 0;
      var desktopSolutionsSpotlightLearnMore = 0;

      // Desktop Goals
      live('.desktop-nav .menu .menu-item.fe-who-we-serve','mouseover',function(){
        if(desktopWhoWeserve == 0){
          trackGAEvent('funnelenvy','hover','Who we serve');
          desktopWhoWeserve = 1;
        }
        
      });
      live('.desktop-nav .menu .menu-item.fe-products','mouseover',function(){
        if(desktopProducts == 0){
          trackGAEvent('funnelenvy','hover','Products');
          desktopProducts = 1;
        }
        
      });
      live('.desktop-nav .menu .menu-item.fe-solutions','mouseover',function(){
        if(desktopSolutions == 0){
          trackGAEvent('funnelenvy','hover','Solutions');
          desktopSolutions = 1;
       }
        
      });
      live('.desktop-nav .menu .menu-item.fe-packages','mouseover',function(){
        if(desktopPackages == 0){
          trackGAEvent('funnelenvy','hover','Packages');
          desktopPackages = 1;
     }
        
      });
      live('.desktop-nav .menu .menu-item.fe-support','mouseover',function(){
        if(desktopSupportServices == 0){     
          trackGAEvent('funnelenvy','hover','Support/ Services + Support');
          desktopSupportServices = 1;
        }
        
      });
      live('.desktop-nav .menu .menu-item.fe-blog','mouseover',function(){
        if(desktopBlogResources == 0){      
          trackGAEvent('funnelenvy','hover','Blog/Resources');
          desktopBlogResources = 1;
      }
        
      });
      live('.desktop-nav .menu .menu-item.fe-about-us','mouseover',function(){
        if(desktopAboutUs == 0){      
          trackGAEvent('funnelenvy','hover','About Us');
          desktopAboutUs = 1;
        }
        
      });

      live('.desktop-nav .fe-products .fe-link','click',function(){
        if(desktopProductsSpotlightLearnMore == 0){      
          trackGAEvent('funnelenvy','click','Products spotlight Learn more');
          
          desktopProductsSpotlightLearnMore = 1;
        }        
      });

      live('.desktop-nav .fe-solutions .fe-link','click',function(){
        if(desktopSolutionsSpotlightLearnMore == 0){      
          trackGAEvent('funnelenvy','click','Solutions spotlight Learn more');
          
          desktopSolutionsSpotlightLearnMore = 1;
        }        
      });
      


      var mobleWhoWeserve = 0;
      var mobleSolutions = 0;
      var mobleProducts = 0;
      var moblePackages = 0;
      var mobleSupportServices = 0;
      var mobleBlogResources = 0;
      var mobleAboutUs = 0;
      var mobleLogin = 0;
      var mobleRequestDemo = 0;


      //Mobile Goals
      live('.mobile-nav .menu .menu-item.fe-who-we-serve .dropdown','click',function(){
        if(mobleWhoWeserve == 0){      
          trackGAEvent('funnelenvy','click','Who we serve')
          mobleWhoWeserve = 1;
        }
      })
      live('.mobile-nav .menu .menu-item.fe-products .dropdown','click',function(){
        if(mobleProducts == 0){      
          trackGAEvent('funnelenvy','click','Products')
          mobleProducts = 1;
        }
      })
      live('.mobile-nav .menu .menu-item.fe-solutions .dropdown','click',function(){
        if(mobleSolutions == 0){      
          trackGAEvent('funnelenvy','click','Solutions')
         mobleSolutions = 1;
       }
      })
      live('.mobile-nav .menu .menu-item.fe-packages .dropdown','click',function(){
        if(moblePackages == 0){      
          trackGAEvent('funnelenvy','click','Packages')
          moblePackages = 1;
      }
      })
      live('.mobile-nav .menu .menu-item.fe-support .dropdown','click',function(){
        if(mobleSupportServices == 0){      
          trackGAEvent('funnelenvy','click','Support/ Services + Support')
          mobleSupportServices = 1;
        }
      })
      live('.mobile-nav .menu .menu-item.fe-blog','click',function(){
        if(mobleBlogResources == 0){      
          trackGAEvent('funnelenvy','click','Blog/Resources')
          mobleBlogResources = 1;
        }
      })
      live('.mobile-nav .menu .menu-item.fe-about-us .dropdown','click',function(){
        if(mobleAboutUs == 0){      
          trackGAEvent('funnelenvy','click','About Us')
          mobleAboutUs = 1;
       }
      })
      live('.mobile-nav .menu .menu-item.fe-login','click',function(){
        if(mobleLogin == 0){      
          trackGAEvent('funnelenvy','click','Login')
          mobleLogin = 1;
        }
      })
      live('.mobile-nav .menu .menu-item.fe-demo','click',function(){
        if(mobleRequestDemo == 0){       
          trackGAEvent('funnelenvy','click','Request Demo')
          mobleRequestDemo = 1;
         }
      })


            
    }


    function trackGAEvent(eventCategory, eventAction, eventLabel) {
      if ('ga' in window) {
        ga.getAll()[0].send('event', {
          eventCategory: eventCategory,
          eventAction: eventAction,
          eventLabel: eventLabel,
        });
      }
    }

    /* Initialize variation */
    helper.waitForElement(".mobile-nav .header-primary", init, 50, 25000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();