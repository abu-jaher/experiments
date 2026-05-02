((w) => {
    "use strict";

    const tag = 'cv-2-24';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 2.24 |') : () => { };

    const utils = {
        waitForElement: (cssSelector, callback) => {
            var stop,
                elementCached,
                timeout,
                check = () => {
                    try {
                        elementCached = document.querySelector(cssSelector);

                        if (stop) return;

                        if (elementCached) {
                            callback(elementCached);
                            clearTimeout(timeout);
                        } else {
                            window.requestAnimationFrame(check);
                        }
                    } catch (err) {
                        log(err.message);
                    }
                };

            window.requestAnimationFrame(check);

            timeout = setTimeout(() => {
                stop = true;
            }, 5000);
        },
        waitUntil: (condition, wait = 6000) => {
            return new Promise((resolve, reject) => {
                let stop = false;

                const timeout =
                    wait &&
                    setTimeout(() => {
                        stop = true;
                        reject(new Error('Timeout waiting for condition'));
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

        emitGAEvent: (label) => {
            let trackingID = 'UA-3062505-5';
            let stop;

            const check = () => {
                if (stop) return;

                if (!(
                    window.ga instanceof Function &&
                    window.ga.getAll instanceof Function
                )) return requestAnimationFrame(check);

                stop = true;

                const properties = window.ga.getAll();

                let analytics;

                if (trackingID)
                    analytics = properties.find(
                        property =>
                            property.get('trackingId') === trackingID
                    );

                analytics = analytics ? analytics : properties[0];

                if (analytics) analytics.send(
                    'event',
                    'Google Optimize experiment',
                    '[CONV] TAF 2.24',
                    label, { nonInteraction: true }
                );
            };
            requestAnimationFrame(check);
        },

        init: function () {
            try {
                this.waitUntil(() => document.body, 0).then((docBody) => {
                    docBody.classList.add(tag, `${tag}__mobile`);
                    initVariationMobile();
                });

                log('test running');
            } catch (err) {
                log(err.message);
            }
        },
    }

    const sectionIcon = `
	<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
	<path fill-rule="evenodd" clip-rule="evenodd" d="M7.24886 14.5861C7.24886 16.0858 5 16.0858 5 14.5861C5 13.0872 7.24886 13.0872 7.24886 14.5861Z" fill="currentColor"/>
	<path fill-rule="evenodd" clip-rule="evenodd" d="M9.49997 13.9106H15.1264C15.4362 13.9106 15.6884 14.1628 15.6884 14.4726V14.6973C15.6884 15.007 15.4362 15.2592 15.1264 15.2592L9.49997 15.2601C9.19017 15.2601 8.93799 15.0079 8.93799 14.6981V14.4735C8.93799 14.1628 9.19017 13.9106 9.49997 13.9106Z" fill="currentColor"/>
	<path fill-rule="evenodd" clip-rule="evenodd" d="M7.24886 10.2111C7.24886 11.71 5 11.71 5 10.2111C5 8.71219 7.24886 8.71219 7.24886 10.2111Z" fill="currentColor"/>
	<path fill-rule="evenodd" clip-rule="evenodd" d="M9.56198 10H15.1884C15.4982 10 15.7504 10.2522 15.7504 10.562V10.7866C15.7504 11.0964 15.4982 11.3486 15.1884 11.3486H9.56198C9.25218 11.3486 9 11.0964 9 10.7866V10.562C9 10.2522 9.25218 10 9.56198 10Z" fill="currentColor"/>
	<path fill-rule="evenodd" clip-rule="evenodd" d="M7.24886 6.83573C7.24886 8.33462 5 8.33462 5 6.83573C5 5.33601 7.24886 5.33601 7.24886 6.83573Z" fill="currentColor"/>
	<path fill-rule="evenodd" clip-rule="evenodd" d="M9.49997 6.16016H15.1264C15.4362 6.16016 15.6884 6.41234 15.6884 6.72214V6.94676C15.6884 7.25656 15.4362 7.50874 15.1264 7.50874H9.49997C9.19017 7.50874 8.93799 7.25656 8.93799 6.94676V6.72214C8.93799 6.41234 9.19017 6.16016 9.49997 6.16016Z" fill="currentColor"/>
  </svg>
	`;
    const pdfIcon = `
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.7229 2.8318C12.7429 2.8543 12.7716 2.86742 12.8016 2.86742C12.8322 2.86742 12.8604 2.8543 12.8804 2.8318L13.6085 2.09743C13.636 2.06618 13.6429 2.02181 13.626 1.98431C13.6085 1.94681 13.571 1.92243 13.5298 1.92243H13.2685V1.40493C13.2685 1.3468 13.2216 1.29993 13.1635 1.29993H12.4398C12.3816 1.29993 12.3348 1.3468 12.3348 1.40493V1.92243H12.0741C12.0329 1.92243 11.9948 1.94681 11.9779 1.98431C11.961 2.02243 11.9679 2.06618 11.9954 2.09743L12.7229 2.8318Z" fill="currentColor"/>
<path d="M9.22831 7.84124C8.92707 7.50561 8.63019 7.13062 8.36268 6.79374C8.23643 6.63437 8.1158 6.48249 8.00268 6.34436L7.99456 6.33436C8.16019 5.86312 8.25456 5.47748 8.27581 5.18811C8.32956 4.4506 8.24706 3.97499 8.02393 3.73561C7.87331 3.57374 7.64705 3.51686 7.43456 3.58874C7.28206 3.63999 7.0758 3.77686 6.9583 4.13811C6.78267 4.67686 6.86768 5.63061 7.36705 6.41939C7.14393 7.00314 6.83331 7.67376 6.49017 8.31251C5.83643 8.54189 5.3158 8.84314 4.94142 9.20814C4.45267 9.68502 4.25454 10.1581 4.39643 10.5063C4.48393 10.7219 4.68643 10.8506 4.93768 10.8506C5.11268 10.8506 5.30204 10.7875 5.48518 10.6681C5.94768 10.3656 6.55144 9.35814 6.87581 8.77438C7.54581 8.56501 8.20768 8.47938 8.54397 8.44688C8.69584 8.43188 8.84708 8.42063 8.99272 8.41251C9.58147 9.03438 10.0627 9.36188 10.5065 9.44375C10.5958 9.46063 10.6852 9.46875 10.7721 9.46875C11.1333 9.46875 11.4321 9.32438 11.5715 9.08312C11.6765 8.90063 11.6746 8.68811 11.5658 8.49938C11.3196 8.07312 10.5771 7.83875 9.47464 7.83875C9.39527 7.8375 9.31332 7.83874 9.22831 7.84124ZM5.17839 10.198C5.09089 10.2549 5.00089 10.2893 4.93777 10.2893C4.92589 10.2893 4.91777 10.288 4.91277 10.2868C4.90152 10.2312 4.94152 9.98929 5.33277 9.60742C5.51651 9.42804 5.74903 9.2643 6.02402 9.11929C5.67651 9.67742 5.36465 10.0768 5.17839 10.198ZM7.49023 4.31116C7.53086 4.18616 7.58148 4.12992 7.61336 4.11929C7.61398 4.11929 7.61461 4.11867 7.61523 4.11867C7.64586 4.15304 7.77461 4.34867 7.71711 5.14742C7.70711 5.28679 7.67336 5.46305 7.61586 5.67241C7.42898 5.19116 7.37711 4.65616 7.49023 4.31116ZM8.49023 7.8886C8.19211 7.91735 7.73836 7.9761 7.23211 8.09611C7.42836 7.70424 7.61023 7.30673 7.76211 6.9386C7.81461 7.00423 7.86836 7.07235 7.92335 7.14172C8.10647 7.37235 8.31211 7.63235 8.52585 7.88547L8.49023 7.8886ZM11.0803 8.77798C11.0884 8.79235 11.0884 8.79798 11.0866 8.80173C11.0628 8.84236 10.9566 8.90736 10.7716 8.90736C10.7197 8.90736 10.6647 8.90236 10.6078 8.89173C10.3766 8.84923 10.1072 8.68923 9.78594 8.40423C10.6578 8.4461 11.0097 8.65611 11.0803 8.77798Z" fill="currentColor"/>
<path d="M10.4152 1.30017H3.17023C2.72648 1.30017 2.36523 1.66017 2.36523 2.10516V14.8952C2.36523 15.3396 2.72586 15.7002 3.17023 15.7002H12.8296C13.2746 15.7002 13.6346 15.3396 13.6346 14.8952V4.5202L10.4152 1.30017ZM10.4152 2.4383L12.4971 4.52022H10.4152V2.4383ZM12.8302 14.8951H3.17023V2.10502H9.61023V4.52006C9.61023 4.96443 9.97023 5.32505 10.4152 5.32505H12.8303L12.8302 14.8951Z" fill="currentColor"/>
<path d="M6.67063 11.5967C6.60501 11.5386 6.52626 11.4961 6.43626 11.4717C6.34751 11.4467 6.22126 11.4336 6.05938 11.4336H5.52375C5.42188 11.4336 5.345 11.4567 5.295 11.5036C5.245 11.5505 5.21875 11.6267 5.21875 11.7298V13.3192C5.21875 13.4117 5.24188 13.4836 5.28688 13.5336C5.3325 13.5848 5.39375 13.6111 5.46875 13.6111C5.54 13.6111 5.6 13.5848 5.6475 13.5336C5.69375 13.483 5.71687 13.4098 5.71687 13.3167V12.773H6.05937C6.32374 12.773 6.52687 12.7155 6.66311 12.6011C6.80124 12.4855 6.87187 12.3148 6.87187 12.093C6.87187 11.9898 6.85499 11.8955 6.82124 11.8123C6.78687 11.7273 6.73688 11.6555 6.67063 11.5967ZM6.32438 12.2611C6.29438 12.3017 6.25187 12.3298 6.19375 12.348C6.13187 12.3673 6.05312 12.3773 5.95874 12.3773H5.71749V11.8273H5.95874C6.17625 11.8273 6.26437 11.8705 6.29937 11.9061C6.34624 11.9561 6.36874 12.0198 6.36874 12.1011C6.36874 12.1673 6.35375 12.2217 6.32438 12.2611Z" fill="currentColor"/>
<path d="M8.64978 11.6305C8.56291 11.5542 8.46479 11.5017 8.35791 11.4742C8.25416 11.4473 8.12791 11.4336 7.98354 11.4336H7.43917C7.33855 11.4336 7.26354 11.458 7.21543 11.5055C7.1673 11.5536 7.14355 11.6286 7.14355 11.7292V13.2411C7.14355 13.3117 7.1498 13.3686 7.16231 13.4142C7.17668 13.4661 7.20793 13.5067 7.25543 13.5348C7.30043 13.5623 7.36355 13.5755 7.4473 13.5755H7.99167C8.08792 13.5755 8.17604 13.5692 8.25354 13.5567C8.33229 13.5442 8.40729 13.5217 8.47541 13.4905C8.54479 13.4592 8.60916 13.4161 8.66729 13.3642C8.74041 13.2967 8.80166 13.2198 8.84853 13.1342C8.89478 13.0492 8.93041 12.9523 8.95228 12.8467C8.97416 12.7423 8.98541 12.6255 8.98541 12.4992C8.98541 12.1129 8.87229 11.8211 8.64978 11.6305ZM8.28604 13.0761C8.25916 13.0999 8.22666 13.1186 8.18916 13.1317C8.15041 13.1455 8.11229 13.1542 8.07666 13.1574C8.03854 13.1611 7.98541 13.163 7.91729 13.163H7.64103V11.8436H7.87666C7.99979 11.8436 8.10604 11.8574 8.19103 11.8836C8.27103 11.908 8.33978 11.9667 8.3954 12.0592C8.4529 12.1536 8.48165 12.3005 8.48165 12.4955C8.48227 12.7711 8.41667 12.9661 8.28604 13.0761Z" fill="currentColor"/>
<path d="M10.5443 11.4337H9.55992C9.49429 11.4337 9.44117 11.4437 9.39742 11.4637C9.35117 11.485 9.31617 11.5193 9.2943 11.5662C9.27367 11.61 9.26367 11.6637 9.26367 11.73V13.3162C9.26367 13.4118 9.2868 13.485 9.33242 13.5343C9.37867 13.585 9.43992 13.6106 9.51305 13.6106C9.58492 13.6106 9.64492 13.5856 9.69242 13.535C9.73805 13.4856 9.76117 13.4118 9.76117 13.3156V12.6762H10.4087C10.4812 12.6762 10.5381 12.6587 10.5774 12.6243C10.6181 12.5881 10.6387 12.54 10.6387 12.4806C10.6387 12.4212 10.6187 12.3725 10.5787 12.3368C10.5399 12.3012 10.4824 12.2831 10.4087 12.2831H9.76117V11.8356H10.5437C10.6205 11.8356 10.6793 11.8175 10.7193 11.7806C10.7599 11.7437 10.7806 11.6943 10.7806 11.6337C10.7806 11.575 10.7599 11.5256 10.7187 11.4881C10.6793 11.4518 10.6205 11.4337 10.5443 11.4337Z" fill="currentColor"/>
</svg>
	`;
    const moreIcon = `
	<svg xmlns="http://www.w3.org/2000/svg" width="6" height="19" viewBox="0 0 6 19" fill="none">
	<path d="M3.0463 12.4074C2.7025 12.4074 2.37278 12.544 2.12968 12.7871C1.88657 13.0302 1.75 13.3599 1.75 13.7037C1.75 14.0475 1.88657 14.3772 2.12968 14.6203C2.37278 14.8634 2.7025 15 3.0463 15C3.3901 15 3.71981 14.8634 3.96292 14.6203C4.20602 14.3772 4.34259 14.0475 4.34259 13.7037C4.34259 13.3599 4.20602 13.0302 3.96292 12.7871C3.71981 12.544 3.3901 12.4074 3.0463 12.4074ZM3.0463 8.7037C2.7025 8.7037 2.37278 8.84028 2.12968 9.08338C1.88657 9.32648 1.75 9.6562 1.75 10C1.75 10.3438 1.88657 10.6735 2.12968 10.9166C2.37278 11.1597 2.7025 11.2963 3.0463 11.2963C3.3901 11.2963 3.71981 11.1597 3.96292 10.9166C4.20602 10.6735 4.34259 10.3438 4.34259 10C4.34259 9.6562 4.20602 9.32648 3.96292 9.08338C3.71981 8.84028 3.3901 8.7037 3.0463 8.7037ZM4.34259 6.2963C4.34259 5.9525 4.20602 5.62278 3.96292 5.37968C3.71981 5.13657 3.3901 5 3.0463 5C2.7025 5 2.37278 5.13657 2.12968 5.37968C1.88657 5.62278 1.75 5.9525 1.75 6.2963C1.75 6.6401 1.88657 6.96981 2.12968 7.21292C2.37278 7.45602 2.7025 7.59259 3.0463 7.59259C3.3901 7.59259 3.71981 7.45602 3.96292 7.21292C4.20602 6.96981 4.34259 6.6401 4.34259 6.2963Z" fill="currentColor"/>
  </svg>
	`;
    const closeIcon = `
	<svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 15 20" fill="none">
	<path d="M13.3828 5.88281C13.8711 5.39453 13.8711 4.60156 13.3828 4.11328C12.8945 3.625 12.1016 3.625 11.6133 4.11328L7.5 8.23047L3.38281 4.11719C2.89453 3.62891 2.10156 3.62891 1.61328 4.11719C1.125 4.60547 1.125 5.39844 1.61328 5.88672L5.73047 10L1.61719 14.1172C1.12891 14.6055 1.12891 15.3984 1.61719 15.8867C2.10547 16.375 2.89844 16.375 3.38672 15.8867L7.5 11.7695L11.6172 15.8828C12.1055 16.3711 12.8984 16.3711 13.3867 15.8828C13.875 15.3945 13.875 14.6016 13.3867 14.1133L9.26953 10L13.3828 5.88281Z" fill="currentColor"/>
  </svg>
	`;
    const relatedResearchIcon = `
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
	<path d="M3.80816 3.26367H1.63184V15.6H11.5037V13.44H3.808L3.80816 3.26367Z" fill="currentColor"/>
	<path d="M11.5684 0.511719V3.19988H14.2565L11.5684 0.511719Z" fill="currentColor"/>
	<path d="M10.8636 3.90358V0.399902H4.49609V12.7362H14.3524L14.3518 3.90374L10.8636 3.90358ZM12.2236 11.0561H6.62361V10.3523H12.2236V11.0561ZM12.2236 8.67174H6.62361V7.968H12.2236V8.67174ZM12.2236 6.28806H6.62361V5.58432H12.2236V6.28806Z" fill="currentColor"/>
  </svg>
	`;
    const shareIcon = `
	<svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
	 <path d="M11.5004 10.3341C11.1335 10.3341 10.8004 10.4673 10.5004 10.6673L6.13349 8.16726C6.13349 8.10038 6.16662 8.03413 6.16662 8.00038C6.16662 7.96725 6.16662 7.86725 6.13349 7.8335L10.5004 5.33414C10.7673 5.53414 11.1335 5.66726 11.5004 5.66726C12.4335 5.66726 13.1673 4.93414 13.1673 4.00038C13.1673 3.06726 12.4341 2.3335 11.5004 2.3335C10.5673 2.3335 9.83349 3.06662 9.83349 4.00038C9.83349 4.06725 9.83349 4.10038 9.86662 4.16726L5.50038 6.6679C5.2335 6.4679 4.90038 6.33478 4.50038 6.33478C3.56726 6.33478 2.8335 7.0679 2.8335 8.00166C2.8335 8.93478 3.56662 9.66854 4.50038 9.66854C4.86726 9.66854 5.20038 9.53541 5.50038 9.33542L9.86726 11.8354C9.86726 11.9023 9.83413 11.9354 9.83413 12.0023C9.83413 12.9354 10.5673 13.6692 11.501 13.6692C12.4341 13.6692 13.1679 12.9361 13.1679 12.0023C13.1673 11.0679 12.4335 10.3341 11.5004 10.3341Z" fill="currentColor"/>
  </svg>
	`;

    function addContent(content) {
        if (!content) return;
        if (content === 'sections') {
            window.optimizely.push({
				type: 'event',
				eventName: 'Sections_clicks',
			});
            utils.waitForElement(
                'ul.sections-list',
                (oldSectionList = document.querySelector('ul.sections-list')) => {
                    const sectionList = oldSectionList.cloneNode(true);
                    sectionList.classList.add(`${tag}__sectionList`);
                    const items = sectionList.querySelectorAll('li a');
                    const sectionContent = document.querySelector(`#${tag}__sections`);
                    if (sectionContent) {
                        const oldSectionList = document.querySelector(
                            `.${tag}__sectionList`
                        );
                        if (oldSectionList) {
                            oldSectionList.remove();
                        }
                        sectionContent
                            .querySelector(`.${tag}__dynamicContent`)
                            .appendChild(sectionList);

                        let found = false;
                        document.querySelectorAll(`.cv-2-21__sectionList li a`).forEach(item => {
                            if (found) return;
                            const targetId = item.getAttribute('href');
                            const targetElement = document.querySelector(`${targetId}`);
                            if (targetElement) {
                                const rect = targetElement.getBoundingClientRect();
                                if (rect.top >= 0 && rect.top <= window.innerHeight) {
                                    found = true;
                                    document.querySelector(`.cv-2-21__sectionList li a.active`) && document.querySelector(`.cv-2-21__sectionList li a.active`).classList.remove('active')
                                    item.classList.add('active');
                                }
                            }
                        });
                    }
                }
            );
        }

        if (content === 'pdf') {
            utils.waitForElement('.epub-tab', () => {
                const items = Array.from(
                    document.querySelectorAll('.publication-tabs .epub-tab a')
                );
                const markup = `
		   <ul class="${tag}__pdfList">
		   ${items
                        .map((item) => {
                            const label = item.querySelector('.mobile-label');
                            if (!label) return '';
                            label.textContent = label.textContent.replace('(open in a new window)', '');
                            return `
				<li class="${tag}__pdfItem">
				   ${item.outerHTML}
				</li>
			 `;
                        })
                        .join('')}
		   </ul>
		  `;
                const pdfContent = document.querySelector(`#${tag}__pdf`);
                if (pdfContent) {
                    const oldPdfList = document.querySelector(`.${tag}__pdfList`);
                    if (oldPdfList) {
                        oldPdfList.remove();
                    }
                    pdfContent
                        .querySelector(`.${tag}__dynamicContent`)
                        .insertAdjacentHTML('beforeend', markup);
                }
            });
        }
        if (content === 'more') {
            window.optimizely.push({
				type: 'event',
				eventName: 'More_clicks',
			});
            utils.waitForElement(
                '[data-stick-observer-id="publication-tabs-dropdown-tab-nav"]',
                () => {
                    const oldTabNav = document.querySelector(
                        '[data-stick-observer-id="publication-tabs-dropdown-tab-nav"] > ul.tab-nav'
                    );
                    const tabNav = oldTabNav.cloneNode(true);
                    tabNav.classList.add(`${tag}__tabNav`);
                    tabNav.insertAdjacentHTML(
                        'beforeend',
                        `<li class="${tag}__tabNav__relatedResearch">
				 <button class="${tag}__tabNav__relatedResearch__btn ${tag}__relatedResearch">
				  ${relatedResearchIcon}
					<span>Related Research</span>
				 </button>
			  </li>`
                    );
                    const moreContent = document.querySelector(`#${tag}__more`);
                    if (moreContent) {
                        const oldTabNav = document.querySelector(`.${tag}__tabNav`);
                        if (oldTabNav) {
                            oldTabNav.remove();
                        }
                        moreContent
                            .querySelector(`.${tag}__dynamicContent`)
                            .appendChild(tabNav);

                        // Add share Btn to the sticky menu
                        utils.waitForElement('.a2a_dd', () => {
                            const shareBtn = `
					<button class="${tag}__tabNav__share__btn ${tag}__share">
					   <i class="fas fa-share-alt share-icon" aria-hidden="true"></i>
					   <span>Share</span>
					</button>
				 `;
                            const researchBtn = document.querySelector(
                                `.${tag}__relatedResearch`
                            );
                            if (shareBtn) {
                                researchBtn.insertAdjacentHTML('afterend', shareBtn);
                            }
                        });
                    }
                }
            );
        }
    }
    function toggleTabActiveClass(isCloseBtn = false, activeBtn, activeContent) {
        if ((!activeBtn || !activeContent) && !isCloseBtn) return;
        const wasBtnActive = isCloseBtn
            ? false
            : activeBtn.parentElement.classList.contains(
                `${tag}__tabMenu__item--active`
            );
        const wasContentActive = isCloseBtn
            ? false
            : activeContent.classList.contains(`${tag}__tabContent__item--active`);
        const tabs = document.querySelectorAll(`.${tag}__tabMenu__item`);
        const tabContents = document.querySelectorAll(`.${tag}__tabContent__item`);
        tabs.forEach((tab) =>
            tab.classList.remove(`${tag}__tabMenu__item--active`)
        );
        tabContents.forEach((tabContent) =>
            tabContent.classList.remove(`${tag}__tabContent__item--active`)
        );

        if ((wasBtnActive && wasContentActive) || isCloseBtn) return;
        activeBtn.parentElement.classList.add(`${tag}__tabMenu__item--active`);
        activeContent.classList.add(`${tag}__tabContent__item--active`);
        addContent(activeBtn.getAttribute('data-id'));
    }

    function initVariationMobile() {
        utils.waitForElement('.issueSerialNavigation .cover img', () => {
            // Sticky Tab Menu
            utils.waitForElement(
                '.col-md-7-12:not(.serNav_container) [data-pb-dropzone="contents1"]',
                () => {
                    const parent = document.querySelector(
                        '.col-md-7-12:not(.serNav_container) [data-pb-dropzone="contents1"]'
                    );
                    const tabMarkup = `
		   <div class="${tag}__tabWrapper">
			  <ul class="${tag}__tabMenu">
				 <li class="${tag}__tabMenu__item hidden">
					<button class="${tag}__tabMenu__item__btn" data-id="sections">
					${sectionIcon}
					<span>Sections</span>
					</button>
				 </li>
				 <li class="${tag}__tabMenu__item hidden">
					<button class="${tag}__tabMenu__item__btn" data-id="pdf">
					${pdfIcon}
					<span>PDF/EPUB</span>
					</button>
				 </li>
				 <li class="${tag}__tabMenu__item">
					<button class="${tag}__tabMenu__item__btn" data-id="more">
					${moreIcon}
					<span>More</span>
					</button>
				 </li>
			  </ul>
			  <div class="${tag}__tabContent">
				 <div
					id="${tag}__sections"
					class="${tag}__tabContent__item">
					<h4 class="${tag}__tabContent__item__heading">
					   Sections 
					   <button class="${tag}__tabClose">${closeIcon}</button>
					</h4>
					<div class="${tag}__dynamicContent"></div>
				 </div>
				 <div id="${tag}__pdf" class="${tag}__tabContent__item">
					<h4 class="${tag}__tabContent__item__heading">
					   View 
					   <button class="${tag}__tabClose">${closeIcon}</button>
					</h4>
					<div class="${tag}__dynamicContent"></div>
				 </div>
				 <div id="${tag}__more" class="${tag}__tabContent__item">
					<h4 class="${tag}__tabContent__item__heading">
					   More 
					   <button class="${tag}__tabClose">${closeIcon}</button>
					</h4>
					<div class="${tag}__dynamicContent"></div>
				 </div>
			  </div>
		   </div>
		  `;

                    if (!document.querySelector(`.${tag}__tabWrapper`)) {
                        parent.insertAdjacentHTML('afterbegin', tabMarkup);

                        utils.waitForElement('.section-nav, .sections-nav', () => {
                            const sectionTab = document.querySelector('[data-id="sections"]');
                            if (sectionTab) {
                                sectionTab.parentElement.classList.remove('hidden');
                            }
                        });
                        utils.waitForElement('.pdf-tab, .epub-tab', () => {
                            const pdfTab = document.querySelector('[data-id="pdf"]');
                            if (pdfTab) {
                                pdfTab.parentElement.classList.remove('hidden');
                            }
                        });

                        utils.waitForElement('.grant-access', () => {
                            const pdfTab = document.querySelector('[data-id="pdf"]');

                            if (pdfTab) {
                                pdfTab.parentElement.classList.add('hidden');

                                const wrapper = document.querySelector(`.${tag}__tabWrapper`);
                                wrapper.classList.add('noAccess');
                                if (!wrapper.querySelector(`.${tag}__tabMenu__item--access`)) {
                                    wrapper
                                        .querySelector(`.${tag}__tabMenu__item:not(.hidden)`)
                                        .insertAdjacentHTML(
                                            'beforebegin',
                                            `
                                                <li class="${tag}__tabMenu__item ${tag}__tabMenu__item--access">
                                                    <button class="${tag}__grantAccess">
                                                        Read this article
                                                    </button>
                                                </li>
                                            `
                                        );
                                }
                            }
                        });

                        const tabWrapper = document.querySelector(`.${tag}__tabWrapper`);
                        const header = document.querySelector('.publicationContentHeader');

                        const observer = new IntersectionObserver(
                            ([entry]) => {
                                if (!entry.isIntersecting) {
                                    tabWrapper.classList.add('sticky');
                                } else {
                                    tabWrapper.classList.remove('sticky');
                                }
                            },
                            {
                                threshold: 0,
                                rootMargin: `0px 0px 0px 0px`,
                            }
                        );

                        observer.observe(header);
                    }
                }


            );

            utils.waitForElement('.accessLogo .access-icon', () => {
                const elem = document.querySelector(`.accessLogo`);
                const shareSocialString = `<a class="${tag}__share-social" href="javascript:void(0)">
					<i class="fas fa-share-alt share-icon" aria-hidden="true"></i>
					<span>Share</span>
				</a>
				`;

                if (!document.querySelector(`.${tag}__share-social`)) {
                    elem.parentElement.classList.add(`${tag}__mobile-social`);
                    elem.insertAdjacentHTML('afterend', shareSocialString)
                }
            });

            setTimeout(()=>{
                if(document.querySelector(`.tabs.tabs-widget>div:first-of-type`)){
                    document.querySelector(`.tabs.tabs-widget>div:first-of-type`).style.height = `0`;
                    document.querySelector(`.tabs.tabs-widget>div:first-of-type`).style.minHeight = `0`;
                }
            },2500);

        });

        document.body.addEventListener('click', (e) => {
            const el = e.target;
            if (el.closest(`.${tag}__share-social`)) {
                document.querySelector('.a2a_dd').click();
            }

            if (el.closest(`.${tag}__tabMenu__item__btn`)) {
                const btn = el.closest(`.${tag}__tabMenu__item__btn`);
                const id = btn.getAttribute('data-id');
                const content = document.querySelector(`#${tag}__${id}`);
                if (btn && content) {
                    toggleTabActiveClass(false, btn, content);
                    btn.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
                return;
            }
            if (el.closest(`.${tag}__tabClose`)) {
                toggleTabActiveClass(true);
                return;
            }

            if (el.closest(`.${tag}__relatedResearch`)) {
                utils.waitForElement(
                    '.related-research, .further-tab-margin',
                    (relatedResearchSection) => {
                        const offset = -60;
                        const elementPosition = relatedResearchSection.getBoundingClientRect().top + window.pageYOffset + offset;
                        window.scrollTo({
                            top: elementPosition,
                            behavior: 'smooth'
                        });
                        toggleTabActiveClass(true);
                    }
                );
                return;
            }
            if (
                el.closest(`.${tag}__share`) ||
                el.closest(`.${tag}__share--header`) ||
                el.closest(`.${tag}__share--additional`)
            ) {
                utils.waitForElement('.a2a_dd', () => {
                    const shareBtn = document.querySelector('.a2a_dd');
                    shareBtn.click();
                    toggleTabActiveClass(true);
                });
                return;
            }
            if (el.closest(`.${tag}__crossMark a`)) {
                e.preventDefault();
                utils.waitForElement(
                    `.cross_mark:not(.${tag}__crossMark) a`,
                    (updateLink) => {
                        updateLink.click();
                        toggleTabActiveClass(true);
                    }
                );
                return;
            }
            if (el.closest(`.${tag}__grantAccess`)) {
                utils.waitForElement(`.grant-access`, (accessLink) => {
                    accessLink.click();
                    toggleTabActiveClass(true);
                });
                return;
            }

            if (el.closest(`#${tag}__sections .${tag}__dynamicContent ul li`)) {
                e.preventDefault();
                toggleTabActiveClass(true);
                const getDatabehaviour = el.closest(`.${tag}__dynamicContent ul li`).querySelector(`[data-behaviour-ref]`).getAttribute('data-behaviour-ref');
                const element = document.querySelector(getDatabehaviour);
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementPosition - 70,
                    behavior: 'smooth'
                });
                return;
            }

            if (el.closest(`#${tag}__pdf .${tag}__dynamicContent ul li`) || el.closest(`#${tag}__more .${tag}__dynamicContent ul li`)) {
                toggleTabActiveClass(true);
                return;
            }
        });
    }

    setTimeout(() => {
        document.body.style.opacity = 1;
    }, 3000)

    utils.init();
})(window);