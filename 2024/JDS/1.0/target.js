try{
	if(dataObject && dataObject.pageType === "product" && dataObject.category.includes(`footwear`) && dataObject.brand && dataObject.unitPrice && dataObject.unitPrice.length > 0 && dataObject.currency && dataObject.currency.length > 0 && dataObject.currency === 'GBP' && parseFloat(dataObject.unitPrice) >= 150){
		return true;
	} else {
		return false;
	}
} catch(e){
	return false;
}