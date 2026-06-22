(() => {
    try {
        const shared = {
            ID: "FE",
            VARIATION: "139",
            CLIENT: "Funnelenvy"
        };

        const ID = shared.ID;
        const VARIATION = shared.VARIATION;

        const stats =
            `<div class="stats-container">
                <h2>Need a competitive edge? Meet Dice's candidates</h2>
                <div class="stats">
                    <div class="stat-item">
                        <p class="stat-number">6.8M</p>
                        <p class="stat-text">total members</p>
                    </div>
                    <div class="stat-item">
                        <p class="stat-number">60K</p>
                        <p class="stat-text">new tech professionals join Dice per month</p>
                    </div>
                    <div class="stat-item">
                        <p class="stat-number">1.6M</p>
                        <p class="stat-text">visits per month</p>
                    </div>
                </div>
            </div>`;

        const setup = () => {
            document.body.classList.add(ID + "-" + VARIATION);
            document.querySelector('.leftSideStats').insertAdjacentHTML('afterend', stats);
        };

        const pollerLite = (conditions, callback, maxTime) => {
            if (maxTime === void 0) { maxTime = 20000; }
            const POLLING_INTERVAL = 500;
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
                }
                else if (Date.now() - startTime >= maxTime) {
                    clearInterval(interval);
                    console.log('Polling exceeded maximum time limit');
                }
            }, POLLING_INTERVAL);
        };

        pollerLite(['.leftSideStats'], setup);

    } catch (error) {
        console.log(`${error} Dice-139`);
    }
})();