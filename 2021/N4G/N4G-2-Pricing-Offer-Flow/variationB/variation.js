(function () {
  var FeHelper = this;

  FeHelper.Connect = {
    Title: "Connect",
    Heading: "",
    Subheading:
      "I want to Connect seamlessly any application, device or data source	",
    Button1: "Step 2 of 3",
    Button2: "Step 3 of 3",
    Button1SubHeading: "What do you use to manage your donors?",
    // Button1Choose: "Choose as many as you have.",
    Button2SubHeading: "What's the best way to reach you?",
  };

  FeHelper.headData = {
    Step1: {
      Heading: "Flexible Plans That Grow With You",
      subHeading: "We'd love to prepare a customized proposal for you! We just need a few details to create the best plan for your nonprofit startup or growing fundraising team. Simply fill out the details below and we'll be in touch shortly."
    },
    Step2: {
      Heading: "Flexible Plans That Grow With You",
      subHeading: "We'd love to prepare a customized proposal for you! We just need a few details to create the best plan for your nonprofit startup or growing fundraising team. Simply fill out the details below and we'll be in touch shortly."
    },
    Step3: {
      Heading: "Flexible Plans That Grow With You",
      subHeading: "We'd love to prepare a customized proposal for you! We just need a few details to create the best plan for your nonprofit startup or growing fundraising team. Simply fill out the details below and we'll be in touch shortly."
    },
  }


  // wait for element
  FeHelper.doWhenElementLoaded = function (element, todoWhenLoaded) {
    var waitForElement = setInterval(function () {
      if (
        document &&
        document.querySelectorAll &&
        document.querySelectorAll(element).length > 0
      ) {
        clearInterval(waitForElement);
        todoWhenLoaded();
      }
    }, 500);
    setTimeout(function () {
      clearInterval(waitForElement);
    }, 10000);
  };
  FeHelper.onLoadMktoForms2 = function (trigger, delayInterval, delayTimeout) {
    var intervalForMktoForms2 = setInterval(
      function () {
        if (typeof window.MktoForms2 != 'undefined') {
          clearInterval(intervalForMktoForms2);
          trigger();
        }
      }, delayInterval);
    setTimeout(function () {
      clearInterval(intervalForMktoForms2);
    }, delayTimeout);
  }
  
  FeHelper.live = function (selector, event, callback, context) {
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
    };

  FeHelper.showNextStep = function (currStep) {
    currStep.classList.remove('fe-show');
    currStep.nextElementSibling.classList.add('fe-show');
  }

  FeHelper.removeClass = function (element_selector, className) {
    var element = document.querySelectorAll(element_selector);
    for (var i = 0; i < element.length; i++) {
      if (element[i].classList)
        element[i].classList.remove(className);
      else
        element[i].className = element[i].className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
    }
  };



  /* CREATE THIRD STEP CONTENT */
  FeHelper.createInnerSection = function (data) {
    var innerSection =
      "" +
      '  <div class="fe-box">' +
      '      <h3 class="box_title blue_title">' + data.Button2 + '</h3>' +
      '      <p class="box_sub_title">' + data.Button2SubHeading + ' </p>' +
      "  </div>";
    return innerSection;
  };

  /* CREATE SECOND STEP CONTENT */
  FeHelper.createNextStep = function (data) {
    var feConnectNext =
      '<div class="fe-box">' +
      '  <div class="fe-new-inner-box">' +
      '      <h3 class="box_title blue_title">' + data.Button1 + '</h3>' +
      '      <p class="box_sub_title">' + data.Button1SubHeading +'</p>' +
      '                         <div class="fe-bottom-button">' +
      '                               <button><a>Excel/Google Docs</a></button>' +
      "                               <button><a>Blackbaud Raiser's Edge</a></button>" +
      '                               <button><a>Bloomerang</a></button>' +
      '                               <button><a>DonorPerfect</a></button>' +
      '                               <button><a>Little Green Light</a></button>' +
      '                               <button><a>NeonCRM</a></button>' +
      '                               <button><a>Salsa</a></button>' +
      '                               <button><a>Other</a></button>' +
      "                         </div>" +
      '      <div class="box_btn"><button id="bm-next-two" fe-data-key="Step3" class="fe-disable"><a fe-key="' + data.Title + '" fe-data="Button1Data">NEXT</a></button> </div>' +
      '  </div>' +
      '</div>';


    return feConnectNext;
  };


  FeHelper.updateHeadline = function (key) {
    var headingCopy = FeHelper.headData[key];
    document.querySelector('.fe_looking_header .fe_heading p').innerHTML = headingCopy.subHeading;
  }




  //initial function
  FeHelper.init = function () {

    var feFor;

    //new msf section append
    document
      .querySelector(".section-pricing").innerHTML = window.feLooking;


      //click on step 1 boxes
      live('.fe-step1 .fe-bottom-button button','click',function(){
        removeClass('.fe-step1 .fe-bottom-button button','fe-active');
         this.classList.add('fe-active');
        removeClass('.fe-step1 .box_btn button','fe-disable');
    });

    //step1 cta Click       
    FeHelper.live(".fe-step1 .box_btn #bm-next-one", "click", function (e) {

      if(document.querySelectorAll('.fe-step1 .fe-bottom-button button.fe-active').length){
        e.preventDefault();
        e.stopPropagation();
        var a = FeHelper.createNextStep(FeHelper.Connect);
        document.querySelector(".fe-next-step.fe-step2").innerHTML = a;
        FeHelper.showNextStep(this.closest('.fe-step1'));
        this.closest('.fe_looking_row_inner').classList.add('fe-hide')
        document.querySelector('.fe_step_box .fe_step_2').classList.add('active');
        document.querySelector('.fe_step_box .fe_step_2').classList.remove('fe-disable');
        document.querySelector('.fe_step_box .fe_step_1').classList.remove('active');
        var dataKey = this.getAttribute('fe-data-key');
        FeHelper.updateHeadline(dataKey);
        feFor = document.querySelector('.fe-step1 .fe-bottom-button .fe-active a').getAttribute('for');
        
        if ('ga' in window) {
          ga.getAll()[0].send('event', {
              eventCategory: 'funnelenvy',
              eventAction: 'click',
            eventLabel: 'N4G-2: Step 1 Form Engagement',
          });
      }

      }
      
    });


     //click on step 2 boxes
     live('.fe-step2 .fe-bottom-button button','click',function(){
      removeClass('.fe-step2 .fe-bottom-button button','fe-active');
      this.classList.add('fe-active');
      removeClass('.fe-step2 .box_btn button','fe-disable');
    });

    //step2 cta Click 
    FeHelper.live(".fe-step2 .box_btn #bm-next-two", "click", function (e) {

      if(document.querySelectorAll('.fe-step2 .fe-bottom-button button.fe-active').length){
          e.preventDefault();
          e.stopPropagation();
          var inner = FeHelper.createInnerSection(FeHelper.Connect);
          FeHelper.showNextStep(this.closest('.fe-step2'));
          document.querySelector(".fe-next-step.fe-step3 .fe-inr-step").innerHTML = inner;
          document.querySelector('.fe_step_box .fe_step_3').classList.add('active');
          document.querySelector('.fe_step_box .fe_step_1').classList.remove('active');
          document.querySelector('.fe_step_box .fe_step_2').classList.remove('active');
          document.querySelector('.fe_step_box .fe_step_3').classList.remove('fe-disable');
          var dataKey = this.getAttribute('fe-data-key');
          FeHelper.updateHeadline(dataKey);
          document.querySelectorAll('#Number_of_Donors__c option').forEach(function(el){
              if(el.value === feFor){
                el.selected = 'selected';
              }              
            });       
        }

      
    });


   

    document.querySelector('.section-list').innerHTML = window.featureSection;

    /*==================== Toggle Features ====================*/
    var featuresContent = document.getElementsByClassName('fe-features__content');
    var featuresHeader = document.querySelectorAll('.fe-features__row h3');

    var toggleFeature = function () {
      var itemClass = this.parentNode.className

      for (var i = 0; i < featuresContent.length; i++) {
        featuresContent[i].className = 'fe-features__content close';
      }
      if (itemClass === 'fe-features__content close') {
        this.parentNode.className = 'fe-features__content open';
      }
    }

    featuresHeader.forEach(function (el) {
      el.addEventListener('click', toggleFeature);
    });
    FeHelper.onLoadMktoForms2(function () {
      MktoForms2.loadForm("//learn.networkforgood.com", "270-SZK-418", 1076);
      FeHelper.doWhenElementLoaded('.mktoFormRow input',function(){
      //document.querySelector('#Reason_for_Demo_Request__c').value = 'product demonstration'
      //document.querySelector('#Reason_for_Demo_Request__c').closest('.mktoFormRow').style.display="none";   

        document.querySelector('#Number_of_Donors__c').closest('.mktoFormRow').style.display="none";
        // document.querySelector('#LblRegistered_501_c_3__c').closest('.mktoFormRow').nextSibling.style.display="none";   
        document.querySelector('#Email').setAttribute('placeholder','Work Email:');   
        document.querySelector('#Phone').setAttribute('placeholder','Work Phone Number:');
        document.querySelector('#Company').setAttribute('placeholder','Organization Name:');
        document.querySelector('#LastName').setAttribute('placeholder','Last Name:');
        document.querySelector('#FirstName').setAttribute('placeholder','First Name:');
        document.querySelector('button[type="submit"]').textContent = 'Request Pricing';
      })
    }, 50, 10000);
  }


  FeHelper.addScript = function () {
    var bmScript = document.createElement('script');
    bmScript.src = 'https://learn.networkforgood.com/js/forms2/js/forms2.min.js';
    document.getElementsByTagName('head')[0].appendChild(bmScript);
  }

  FeHelper.addScript();
  FeHelper.doWhenElementLoaded(
    ".section-list .section__body",
    FeHelper.init
  );
})();