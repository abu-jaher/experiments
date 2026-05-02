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
    /* Variation functions */
    
    var fe_nextBtns = ''+
    '<div class="fe_steps_btn">'+
    '     <button id="fe_step1_btn">Next Step</button>'+
    '     <button id="fe_step2_btn">Next Step</button>'+
    '</div>';
    var htmlString =''+ 
    '<div class="sectionContent">'+
    '  <ul>'+ 
    '      <li>Manage all your fundraising activities in one place</li>'+ 
    '      <li>Build stronger relationships with your donors and raise more</li>'+ 
    '      <li>Become a more confident fundraiser with built-in guidance and free support</li>'+ 
    '  </ul>'+
    '</div>';
    /* Variation Init */
    function init() {
      /* start your code here */
      
      document.querySelector('#multistepId').classList.add('fe_step1');
      firstStepInputValidate();
      // insert bullet points for mobile
      document.querySelector('.section-mob-heading').insertAdjacentHTML('afterend',htmlString);
      // add heading in the form box
      document.querySelector('.stepPaginationContainer').insertAdjacentHTML('beforebegin','<h3 class="fe_mobile_heading">Fill out the form below to get your personalized demo!</h3>')
      // add heading in 3rd step
      document.querySelector('.stepPaginationContainer').insertAdjacentHTML('afterend','<h3 class="fe_step3_heading">You\'re one step away from getting a personalized demo!</h3>')
      // insert next btns
      document.querySelector('.resourceMarketoForm.lighter_guide .sectionRight .form_id').insertAdjacentHTML('beforeend',fe_nextBtns);
      waitForElement('.resourceMarketoForm .mktoForm select.mktoField',function(){
        var selectOption = document.querySelectorAll('.resourceMarketoForm .mktoForm select.mktoField')
        for( var i = 0; i < selectOption.length; i++ ){
          selectOption[i].options[0].innerText = ' - Please select -';
        }
        // tooltip click
      
        document.querySelectorAll('.fe-tooltip-N4G4-paid .fe-tooltip-img')[0].addEventListener('click',function(){
          if ('ga' in window) {
            ga.getAll()[0].send('event', {
                eventCategory: 'funnelenvy',
                eventAction: 'click',
                eventLabel: 'N4G-14 work_ToolTip Click',
            });
          }
        })
  
        document.querySelectorAll('.fe-tooltip-N4G4-paid .fe-tooltip-img')[1].addEventListener('click',function(){
          if ('ga' in window) {
            ga.getAll()[0].send('event', {
                eventCategory: 'funnelenvy',
                eventAction: 'click',
                eventLabel: 'N4G-14 phone_ToolTip Click',
            });
          }
        })
        document.querySelectorAll('.stepNum')[0].addEventListener('click',function(el){
          if(document.querySelectorAll('.stepNum.fe_step_complete')[0]){
            document.querySelector('#multistepId').classList.add('fe_step1');
            document.querySelector('#multistepId').classList.remove('fe_step2');
            document.querySelector('#multistepId').classList.remove('fe_step3');
          }
        })
        document.querySelectorAll('.stepNum')[1].addEventListener('click',function(el){
          if(document.querySelectorAll('.stepNum.fe_step_complete')[1]){
            document.querySelector('#multistepId').classList.add('fe_step2');
            document.querySelector('#multistepId').classList.remove('fe_step1');
            document.querySelector('#multistepId').classList.remove('fe_step3');
          }
        })
        
      },50,10000)
      // check validity step 1
      
      waitForElement('#Registered_501_c_3__c',function(){
        document.querySelector('#Registered_501_c_3__c').insertAdjacentHTML('afterend','<div class="fe_error_msg">This field is required.</div>')
        SelectValidate('#Registered_501_c_3__c');
      },50,10000)
      // step 1 next btn click
      document.querySelector('#fe_step1_btn').addEventListener('click',function(){
        if(document.querySelector('#Registered_501_c_3__c.mktoValid')){
          document.querySelector('#multistepId').classList.remove('fe_step1');
          document.querySelector('#multistepId').classList.add('fe_step2');
          document.querySelector('.stepNum[data-stepcount="1"]').classList.add('fe_step_complete');
          if ('ga' in window) {
            ga.getAll()[0].send('event', {
                eventCategory: 'funnelenvy',
                eventAction: 'click',
                eventLabel: 'MSF Step 1',
            });
          }
        }else{
          document.querySelector('.fe_error_msg').classList.add('fe_show');
        }
      })
      // check validity step 2
      waitForElement('#Number_of_Donors__c',function(){
        document.querySelector('#Number_of_Donors__c').insertAdjacentHTML('afterend','<div class="fe_error_msg step2">This field is required.</div>')
        SelectValidate('#Number_of_Donors__c');
      },50,10000)
      // step 2 next btn click
      document.querySelector('#fe_step2_btn').addEventListener('click',function(){
        if(document.querySelector('#Number_of_Donors__c.mktoValid')){
          document.querySelector('#multistepId').classList.remove('fe_step2');
          document.querySelector('#multistepId').classList.add('fe_step3');
          document.querySelector('.stepNum[data-stepcount="2"]').classList.add('fe_step_complete')
          if ('ga' in window) {
            ga.getAll()[0].send('event', {
                eventCategory: 'funnelenvy',
                eventAction: 'click',
                eventLabel: 'MSF Step 2',
            });
          }
        }else{
          document.querySelector('.fe_error_msg.step2').classList.add('fe_show');
        }
      })
    }
    function SelectValidate(selector){
      var selectField = document.querySelector(selector);
        selectField.addEventListener('change',function() {
          if(document.querySelector('.fe_error_msg.fe_show')){
            document.querySelector('.fe_error_msg.fe_show').classList.remove('fe_show');
          }
        })
    }
    function firstStepInputValidate(){
      var signupField = document.querySelectorAll('.resourceMarketoForm .section__form .mktoForm .mktoFormRow input');
      signupField.forEach(function(el){
        el.addEventListener('input',function(evt) {
          var value = el.value
          if (!value) {
            el.parentElement.classList.remove('fe_opacity')
            el.parentElement.classList.add('fe_opacity_one')
            return
          }
          if(value){
            el.parentElement.classList.remove('fe_opacity_one')
            el.parentElement.classList.add('fe_opacity')
            return
          }
        })
        el.addEventListener('click',function(){
          if ('ga' in window) {
            ga.getAll()[0].send('event', {
                eventCategory: 'funnelenvy',
                eventAction: 'click',
                eventLabel: 'N4G-14 Step 3 Form Engagement',
            });
          }
        })
      })
    }
    /* Initialize variation */
      waitForElement(".resourceMarketoForm .section__form .mktoForm .mktoFormRow input", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();