(() => {
    try {
        document.addEventListener("click", (event) => {
            if (event.target.closest('a.request-demo.right') || event.target.closest('.navigation-item') || event.target.closest('#block-rightmenu-2 .menu-item') || event.target.closest('#block-rightmenu .menu-item')) {
                dataLayer.push({
                    event: 'Navigation_CTA_clicks',
                });
            }
            
            if (event.target.matches(".mktoForm .mktoField")) {
                dataLayer.push({
                    event: 'form_engagement',
                });
            }
        });
    } catch (e) {
        console.log(e, "error in - BT-1: [Paid LP] Clear copy and better visual hierarchy v0");
    }
})();