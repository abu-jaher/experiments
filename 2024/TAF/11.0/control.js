((w) => {
    const exp = 'TAF 11.0';
    const tag = 'cv-11-0';
    const qa = document.cookie.indexOf('cfQA') > -1;
    const window = typeof unsafeWindow !== 'undefined' ? unsafeWindow : w;
    const log = qa ? Function.prototype.bind.call(console.log, console, `[CONV] ${exp} |`) : () => { };

    let hasFirstName = false;
    let hasLastName = false;
    let hasEmail = false;
    let hasCountry = false;
    let hasConfirmRegion = false;
    let hasConfirmOrg = false;
    let hasConfirmCountry = false;
    let hasConfirmCounty = false;

    const utils = {
        waitUntil: (condition, wait = 5000) => {
            return new Promise((resolve, reject) => {
                let stop;

                const timeout =
                    wait && setTimeout(() => {
                        stop = true;
                        reject();
                    }, wait);

                const check = () => {
                    if (stop) return;
                    if (!condition()) return requestAnimationFrame(check);

                    clearTimeout(timeout);
                    resolve(condition());
                };

                requestAnimationFrame(check);
            });
        },

        init: () => {
            try {
                utils.waitUntil(() => document.body, 0).then((docBody) => {
                    document.addEventListener('input', (event) => {
                        const target = event.target;
                        if (target.id === 'firstName' && !hasFirstName) {
                            Kameleoon.API.Goals.processConversion(406603);
                            hasFirstName = true;
                        }
                        if (target.id === 'lastName' && !hasLastName) {
                            Kameleoon.API.Goals.processConversion(406604);
                            hasLastName = true;
                        }
                        if (target.id === 'email' && !hasEmail) {
                            Kameleoon.API.Goals.processConversion(406602);
                            hasEmail = true;
                        }
                        if (target.id === 'countryCode' && !hasCountry) {
                            Kameleoon.API.Goals.processConversion(406605);
                            hasEmail = true;
                        }
                        if (target.id === `${tag}__region` && !hasConfirmRegion) {
                            Kameleoon.API.Goals.processConversion(406608);
                            hasConfirmRegion = true;
                        }
                        if (target.id === `${tag}__organization` && !hasConfirmOrg) {
                            Kameleoon.API.Goals.processConversion(406609);
                            hasConfirmOrg = true;
                        }

                        if (target.id === `state` && !hasConfirmCounty) {
                            Kameleoon.API.Goals.processConversion(409083);
                            hasConfirmCounty = true;
                        }
                    });

                    document.addEventListener('change', (event) => {
                        const target = event.target;

                        if (target.id === `${tag}__country` && !hasConfirmCountry) {
                            Kameleoon.API.Goals.processConversion(406607);
                            hasConfirmCountry = true;
                        }

                        if ((target.id === `stateOptUS` || target.id === `stateOptCA` || target.id === `stateOptBR`) && !hasConfirmCounty) {
                            Kameleoon.API.Goals.processConversion(409083)
                            hasConfirmCounty = true;
                        }
                    });

                    document.addEventListener('click', (event) => {
                        const target = event.target;

                        if (target.closest(`.${tag}-subject-submit`) || target.closest(`.subjectInterestsWidget .reg-sub-pref`)) {
                            Kameleoon.API.Goals.processConversion(406612);
                            if (document.querySelector(`.${tag}-subject.${tag}-active`) || document.querySelector(`.subjectInterestsWidget li label.active-label`)) {
                                Kameleoon.API.Goals.processConversion(406611);
                            }
                        }

                        if(target.closest(`.registrationSubmit`)){
                            Kameleoon.API.Goals.processConversion(406615);
                        }

                        if(target.closest(`.subjectInterestsWidget li label`)){
                            Kameleoon.API.Goals.processConversion(406610);
                        }
                    });
                });

            } catch (err) {
                log(err.message);
            }
        },
    };

    utils.init();

})(window);