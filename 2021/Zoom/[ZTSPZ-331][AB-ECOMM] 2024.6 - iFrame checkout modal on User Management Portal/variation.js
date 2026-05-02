function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/* eslint-disable */

(function () {

  var shared = {
    ID: "FE-Billing-Checkout-Modal",
    VARIATION: "1",
    CLIENT: "zoom"
  };
  var ID = shared.ID,
    VARIATION = shared.VARIATION;
  var setup = function setup() {
    document.documentElement.classList.add(ID);
    document.documentElement.classList.add("".concat(ID, "-").concat(VARIATION));
  };
  var crossIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n          <mask id=\"mask0_737_7607\" style=\"mask-type:alpha\" maskUnits=\"userSpaceOnUse\" x=\"2\" y=\"2\" width=\"12\" height=\"12\">\n          <path d=\"M2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L7.29289 8L2.14645 13.1464C1.95118 13.3417 1.95118 13.6583 2.14645 13.8536C2.34171 14.0488 2.65829 14.0488 2.85355 13.8536L8 8.70711L13.1464 13.8536C13.3417 14.0488 13.6583 14.0488 13.8536 13.8536C14.0488 13.6583 14.0488 13.3417 13.8536 13.1464L8.70711 8L13.8536 2.85355C14.0488 2.65829 14.0488 2.34171 13.8536 2.14645C13.6583 1.95118 13.3417 1.95118 13.1464 2.14645L8 7.29289L2.85355 2.14645Z\" fill=\"#000001\"/>\n          </mask>\n          <g mask=\"url(#mask0_737_7607)\">\n          <rect width=\"20\" height=\"20\" fill=\"#131619\"/>\n          </g>\n      </svg>";

  //checkout modal - HTML
  var checkoutModal = function checkoutModal() {
    var htmlStr = "\n          <div class=\"".concat(ID, "__checkoutModal\">\n              <div class='").concat(ID, "__modalOverlay'></div>\n              <div class=\"modalContainer\">\n                  <div class='modalContent ").concat(ID, "__checkoutModal-details'></div>\n                  <div class=\"modal__close ").concat(ID, "__modalClose\">").concat(crossIcon, "</div>\n                  <div class=\"").concat(ID, "__loader\"></div>\n              </div>\n          </div>");
    return htmlStr;
  };
  var button = function button(id, title, classes) {
    var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "button";
    var htmlStr = "<button type=\"".concat(type, "\" class=\"").concat(id, "__").concat(classes, " zm-button--small zm-button\">\n              <span class=\"zm-button__slot\"> ").concat(title, " </span>\n          </button>");
    return htmlStr;
  };

  //back button for the modal
  var backBtn = function backBtn(id) {
    return "\n          <button class=\"".concat(id, "__backBtn\">\n              <svg width=\"7\" height=\"11\" viewBox=\"0 0 7 11\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                  <path d=\"M5 1.5L2 5.5L5 9.5\" stroke=\"#666487\" stroke-width=\"2\" stroke-linecap=\"square\"/>\n              </svg>\n              <span>Back</span>\n          </button>");
  };

  //tax exemption HTML
  var taxExemptHTML = function taxExemptHTML(id) {
    return "<p class='".concat(id, "__taxExemption'>Need to buy for multiple users, for educational purposes, or to verify tax exemption?\n          <a>Proceed to checkout</a>\n      </p>");
  };

  //styles for the checkout iframe
  var iframeStyles = function iframeStyles(id) {
    var style = document.createElement("style");
    style.textContent = ".opc-payment-credit__action .opc-payment-credit__action__cancel{width: max-content !important; margin: 0 !important; margin-left: 8px !important} \n .opc-payment-credit__action .is-round{width: max-content !important;} \n .opc-payment-credit__action{flex-direction: row !important; width: 100% !important;} \n .opc-coupon-terms-condition .zm-dialog{height: max-content;} \n   .opc-upgrade-success { opacity: '0'; }  \n              #new_buyflow_header_container, \n              .opc-nav__title,\n              form.zm-form.opc-config-form > div:first-child,\n              .opc-config .opc-cfgcore .opc-cfgcore__addon,\n              .opc-config .opc-cfgcore .opc-tile.opc-addon,\n              .opc-config .opc-cfgcore .opc-cfgcore__addon__toggle,\n              .zone-detail-dialog .zm-dialog__headerbtn,\n              .comparison-dialog .zm-dialog__headerbtn,\n              .opc-address-ttr-tax-exemption,\n              .opc-tile.opc-signing,\n              [data-payment-name=\"us_bank_account\"],\n              #livesdk__campaign,\n              .opc-upgrade-success__content .success-btn-wrap,\n              .".concat(id, "__hide {\n                  display: none !important;\n              }\n              .zm-breadcrumb {\n                  font-family: 'Almaden Sans';\n              }\n              .").concat(id, "__subscriptionCard {\n                  padding: 24px !important;\n              }\n              .opc-zm-base-card__name {\n                  width: auto !important;\n                  font-size: 20px !important;\n                  line-height: 30px !important;\n              }\n              .zm-icon-up::before {\n                  font-size: 16px !important;\n              }\n              .zm-form--label-top .zm-form-item__header .zm-form-item__label {\n                  color: #00031F !important;\n              }\n              .opc-card-radio .opc-zmone__radio-price-unit {\n                  color: #515079 !important;\n              }\n              .opc-layout.opc-page {\n                  height: 100%;\n                  flex-direction: column !important;\n                  padding: 0 !important;\n              }\n              .total-main-content {\n                  height: 100% !important;\n              }\n              body #content_container {\n                  padding: 0 !important;\n                  min-height: 100% !important;\n                  height: 100% !important;\n              }\n              #content_container #content.main-content {\n                  height: 715px;\n              }\n              @media screen and (max-width: 1560px) {\n                #content_container #content.main-content {\n                    height: 615px;\n                }\n              }\n              .opc-nav__main {\n                  margin-left: 0 !important;\n              }\n              .opc-layout__main {\n                  max-width: 656px !important;\n                  padding-top: 32px !important;\n              }\n              .opc-layout__main__inner .opc-layout__action {\n                  margin: 24px 0 0 !important;\n                  width: 240px;\n              }\n              .opc-payment-credit__action, .opc-addr .opc-addr__btn {\n                  width: 240px;\n              }\n              .").concat(id, "__taxExemption {\n                  margin-top: 24px;\n                  font-weight: 500 !important;\n                  font-size: 12px !important;\n                  line-height: 17px !important;\n                  color: #666487 !important;\n                  letter-spacing: 0 !important;\n              }\n              .").concat(id, "__taxExemption a {\n                  line-height: 14px !important;\n                  cursor: pointer;\n              }\n              .opc-layout__action__inner {\n                  text-align: left !important;\n              }\n              .opc-layout__main__inner .opc-layout__action .opc-btn-continue{\n                  width: auto !important;\n              }\n              .opc-drawer__head__slot {\n                  display: flex;\n                  align-items: center;\n              }\n              .mopc-total__content {\n                  font-size: 20px !important;\n              }\n              #the-main-content .opc-layout__main__inner{\n                padding-bottom: 70px;\n              }\n              #the-main-content .opc-addr .opc-addr__btn{\n                width: 100%;\n              }\n              #the-main-content .opc-addr .zm-form-item__content{\n                width: 100%;\n                flex-direction: row;\n              }\n              .opc-drawer__inner {\n                  position: relative;\n                  max-width: 100% !important;\n              }\n              .opc-layout__layer__inner {\n                  height: 78px !important;\n                  position: fixed !important;\n                  background: transparent !important;\n                  bottom: 0;\n              }\n              .opc-drawer__head {\n                  width: 100%;\n                  height: 78px !important;\n                  position: absolute;\n                  background: #F7F7F8;\n                  z-index: 2;\n                  cursor: pointer;\n              }\n              .opc-drawer__body {\n                      bottom: 100%;\n                  position: absolute;\n                  z-index: 1;\n                  box-shadow: none !important;\n                  animation: slide-out-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;\n              }\n              .opc-drawer__body:has(.opc-coupon-form__coupon-code-input) {\n                      bottom: 100%;\n              }\n              .opc-drawer__body:has(.opc-cart__total__tax) {\n                      bottom: 100%;\n              }\n              .opc-drawer__body:has(.opc-coupon-form__coupon-code-input):has(.opc-cart__total__tax) {\n                      bottom: 100%;\n              }\n              .opc-drawer__body:has(.shopping-cart .opc-cart-item .zm-button--link):has(.opc-cart__total__tax) {\n                      bottom: 100%;\n              }\n              .opc-drawer__body:has(.shopping-cart .opc-cart-item .zm-button--link):has(.opc-cart__total__tax):has(.opc-coupon-form__coupon-code-input) {\n                      bottom: 100%;\n              }\n              .zone-detail-dialog .zm-dialog {\n                  width: 100% !important;\n                  height: 100% !important;\n                  padding-left: 50px !important;\n                  margin-top: 0% !important;\n                  margin-bottom: 0% !important;\n              }\n              .zone-detail-dialog .zm-dialog .zm-dialog__body {\n                  scrollbar-width: none;\n                  -ms-overflow-style: none;\n              }\n              .zone-detail-dialog .zm-dialog .zm-dialog__body::-webkit-scrollbar {\n                  display: none;\n              } \n              .comparison-dialog .zm-dialog {\n                  width: 100% !important;\n                  margin-top: 0% !important;\n                  margin-bottom: 0% !important;\n                  height: 100% !important;\n              }\n              .comparison-tree-table-mobile__inside {\n                  scrollbar-width: none;\n                  -ms-overflow-style: none;\n              }\n              .comparison-tree-table-mobile__inside::-webkit-scrollbar {\n                  display: none;\n              } \n              .opc-drawer {\n                  height: 70vh !important;\n                  transition: none !important;\n              }\n              .opc-drawer--open .opc-drawer__body {\n                  animation: slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;\n              }\n  \n              body.origin-header.").concat(id, "__checkoutSuccess #header_container{\n                display: none;\n              }\n  \n              .").concat(id, "__checkoutSuccess .opc-upgrade-success{\n                justify-content: center;\n      opacity: 1;        }\n  \n              .").concat(id, "__checkoutSuccess .opc-upgrade-success__content p{\n                width: 100%;\n                padding: 0px 15px;\n              }\n  \n              .").concat(id, "__checkoutSuccess .opc-upgrade-success__content h1{\n                max-width: 500px;\n                text-align: center;\n                line-height: 1.5;\n              }\n              \n              .").concat(id, "__backBtn {\n                  width: 47px;\n                  display: flex;\n                  justify-content: space-between;\n                  align-items: center;\n                  font-weight: 600;\n                  font-size: 14px;\n                  line-height: 17px;\n                  color: #666487;\n                  border: none;\n                  background: transparent;\n              }\n              .").concat(id, "__taxInfo {\n                  font-size: 12px;\n                  line-height: 15px;\n                  color: #666487;\n              }\n              .").concat(id, "__drawerHeaderTitle {\n                  margin-bottom: 24px;\n                  font-family: 'Almaden Sans';\n                  font-weight: 600 !important;\n                  font-size: 16px !important;\n                  line-height: 24px !important;\n                  color: #00053D !important;\n              }\n              .").concat(id, "__footerLayout--hide {\n                  animation: slide-out-bottom 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;\n              }\n              .").concat(id, "__footerLayout--show {\n                  animation: slide-in-bottom 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;\n              }\n              .").concat(id, "__exploreBtn {\n                  width: 280px;\n                  height: 39px;\n                  font-size: 16px;\n                  line-height: 19px;\n              }\n              .").concat(id, "__exploreBtn .zm-button__slot {\n                  font-size: 16px;\n                  line-height: 19px;\n                  width: auto;\n                  height: auto;\n              }\n  \n              .opc-drawer__body::-webkit-scrollbar-track,\n              .opc-layout__main::-webkit-scrollbar-track\n              {\n                  border-radius: 10px;\n                  background-color: transparent;\n              }\n              .opc-drawer__body::-webkit-scrollbar,\n              .opc-layout__main::-webkit-scrollbar\n              {\n                  width: 8px;\n                  background-color: transparent;\n              }\n              .opc-drawer__body::-webkit-scrollbar-thumb,\n              .opc-layout__main::-webkit-scrollbar-thumb\n              {\n                  border-radius: 14px;\n                  background-color: #E0E0E6;\n              }\n              .zm-form-item.opc-addr__btn {\n                  margin-top: 12px;\n              }\n              #zuora_payment {\n                  max-width: 530px;\n              }\n  \n              @media screen and (max-width: 400px){\n                #the-main-content .opc-addr .zm-form-item__content{\n                  flex-direction: column;\n                }\n              }\n\n              @media screen and (max-width: 1560px) {\n                .opc-drawer {\n                    height: 85vh !important;\n                }\n                .opc-drawer__body {\n                    max-height: 100% !important;\n                }\n                .opc-drawer__body:has(.opc-coupon-form__coupon-code-input) {\n                        bottom: 100%;\n                }\n                .opc-drawer__body:has(.opc-cart__total__tax) {\n                        bottom: 100%;\n                }\n                .opc-drawer__body:has(.opc-coupon-form__coupon-code-input):has(.opc-cart__total__tax) {\n                        bottom: 100%;\n                }\n                .opc-drawer__body:has(.shopping-cart .opc-cart-item .zm-button--link):has(.opc-cart__total__tax):has(.opc-coupon-form__coupon-code-input) {\n                        bottom: 100%;\n                }\n                .tax-exempt-form__content .tax-exempt-form__checkbox {\n                    margin-left: 12px;\n                }\n              }\n              \n              @keyframes slide-in-bottom {\n                  0% {\n                    -webkit-transform: translateY(1000px);\n                            transform: translateY(1000px);\n                    opacity: 0;\n                  }\n                  100% {\n                    -webkit-transform: translateY(0);\n                            transform: translateY(0);\n                    opacity: 1;\n                  }\n              }\n              @keyframes slide-out-bottom {\n                  0% {\n                    transform: translateY(0);\n                    opacity: 1;\n                  }\n                  100% {\n                    transform: translateY(1000px);\n                    opacity: 0;\n                  }\n              }\n          ");
    return style;
  };
  var extractNumericValue = function extractNumericValue(inputString) {
    //Regular expression to match numbers with optional decimal point
    var regex = /[0-9]+(?:\.[0-9]+)?/;

    //Extracting the numeric value using regex
    var match = inputString ? inputString.match(regex) : null;

    //If a match is found, return the numeric value as a floating-point number
    if (match) {
      return parseFloat(match[0]);
    }
    return 0;
  };

  //poller function
  var pollerLite = function pollerLite(conditions, callback) {
    var maxTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 40000;
    var POLLING_INTERVAL = 25;
    var startTime = Date.now();
    var interval = setInterval(function () {
      var allConditionsMet = conditions.every(function (condition) {
        if (typeof condition === "function") {
          return condition();
        }
        return !!document.querySelector(condition);
      });
      if (allConditionsMet) {
        clearInterval(interval);
        callback();
      } else if (Date.now() - startTime >= maxTime) {
        clearInterval(interval);
        //console.log("Polling exceeded maximum time limit");
      }
    }, POLLING_INTERVAL);
  };
  var iframeObserveDOM = function iframeObserveDOM(targetElement, callbackFunction, configObject) {
    var target = targetElement;
    if (!target) return;

    //Configuration of the observer:
    var config = configObject || {
      childList: true,
      subtree: true,
      attributes: false
    };
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        observer.disconnect(); //Disconnect the observer temporarily

        //Perform the callback function without triggering the observer
        callbackFunction(mutation);
      });

      //Reconnect the observer after all mutations have been processed
      observer.observe(target, config);
    });
    observer.observe(target, config);
  };
  var customizeIframeContent = function customizeIframeContent(id, iframeContent) {
    pollerLite([function () {
      return (iframeContent.document.querySelector(".opc-tile.opc-zmone") || iframeContent.document.querySelector(".opc-checkout__mobile-cart .opc-cart-item__title")) && iframeContent.document.querySelector(".opc-drawer__head__slot");
    }], function () {
      var html = iframeContent.document.querySelector("html");
      var subscriptionCard = iframeContent.document.querySelector(".opc-tile.opc-zmone");
      var drawerTitle = iframeContent.document.querySelector(".opc-drawer__head > .zm-button > .zm-button__slot");
      var layoutAction = iframeContent.document.querySelector(".opc-config + .opc-layout__action");
      var planDetailBtn = iframeContent.document.querySelector(".opc-zm-base-card__view-detail-button .opc-zm-base-card__link");
      var priceTotalElem = iframeContent.document.querySelector(".opc-drawer__head .mopc-total");
      var priceTotal = iframeContent.document.querySelector(".opc-drawer__head .mopc-total .mopc-total__content");
      var activePlanPriceElem = iframeContent.document.querySelector(".zm-radio__label.is-checked .opc-zmone__radio-price span");
      var drawerInnerTitleElem = iframeContent.document.querySelector(".shopping-cart .opc-cart__main .opc-cart-item > div");
      var comparisonDialogElem = iframeContent.document.querySelector(".comparison-dialog .zm-dialog");
      var allComparisonDialogElem = iframeContent.document.querySelectorAll(".comparison-dialog .zm-dialog");
      var whiteboardBasicElem = iframeContent.document.querySelector(".zone-detail-dialog .zm-dialog__body > ul > li:nth-child(2) > h2");
      var orderSummaryElem = iframeContent.document.querySelector('.opc-checkout__mobile-cart');
      var opcTermsElem = iframeContent.document.querySelector('.opc-terms__wrap');
      var footerLayoutElem = iframeContent.document.querySelector(".opc-layout__layer__inner");
      var intersectionAnchor = iframeContent.document.querySelector(".opc-checkout__mobile-cart .opc-cart-item__title");
      var isPaymentMethodVerified = function isPaymentMethodVerified() {
        return iframeContent.document.querySelector('.opc-checkout');
      };
      var taxInfo = "<span class=\"".concat(id, "__taxInfo\">(before taxes)</span");
      var drawerHeaderTitleHTML = "<h3 class=\"".concat(id, "__drawerHeaderTitle\">Order Summary</h3>");
      var priceTotalValue = extractNumericValue(priceTotal === null || priceTotal === void 0 ? void 0 : priceTotal.textContent);
      var activePlanPrice = extractNumericValue(activePlanPriceElem === null || activePlanPriceElem === void 0 ? void 0 : activePlanPriceElem.textContent);
      var estimatedTaxValueElem = iframeContent.document.querySelector('.opc-cart__total__text span');
      var estimatedTaxValue = estimatedTaxValueElem ? extractNumericValue(estimatedTaxValueElem.textContent) : 0;
      //check priceTotalValue and activePlanPrice is equal
      //const isPriceEqual = priceTotalValue === activePlanPrice;

      html.classList.add("".concat(id, "__iframe"));
      subscriptionCard && subscriptionCard.classList.add("".concat(id, "__subscriptionCard"));
      planDetailBtn && planDetailBtn.classList.add("".concat(id, "__planDetailBtn"));

      //insert drawer header title
      if (!iframeContent.document.querySelector(".".concat(id, "__drawerHeaderTitle")) && drawerInnerTitleElem) {
        drawerInnerTitleElem.insertAdjacentHTML("afterbegin", drawerHeaderTitleHTML);
      }
      //change drawer title
      if (drawerTitle) drawerTitle.textContent = "Order Summary";
      //insert tax exemption HTML
      if (!iframeContent.document.querySelector(".".concat(id, "__taxExemption")) && subscriptionCard) {
        layoutAction.insertAdjacentHTML("afterend", taxExemptHTML(id));
      }
      //insert tax info
      if (!iframeContent.document.querySelector(".".concat(id, "__taxInfo")) && !estimatedTaxValue) {
        priceTotalElem.insertAdjacentHTML("beforebegin", taxInfo);
      }
      if (estimatedTaxValue > 0 && estimatedTaxValueElem && iframeContent.document.querySelector(".".concat(id, "__taxInfo"))) {
        iframeContent.document.querySelector(".".concat(id, "__taxInfo")).remove();
      }
      //change comparison dialog styles
      if (comparisonDialogElem) {
        var styles = "width: 100% !important;margin-top: 0% !important;margin-bottom: 0% !important;height: 100% !important";
        allComparisonDialogElem.forEach(function (elem) {
          elem.setAttribute("style", styles);
        });
      }
      //change whiteboard basic text
      if (whiteboardBasicElem) {
        whiteboardBasicElem.textContent = "Whiteboard";
      }
      if (orderSummaryElem && !isPaymentMethodVerified()) {
        orderSummaryElem.classList.add("".concat(id, "__hide"));
        opcTermsElem && opcTermsElem.classList.add("".concat(id, "__hide"));
      } else if (orderSummaryElem && isPaymentMethodVerified()) {
        orderSummaryElem.classList.remove("".concat(id, "__hide"));
        opcTermsElem && opcTermsElem.classList.remove("".concat(id, "__hide"));
      }
      if (orderSummaryElem && footerLayoutElem) {
        var isHidden = orderSummaryElem.classList.contains("".concat(id, "__hide"));
        if (isHidden) {
          footerLayoutElem.style.display = "block";
        } else {
          footerLayoutElem.style.display = "none";
        }
      }
    });
    pollerLite([function () {
      return iframeContent.document.querySelector(".success-btn-wrap");
    }], function () {
      iframeContent.document.body.classList.add("".concat(id, "__checkoutSuccess"));
      var checkoutSuccessBtn = iframeContent.document.querySelector(".opc-upgrade-success__content .success-btn-wrap");
      var exploreBtn = "<div class='".concat(id, "__exploreBtnWrapper'>\n                  <button class='").concat(id, "__exploreBtn zm-button--primary zm-button--small is-round zm-button account-btn text-capitalize'>\n                      <span class=\"zm-button__slot\"> Explore your new plan </span>\n                  </button>\n              </div>");
      //insert explore button
      if (!iframeContent.document.querySelector(".".concat(id, "__exploreBtnWrapper"))) {
        checkoutSuccessBtn.insertAdjacentHTML("afterend", exploreBtn);
      }

      // Update heading
      var successHeading = iframeContent.document.querySelector('.opc-upgrade-success__content h1');
      if (successHeading) {
        successHeading.innerHTML = "Your account has been upgraded to Workplace Pro";
      }
    });
  };

  //create the checkout iframe
  var createIframe = function createIframe(id, src) {
    var iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.width = "100%";
    iframe.height = "1000px";
    iframe.frameBorder = "0";
    iframe.allowFullscreen = true;
    iframe.addEventListener("load", function (e) {
      //after iframe loading - hide the loader and show the iframe
      var loader = document.querySelector(".".concat(id, "__loader"));
      loader.classList.add("".concat(id, "__hide"));
      iframe.classList.add("".concat(id, "__show"));
      var iframeContent = iframe.contentWindow;
      var iframeUrl = iframeContent.location.href;

      // Open iframe page in full window
      if (window.isPlanComparisonSlecect) {
        window.location.href = iframeUrl;
      }

      //inject styles to the iframe
      iframeContent.document.head.appendChild(iframeStyles(id));

      //set checkout type context for credit card submission
      iframeContent.campaignFlags.checkoutType = 'iframeCheckout';

      //customize the iframe content
      customizeIframeContent(id, iframeContent);

      //observe the iframe content for changes
      iframeObserveDOM(iframeContent.document.body, function () {
        if (_typeof(iframeContent.intObserver) === "object") {
          iframeContent.intObserver.disconnect();
        }
        customizeIframeContent(id, iframeContent);
      });

      //event listener for the iframe - click events
      iframeContent.document.body.addEventListener("click", function (e) {
        var target = e.target;
        if (target.closest(".".concat(id, "__taxExemption a"))) {
          var checkoutURL = "/opc/buy/config?plan=pro&subPlan=allSubPlan&type=basic2pro&_=".concat(Date.now());
          window.location.href = checkoutURL;
        } else if (target.closest(".zone-detail-dialog .".concat(id, "__backBtn"))) {
          var featureModal = iframeContent.document.querySelector(".zm-dialog__wrapper.zone-detail-dialog");
          var modalOverlay = iframeContent.document.querySelector(".v-modal");
          featureModal === null || featureModal === void 0 ? void 0 : featureModal.remove();
          modalOverlay === null || modalOverlay === void 0 ? void 0 : modalOverlay.remove();
        } else if (target.closest(".comparison-dialog .".concat(id, "__backBtn"))) {
          var compModalCloseBtn = iframeContent.document.querySelector(".comparison-dialog .zm-dialog__headerbtn");
          var planDetailBtn = iframeContent.document.querySelector(".opc-zm-base-card__view-detail-button .opc-zm-base-card__link");
          compModalCloseBtn.click();
          planDetailBtn.click();
        } else if (target.closest(".opc-drawer__head") && !target.closest(".opc-drawer__head .zm-button") && !target.closest(".opc-drawer__head .opc-drawer__head__slot .mopc-total")) {
          var orderSummaryBtn = iframeContent.document.querySelector(".opc-drawer__head .zm-button");
          orderSummaryBtn.click();
          optlyTrack("order_summary_expands"); //track order summary expand
        } else if (target.closest(".opc-drawer__head") && target.closest(".opc-drawer__head .zm-button")) {
          optlyTrack("order_summary_expands"); //track order summary expand
        } else if (target.closest('.zm-message-box__btns .zm-button--primary')) {
          var btnText = target.textContent.trim();
          var returnHomePageBtnText = iframeContent.document.getElementById('the-main-content').__vue__.$t('billing.return_home');
          if (btnText.includes(returnHomePageBtnText)) {
            e.preventDefault();
            window.top.location.href = '/';
            //close modal
            var _checkoutModal = document.querySelector(".".concat(ID, "__checkoutModal"));
            var _iframe = document.querySelector(".".concat(ID, "__checkoutModal iframe"));
            var _loader = document.querySelector(".".concat(ID, "__loader"));
            _checkoutModal.classList.remove("".concat(ID, "__open"));
            _iframe.remove();
            _loader.classList.remove("".concat(ID, "__hide"));
          }
        }
      });

      //event listener for the iframe - pointer events
      iframeContent.document.body.addEventListener("pointerup", function (e) {
        var target = e.target;

        // If user click on Full Plan Comparison select button
        if (target.closest('.opc-plan-comparison .zm-button')) {
          var selectBtn = target.closest('.opc-plan-comparison .zm-button');
          var ariaLabel = selectBtn.getAttribute('aria-label');
          var selectedPlan = ariaLabel.split('Select ')[1].toLowerCase();
          var formattedSelectedPlan = selectedPlan.replace(/ /g, '_');
          optlyTrack("comparison_".concat(formattedSelectedPlan, "_select_cta")); //track plan comparison select button click

          window.isPlanComparisonSlecect = true;
          
          // Open Iframe url in full window
          setTimeout(function () {
            // Hide checkout modal
            var _checkoutModal2 = document.querySelector(".".concat(ID, "__checkoutModal"));
            var _loader2 = document.querySelector(".".concat(ID, "__loader"));
            _checkoutModal2.classList.remove("".concat(ID, "__open"));
            _loader2.classList.remove("".concat(ID, "__hide"));
            var iframeUrl = iframeContent.location.href;
            window.location.href = iframeUrl;
          }, 1000);
        } else if (target.closest(".".concat(ID, "__exploreBtn"))) {
          //explore new plan at thank you page
          window.location.href = '/myHome';
          optlyTrack("explore_your_new_plan_cta_clicks"); //track explore new plan click
        } else if (target.closest(".".concat(ID, "__checkoutSuccess [href*=\"/billing/report\"]"))) {
          // User click on success page report button
          // Hide checkout modal
          var _checkoutModal3 = document.querySelector(".".concat(ID, "__checkoutModal"));
          var _loader3 = document.querySelector(".".concat(ID, "__loader"));
          _checkoutModal3.classList.remove("".concat(ID, "__open"));
          _loader3.classList.remove("".concat(ID, "__hide"));
          window.location.href = '/billing/report';
        }
        if (target.closest(".".concat(id, "__planDetailBtn"))) {
          pollerLite([function () {
            return iframeContent.document.querySelector(".zone-detail-dialog .zm-dialog__header");
          }], function () {
            var featureModalHeader = iframeContent.document.querySelector(".zm-dialog__wrapper.zone-detail-dialog .zm-dialog__header");
            if (featureModalHeader.querySelector(".".concat(id, "__backBtn"))) return;
            featureModalHeader.insertAdjacentHTML("afterbegin", backBtn(id));
          });
        } else if (target.closest(".zone-detail-dialog__confirm-btn")) {
          pollerLite([function () {
            return iframeContent.document.querySelector(".comparison-dialog  .zm-dialog");
          }], function () {
            var allCompModals = iframeContent.document.querySelectorAll(".comparison-dialog  .zm-dialog");
            optlyTrack("see_full_feature_list_clicks"); //track feature modal cta click

            allCompModals.forEach(function (elem) {
              if (!elem.querySelector(".".concat(id, "__backBtn"))) {
                elem.insertAdjacentHTML("afterbegin", backBtn(id));
              }
            });
          });
        }
      });
    });

    //append the iframe to the modal
    var modalDetails = document.querySelector(".".concat(id, "__checkoutModal-details"));
    modalDetails.insertAdjacentElement("beforeend", iframe);
  };

  //track optimizely event
  var optlyTrack = function optlyTrack(label) {
    window['optimizely'] = window['optimizely'] || [];
    window['optimizely'].push({
      type: "event",
      eventName: label,
    });
  };

  //custom attribute for optimizely
  var optlyCustomAttribute = function optlyCustomAttribute(attrName) {
    window.optimizely.push({
      type: 'user',
      attributes: _defineProperty({}, attrName, true)
    });
  };
  var clickHandler = function clickHandler(e) {
    var target = e.target;
    var checkoutURL = "/opc/buy/config?plan=pro&subPlan=allSubPlan&type=basic2pro&_=".concat(Date.now());
    var checkoutModal = document.querySelector(".".concat(ID, "__checkoutModal"));
    var iframe = document.querySelector(".".concat(ID, "__checkoutModal iframe"));
    var loader = document.querySelector(".".concat(ID, "__loader"));
    var iframeContent = iframe === null || iframe === void 0 ? void 0 : iframe.contentWindow;
    var isUserManagementPage = window.location.pathname.includes('/account/user');
    if ((target.closest(".".concat(ID, "__upgradeToPro")) || target.closest(".".concat(ID, "__upgradeOrangeButton"))) && isUserManagementPage) {
      if(document.querySelector('.FE-Billing-Checkout-Modal__checkoutModal iframe').contentWindow.location.pathname === '/billing') return;
      e.preventDefault();
      optlyCustomAttribute('user_management_upgrade'); //track custom attribute
      optlyTrack("user_management_upgrade_cta_click"); //track upgrade cta click
      checkoutModal.classList.add("".concat(ID, "__open"));
    } else if (target.closest(".".concat(ID, "__modalClose"))) {
      // || target.closest(`.${ID}__modalOverlay`)

      // Once user click on close icon of modal. Refresh the page if current page is succcess page.
      if (iframeContent.document.querySelector(".".concat(ID, "__checkoutSuccess"))) {
        optlyTrack("modal_closed_after_order_confirmation");
        window.location.reload();
      }

      //close modal
      checkoutModal.classList.remove("".concat(ID, "__open"));
      iframe.remove();
      loader.classList.remove("".concat(ID, "__hide"));
      optlyTrack("plan_management_modal_closed"); //track checkout modal close
      createIframe(ID, checkoutURL);
    } else if (target.closest('.users-head [href*="/billing"]') && isUserManagementPage) {
      if(document.querySelector('.FE-Billing-Checkout-Modal__checkoutModal iframe').contentWindow.location.pathname === '/billing') return;
      e.preventDefault();
      optlyTrack("users_upgrade_to_pro_promo_cta_click");
      optlyCustomAttribute('users_upgrade_to_pro_promo'); //track custom attribute
      checkoutModal.classList.add("".concat(ID, "__open"));
    } else if ((target.closest('#editUserDialog [href*="/billing"]') || target.closest('[data-link-term="Upgrade to Pro Banner Initiated"]')) && isUserManagementPage) {
      if(document.querySelector('.FE-Billing-Checkout-Modal__checkoutModal iframe').contentWindow.location.pathname === '/billing') return;
      e.preventDefault();
      optlyTrack("edit_modal_upgrade_now_cta_click");
      optlyCustomAttribute('edit_modal_upgrade_now'); //track custom attribute
      checkoutModal.classList.add("".concat(ID, "__open"));
    }
  };
  var init = function init() {
    //regular billing page
    document.body.classList.add("".concat(ID, "__billingPage"));
    pollerLite([function () {
      return document.querySelector(".bp-plan-card__body .zm-button--plain");
    }], function () {
      var ctaText = "Upgrade to Pro";
      var ctaClass = "upgradeToPro";
      var upgradeBtn = document.querySelector(".bp-plan-card__body .zm-button--plain");
      if (!document.querySelector(".".concat(ID, "__upgradeToPro")) && !document.querySelector('.bp-plan-card__body .zm-button--plain').disabled) {
        upgradeBtn.insertAdjacentHTML("afterend", button(ID, ctaText, ctaClass));
      }
    });
    //billing page when sale is on
    pollerLite([function () {
      return document.querySelector(".btn-container .upgrade-btn");
    }], function () {
      var ctaText = " Upgrade Account ";
      var ctaClass = "upgradeOrangeButton";
      var upgradeBtn = document.querySelector(".btn-container .upgrade-btn");
      if (!document.querySelector(".".concat(ID, "__upgradeToPro")) || !document.querySelector(".".concat(ID, "__upgradeOrangeButton"))) {
        upgradeBtn.insertAdjacentHTML("afterend", button(ID, ctaText, ctaClass));
      }
    });

    if (!document.querySelector(".".concat(ID, "__checkoutModal"))) {
      document.body.insertAdjacentHTML("beforeend", checkoutModal());
      var checkoutURL = "/opc/buy/config?plan=pro&subPlan=allSubPlan&type=basic2pro&_=".concat(Date.now());
      createIframe(ID, checkoutURL);
    }
  };
  var activate = function activate() {
    setup();

    //event listener for the document - click events
    document.body.addEventListener("click", clickHandler);
    if (VARIATION === "control") return;

    // Initialize the experiment
    init();
  };
  pollerLite([".content-body"], activate);
})();