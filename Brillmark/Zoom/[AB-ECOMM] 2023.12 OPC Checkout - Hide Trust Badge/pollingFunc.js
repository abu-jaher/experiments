/**
 * Sample Polling Function
 * Supply an expression to return a boolean inside a function.
 * For complete documentation, see https://docs.developers.optimizely.com/web/docs/dynamic-websites#section-polling
 */

function pollingFn() {
    var userCountry = window.dataModel.currentCountry;
    var countryList = ['GB', 'IE', 'CA', 'NZ', 'AU'];

    if (countryList.includes(userCountry)) {
        return true;
    }
}