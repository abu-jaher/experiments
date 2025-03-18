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

  function createNewUserData() {
    var currentDate = new Date().toISOString();

    return {
      firstTouchUTMs: {
        utmParams: {
          utm_source: getUtmSource(),
          utm_medium: getUtmMedium(),
          utm_campaign: getUtmCampaign(),
          utm_term: getUtmTerm(),
          utm_content: getUtmContent(),
        },
        timestamp: currentDate,
      },
      lastTouchUTMs: {
        utmParams: {
          utm_source: getUtmSource(),
          utm_medium: getUtmMedium(),
          utm_campaign: getUtmCampaign(),
          utm_term: getUtmTerm(),
          utm_content: getUtmContent(),
        },
        timestamp: currentDate,
      },
      firstTouchReferrer: {
        referrerURL: document.referrer,
        timestamp: currentDate,
      },
      lastTouchReferrer: {
        referrerURL: document.referrer,
        timestamp: currentDate,
      },
    };
  }

  function setUserDataCookie(userData) {
    var cookieValue = JSON.stringify(userData);

    document.cookie =
      'diceUserInteractionData=' +
      cookieValue +
      '; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';

    localStorage.setItem('diceUserInteractionData', cookieValue);
  }

  function updateUserDataIfNeeded() {
    var userData = {};

    var cookieData =
      getCookie('diceUserInteractionData') ||
      localStorage.getItem('diceUserInteractionData');

    if (cookieData) {
      console.log('Cookie Data Available');
      userData = JSON.parse(cookieData);
      console.log('Existing user data:', userData);

      var currentDate = new Date().toISOString();

      if (
        !userData.lastTouchUTMs ||
        currentDate !== userData.lastTouchUTMs.timestamp
      ) {
        userData.lastTouchUTMs = {
          utmParams: {
            utm_source: getUtmSource(),
            utm_medium: getUtmMedium(),
            utm_campaign: getUtmCampaign(),
            utm_term: getUtmTerm(),
            utm_content: getUtmContent(),
          },
          timestamp: currentDate,
        };
      }

      if (
        !userData.lastTouchReferrer ||
        currentDate !== userData.lastTouchReferrer.timestamp &&
        document.referrer.indexOf("dice.com") === -1
      ) {
        userData.lastTouchReferrer = {
          referrerURL: document.referrer,
          timestamp: currentDate,
        };
      }

      setUserDataCookie(userData);
      console.log('LastTouch Data Updated ===>', userData);
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