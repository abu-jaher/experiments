var __webpack_modules__ = {
  554: (module) => {
    module.exports = { ID: 'ss6-1', VARIATION: '1', CLIENT: 'Funnelenvy', SITE: 'socialsolutions' };
  },
};
var __webpack_module_cache__ = {};
function __webpack_require__(moduleId) {
  var cachedModule = __webpack_module_cache__[moduleId];
  if (void 0 !== cachedModule) return cachedModule.exports;
  var module = (__webpack_module_cache__[moduleId] = { exports: {} });
  return __webpack_modules__[moduleId](module, module.exports, __webpack_require__), module.exports;
}
(__webpack_require__.n = (module) => {
  var getter = module && module.__esModule ? () => module['default'] : () => module;
  return __webpack_require__.d(getter, { a: getter }), getter;
}),
  (__webpack_require__.d = (exports, definition) => {
    for (var key in definition)
      __webpack_require__.o(definition, key) &&
        !__webpack_require__.o(exports, key) &&
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
  }),
  (__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop));
var __webpack_exports__ = {};
(() => {
  'use strict';
  var shared = __webpack_require__(554);
  var shared_default = __webpack_require__.n(shared);
  var setup = () => {
    var { ID, VARIATION } = shared_default();
    document.documentElement.classList.add(ID), document.documentElement.classList.add(ID + '-' + VARIATION);
  };
  const services_setup = setup;
  var getNow =
    Date.now ||
    function () {
      return new Date().getTime();
    };
  var mergeObjects = (target, source) => {
    var merged = target;
    return (
      Object.keys(source).forEach((key) => {
        var sourceValue = source[key];
        var targetValue = merged[key];
        var isObject = targetValue && 'object' == typeof targetValue && !(targetValue instanceof Array);
        merged[key] = isObject ? mergeObjects(targetValue, sourceValue) : sourceValue;
      }),
      merged
    );
  };
  var pollerLite = (conditions, callback, userOptions) => {
    var options = { wait: 50, multiplier: 1.1, timeout: 0 };
    userOptions && (options = mergeObjects(options, userOptions));
    var { multiplier, wait } = options;
    var timeout = options.timeout ? new Date(getNow() + options.timeout) : null;
    var isTimedOut = () => timeout && getNow() > timeout;
    var successfulConditions = [];
    var evaluateCondition = (condition) => {
      if (!condition) return false;
      var types = { function: () => condition(), string: () => document.querySelector(condition) };
      var evaluate = types[typeof condition];
      return !evaluate || evaluate();
    };
    var allConditionsPassed = () => successfulConditions.length === conditions.length;
    var pollForCondition = (condition, waitTime, skipWait) => {
      if (timeout && isTimedOut()) return false;
      var result = evaluateCondition(condition);
      result
        ? (successfulConditions.push(result), allConditionsPassed() && callback(successfulConditions))
        : setTimeout(
            () => {
              pollForCondition(condition, waitTime * multiplier);
            },
            skipWait ? 0 : waitTime
          );
    };
    for (var i = 0; i < conditions.length; i += 1) {
      if ('string' != typeof conditions[i] && 'function' != typeof conditions[i])
        throw 'Every item in the poller array should be a function or a string';
      pollForCondition(conditions[i], wait, true);
    }
  };
  var gaTracking = function (label) {
    var action = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'click';
    pollerLite([() => 'function' == typeof window.ga.getAll], () => {
      var eventSent;
      window.ga.getAll().forEach((tracker) => {
        'UA-718299-1' !== tracker.get('trackingId') ||
          eventSent ||
          (tracker.send('event', {
            eventCategory: 'funnelenvy',
            eventAction: action,
            eventLabel: label,
          }),
          (eventSent = true));
      });
    });
  };
  const services_gaTracking = gaTracking;
  var { ID } = shared_default();
  const experiment = () => {
    services_setup(), console.log(ID);
    var supportText = 'See how our most comprehensive case management solution can work for your organization.';
    var primaryCtaText = 'Get a live demo';
    var newCtaText = 'Tour the product';
    var newCtaLink = '/apricot-product-tour/';
    var supprtElem = document.querySelector('.suport-text');
    var mainCta = document.querySelector('a.main-cta');
    var newCta =
      '<div class="' +
      ID +
      '__ctablock wp-block-button is-style-outline">\n                    <a class="wp-block-button__link" href="' +
      newCtaLink +
      '">' +
      newCtaText +
      '</a>\n                  </div>';
    if (document.querySelector('.' + ID + '__cta-container')) return;
    (supprtElem.innerText = supportText),
      mainCta.closest('.cta-container').classList.add(ID + '__cta-container'),
      (mainCta.innerText = primaryCtaText),
      mainCta.insertAdjacentHTML('afterend', newCta),
      document.querySelector('.' + ID + '__ctablock').addEventListener('click', () => {
        services_gaTracking('tour_the_product');
      });
  };
  var utils_pollerLite = function (conditions, callback) {
    var maxTime = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e4;
    var POLLING_INTERVAL = 25;
    var startTime = Date.now();
    var interval = setInterval(() => {
      var allConditionsMet = conditions.every((condition) => {
        if ('function' == typeof condition) return condition();
        return !!document.querySelector(condition);
      });
      allConditionsMet
        ? (clearInterval(interval), callback())
        : Date.now() - startTime >= maxTime && (clearInterval(interval), console.error('Polling exceeded maximum time limit'));
    }, POLLING_INTERVAL);
  };
  var validUrls = [
    '/thank-you-webinar/',
    '/thank-you-ebook-create-reports-funders-want-to-see/',
    '/thank-you-case-study-kahnawake/',
    '/thank-you/',
  ];
  validUrls.some((url) => window.location.pathname.includes(url)) && utils_pollerLite(['body', '.suport-text'], experiment);
})();
