((w) => {
	const tag = 'cv-1-3';
	const exp = 'OAK 1.3 | V2';
	const window = typeof unsafeWindow !== 'undefined' ? unsafeWindow : w;
	const qa = document.cookie.indexOf('cfQA') > -1;
	const mobile = window.innerWidth < 640;
	const utils = window['conv'].utils;
	const log = qa ? Function.prototype.bind.call(console.log, console, `[CONV] ${exp} |`) : () => { };

	log('Running');

	const getOriginalPrice = (element)=>{
		const value = Array.from(element.childNodes)
		.filter(node => node.nodeType === Node.TEXT_NODE)
		.map(node => node.textContent.trim())
		.filter(text => text !== '');

		return value[0];
	}

	const applySaving = (saving, index, price, quantity) => {
		const prices = document.querySelectorAll('.price-qty-info .red-text');
		const pricesMedium = document.querySelectorAll('.show-for-medium-only .red-text');

		if (saving.toFixed(2) == price) return;

		if (!prices[index]?.querySelector('s')){
			prices[index]?.classList.add(`${tag}-strike`);	
			prices[index]?.insertAdjacentHTML('afterbegin', `<s>£${saving.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</s><br>`);
		}

		if (!pricesMedium[index]?.querySelector('s')){
			pricesMedium[index]?.classList.add(`${tag}-strike`);
			pricesMedium[index]?.insertAdjacentHTML('afterbegin', `<s>£${saving.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</s><br>`);
		}
	}

	const getSaving = () => {
		let saving = 0;

		let products = dataLayer[0].ecommerce.checkout.products;
		const orderRows = document.querySelectorAll('.order-summary-total tr');

		products.forEach((product, index) => {
			if(product.name == "Premium Delivery"){
				products = products.splice(index, 1);
			}

			if(product.category === "delivery" || product.category === "warranty" || product.price === 0) return;
			let productSaving = 0;
			let productPrice

			const firstTier = product.tierPrices.firstTier;
			const secondTier = product.tierPrices.thirdTier || product.tierPrices.secondTier || null;

			if(document.querySelectorAll('.price-qty-info .red-text')[index].querySelector('s')){
				productPrice = getOriginalPrice(document.querySelectorAll('.price-qty-info .red-text')[index]).replace('£', '').replace(/,/g, '');
			}else{
				productPrice = parseFloat(document.querySelectorAll('.price-qty-info .red-text')[index].textContent.replace('£', '').replace(/,/g, ''))
			}

			secondTier === null
				? applySaving(product.price * product.quantity, index, productPrice, product.quantity)
				: applySaving((secondTier * product.quantity), index, productPrice, product.quantity);

			secondTier === null
				? productSaving = (product.price * product.quantity) - productPrice
				: productSaving = (secondTier * product.quantity) - productPrice

			saving += productSaving;
		});

		orderRows.forEach((element)=>{
			if(element.innerText.toLocaleLowerCase().indexOf('discount') > -1){
				element.style.display = 'none';
			}

			if(element.innerText.toLocaleLowerCase().indexOf('subtotal') > -1){
				element.style.display = 'none';
			}
		})

		return saving.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	const init = () => {
		if(document.querySelector(`.${tag}-savings`)) return;
		
		document.body.classList.add(tag);

		const trs = document.querySelectorAll('tr');

		trs.forEach(tr => {
			if (tr.textContent.includes('Order Total') && getSaving() !== '0.00') {
				tr.insertAdjacentHTML('beforebegin', `
                    <tr class='${tag}-savings'>
                        <td><strong>Saving</strong></td>
                        <td><strong class="red-text">£${getSaving()}</strong></td>
                    </tr>
                `);
			}
		});

		document.querySelector('.mobile-summary > div:nth-child(2)') &&
			document.querySelector('.mobile-summary > div:nth-child(2)').insertAdjacentHTML('afterend', `<p class='${tag}-savings'>Saving £${getSaving()}</p>`)
	};

	utils.waitUntil(() => document.querySelector('.price-qty-info .red-text') && document.querySelector('.order-summary-total'), 0).then(() => init());

})(window);