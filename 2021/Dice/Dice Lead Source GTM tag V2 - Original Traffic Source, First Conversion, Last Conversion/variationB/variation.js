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
  var diceUserInteractionData = localStorage.getItem('ddw24_1stpartycookie') !== null ? localStorage.getItem('ddw24_1stpartycookie') : getCookie('ddw24_1stpartycookie');

  if (diceUserInteractionData) {
    var cookieData = JSON.parse(diceUserInteractionData);

    var OTS_Data = cookieData.OTS;
    var FC_Data = cookieData.FC;
    var LC_Data = cookieData.LC;

    // Create an object to store the values
    var fieldMapping = {
      'OTS UTM Source': OTS_Data.utm_source,
      'OTS UTM Medium': OTS_Data.utm_medium,
      'OTS UTM Campaign': OTS_Data.utm_campaign,
      'OTS UTM Term': OTS_Data.utm_term,
      'OTS UTM Content': OTS_Data.utm_content,
      'OTS Dice WebUrl': OTS_Data.dice_web_url,
      'OTS UTM Referrer': OTS_Data.referrerURL,
      'OTS UTM TimeStamp': OTS_Data.timestamp,


      'FC UTM Source': FC_Data.utm_source,
      'FC UTM Medium': FC_Data.utm_medium,
      'FC UTM Campaign': FC_Data.utm_campaign,
      'FC UTM Term': FC_Data.utm_term,
      'FC UTM Content': FC_Data.utm_content,
      'FC Dice WebUrl': FC_Data.dice_web_url,
      'FC UTM Referrer': FC_Data.referrerURL,
      'FC UTM TimeStamp': FC_Data.timestamp,


      'LC UTM Source': LC_Data.utm_source,
      'LC UTM Medium': LC_Data.utm_medium,
      'LC UTM Campaign': LC_Data.utm_campaign,
      'LC UTM Term': LC_Data.utm_term,
      'LC UTM Content': LC_Data.utm_content,
      'LC Dice WebUrl': LC_Data.dice_web_url,
      'LC UTM Referrer': LC_Data.referrerURL,
      'LC UTM TimeStamp': LC_Data.timestamp,
      
    };

    MktoForms2.whenReady(function () {
      for (var field in fieldMapping) {
        setValue('[name="' + field + '"]', fieldMapping[field]);
      }
    });
  }
});