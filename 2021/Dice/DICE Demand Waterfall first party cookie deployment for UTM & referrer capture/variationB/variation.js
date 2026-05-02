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

function setValue(selector, value) {
  var getFormElement = MktoForms2.allForms()[0].getFormElem()[0];
  var element = getFormElement.querySelector(selector);
  if (element) {
    element.value = value;
  }
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

waitforMarketo(function () {
  var diceUserInteractionData = localStorage.getItem('diceUserInteractionData') !== null ? localStorage.getItem('diceUserInteractionData') : getCookie('diceUserInteractionData');

  if (diceUserInteractionData) {
    var cookieData = JSON.parse(diceUserInteractionData);

    var lastTouchUtmParams = cookieData.lastTouchUTMs.utmParams;
    var lastTouchUtmReferrer = cookieData.lastTouchReferrer;

    var firstTouchUtmParams = cookieData.firstTouchUTMs.utmParams;
    var firstTouchUtmReferrer = cookieData.firstTouchReferrer;

    // Create an object to store the values
    var fieldMapping = {
      'diceUTMSource': lastTouchUtmParams.utm_source ? lastTouchUtmParams.utm_source : '',
      'diceUTMMedium': lastTouchUtmParams.utm_medium ? lastTouchUtmParams.utm_medium : '',
      'diceUTMCampaign': lastTouchUtmParams.utm_campaign ? lastTouchUtmParams.utm_campaign : '',
      'diceUTMTerm': lastTouchUtmParams.utm_term ? lastTouchUtmParams.utm_term : '',
      'diceUTMContent': lastTouchUtmParams.utm_content ? lastTouchUtmParams.utm_content : '',
      'diceUTMTermTimeStamp': cookieData.lastTouchUTMs.timestamp ? cookieData.lastTouchUTMs.timestamp : '',
      'lastTouchReferrer': lastTouchUtmReferrer.referrerURL ? lastTouchUtmReferrer.referrerURL : '',
      'lastTouchReferrerDate': lastTouchUtmReferrer.timestamp ? lastTouchUtmReferrer.timestamp : '',
      'firstTouchUTMSource': firstTouchUtmParams.utm_source ? firstTouchUtmParams.utm_source : '',
      'firstTouchUTMMedium': firstTouchUtmParams.utm_medium ? firstTouchUtmParams.utm_medium : '',
      'firstTouchUTMCampaign': firstTouchUtmParams.utm_campaign ? firstTouchUtmParams.utm_campaign : '',
      'firstTouchUTMTerm': firstTouchUtmParams.utm_term ? firstTouchUtmParams.utm_term : '',
      'firstTouchUTMContent': firstTouchUtmParams.utm_content ? firstTouchUtmParams.utm_content : '',
      'firstTouchUTMDate': cookieData.firstTouchUTMs.timestamp ? cookieData.firstTouchUTMs.timestamp : '',
      'firstTouchReferrer': firstTouchUtmReferrer.referrerURL ? firstTouchUtmReferrer.referrerURL : '',
      'firstTouchReferrerDate': firstTouchUtmReferrer.timestamp ? firstTouchUtmReferrer.timestamp : '',
    };

    MktoForms2.whenReady(function () {
      for (var field in fieldMapping) {
        setValue('[name="' + field + '"]', fieldMapping[field]);
      }
    });
  }
});