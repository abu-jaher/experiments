(function () {
  try {
    /* main variables */
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
    var feLeftSection =''+ 
'<div class="fe-left">'+
' <h1>Ditch the Messy Spreadsheets and Complicated Tools</h1>'+
'  <ul class="fe-list">'+ 
'      <li><img class="icon-check-2" src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/1/N4G-1+img/NFG-home-features-1_checkmark_green-01-1-150x150+1.png">Manage all your fundraising activities in one place</li>'+ 
'      <li><img class="icon-check-2" src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/1/N4G-1+img/NFG-home-features-1_checkmark_green-01-1-150x150+1.png">Build stronger relationships with your donors and raise more</li>'+ 
'      <li><img class="icon-check-2" src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/1/N4G-1+img/NFG-home-features-1_checkmark_green-01-1-150x150+1.png">Become a more confident fundraiser with built-in guidance and free support</li>'+
'  </ul>'+
' <div class="fe-quote">'+
'   <p><img class="fe-quote-start" src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/1/N4G-1+img/965054%201.png">We chose Network for Good because it suits our needs the best. Other platforms had too many functions and options that we’d never use. Plus, I like having our fundraising platform and database come from one source.<img  class="fe-quote-end" src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/1/N4G-1+img/965054%202.png"></p>'+
' </div>'+
' <div class="fe-director">'+
'  <img class="fe-director-img-desktop" src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/1/N4G-1+img/2021-07-13%2010_58_36-Get%20a%20Demo%20of%20Network%20for%20Good\'s%20All-in-One%20Fundraising%20Software%201.png">'+
'  <img class="fe-director-img-mobile" src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/1/Emily-Dean.png">'+
'  <div class="fe-director-position">'+
'  <h3>Emily Dean</h3>'+
'  <p>Managing Director Atlas Preparatory School</p>'+
' </div>'+
' </div>'+
'</div>';

// Logo Section
var feLogo =''+ 
'  <div class="fe-logo-section">'+ 
'      <h2 class="logo-heading">The top-rated fundraising software for small and growing nonprofits</h2>'+ 
'      <div class="fe-logo-outer">'+ 
'          <div class="fe-logo-box">'+ 
'              <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/1/softwareadvice.png" alt="softwareadvice">'+ 
'          </div>'+ 
'          <div class="fe-logo-box">'+ 
'              <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/1/getapp.png" alt="getapp">'+ 
'          </div>'+ 
'          <div class="fe-logo-box">'+ 
'              <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/1/capterra.png" alt="capterra">'+ 
'          </div>'+ 
'      </div>'+ 
'  </div>';

//multistep section structure
var MultiStepForm = '' +
'      <div class="bm-multistep-form">'+ 
'              <div class="bm-active-classes">'+ 
'                  <ul class="bm-active-button">'+ 
'                      <li class="tab1 active" fe-tab="step_one">'+ 
'                          <span class="bm-active-btn">1</span>'+ 
'                      </li>'+ 
'                      <li class="tab2 fe-disable" fe-tab="step_two">'+ 
'                          <span class="bm-active-btn">2</span>'+ 
'                      </li>'+ 
'                      <li class="tab3 fe-disable" fe-tab="contact-form-wrapper">'+ 
'                          <span class="bm-active-btn">3</span>'+ 
'                      </li>'+ 
'                  </ul>'+ 
'              </div>'+ 
'              <!-- start 1st form -->'+ 
'          <div class="bm-step step_one active">'+
'              <div id="bm-form-question">'+ 
'<h2> Simple. Smart. Fundraising Software.</h2>'+
'<span>Fill out the form below to get your personalized demo!</span>'+
'                  <h3>Is your organization a registered 501©3?</h3>'+ 
'              </div>'+ 
'              <div id="bm-form-answers" class="bm-btn-grid">'+ 
'                  <button class="bm-answer-btn"><input type="radio" id="bm-checkbox1" name="fe-step1"><label for="bm-checkbox1" feData="Yes"><span class="checkmark"></span>Yes</label></button>'+ 
'                  <button class="bm-answer-btn"><input type="radio" id="bm-checkbox2" name="fe-step1"><label for="bm-checkbox2" feData="Working on getting 501(c)3 status"><span class="checkmark"></span>Working on getting 501©3 status</label></button>'+ 
'                  <button class="bm-answer-btn"><input type="radio" id="bm-checkbox3" name="fe-step1"><label for="bm-checkbox3" feData="No, but we have a fiscal sponsor"><span class="checkmark"></span>No, but we have a sponsor</label></button>'+ 
'                  <button class="bm-answer-btn"><input type="radio" id="bm-checkbox4" name="fe-step1"><label for="bm-checkbox4" feData="No, but we consult nonprofits"><span class="checkmark"></span>No, we consult nonprofits</label></button>'+ 
'              </div>'+ 
'              <div class="bm-next-button">'+ 
'                  <button id="bm-next-one" class="fe-disable">Next Step</button>'+ 
'              </div>'+ 
'          </div>'+ 
'  '+ 
'          <!-- end 1st form -->'+ 
'  '+ 
'          <!-- start 2nd form-->'+ 
'          <div class="bm-step step_two">'+ 
'              <div id="bm-form-question">'+ 
'                  <h3>Approximately, how many individuals have donated to your organization in the past 12 months?</h3>'+ 
'              </div>'+ 
'              <div id="bm-form-answers" class="bm-btn-grid">'+ 
'                  <button class="bm-answer-btn" fe-val="None"><input type="radio" id="bm-checkbox8" name="fe-step2"><label for="bm-checkbox8"><span class="checkmark"></span>None</label></button>'+ 
'                  <button class="bm-answer-btn" fe-val="1 - 50" ><input type="radio" id="bm-checkbox9" name="fe-step2"><label for="bm-checkbox9"><span class="checkmark"></span>1 - 50</label></button>'+ 
'                  <button class="bm-answer-btn" fe-val="51 - 100"><input type="radio" id="bm-checkbox10" name="fe-step2"><label for="bm-checkbox10"><span class="checkmark"></span>51 - 100</label></button>'+ 
'                  <button class="bm-answer-btn" fe-val="101 - 250"><input type="radio" id="bm-checkbox11" name="fe-step2"><label for="bm-checkbox11"><span class="checkmark"></span>101 - 250</label></button>'+ 
'                  <button class="bm-answer-btn" fe-val="251 - 500"><input type="radio" id="bm-checkbox12" name="fe-step2"><label for="bm-checkbox12"><span class="checkmark"></span>251 - 500</label></button>'+ 
'                  <button class="bm-answer-btn" fe-val="501 - 1,000"><input type="radio" id="bm-checkbox13" name="fe-step2"><label for="bm-checkbox13"><span class="checkmark"></span>501 - 1,000</label></button>'+ 
'                  <button class="bm-answer-btn" fe-val="1,001 - 2,500"><input type="radio" id="bm-checkbox14" name="fe-step2"><label for="bm-checkbox14"><span class="checkmark"></span>1,001 - 2,500</label></button>'+ 
'                  <button class="bm-answer-btn" fe-val="2,501 - 5,000"><input type="radio" id="bm-checkbox15" name="fe-step2"><label for="bm-checkbox15"><span class="checkmark"></span>2,501 - 5,000</label></button>'+ 
'                  <button class="bm-answer-btn" fe-val="More than 5,000"><input type="radio" id="bm-checkbox16" name="fe-step2"><label for="bm-checkbox16"><span class="checkmark"></span>More than 5,000</label></button>'+ 
'              </div>'+ 
'              <div class="bm-next-button">'+ 
'                  <button id="bm-next-two" class="fe-disable">Next Step</button>'+ 
'              </div>'+ 
'          </div>'+ 
'          <!-- end 2nd form -->'+ 
'  '+ 
'          <!-- start 3nd form-->'+ 
'          <div class="bm-step step_three">'+ 
'              <div id="bm-form-question">'+ 
'                  <h3>Who should we contact?</h3><br>'+ 
'              </div>'+ 
'          </div>'+ 
'      </div>';


 function live(selector, event, callback, context) {
  /****Helper Functions****/
  // helper for enabling IE 8 event bindings
  function addEvent(el, type, handler) {
    if (el.attachEvent) el.attachEvent('on' + type, handler);
    else el.addEventListener(type, handler);
  }
  // matches polyfill
  this.Element && function (ElementPrototype) {
    ElementPrototype.matches = ElementPrototype.matches ||
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
  }(Element.prototype);
  // live binding helper using matchesSelector
  function live(selector, event, callback, context) {
    addEvent(context || document, event, function (e) {
      var found, el = e.target || e.srcElement;
      while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
      if (found) callback.call(el, e);
    });
  }
  live(selector, event, callback, context);
}
 function addClass(element_selector, className) {
  var element = document.querySelectorAll(element_selector);
  for(var i = 0; i < element.length; i++) {
    if (element[i].classList)
      element[i].classList.add(className);
    else if (!BmHelperUtils.hasClass(element[i], className))
      element[i].className += ' ' + className;
  }
}
 function removeClass(element_selector, className) {
  var element = document.querySelectorAll(element_selector);
  for(var i = 0; i < element.length; i++) {
    if (element[i].classList)
      element[i].classList.remove(className);
    else
      element[i].className = element[i].className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
  }
}
 function hasClass(element, className) {
    return element.classList ? element.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(element.className);
}
    function init() {
      /* start your code here */
        var CE_SNAPSHOT_NAME = "Demo Request MSF";
        document.querySelector('#mymarketoform1').insertAdjacentHTML("afterbegin",MultiStepForm);
      //click on step 1 boxes
       live('.step_one #bm-form-answers button','click',function(){
        removeClass('.step_one #bm-form-answers button','fe-active');
         this.classList.add('fe-active');
         this.querySelector('input').checked = true;
        removeClass('.step_one div.bm-next-button button','fe-disable');
        if ('ga' in window) {
          ga.getAll()[0].send('event', {
              eventCategory: 'funnelenvy',
              eventAction: 'click',
              eventLabel: 'N4G-1 Form Engagement',
          });
      }
    });
 
      //fire form engagement event 
      live('form input', 'click', function() {
        if ('ga' in window) {
          ga.getAll()[0].send('event', {
              eventCategory: 'funnelenvy',
              eventAction: 'click',
              eventLabel: 'N4G-1 Step 3 Form Engagement',
          });
      }
      });

      //Tooltip event 
      live('.fe-tooltip', 'click', function() {
        if ('ga' in window) {
          ga.getAll()[0].send('event', {
              eventCategory: 'funnelenvy',
              eventAction: 'click',
              eventLabel: 'N4G-1-Tooltip-Click',
          });
      }
      });

      //stem to item click
       live('.step_two #bm-form-answers button','click',function(){
            removeClass('.step_two #bm-form-answers button, .step_two input ','fe-active');
            this.classList.add('fe-active');
            this.querySelector('input').checked = true;  
            var list = Array.from(document.querySelectorAll('.step_two input'))
            list.some(function(el) {
                if(el.checked) {
                   removeClass('.step_two div.bm-next-button button','fe-disable');
                    return true;
                }
               addClass('.step_two div.bm-next-button button','fe-disable');
            })
    
        });
    //click on next CTA step1
   live('.step_one div.bm-next-button button','click',function(){
      //check user select a company size box
      if(document.querySelectorAll('div.step_one #bm-form-answers button.fe-active').length){
       removeClass('div.step_one, .bm-active-button li','active');
       addClass('div.step_two','active');
       removeClass('.tab2','fe-disable');
       addClass('.tab2','active');
       addClass('.bm-multistep-form', 'fe-step1-complete');
      }
    });
    //click on next CTA step2 
    live('.step_two div.bm-next-button button','click',function(){
      //check user select a tools tab box
      if(document.querySelectorAll('div.step_two #bm-form-answers button input:checked').length){
       removeClass('div.step_one, .bm-active-button li','active');
       removeClass('div.step_two','active');
       addClass('.W3_F_Demo_Request_General','active');
        var cmpSize= document.querySelector('div.step_one #bm-form-answers button.fe-active').getAttribute('fe-val');
       addClass('.tab3','active');
       removeClass('.bm-multistep-form', 'fe-step1-complete');
       addClass('.bm-multistep-form', 'fe-step2-complete');
       document.querySelector('#LblRegistered_501_c_3__c').closest('.mktoFormRow').style.display="none";
       document.querySelector('#Registered_501_c_3__c').closest('.mktoFormRow').nextSibling.style.display="none";
       // set value

   if(document.querySelector('#Registered_501_c_3__c').closest('.mktoFormRow').nextSibling.querySelector('select'))
    document.querySelector('#Registered_501_c_3__c').closest('.mktoFormRow').nextSibling.querySelector('select').value = document.querySelector('.step_two .fe-active').getAttribute('fe-val');
      document.querySelector('#Registered_501_c_3__c').value = document.querySelector('.step_one .fe-active label').getAttribute('feData');
      
      }
    });
         generateSteps();
    }
    //generates steps 
    function generateSteps(){
      var stepOneStr = '';
      var stepTwoStr= '';
      var listData = document.querySelectorAll('#Registered_501_c_3__c option:not([value=""])');
      for(var i=0; i< listData.length; i++){
        stepOneStr +='                  <button class="bm-answer-btn"><input type="radio" id="bm-checkbox-first'+i+'" name="fe-step1" fe-val="'+listData[i].getAttribute('value')+'"><label for="bm-checkbox-first'+i+'"><span class="checkmark"></span>'+listData[i].innerHTML+'</label></button>';
      }
      //document.querySelector('.bm-step.step_one .bm-btn-grid').innerHTML = stepOneStr;
      stepOneStr='';

      //var listDoors= document.querySelectorAll('#Number_of_Donors__c option:not([value=""]), #Budget__c_account option:not([value=""]), #Last_12_Months_of_Online_Fundraising__c option:not([value=""]), #CRM_Vendor__c option:not([value=""])');
      var listDoors = document.querySelector('#Registered_501_c_3__c').closest('.mktoFormRow').nextSibling.querySelectorAll('select option:not([value=""])');
      for(var i=0; i< listDoors.length; i++){
        stepTwoStr +='               <button class="bm-answer-btn" fe-val="'+listDoors[i].value+'"><input type="radio" id="bm-checkbox'+i+'" name="fe-step2" fe-val="'+listDoors[i].value+'"><label for="bm-checkbox'+i+'"><span class="checkmark"></span>'+listDoors[i].innerHTML+'</label></button>';
      }
      document.querySelector('.bm-step.step_two .bm-btn-grid').innerHTML = stepTwoStr;
      stepTwoStr = '';

    } 
    /* Initialise variation */
    waitForElement(".mktoForm#mktoForm_1317 .mktoFormRow input", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
