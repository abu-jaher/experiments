(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "";

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
        append: function (v) {
                  return this.each(function (i) {
                    i.insertAdjacentHTML('beforeEnd', v);
                  });
                },
        appendElement:   function (v) {
          return this.each(function (i) {
            i.insertAdjacentElement('beforeEnd', v);
          });
        },     
        prepend: function (v) {
                  return this.each(function (i) {
                    i.insertAdjacentHTML('afterBegin', v);
                  });
                },
         html: function (v) {
                  return typeof v == 'undefined'
                    ? this.value[0].innerHTML
                    : this.each(function (i) {
                        i.innerHTML = v;
                      });
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
         removeClass: function (v) {
                  var a = v.split(' ');
                  return this.each(function (i) {
                    for (var x = 0; x < a.length; x++) {
                      if (i.classList) {
                        i.classList.remove(a[x]);
                      } else {
                        i.className = i.className.replace(
                          new RegExp('\\b' + a[x] + '\\b', 'g'),
                          ''
                        );
                      }
                    }
                  });
                },  
          toggleClass: function(v) {
                    var a = v.split(' ');
                    return this.each(function (i) {
                      for (var x = 0; x < a.length; x++) {
                        if (i.classList) {
                          i.classList.toggle(a[x]);
                        } else {
                          if (new RegExp('\\b' + a[x] + '\\b').test(i.className)) {
                            i.className = i.className.replace(
                              new RegExp('\\b' + a[x] + '\\b', 'g'),
                              ''
                            );
                          } else {
                            i.className += ' ' + a[x];
                          }
                        }
                      }
                    });
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

    var helper = _$();

    var closeIcon = ''+ 
    '  <svg class="fe_close" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="#131619">'+ 
    '         <path d="M6.22566 4.81096C5.83514 4.42044 5.20197 4.42044 4.81145 4.81096C4.42092 5.20148 4.42092 5.83465 4.81145 6.22517L10.5862 11.9999L4.81151 17.7746C4.42098 18.1651 4.42098 18.7983 4.81151 19.1888C5.20203 19.5793 5.8352 19.5793 6.22572 19.1888L12.0004 13.4141L17.7751 19.1888C18.1656 19.5793 18.7988 19.5793 19.1893 19.1888C19.5798 18.7983 19.5798 18.1651 19.1893 17.7746L13.4146 11.9999L19.1893 6.22517C19.5799 5.83465 19.5799 5.20148 19.1893 4.81096C18.7988 4.42044 18.1657 4.42044 17.7751 4.81096L12.0004 10.5857L6.22566 4.81096Z" fill="#131619"/>'+ 
    '  </svg>';

    var fe_wrapper = ''+
    '<div class="fe_wrapper">'+
    '      <div class="fe_wrapper--content"></div>'+
    '</div>';

    /* Variation Init */
    function init() {
      
      _$('.additional-options .addon-plan-container').append(closeIcon);
      _$('body').append('<div class="fe_overlay"></div>');

      helper.live('.zm-tabs__nav .zm-tabs__item','click',function(){
        _$('.fe_overlay').toggleClass('show');
      })

      _$('.form-item.additional-options-form #section-title').html('Add more value to your Zoom platform');
      // cloud storage
      _$('#pane-cmr .addon-header').prepend('<img src="https://us01st-cf.zoom.us/fe-static/billing-web/img/cloud.61205805.svg" alt="" srcset="" class="plan-icon">');
      _$('.additional-options #pane-cmr .addon-plan-title').html('Cloud Storage');
      _$('.additional-options #pane-cmr .addon-plan-tips').html('Download, stream, or share all of your meetings and <br>webinars with the Zoom Cloud storage.');
     
      _$('.additional-options #pane-cmr .form-item').append(''+
      '<p class="fe_add disable">Add</p>'+
      '<p class="fe_cloudDisclaimer">*Excess fees are charged when storage limits are exceeded.<br> Fees vary based on storage plan. 30 GB:$1.5 per GB; 200 GB:$1.5 per GB; 1 TB:$0.5 per GB; 5 TB:$0.1 per GB;</p>'
      );
      
      _$('.zm-tabs__nav  #tab-cmr .plan-name').html(''+
      '<p class="fe_title">Cloud Storage</p>'+
      '<p class="fe_startingPrice">From $10/month</p>'+
      '<p class="fe_disclaimer">Add more capacities to your 5 GB cloud storage</p>'
      )

      // cloud storage add button
      helper.live(".fe_add",'click',function(){
        var getId = this.closest('.addon-plan-container').getAttribute('aria-describedby');
        document.querySelector('#'+getId).click();
        showRemove();
      })

      // disable add button
      cloudStorageBtnDisable();
      conferenceBtnDisable();
      helper.live('.additional-options #pane-cmr .billing-checkbox-group .billing-checkbox-button, .additional-options #pane-rc .billing-checkbox-group .billing-checkbox-button','click',function(){
        cloudStorageBtnDisable();
        conferenceBtnDisable();
        showRemove();
      })


      // large meeting
      _$('#pane-large_meeting .addon-header').prepend('<img src="https://us01st-cf.zoom.us/fe-static/billing-web/img/largee_meeting.9e10fa73.svg" alt="" srcset="" class="plan-icon">');
      var getIcon = _$('.additional-options #pane-large_meeting .addon-plan-tips span').value[0];
      _$('.additional-options #pane-large_meeting .addon-plan-tips').html('Meetings and Webinars can be increased in capacity up to 1000 participants.');
      _$('.additional-options #pane-large_meeting .addon-plan-tips').appendElement(getIcon);
      _$('#pane-large_meeting .form-item-title-container .heading').html('Select your plan');
      _$('#pane-large_meeting .form-item-title-container .form-item-sub-title').html('To increase participant capacity for either meetings or webinars, select one or both options. You can <br>visit the Zoom Support page for more information on how to assign license to users after purchasing.')
      _$('#pane-large_meeting .addon-plan-title').html('Large Meetings');
      _$('#pane-large_meeting .title-body h3').html('Select your plan');

      _$('.zm-tabs__nav  #tab-large_meeting .plan-name').html(''+
      '<p class="fe_title">Large Meetings</p>'+
      '<p class="fe_startingPrice">From $50/month</p>'+
      '<p class="fe_disclaimer">Increase audience to more than 100 attendees</p>'
      )

      _$('#pane-large_meeting.addon-plan-container').append(''+
      '<div class="fe_cta--sticky">'+
      '<div class="fe_additionalCost fe_hide">'+
      '      <p class="fe_cost-text">Additional Cost</p>'+
      '      <p class="fe_additional_price">$50</p>'+
      '</div>'+
      '<p class="fe_add disable">Add</p>'+
      '</div>'
      )

      var initialPrice = 0;
      var totalPrice = 0; 
      helper.live('#pane-large_meeting.addon-plan-container .billing-checkbox-button-label, .only-message-message-box .zm-button__slot, .zm-input-number.zm-input-number--mini.is-controls-right','click',function(){
        totalPrice = 0;
        document.querySelectorAll('#pane-large_meeting.addon-plan-container .billing-checkbox-button__orig-checkbox').forEach(function(el){
          setTimeout(function(){

            if(el.value == 'true'){
              var getPrice = el.nextElementSibling.querySelector('.billing-option-content-info-price').innerText.replace('$','');
              
              initialPrice = parseInt(getPrice);
  
              totalPrice = totalPrice + initialPrice;
  
              _$('#pane-large_meeting.addon-plan-container .fe_additional_price').html('$'+totalPrice);
              _$('#pane-large_meeting.addon-plan-container .fe_additionalCost').removeClass('fe_hide');
            }

            if(!document.querySelector('#pane-large_meeting.addon-plan-container .option-panel-wrap.option-panel-wrap-select')){
              _$('#pane-large_meeting.addon-plan-container .fe_additionalCost').addClass('fe_hide');
              _$('#pane-large_meeting.addon-plan-container .fe_add').addClass('disable');
            }else{
              _$('#pane-large_meeting.addon-plan-container .fe_add').removeClass('disable');
            }

          },500)
        })
      })

      // audio conferencing 
      _$('#pane-tollfree .addon-header').prepend('<img src="https://st1.zoom.us/fe-static/billing-web/img/audio.906dbaab.svg" alt="" srcset="" class="plan-icon">');

      _$('.zm-tabs__nav  #tab-tollfree .plan-name').html(''+
      '<p class="fe_title">Audio Conferencing</p>'+
      '<p class="fe_startingPrice">From $100/month</p>'+
      '<p class="fe_disclaimer">Add more capacities to your 5 GB cloud storage</p>'
      )


      // Conference Room Connector 
      _$('#pane-rc .addon-header').prepend('<img src="https://st1.zoom.us/fe-static/billing-web/img/zoom_rc.e5cab09d.svg" alt="" srcset="" class="plan-icon">');
      _$('.zm-tabs__nav  #tab-rc .plan-name').html(''+
      '<p class="fe_title">Conference Room Connector</p>'+
      '<p class="fe_startingPrice">From $49/month</p>'+
      '<p class="fe_disclaimer">Add more capacities to your 5 GB cloud storage</p>'
      )

      _$('.additional-options #pane-rc .form-item:nth-of-type(2)').append(''+
      '<p class="fe_add disable">Add</p>'
      );
      


      // close pop up
      helper.live('.fe_close','click',function(){
        var getParentId = this.parentElement.getAttribute('aria-describedby');
        document.querySelector('#'+getParentId).click();
        showRemove();
      })

      $('.zm-tabs__nav .plan-name').append('<p class="fe_tab--add">Add</p><p class="fe_tab--remove">Remove</p>');

      showRemove();

    }

    function showRemove(){
      var interval = setInterval(function(){
        if(window.getComputedStyle(document.querySelector('#tab-cmr .zm-icon-success')).getPropertyValue('display') != 'none'){
          _$('.additional-options #tab-cmr').addClass('fe-success')
        }
  
        if(window.getComputedStyle(document.querySelector('#tab-tollfree .zm-icon-success')).getPropertyValue('display') != 'none'){
          _$('.additional-options #tab-tollfree').addClass('fe-success')
        }
  
        if(window.getComputedStyle(document.querySelector('#tab-large_meeting .zm-icon-success')).getPropertyValue('display') != 'none'){
          _$('.additional-options #tab-large_meeting').addClass('fe-success')
        }
  
        if(window.getComputedStyle(document.querySelector('#tab-rc .zm-icon-success')).getPropertyValue('display') != 'none'){
          _$('.additional-options #tab-rc').addClass('fe-success')
        }
      },20)

      setTimeout(function(){
        clearInterval(interval);
      },2000)
    }

    function cloudStorageBtnDisable(){
      var interval = setInterval(function(){
        if(_$('.additional-options #pane-cmr .billing-checkbox-group .billing-checkbox-button.is-active').value.length > 0){
          _$('.additional-options #pane-cmr .fe_add').removeClass('disable');
        }else{
          _$('.additional-options #pane-cmr .fe_add').addClass('disable');
        }
      },20)
      setTimeout(function(){
        clearInterval(interval);
      },1000)
    }

    function conferenceBtnDisable(){
      var interval = setInterval(function(){
        if(_$('.additional-options #pane-rc .billing-checkbox-group .billing-checkbox-button.is-active').value.length > 0){
          _$('.additional-options #pane-rc .fe_add').removeClass('disable');
        }else{
          _$('.additional-options #pane-rc .fe_add').addClass('disable');
        }
      },20)
      setTimeout(function(){
        clearInterval(interval);
      },1000)
    }

    // Business Account

    var businessAccount = ''+
    '<div class="fe_checkbox"><label id="fe_account"><input aria-labelledby="fe_account" type="checkbox">  This is a business account.</label></div>'+
    '<div class="fe_businessAccount">'+
    '  <div class="zm-form-item">'+ 
    '      <div class="zm-form-item__header"><label id="company-label" class="label-for-input" for="bill-to-company-input">Business Name</label></div>'+ 
    '      <div class="zm-form-item__content">'+ 
    '          <div class="company_name">'+ 
    '              <div class="field first"><label class="blockLabel" role="presentation"><input id="bill-to-company-input" aria-labelledby="company-label" aria-required="true" type="text" maxlength="200" class="form-control"></label></div>'+ 
    '          </div>'+ 
    '      </div>'+ 
    '  </div>'+
    '  <div class="zm-form-item">'+ 
    '      <div class="zm-form-item__header"><label id="employee-label" class="label-for-input" for="employee_count">Business Size</label></div>'+ 
    '      <div class="zm-form-item__content">'+ 
    '          <div class="field employee_count_4_sales"><label class="blockLabel" role="presentation"> <select aria-labelledby="employee-label" aria-required="true" id="employee_count" class="form-control"><option value="">Select total employee count</option><option value="Just Me">Just Me</option><option value="2-10">2-10</option><option value="11-50">11-50</option><option value="51-250">51-250</option><option value="251-500">251-500</option><option value="501-1000">501-1000</option><option value="1001-5000">1001-5000</option><option value="5001-10000">5001-10000</option><option value="10001+">10001+</option></select></label></div>'+ 
    '      </div>'+ 
    '  </div>'+
    '</div>';

    function intiBusiness(){
      insertBusinessField();
      document.addEventListener('click',function(){
        insertBusinessField();
        
        // step 2
        setTimeout(function(){
          if(document.querySelector('.fe_cta')) return;
          _$('.zoom-buy-flow .buy-flow-body form.zm-form.zoom-form.zm-form--label-left').append('<div class="fe_cta"><p>Continue to Payment</p></div>');
        
          helper.live('.fe_cta p','click',function(){
            document.querySelector('#app .zm-button--large[data-link-label="Continue"]').click();
          })
        },200);

      })
      helper.live('[id="create_account"] .form-item-body input','input',function(){
        continueActive();
      })
      helper.live('[id="create_account"] .form-item-body select','change',function(){
        continueActive();
      })
      helper.live('.fe_checkbox input','change',function(){
        _$('.fe_businessAccount').toggleClass('fe_active');
      })

    }

    function insertBusinessField(){
      helper.waitForElement('[id="create_account"] .form-item-body',function(){
        if(document.querySelector('.fe_businessAccount')) return;
        document.querySelector('[id="create_account"] .form-item-body').insertAdjacentHTML('beforeend',businessAccount);
      },50,15000)
    }

    function continueActive(){
      if(document.querySelector('.fe_checkbox input').checked){
        if(!document.querySelector('.zoom-newcontent [data-link-label="Continue"].is-disabled')){
          _$('.zoom-newcontent [data-link-label="Continue"]').addClass('fe-disabled');
          _$('.fe_cta p').addClass('fe-disabled');
        }
        if(document.querySelector('.fe_businessAccount .company_name input').value != '' && document.querySelector('.fe_businessAccount .employee_count_4_sales select').value != ''){
          _$('.zoom-newcontent [data-link-label="Continue"]').removeClass('fe-disabled');
          _$('.fe_cta p').removeClass('fe-disabled');

          var getBusinessName = document.querySelector('.fe_businessAccount .company_name input').value;
          var getBusinessSize = document.querySelector('.fe_businessAccount .employee_count_4_sales select').value;

          sessionStorage.setItem('businessName', getBusinessName);
          sessionStorage.setItem('businessSize', getBusinessSize);
        }
      }else{
        _$('.zoom-newcontent [data-link-label="Continue"]').removeClass('fe-disabled');
        _$('.fe_cta p').removeClass('fe-disabled');
      }
    }


    function paymentInit(){

      document.querySelector('body').classList.add('fe_session');
      var getBusinessName = sessionStorage.getItem('businessName');
      var getBusinessSize = sessionStorage.getItem('businessSize');

      document.querySelector('.billto_contact_info_fields .company_name_div input').value = getBusinessName;
      document.querySelector('.billto_contact_info_fields .company_name_div + div + div select').value = getBusinessSize;
    }
    
    if(sessionStorage.getItem('businessName') != null){
      helper.waitForElement('.billto_contact_info_fields .company_name_div + div + div select', paymentInit,50,25000)
    }


    // step 1 ux design
    helper.waitForElement('.zoom-buy-flow .buy-flow-body',function(){
      if(document.querySelectorAll('.billing-step.completed').length < 2){
        document.body.classList.add('fe_step1');
      }

      if(document.querySelectorAll('.buy-flow-header .billing-steps .billing-step').length > 3){
        _$('.fe_step1 .zoom-buy-flow .buy-flow-body').append('<div class="fe_cta"><p>Continue to Account</p></div>');
      }else{
        _$('.fe_step1 .zoom-buy-flow .buy-flow-body').append('<div class="fe_cta"><p>Continue to Payment</p></div>');
      }

      helper.live('.fe_step1 .fe_cta p','click',function(){
        document.querySelector('#save_config_btn').click();
      })

      // step 2
      _$('.zoom-buy-flow .buy-flow-body form.zm-form.zoom-form.zm-form--label-left').append('<div class="fe_cta"><p>Continue to Payment</p></div>');
      
      helper.live('.fe_cta p','click',function(){
        document.querySelector('#app .zm-button--large[data-link-label="Continue"]').click();
      })

    },50,25000);

    // payment step 
    helper.waitForElement('.recurly .footer',function(){
      _$('#recurly_subscription').append(''+
        '<div class="fe_recurring"> Recurring plans will auto-renew using the credit card on the file that you use today and can access and update from <a href="https://zoom.us/billing">zoom.us/billing</a>. You will be charged each period of renewal until you cancel. You can cancel by navigating to <a href="https://zoom.us/billing">zoom.us/billing</a> and clicking \'Cancel Subscription\'. You may request cancellation up until the day before auto-renewal for it to go into effect.</div>'+
        '<div class="fe_cta fe_order"><p>Place Order</p></div>'
        );
      
      helper.live('.fe_cta p','click',function(){
        document.querySelector('button#plan_submit').click();
      })
    },50,15000)

    // create account 
    helper.waitForElement('.zoom-buy-flow#age_gating_question .plan-title',function(){
      // var getSignInBtn = document.querySelector('.zoom-buy-flow#age_gating_question .plan-title > div').innerHTML;
      // _$('.zoom-buy-flow#age_gating_question .plan-title').html('Create Account <div>'+getSignInBtn+'</div>');
    },50,15000);

    helper.waitForElement('.shopping-cart .title',function(){
      _$('.shopping-cart .title').html('Order Summary');
    },50,15000)

    helper.waitForElement('[id="age_gating_question"]',intiBusiness,50,25000)
    /* Initialize variation */
    helper.waitForElement(".additional-options .addon-plan-container", init, 50, 25000);

  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();