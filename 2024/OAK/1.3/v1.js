((w) => {
	const tag = 'cv-1-3';
	const exp = 'OAK 1.3 | V1';
	const window = typeof unsafeWindow !== 'undefined' ? unsafeWindow : w;
	const qa = document.cookie.indexOf('cfQA') > -1;
	const mobile = window.innerWidth < 640;
	const utils = window['conv'].utils;
	const log = qa ? Function.prototype.bind.call(console.log, console, `[CONV] ${exp} |`) : () => {};

	log('Running');

	const getSaving = () => {
        let saving = 0;

		let products = dataLayer[0].ecommerce.checkout.products;
		const orderRows = document.querySelectorAll('.order-summary-total tr');

		products.forEach((product, index) => {
			if(product.name == "Premium Delivery"){
				products = products.splice(index, 1);
			}
			if(product.category == "delivery" || product.category == "warranty" || product.price === 0) return;
			let productSaving = 0;
			
            const firstTier = product.tierPrices.firstTier;
            const secondTier = product.tierPrices.thirdTier || product.tierPrices.secondTier || null;

			secondTier === null
				? productSaving = (product.price * product.quantity) - parseFloat(document.querySelectorAll('.price-qty-info .red-text')[index].textContent.replace('£', '').replace(/,/g, ''))
				: productSaving = (secondTier * product.quantity) - parseFloat(document.querySelectorAll('.price-qty-info .red-text')[index].textContent.replace('£', '').replace(/,/g, ''))

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