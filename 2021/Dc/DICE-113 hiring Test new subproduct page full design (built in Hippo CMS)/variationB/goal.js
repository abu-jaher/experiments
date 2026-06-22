function live(selector, event, callback, context) {
    /****Helper Functions****/
    // helper for enabling IE 8 event bindings
    function addEvent(el, type, handler) {
        if (el.attachEvent) el.attachEvent("on" + type, handler);
        else el.addEventListener(type, handler);
    }
    // matches polyfill
    this.Element &&
        (function (ElementPrototype) {
            ElementPrototype.matches =
                ElementPrototype.matches ||
                ElementPrototype.matchesSelector ||
                ElementPrototype.webkitMatchesSelector ||
                ElementPrototype.msMatchesSelector ||
                function (selector) {
                    var node = this,
                        nodes = (
                            node.parentNode || node.document
                        ).querySelectorAll(selector),
                        i = -1;
                    while (nodes[++i] && nodes[i] != node);
                    return !!nodes[i];
                };
        })(Element.prototype);
    // live binding helper using matchesSelector
    function live(selector, event, callback, context) {
        addEvent(context || document, event, function (e) {
            var found,
                el = e.target || e.srcElement;
            while (
                el &&
                el.matches &&
                el !== context &&
                !(found = el.matches(selector))
            )
                el = el.parentElement;
            if (found) callback.call(el, e);
        });
    }
    live(selector, event, callback, context);
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

live('.fe-bottom-form-cta, [href="/hiring/contact-us"]','click',function(){
    trackGAEvent('funnelenvy','click','bottom_cta_clicks')
})

live('.fe_register a','click',function(){
    trackGAEvent('funnelenvy','click','register_here_clicks')
})

// v1 goal
live('.dataTables_wrapper .even:last-of-type td:nth-of-type(2) a','click',function(){
    trackGAEvent('funnelenvy','click','contact_sales_basic')
})

live('.dataTables_wrapper .even:last-of-type td:nth-of-type(3) a','click',function(){
    trackGAEvent('funnelenvy','click','contact_sales_essential')
})

live('.dataTables_wrapper .even:last-of-type td:nth-of-type(4) a','click',function(){
    trackGAEvent('funnelenvy','click','contact_sales_premium')
})

var videoPlay = 0;

function videoPlayClicks(){
    const send = XMLHttpRequest.prototype.send
    XMLHttpRequest.prototype.send = function() { 
        this.addEventListener('load', function() {
            if(this.responseURL.indexOf('v1/player') > -1){
                if(videoPlay == 1) return;
                trackGAEvent('funnelenvy','click','video_play_clicks');
                videoPlay = 1;
            }
        })
        return send.apply(this, arguments)
    }
}

videoPlayClicks();