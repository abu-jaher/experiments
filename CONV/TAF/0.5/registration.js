((w) => {
    const tag = 'cv-0-5';
    const exp = 'TAF 0.5';
    const window = typeof unsafeWindow !== 'undefined' ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const utils = window['conv'].utils;
    const log = qa ? Function.prototype.bind.call(console.log, console, `[CONV] ${exp} |`) : () => { };

    log('Running');

    utils.waitUntil(() => document.body, 0).then((docBody) => {
        docBody.classList.add(tag);
    });

    const regEmailPopulate = () => {
        if (sessionStorage.getItem(`${tag}__email-value`) == null) return;
        const emailInput = document.querySelector(`.regForm #email`);
        emailInput.value = sessionStorage.getItem(`${tag}__email-value`);
        document.querySelector(`.regForm #acceptTermsConditions`).click();

        sessionStorage.removeItem(`${tag}__email-value`);

        if (sessionStorage.getItem(`${tag}__privacy-policy`) == null) return;
        document.querySelector(`.regForm #marketable`).click();
        sessionStorage.removeItem(`${tag}__privacy-policy`);
    }

    utils.waitUntil(() => document.querySelector('.regForm #email'), 0).then(regEmailPopulate);
}
)(window);