(() => {
    const waitforMarketo = (trigger) => {
        const interval = setInterval(() => {
            if (window.MktoForms2) {
                clearInterval(interval);
                trigger();
            }
        }, 50);
        setTimeout(() => {
            clearInterval(interval);
        }, 15000);
    }

    let formEngagement = false;

    const init = () => {
        // UA event tracker
        let dimension = 175;
        let tracker = '';
        if (window.ga && window.ga.getAll) {
            if (tracker == '' || tracker == ' ') {
                tracker = window.ga.getAll()[0].get('name');
            }

            window.ga(
                tracker + '.set',
                'dimension' + dimension,
                'DICE-125-v0',
            );

            window.ga(
                tracker + '.send',
                'event',
                'FunnelEnvy',
                'DICE-125-v0',
                {
                    Interaction: 1,
                },
            );

        }

        document.addEventListener('click', (e) => {
            // form engagement event
            if (e.target.matches('form .mktoFieldWrap input') && formEngagement == false) {
                trackGAEvent('funnelenvy', 'click', 'form_engagement_LP')
                formEngagement = true;
            }
        })
    }

    const trackGAEvent = (eventCategory, eventAction, eventLabel) => {
        if ('ga' in window) {
            ga.getAll()[0].send('event', {
                eventCategory: eventCategory,
                eventAction: eventAction,
                eventLabel: eventLabel,
            });
        }
    }

    waitforMarketo(() => {
        MktoForms2.whenReady(() => {
            init();
        });
    });

})();