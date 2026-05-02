(function() {
    try {
        var debug = 0;
        var variation_name = "ss-8-v-ty";
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

        var helper = _$();
        
        function classAllocation() {
            var sectionIndex = 1;
            document.querySelectorAll('section').forEach(function(ele) {
                ele.classList.add('section-' + sectionIndex);
                sectionIndex++;
            });
        }

        function addClass(ele, className) {
            if (ele) {
                ele.classList.add(className);
            }
        }
        
        function init() {
        	classAllocation();
            addClass(document.querySelector('body'), 'ss-8-ty');
            if(document.querySelectorAll('.mj-outlook-group-fix .text-container[align="right"] > .mktoText p')[0]){
            	document.querySelectorAll('.mj-outlook-group-fix .text-container[align="right"] > .mktoText p')[0].innerHTML = 'PRICING REQUEST';
            }
            if(document.querySelectorAll('.mj-outlook-group-fix .text-container[align="left"] > .mktoText p')[0]){
            	document.querySelectorAll('.mj-outlook-group-fix .text-container[align="left"] > .mktoText p')[0].innerHTML = 'Thank you for requesting pricing.';
            }
            if(document.querySelectorAll('.mj-outlook-group-fix .text-container[align="left"] > .mktoText p')[1]){
            	document.querySelectorAll('.mj-outlook-group-fix .text-container[align="left"] > .mktoText p')[1].innerHTML = 'We appreciate you contacting Social Solutions. The work you do is life-changing and we want to help. One of our colleagues will get back in touch with you soon with <b>a customized proposal based on your needs.</b>';
            }
        }
        helper.waitForElement("body", init, 50, 15000);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();