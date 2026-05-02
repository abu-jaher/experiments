((w) => {
	"use strict";

	const tag = "cv-3-2";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["cv-pjs"];

	if (window[tag].variation) return;

	window[tag].initVariation = () => {
		utils.waitUntil('.purchase-plan-radios__label[for="subscription"] .purchase-plan-radios__dropdown', (subscriptionElem) => {
			const getCopy = cancCopy();
			subscriptionElem.insertAdjacentHTML('afterend', getCopy);
		}, tag);

		[`.plan-types .plan-types__label`].forEach((el) => {
			utils.on("click", el, () => {
				handlePlanChange();
			});
		})

		addStyles();
	};

	const handlePlanChange = () => {
		let subscriptionElem, cancellationCopy;

		utils.apply(
			() => {
				subscriptionElem = document.querySelector('.purchase-plan-radios__label[for="subscription"] .purchase-plan-radios__dropdown');
				cancellationCopy = document.querySelector(`.${tag}__canc_copy`);

				if (subscriptionElem && !cancellationCopy) return false;

				return true;
			},
			() => {
				if (!cancellationCopy) {
					const getCopy = cancCopy();
					subscriptionElem.insertAdjacentHTML('afterend', getCopy);
				}
			},
			tag,
			2000
		);
	}

	const cancCopy = () => {
		const elCont = `
			<div class="${tag}__canc_copy">
				<p>We're sure you'll love Wild, <strong>but you're free to cancel anytime.</strong></p>
			</div>
		`;
		return elCont;
	};

	const addStyles = () => {
		utils.addStyles(
			tag,
			`
				.${tag} .${tag}__canc_copy {
					padding: 12px 24px 0;
					border-top: 1px solid rgb(35 35 35 / .1);
					margin: 10px -16px 0;
				}

				.${tag} .${tag}__canc_copy p {
					color: #1D7F75;
					font-size: 14px;
					font-weight: 400;
					line-height: 22px;
					text-align: center;
				}

				.${tag} .purchase-plan-radios__label[for="subscription"]:hover .${tag}__canc_copy {
					border-top: 1px solid rgb(35 35 35 / .5);
				}

				.${tag} .purchase-plan-radios__input#subscription:checked+[for="subscription"] .${tag}__canc_copy {
					border-top: 2px solid #1D7F75;
				}

				.${tag} .${tag}__canc_copy strong {
					display: block;
				}

				@media only screen and (min-width: 500px){
					.${tag} .${tag}__canc_copy p{
						font-size: 16px;
						font-weight: 450;
					}
			}
			`
		);
	};

	window[tag].variation = "variation-1";
	window[tag].init();
})(window);