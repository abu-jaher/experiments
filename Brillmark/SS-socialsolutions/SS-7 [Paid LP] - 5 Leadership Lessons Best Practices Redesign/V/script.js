(function() {
    try {
        var debug = 0;
        var variation_name = "ss-7-v";
        var _$;
        !(function(factory) {
            _$ = factory();
        })(function() {
            var bm = function(s) {
                if (typeof s === "string") {
                    this.value = Array.prototype.slice.call(document.querySelectorAll(s));
                }
                if (typeof s === "object") {
                    this.value = [s];
                }
            };
            bm.prototype = {
                eq: function(n) {
                    this.value = [this.value[n]];
                    return this;
                },
                each: function(fn) {
                    [].forEach.call(this.value, fn);
                    return this;
                },
                log: function() {
                    console && console.log(this);
                },
                html: function(v) {
                    return typeof v == 'undefined' ?
                        this.value[0].innerHTML :
                        this.each(function(i) {
                            i.innerHTML = v;
                        });
                },
                insertAfter: function(v) {
                    return this.each(function(i) {
                        i.insertAdjacentHTML('afterEnd', v);
                    });
                },
                insertBefore: function(v) {
                    return this.each(function(i) {
                        i.insertAdjacentHTML('beforeBegin', v);
                    });
                },

                live: function(selector, event, callback, context) {
                    /****Helper Functions****/
                    // helper for enabling IE 8 event bindings
                    function addEvent(el, type, handler) {
                        if (el.attachEvent) el.attachEvent("on" + type, handler);
                        else el.addEventListener(type, handler);
                    }
                    // matches polyfill
                    this.Element &&
                        (function(ElementPrototype) {
                            ElementPrototype.matches =
                                ElementPrototype.matches ||
                                ElementPrototype.matchesSelector ||
                                ElementPrototype.webkitMatchesSelector ||
                                ElementPrototype.msMatchesSelector ||
                                function(selector) {
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
                        addEvent(context || document, event, function(e) {
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
                waitForElement: function(
                    selector,
                    trigger,
                    delayInterval,
                    delayTimeout
                ) {
                    var interval = setInterval(function() {
                        if (_$(selector).value.length) {
                            clearInterval(interval);
                            trigger();
                        }
                    }, delayInterval);
                    setTimeout(function() {
                        clearInterval(interval);
                    }, delayTimeout);
                },
            };
            return function(selector) {
                return new bm(selector);
            };
        });


        function trackGAEvent($eventCategory, $eventAction, $eventLabel) {
            if ('ga' in window) {
                ga.getAll()[0].send('event', {
                    eventCategory: $eventCategory,
                    eventAction: $eventAction,
                    eventLabel: $eventLabel,
                });
            }
        }

        var helper = _$();
        var feList = '<li>Think more creatively and make data-driven decisions.</li><li>Empower participants to stay connected and request services.</li><li>Stay on the same page and deliver comprehensive care to every client.</li>';
        var authURL = document.querySelectorAll('.wp-block-ws-split-half')[1].querySelector('figure img').getAttribute('src');
        var feAuth = '<div class="fe-auth-wrapper"><img class="auth-img" src="' + authURL + '" alt="Janet Sharkis"><div class="content"><p>Janet Sharkis—MS, LPC, and community development executive—has led both a nonprofit and a state agency during stormy times. She compiled five leadership lessons to help you <span class="bold-text">get through the challenges</span> today and in the future.</p></div></div><a class="download-ebook-cta tab-mob-only" href="#form">Download your eBook</a>';
        
        /* Variation Init */
        function onLoadMktoForms2(trigger, delayInterval, delayTimeout) {
            var intervalForMktoForms2 = setInterval(function() {
                if (typeof window.MktoForms2 != "undefined") {
                    clearInterval(intervalForMktoForms2);
                    trigger();
                }
            }, delayInterval);
            setTimeout(function() {
                clearInterval(intervalForMktoForms2);
            }, delayTimeout);
        }

        function addClass(ele, className) {
            if (ele) {
                ele.classList.add(className);
            }
        }

        function checkInputform() {
            document.querySelectorAll('form .mktoFormRow').forEach(function(ele) {
                ele.removeAttribute("input-name");
                if (ele.querySelector('input, select, textarea')) {
                    var currentID = ele.querySelector('input, select, textarea').getAttribute('name');
                    ele.setAttribute('input-name', 'parent-' + currentID);
                } else {
                    ele.setAttribute('input-name', 'parent-noinput');
                }
            });
        }

        function init() {
            addClass(document.querySelectorAll('.wp-block-ws-split-half')[0].querySelector('hr'), 'hide');
            addClass(document.querySelectorAll('.wp-block-ws-split-half')[0].querySelector('h5'), 'hide');
            addClass(document.querySelectorAll('.wp-block-ws-split-half')[1].querySelector('figure'), 'hide');

            document.querySelector('.wp-block-ws-section.has-background .wp-block-buttons').insertAdjacentHTML('beforebegin', '<p class="fe-subheading">By coupling these lessons with Social Solution’s Apricot tools outlined in this eGuide, you and your team will be able to accomplish the following:</p>');
            document.querySelectorAll('.wp-block-ws-split-half')[0].querySelector('ul').innerHTML = feList;
            document.querySelector(".wp-block-ws-section.has-background .wp-block-ws-split-half>ul").insertAdjacentHTML("afterend", feAuth);
            
            document.querySelector(".wp-block-ws-section.has-background .wp-block-ws-split-half>p").innerHTML ='Taking care of your community is both exhausting and inspiring. And the past few years have only made your efforts more challenging.';
            
            if(document.querySelectorAll('.wp-block-ws-split-half')[1].querySelector('figure')){
				document.querySelectorAll('.wp-block-ws-split-half')[1].querySelector('figure').insertAdjacentHTML("afterend", '<h1 class="tab-mob-only title">5 Lessons from 5 Years as an Executive Director</h1>');
            }
            
            document.querySelector(".desktop-nav .container-full").classList.add("container");
            document.querySelector(".mobile-nav .container-fluid").classList.add("container");

            onLoadMktoForms2(function() {
                MktoForms2.whenReady(function(form) {
                    checkInputform();
			
                    document.querySelector(".card-body .mktoFormRow").insertAdjacentHTML("beforebegin", "<div class='fe-wrap fe-firstRow-mktfrm'></div><div class='fe-wrap fe-secondRow-mktfrm'></div><div class='fe-wrap fe-thirdRow-mktfrm'></div>");
                    var firstMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-FirstName']");
                    var secMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-LastName']");
                    var thirdMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-Email']");
                    var fourthMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-Company']");
                    var fifthMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-Country']");
                    var sixMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-Phone']");

                    // 1st row
                    document.querySelector(".fe-firstRow-mktfrm").insertAdjacentElement("afterbegin", secMkto);
                    document.querySelector(".fe-firstRow-mktfrm").insertAdjacentElement("afterbegin", firstMkto);

                    // sec row
                    document.querySelector(".fe-secondRow-mktfrm").insertAdjacentElement("afterbegin", fourthMkto);
                    document.querySelector(".fe-secondRow-mktfrm").insertAdjacentElement("afterbegin", thirdMkto);

                    // third row
                    document.querySelector(".fe-thirdRow-mktfrm").insertAdjacentElement("afterbegin", fifthMkto);
                    document.querySelector(".fe-thirdRow-mktfrm").insertAdjacentElement("afterbegin", sixMkto);

                    // Set Placeholder form work
                    document.querySelector("#FirstName").setAttribute("placeholder", "First Name");
                    document.querySelector("#LastName").setAttribute("placeholder", "Last Name");
                    document.querySelector("#Email").setAttribute("placeholder", "Email Address");
                    document.querySelector("#Phone").setAttribute("placeholder", "Phone Number");
                    document.querySelector("#Company").setAttribute("placeholder", "Organization Name");
                    document.querySelector(".card-body .wp-block-ws-form").insertAdjacentHTML("beforebegin", "<h2 class='fe-form-heading'>Download the eBook</h2>");

                    document.querySelector("#industryType option").innerHTML = "What type of organization do you work for?";
                    document.querySelector("#NumberOfEmployees option").innerHTML = "How many employees are in your organization?";
                    document.querySelector("#Country option").innerHTML = "Country";
                    document.querySelector("[type='submit']").innerText = 'Download now';
                    if (window.screen.width < 768) {
                        document.querySelector("#industryType option").innerHTML = "What type of organization do you...";
                        document.querySelector("#NumberOfEmployees option").innerHTML = "How many employees are in your...";
                    }

                    helper.live('#Country', 'change', function() {
                        if (document.querySelector("#State option")) {
                            document.querySelector("#State option").innerHTML = "State";
                            if (window.screen.width < 768) {
                                document.querySelector("#State option").innerHTML = "State";
                            }
                        }
                        helper.waitForElement('#State option', function() {
                        	checkInputform();
                            document.querySelector(".fe-thirdRow-mktfrm").insertAdjacentElement("afterend", document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-State']"));
                            document.querySelector("#State option").innerHTML = "State";
                            if (window.screen.width < 768) {
                                document.querySelector("#State option").innerHTML = "State";
                            }
                        }, 50, 15000);
                    });

                    helper.live('#industryType', 'change', function() {
                        if (document.querySelector("#industryType option")) {
                            document.querySelector("#industryType option").innerHTML = "What type of organization do you work for?";
                            if (window.screen.width < 768) {
                                document.querySelector("#industryType option").innerHTML = "What type of organization do you...";
                            }
                        }
                        helper.waitForElement('#State option', function() {
                        	checkInputform();
                            document.querySelector(".fe-thirdRow-mktfrm").insertAdjacentElement("afterend", document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-State']"));
                            document.querySelector("#Industry option").innerHTML = "What type of organization do you work for?";
                            if (window.screen.width < 768) {
                                document.querySelector("#industryType option").innerHTML = "What type of organization do you...";
                            }
                        }, 50, 15000);
                    });

                    form.onSuccess(function(values, followUpUrl) {
                        trackGAEvent('funnelenvy', 'Click', 'Submit CTA click');
                    });
                });
            }, 50, 15000);

            helper.live("#FirstName, #LastName, #Email, #Company, #Phone, #Country, #State, #industryType, #NumberOfEmployees", "click", function() {
                trackGAEvent('funnelenvy', 'Click', 'Form engagement');
            });
            helper.live(".download-ebook-cta", "click", function() {
                trackGAEvent('funnelenvy', 'Click', ' Download your eBook');
            });
            addClass(document.querySelector('body'), 'ss-7');
        }

        helper.waitForElement(".card-body .wp-block-ws-form .mktoFormRow", init, 50, 15000);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();