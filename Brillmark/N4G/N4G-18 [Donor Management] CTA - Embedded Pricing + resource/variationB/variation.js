(function () {
  var FeHelper = this;

  FeHelper.Connect = {
    Title: "Connect",
    Heading: "",
    Subheading: "I want to Connect seamlessly any application, device or data source	",
    Button1: "Step 2 of 3",
    Button2: "Step 3 of 3",
    Button1SubHeading: "What do you use to manage your donors?",
    // Button1Choose: "Choose as many as you have.",
    Button2SubHeading: "What's the best way to reach you?",
  };

  FeHelper.headData = {
    Step1: {
      Heading: "Flexible Plans That Grow With You",
      subHeading:
        "We'd love to prepare a customized proposal for you! We just need a few details to create the best plan for your nonprofit startup or growing fundraising team. Simply fill out the details below and we'll be in touch shortly.",
    },
    Step2: {
      Heading: "Flexible Plans That Grow With You",
      subHeading:
        "We'd love to prepare a customized proposal for you! We just need a few details to create the best plan for your nonprofit startup or growing fundraising team. Simply fill out the details below and we'll be in touch shortly.",
    },
    Step3: {
      Heading: "Flexible Plans That Grow With You",
      subHeading:
        "We'd love to prepare a customized proposal for you! We just need a few details to create the best plan for your nonprofit startup or growing fundraising team. Simply fill out the details below and we'll be in touch shortly.",
    },
  };

  // wait for element
  FeHelper.doWhenElementLoaded = function (element, todoWhenLoaded) {
    var waitForElement = setInterval(function () {
      if (document && document.querySelectorAll && document.querySelectorAll(element).length > 0 && window.newSection) {
        clearInterval(waitForElement);
        todoWhenLoaded();
      }
    }, 500);
    setTimeout(function () {
      clearInterval(waitForElement);
    }, 10000);
  };
  FeHelper.onLoadMktoForms2 = function (trigger, delayInterval, delayTimeout) {
    var intervalForMktoForms2 = setInterval(function () {
      if (typeof window.MktoForms2 != "undefined") {
        clearInterval(intervalForMktoForms2);
        trigger();
      }
    }, delayInterval);
    setTimeout(function () {
      clearInterval(intervalForMktoForms2);
    }, delayTimeout);
  };
  FeHelper.onLoadCalendly = function (trigger) {
    var interval = setInterval(function () {
      if (typeof Calendly != "undefined") {
        clearInterval(interval);
        trigger();
      }
    }, 50);
    setTimeout(function () {
      clearInterval(interval);
    }, 15000);
  };

  FeHelper.live = function (selector, event, callback, context) {
    // helper for enabling IE 8 event bindings
    function addEvent(el, type, handler) {
      if (el.attachEvent) el.attachEvent("on" + type, handler);
      else el.addEventListener(type, handler);
    }
    // matches polyfill
    this &&
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
  };

  FeHelper.showNextStep = function (currStep) {
    currStep.classList.remove("fe-show");
    currStep.nextElementSibling.classList.add("fe-show");
  };

  FeHelper.removeClass = function (element_selector, className) {
    var element = document.querySelectorAll(element_selector);
    for (var i = 0; i < element.length; i++) {
      if (element[i].classList) element[i].classList.remove(className);
      else element[i].className = element[i].className.replace(new RegExp("\\b" + className + "\\b", "g"), "");
    }
  };

  /* CREATE THIRD STEP CONTENT */
  FeHelper.createInnerSection = function (data) {
    var innerSection =
      "" +
      '  <div class="fe-box">' +
      '      <h3 class="box_title blue_title">' +
      data.Button2 +
      "</h3>" +
      '      <p class="box_sub_title">' +
      data.Button2SubHeading +
      " </p>" +
      "  </div>";
    return innerSection;
  };

  /* CREATE SECOND STEP CONTENT */
  FeHelper.createNextStep = function (data) {
    var feConnectNext =
      '<div class="fe-box">' +
      '  <div class="fe-new-inner-box">' +
      '      <h3 class="box_title blue_title">' +
      data.Button1 +
      "</h3>" +
      '      <p class="box_sub_title">' +
      data.Button1SubHeading +
      "</p>" +
      '                         <div class="fe-bottom-button">' +
      "                               <button><a>Excel/Google Docs</a></button>" +
      "                               <button><a>Blackbaud Raiser's Edge</a></button>" +
      "                               <button><a>Bloomerang</a></button>" +
      "                               <button><a>DonorPerfect</a></button>" +
      "                               <button><a>Little Green Light</a></button>" +
      "                               <button><a>NeonCRM</a></button>" +
      "                               <button><a>Salsa</a></button>" +
      "                               <button><a>Other</a></button>" +
      "                         </div>" +
      '      <div class="box_btn"><button id="bm-next-two" fe-data-key="Step3" class="fe-disable"><a fe-key="' +
      data.Title +
      '" fe-data="Button1Data">NEXT</a></button> </div>' +
      "  </div>" +
      "</div>";

    return feConnectNext;
  };

  FeHelper.updateHeadline = function (key) {
    var headingCopy = FeHelper.headData[key];
    document.querySelector(".fe_looking_header .fe_heading p").innerHTML = headingCopy.subHeading;
  };

  // Initcallendly Behaviors
  function initCalendlyBehaviors(options) {
    const calendlyEventURL = new URL(options.Calendly.eventURL);

    // Generate form
    MktoForms2.loadForm("//lp.networkforgood.com", "729-HTD-982", 2499);

    // When Form Ready
    MktoForms2.whenReady(function (mktoForm) {
      let formEl = mktoForm.getFormElem()[0],
        formId = mktoForm.getId();

      // If current form id not match with supplimentry form id
      if (formId !== 2499) return;

      let isCalendlyBooked = false;

      mktoForm.onSuccess(function (submittedValues, visibleThankYouURL) {
        formEl.innerHTML = options.Marketo.formReplacementHTML;

        Calendly.initPopupWidget({
          url: calendlyEventURL.href,
          prefill: getCalendlyPrefillFields(submittedValues),
          utm: getCalendlyUTMFields(document.location.href),
        });

        let closeObserver = listenForOverlayClose(function (mo) {
          mo.disconnect();
          let finalURL = new URL(visibleThankYouURL);
          finalURL.search += (finalURL.search ? "&" : "") + "booked=" + isCalendlyBooked;
          document.location.href = finalURL.href;
        });

        listenForBookedEvent(function (eventURI) {
          isCalendlyBooked = true;

          let mktoFields = {};
          mktoFields[options.Marketo.lastCalendlyEventURIField] = eventURI;

          MktoForms2.loadForm(
            options.Marketo.instanceURL,
            options.Marketo.munchkinId,
            2499,
            function (mktoForm) {
              mktoForm.addHiddenFields(mktoFields);
              mktoForm.onSuccess(function (submittedValues, hiddenThankYouURL) {
                return false;
              });
              mktoForm.submit();
            }
          );
        });

        return false;
      });
    });

    function isCalendlyEvent(e) {
      return e.origin === calendlyEventURL.origin && e.data.event && e.data.event.indexOf("calendly.") === 0;
    }

    function listenForBookedEvent(cb) {
      window.addEventListener("message", function (e) {
        if (!isCalendlyEvent(e)) return;

        if (e.data.event === "calendly.event_scheduled") {
          cb && cb(e.data.payload.event.uri);
        }
      });
    }

    function listenForOverlayClose(cb) {
      const mo = new MutationObserver(onMutation);
      mo.observe(document.body, { childList: true, subtree: true });

      function onMutation(mutationList, mo) {
        for (const mutation of mutationList) {
          if (mutation.type === "childList") {
            let isCalendlyOverlayRemoved = Array.from(mutation.removedNodes).some(
              (node) => node.classList && node.classList.contains("calendly-overlay")
            );

            if (isCalendlyOverlayRemoved) {
              cb && cb(mo);
            }
          }
        }
      }

      return mo;
    }

    function formatNumberAsUSPhone(number) {
      return number.replace(/[\s+\-()]/g, "").replace(/^1?/, "1");
    }

    function getCalendlyPrefillFields(mktoValues) {
      const calendlyFromMarketo = {
        "email": "Email",
        "name": mktoValues => mktoValues.FirstName + " " + mktoValues.LastName,
        "customAnswers": {
          "a1": "Company",
          "a2": mktoValues => formatNumberAsUSPhone(mktoValues.Phone),
        }
      };

      let prefillBlock = {};
      Object.entries(calendlyFromMarketo)
        .forEach(([key, valueOrAccessor]) => {
          if (key === "customAnswers") {
            prefillBlock[key] = {};
            Object.entries(valueOrAccessor)
              .forEach(([customAnswerKey, customAnswerValueOrAccessor]) => {
                if (typeof customAnswerValueOrAccessor == "string") {
                  prefillBlock[key][customAnswerKey] = mktoValues[customAnswerValueOrAccessor];
                } else if (typeof customAnswerValueOrAccessor == "function") {
                  prefillBlock[key][customAnswerKey] = customAnswerValueOrAccessor(mktoValues);
                }
              });
            return;
          } else if (typeof valueOrAccessor == "string") {
            prefillBlock[key] = mktoValues[valueOrAccessor];
          } else if (typeof valueOrAccessor == "function") {
            prefillBlock[key] = valueOrAccessor(mktoValues);
          }
        });
      return prefillBlock;
    }

    function getCalendlyUTMFields(href) {
      let url = new URL(href),
        query = new URLSearchParams(url.search);

      let utmBlock = {};
      ["Campaign", "Source", "Medium", "Content", "Term"].forEach((key) => {
        let queryValue;
        if ((queryValue = query.get("utm_" + key.toLowerCase()))) {
          utmBlock["utm" + key] = queryValue;
        }
      });

      return utmBlock;
    }
  }

  //initial function
  FeHelper.init = function () {
    // change the CTA

    document.querySelector(".organization .section__actions a").setAttribute("href", "#fe_msf_section");
    document.querySelector(".organization .section__actions a span").innerHTML = "Request Pricing";

    if (window.location.pathname === '/all-in-one-platform/events-auctions/') {
      document.querySelector('.organization .section__actions').insertAdjacentHTML('afterend',
        '<div class="organization__actions">' +
        '<a href="https://www.networkforgood.com/free-trial-request/" class="btn-arrow"><span>Try for Free</span></a>' +
        '</div>');
    } else {
      document.querySelector('.organization .organization__actions a').innerHTML = '<span>Try for Free</span>';
    }

    FeHelper.live('.organization--secondary .section__actions a', 'click', function () {
      var element = document.getElementById('fe_msf_section');
      var headerOffset = 45;
      var elementPosition = element.getBoundingClientRect().top;
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    })

    var feFor;

    //new msf section append
    document.querySelector("body").classList.add("fe-n4g-18");
    document.querySelector(".section-testimonials").insertAdjacentHTML("afterend", window.feLooking);

    //new section append
    document.querySelector(".section-organizations").insertAdjacentHTML("afterend", window.newSection);

    //click on step 1 boxes
    FeHelper.live(".fe-step1 .fe-bottom-button button", "click", function () {
      FeHelper.removeClass(".fe-step1 .fe-bottom-button button", "fe-active");
      this.classList.add("fe-active");
      FeHelper.removeClass(".fe-step1 .box_btn button", "fe-disable");
    });

    //step1 cta Click
    FeHelper.live(".fe-step1 .box_btn #bm-next-one", "click", function (e) {
      if (document.querySelectorAll(".fe-step1 .fe-bottom-button button.fe-active").length) {
        e.preventDefault();
        e.stopPropagation();
        var a = FeHelper.createNextStep(FeHelper.Connect);
        document.querySelector(".fe-next-step.fe-step2").innerHTML = a;
        FeHelper.showNextStep(this.closest(".fe-step1"));
        this.closest(".fe_looking_row_inner").classList.add("fe-hide");
        document.querySelector(".fe_step_box .fe_step_2").classList.add("active");
        document.querySelector(".fe_step_box .fe_step_2").classList.remove("fe-disable");
        document.querySelector(".fe_step_box .fe_step_1").classList.remove("active");
        var dataKey = this.getAttribute("fe-data-key");
        FeHelper.updateHeadline(dataKey);
        feFor = document.querySelector(".fe-step1 .fe-bottom-button .fe-active a").getAttribute("for");

        if ("ga" in window) {
          ga.getAll()[0].send("event", {
            eventCategory: "N4G-18_step1_click",
            eventAction: "GA_Clicks",
            eventLabel: "Pricing form 1st step completed",
          });
        }

        var callPolicy = document.querySelector(".mktoHtmlText").closest(".mktoFormRow");
        document.querySelector(".mktoForm .mktoButtonRow").insertAdjacentElement("beforebegin", callPolicy);
      }
    });

    //click on step 2 boxes
    FeHelper.live(".fe-step2 .fe-bottom-button button", "click", function () {
      FeHelper.removeClass(".fe-step2 .fe-bottom-button button", "fe-active");
      this.classList.add("fe-active");
      FeHelper.removeClass(".fe-step2 .box_btn button", "fe-disable");
    });

    //step2 cta Click
    FeHelper.live(".fe-step2 .box_btn #bm-next-two", "click", function (e) {
      if (document.querySelectorAll(".fe-step2 .fe-bottom-button button.fe-active").length) {
        e.preventDefault();
        e.stopPropagation();
        var inner = FeHelper.createInnerSection(FeHelper.Connect);
        FeHelper.showNextStep(this.closest(".fe-step2"));
        document.querySelector(".fe-next-step.fe-step3 .fe-inr-step").innerHTML = inner;
        document.querySelector(".fe_step_box .fe_step_3").classList.add("active");
        document.querySelector(".fe_step_box .fe_step_1").classList.remove("active");
        document.querySelector(".fe_step_box .fe_step_2").classList.remove("active");
        document.querySelector(".fe_step_box .fe_step_3").classList.remove("fe-disable");
        var dataKey = this.getAttribute("fe-data-key");
        FeHelper.updateHeadline(dataKey);
        document.querySelectorAll("#Number_of_Donors__c option").forEach(function (el) {
          if (el.value === feFor) {
            el.selected = "selected";
          }
        });

        document.querySelector("#Number_of_Donors__c").closest(".mktoFormRow").style.display = "none";
        document.querySelector("#Email").setAttribute("placeholder", "Work Email:");
        document.querySelector("#Phone").setAttribute("placeholder", "Work Phone Number:");
        document.querySelector("#Company").setAttribute("placeholder", "Organization Name:");
        document.querySelector("#LastName").setAttribute("placeholder", "Last Name:");
        document.querySelector("#FirstName").setAttribute("placeholder", "First Name:");
      }
    });

    FeHelper.onLoadMktoForms2(
      function () {
        FeHelper.onLoadCalendly(function () {
          initCalendlyBehaviors({
            Calendly: {
              eventURL: "https://calendly.com/bonterra-network-for-good",
            },
            Marketo: {
              munchkinId: "729-HTD-982",
              instanceURL: "//learn.networkforgood.com",
              supplementaryFormId: 2124,
              lastCalendlyEventURIField: "lastCalendlyEventURI",
              formReplacementHTML: "Thank you!",
            },
          });
        });

        FeHelper.doWhenElementLoaded("#Reason_for_Demo_Request__c", function () {
          document.querySelector("#Reason_for_Demo_Request__c").value = "product demonstration";
          document.querySelector("#Reason_for_Demo_Request__c").closest(".mktoFormRow").style.display = "none";
        });
      },
      50,
      10000
    );
  };

  FeHelper.addScript = function (src, isCss) {
    if (isCss) {
      var bmScript = document.createElement("link");
      bmScript.rel = "stylesheet";
      bmScript.href = src;
    } else {
      var bmScript = document.createElement("script");
      bmScript.src = src;
    }

    document.getElementsByTagName("head")[0].appendChild(bmScript);
  };
  FeHelper.addScript("https://calendly.com/assets/external/widget.js");
  FeHelper.addScript("https://calendly.com/assets/external/widget.css", true);
  FeHelper.addScript("https://lp.networkforgood.com/js/forms2/js/forms2.min.js");

  // n4g-8
  /* Variation Init */
  FeHelper.init2 = function () {
    /* start your code here */

    var feEmail =
      "" +
      '  <div class="fe-tooltip-N4G-18">' +
      '      <img class="fe-tooltip-img-18" src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/6/Tooltip.png">' +
      '      <span class="fe-show-txt" id="fe-show-email">' +
      "          <p>We'll send you pricing information.</p>" +
      "      </span>" +
      "  </div>";

    var fePhone =
      "" +
      '  <div class="fe-tooltip-N4G-18">' +
      '      <img class="fe-tooltip-img-18" src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/6/Tooltip.png">' +
      '      <span class="fe-show-txt" id="fe-show-phone">' +
      "          <p>In case we need to contact you about pricing.</p>" +
      "      </span>" +
      "  </div>";

    var fePrivacy =
      "" +
      '  <p class="fe-privacy"><svg height="100px" width="100px" fill="#fff" xmlns:x="http://ns.adobe.com/Extensibility/1.0/" xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/" xmlns:graph="http://ns.adobe.com/Graphs/1.0/" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' +
      '          version="1.1" x="0px" y="0px" viewBox="-949 951 100 100" style="enable-background:new -949 951 100 100;" xml:space="preserve"><g><g i:extraneous="self"><g><path d="M-899,953l-38.7,12.2v23.7c0,20.6,10.1,40,27,51.9l11.7,8.2l11.7-8.2c16.9-11.8,27-31.2,27-51.9v-23.7L-899,953z      M-865.7,988.9c0,18.9-9.2,36.6-24.7,47.4l-8.6,6l-8.6-6c-15.5-10.8-24.7-28.6-24.7-47.4v-19.8l33.3-10.5l33.3,10.5V988.9z"></path><path d="M-910.3,983.6v5.4h-4.2v25.1h31V989h-4.2v-5.4c0-6.2-5.1-11.3-11.3-11.3S-910.3,977.4-910.3,983.6z M-896.4,1008h-5.2     l0.9-6.7c-0.9-0.6-1.5-1.6-1.5-2.7c0-1.8,1.4-3.2,3.2-3.2c1.8,0,3.2,1.4,3.2,3.2c0,1.1-0.6,2.1-1.5,2.7L-896.4,1008z      M-905.6,983.6c0-3.7,3-6.6,6.6-6.6c3.7,0,6.6,3,6.6,6.6v5.4h-13.2V983.6z"></path></g></g></g></svg>We' +
      "  respect your privacy</p>";

    document.querySelector("body").insertAdjacentHTML("beforeend", '<div class="fe-Overlay-N4G-18"></div>');
    FeHelper.doWhenElementLoaded(
      ".mktoForm input[type=email]",
      function () {
        document.querySelector(".mktoForm input[type=email]").parentElement.insertAdjacentHTML("afterbegin", feEmail);
        document.querySelector('.mktoForm input[type="tel"]').parentElement.insertAdjacentHTML("afterbegin", fePhone);
        document.querySelector(".fe_looking_row .mktoForm .mktoHtmlText").insertAdjacentHTML("beforebegin", fePrivacy);
      },
      50,
      15000
    );

    FeHelper.live(".fe-tooltip-N4G-18", "click", function () {
      document.querySelector(".fe-Tshow") && document.querySelector(".fe-Tshow").classList.remove("fe-Tshow");
      document.querySelector("body").classList.toggle("fe-tooltip-bm_show");
      this.parentElement.classList.toggle("fe-Tshow");
    });

    FeHelper.live(".fe-Overlay-N4G-18", "click", function () {
      document.querySelector("body").classList.remove("fe-tooltip-bm_show");
    });
  };

  FeHelper.doWhenElementLoaded(".section-testimonials", FeHelper.init);
  FeHelper.doWhenElementLoaded(".fe_allPlans .allPlans__content", FeHelper.init2);
})();