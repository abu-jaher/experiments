function Testing() {
  function getUtmSource() {
    var url = window.location.href;
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (pair[0] === 'utm_source') {
        return decodeURIComponent(pair[1]);
      }
    }
    return null;
  }

  function getUtmMedium() {
    var url = window.location.href;
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (pair[0] === 'utm_medium') {
        return decodeURIComponent(pair[1]);
      }
    }
    return null;
  }

  function getUtmCampaign() {
    var url = window.location.href;
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (pair[0] === 'utm_campaign') {
        return decodeURIComponent(pair[1]);
      }
    }
    return null;
  }

  function getUtmTerm() {
    var url = window.location.href;
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (pair[0] === 'utm_term') {
        return decodeURIComponent(pair[1]);
      }
    }
    return null;
  }

  function getUtmContent() {
    var url = window.location.href;
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (pair[0] === 'utm_content') {
        return decodeURIComponent(pair[1]);
      }
    }
    return null;
  }

  function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.indexOf(name + '=') === 0) {
        return cookie.substring(name.length + 1, cookie.length);
      }
    }
    return null;
  }

  function waitforMarketo(trigger){
    var interval = setInterval(function() {
      if ( 
        window.MktoForms2
      ) {
        clearInterval(interval); 
        trigger(); 
      }
    }, 50); 
    setTimeout(function() {
      clearInterval(interval);
    }, 10000);
  }

  function createNewUserData() {
    var currentDate = new Date().toISOString();

    return {
      OTS: {
        utm_source: getUtmSource() ? getUtmSource() : "undefined",
        utm_medium: getUtmMedium() ? getUtmMedium() : "undefined",
        utm_campaign: getUtmCampaign() ? getUtmCampaign() : "undefined",
        utm_term: getUtmTerm() ?  getUtmTerm() : "undefined",
        utm_content: getUtmContent() ? getUtmContent() :  "undefined",
        dice_web_url: 'https://www.dice.com'+location.pathname,
        referrerURL: document.referrer,
        timestamp: currentDate,
      },
      FC: {
        utm_source: "undefined",
        utm_medium: "undefined",
        utm_campaign: "undefined",
        utm_term: "undefined",
        utm_content: "undefined",
        dice_web_url: "undefined",
        referrerURL: "undefined",
        timestamp: "undefined",
      },
      LC: {
        utm_source: "undefined",
        utm_medium: "undefined",
        utm_campaign: "undefined",
        utm_term: "undefined",
        utm_content: "undefined",
        dice_web_url: "undefined",
        referrerURL: "undefined",
        timestamp: "undefined",
      },
    };
  }

  function setUserDataCookie(userData) {
    var cookieValue = JSON.stringify(userData);

    document.cookie =
      'ddw24_1stpartycookie=' +
      cookieValue +
      '; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';

    localStorage.setItem('ddw24_1stpartycookie', cookieValue);
  }

  function updateUserDataIfNeeded() {
    var userData = {};

    var cookieData =
      getCookie('ddw24_1stpartycookie') ||
      localStorage.getItem('ddw24_1stpartycookie');

    if (cookieData) {
      waitforMarketo(function(form){
        MktoForms2.whenReady(function (form) {
          form.onSuccess(function(values, followUpUrl) {
            console.log('Cookie Data Available');
            userData = JSON.parse(cookieData);
            console.log('Existing user data:', userData);
      
            var currentDate = new Date().toISOString();
      
            if (
              !userData.FC || userData.FC.timestamp == 'undefined'
            ) {
              console.log('FC updated')
              userData.FC = {
                utm_source: getUtmSource() ? getUtmSource() : "undefined",
                utm_medium: getUtmMedium() ? getUtmMedium() : "undefined",
                utm_campaign: getUtmCampaign() ? getUtmCampaign() : "undefined",
                utm_term: getUtmTerm() ?  getUtmTerm() : "undefined",
                utm_content: getUtmContent() ? getUtmContent() :  "undefined",
                dice_web_url: 'https://www.dice.com'+location.pathname,
                referrerURL: document.referrer,
                timestamp: currentDate,
              };
              userData.LC = {
                utm_source: getUtmSource() ? getUtmSource() : "undefined",
                utm_medium: getUtmMedium() ? getUtmMedium() : "undefined",
                utm_campaign: getUtmCampaign() ? getUtmCampaign() : "undefined",
                utm_term: getUtmTerm() ?  getUtmTerm() : "undefined",
                utm_content: getUtmContent() ? getUtmContent() :  "undefined",
                dice_web_url: 'https://www.dice.com'+location.pathname,
                referrerURL: document.referrer,
                timestamp: currentDate,
              };
            }else{
              console.log('LC updated')
              userData.LC = {
                utm_source: getUtmSource() ? getUtmSource() : "undefined",
                utm_medium: getUtmMedium() ? getUtmMedium() : "undefined",
                utm_campaign: getUtmCampaign() ? getUtmCampaign() : "undefined",
                utm_term: getUtmTerm() ?  getUtmTerm() : "undefined",
                utm_content: getUtmContent() ? getUtmContent() :  "undefined",
                dice_web_url: 'https://www.dice.com'+location.pathname,
                referrerURL: document.referrer,
                timestamp: currentDate,
              };
            }
      
            setUserDataCookie(userData);
            console.log('Data Updated ===>', userData);
          });
        });
      
      })
    } else {
      console.log('Cookie Data not available');
      userData = createNewUserData();
      setUserDataCookie(userData);
      console.log('New data created ===>', userData);
    }
  }

  updateUserDataIfNeeded();
}

Testing();