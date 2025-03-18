(() => {

    document.querySelector('.mktoForm').addEventListener('click', (e) => {
        if (e.target.matches(".mktoForm #diceSelfreportedattribution")) {
            trackGAEvent('funnelenvy', 'click', 'Click on How did you hear about us')
        }
    })

    const trackGAEvent = (eventCategory, eventAction, eventLabel) => {
        if ('ga' in window) {
            ga.getAll()[0].send('event', {
                eventCategory: eventCategory,
                eventAction: eventAction,
                eventLabel: eventLabel,
            });
        }
    }

})();