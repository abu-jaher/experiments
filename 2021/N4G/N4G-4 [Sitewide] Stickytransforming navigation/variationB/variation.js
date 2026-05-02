(function () {
  var FEHelper = {
    onLoadElement: function (selector, trigger, delayInterval, delayTimeout) {
      var interval = setInterval(function () {
        if (
          document &&
          document.querySelectorAll(selector) &&
          document.querySelectorAll(selector).length > 0
        ) {
          clearInterval(interval);
          trigger();
        }
      }, delayInterval);
      setTimeout(function () {
        clearInterval(interval);
      }, delayTimeout);
    },
  };

  function live(selector, event, callback, context) {
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
              nodes = (node.parentNode || node.document).querySelectorAll(
                selector
              ),
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

  var altNavHTML =
    "" +
    '  <div class="fe-nav">' +
    '      <div class="fe-nav-content">' +
    "          <p>The only fundraising software that guarantees your nonprofit's success.<br>Get started now for year-end!</p>" +
    '           <div class="fe-tooltip">' +
    '             <div class="fe-ovarlay"></div>' +
    '             <img class="fe-tooltip-img" src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G-4/noun_tooltip_3850057.png">' +
    '              <span class="fe-show-txt" id="fe-show-txt"><p>We guarantee you\'ll<br> raise more in your first<br> year or your money back.<br><br><a href="https://www.networkforgood.com/wp-content/uploads/2020/08/DMS-Performance-Guarantee-April-2020.pdf">Terms and conditions apply</a></p></span>' +
    "           </div>" +
    '          <a href="https://learn.networkforgood.com/demo-request" class="btn btn-primary"><span>Request a Demo</span></a>' +
    "      </div>" +
    "  </div>";

  function init() {
    if (window.screen.width > 1200) {
      document
        .querySelector("header.header .shell")
        .insertAdjacentHTML("beforeend", altNavHTML);
      var lastScroll = 0;
      var flag = true;
      window.addEventListener("scroll", function () {
        var currentScroll = window.pageYOffset;
        if (lastScroll <= currentScroll) {
          lastScroll = currentScroll;
          if (window.pageYOffset > 400 && flag) {
            document
              .querySelector("header.header .shell")
              .classList.add("fe-nav-alt");
          } else {
            document
              .querySelector("header.header .shell")
              .classList.remove("fe-nav-alt");
          }
          if (window.pageYOffset <= 400) {
            flag = true;
          }
        } else {
          lastScroll = currentScroll;
          document
            .querySelector("header.header .shell")
            .classList.remove("fe-nav-alt");
          flag = false;
        }
      });
    } else {
      if (document.querySelector(".fe-nav-btn")) {
        document.querySelector(".fe-nav-btn").remove();
      }
      document
        .querySelector(".header.header .shell .header__inner")
        .insertAdjacentHTML(
          "afterend",
          '<a href="https://learn.networkforgood.com/demo-request" class="btn fe-nav-btn"><span>Get Started</span></a>'
        );
    }

    document
      .querySelector("header.header .shell")
      .insertAdjacentHTML("beforebegin", '<div class="fe-Overlay-N4G4"></div>');

    document
      .querySelector(".fe-tooltip")
      .addEventListener("click", function () {
        document.querySelector("body").classList.toggle("fe-tooltip-show");
      });

    live(".fe-Overlay-N4G4", "click", function () {
      document.querySelector("body").classList.remove("fe-tooltip-show");
    });
  }
  // tooltip function
  // var feTooltip = document.getElementsByClassName("fe-tooltip");
  // feTooltip.addEventListener("onclick", toolClicked);
  // function toolClicked() {
  //   var tooltip = document.querySelector(".fe-show-txt");
  //   tooltip.style.display = "block";
  // }

  //   FEHelper.onLoadElement(
  //     "header.header .shell .fe-nav",
  //     toolClicked,
  //     50,
  //     10000
  //   );
  // }

  FEHelper.onLoadElement("header.header .shell", init, 50, 10000);
})();
