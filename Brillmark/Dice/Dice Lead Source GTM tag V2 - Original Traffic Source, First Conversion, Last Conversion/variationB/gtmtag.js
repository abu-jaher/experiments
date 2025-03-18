function createCookieV2() {
  
  function waitforMarketo(trigger) {
    var interval = setInterval(function () {
      if (window.MktoForms2) {
        clearInterval(interval);
        trigger();
      }
    }, 50);
    setTimeout(function () {
      clearInterval(interval);
    }, 10000);
  }

 
   if({{getReferrer}}.indexOf('dice.com') > -1){
   } else {
     sessionStorage.setItem('gtm_referrer',{{getReferrer}});
     sessionStorage.setItem('utm_source',{{getUtmSource}});
     sessionStorage.setItem('utm_medium',{{getUtmMedium}});
     sessionStorage.setItem('utm_term',{{getUtmTerm}});
     sessionStorage.setItem('utm_content',{{getUtmContent}});
     sessionStorage.setItem('utm_campaign',{{getUtmCampaign}});
     sessionStorage.setItem('utm_campaign_id',{{getUtmCampaignId}});
   }
 

  function createNewUserData() {
    var currentDate = new Date().toISOString();

    return {
      OTS: {
        utm_source: {{getUtmSource}} ? {{getUtmSource}} : 'undefined',
        utm_medium: {{getUtmMedium}} ? {{getUtmMedium}} : 'undefined',
        utm_term: {{getUtmTerm}} ? {{getUtmTerm}} : 'undefined',
        utm_content: {{getUtmContent}} ? {{getUtmContent}} : 'undefined',
        utm_campaign: {{getUtmCampaign}} ? {{getUtmCampaign}} : 'undefined',
        utm_campaign_id: {{getUtmCampaignId}} ? {{getUtmCampaignId}} : 'undefined',
        dice_web_url: 'https://www.dice.com' + location.pathname,
        referrerURL: {{getReferrer}},
        date: currentDate,
      },
      FC: {
        utm_source: 'undefined',
        utm_medium: 'undefined',
        utm_term: 'undefined',
        utm_content: 'undefined',
        utm_campaign: 'undefined',
        utm_campaign_id: 'undefined',
        dice_web_url: 'undefined',
        referrerURL: 'undefined',
        date: 'undefined',
      },
      LC: {
        utm_source: 'undefined',
        utm_medium: 'undefined',
        utm_term: 'undefined',
        utm_content: 'undefined',
        utm_campaign: 'undefined',
        utm_campaign_id: 'undefined',
        dice_web_url: 'undefined',
        referrerURL: 'undefined',
        date: 'undefined',
      },
    };
  }

  function setUserDataCookie(userData) {
    var cookieValue = JSON.stringify(userData);

    document.cookie =
      'ddw24_1stpartycookie=' +
      cookieValue +
      '; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/; domain=.dice.com';
    
    if (location.href.indexOf('www.dice.com') > -1) {
      localStorage.setItem('ddw24_1stpartycookie', cookieValue);
    }
    
  }

  
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

  function updateUserDataIfNeeded() {
    var userData = {};

    var cookieData =
      getCookie('ddw24_1stpartycookie') ||
      localStorage.getItem('ddw24_1stpartycookie');

    if (!cookieData) {
      userData = createNewUserData();
      setUserDataCookie(userData);
      cookieData = getCookie('ddw24_1stpartycookie');
    }

    waitforMarketo(function (form) {
      MktoForms2.whenReady(function (form) {
        form.onSuccess(function (values, followUpUrl) {
          console.log('Cookie Data Available');
          userData = JSON.parse(cookieData);
          if(userData == null) return;
          console.log('Existing user data:', userData);

          var currentDate = new Date().toISOString();
          var UtmSource = sessionStorage.getItem('utm_source');
          var UtmMedium = sessionStorage.getItem('utm_medium');
          var UtmTerm = sessionStorage.getItem('utm_term');
          var UtmContent = sessionStorage.getItem('utm_content');
          var UtmCamp = sessionStorage.getItem('utm_campaign');
          var UtmCampId = sessionStorage.getItem('utm_campaign_id');

          if (!userData.FC || userData.FC.date == 'undefined') {
            console.log('FC updated');
            userData.FC = {
              utm_source: UtmSource ? UtmSource : 'undefined',
              utm_medium: UtmMedium ? UtmMedium : 'undefined',
              utm_term: UtmTerm ? UtmTerm : 'undefined',
              utm_content: UtmContent ? UtmContent : 'undefined',
              utm_campaign: UtmCamp ? UtmCamp : 'undefined',
              utm_campaign_id: UtmCampId ? UtmCampId : 'undefined',
              dice_web_url: location.href,
              referrerURL: sessionStorage.getItem('gtm_referrer'),
              date: currentDate,
            };
            userData.LC = {
              utm_source: UtmSource ? UtmSource : 'undefined',
              utm_medium: UtmMedium ? UtmMedium : 'undefined',
              utm_term: UtmTerm ? UtmTerm : 'undefined',
              utm_content: UtmContent ? UtmContent : 'undefined',
              utm_campaign: UtmCamp ? UtmCamp : 'undefined',
              utm_campaign_id: UtmCampId ? UtmCampId : 'undefined',
              dice_web_url: location.href,
              referrerURL: sessionStorage.getItem('gtm_referrer'),
              date: currentDate,
            };
          } else {
            console.log('LC updated');
            userData.LC = {
              utm_source: UtmSource ? UtmSource : 'undefined',
              utm_medium: UtmMedium ? UtmMedium : 'undefined',
              utm_term: UtmTerm ? UtmTerm : 'undefined',
              utm_content: UtmContent ? UtmContent : 'undefined',
              utm_campaign: UtmCamp ? UtmCamp : 'undefined',
              utm_campaign_id: UtmCampId ? UtmCampId : 'undefined',
              dice_web_url: location.href,
              referrerURL: sessionStorage.getItem('gtm_referrer'),
              date: currentDate,
            };
          }

          setUserDataCookie(userData);
        });
      });
    });
  }

  updateUserDataIfNeeded();
}

createCookieV2();