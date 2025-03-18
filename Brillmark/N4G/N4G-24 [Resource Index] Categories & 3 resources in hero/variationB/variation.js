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

    function live(selector, event, callback, context) {
      /****Helper Functions****/
      // helper for enabling IE 8 event bindings
      function addEvent(el, type, handler) {
        if (el.attachEvent) el.attachEvent('on' + type, handler);
        else el.addEventListener(type, handler);
      }
      // matches polyfill
      this.Element && function (ElementPrototype) {
        ElementPrototype.matches = ElementPrototype.matches ||
          ElementPrototype.matchesSelector ||
          ElementPrototype.webkitMatchesSelector ||
          ElementPrototype.msMatchesSelector ||
          function (selector) {
            var node = this,
              nodes = (node.parentNode || node.document).querySelectorAll(selector),
              i = -1;
            while (nodes[++i] && nodes[i] != node);
            return !!nodes[i];
          };
      }(Element.prototype);
      // live binding helper using matchesSelector
      function live(selector, event, callback, context) {
        addEvent(context || document, event, function (e) {
          var found, el = e.target || e.srcElement;
          while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
          if (found) callback.call(el, e);
        });
      }
      live(selector, event, callback, context);
    }

    /* Variation functions */
    var btnList =''+ 
    '  <div class="fe_innerbtn">'+ 
    '      <ul class="fe_btnMain">'+ 
    '          <a href="https://www.networkforgood.com/resources/blog/">'+ 
    '              <li class="fe_btnList">Blog Posts</li>'+ 
    '          </a>'+ 
    '          <a href="https://www.networkforgood.com/resources/webinars-events/">'+ 
    '              <li class="fe_btnList">Webinars & Events</li>'+ 
    '          </a>'+ 
    '          <a href="https://www.networkforgood.com/resources/guides-templates/">'+ 
    '              <li class="fe_btnList">Guides & Templates</li>'+ 
    '          </a>'+ 
    '          <a href="https://www.networkforgood.com/resources/case-studies/">'+ 
    '              <li class="fe_btnList">Case Studies</li>'+ 
    '          </a>'+ 
    '          <a href="https://www.networkforgood.com/accidental-fundraiser/">'+ 
    '              <li class="fe_btnList">Podcast</li>'+ 
    '          </a>'+ 
    '      </ul>'+ 
    '  </div>';


    var rightContent = '' +
      '  <div class="fe_container">' +
      '          <div class="fe_right_content">' +
      '              <div class="fe_right_cards_up fe_guides">' +
      '              </div>' +
      '              <div class="fe_right_cards_bellow fe_right_cards_up">' +
      '              </div>' +
      '          </div>' +
      '      </div>' +
      '  </div>';


    /* Variation Init */
    function init() {
      /* start your code here */
      document.querySelector('.hero__head').insertAdjacentHTML('afterend', btnList)
      document.querySelector('.hero__body').insertAdjacentHTML('beforeend', rightContent);

      document.querySelector('.hero__bg.hero__bg--left img').setAttribute('src','https://d27c6j8064skg9.cloudfront.net/FE/N4G/24/hero-bg-left.png');
      document.querySelector('.hero__bg.hero__bg--right img').setAttribute('src','https://d27c6j8064skg9.cloudfront.net/FE/N4G/24/hero-bg-right.png');

      document.querySelector(".hero__body .btn-transparent").classList.add("fe_right_read_more");
      var paragraphURL = document.querySelector('.hero__body .btn-transparent').getAttribute('href');

      // paragraph ajax
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

          var fetchD = document.createElement('div');
          fetchD.innerHTML = this.responseText;
          var fe_maindiv = fetchD.querySelector('.section-guide .section__content:first-child p');
          document.querySelector('.hero__body > .resource .resource__title').insertAdjacentElement('afterend',fe_maindiv);

        }

      };
      xhttp.open("GET", paragraphURL, true);
      xhttp.send();


      // 1st ajax
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

          var fetchD = document.createElement('div');
          fetchD.innerHTML = this.responseText;
          var fe_maindiv = fetchD.querySelector('.hero__body .resources__item');
          document.querySelector('.fe_right_cards_bellow').innerHTML = fe_maindiv.innerHTML;

        }

      };
      xhttp.open("GET", "https://www.networkforgood.com/resources/blog/", true);
      xhttp.send();



      // 2nd ajax calling 
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

          var fetchD = document.createElement('div');
          fetchD.innerHTML = this.responseText;
          var fe_maindiv = fetchD.querySelector('.hero__body .resources__item');
          document.querySelector('.fe_right_cards_up').innerHTML = fe_maindiv.innerHTML;

        }

      };
      xhttp.open("GET", " https://www.networkforgood.com/resources/guides-templates/", true);
      xhttp.send();

      document.querySelector('.hero__body > .resource .resource__tags a').innerHTML = 'Featured';

      setTimeout(function(){
        document.querySelector('.fe_right_cards_bellow.fe_right_cards_up .resource__image a').innerHTML = '<img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/24/thank-you-big.jpeg" loading="lazy" alt="Thank You Donors!" class="attachment-medium_large size-medium_large wp-post-image">';
      }, 2000);


      // goals

      live('.fe_btnMain a','click',function(){
        trackGAEvent('funnelenvy','Click','Clicks on the categories below the headline');
      })

      // cta clicked
      live('.hero__body .fe_right_read_more','click',function(){
        trackGAEvent('funnelenvy','Click','Clicks on Featured "Read more" CTA')
      })

      live('.hero__body .fe_guides .resource__actions a','click',function(){
        trackGAEvent('funnelenvy','Click','Clicks on Guides & Templates "Read more" CTA')
      })

      live('.hero__body .fe_right_cards_bellow .resource__actions a','click',function(){
        trackGAEvent('funnelenvy','Click','Clicks on Blog posts "Read more" CTA')
      })

      // resource type cta clicked
      live('.hero__body > .resource .resource__tags ul li a','click',function(){
        trackGAEvent('funnelenvy','Click','Clicks on Featured Topic')
      })

      live('.hero__body .fe_guides .resource__tags ul li a','click',function(){
        trackGAEvent('funnelenvy','Click','Clicks on Guides & Templates Topic')
      })

      live('.hero__body .fe_right_cards_bellow .resource__tags ul li a','click',function(){
        trackGAEvent('funnelenvy','Click','Clicks on Blog posts Topic')
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
    if(window.screen.width > 1199){
      waitForElement('.hero__body', init, 50, 15000);   
    }

  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
