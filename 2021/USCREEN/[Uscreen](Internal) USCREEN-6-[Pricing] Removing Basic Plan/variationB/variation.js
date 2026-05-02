var __webpack_modules__ = {
  339: (module) => {
    module.exports = { ID: 'uc006', VARIATION: 'control', CLIENT: 'Funnelenvy', SITE: 'uscreen' };
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
  var shared = __webpack_require__(339);
  var shared_default = __webpack_require__.n(shared);
  var setup = () => {
    var { ID, VARIATION } = shared_default();
    document.documentElement.classList.add(ID), document.documentElement.classList.add(ID + '-' + VARIATION);
  };
  const services_setup = setup;
  var gaTracking = function (eventLabel) {
    var trackingId = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'G-KXMYLX5B91';
    var eventName = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 'click';
    var measurementId = trackingId.split('-')[1];
    var apiUrl =
      'https://www.google-analytics.com/mp/collect?measurement_id=' + measurementId + '&api_secret=maanCIZkSRCJXZafQLG6uQ';
    var data = {
      client_id: Math.random().toString(36).substring(2),
      events: [{ name: eventName, params: { event_category: 'funnelenvy', event_label: eventLabel } }],
    };
    fetch(apiUrl, { method: 'POST', body: JSON.stringify(data) });
  };
  const services_gaTracking = gaTracking;
  var pageNameConfig = {
    '/pricing/': 'pricing',
    '/plans-comparison/': 'comparison',
    '/bullet/upgrade': 'upgrade',
  };
  var basicPlanLink = '?package=price_1HL9MSFJDrKkwzVpVSTP9uwO';
  var basicUpgradeLink = '/bullet/upgrade/basic';
  var growthPlanLink = '?package=price_1JgtZlFJDrKkwzVp2DWUCMa3';
  var growthUpgradeLink = '/bullet/upgrade/growth';
  var bookDemoLink = 'https://www.uscreen.tv/request-demo/';
  var clickHandler = (event) => {
    var { target } = event;
    var action = '/bullet/upgrade' === window.location.pathname ? 'select_plan' : 'start_trial';
    target.closest('a[href*="' + basicPlanLink + '"]') || target.closest('[href*="' + basicUpgradeLink + '"]')
      ? services_gaTracking('basic_' + action + '_clicks_' + pageNameConfig[window.location.pathname])
      : target.closest('a[href*="' + growthPlanLink + '"]') || target.closest('[href*="' + growthUpgradeLink + '"]')
      ? services_gaTracking('growth_' + action + '_clicks_' + pageNameConfig[window.location.pathname])
      : target.closest('a[href*="' + bookDemoLink + '"]') || target.closest('[data-intercom="plusDemoRequest"]')
      ? services_gaTracking('plus_book_demo_clicks_' + pageNameConfig[window.location.pathname])
      : target.closest('[href*="/plans-comparison/"]') &&
        '/pricing/' === window.location.pathname &&
        services_gaTracking('view_full_list_clicks_pricing');
  };
  const clickhandler = clickHandler;
  var getNextSibling = (elem, selector) => {
    var sibling = elem.nextElementSibling;
    if (!selector) return sibling;
    while (sibling) {
      if (sibling.matches(selector)) return sibling;
      sibling = sibling.nextElementSibling;
    }
    return sibling;
  };
  var { ID, VARIATION } = shared_default();
  var modifyCtas = () => {
    var trialCtas = document.querySelectorAll('[href*="https://www.uscreen.io/admin"]');
    trialCtas.forEach((cta) => {
      var ctaUrl = new URL(cta.href);
      console.log(VARIATION), ctaUrl.searchParams.set('uio_test06_variation', VARIATION), (cta.href = ctaUrl.href);
    });
  };
  var init = () => {
    if ((modifyCtas(), 'control' === VARIATION)) return;
    var newFeatureHeadline = '<div class="' + ID + '__growthHeadline">Get Building Your Account:</div>';
    var newFeatureBullet = '<li class="' + ID + '__growthBullet">Customizable website</li>';
    var secFeatureBullets = '<li class="' + ID + '__growthBullet">Marketing tools & automations</li>';
    var thirdFeatureBullets = '<li class="' + ID + '__growthBullet">Business & customer analytics</li>';
    if ('/pricing/' === window.location.pathname) {
      var growthColumn = document.querySelector('.pricing-columns>div:nth-child(2)');
      var firstFeatureList = growthColumn.querySelectorAll('.pricing-list')[0];
      var secondFeatureList = growthColumn.querySelectorAll('.pricing-list')[1];
      document.querySelector('.' + ID + '__growthHeadline') ||
        (growthColumn.lastElementChild.classList.add(ID + '__featurecontainer'),
        growthColumn.querySelector('div:first-child').insertAdjacentHTML('afterend', newFeatureHeadline)),
        document.querySelector('.' + ID + '__growthBullet') ||
          (firstFeatureList.insertAdjacentHTML('afterbegin', newFeatureBullet),
          secondFeatureList.insertAdjacentHTML('beforeend', thirdFeatureBullets),
          secondFeatureList.insertAdjacentHTML('beforeend', secFeatureBullets));
      var secondFeatureHeadline = getNextSibling(firstFeatureList, 'p');
      secondFeatureHeadline.classList.add(ID + '__hide');
    }
  };
  const experiment = () => {
    services_setup(), document.body.addEventListener('click', clickhandler), init();
  };
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
  var ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);
  var pageToSelectorConfig = {
    '/pricing/': '.pricing-columns',
    '/plans-comparison/': '.pricing-table-v2--table',
    '/bullet/upgrade': '#pricing_plans',
    '/admin/registrations/new': 'body',
  };
  ieChecks || pollerLite(['body', '' + pageToSelectorConfig[window.location.pathname]], experiment);
})();
