(function () {
  try {
    /* main variables */
    var FEHelper = this;
    var debug = 0;
    var variation_name = "";

    /* all Pure helper functions */

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

    function waitForjQuery(trigger, delayInterval, delayTimeout) {
      if (!delayInterval) {
        delayInterval = 30;
      }

      if (!delayTimeout) {
        delayTimeout = 15000;
      }
      var interval = setInterval(function () {
        if (window.jQuery !== undefined) {
          clearInterval(interval);
          trigger(window.jQuery);
        }
      }, delayInterval);
      setTimeout(function () {
        clearInterval(interval);
      }, delayTimeout);
    }
    FEHelper.after = function (reference_selector, htmlString) {
      var reference_element = document.querySelectorAll(reference_selector);
      for (var i = 0; i < reference_element.length; i++) {
        reference_element[i].insertAdjacentHTML("afterend", htmlString);
      }
    };
    FEHelper.createElement = function (elementName, htmlString) {
      var el = document.createElement(elementName);
      el.innerHTML = htmlString;
      return el;
    };
    function init() {
      var navHTML =
        "" +
        '      <li id="Advertising_nav_parent" class="menu-item dropdown nav-item "><a class="nav-link">Advertising</a>' +
        '          <div id="Advertising_dropdown" class="submenu">' +
        '               <ul class="dropdown-list">' +
        '                   <li class="dl-item"><a href="https://www.sovrn.com/advertising-tools/" class="dd-link">Exchange</a>' +
        "                   </li>" +
        '                   <li class="dl-item"><a href="https://www.sovrn.com/publishers/managed-services/" class="dd-link">Managed Services</a></li>' +
        '                   <li class="dl-item"><a href="https://www.sovrn.com/advertisers/" class="dd-link">Buyers</a></li>' +
        "               </ul>" +
        "          </div>" +
        "      </li>" +
        '      <li  id="Commerce_nav_parent" class="menu-item dropdown nav-item"><a class="nav-link">Commerce</a>' +
        '          <div id="Commerce-dropdown" class="submenu">' +
        '              <ul class="dropdown-list">' +
        '                  <li class="dl-item"><a href="https://www.sovrn.com/publishers/commerce/" class="dd-link">Affiliate Marketing</a></li>' +
        '                  <li class="dl-item"><a href="https://www.sovrn.com/price-merchant-comparisons/" class="dd-link">Comparisons</a></li>' +
        '                  <li class="dl-item"><a href="https://www.sovrn.com/shopping-galleries/" class="dd-link">Shopping Galleries</a></li>' +
        '                  <li class="dl-item"><a href="https://www.sovrn.com/advertisers/" class="dd-link">Merchants</a></li>' +
        "               </ul>" +
        "          </div>" +
        "      </li>" +
        '      <li id="Data_nav_parent" class="menu-item dropdown nav-item"><a class="nav-link">Data</a>' +
        '          <div id="Data-dropdown" class="submenu">' +
        '              <ul class="dropdown-list">' +
        '                 <li class="dl-item"><a href="https://www.sovrn.com/publishers/signal/" class="dd-link">Signal</a></li>' +
        '                 <li class="dl-item"><a href="https://www.sovrn.com/publishers/data/" class="dd-link">Data Monetization</a></li>' +
        '                 <li class="dl-item"><a href="https://www.sovrn.com/audiences-deals-data/" class="dd-link">Audiences and Data</a></li>' +
        "              </ul>" +
        "          </div>" +
        "      </li>";

      var Datanav =
        "" +
        '          <li id="menu-item-16432" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-16432">' +
        '              <a href="https://www.sovrn.com/publishers/signal/ class=" menu-image-title-after="" menu-image-hovered "=" ">' +
        '                  <span class=" menu-image-title-after menu-image-title ">Signal</span></a>' +
        "          </li>" +
        '          <li id=" menu-item-16438 " class=" menu-item menu-item-type-post_type menu-item-object-page menu-item-16438 ">' +
        '                  <a href=" https://www.sovrn.com/publishers/data/ " class=" menu-image-title-after menu-image-hovered ">' +
        '                  <span class=" menu-image-title-after menu-image-title ">Data Monetization</span></a>' +
        "          </li> " +
        '          <li id=" menu-item-16435 " class=" menu-item menu-item-type-post_type menu-item-object-page menu-item-16435 ">' +
        '                  <a href="https://www.sovrn.com/audiences-deals-data/" class=" menu-image-title-after menu-image-hovered ">' +
        '                  <span class=" menu-image-title-after menu-image-title ">Audiences and Data</span>' +
        "              </a>" +
        "          </li>";

      var Advertising =
        "" +
        '  <li class="dl-item"><a href="https://www.sovrn.com/advertising-tools/" class="dd-link">Exchange</a></li>' +
        '  <li class="dl-item"><a href="https://www.sovrn.com/publishers/managed-services/" class="dd-link">Managed Services</a></li>' +
        '  <li class="dl-item"><a href="https://www.sovrn.com/advertisers/" class="dd-link">Buyers</a></li>';

      var Commerce =
        "" +
        '  <li class="menu-item menu-item-type-post_type menu-item-object-page"><a href="https://www.sovrn.com/publishers/commerce/ class="menu-image-title-after menu-image-hovered"><span class="menu-image-title-after menu-image-title">Affiliate Marketing</span></a></li>' +
        '  <li class="menu-item menu-item-type-post_type menu-item-object-page"><a href="https://www.sovrn.com/price-merchant-comparisons/" class="menu-image-title-after menu-image-hovered"><span class="menu-image-title-after menu-image-title">Comparisons</span></a></li>'+
        '  <li class="menu-item menu-item-type-post_type menu-item-object-page"><a href="https://www.sovrn.com/shopping-galleries/" class="menu-image-title-after menu-image-hovered"><span class="menu-image-title-after menu-image-title">Shopping Galleries</span></a></li>'+
        '  <li class="menu-item menu-item-type-post_type menu-item-object-page"><a href="https://www.sovrn.com/advertisers/" class="menu-image-title-after menu-image-hovered"><span class="menu-image-title-after menu-image-title">Merchant</span></a></li>';
         
        var companydropdownHTML =''+ 
        '  <ul class="dropdown-list">'+ 
        '      <li class="dl-item"><a href="https://www.sovrn.com/company/" class="dd-link waves-effect waves-light">About Sovrn</a></li>'+ 
        '      <li class="dl-item"><a href="https://www.sovrn.com/blog/" class="dd-link waves-effect waves-light">Blog</a></li>'+ 
        '      <li class="dl-item"><a href="https://www.sovrn.com/careers/" class="dd-link waves-effect waves-light">Careers</a></li>'+ 
        '      <li class="dl-item"><a href="https://www.sovrn.com/company/press-kit/" class="dd-link waves-effect waves-light">Press</a></li>'+ 
        '  </ul>';

      document
        .querySelector(".navbar div#navbarNavDropdown ul.navbar-nav")
        .insertAdjacentHTML("afterbegin", navHTML);
      FEHelper.createElement("li", Datanav);
      //FEHelper.after('#menu-item-16451', Datanav);
      document.querySelector('#company_dropdown').innerHTML = companydropdownHTML;
      document.querySelector("#menu-mobile-navigation li a").innerHTML =
        "Advertising";
      document.querySelector(
        "#menu-mobile-navigation > li:nth-child(2) > a"
      ).innerHTML = "Commerce";

      document.querySelector(
        "#menu-mobile-navigation li:first-child .sub-menu"
      ).innerHTML = Advertising;
      document.querySelector(
        "#menu-mobile-navigation > li:nth-child(2) .sub-menu"
      ).innerHTML = Commerce;

      waitForjQuery(function () {
        var $ = window.jQuery;
        $("#menu-item-16451")
          .clone(true)
          .insertAfter("#menu-item-16451")
          .attr("id", "menu-item-16488");
        $("#menu-item-16488 ul").html(Datanav);
        $("#menu-item-16488 > a").html("data");
      });
    }
    waitForElement(
      "#menu-mobile-navigation li:nth-child(2) a , #menu-mobile-navigation > li:nth-child(3) .sub-menu ",
      init,
      50,
      15000
    );
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
