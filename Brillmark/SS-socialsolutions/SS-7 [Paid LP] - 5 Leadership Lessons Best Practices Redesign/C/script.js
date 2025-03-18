(function() {
    try {
        var debug = 0;
        var variation_name = "ss-7-c";
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

        function init() { 
            onLoadMktoForms2(function() {
                MktoForms2.whenReady(function(form) {
                    form.onSuccess(function(values, followUpUrl) {
                        trackGAEvent('funnelenvy', 'Click', 'Submit CTA click');
                    });
                });
            }, 50, 15000);

            helper.live("#FirstName, #LastName, #Email, #Company, #Phone, #Country, #State, #industryType, #NumberOfEmployees", "click", function() {
                trackGAEvent('funnelenvy', 'Click', 'Form engagement');
            });
        }

        helper.waitForElement(".card-body .wp-block-ws-form .mktoFormRow", init, 50, 15000);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();