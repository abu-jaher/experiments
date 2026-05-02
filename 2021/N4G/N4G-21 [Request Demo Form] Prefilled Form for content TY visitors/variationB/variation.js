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

    /* Variation Init */
    function init() {
      /* start your code here */

      if(sessionStorage.getItem("marketo-data") !== null){

        var customersDataString = sessionStorage.getItem("marketo-data");
        var customerData = JSON.parse(customersDataString);

        document.querySelector('.mktoForm #FirstName').value = customerData.FirstName;
        document.querySelector('.mktoForm #LastName').value = customerData.LastName;
        document.querySelector('.mktoForm #Company').value = customerData.Company;
        document.querySelector('.mktoForm #Email').value = customerData.Email;
        document.querySelector('.mktoForm #Phone').value = customerData.Phone;

        if(customerData.Registered_501_c_3__c !== undefined){
          waitForElement('[data-val="'+customerData.Registered_501_c_3__c+'"] input', function(){
            if(document.querySelector('[data-val="'+customerData.Registered_501_c_3__c+'"]')){

              document.querySelector('[data-val="'+customerData.Registered_501_c_3__c+'"] input').click();           
              document.querySelector('[data-step="1"]').style.display = 'none';
              document.querySelector('[data-step="2"]').style.display = 'block';
              document.querySelector('.resourceMarketoForm .stepPaginationContainer [data-stepcount="1"]').classList.add('complete');

            }  
          },50,15000)

        }

        if(customerData.of_Donors__c !== undefined){   

          waitForElement('[data-val="'+customerData.of_Donors__c+'"] input', function(){

            if(document.querySelector('[data-val="'+customerData.of_Donors__c+'"]')){
              document.querySelector('[data-val="'+customerData.of_Donors__c+'"] input').click(); 
              document.querySelector('.mktoForm #Number_of_Donors__c').value = customerData.of_Donors__c;
              if(document.querySelector('[data-val="'+customerData.Registered_501_c_3__c+'"]')){
                document.querySelector('[data-step="2"]').style.display = 'none';
                document.querySelector('[data-step="3"]').style.display = 'block';
                document.querySelector('.resourceMarketoForm .stepPaginationContainer [data-stepcount="2"]').classList.add('complete'); 
              }


            }
          
          },50,15000)

        }

        if(customerData.Number_of_Donors__c !== undefined){   

          waitForElement('[data-val="'+customerData.Number_of_Donors__c+'"] input', function(){

            if(document.querySelector('[data-val="'+customerData.Number_of_Donors__c+'"]')){
              document.querySelector('[data-val="'+customerData.Number_of_Donors__c+'"] input').click(); 
              document.querySelector('.mktoForm #Number_of_Donors__c').value = customerData.Number_of_Donors__c;
              if(document.querySelector('[data-val="'+customerData.Registered_501_c_3__c+'"]')){
                document.querySelector('[data-step="2"]').style.display = 'none';
                document.querySelector('[data-step="3"]').style.display = 'block';
                document.querySelector('.resourceMarketoForm .stepPaginationContainer [data-stepcount="2"]').classList.add('complete'); 
              }

            }
          
          },50,15000)

        }


        document.querySelector('.mktoForm .mktoButtonWrap .mktoButton').addEventListener('click',function(){
          trackGAEvent('funnelenvy','GA-Clicks','Request Demo Clicks');
        })

      }



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
    waitForElement(".mktoForm .mktoButtonWrap .mktoButton", init, 50, 15000);

  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
