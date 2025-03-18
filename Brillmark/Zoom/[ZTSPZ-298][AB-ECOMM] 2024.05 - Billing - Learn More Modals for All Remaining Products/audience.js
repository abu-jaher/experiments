function pollingFn() {
    if (window.location.pathname.includes('/billing')) {
        if(window.extraPageLoadFields.pageVersion.includes('billing portal') && window.campaignFlags.billingCountry.billTo !== ''){
            return true;
        }
    } else if (window.location.pathname.includes('/opc/buy/')) {
        return true;
    }
}