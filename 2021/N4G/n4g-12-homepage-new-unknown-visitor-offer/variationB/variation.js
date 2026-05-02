(function() {
  var debug = 0;
  var variation_name = "N4G-12: [Homepage] New/Unknown Visitor Offer";

  if (window.location.href.indexOf('qa-debug') > -1 || localStorage.getItem('qa_debug')) {
    debug = 1;
    localStorage.setItem('qa_debug', true);
    console.log('>> ' + variation_name);
  }

  try {
    function waitForElement(selector, trigger, delayInterval, delayTimeout) {
      var interval = setInterval(function() {
        if (
          document &&
          document.querySelector(selector) &&
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
    
    function debugMessage(message) {
      if (debug) {
        console.log(message);
      }
    }
   
    var video = ''+
    '  <div class="wistia_responsive_padding bm-video" style="padding:56.25% 0 0 0;position:relative;">'+
    '    <div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;">'+
    '      <span id="popover_preview_embed" class="wistia_embed wistia_async_hzl3lx2l1g container=popover_preview_embed popover=true popoverAnimateThumbnail=true videoFoam=true" style="display:inline-block;height:100%;position:relative;width:100%">&nbsp;'+
    '      </span>'+
    '    </div>'+
    '</div>';
    
    var bmCTA = ''+
    '  <div class = "bm-CTA-container">'+
    '    <button class = "bm-CTA">Watch a product overview</button>'+
    '  </div>';

    function init() {
      debugMessage('>>inside init function');
      document.body.insertAdjacentHTML('afterbegin', video);
      document.querySelector('.organization .section__actions .btn').insertAdjacentHTML('afterend', bmCTA);
      document.querySelector('.bm-CTA').addEventListener('click', function(){
        debugMessage('>>bm-CTA click');
        document.body.classList.add('wistia_popover_mode');
        document.body.style.width = '100%';
        document.body.style.overflowX = 'hidden';
        document.querySelector('.wistia_responsive_padding.bm-video .wistia_click_to_play div').click();
      });
    }
    waitForElement("body", init, 50, 10000);

  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
