(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "ss9";

    /* helper library */
    var _$;
    !(function (factory) {
      _$ = factory();
    })(function () {
      var bm = function (s) {
        if (typeof s === "string") {
          this.value = Array.prototype.slice.call(document.querySelectorAll(s));
        }
        if (typeof s === "object") {
          this.value = [s];
        }
      };
      bm.prototype = {
        eq: function (n) {
          this.value = [this.value[n]];
          return this;
        },
        each: function (fn) {
          [].forEach.call(this.value, fn);
          return this;
        },
        log: function () {
          console && console.log(this);
        },
         live : function(selector, event, callback, context) {
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
          },
          addClass: function (v) {
            var a = v.split(" ");
            return this.each(function (i) {
              for (var x = 0; x < a.length; x++) {
                if (i.classList) {
                  i.classList.add(a[x]);
                } else {
                  i.className += " " + a[x];
                }
              }
            });
          },  
        waitForElement: function (
          selector,
          trigger,
          delayInterval,
          delayTimeout
        ) {
          var interval = setInterval(function () {
            if (_$(selector).value.length) {
              clearInterval(interval);
              trigger();
            }
          }, delayInterval);
          setTimeout(function () {
            clearInterval(interval);
          }, delayTimeout);
        },
      };
      return function (selector) {
        return new bm(selector);
      };
    });

      function live(selector, event, callback, context) {
        /****Helper Functions****/
        // helper for enabling IE 8 event bindings
        function addEvent(el, type, handler) {
          if (el.attachEvent) el.attachEvent("on" + type, handler);
          else el.addEventListener(type, handler);
        }
        // matches polyfill
        this && this.Element &&
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

    var helper = _$();
    /* Variation Init */

    function init() {

      var desktopWhoWeserve = 0;
      var desktopSolutions = 0;
      var desktopProducts = 0;
      var desktopPackages = 0;
      var desktopSupportServices = 0;
      var desktopBlogResources = 0;
      var desktopAboutUs = 0
      


     // Desktop Goals
      live('.desktop-nav .header-primary > .menu > li:nth-child(1)','mouseover',function(){
        if(desktopWhoWeserve == 0){
          trackGAEvent('funnelenvy','hover','Who we serve');
          desktopWhoWeserve = 1;
        }
        
      });
      live('.desktop-nav .header-primary > .menu > li:nth-child(2)','mouseover',function(){
        if(desktopSolutions == 0){
          trackGAEvent('funnelenvy','hover','Solutions');
          desktopSolutions = 1;
       }
        
      });
      live('.desktop-nav .header-primary > .menu > li:nth-child(3)','mouseover',function(){
        if(desktopProducts == 0){
          trackGAEvent('funnelenvy','hover','Products');
          desktopProducts = 1;
        }
        
      });
      live('.desktop-nav .header-primary > .menu > li:nth-child(5)','mouseover',function(){
        if(desktopPackages == 0){
          trackGAEvent('funnelenvy','hover','Packages');
          desktopPackages = 1;
     }
        
      });
      live('.desktop-nav .header-primary > .menu > li:nth-child(4)','mouseover',function(){
        if(desktopSupportServices == 0){     
          trackGAEvent('funnelenvy','hover','Support/ Services + Support');
          desktopSupportServices = 1;
        }
        
      });
      live('.desktop-nav .header-primary > .menu > li:nth-child(6)','mouseover',function(){
        if(desktopBlogResources == 0){      
          trackGAEvent('funnelenvy','hover','Blog/Resources');
          desktopBlogResources = 1;
      }
        
      });
      live('.desktop-nav .header-primary > .menu > li:nth-child(7)','mouseover',function(){
        if(desktopAboutUs == 0){      
          trackGAEvent('funnelenvy','hover','About Us');
          desktopAboutUs = 1;
        }
        
      });

      var mobleWhoWeserve = 0;
      var mobleSolutions = 0;
      var mobleProducts = 0;
      var moblePackages = 0;
      var mobleSupportServices = 0;
      var mobleBlogResources = 0;
      var mobleAboutUs = 0;
      var mobleLogin = 0;
      var mobleRequestDemo = 0;



      //Mobile Goals
      live('.mobile-nav .header-primary > .menu > .menu-item:nth-child(1) > .dropdown','click',function(){
        if(mobleWhoWeserve == 0){      
          trackGAEvent('funnelenvy','click','Who we serve');
          mobleWhoWeserve = 1;
        }
      })
      live('.mobile-nav .header-primary > .menu > .menu-item:nth-child(3) > .dropdown','click',function(){
        if(mobleProducts == 0){      
          trackGAEvent('funnelenvy','click','Products');
          mobleProducts = 1;
        }
      })
      live('.mobile-nav .header-primary > .menu > .menu-item:nth-child(2) > .dropdown','click',function(){
        if(mobleSolutions == 0){      
          trackGAEvent('funnelenvy','click','Solutions');
         mobleSolutions = 1;
       }

      })
      live('.mobile-nav .header-primary > .menu > .menu-item:nth-child(5) > .dropdown','click',function(){
        if(moblePackages == 0){      
          trackGAEvent('funnelenvy','click','Packages');
          moblePackages = 1;
      }
      })
      live('.mobile-nav .header-primary > .menu > .menu-item:nth-child(4) > .dropdown','click',function(){
        if(mobleSupportServices == 0){      
          trackGAEvent('funnelenvy','click','Support/ Services + Support');
          mobleSupportServices = 1;
        }
      })
      live('.mobile-nav .header-primary > .menu > .menu-item:nth-child(6) > .dropdown','click',function(){
        if(mobleBlogResources == 0){      
          trackGAEvent('funnelenvy','click','Blog/Resources');
          mobleBlogResources = 1;
        }
      })
      live('.mobile-nav .header-primary > .menu > .menu-item:nth-child(7) > .dropdown','click',function(){
        if(mobleAboutUs == 0){      
          trackGAEvent('funnelenvy','click','About Us');
          mobleAboutUs = 1;
       }

      })
      live('.mobile-nav .header-secondary > .menu > li:nth-child(4)','click',function(){
        if(mobleLogin == 0){      
          trackGAEvent('funnelenvy','click','Login');
          mobleLogin = 1;
        }
      })
      live('.mobile-nav .header-secondary > .menu > li:nth-child(3)','click',function(){
        if(mobleRequestDemo == 0){       
          trackGAEvent('funnelenvy','click','Request Demo')
          mobleRequestDemo = 1;
         }
      })

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
    helper.waitForElement(".mobile-nav .header-primary", init, 100, 25000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();