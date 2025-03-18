(function() {
    try {
        var debug = 0;
        var variation_name = "ss-7-1-v";
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
        var pageURLPath = window.location.pathname;
        var pageData = [
            {
              pagePath: "/landing/improve-student-health/",
              bodyClass: "ish-pg",
              title: "Improving Student Health Report",
              className: "invert-img square-img",
              formHeading: "Download the Report",
              content: "<p class='fe-subheading'>K-12 students face many challenges inside and outside the classroom that can hinder their academic success.</p><p class='fe-subheading'>Siloed data systems struggle to highlight individual students who would benefit from support.</p><p class='fe-subheading bold'>Apricot, a case management solution, can better align data by storing it in a centralized system, allowing staff to easily import and export records that create a whole view of a student's needs.</p>",
              sliderImg: "https://www.socialsolutions.com/wp-content/uploads/2023/02/image-kids-at-school-sitting-together-650x650-1-576x576.jpg",
              sliderText: "<p>Download the report to learn how Apricot helped Akron Public Schools in Ohio positively impact their 20,000 students, many of whom face poverty and homelessness.</p>"
            },
            {
              pagePath: "/landing/homelessness-resource-management/",
              bodyClass: "hrm-pg",
              title: "The Right Tools to Take on Homelessness",
              className: "square-img",
              formHeading: "Download the Resource",
              content: "<p class='fe-subheading bold'>Deliver better service through cutting-edge technology, tailored to your Continuum of Care.</p><p class='fe-subheading'>Apricot supports your organization programs by keeping data in one easy-to-use system that makes serving your community simple and efficient.</p>",
              sliderImg: "https://www.socialsolutions.com/wp-content/uploads/2023/02/image-public-sector-homeless-resources-650x650-1-576x576.jpg",
              sliderText: "<p>Learn how Apricot can help your team save time, measure success, and protect participant data.</p>"
            },
            {
              pagePath: "/landing/roadmap-for-introducing-case-management-technology/",
              bodyClass: "rmt-pg",
              title: "Guide to Introducing New Tech in Your Organization",
              className: "round-img",
              formHeading: "Download the Calendar",
              content: "<p class='fe-subheading bold'>With critical funding on the line and a need to boost your services, the time to onboard smart, effective case management software is now.</p><p class='fe-subheading'>Social Solutions has put together a calendar that gives you a roadmap for implementing our technology. Use these milestones to give you and your staff an idea of how manageable the process is.</p>",
              sliderImg: "https://www.socialsolutions.com/wp-content/uploads/2022/04/hero-evaluating-social-good-technology-framework-576x555-1.png",
              sliderText: "<p>Our technology can be implemented with any staff size—and we'll be there every step of the way to ensure it's a beneficial process for your organization and its participants.</p>"
            },
            {
              pagePath: "/resources/apricot-best-practices/",
              bodyClass: "abp-pg",
              title: "Best Practices to Implement Online Client Engagement Tools",
              className: "round-img",
              formHeading: "Download the eBook",
              content: "<p class='fe-subheading'>We are proud to serve you with an easy-to-use solution that frees up your caseworkers to focus on helping more communities.</p><p class='fe-subheading'>Our technology increases engagement among your participants, empowering them to take charge of their future.</p>",
              sliderImg: "https://www.socialsolutions.com/wp-content/uploads/2021/03/Casemanagement_Hero.png",
              sliderText: "<p>Learn how to use Apricot's:</p><ul><li>Online intake forms</li><li>Rules and alerts</li><li>Online schedule</li><li>Connect</li></ul>"
            },
            {
                pagePath: "/landing/5-leadership-lessons-on-nonprofit-challenges/",
                bodyClass: "llc-pg",
                title: "5 Lessons from 5 Years as an Executive Director",
                className: "auth-img invert-img",
                formHeading: "Download the eBook",
                content: "<p class='fe_mobile_content'>Taking care of your community is both exhausting and inspiring. And the past few years have only made your efforts more challenging.</p><p class=\"fe-subheading\">By coupling these lessons with Social Solution’s Apricot tools outlined in this eGuide, you and your team will be able to accomplish the following:</p> <ul><li>Think more creatively and make data-driven decisions.</li><li>Empower participants to stay connected and request services.</li><li>Stay on the same page and deliver comprehensive care to every client.</li></ul>",
                sliderImg: "https://www.socialsolutions.com/wp-content/uploads/2022/10/image-Courageous-Innovator-600x600-2.jpg",
                sliderText: "<p>Janet Sharkis—MS, LPC, and community development executive—has led both a nonprofit and a state agency during stormy times. She compiled five leadership lessons to help you <span class=\"bold-text\">get through the challenges</span> today and in the future.</p>"
              }
          ];
          
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
        function insertBefore(el, referenceNode) {
            referenceNode.parentNode.insertBefore(el, referenceNode);
        }
        function insertAfter(el, referenceNode) {
            referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
        }
        function findContent(nameKey, arr, value) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].pagePath === nameKey) {
                    var value = value;
                    if (value === 'bodyClass') {
                        return arr[i].bodyClass;
                    } else if (value === 'title') {
                        return arr[i].title;
                    } else if (value === 'content') {
                        return arr[i].content;
                    } else if (value === 'formHeading') {
                        return arr[i].formHeading;
                    } else if (value === 'slider') {
                        return '<div class="fe-auth-wrapper"><img class="auth-img ' + arr[i].className + '" src="' + arr[i].sliderImg + '" alt="' + arr[i].title + '"><div class="content">' + arr[i].sliderText + '</div></div><a class="download-ebook-cta tab-mob-only" href="javascript:void(0)">' + arr[i].formHeading + '</a>';
                    }
                }
            }
        }
        function form() {
            MktoForms2.whenReady(function(form) {
                checkInputform();
                document.querySelector(".card-body .mktoFormRow").insertAdjacentHTML("beforebegin", "<div class='fe-wrap fe-firstRow-mktfrm'></div><div class='fe-wrap fe-secondRow-mktfrm'></div><div class='fe-wrap fe-thirdRow-mktfrm'></div>");
                var firstMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-FirstName']");
                var secMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-LastName']");
                var thirdMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-Email']");
                var fourthMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-Company']");
                var fifthMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-Country']");
                var sixMkto = document.querySelector(".card-body .wp-block-ws-form .mktoFormRow[input-name='parent-Phone']");
                secMkto && document.querySelector(".fe-firstRow-mktfrm").insertAdjacentElement("afterbegin", secMkto);
                firstMkto && document.querySelector(".fe-firstRow-mktfrm").insertAdjacentElement("afterbegin", firstMkto);
                fourthMkto && document.querySelector(".fe-secondRow-mktfrm").insertAdjacentElement("afterbegin", fourthMkto);
                thirdMkto && document.querySelector(".fe-secondRow-mktfrm").insertAdjacentElement("afterbegin", thirdMkto);
                fifthMkto && document.querySelector(".fe-thirdRow-mktfrm").insertAdjacentElement("afterbegin", fifthMkto);
                sixMkto && document.querySelector(".fe-thirdRow-mktfrm").insertAdjacentElement("afterbegin", sixMkto);
                document.querySelector("#FirstName").setAttribute("placeholder", "First Name");
                document.querySelector("#LastName").setAttribute("placeholder", "Last Name");
                document.querySelector("#Email").setAttribute("placeholder", "Email Address");
                document.querySelector("#Phone").setAttribute("placeholder", "Phone Number");
                document.querySelector("#Company").setAttribute("placeholder", "Organization Name");
                var formTitle = findContent(pageURLPath, pageData, 'formHeading');
                document.querySelector(".card-body .wp-block-ws-form").insertAdjacentHTML("beforebegin", '<h2 class="fe-form-heading">' + formTitle + '</h2>');
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
                        if (window.screen.width < 768) {
                            document.querySelector("#industryType option").innerHTML = "What type of organization do you...";
                        }
                    }, 50, 15000);
                });
                form.onSuccess(function(values, followUpUrl) {
                    trackGAEvent('funnelenvy', 'Click', 'Download now CTA click');
                });
            });
        }
        function optimizeEvents() {
            helper.live("#FirstName, #LastName, #Email, #Company, #Phone, #Country, #State, #industryType, #NumberOfEmployees", "click", function() {
                trackGAEvent('funnelenvy', 'Click', 'Form engagement');
            });
            helper.live(".download-ebook-cta", "click", function() {
            	document.querySelector('.wp-block-ws-split-half .wp-block-ws-card.card').scrollIntoView({behavior: "smooth",block: "start"});
                trackGAEvent('funnelenvy', 'Click', 'Mobile Download CTA');
            });
        }
        function init() {
            var innerCount = 1,
                outerCount = 1;
            addClass(document.querySelectorAll('.wp-block-ws-split-half')[0].querySelector('hr'), 'hide');
            addClass(document.querySelectorAll('.wp-block-ws-split-half')[0].querySelector('h5'), 'hide');
            addClass(document.querySelectorAll('.wp-block-ws-split-half')[1].querySelector('figure'), 'hide');
            addClass(document.querySelector(".desktop-nav .container-full"), "container");
            addClass(document.querySelector(".mobile-nav .container-fluid"), "container");
            if (pageURLPath == '/landing/improve-student-health/') {
                document.querySelectorAll('.wp-block-ws-section .section-container .wp-block-ws-split.variant-large-left.split-padding').forEach(function(ele) {
                    ele.classList.add('outer-ele-' + outerCount);
                    ele.querySelectorAll('.wp-block-ws-split-half').forEach(function(ele1) {
                        ele1.classList.add('inner-ele-' + innerCount);
                        innerCount++;
                    });
                    outerCount++;
                });
                insertAfter(document.querySelector('.wp-block-ws-section .section-container .outer-ele-2 .inner-ele-4'), document.querySelector('.wp-block-ws-section .section-container .outer-ele-1 .inner-ele-1'));
            }
            if (document.querySelector('.wp-block-ws-split > .wp-block-ws-split-half .wp-block-ws-page-title')) {
                var text = findContent(pageURLPath, pageData, 'content');
                document.querySelector('.wp-block-ws-split > .wp-block-ws-split-half .wp-block-ws-page-title').insertAdjacentHTML("afterend", '<div class="left-content">' + text + '</div>');
            }
            if (document.querySelector('.wp-block-ws-split > .wp-block-ws-split-half .left-content')) {
                var slider = findContent(pageURLPath, pageData, 'slider');
                document.querySelector('.wp-block-ws-split > .wp-block-ws-split-half .left-content').insertAdjacentHTML("afterend", slider);
            }
            if (document.querySelectorAll('.wp-block-ws-split-half')[1].querySelector('#form')) {
                var getMainTitle = document.querySelector('.wp-block-ws-page-title').textContent.trim();
                document.querySelectorAll('.wp-block-ws-split-half')[1].querySelector('#form').insertAdjacentHTML("beforebegin", '<h1 class="tab-mob-only title">' + getMainTitle + '</h1>');
            }
            onLoadMktoForms2(function() {
                form();
            }, 100, 20000);
            optimizeEvents();
            var classBody = findContent(pageURLPath, pageData, 'bodyClass');
            addClass(document.querySelector('body'), 'ss-7-1-l');
            addClass(document.querySelector('body'), classBody);
        }
        function init2() {
            addClass(document.querySelector('h1.single-headline'), 'wp-block-ws-page-title');
            addClass(document.querySelector(".desktop-nav .container-full"), "container");
            addClass(document.querySelector(".mobile-nav .container-fluid"), "container");
            if (document.querySelector('.wp-block-ws-section .section-inner .wp-block-ws-split-half')) {
                document.querySelector('.wp-block-ws-section .section-inner .wp-block-ws-split-half').append(document.querySelector('.sidebar-block'));
            }
            if (document.querySelector('.site-footer')) {
                document.querySelector('.site-container').append(document.querySelector('.site-footer'));
            }
            if (document.querySelector('.section-inner .col-lg-8.col-xl-7 > .wp-block-ws-page-title')) {
                var text = findContent(pageURLPath, pageData, 'content');
                var mTitle = findContent(pageURLPath, pageData, 'title');
                document.querySelector('.wp-block-ws-page-title').innerText = mTitle;
                document.querySelector('.section-inner .col-lg-8.col-xl-7 > .wp-block-ws-page-title').insertAdjacentHTML("afterend", '<div class="left-content">' + text + '</div>');
            }
            if (document.querySelector('.section-inner .col-lg-8.col-xl-7 > .left-content')) {
                var slider = findContent(pageURLPath, pageData, 'slider');
                document.querySelector('.section-inner .col-lg-8.col-xl-7 > .left-content').insertAdjacentHTML("afterend", slider);
            }
            if (document.querySelector('.sidebar-block .wp-block-ws-card')) {
                var getMainTitle = document.querySelector('.wp-block-ws-page-title').textContent.trim();
                document.querySelector('.sidebar-block .wp-block-ws-card').insertAdjacentHTML("beforebegin", '<h1 class="tab-mob-only title">' + getMainTitle + '</h1>');
            }
            onLoadMktoForms2(function() {
                form();
            }, 100, 20000);
            optimizeEvents();
            addClass(document.querySelector('.sidebar-block .at-above-post'), 'hide');
            var classBody = findContent(pageURLPath, pageData, 'bodyClass');
            addClass(document.querySelector('body'), 'ss-7-1-r');
            addClass(document.querySelector('body'), classBody);
        }
        if (pageURLPath != '/resources/apricot-best-practices/') {
            helper.waitForElement(".card-body .wp-block-ws-form .mktoFormRow", init, 50, 15000);
        } else {
            helper.waitForElement(".card-body .wp-block-ws-form .mktoFormRow", init2, 50, 15000);
        }
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();