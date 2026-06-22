// estimated taxes 
function getCookie(c_name) {
    var c_value = " " + document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

function getTaxCalculated() {

    if (!document.querySelector('[name="ZOOM-CSRFTOKEN"]')) return;
    var token = document.querySelector('[name="ZOOM-CSRFTOKEN"]').value;

    var planData = decodeURIComponent(getCookie('buyplanCookie'));

    var address = '';
    var city = '';
    var state = '';
    var zip = '';
    var country = '';

    // get address 
    var addressInput = document.querySelector('#address-line1-input');
    if (addressInput && addressInput.value && addressInput.value.trim() != "") {
        address = addressInput.value;
    }

    // get state
    var stateInput = document.querySelector('#state-input');
    if (stateInput && stateInput.value && stateInput.value.trim() != "-") {
        state = stateInput.value;
    }

    // get state
    var stateSelect = document.querySelector('#state-select');
    if (stateSelect && stateSelect.value && stateSelect.value.trim() != "-") {
        state = stateSelect.value;
    }

    // get zip code
    var zipInput = document.querySelector('#zip-input');
    if (zipInput && zipInput.value && zipInput.value.trim() != "") {
        zip = zipInput.value;
    }

    // get country
    var countryInput = document.querySelector('#country-input');
    if (countryInput && countryInput.value && countryInput.value.trim() != "") {
        country = countryInput.value;
    } else {
        country = optimizely.get('visitor').location.country;
    }

    // get city 
    var cityInput = document.querySelector('#city-input');
    if (cityInput && cityInput.value && cityInput.value.trim() != "") {
        city = cityInput.value;
    } else {
        city = optimizely.get('visitor').location.city;
    }

    var contact = JSON.stringify({ address, city, state, zip, country });

    var eventType = 1;
    var currency = getCookie('_zm_currency');
    var taxExempt = false;

    var myHeaders = new Headers();
    myHeaders.append("X-Requested-With", "XMLHttpRequest, XMLHttpRequest, OWASP CSRFGuard Project");
    myHeaders.append("zoom-csrftoken", token);

    var formdata = new FormData();
    formdata.append("buyPlan", planData);
    formdata.append("contact", contact);
    formdata.append("eventType", eventType);
    formdata.append("currency", currency);
    formdata.append("taxExempt", taxExempt);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    var json;

    // send request
    fetch("https://zoom.us/tax/estimate", requestOptions)
        .then(response => response.text())
        .then(result => {
            json = result;
            console.log('API RESULT: '+json);
            var taxJson = JSON.parse(json);
            var taxTotal = 0;

            // if taxes are not available
            if (taxJson.data && taxJson.data[0] && taxJson.data[0].tax && taxJson.data[0].tax.length == 0) {
                console.log('No Estimated Tax Value');
                return;
            }

            // if taxes are available
            if (taxJson.data) {
                for (var i = 0; i < taxJson.data.length; i++) {
                    taxTotal = taxTotal + ((taxJson.data[i].tax[0].taxAmount) / 100);
                }
            }

            // Print Estimated Tax
            console.log('Estimated tax: '+parseFloat(taxTotal.toFixed(2)))

        })
        .catch(error => console.log('error', error));

}

getTaxCalculated();