(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "USCREEN-7 -Nav-Simplified What You Get";

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
        insertAfter: function (v) {
          return this.each(function (i) {
            i.insertAdjacentHTML("afterEnd", v);
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

    var dropdownHtml =
      "" +
      '  <div class="fe-container-uscreen-7">' +
      '   <div class="container">' +
      '      <div class="fe-main-nav-dropdown">' +
      '          <div class="fe-dropdown-blocks">' +
      "  " +
      '              <a href="https://www.uscreen.tv/video-cms-b/" class="dropdown-block fe-link_one">' +
      '                  <span class="dropdown-block-heading">' +
      "                      <span>" +
      '                          <svg width="20" height="20" fill="none">' +
      '                              <use xlink:href="#video-cms-icon"></use>' +
      "                          </svg>" +
      "                      </span>Video Content Management" +
      "                  </span>" +
      '                  <span class="dropdown-block-description">' +
      "                      Build your own Netflix-style video catalog exactly the way you want it, customized on your own professionally branded website." +
      "                  </span>" +
      "              </a>" +
      "  " +
      '              <a href="https://www.uscreen.tv/video-monetization-b/" class="dropdown-block fe-link_two">' +
      '                  <span class="dropdown-block-heading">' +
      "                      <span>" +
      '                          <svg width="20" height="20" fill="none">' +
      '                              <use xlink:href="#video-monetization-icon"></use>' +
      "                          </svg>" +
      "                      </span>Video Monetization" +
      "                  </span>" +
      '                  <span class="dropdown-block-description">' +
      "                      Earn more using predictable revenue streams you own with easily customizable pricing and reliable payment methods. All without paying hefty transaction fees." +
      "                  </span>" +
      "              </a>" +
      "  " +
      '              <a href="https://www.uscreen.tv/video-marketing-tools-b/" class="dropdown-block fe-link_three">' +
      '                  <span class="dropdown-block-heading">' +
      "                      <span>" +
      '                          <svg width="20" height="20" fill="none">' +
      '                              <use xlink:href="#video-marketing-tools-icon"></use>' +
      "                          </svg>" +
      "                      </span>Marketing Tools & Analytics" +
      "                  </span>" +
      '                  <span class="dropdown-block-description">' +
      "                      Grow your business by engaging your users to build true fans using our robust but intuitive marketing tools and customer data that you own." +
      "                  </span>" +
      "              </a>" +
      "          </div>" +
      "      </div>" +
      '      <div class="fe-main-nav-dropdown-bottom">' +
      '          <a href="https://www.uscreen.tv/on-demand-demo/" class="fe-learn-item">' +
      '              <span class="fe-learn-item-img-container">' +
      "  " +
      '                  <img src="https://www.uscreen.tv/wp-content/uploads/2021/06/uscreen-demo-video-hd-564x440.png"' +
      '                      srcset="https://www.uscreen.tv/wp-content/uploads/2021/06/uscreen-demo-video-hd.png 564w, https://www.uscreen.tv/wp-content/uploads/2021/06/uscreen-demo-video-hd-300x234.png 300w"' +
      '                      sizes="(max-width: 564px) 100vw, 564px" alt="Watch Uscreen\'s on-demand demo video" loading="lazy">' +
      "  " +
      "              </span>" +
      "          </a>" +
      '          <a href="https://www.uscreen.tv/plus/" class="fe-learn-item">' +
      '              <span class="fe-learn-item-img-container">' +
      '                  <img src="https://www.uscreen.tv/wp-content/uploads/2021/10/uscreenplus-hd-564x440.png"' +
      '                      srcset="https://www.uscreen.tv/wp-content/uploads/2021/10/uscreenplus-hd.png 564w, https://www.uscreen.tv/wp-content/uploads/2021/10/uscreenplus-hd-300x234.png 300w, https://www.uscreen.tv/wp-content/uploads/2021/10/uscreenplus-hd-150x117.png 150w"' +
      '                      sizes="(max-width: 564px) 100vw, 564px" alt="Power Up Your Video Business with UscreenPlus"' +
      '                      loading="lazy">' +
      "              </span>" +
      "          </a>" +
      "      </div>" +
      "   </div>" +
      "  </div>";

    var newNavItem =
      "" +
      '  <li class="main-nav-item fe-mobile-tv-nav">' +
      '      <a href="https://www.uscreen.tv/ott-platform/" class="main-nav-item-link">Mobile & TV Apps</a>' +
      "  </li>";

    var helper = _$();
    /* Variation Init */
    function init() {
      // add a class
      _$("body").addClass("fe-uscreen7");
      // new dropdown
      _$(
        "header .main-nav-item:first-child .main-nav-dropdown button"
      ).insertAfter(dropdownHtml);
      // new main nav item insert
      _$("header .main-nav-item:first-child").insertAfter(newNavItem);
    }

    /* Initialise variation */
    helper.waitForElement("header .main-nav-item", init, 50, 5000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
