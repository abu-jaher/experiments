(function() {
    try {
        var debug = 0;
        var variation_name = "ss-8-c";
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
        function classAllocation() {
            var sectionIndex = 1;
            document.querySelectorAll('#main > section').forEach(function(ele) {
                ele.classList.add('section-' + sectionIndex);
                sectionIndex++;
            });
        }

        function init() {
            classAllocation();
            if (document.querySelector('.section-1 .wp-block-buttons .wp-block-button')) {
                document.querySelector(".section-1 .wp-block-button__link[href='https://trial.socialsolutions.com/']").innerText = 'Request a demo';
                document.querySelector(".section-1 .wp-block-button__link[href='https://trial.socialsolutions.com/']").setAttribute('href', 'https://www.socialsolutions.com/request-a-demo/');
            }
            helper.live(".section-1 .wp-block-button__link[href='https://www.socialsolutions.com/request-a-demo/", "click", function() {
                trackGAEvent('funnelenvy', 'Click', 'primary CTA click');
            });
        }
        helper.waitForElement("body", init, 50, 15000);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();