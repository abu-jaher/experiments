((w) => {
	"use strict";

	const tag = "cv-2-0";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["cv-pjs"].utils;

	window[tag] = window[tag] || {
		initTracking: () => {
			const hasBeenSegmented = !!Kameleoon.API.Visitor.customData["[CONV] [2.0] Used Size Guide Segment"];

			if (!hasBeenSegmented) utils.segmentUser("[CONV] [2.0] Used Size Guide Segment", "false", tag);
		},

		activation: (dlItem) => {
			const itemData = dlItem?.ecommerce?.items?.[0];

			const prodName = document.querySelector("h1.product-name");

			const isPDP = dlItem?.event === "view_item" && prodName?.textContent === itemData?.item_name;
			const isTargetBrand = !!isPDP && ["Nike", "Jordan",].includes(itemData?.item_brand);

			const isTargetCategory = ["Base > Apparel > Top", "Base > Apparel > Bottom", "Base > Apparel > Jacket"].includes(itemData?.item_category);

			const isTargetGender = ["men", "women"].includes(itemData?.item_gender);

			if (!!isPDP) {
				if (!!isTargetBrand && !!isTargetCategory && !!isTargetGender) {
					const category = {
						"Base > Apparel > Top": "top",
						"Base > Apparel > Bottom": "bottom",
						"Base > Apparel > Jacket": "top",
					}[itemData?.item_category];

					window[tag].productData = {
						gender: itemData.item_gender.toLowerCase().trim(),
						category: category,
					};

					return true;
				}

				if (document.body.classList.contains(`${tag}`)) window[tag].deactivate();
			}
		},

		deactivate: () => {
			[`.${tag}__size-chart-link`, `.${tag}__size-chart-modal`].forEach((sel) => {
				const element = document.querySelector(sel);

				!!element && element.remove();
			});

			[`${tag}`, `${tag}__mens-top`, `${tag}__mens-bottom`, `${tag}__womens-top`, `${tag}__womens-bottom`].forEach((sel) => {
				const element = document.querySelector(`.${sel}`);

				!!element && element.classList.remove(sel);
			});

			document.body.classList.remove(tag);

			window[tag].productData = null;

			utils.log("deactivated", tag);
		},
	};
})(window);