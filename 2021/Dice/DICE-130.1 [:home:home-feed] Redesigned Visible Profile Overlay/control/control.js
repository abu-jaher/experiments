(function () {
  var FEHelper = {
    // Wait for element
    onLoadElement: function(selector, trigger, delayInterval, delayTimeout) {
      var interval = setInterval(function() {
          if (
              document &&
              document.querySelectorAll(selector) &&
              document.querySelectorAll(selector).length > 0
          ) {
              clearInterval(interval);
              trigger();
          }
      }, delayInterval);
      setTimeout(function() {
          clearInterval(interval);
      }, delayTimeout);
    }
  };
  function setCookie(name,value,days) {
      var expires = "";
      if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days*24*60*60*1000));
          expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }
  function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
  }
      
  var fePopup =''+ 
  '  <div class="fe-popup70 fe-popup130">'+ 
  '      <div class="fe-popup-overlay"></div>'+ 
  '      <div class="fe-popup-inr">'+ 
  '          <div class="fe-popup-nav">'+ 
  '              <div class="fe-popup-logo">'+ 
  '                  <a href="/home/home-feed" target="_self" style="width: 75px; height: 40px; display: block;">'+ 
  '                      <img style="width: 100%;" src="https://assets.dice.com/techpro/img/dice-logo.svg">'+ 
  '                  </a>'+ 
  '              </div>'+ 
  '              <div class="fe-popup-cross"><span>×</span></div>'+ 
  '          </div>'+ 
  '          <div class="fe-popup-content">'+ 
  '              <h2 class="fe-heading">Employers are looking for technologists like you!</h2>'+ 
  '              <p class="fe-subheading fe-subheading-desktop">Make your profile visible to actively searching employers.</p>'+ 
  '              <p class="fe-subheading fe-subheading-mobile">Make your profile visible to them.</p>'+ 
  '              <div class="fe-list">'+ 
  '                  <p class="fe-list-text"><b>Don\'t miss your dream job.</b> Employers don\'t always post their open opportunities, </br>but they\'re always looking for technologists with a unique skillset.</p>'+ 
  '  '+ 
  '                  <p class="fe-list-text fe-list-text-desktop"><b>Keep your information secure.</b> When you become visible, we replace your personal email address with a Dice-generated address that routes messages to your normal inbox, giving you control over when you share your personal email address. <a href="https://www.dice.com/support/candidate/candidate-profile/profile---private-email.html" class="fe-link" target="_blank">Learn more</a> about our privacy protections.</p>'+ 
  '                  <p class="fe-list-text fe-list-text-mobile"><b>Keep your information secure.</b> <a href="https://www.dice.com/support/candidate/candidate-profile/profile---private-email.html" class="fe-link" target="_blank">Learn more</a> about our Privacy protections.</p>'+ 
  '              </div>'+ 
  '              <div class="fe-button-section">'+ 
  '                  <p class="fe-button-profile">Make My Profile Visible</p>'+ 
  '                  <p class="fe-button-leter">Maybe Later</p>'+ 
  '              </div>'+ 
  '          </div>'+ 
  '      </div>'+ 
  '  </div>'+ 
  '  </div>';

  function init() {
    
     document.body.classList.add("feDice130-control");
      
      if (!document.querySelector('.fe-popup130')) {
        document.querySelector('body').insertAdjacentHTML('beforeend', fePopup);
      }

    document.querySelector('.fe-popup70 .fe-popup-cross').addEventListener("mousedown", function () {
      document.querySelector('body').classList.remove("fe-popup70-show");
      setCookie('dice-130-popup',true,30);
      trackGAEvent('funnelenvy','click','Closed the overlay');
    });
    document.querySelector('.fe-popup70 .fe-button-leter').addEventListener("mousedown", function () {
      document.querySelector('body').classList.remove("fe-popup70-show");
      setCookie('dice-130-popup',true,30);
      trackGAEvent('funnelenvy','click','Overlay secondary CTA');
    });
    document.querySelector('.fe-button-profile').addEventListener("mousedown", function () {
      document.querySelector('#switchToggle1 .switch.switch-green').click();
      document.querySelector('body').classList.remove("fe-popup70-show");
      setCookie('dice-130-popup',true,30);
      trackGAEvent('funnelenvy','click','Overlay main CTA');
    });
    document.body.classList.add('fe-popup70-show');
    trackGAEvent('funnelenvy','view','Profile Overlay');
   checkAjaxComplete();
   //checkToggleState();
  }
  function checkToggleState(){
    var toggleInterval = setInterval(function () {
      var profileToggle = document.querySelector('#profile-card .card-content-section #switchToggle').parentElement.parentElement.classList.contains('ng-hide');
      var salary = document.querySelector('#profile-card .card-content-section:nth-child(7)').classList.contains('ng-hide');
    if(profileToggle == false && salary == true){
      document.body.classList.add('fe-popup70-show');
    //  FEHelper.insertAfter(document.querySelector('#switchToggle'), document.querySelector('.fe-discover-link'));
      clearInterval(toggleInterval);
    }
    },50);
    setTimeout(function () {
      clearInterval(toggleInterval);
    },8000);
  }
  function checkAjaxComplete(){
    var send = XMLHttpRequest.prototype.send
    XMLHttpRequest.prototype.send = function() { 
        this.addEventListener('load', function() {
            if(this.responseURL.indexOf('https://www.dice.com/config/dice/api.json?path=%2Fprofiles') != -1){
              var data = JSON.parse(this.responseText);
               if(data && data['message']['status'] == 400){
                 document.body.classList.add('fe-dice-visible-error');
               }
            }
        });
        return send.apply(this, arguments)
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

  if(!getCookie('dice-130-popup'))
   FEHelper.onLoadElement('.personal-links-section .searchableFalse', init, 50, 15000);
})();