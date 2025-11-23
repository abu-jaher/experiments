try {
	const regex = new RegExp(
		"^(" +
		[
			"/product/black-nike-pegasus-premium/19701415/",
			"/product/black-nike-pegasus-premium/19703426/",
			"/product/grey-nike-pegasus-premium/19699881/",
			"/product/black-nike-pegasus-premium/19717234/",
			"/product/grey-nike-pegasus-premium/19717234/",
			"/product/grey-nike-pegasus-premium-womens/19709030/",
			"/product/black-nike-pegasus-premium-womens/19706711/",
			"/product/grey-nike-pegasus-premium-womens/19706075/",
			"/product/pink-nike-pegasus-premium-womens/19709381/",
			"/product/pink-nike-pegasus-premium-womens/19699694/",
			"/product/nike-pegasus-premium-womens/19699694/",
			"/product/nike-womens-road-running-shoes-pegasus-premium/19699694/",
			"/product/white-nike-pegasus-premium-womens/19697808/",
			"/product/black-nike-pegasus-41/19648064/",
			"/product/white-nike-pegasus-41/19650942/",
			"/product/grey-nike-pegasus-41/19676689/",
			"/product/black-nike-pegasus-41/19646297/",
			"/product/nike-pegasus-41-womens/19703397/",
			"/product/nike-pegasus-41-womens/19699397/",
			"/product/nike-pegasus-41-womens/19699878/",
			"/product/blue-nike-pegasus-41-womens/19688459/",
			"/product/green-nike-vomero-plus/19717576/",
			"/product/black-nike-vomero-plus/19703458/",
			"/product/black-nike-vomero-plus/19698307/",
			"/product/black-nike-vomero-plus/19711951/",
			"/product/grey-nike-vomero-plus/19709374/",
			"/product/off-white-nike-vomero-plus-womens/19718463/",
			"/product/pink-nike-vomero-plus-womens/19698304/",
			"/product/white-nike-vomero-plus-womens/19698300/",
			"/product/white-nike-vomero-plus-womens/19717578/",
			"/product/white-nike-vomero-plus-womens/19718463/",
			"/product/pink-nike-vomero-plus-womens/19717578/",
			"/product/black-nike-vomero-plus-womens/19709379/",
			"/product/blue-nike-vomero-18/19706788/",
			"/product/black-nike-vomero-18-gore-tex/19717572/",
			"/product/green-nike-vomero-18/19717574/",
			"/product/black-nike-vomero-18/19711880/",
			"/product/black-nike-vomero-18/19700470/",
			"/product/pink-nike-vomero-18-womens/19720220/",
			"/product/red-nike-vomero-18-womens/19720220/",
			"/product/grey-nike-vomero-18-womens/19715451/",
			"/product/black-nike-vomero-18-womens/19701364/",
			"/product/pink-nike-vomero-18-womens/19709380/",
			"/product/black-nike-shox-tl/19716267/",
			"/product/nike-shox-tl/19706761/",
			"/product/red-nike-shox-tl/19701457/",
			"/product/white-nike-shox-tl/1310872/",
			"/product/black-nike-shox-tl/1310873/",
			"/product/black-nike-shox-tl/19703389/",
			"/product/black-nike-shox-tl/19666020/",
			"/product/black-nike-shox-tl/15968892/",
			"/product/grey-nike-shox-tl/19701589/",
			"/product/black-nike-shox-tl/19683665/",
			"/product/nike-shox-tl/19686821/",
			"/product/black-nike-shox-tl/19689796/",
			"/product/grey-nike-shox-tl/19694763/",
			"/product/white-nike-shox-tl-womens/1310874/",
			"/product/black-nike-shox-tl-womens/1310875/",
			"/product/black-nike-shox-tl-womens/19706805/",
			"/product/nike-shox-tl-fade/19715272/",
			"/product/white-nike-shox-tl-womens/19705787/",
			"/product/grey-nike-shox-tl-womens/19693708/",
			"/product/brown-nike-shox-tl-womens/19688267/",
			"/product/pink-nike-metcon-10-womens/19717797/",
			"/product/red-nike-metcon-10-womens/19712234/",
			"/product/white-nike-metcon-10-womens/19712233/",
			"/product/black-nike-metcon-10-womens/19712232/",
		]
			.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
			.join("|") +
		")$",
		"i"
	);

	const currentPath = window.location.pathname;
	const isMatch = regex.test(currentPath);

	if (dataObject && dataObject.pageType === "product" && dataObject.brand && dataObject.brand.toLowerCase() === "nike" && dataObject.unitPrice && dataObject.unitPrice.length > 0 && dataObject.currency && dataObject.currency.length > 0 && dataObject.currency === 'GBP' && isMatch) {
		return true;
	} else {
		return false;
	}
} catch (e) {
	return false;
}