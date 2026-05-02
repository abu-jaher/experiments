(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "Test USCREEN-1: [Sitewide] Free Trial to Pricing Page";

        /* helper liberary */
        // var _$;
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
                attr: function (a, v) {
                    return this.each(function (i) {
                        i.setAttribute(a, v);
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
                waitForElement: function (
                    selector,
                    trigger,
                ) {
                    var interval = setInterval(function () {
                        if (_$(selector).value.length) {
                            clearInterval(interval);
                            trigger();
                        }
                    }, 50);
                    setTimeout(function () {
                        clearInterval(interval);
                    }, 15000);
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
        };

        function trackGAEvent(eventCategory, eventAction, eventLabel) {
            if ('ga' in window) {
                ga.getAll()[0].send('event', {
                    eventCategory: eventCategory,
                    eventAction: eventAction,
                    eventLabel: eventLabel,
                });
            }
        };


        var helper = _$();
        /* Variation Init */
        function init() {
            // redirect to pricing page
            _$('body').addClass('fetest1')
            _$('.fetest1 [href^="https://www.uscreen.io/join"]').attr('fe-btn', 'true')


            // click on start freetrial event
            live('.fetest1:not(.fepricing) [fe-btn="true"]', 'click', function () {
                trackGAEvent('funnelenvy', 'click', 'Start Free Trial CTA clicks')
            });

            // click on demo cta click event
            live('.fetest1:not(.fepricing) [href^="https://www.uscreen.tv/request-demo/"]', 'click', function () {
                trackGAEvent('funnelenvy', 'click', 'Request Demo  CTA clicks')
            })


            // get pricing page cta event
            var pathname = window.location.pathname;
            if (pathname.indexOf('/pricing/') > -1) {
                _$('body').addClass('fepricing');

                // click on start freetrial event
                live('.fetest1.fepricing .main-nav-buttons a[fe-btn="true"],.fetest1.fepricing .footer-links a[fe-btn="true"],.fetest1.fepricing .cta > .wp-block-group__inner-container >p+.wp-block-buttons .wp-block-button a[fe-btn="true"] ,.fetest1.fepricing .boxes-with-background-heading > .wp-block-group__inner-container >p+.wp-block-buttons .wp-block-button a[fe-btn="true"]', 'click', function () {
                    trackGAEvent('funnelenvy', 'click', 'Start Free Trial CTA clicks')
                });

                live('.fetest1.fepricing .pricing-columns >.wp-block-column:first-child a[fe-btn="true"]', 'click', function () {
                    trackGAEvent('funnelenvy', 'click', 'Start Free Trial Basic CTA clicks')
                });

                // Growth CTA event
                live('.fetest1.fepricing .pricing-columns >.wp-block-column.highlight a[fe-btn="true"]', 'click', function () {
                    trackGAEvent('funnelenvy', 'click', 'Start Free Trial Growth CTA clicks')
                });

                // book a demo event
                live('.fetest1.fepricing .pricing-columns [href*="request-demo/"]', 'click', function () {
                    trackGAEvent('funnelenvy', 'click', 'Book a Demo CTA clicks')
                })
            }


        }

        /* Initialise variation */
        helper.waitForElement(".site-footer", init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();