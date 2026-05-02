/* eslint-disable */
(function () {
	'use strict';

	const shared = {
		ID: "FE-Billing-Addon-remaining",
		VARIATION: "1",
		CLIENT: "zoom"
	};

	let userCountry;

	const { ID, VARIATION } = shared;
	const setup = () => {
		document.documentElement.classList.add(ID);
		document.documentElement.classList.add(`${ID}-${VARIATION}`);
	};

	window['optimizely'] = window['optimizely'] || [];
	const optlyTrack = (label) => {
		window['optimizely'].push({
			type: 'event',
			eventName: label,
		});
	};

	const pollerLite = (conditions, callback, maxTime = 40000) => {
		const POLLING_INTERVAL = 25;
		const startTime = Date.now();
		const interval = setInterval(() => {
			const allConditionsMet = conditions.every((condition) => {
				if (typeof condition === 'function') {
					return condition();
				}
				return !!document.querySelector(condition);
			});
			if (allConditionsMet) {
				clearInterval(interval);
				callback();
			} else if (Date.now() - startTime >= maxTime) {
				clearInterval(interval);
				console.log('Polling exceeded maximum time limit');
			}
		}, POLLING_INTERVAL);
	};

	const waitForElem = (selector, callback, timeout = 30000) => {
		const interval = setInterval(() => {
			if (!document.querySelector(selector)) {
				callback();
			} else {
				clearInterval(interval);
			}
		}, 50);

		setTimeout(() => {
			clearInterval(interval);
		}, timeout);
	};


	const addJsToPage = (src, id, cb, classes) => {
		if (document.querySelector(`#${id}`)) {
			return;
		}

		const s = document.createElement('script');
		if (typeof cb === 'function') {
			s.onload = cb;
		}

		if (classes) {
			s.className = classes;
		}

		s.type = 'text/javascript';
		s.src = src;
		s.setAttribute('id', id);
		document.body.appendChild(s);
	};

	const preloadImages = (data) => {
		if (document.images) {
			const storageURL =
				'https://fe-test-dev.s3.amazonaws.com/zoom/%5BAB-ECOMM%5D+2023.08+-+ZO%26ZP%26ZE+Pricing+Pages+-+Add-ons+Section+Optimisation';
			const imageNames = Object?.values(data?.addOns)?.map((item) => item.name);
			const thumbnailNames = Object?.values(data?.addOns)?.map((item) => item.thumbnail);
			imageNames.forEach((name) => {
				const img = new Image();
				img.src = `${storageURL}/${encodeURIComponent(name)}.png`;
			});

			thumbnailNames.forEach((name) => {
				const img = new Image();
				img.src = `${storageURL}/${encodeURIComponent(name)}.png`;
			});
		}
	};

	const observeDOM = (targetSelectorString, callbackFunction, configObject) => {
		const target = document.querySelector(`${targetSelectorString}`);

		if (!target) return;

		const config = configObject || {
			childList: true,
			subtree: true,
			attributes: true,
			characterData: true,
			characterDataOldValue: true
		};
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				observer.disconnect();

				callbackFunction(mutation);
				observer.observe(target, config);
			});
		});

		observer.observe(target, config);
	};

	const tick = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
<path d="M11.3463 1.29941C7.60101 3.61721 5.1383 7.40091 5.1385 11.7006C5.1385 9.24491 3.5405 7.03801 1 5.51681" stroke="#0B5CFF" stroke-width="2.0157" stroke-linejoin="bevel"/>
</svg>`;

	const downArrow = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.4419 5.55806C12.686 5.80214 12.686 6.19786 12.4419 6.44194L8.44194 10.4419C8.19786 10.686 7.80214 10.686 7.55806 10.4419L3.55806 6.44194C3.31398 6.19786 3.31398 5.80214 3.55806 5.55806C3.80214 5.31398 4.19786 5.31398 4.44194 5.55806L8 9.11612L11.5581 5.55806C11.8021 5.31398 12.1979 5.31398 12.4419 5.55806Z" fill="#0B5CFF"/>
</svg>`;
	const tooltipIcon = '<i class="zm-icon-info-outline fe-tooltip"></i>';

	const addButton = (id, disabled, plan, addBtnCopy) => {
		let htmlStr = `<button class='${id}__addBtn' ${disabled ? 'disabled' : ''}>${addBtnCopy}</button>`;

		if((userCountry == 'GB' || userCountry == 'IE' || userCountry == 'JP') && plan === 'zoom phone'){
			htmlStr = `<a type="button" role="link" target="_self" href="https://explore.zoom.us/en/products/zoom-phone/plans-pricing"  class="${id}__contact-sales">${getTranslation('contactSales')}</a>`;
		}

		const planListItems = document.querySelectorAll('.bp-plan-list .bp-ui-card');
		planListItems?.forEach((planListItem) => {
			const title = planListItem?.querySelector('.bp-plan-card__header__info__basic__name');
			const titleText = title?.textContent.trim().toLowerCase();
			if(titleText?.includes('zoom phone') && (titleText?.includes('uk') || titleText?.includes('pro') || titleText?.includes('japan'))){
				htmlStr = `<button class='${id}__addBtn' ${disabled ? 'disabled' : ''}>${addBtnCopy}</button>`;
			}
		});

		if(window.newBillingConfig.accountInfo.isSMBCustomer === true && (userCountry == 'GB' || userCountry == 'IE')){
			htmlStr = `<button class='${id}__addBtn' ${disabled ? 'disabled' : ''}>${addBtnCopy}</button>`;
		}

		return htmlStr;
	};

	const cardHeader = (id, addOnData, payFreq) => {
		const { name, title, logo, badge, priceMonthy, priceAnnual, extraRequirement, details } = addOnData;

		const priceText = payFreq === 'monthly' ? priceMonthy : priceAnnual;

		const htmlStr = `  
        <div class="${id}__cardheader">
            <div class="${id}__cardheader-title">
                <div class="title-imgblock">
                    <img class="title-img"
                        src="${logo}"
                        alt="${name} logo">
                </div>
                <div class="title-content">
                    <div class="row-1">
                        <h3 class="title-text">${title}</h3>
                        ${badge
				? `<span class="title-badge"><img src="${badge}" alt="badge"/></span>`
				: ''
			}
                    </div>
                    <div class="row-2">
                        <span class="title-pricetext">${priceText}</span>
                        ${extraRequirement
				? `<span class="title-extrarequirement">${extraRequirement}</span>`
				: ''
			}
                    </div>
                </div>
            </div>
            <div class="${id}__cardheader-subtitle">
                <span class="subtitle-text">${details}</span>
            </div>
        </div>
        `;
		return htmlStr;
	};

	const dropdown = (id, dropdownItems, payFreq, isOpc) => {
		const priceTier = payFreq === 'monthly' ? 'urlMonthly' : 'urlYearly';

		const htmlStr = `
    <div class="${id}__custom-adp">
        <div class="adp-selected adp-arrow-active">
            <div class="adp-label">${dropdownItems[0].text}</div>
            <div class="adp-arrow">${downArrow}</div>
        </div>
        <div class="adp-items">
            ${dropdownItems
				.map(
					(item, i) =>
						`<div class="adp-item ${i === 0 ? 'same-as-selected' : ''}" 
                        data-price-month="${item.priceMonth}"
                        data-price-year="${item.priceAnnual}"
                        data-url="${isOpc ? `/opc/buy?${item[priceTier].split('?')[1]}` : item[priceTier]
						}" data-valueindex="${i}">
                        ${item.text}
                    </div>`
				)
				.join('\n')} 
           
        </div>
    </div>`;
		return htmlStr;
	};

	const price = (id, val, payFreq = 'year') => {
		const priceStr = val?.split('.')[0].trim();
		const formattedPrice = Number(priceStr).toLocaleString('en-US');

		const currencySymbol = document.querySelector('#currency_symbol').value;

		const htmlStr = `
    <div aria-label="$${formattedPrice} per ${payFreq}" class="${id}__newprice new-price">
        <div>
            <div class='price-part-wrapper'>
                <div class="price-part">
                    <span class="subtext currency-flag ${id}__happyDisplay">${currencySymbol}</span>
                    <div class="price-num">
                        <span class='price ${id}__happyDisplay'>${formattedPrice}</span>
                        <span class="flag-hidden">.</span>
                        <span class="subtext ${id}__happyDisplay">${val?.split('.')[1]}</span>
                    </div>
                </div>
                <span class="rate">${payFreq}</span>
            </div>
        </div>
    </div>

    `;
		return htmlStr;
	};

	const primaryBtn = (url, text, placement = '') => {
		const isDisabled = url.includes('void');
		const btnHtml = `
    <a  type="button"
        role="link"
        target="_self"
        href="${url}"
        tabindex="0"
        class="${placement === 'modal' ? '' : 'zm-button--plain'
			} zm-button--small zm-button is-link buy-plan-${placement === 'modal' ? 'link' : 'btn'} ${text.toLowerCase() === 'contact sales' ? 'contactsales-btn' : `basic-user-buy-btn ${ID}__buynow`
			} ${isDisabled ? 'is-disabled' : ''} " ${isDisabled ? 'style="opacity: 0.4;"' : ''}>
         <span class="zm-button__slot">${text}</span>
    </a>`;
		return btnHtml.trim();
	};

	const tooltipFunc = (id, text) => {
		return `<span class="${id}__tooltip">
      			${tooltipIcon}
				<span class="tooltip-text">${text}</span>
    	</span>`;
	};

	const addonModal = (id, addonData, payFreq, addBtn) => {
		const { name, plan, imageLink, iFrameLink, thumbnail, additionalCopy, tooltip, btnUrlAnnual, btnUrlMonthly, modalData } = addonData;

		const {
			featureHeading,
			features,
			priceMonth,
			priceMonthText,
			priceYear,
			priceYearText,
			priceTierDp,
			purchaseLaterText,
			extraInfo
		} = modalData;
		const controlCard =
			document.querySelector(`[plan="${name.toLowerCase()}"]`) ||
			document.querySelector(`[plan="${name}"]`) ||
			document.querySelector(`[plan="${plan}"]`);

		const controlBuyNowBtn = controlCard?.querySelector('a.buy-plan-btn');
		const primaryBtnUrl2 = !modalData || !controlBuyNowBtn ? '' : controlBuyNowBtn?.href;
		const btnUrl = primaryBtnUrl2;

		const isOpc = btnUrl.includes('/opc');
		const imageUrl = `//fe-test-dev.s3.amazonaws.com/zoom/%5BAB-ECOMM%5D+2023.08+-+ZO%26ZP%26ZE+Pricing+Pages+-+Add-ons+Section+Optimisation/${encodeURIComponent(
			name
		)}.png`;

		const toolTipText = tooltip !== '' ? tooltip : '';

		const ctrlAddBtn = document.querySelector([`[btnref="${name.toLowerCase()}"]`]);

		let leftElement;

		if (imageLink) {
			leftElement = `
			<img src="${imageUrl}"
			alt="">
			`
		}

		if (iFrameLink) {
			leftElement =
				`	<img class="fe-play" src="https://fe-test-dev.s3.amazonaws.com/zoom/%5BAB-ECOMM%5D+2023.08+-+ZO%26ZP%26ZE+Pricing+Pages+-+Add-ons+Section+Optimisation/play.png">
					<img class="fe-thumbnail" src="https://fe-test-dev.s3.amazonaws.com/zoom/%5BAB-ECOMM%5D+2023.08+-+ZO%26ZP%26ZE+Pricing+Pages+-+Add-ons+Section+Optimisation/${encodeURIComponent(thumbnail)}.png">
					<div id="fe-player"></div>
				`;
		}

		const htmlStr = `
    <div class="${id}__addonmodal new-tab-content" data-modal="${name}" modal-id="${plan}">
        <div class="${id}__addonmodal-image show-desktop">
			${leftElement}
        </div>
        <div class="${id}__addonmodal-details new-ui-style" data-name="${name}">
            <div class="${id}__addonmodal-close"></div>
            ${cardHeader(id, addonData, payFreq)}
            <div class="${id}__addonmodal-image show-mobile">
				${leftElement}
            </div>
            <div class="${id}__dropdown-wrapper ${priceTierDp.length > 0 ? '' : `${id}__hide`}"
                  data-price-month-text="${priceMonthText}" 
                  data-price-year-text="${priceYearText}">
              ${priceTierDp.length > 0 ? dropdown(id, priceTierDp, payFreq, isOpc) : ''}       
              ${tooltip !== '' ? tooltipFunc(id, toolTipText) : ''}     
            </div>
            <div 
                class="price-row ${priceYear ? 'has-yearly' : ''} 
                ${(priceYear && `${priceYear} ${priceYearText}`.length > 20) ||
				window.innerWidth < 380
				? 'make-wrap'
				: ''
			}">
                ${priceMonth !== '' ? price(id, priceMonth, priceMonthText) : ''}
                ${priceYear !== '' ? price(id, priceYear, priceYearText) : ''}
            </div>
			${additionalCopy !== '' ?
				`${(userCountry !== 'JP') ? `<div class="${id}__additional-text">${additionalCopy}</div>` : ''}` : ''
			}
            ${purchaseLaterText
				? `<div class ="${id}__purchaselater-text">${purchaseLaterText}</div>`
				: ''
			}
            <div class="btn-row btn-container">
                ${btnUrl !== '' ? primaryBtn(btnUrl, 'Buy Now', 'modal') : addButton(id, ctrlAddBtn.disabled, plan, addBtn)}
            </div>
            <div class="features">
				<div class="features-heading  ${ID}__happyDisplay">${featureHeading}</div>
                <ul>
                ${features
				.map(
					(item, i) =>
						`${item !== '' ? `<li class="">${tick}<span>${item}</span></li>` : ''}`
				)
				.join('\n')}
                </ul>
            </div>
            ${extraInfo ? `<div class="extra-info">${extraInfo}</div>` : ''}
        </div>
    </div>`;
		return htmlStr;
	};

	const getTranslation = (key) => {
		const language = document.querySelector('[lang]').getAttribute('lang');

        const translations = {
			'en-US': {
				phoneMetered: `${(userCountry == 'GB' || userCountry == 'IE') ? 'UK & Ireland Metered' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Australia & NZ Metered' : ((userCountry == 'JP') ? 'Japan Metered' : 'US & Canada Metered' ))}`,
				phoneUnlimited: `${(userCountry == 'GB' || userCountry == 'IE') ? 'UK & Ireland Unlimited' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Australia & NZ Unlimited' : ((userCountry == 'JP') ? 'Japan Unlimited' : 'US & Canada Unlimited' ))}`,
				workplacePro: 'Workplace Pro',
				workplaceProPlus: 'Workplace Pro Plus',
				workplaceBiz: 'Workplace Business',
				workplaceBizPlus: 'Workplace Business Plus',
				contactSales: 'Contact Sales',
			},
			'es-ES': {
                phoneMetered: `${(userCountry == 'GB' || userCountry == 'IE') ? 'Reino Unido e Irlanda tarificadas' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Australia y Nueva Zelanda tarificadas' : ((userCountry == 'JP') ? 'Japan Metered' : 'EE. UU. y Canadá tarificado' ))}`,
                phoneUnlimited: `${(userCountry == 'GB' || userCountry == 'IE') ? 'Reino Unido e Irlanda ilimitadas' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Australia y Nueva Zelanda ilimitadas' : ((userCountry == 'JP') ? 'LLAMADAS ILIMITADAS A JAPÓN' : 'EE. UU. Y CANADÁ ILIMITADO' ))}`,
                workplacePro: 'Workplace Pro',
				workplaceProPlus: 'Workplace Pro Plus',
				workplaceBiz: 'Workplace Comercial',
				workplaceBizPlus: 'Workplace Comercial Plus',
				contactSales: 'Contacto con ventas',
			},
			'de-DE': {
                phoneMetered: `${(userCountry == 'GB' || userCountry == 'IE') ? 'UK und Irland gebührenpflichtig' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Australien und Neuseeland gebührenpflichtig' : ((userCountry == 'JP') ? 'Japan Metered' : 'Tarif für USA und Kanada' ))}`,
                phoneUnlimited: `${(userCountry == 'GB' || userCountry == 'IE') ? 'UK und Irland unbegrenzt' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Australien und Neuseeland unbegrenzt' : ((userCountry == 'JP') ? 'JAPAN UNBEGRENZT' : 'USA UND KANADA UNBEGRENZT' ))}`,
                workplacePro: 'Workplace Pro',
				workplaceProPlus: 'Workplace Pro Plus',
				workplaceBiz: 'Workplace Business',
				workplaceBizPlus: 'Workplace Business Plus',
				contactSales: 'Vertrieb kontaktieren',
			},
			'zh-CN': {
                phoneMetered: `${(userCountry == 'GB' || userCountry == 'IE') ? '英国和爱尔兰计量' : ((userCountry == 'AU' || userCountry == 'NZ') ? '澳大利亚和新西兰计量' : ((userCountry == 'JP') ? '专业版' : '美国和加拿大计时' ))}`,
                phoneUnlimited: `${(userCountry == 'GB' || userCountry == 'IE') ? '英国和爱尔兰无限' : ((userCountry == 'AU' || userCountry == 'NZ') ? '澳大利亚和新西兰无限' : ((userCountry == 'JP') ? '日本无限' : '美国和加拿大无限' ))}`,
                workplacePro: 'Zoom Workplace 专业版',
				workplaceProPlus: 'Zoom Workplace 专业加强版',
				workplaceBiz: 'Zoom Workplace 商业版',
				workplaceBizPlus: 'Zoom Workplace 商业加强版',
				contactSales: '联系销售人员',
			},
			'zh-TW': {
                phoneMetered: `${(userCountry == 'GB' || userCountry == 'IE') ? '英國與愛爾蘭計量' : ((userCountry == 'AU' || userCountry == 'NZ') ? '澳洲與紐西蘭計量' : ((userCountry == 'JP') ? '專業版' : '美國及加拿大計量' ))}`,
                phoneUnlimited: `${(userCountry == 'GB' || userCountry == 'IE') ? '英國與愛爾蘭無限制' : ((userCountry == 'AU' || userCountry == 'NZ') ? '澳洲和紐西蘭無限制' : ((userCountry == 'JP') ? '日本通話暢通無阻' : '美國及加拿大無限制' ))}`,
                workplacePro: 'Workplace 專業版',
				workplaceProPlus: 'Workplace 專業加強版',
				workplaceBiz: 'Workplace 商業版',
				workplaceBizPlus: 'Workplace 商業加強版',
				contactSales: '聯絡銷售人員',
			},
			'fr-FR': {
                phoneMetered: `${(userCountry == 'GB' || userCountry == 'IE') ? 'Royaume-Uni et Irlande appels facturés au temps passé' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Australie et Nouvelle-Zélande appels facturés au temps passé' : ((userCountry == 'JP') ? 'Japan Metered' : 'Tarification fixe pour les États-Unis et le Canada'))}`,
                phoneUnlimited: `${(userCountry == 'GB' || userCountry == 'IE') ? 'Le Royaume-Uni et l’Irlande en illimité' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'L’Australie et la Nouvelle-Zélande en illimité' : ((userCountry == 'JP') ? 'JAPON ILLIMITÉ' : 'ÉTATS-UNIS ET CANADA ILLIMITÉS' ))}`,
                workplacePro: 'Workplace Pro',
				workplaceProPlus: 'Workplace Pro Plus',
				workplaceBiz: 'Workplace Affaires',
				workplaceBizPlus: 'Workplace Affaires Plus',
				contactSales: 'Contacter les ventes',
			},
			'pt-PT': {
                phoneMetered: `${(userCountry == 'GB' || userCountry == 'IE') ? 'Limitado para Reino Unido e Irlanda' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Limitado para Austrália e Nova Zelândia' : ((userCountry == 'JP') ? 'Japan Metered' : 'Plano de chamadas limitadas nos EUA e Canadá'))}`,
                phoneUnlimited: `${(userCountry == 'GB' || userCountry == 'IE') ? 'Ilimitado para Reino Unido e Irlanda' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Ilimitado para Austrália e Nova Zelândia' : ((userCountry == 'JP') ? 'ILIMITADO PARA O JAPÃO' : 'ILIMITADO NOS EUA E CANADÁ' ))}`,
                workplacePro: 'Workplace Pro',
				workplaceProPlus: 'Workplace Pro Plus',
				workplaceBiz: 'Workplace Corporativo',
				workplaceBizPlus: 'Workplace Corporativo Plus',
				contactSales: 'Entrar em Contato com a Equipe de Vendas',
			},
			'ja-JP': {
                phoneMetered: `${(userCountry == 'GB' || userCountry == 'IE') ? 'イギリスとアイルランド 従量制通話' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'オーストラリアとニュージーランド従量制通話' : ((userCountry == 'JP') ? 'プロ' : '米国およびカナダ従量制通話'))}`,
                phoneUnlimited: `${(userCountry == 'GB' || userCountry == 'IE') ? 'イギリスとアイルランド 無制限' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'オーストラリアとニュージーランド 無制限' : ((userCountry == 'JP') ? '日本の無制限通話' : '米国およびカナダ無制限' ))}`,
                workplacePro: 'Workplace プロ',
				workplaceProPlus: 'Workplace プロプラス',
				workplaceBiz: 'Workplace ビジネス',
				workplaceBizPlus: 'Workplace ビジネスプラス',
				contactSales: '営業担当へのお問い合わせ',
			},
			'ru-RU': {
                phoneMetered: `${(userCountry == 'GB' || userCountry == 'IE') ? 'Великобритания и Ирландия — повременная оплата' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Австралия и Новая Зеландия — повременная оплата' : ((userCountry == 'JP') ? 'Профессиональный' : 'США и Канада, с повременной оплатой'))}`,
                phoneUnlimited: `${(userCountry == 'GB' || userCountry == 'IE') ? 'Великобритания и Ирландия — безлимитно' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Австралия и Новая Зеландия — безлимитно' : ((userCountry == 'JP') ? 'ЯПОНИЯ: БЕЗ ОГРАНИЧЕНИЙ' : 'США и КАНАДА, БЕЗЛИМИТНЫЕ' ))}`,
                workplacePro: 'Workplace Профессиональный',
				workplaceProPlus: 'Workplace Профессиональный Плюс',
				workplaceBiz: 'Workplace Бизнес',
				workplaceBizPlus: 'Workplace Бизнес Плюс',
				contactSales: 'Обратиться в отдел продаж',
			},
			'ko-KR': {
                phoneMetered: `${(userCountry == 'GB' || userCountry == 'IE') ? '영국 & 아일랜드 계량형' : ((userCountry == 'AU' || userCountry == 'NZ') ? '호주 & 뉴질랜드 계량형' : ((userCountry == 'JP') ? '프로' : '미국 & 캐나다 종량제'))}`,
                phoneUnlimited: `${(userCountry == 'GB' || userCountry == 'IE') ? '영국 & 아일랜드 무제한' : ((userCountry == 'AU' || userCountry == 'NZ') ? '호주 & 뉴질랜드 무제한' : ((userCountry == 'JP') ? '일본 무제한' : '미국 & 캐나다 무제한' ))}`,
                workplacePro: 'Workplace 프로',
				workplaceProPlus: 'Workplace 프로 플러스',
				workplaceBiz: 'Workplace 비즈니스',
				workplaceBizPlus: 'Workplace 비즈니스 플러스',
				contactSales: '영업에 문의',
			},
			'it-IT': {
                phoneMetered: `${(userCountry == 'GB' || userCountry == 'IE') ? 'Tariffa a consumo Regno Unito e Irlanda' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Tariffa a consumo Australia e Nuova Zelanda' : ((userCountry == 'JP') ? 'Japan Metered' : 'Tariffa a consumo USA e Canada'))}`,
                phoneUnlimited: `${(userCountry == 'GB' || userCountry == 'IE') ? 'Illimitato in Regno Unito e Irlanda' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Illimitato in Australia e Nuova Zelanda' : ((userCountry == 'JP') ? 'GIAPPONE SENZA LIMITI' : 'ILLIMITATE NEGLI STATI UNITI E IN CANADA' ))}`,
                workplacePro: 'Workplace Pro',
				workplaceProPlus: 'Workplace Pro Plus',
				workplaceBiz: 'Workplace Business',
				workplaceBizPlus: 'Workplace Business Plus',
				contactSales: 'Contatta il reparto vendite',
			},
			'vi-VN': {
                phoneMetered: `${(userCountry == 'GB' || userCountry == 'IE') ? 'Gọi tính phí ở Anh và Ireland' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Gọi tính phí ở Úc và New Zealand' : ((userCountry == 'JP') ? 'Cao cấp' : 'Tính cước tại Hoa Kỳ và Canada'))}`,
                phoneUnlimited: `${(userCountry == 'GB' || userCountry == 'IE') ? 'Gọi không giới hạn ở Anh và Ireland' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Gọi không giới hạn ở Úc và New Zealand' : ((userCountry == 'JP') ? 'KHÔNG GIỚI HẠN VỚI MÃ VÙNG NHẬT BẢN' : 'KHÔNG GIỚI HẠN TẠI HOA KỲ VÀ CANADA' ))}`,
                workplacePro: 'Workplace Chuyên nghiệp',
				workplaceProPlus: 'Workplace Chuyên nghiệp Nâng cao',
				workplaceBiz: 'Workplace Kinh doanh',
				workplaceBizPlus: 'Workplace Kinh doanh Nâng cao',
				contactSales: 'Liên hệ kinh doanh',
			},
			'pl-PL': {
                phoneMetered: `${(userCountry == 'GB' || userCountry == 'IE') ? 'Taryfowe – Wielka Brytania i Irlandia' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Taryfowe – Australia i Nowa Zelandia' : ((userCountry == 'JP') ? 'Japan Metered' : 'USA i Kanada – taryfowe'))}`,
                phoneUnlimited: `${(userCountry == 'GB' || userCountry == 'IE') ? 'Nielimitowane – Wielka Brytania i Irlandia' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Nielimitowane – Australia i Nowa Zelandia' : ((userCountry == 'JP') ? 'NIEOGRANICZONE POŁĄCZENIA JAPONIA' : 'USA i Kanada – nielimitowane' ))}`,
                workplacePro: 'Workplace Dla profesjonalistów',
				workplaceProPlus: 'Workplace Dla profesjonalistów Plus',
				workplaceBiz: 'Workplace Dla firm',
				workplaceBizPlus: 'Workplace Dla firm Plus',
				contactSales: 'Kontakt w sprawie sprzedaży',
			},
			'tr-TR': {
                phoneMetered: `${(userCountry == 'GB' || userCountry == 'IE') ? 'Birleşik Krallık ve İrlanda Tarifeli' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Avustralya ve Yeni Zelanda Tarifeli' : ((userCountry == 'JP') ? 'Profesyonel' : 'ABD ve Kanada Tarifeli'))}`,
                phoneUnlimited: `${(userCountry == 'GB' || userCountry == 'IE') ? 'Birleşik Krallık ve İrlanda Sınırsız' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Avustralya ve Yeni Zelanda Sınırsız' : ((userCountry == 'JP') ? 'SINIRSIZ JAPONYA' : 'ABD ve Kanada Sınırsız' ))}`,
                workplacePro: 'Workplace Pro',
				workplaceProPlus: 'Workplace Pro Plus',
				workplaceBiz: 'Workplace İşletme',
				workplaceBizPlus: 'Workplace İşletme Plus',
				contactSales: 'Satış Birimine Ulaşın',
			},
			'id-ID': {
                phoneMetered: `${(userCountry == 'GB' || userCountry == 'IE') ? 'Inggris & Irlandia Terukur' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Tarif Australia & NZ' : ((userCountry == 'JP') ? 'Japan Metered' : 'AS & Kanada Terukur'))}`,
                phoneUnlimited: `${(userCountry == 'GB' || userCountry == 'IE') ? 'Inggris & Irlandia Tak Terbatas' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Australia & Selandia Baru Tanpa Terbatas' : ((userCountry == 'JP') ? 'JEPANG TANPA BATAS' : 'AS & Kanada Tanpa Batas' ))}`,
                workplacePro: 'Workplace Pro',
				workplaceProPlus: 'Workplace Pro Plus',
				workplaceBiz: 'Workplace Bisnis',
				workplaceBizPlus: 'Workplace Bisnis Plus',
				contactSales: 'Hubungi Penjualan',
			},
			'nl-NL': {
                phoneMetered: `${(userCountry == 'GB' || userCountry == 'IE') ? 'VK & Ierland geteld' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Australië en NZ geteld' : ((userCountry == 'JP') ? 'Japan Metered' : 'VS & Canada Metered'))}`,
                phoneUnlimited: `${(userCountry == 'GB' || userCountry == 'IE') ? 'VK & Ierland Onbeperkt' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Australië & NZ Onbeperkt' : ((userCountry == 'JP') ? 'JAPAN ONBEPERKT' : 'VS & Canada Onbeperkt' ))}`,
                workplacePro: 'Workplace Pro',
				workplaceProPlus: 'Workplace Pro Plus',
				workplaceBiz: 'Workplace Zakelijk',
				workplaceBizPlus: 'Workplace Zakelijk Plus',
				contactSales: 'Neem contact op met verkoop',
			},
			'sv-SE': {
                phoneMetered: `${(userCountry == 'GB' || userCountry == 'IE') ? 'Storbritannien och Irland med mätare' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Australien och Nya Zeeland med mätare' : ((userCountry == 'JP') ? 'Japan Metered' : 'USA och Kanada med mätare'))}`,
                phoneUnlimited: `${(userCountry == 'GB' || userCountry == 'IE') ? 'Storbritannien och Irland obegränsad' : ((userCountry == 'AU' || userCountry == 'NZ') ? 'Australien och Nya Zeeland obegränsad' : ((userCountry == 'JP') ? 'JAPAN OBEGRÄNSAD' : 'USA och Kanada obegränsad' ))}`,
                workplacePro: 'Workplace Pro',
				workplaceProPlus: 'Workplace Pro Plus',
				workplaceBiz: 'Workplace Business',
				workplaceBizPlus: 'Workplace Business Plus',
				contactSales: 'Kontakta säljavdelningen',
			},
		}

		return translations[language][key] || key;
	}

	const purchasedAddOnPlan = (productName) => {
		const purchasedPlan = [];
		const planListItems = document.querySelectorAll('.bp-plan-list .bp-ui-card');
		planListItems?.forEach((planListItem) => {
			const title = planListItem?.querySelector('.bp-plan-card__header__info__basic__name');
			const titleText = title?.textContent.trim().toLowerCase();
			if (titleText?.includes('zoom united') && productName?.includes('workplace')) {
				const isBiz = titleText?.includes('business');
				if (isBiz) {
					purchasedPlan.push('zoomUnitedBiz');
				} else if (!isBiz) {
					purchasedPlan.push('zoomUnitedPro');
				}
			} 
		});

		if (purchasedPlan?.length > 1) return null;
		return purchasedPlan;
	};

	const addOnAvailability = (id, addOnModalData) => {
		setTimeout(() => {
			const productName = addOnModalData?.name?.toLowerCase().trim();

			let purchasedItemName = '';
			const purchasedItem = purchasedAddOnPlan(productName);

			if (!purchasedItem?.length) return;

			const iszoomUnitedBizPurchased = purchasedItem?.length && purchasedItem[0] === 'zoomUnitedBiz';
			const isZoomUnitedProPurchased = purchasedItem?.length && purchasedItem[0] === 'zoomUnitedPro';

			if (iszoomUnitedBizPurchased) {
				purchasedItemName = 'Workplace Business';
			}

			if (isZoomUnitedProPurchased) {
				purchasedItemName = 'Workplace Pro';
			}

			if (purchasedItemName) {
				document.querySelectorAll('.adp-items .highlight')?.forEach((item) => {
					const itemName = item.textContent.trim();
					if (itemName === purchasedItemName) {
						item.parentElement.classList.add(`${id}__showWorkplace`);
						item.parentElement.click();
					}else{
						item.parentElement.classList.add(`${id}__hideWorkplace`);
					}
				});
			}
		}, 250);
	};
	
	
	const dropdownToggleHandler = (target) => {
		const dpBtn = target.closest('.adp-selected');
		const dpItems = target.closest('.adp-items');
		target.closest(`.${ID}__eventcard`)?.dataset?.index;

		const addonData = window[`${ID}__data`][window.location.pathname];

		if (!dpBtn && !dpItems) {
			document.querySelectorAll('.adp-items').forEach((dp) => dp.classList.remove('active'));
		} else if (target.closest('.adp-selected') && target.closest(`.${ID}__custom-adp`)) {

			const dp = target.closest('.adp-selected').nextElementSibling;
			dp.classList.toggle('active');
		} else if (target.closest('.adp-item') && target.closest(`.${ID}__custom-adp`)) {
			const lastParentElem = target.closest(`.${ID}__custom-adp`);
			const dpList = target.closest('.adp-items');
			const dpBtnLabel = lastParentElem.querySelector('.adp-label');
			const { valueindex, url, priceYear, priceMonth } = target.closest('.adp-item').dataset;

			dpList
				.querySelectorAll('.adp-item')
				.forEach((dpItem) => dpItem.classList.remove('same-as-selected'));
			target.classList.add('same-as-selected');
			dpList.classList.remove('active');
			dpBtnLabel.innerHTML = dpList.querySelectorAll('.adp-item')[valueindex].innerHTML;

			const addonModalContainer = target.closest(`.${ID}__addonmodal-details`);

			if (priceMonth !== 'undefined' && priceYear !== 'undefined') {
				const dropdownWrapper = target.closest(`.${ID}__dropdown-wrapper`);
				const { priceMonthText, priceYearText } = dropdownWrapper.dataset;
				const priceRow = target.closest(`.${ID}__addonmodal-details`).querySelector('.price-row');
				const monthPriceElem = price(ID, priceMonth, priceMonthText);
				const yearPriceElem = price(ID, priceYear, priceYearText);
				priceRow.innerHTML = '';
				priceMonth !== '' && priceRow.insertAdjacentHTML('beforeend', monthPriceElem);
				priceYear !== '' && priceRow.insertAdjacentHTML('beforeend', yearPriceElem);

				if (priceYear === '' || priceMonth === '') {
					document.querySelector(`.${ID}__addonmodal-details .price-row`).classList.remove('has-yearly');
				} else {
					document.querySelector(`.${ID}__addonmodal-details .price-row`).classList.add('has-yearly');
				}

			}

			const targetName = target.closest(`.${ID}__addonmodal-details`).dataset.name;
			const targetPlan = target.closest(`.${ID}__addonmodal`).getAttribute('modal-id');

			const Feature = addonModalContainer.querySelector('.features');
			const extraInfo = addonModalContainer.querySelector('.extra-info');

			if (targetPlan === 'zoom webinars') {
				const btnContainer = target.closest(`.${ID}__addonmodal-details`);
				const storageSelected = btnContainer.querySelector('.adp-label .highlight').innerText;
				const attendeeCount = storageSelected.split(' ')[0];
				sessionStorage.setItem(`${ID}__selectedWebinar`, attendeeCount);
			}

			if (targetPlan === 'zoom events') {
				const btnContainer = target.closest(`.${ID}__addonmodal-details`);
				const storageSelected = btnContainer.querySelector('.adp-label .highlight').innerText;
				const attendeeCount = storageSelected.split(' ')[0];
				sessionStorage.setItem(`${ID}__selectedEvents`, attendeeCount);
			}

			if (targetPlan === 'zoom sessions') {
				const btnContainer = target.closest(`.${ID}__addonmodal-details`);
				const storageSelected = btnContainer.querySelector('.adp-label .highlight').innerText;
				const attendeeCount = storageSelected.split(' ')[0];
				sessionStorage.setItem(`${ID}__selectedSessions`, attendeeCount);
			}

			if (dpBtnLabel.querySelector('.highlight').innerText === getTranslation('phoneUnlimited')) {
				sessionStorage.setItem(`${ID}__selectedPhone`, 'phone-unlimited');

				Feature.innerHTML = `
				<ul>
					${addonData.addOns[targetName.toLowerCase()].modalData.priceTierDp[1].features
						.map(
							(item, i) =>
								`${item !== '' ? `<li class="">${tick}<span>${item}` : ''}
							</span></li>`
						)
						.join('\n')}
					</ul>
				`;

			} else if (dpBtnLabel.querySelector('.highlight').innerText === getTranslation('phoneMetered')) {
				sessionStorage.setItem(`${ID}__selectedPhone`, 'phone-metered');
				Feature.innerHTML = `
				<ul>
					${addonData.addOns[targetName.toLowerCase()].modalData.priceTierDp[0].features
						.map(
							(item, i) =>
								`${item !== '' ? `<li class="">${tick}<span>${item}` : ''}
							</span></li>`
						)
						.join('\n')}
					</ul>
				`;
			}

			if (dpBtnLabel.querySelector('.highlight').innerText === getTranslation('workplacePro')) {
				sessionStorage.setItem(`${ID}__selectedWorkplace`, 'Workplace Pro');

				Feature.innerHTML = `
				<div class="features-heading  ${ID}__happyDisplay"></div>
				<ul>
					${addonData.addOns[targetName.toLowerCase()].modalData.priceTierDp[0].features
						.map(
							(item, i) =>
								`<li class="">${tick}<span>${item}
							</span></li>`
						)
						.join('\n')}
					</ul>
				`;

			} else if (dpBtnLabel.querySelector('.highlight').innerText === getTranslation('workplaceProPlus')) {
				sessionStorage.setItem(`${ID}__selectedWorkplace`, 'Workplace Pro Plus');
				Feature.innerHTML = `
				<div class="features-heading  ${ID}__happyDisplay">${addonData.addOns[targetName.toLowerCase()].modalData.featureHeading2}</div>
				<ul>
					${addonData.addOns[targetName.toLowerCase()].modalData.priceTierDp[1].features
						.map(
							(item, i) =>
								`<li class="">${tick}<span>${item}
							</span></li>`
						)
						.join('\n')}
					</ul>
				`;
			} else if (dpBtnLabel.querySelector('.highlight').innerText === getTranslation('workplaceBiz')) {
				sessionStorage.setItem(`${ID}__selectedWorkplace`, 'Workplace Business');
				Feature.innerHTML = `
				<div class="features-heading  ${ID}__happyDisplay">${addonData.addOns[targetName.toLowerCase()].modalData.featureHeading2}</div>
				<ul>
					${addonData.addOns[targetName.toLowerCase()].modalData.priceTierDp[2].features
						.map(
							(item, i) =>
								`<li class="">${tick}<span>${item}
							</span></li>`
						)
						.join('\n')}
					</ul>
				`;

			} else if (dpBtnLabel.querySelector('.highlight').innerText === getTranslation('workplaceBizPlus')) {
				sessionStorage.setItem(`${ID}__selectedWorkplace`, 'Workplace Business Plus');
				Feature.innerHTML = `
				<div class="features-heading  ${ID}__happyDisplay">${addonData.addOns[targetName.toLowerCase()].modalData.featureHeading3}</div>
				<ul>
					${addonData.addOns[targetName.toLowerCase()].modalData.priceTierDp[3].features
						.map(
							(item, i) =>
								`<li class="">${tick}<span>${item}
							</span></li>`
						)
						.join('\n')}
					</ul>
				`;
			}

		}
	};

	let player;
	let addOnModalData;
	let addModalCtaClick;
	const clickHandler = (e) => {
		const { target } = e;

		const data = window[`${ID}__data`][window.location.pathname];
		if (target.closest(`.${ID}__learnmore`)) {
			const addonName = target.closest(`.${ID}__learnmore`).dataset.addonname;
			addOnModalData = Object.values(data.addOns).find((item) => item.name.toLowerCase() === addonName.toLowerCase());
			const addBtn = target.closest(`.${ID}__learnmore`).parentElement.querySelector('.bp-addon-card__button .zm-button__slot').textContent;

			const modal = document.createElement('div');
			modal.classList.add(`${ID}__modal`);
			modal.innerHTML = addonModal(ID, addOnModalData, 'annual', addBtn);

			document.body.appendChild(modal);
			document.body.classList.add('zm-popup-parent--hidden')
			const desktopThumbnail = document.querySelector('.FE-Billing-Addon-remaining__addonmodal-image.show-desktop .fe-thumbnail');
			desktopThumbnail && desktopThumbnail.parentElement.classList.add('fe-paused', 'has-thumbnail');

			const mobileThumbnail = document.querySelector('.FE-Billing-Addon-remaining__addonmodal-image.show-mobile .fe-thumbnail');
			mobileThumbnail && mobileThumbnail.parentElement.classList.add('fe-paused', 'has-thumbnail');

			addOnAvailability(ID, addOnModalData);

		} else if (
			target.closest(`.${ID}__addonmodal-close`)
		) {
			document.querySelector(`.${ID}__modal`).remove();
			document.body.classList.remove('zm-popup-parent--hidden');
			sessionStorage.removeItem(`${ID}__selectedPhone`);
			sessionStorage.removeItem(`${ID}__selectedWebinar`);
			sessionStorage.removeItem(`${ID}__selectedEvents`);
			sessionStorage.removeItem(`${ID}__selectedSessions`);
			sessionStorage.removeItem(`${ID}__selectedWorkplace`);
		} else if (target.closest(`.${ID}__addBtn`)) {
			const addBtnName = target.closest(`.${ID}__addonmodal`).getAttribute('data-modal');
			const planName = target.closest(`.${ID}__addonmodal`).getAttribute('modal-id');

			if(planName === 'zoom phone' && (userCountry == 'AU' || userCountry == 'NZ')){
				window.open('/opc/buy/add?plan=pro&subPlan=newsubs&from_sub=pbx&from=pbx_ZAM&type=add','_self')
			}else{
				const addBtn = document.querySelector([`[btnref="${addBtnName.toLowerCase()}"]`]);
				addModalCtaClick = true;
				addBtn.click();
			}
			
			setTimeout(function(){
				if(!document.querySelector('.bp-reactivate-baseplan-dialog')){
					document.querySelector(`.${ID}__modal`).remove();
					document.body.classList.remove('zm-popup-parent--hidden')
				}
			},1000)
		} else if (target.closest('.fe-thumbnail') || target.closest('.fe-play')) {
			document.querySelector('#fe-player') && document.querySelector('#fe-player').remove();

			document.querySelector('.FE-Billing-Addon-remaining__addonmodal-image.show-desktop').classList.remove('fe-paused');
			document.querySelector('.FE-Billing-Addon-remaining__addonmodal-image.show-mobile').classList.remove('fe-paused');

			let playerElement;

			if (target.closest('.show-desktop')) {
				!document.querySelector('.show-desktop #fe-player') && document.querySelector('.show-desktop .fe-thumbnail').insertAdjacentHTML('afterend', '<div id="fe-player"></div>');
				playerElement = document.querySelector('.show-desktop #fe-player');
			}

			if (target.closest('.show-mobile')) {
				!document.querySelector('.show-mobile #fe-player') && document.querySelector('.show-mobile .fe-thumbnail').insertAdjacentHTML('afterend', '<div id="fe-player"></div>');
				playerElement = document.querySelector('.show-mobile #fe-player');
			}

			player = new YT.Player(playerElement, {
				height: '100%',
				width: '100%',
				videoId: `${addOnModalData.iFrameURL}`,
				playerVars: {
					'autoplay': 1,
					'controls': 0,
					'rel': 0,
					'showinfo': 0,
					'modestbranding': 1
				},
				events: {
					'onStateChange': function (event) {
						if (event.data == YT.PlayerState.PAUSED) {
							setTimeout(() => {
								document.querySelector('.FE-Billing-Addon-remaining__addonmodal-image.show-desktop').classList.add('fe-paused');
								document.querySelector('.FE-Billing-Addon-remaining__addonmodal-image.show-mobile').classList.add('fe-paused');
								document.querySelector('#fe-player').remove();
							}, 50)
						}
					}
				}
			});
		} else {
			if(target.closest('[aria-describedby="bp_addon_card_desc_webinar"]')){
				!addModalCtaClick && optlyTrack('Addon_Add_Button_Click_Zoom_Webinars');
			}

			if(target.closest('[aria-describedby="bp_addon_card_desc_pbx"]')){
				!addModalCtaClick && optlyTrack('Addon_Add_Button_Click_Zoom_Phone');
			}

			if(target.closest('[aria-describedby="bp_addon_card_desc_zr"]')){
				!addModalCtaClick && optlyTrack('Addon_Add_Button_Click_Zoom_Rooms');
			}

			if(target.closest('[aria-describedby="bp_addon_card_desc_eventsaas"]')){
				!addModalCtaClick && optlyTrack('Addon_Add_Button_Click_Zoom_Events');
			}

			if(target.closest('[aria-describedby="bp_addon_card_desc_eventsaascore')){
				!addModalCtaClick && optlyTrack('Addon_Add_Button_Click_Zoom_Sessions');
			}

			if(target.closest('[aria-describedby="bp_addon_card_desc_zoom_meeting"]')){
				!addModalCtaClick && optlyTrack('Addon_Add_Button_Click_Zoom_Workplace');
			}

			if(target.closest('[aria-describedby="bp_addon_card_desc_zclips"]')){
				!addModalCtaClick && optlyTrack('Addon_Add_Button_Click_Zoom_Clips_Plus');
			}
		}

		dropdownToggleHandler(target);
	};

	const checkEmptyObject = (objectName) => {
		return objectName === undefined || objectName === null || Object.keys(objectName).length === 0;
	};

	const getApiData = async (id, key = `${id}__data`) => {
		const url = '/billing/basic/plan';

		const data = sessionStorage.getItem(key);
		if (data) {
			return JSON.parse(data);
		}

		const response = await fetch(url);
		if (!response.ok) {
			sessionStorage.removeItem(key);
			throw new Error(`Failed to fetch data from ${url}`);
		}
		const fetchedData = await response.json();

		sessionStorage.setItem(key, JSON.stringify(fetchedData));

		return fetchedData;
	};

	const webinarOPC = (id) => {
		pollerLite(['.zm-select-input:not(.zm-select--show-label)'], () => {
			const selectedStorage = sessionStorage.getItem(`${id}__selectedWebinar`);
			if (selectedStorage) {
				waitForElem(`.${id}__attendeeSelect`, () => {
					if (!document.querySelector(`.${id}__attendeeSelect`)) {
						const selectAttendeeDropdown = document.querySelector('.zm-select-input:not(.zm-select--show-label)');
	
						if (!selectAttendeeDropdown || !sessionStorage.getItem(`${id}__selectedWebinar`)) return;
						selectAttendeeDropdown.classList.add(`${id}__attendeeSelect`);
						selectAttendeeDropdown.click();
						const zmSelect = document.querySelector(`.${id}__attendeeSelect`).closest('.zm-select');
	
						setTimeout(() => {
							zmSelect.querySelectorAll('.zm-select-dropdown__list dd').forEach((attendeeList) => {
								const attendeeCount = attendeeList.textContent.trim();
								if (attendeeCount.trim() === selectedStorage.trim()) {
									attendeeList.click();
									sessionStorage.removeItem(`${id}__selectedWebinar`);
								}
							});
						}, 100);
					}
				})
			}
		});
	};

	const eventsOPC = (id) => {
		pollerLite(['.zm-select-input:not(.zm-select--show-label)'], () => {
			const selectedStorage = sessionStorage.getItem(`${id}__selectedEvents`);
			if (selectedStorage) {
				waitForElem(`.${id}__attendeeSelect`, () => {
					if (!document.querySelector(`.${id}__attendeeSelect`)) {
						const selectAttendeeDropdown = document.querySelector('.zm-select-input:not(.zm-select--show-label)');
	
						if (!selectAttendeeDropdown || !sessionStorage.getItem(`${id}__selectedEvents`)) return;
						selectAttendeeDropdown.classList.add(`${id}__attendeeSelect`);
						selectAttendeeDropdown.click();
						const zmSelect = document.querySelector(`.${id}__attendeeSelect`).closest('.zm-select');
	
						setTimeout(() => {
							zmSelect.querySelectorAll('.zm-select-dropdown__list dd').forEach((attendeeList) => {
								const attendeeCount = attendeeList.textContent.trim();
								if (attendeeCount.trim() === selectedStorage.trim()) {
									attendeeList.click();
									sessionStorage.removeItem(`${id}__selectedEvents`);
								}
							});
						}, 100);
					}
				})
			}
		});
	};

	const sessionsOPC = (id) => {
		pollerLite(['.zm-select-input:not(.zm-select--show-label)'], () => {
			const selectedStorage = sessionStorage.getItem(`${id}__selectedSessions`);
			if (selectedStorage) {
				waitForElem(`.${id}__attendeeSelect`, () => {
					if (!document.querySelector(`.${id}__attendeeSelect`)) {
						const selectAttendeeDropdown = document.querySelector('.zm-select-input:not(.zm-select--show-label)');
	
						if (!selectAttendeeDropdown || !sessionStorage.getItem(`${id}__selectedSessions`)) return;
						selectAttendeeDropdown.classList.add(`${id}__attendeeSelect`);
						selectAttendeeDropdown.click();
						const zmSelect = document.querySelector(`.${id}__attendeeSelect`).closest('.zm-select');
	
						setTimeout(() => {
							zmSelect.querySelectorAll('.zm-select-dropdown__list dd').forEach((attendeeList) => {
								const attendeeCount = attendeeList.textContent.trim();
								if (attendeeCount.trim() === selectedStorage.trim()) {
									attendeeList.click();
									sessionStorage.removeItem(`${id}__selectedSessions`);
								}
							});
						}, 100);
					}
				})
			}
		});
	};

	const zoomPhoneOPC = (id) => {
		pollerLite(['.opc-pbx-head .opc-pbx__link'], () => {
			const selectedStorage = sessionStorage.getItem(`${id}__selectedPhone`);
			if (selectedStorage === 'phone-unlimited') {

				waitForElem(`.${ID}__planDetailsBtn`, () => {
					if (!document.querySelector(`.${id}__planDetailsBtn`)) {
						const planDetailsBtn = document.querySelector('.opc-pbx-head .opc-pbx__link');

						if (!planDetailsBtn) return;

						document.body.classList.add(`${id}__phone-unlimited`);
						planDetailsBtn.classList.add(`${id}__planDetailsBtn`);
						sessionStorage.removeItem(`${id}__selectedPhone`);
						planDetailsBtn.click();

						pollerLite(['.pbx-detail-dialog__confirm-btn'], () => {
							const viewMoreBtn = document.querySelector('.pbx-detail-dialog__confirm-btn');
							viewMoreBtn.click();

							const selectBtnInterval = setInterval(() => {
								const selectBtn = document.querySelector('.zm-table__header .zm-button--primary');
								if (selectBtn) {
									selectBtn.click();
									document.body.classList.remove(`${id}__phone-unlimited`);
									clearInterval(selectBtnInterval);
								}
							}, 50);
							setTimeout(() => {
								const modalClose = document.querySelector('.opc-pbx-comparison-dialog .zm-dialog__close');
								if (modalClose && document.body.classList.contains(`${id}__phone-unlimited`)) {
									modalClose.click();
									document.body.classList.remove(`${id}__phone-unlimited`);
								}
								clearInterval(selectBtnInterval);
							}, 5000);
						});

						pollerLite(['.opc-pbx-comparison-dialog .zm-dialog__close'],()=>{
							const selectBtn = document.querySelector('.zm-table__header .zm-button--primary');
							if(!selectBtn){
								const modalClose = document.querySelector('.opc-pbx-comparison-dialog .zm-dialog__close');
								modalClose && modalClose.click();
							}
						})

						pollerLite(['.zm-select-input:not(.zm-select--show-label)'],()=>{
							const selectAttendeeDropdown = document.querySelector('.zm-select-input:not(.zm-select--show-label)');
							if (!selectAttendeeDropdown) return;
							selectAttendeeDropdown.classList.add(`${id}__attendeeSelect`);
							selectAttendeeDropdown.click();	

							const selectBtnInterval = setInterval(() => {
								document.querySelector('.select-number-list-dropdown dd:nth-of-type(2)').click();
								clearInterval(selectBtnInterval);
							}, 50);

							setTimeout(() => {
								clearInterval(selectBtnInterval);
							}, 3000);
						})
					}
				});
			}
		});
	};

	const workplaceOPC = (id) => {
		pollerLite(['.opc-zm-base-card__view-detail-button button'], () => {
			const selectedStorage = sessionStorage.getItem(`${id}__selectedWorkplace`);
			if (selectedStorage !== 'Workplace Pro') {

				waitForElem(`.${ID}__planDetailsBtn`, () => {
					if (!document.querySelector(`.${id}__planDetailsBtn`)) {
						const planDetailsBtn = document.querySelector('.opc-zm-base-card__view-detail-button button');

						if (!planDetailsBtn) return;

						document.body.classList.add(`${id}__workplace`);
						planDetailsBtn.classList.add(`${id}__planDetailsBtn`);
						sessionStorage.removeItem(`${id}__selectedWorkplace`);
						planDetailsBtn.click();

						pollerLite(['.zone-detail-dialog__confirm-btn'], () => {
							const viewMoreBtn = document.querySelector('.zone-detail-dialog__confirm-btn');
							viewMoreBtn.click();

							const selectBtnInterval = setInterval(() => {
								let selectBtn; 
								if(selectedStorage === 'Workplace Business'){
									selectBtn = document.querySelector('.zm-table__header .zm-button--primary[aria-label="Select Business"]');
								} else if(selectedStorage === 'Workplace Business Plus'){
									selectBtn = document.querySelector('.zm-table__header .zm-button--primary[aria-label="Select Business Plus"]');
								} else if(selectedStorage === 'Workplace Pro Plus'){
									selectBtn = document.querySelector('.zm-table__header .zm-button--primary[aria-label="Select Pro Plus"]');
								}

								if (selectBtn) {
									selectBtn.click();
									document.body.classList.remove(`${id}__workplace`);
									clearInterval(selectBtnInterval);
								}

								document.querySelector('.comparison-dialog--zoom-one') ? document.querySelector('.comparison-dialog--zoom-one').style.display = 'none' : '';
								document.querySelector('.v-modal') ? document.querySelector('.v-modal').style.display = 'none' : '';
							}, 50);
							setTimeout(() => {
								const modalClose = document.querySelector('.comparison-dialog--zoom-one .zm-dialog__close');
								if (modalClose && document.body.classList.contains(`${id}__workplace`)) {
									modalClose.click();
									document.body.classList.remove(`${id}__workplace`);
								}
								clearInterval(selectBtnInterval);
							}, 5000);
						});
					}
				});
			}
		});
	};

	const checkoutPage = (id) => {
		document.body.classList.add(`${id}__checkoutPage`);
		const { search } = window.location;
		if (search.includes('from_sub=eventsaas') && !search.includes('from_sub=eventsaascore')) {
			eventsOPC(id);
		} else if (search.includes('from_sub=eventsaascore')) {
			sessionsOPC(id);
		} 
		else if (search.includes('from_sub=webinar')) {
			webinarOPC(id);
		} else if (search.includes('from_sub=pbx')) {
			zoomPhoneOPC(id);
		} else if(search.includes('from_sub=pro')){
			workplaceOPC(id);
		}
	};


	const init = (data) => {
		const currentPlanPageCards = document.querySelectorAll('.available-products .available-product-row');

		const addOnCards = document.querySelectorAll('.bp-addon-card').length > 0
			? document.querySelectorAll('.bp-addon-card')
			: currentPlanPageCards;

		if (currentPlanPageCards.length > 0) {
			document.body.classList.add(`${ID}__currentPlanPage`);
		}

		const learnMoreCopy = document.querySelector('.bp-addon-card__learn-more').textContent;

		const learnMore = `<div class="${ID}__learnmore">${learnMoreCopy}</div>`;

		addOnCards.forEach((addOnCard) => {
			addOnCard.classList.add(`${ID}__addonCard`);
			const addBtn = addOnCard.querySelector('.bp-addon-card__button') || addOnCard.querySelector('.cart-button');

			const addOnName = addOnCard.querySelector('.bp-addon-card__info__title')
				? addOnCard.querySelector('.bp-addon-card__info__title').innerHTML.replace(/&nbsp;/g, ' ').toLowerCase()
				: addOnCard.querySelector('.product-title').childNodes[0]?.nodeValue.toLowerCase().trim();

			const matchedData = data.addOns[addOnName];

			if (checkEmptyObject(matchedData)) return;

			addBtn.setAttribute('btnref', addOnName);
			addBtn.insertAdjacentHTML('afterend', learnMore);
			const learnMoreBtn = addOnCard.querySelector(`.${ID}__learnmore`);
			learnMoreBtn.dataset.addonname = addOnName;
			learnMoreBtn.classList.add(`${matchedData.plan.replace(' ','')}`)
			const cardCollapseBtn = addOnCard.querySelector('.bp-addon-card__collapse');
			if (cardCollapseBtn) {
				cardCollapseBtn.classList.add(`${ID}__hide`);
			}
		});
		const enableBusinessBtn = document.querySelector('.bp-addon-card [aria-label^="Enable Business"]');
		if (enableBusinessBtn) {
			enableBusinessBtn.classList.add(`${ID}__enableBtn`);
		}
	};

	var activate = () => {
		setup();
		userCountry = window.campaignFlags.currentCountry;
		const userBillingCountry = window.campaignFlags.billingCountry.billTo;
		if(userBillingCountry.includes('MX') || userBillingCountry.includes('IN') || userBillingCountry.includes('VN') || userBillingCountry.includes('BR') || userBillingCountry.includes('SG') || userBillingCountry.includes('ID') || userBillingCountry.includes('KR') || userBillingCountry.includes('PH') || userBillingCountry.includes('MY')){
			document.body.classList.add('FE-not-supported');
		}
		addJsToPage('https://www.youtube.com/iframe_api', 'fe_youtube-script');

		const isSDKAccount = document.querySelector('.zr-main-container')?.__vue__?.$store?.getters['fe-billing-plan-management/isZoomVideoSDKAccount'];

		if (window.location.pathname.includes('/billing')) {
			if (!isSDKAccount) {
				document.body.addEventListener('click', clickHandler);
			}
		}

		if (VARIATION === 'control') {
			return;
		}

		if (window.location.pathname.includes('/billing')) {
			if (!isSDKAccount) {
				getApiData(ID).then((data) => {
					const modifiedData = window.modifyData(data);

					window[`${ID}__data`] = {
						...window[`${ID}__data`],
						...modifiedData
					};

					const addonData = window[`${ID}__data`][window.location.pathname];
					preloadImages(addonData);

					waitForElem(`.${ID}__learnmore`, () => {
						init(addonData);
					});

					const config = {
						childList: true,
						subtree: true,
						attributes: false
					};

					observeDOM('body', () => {
						if (document.querySelector(`.${ID}__learnmore`)) return;

						const learnmoreInterval = setInterval(() => {
							if (!document.querySelector(`.${ID}__learnmore`)) {
								init(addonData);
							} else {
								clearInterval(learnmoreInterval);
							}
						}, 50);
						setTimeout(() => {
							clearInterval(learnmoreInterval);
						}, 30000);
					}, config);
				}).catch((e) => {
					console.log('error: ', e);
				});
				sessionStorage.removeItem(`${ID}__selectedPhone`);
				sessionStorage.removeItem(`${ID}__selectedWebinar`);
				sessionStorage.removeItem(`${ID}__selectedEvents`);
				sessionStorage.removeItem(`${ID}__selectedSessions`);
				sessionStorage.removeItem(`${ID}__selectedWorkplace`);
			}
		} else if (window.location.pathname.includes('/opc/buy')) {
			checkoutPage(ID);
		}
	};


	if (window.location.pathname.includes('/billing')) {
		pollerLite(['.zr-main-container', () => document.querySelectorAll('.bp-addon-card .bp-addon-card__button').length > 0, () => window.modifyData], activate);
	} else if (window.location.pathname.includes('/opc/buy')) {
		pollerLite([() => document.body], activate);
	}

})();