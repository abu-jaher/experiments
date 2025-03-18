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
								nodes = (node.parentNode || node.document).querySelectorAll(
									selector
								),
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
	  var fesubnav = '' +
		'  <div class="fe-sebmenu">' +
		'      <div class="fe-topcontent">' +
		'          <div class="fe-main-sec fe-overview">' +
		'              <h4 class="fe-heading">Overview</h4>' +
		'              <li>'+
		'              <a href="https://www.networkforgood.com/all-in-one-platform/">All-In-One Platform' +
		'              </a>' +
		'              <p class="fe-subcontent">Everything You Need From a Fundraising Software</p>' +
		'              </li>'+
		'          </div>' +
		'          <div class="fe-main-sec fe-feature">' +
		'              <h4 class="fe-heading">Features</h4>' +
		'              <div class="fe-feature-content">'+
		'              <ul>' +
		'                  <li>' +
		'                      <a href="https://www.networkforgood.com/all-in-one-platform/donor-management/"> <span class="fe-feature-icon donor-management"><img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/10/Donor-Management.png" alt=""></span>' +
		'                        <div class="fe-feature-option">'+        
		'                        <span>Donor Management</span> '+
		'                        <p class="fe-subcontent">Organize and Manage <br> Contacts Effortlessly</p>'+
		'                        </div>'+
		'                      </a>' +
		'                  </li>' +
		'                  <li>' +
		'                      <a href="https://www.networkforgood.com/all-in-one-platform/communication/"> <span class="fe-feature-icon Communications"><img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/10/Communications.png" alt=""></span>' +
		'                      <div class="fe-feature-option">'+   
		'                        <span>Communications</span>'+
		'                        <p class="fe-subcontent"> Communicate With a Personalized Touch</p>'+
		'                        </div>'+
		'                      </a>' +
		'                  </li>' +
		'                  <li>' +
		'                      <a href="https://www.networkforgood.com/all-in-one-platform/measurement-and-tracking/"> <span class="fe-feature-icon Measurement"><img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/10/Measurement-&-Tracking.png" alt=""></span> ' +
		'                      <div class="fe-feature-option">'+  
		'                        <span>Measurement & Tracking</span>'+
		'                        <p class="fe-subcontent"> Easily Understand Your Fundraising Campaign Results</p>'+
		'                      </div>'+
		'                      </a>' +
		'                  </li>' +
		'              </ul>' +
		'              <ul>' +
		'                  <li>' +
		'                      <a href="https://www.networkforgood.com/all-in-one-platform/online-fundraising/"> <span class="fe-feature-icon Online-Fundraising"><img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/10/Online-Fundraising.png" alt=""></span>' +
		'                       <div class="fe-feature-option">'+  
		'                         <span>Online Fundraising</span>'+
		'                         <p class="fe-subcontent">Transform Your Online Fundraising With a Few Clicks</p>'+
		'                        </div>'+
		'                      </a>' +
		'                  </li>' +
		'                  <li>' +
		'                      <a href="https://www.networkforgood.com/all-in-one-platform/events-auctions/"> <span class="fe-feature-icon Events-Auctions"><img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/10/Events-&-Auctions.png" alt=""></span>' +
		'                       <div class="fe-feature-option">'+  
		'                        <span>Events & Auctions</span>'+
		'                        <p class="fe-subcontent">Host your most successful fundraising event ever</p>'+
		'                       </div>'+
		'                      </a>' +
		'                  </li>' +
		'              </ul>' +
		'              </div>'+
		'          </div>' +
		'      </div>' +
		'      <div class="fe-bottomcontent">' +
		'          <div class="fe-content">' +
		'              <div class="fe-bottomicon">' +
		'                  <img src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/10/Money%20Back%20Guarantee.png" alt="">' +
		'              </div>' +
		'              <div class="fe-text-content">' +
		'                  <p class="fe-bottom-title"><span>Money Back Guarantee.</span> The only fundraising software that guarantees your nonprofit\'s success.<span class="fe-termsconditions"> <a href="https://www.networkforgood.com/legal/terms/">Terms and conditions apply.</a></span>' +
		'                  </p>' +
		'                  <a href="https://www.networkforgood.com/demo-request/" class="fe-freedemo">Get a Free Demo</a>' +
		'              </div>' +
		'          </div>' +
		'      </div>' +
		'  </div>';
  
	  /* Variation Init */
	  function init() {
		// change text
		waitForElement('.fe-nav', function(){
			console.log('test')
			document.querySelector('body').classList.add('fe-test-ng10')
		}, 50 , 15000)
		document.querySelector('#menu-main-menu > li:nth-child(2) > a').innerText ='Product'
		document.querySelector('#menu-main-menu > li:nth-child(2)').insertAdjacentHTML('beforeend', fesubnav)
		live('.header__nav li a','click',function(){
			trackGAEvent('Nav-item-click','GA_Click','Nav-click');
		 });
		 /* remove attr*/
		 document.querySelector(' #menu-main-menu > li:nth-child(2) a').removeAttribute("href")

	  }
	  /* Initialise variation */
	  function trackGAEvent(eventCategory, eventAction, eventLabel) {
			if ('ga' in window) {
				ga.getAll()[0].send('event', {
					eventCategory: eventCategory,
					eventAction: eventAction,
					eventLabel: eventLabel,
				});
			}
		}
		
		waitForElement("#menu-main-menu > li > a", init, 50, 15000);
	 
	} catch (e) {
	  if (debug) console.log(e, "error in Test" + variation_name);
	}
  })()