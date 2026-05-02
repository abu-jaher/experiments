(function() {
    try {
        var debug = 0;
        var variation_name = "ss-8-v";
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
                    function addEvent(el, type, handler) {
                        if (el.attachEvent) el.attachEvent("on" + type, handler);
                        else el.addEventListener(type, handler);
                    }
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
                getScript: function(source, callback) {
                    var el = document.createElement("script");
                    el.onload = callback;
                    el.src = source;
                    document.body.appendChild(el);
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
        var video = '<figure class="wp-block-embed is-type-video is-provider-vimeo wp-block-embed-vimeo wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper"><iframe class="" name="iframe-1" loading="lazy" title="Apricot Product Overview Video" data-src="https://player.vimeo.com/video/604129823?h=68f5516ae9&amp;dnt=1&amp;app_id=122963" width="500" height="281" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen="" src="https://player.vimeo.com/video/604129823?h=68f5516ae9&amp;dnt=1&amp;app_id=122963"></iframe></div></figure>';
        var formSection = '<section class="bottom-price-form"><div class="container-wrapper"><h2 class="title">Get personalized pricing for your needs</h2><h4 class="sub-title">We would be happy to prepare a customized proposal for you! We just need a few details to create the best plan for your nonprofit or public sector organizations. Please fill in the form below and we\'ll be in touch with you shortly.</h4><div class="form-wrapper"><div class="wp-block-ws-card card"><div class="card-body"><div class="wp-block-ws-form"><form id="mktoForm_3835" novalidate="novalidate" class="mktoForm mktoHasWidth mktoLayoutLeft" style="font-family: Helvetica, Arial, sans-serif; font-size: 13px; color: rgb(51, 51, 51); width: 2561px;"></form><script>MktoForms2.loadForm("//landing.socialsolutions.com", "868-XCN-629", 3835);</script></div></div></div><div class="content"><p class="list-title">All Apricot packages include:</p><ul class="list"><li>Best practice forms and reports</li><li>Secure data environment</li><li>Monitor and manage caseloads</li><li>Smart form creation</li><li>Mobile compatibility</li></ul><img class="logo-wrap" src="https://fe-test-dev.s3.amazonaws.com/ss/ss-8/new-logo%402x.png" alt="Client-logos"></div></div></div></section>';
        var list = '<ul class="hero-list"><li>Make data-driven decisions with built-in reports and powerful integrations.</li><li>Client-focused tools empower participants to stay connected and request services.</li><li>Stay on the same page and deliver comprehensive care to every participant.</li></ul>';

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

        function classAllocation() {
            var sectionIndex = 1;
            document.querySelectorAll('#main > section').forEach(function(ele) {
                ele.classList.add('section-' + sectionIndex);
                sectionIndex++;
            });
        }

        function init() {
            classAllocation();
            if (document.querySelector(".section-1 h1 + p") && !document.querySelector(".section-1 h1 + .hero-list")) {
                document.querySelector(".section-1 h1").innerText = 'Apricot 360';
                document.querySelector(".section-1 h1 + p").innerText = 'Industry-leading case management, powerful community Impact. Apricot 360 combines best-in-class case management features with advanced data and analytics.';
                document.querySelector(".section-1 h1 + p").insertAdjacentHTML("afterend", list);
            }
            if (!document.querySelector('form #mktoForm_3835')) {
                document.querySelector(".section-10").insertAdjacentHTML("afterend", formSection);
            }
            if (document.querySelector('.section-1 .wp-block-buttons .wp-block-button')) {
                document.querySelector(".section-1 .wp-block-button__link[href='https://trial.socialsolutions.com/']").innerText = 'Request Pricing';
                document.querySelector(".section-1 .wp-block-button__link[href='https://trial.socialsolutions.com/']").setAttribute('target', '_self');
                document.querySelector(".section-1 .wp-block-button__link[href='https://trial.socialsolutions.com/']").setAttribute('href', 'https://www.socialsolutions.com/request-a-demo/');
            }
            if (document.querySelectorAll('.section-1 .wp-block-ws-split-half')[1]) {
                document.querySelectorAll('.section-1 .wp-block-ws-split-half')[1].innerHTML = video;
            }
            onLoadMktoForms2(function() {
            	MktoForms2.loadForm("//landing.socialsolutions.com", "868-XCN-629", 3835);
                MktoForms2.whenReady(function(form) {
                    checkInputform();
                    document.querySelector(".card-body .mktoFormRow").insertAdjacentHTML("beforebegin", "<div class='fe-wrap fe-firstRow-mktfrm'></div><div class='fe-wrap fe-secondRow-mktfrm'></div><div class='fe-wrap fe-thirdRow-mktfrm'></div>");
                    var firstMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-FirstName']");
                    var secMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-LastName']");
                    var thirdMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-Email']");
                    var fourthMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-Company']");
                    var fifthMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-Country']");
                    var sixMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-Phone']");

                    document.querySelector(".fe-firstRow-mktfrm").insertAdjacentElement("afterbegin", secMkto);
                    document.querySelector(".fe-firstRow-mktfrm").insertAdjacentElement("afterbegin", firstMkto);

                    document.querySelector(".fe-secondRow-mktfrm").insertAdjacentElement("afterbegin", fourthMkto);
                    document.querySelector(".fe-secondRow-mktfrm").insertAdjacentElement("afterbegin", thirdMkto);

                    document.querySelector(".fe-thirdRow-mktfrm").insertAdjacentElement("afterbegin", fifthMkto);
                    document.querySelector(".fe-thirdRow-mktfrm").insertAdjacentElement("afterbegin", sixMkto);

                    document.querySelector("#FirstName").setAttribute("placeholder", "First Name");
                    document.querySelector("#LastName").setAttribute("placeholder", "Last Name");
                    document.querySelector("#Email").setAttribute("placeholder", "Email Address");
                    document.querySelector("#Phone").setAttribute("placeholder", "Phone Number");
                    document.querySelector("#Company").setAttribute("placeholder", "Organization Name");

                    document.querySelector("#industryType option").innerHTML = "What type of organization are you?";
                    document.querySelector("#jobDepartment option").innerHTML = "Which best decscribes your department?";
                    document.querySelector("#jobLevel option").innerHTML = "Whats is your job?";
                    document.querySelector("#Country option").innerHTML = "Country";
                    document.querySelector("[type='submit']").innerText = 'Request Pricing';

                    helper.live('#Country', 'change', function() {
                        if (document.querySelector("#State option")) {
                            document.querySelector("#State option").innerHTML = "State";
                        }
                        helper.waitForElement('#State option', function() {
                            checkInputform();
                            document.querySelector(".fe-thirdRow-mktfrm").insertAdjacentElement("afterend", document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-State']"));
                            document.querySelector("#State option").innerHTML = "State";
                        }, 50, 15000);
                    });

                    helper.live('#industryType', 'change', function() {
                        if (document.querySelector("#Industry option")) {
                            document.querySelector("#Industry option").innerHTML = "What best decscribes your programs?";
                        }
                        helper.waitForElement('#State option', function() {
                            checkInputform();
                            document.querySelector(".fe-thirdRow-mktfrm").insertAdjacentElement("afterend", document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-State']"));
                            document.querySelector("#State option").innerHTML = "State";
                        }, 50, 15000);
                    });

                    form.onSuccess(function(values, followUpUrl) {
                        trackGAEvent('funnelenvy', 'Click', 'Request pricing');
                    });
                });
            }, 50, 15000);

            helper.live("#FirstName, #LastName, #Email, #Company, #Phone, #Country, #State, #Industry, #industryType, #jobDepartment, #jobLevel", "click", function() {
                trackGAEvent('funnelenvy', 'Click', 'Form engagement');
            });
            helper.live(".section-1 .wp-block-button__link[href='https://www.socialsolutions.com/request-a-demo/'], .section-3 .wp-block-button__link[href='https://www.socialsolutions.com/request-a-demo/'], .section-4 .wp-block-button__link[href='https://www.socialsolutions.com/request-a-demo/'], .section-5 .wp-block-button__link[href='https://www.socialsolutions.com/request-a-demo/'] ", "click", function(e) {
            	e.preventDefault();
                trackGAEvent('funnelenvy', 'Click', 'primary CTA click');
                document.querySelector('.bottom-price-form').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
            });
            addClass(document.querySelector('body'), 'ss-8');
        }
        var script = document.createElement('script');
        script.src = '//landing.socialsolutions.com/js/forms2/js/forms2.min.js';
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);
        helper.waitForElement("body", init, 50, 15000);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();