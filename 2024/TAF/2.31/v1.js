((w) => {
    const tag = 'cv-2-31';
    const exp = 'TAF 2.31';
    const window = typeof unsafeWindow !== 'undefined' ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const utils = window['conv'].utils;
    const log = qa ? Function.prototype.bind.call(console.log, console, `[CONV] ${exp} |`) : () => { };

    log('Running v1');

    utils.waitUntil(() => document.body, 0).then((docBody) => {
        docBody.classList.add(tag);
    });
}
)(window);