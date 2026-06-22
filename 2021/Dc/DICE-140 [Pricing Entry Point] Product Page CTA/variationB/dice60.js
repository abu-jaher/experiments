(function () {
  var FEHelper = {
    onLoadElement: function (selector, trigger, delayInterval, delayTimeout) {
      var interval = setInterval(function () {
        if (
          document &&
          document.querySelectorAll(selector) &&
          document.querySelectorAll(selector).length > 0 &&
          document.querySelector('dhi-seds-nav-header-employer') &&
          document.querySelector('dhi-seds-nav-header-employer').shadowRoot &&
          document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display') &&
          document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot &&
          document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelector('.logo') &&
          document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelector('nav') &&
          document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelector('nav li a')

        ) {
          clearInterval(interval);
          trigger();
        }
      }, delayInterval);
      setTimeout(function () {
        clearInterval(interval);
      }, delayTimeout);
    }
  };

  // json object for displaying dynamic navbar title and CTA
  var stickyNavbarData = {
    "/hiring": {
      text: "Dice is the leading career destination for tech experts at every stage of their career",
      CTA: "Connect With Talent",
      link: "https://www.dice.com/hiring/contact-us/"
    },
    "/hiring/virtual-career-events": {
      text: "Dice is the leading career destination for tech experts at every stage of their career",
      CTA: "Connect With Talent",
      link: "https://www.dice.com/hiring/contact-us/"
    },
    "/hiring/find-candidates": {
      text: "Dice is the leading career destination for tech experts at every stage of their career",
      CTA: "Connect With Talent",
      link: "https://www.dice.com/hiring/contact-us/"
    },
    "/hiring/post-jobs": {
      text: "Reach a database of 6.8M Dice members",
      CTA: "Post open jobs",
      link: "https://www.dice.com/products/webstore"
    },
    "/hiring/post-jobs/": {
      text: "Reach a database of 6.8M Dice members",
      CTA: "Post open jobs",
      link: "https://www.dice.com/products/webstore"
    },
    "/hiring/employer-brand": {
      text: "Attract the attention of Dice’s 1.6M unique monthly visitors",
      CTA: "Boost your visibility",
      link: "https://www.dice.com/hiring/contact-us/",
    },
    "/hiring/employer-brand/": {
      text: "Attract the attention of Dice’s 1.6M unique monthly visitors",
      CTA: "Boost your visibility",
      link: "https://www.dice.com/hiring/contact-us/",
    },
    "/hiring/sourcing-services": {
      text: "Find and connect quickly with millions of unique, qualified and engaged technologists",
      CTA: "Source talent",
      link: "https://www.dice.com/hiring/contact-us/",
    },
    "/hiring/sourcing-services/": {
      text: "Find and connect quickly with millions of unique, qualified and engaged technologists",
      CTA: "Source talent",
      link: "https://www.dice.com/hiring/contact-us/",
    },
    "/hiring/recruitment-services": {
      text: "Let Dice simplify the recruiting process and save you time with our expert Recruitment Services",
      CTA: "Find talent quickly",
      link: "https://www.dice.com/hiring/contact-us/",
    },
    "/hiring/recruitment-services/": {
      text: "Let Dice simplify the recruiting process and save you time with our expert Recruitment Services",
      CTA: "Find talent quickly",
      link: "https://www.dice.com/hiring/contact-us/",
    }
  };

  var buttonStyle = '' +
    '<style>' +
    '.fe-nav-btn{' +
    'border: 1px solid #fff;' +
    'border-radius: 50px;' +
    'color: #fff;' +
    'margin: auto;' +
    'padding: 0.58rem 1rem !important;' +
    'text-decoration: none; ' +
    'position: absolute;' +
    'left: 50%; ' +
    'top: 50%; ' +
    'transform: translate(-50%, -50%)' +
    '}' +
    'nav.open .fe-nav-btn{' +
    '  display: none;' +
    '}' +
    'nav.close .small-menu > a{' +
    '  display: none;' +
    '}' +
    '@media screen and (min-width: 1200px) {' +
    '  .fe-nav-btn{' +
    '    display: none;' +
    '  }' +
    '}' +
    '</style>';

  function init() {
    //sticky CTA replacement for desktop view
    document.body.classList.add('fe_140-control');
    document.querySelector('dhi-seds-nav-header-employer.hydrated').parentElement.classList.add('fe_default_nav');

    document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelector('.logo').setAttribute('href', '/hiring');

    //sticky CTA replacement for mobile view
    if (!document.querySelector('.fe-nav-btn')) {
      var mobileData = stickyNavbarData[window.location.pathname];
      document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelector('.logo').insertAdjacentHTML('afterend', '<a href="' + mobileData.link + '" class="btn fe-nav-btn">' + mobileData.CTA + '</a>');
      document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelector('nav').insertAdjacentHTML('afterend', buttonStyle);
      var mobileToggle = document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelector('nav .links-toggle');
      mobileToggle.addEventListener('click', function () {
        document.querySelector('.fe_default_nav').classList.toggle('navOpen');
        window.scrollTo(0, 0)
      })
    }

    subPagesNav();

    var isResizing = false;

    window.addEventListener('resize', function () {
      if (!isResizing) {
        // User is actively resizing the window
        subPagesNav();
      }
    });

    window.addEventListener('mousedown', function () {
      isResizing = true;
    });

    window.addEventListener('mouseup', function () {
      isResizing = false;
    });

    document.addEventListener('click', (e) => {
      const el = e.target;
      if (el.closest('.fe-nav-content a')) {
        dataLayer.push({ 'event': 'FE_ABTest_sticky_nav_CTA_click' });
      }
    });

  }

  function subPagesNav() {
    if (window.innerWidth > 1199) {
      dropdownOptionFn();
      if (document.querySelector('.fe-nav')) return;
      var navSection = getNavSection(stickyNavbarData[window.location.pathname]); //getting the keypaths and json objects
      document.querySelector('dhi-seds-nav-header-employer.hydrated').parentElement.insertAdjacentHTML('beforeend', navSection);

      //show sticky navbar when scrolling down and change to base nav-bar when scrolling up
      var lastScroll = 0;
      var flag = true;
      window.addEventListener('scroll', function () {
        var currentScroll = window.pageYOffset;
        if (lastScroll <= currentScroll) {
          lastScroll = currentScroll;
          if (window.pageYOffset > 400 && flag) {
            document.querySelector('dhi-seds-nav-header-employer.hydrated').parentElement.classList.add('fe-nav-alt');
          } else {
            document.querySelector('dhi-seds-nav-header-employer.hydrated').parentElement.classList.remove('fe-nav-alt');
          }
          if (window.pageYOffset <= 400) {
            flag = true;
          }
        } else {
          lastScroll = currentScroll;
          document.querySelector('dhi-seds-nav-header-employer.hydrated').parentElement.classList.remove('fe-nav-alt');
          flag = false;
        }
      })
    } else {
      document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelector('.dropdown-menu') ?
        document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelector('.dropdown-menu').style.cssText = 'position: inherit; top: 54px; right: auto; left: auto; width: initial; min-width: auto;' : '';

      document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelectorAll('.dropdown-menu')[1] ?
        document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelectorAll('.dropdown-menu')[1].style.cssText = 'position: inherit; top: 54px; right: auto; left: auto; width: initial; min-width: auto;' : '';
    }
  }

  // new dynamic content for scroll down navbar
  function getNavSection(data) {
    var altNavHTML = '' +
      '  <div class="fe-nav">' +
      '      <div class="fe-nav-content">' +
      '          <p>' + data.text + '</p>' +
      '          <a href="' + data.link + '" class="btn btn-primary">' + data.CTA + '</a>' +
      '      </div>' +
      '  </div>';
    return altNavHTML;
  }

  function dropdownOptionFn() {
    document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelector('.dropdown-menu') ?
      document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelector('.dropdown-menu').style.cssText = 'position: fixed; top: 54px; right: auto; left: auto; width: 193px; min-width: auto;' : '';

    document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelectorAll('.dropdown-menu')[4] ?
      document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelectorAll('.dropdown-menu')[4].style.cssText = 'position: fixed; top: 54px; right: auto; left: auto; width: 197px; min-width: auto; transform: translateX(-63px);' : '';

    document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelectorAll('.dropdown-menu')[3] ?
      document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelectorAll('.dropdown-menu')[3].style.cssText = 'position: fixed; top: 54px; right: auto; left: auto; width: 181px; min-width: auto;' : '';

    document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelectorAll('.dropdown-menu')[2] ?
      document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelectorAll('.dropdown-menu')[2].style.cssText = 'position: fixed; top: 54px; right: auto; left: auto; width: 193px; min-width: auto;' : '';

    document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelectorAll('.dropdown-menu')[1] ?
      document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelectorAll('.dropdown-menu')[1].style.cssText = 'position: fixed; top: 54px; right: auto; left: auto; width: 156px; min-width: auto;' : '';
  }

  if (stickyNavbarData[window.location.pathname] != undefined) {
    FEHelper.onLoadElement('dhi-seds-nav-header-employer.hydrated', init, 50, 10000);
  }

  FEHelper.onLoadElement('dhi-seds-nav-header-employer.hydrated', function () {
    if (window.location.pathname.indexOf('/hiring') > -1 || window.location.pathname.indexOf('/recruiting') > -1) {
      document.querySelector('dhi-seds-nav-header-employer').shadowRoot.querySelector('dhi-seds-nav-header-display').shadowRoot.querySelector('.logo').setAttribute('href', '/hiring');
    }
  }, 50, 10000);

})();