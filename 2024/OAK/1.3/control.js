((w) => {
    const tag = 'cv-1-3';
    const exp = 'OAK 1.3 | Control';
    const window = typeof unsafeWindow !== 'undefined' ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const mobile = window.innerWidth < 640;
    const utils = window['conv'].utils;
    const log = qa ? Function.prototype.bind.call(console.log, console, `[CONV] ${exp} |`) : () => { };

    log('Running');

    const init = () => {
        document.body.classList.add(tag);

        const orderRows = document.querySelectorAll('.order-summary-total tr');
        orderRows.forEach((element) => {
            if (element.innerText.toLocaleLowerCase().indexOf('subtotal') > -1) {
                element.style.display = 'none';
            }
        })

    };

    utils.waitUntil(() => document.querySelector('.price-qty-info .red-text') && document.querySelector('.order-summary-total'), 0).then(() => init());

})(window);