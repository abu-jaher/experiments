(() => {
    try {
        const shared = {
            ID: "FE",
            VARIATION: "138",
            CLIENT: "Funnelenvy"
        };

        const ID = shared.ID;
        const VARIATION = shared.VARIATION;

        const YT_frame =
        `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/3n5-K3d2tkk?si=Qs-VMWCsEkqayKVO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;

        const setup = () => {
            document.body.classList.add(ID + "-" + VARIATION);
            document.querySelector('.seds.card-grid .card-grid').innerHTML = YT_frame;
            document.querySelector('.seds.card-grid .section-subhead span').innerHTML = `Learn how Dice attracts highly qualified tech professionals, matching you with the best candidates for your job openings.`;
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

        pollerLite(['.seds.card-grid .card-grid'], setup);

    } catch (error) {
        console.log(`${error} Dice-138`);
    }
})();