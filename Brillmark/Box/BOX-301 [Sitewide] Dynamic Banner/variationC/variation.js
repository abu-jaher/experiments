(() => {
    try {
        const shared = {
            ID: "FE",
            VARIATION: "301",
            CLIENT: "Funnelenvy"
        };

        const ID = shared.ID;
        const VARIATION = shared.VARIATION;

        const setup = () => {
            document.body.classList.add(ID + "-" + VARIATION);
        };

        let arrowIconClicked = false;

        const arrowSvgRight = '' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">' +
            '    <circle cx="11.6" cy="11.6" r="11.6" transform="matrix(-1 0 0 1 23.4 0)" fill="white" fill-opacity="0.2"/>' +
            '    <path d="M10.6051 16.6656L15.3231 12.0006L10.6051 7.33438" stroke="white" stroke-width="1.58988" stroke-linecap="round" stroke-linejoin="round"/>' +
            '</svg>';

        const sliderContent = '' +
            '<div class="FE__slider-banner">' +
            '    <div class="FE__slider-background">' +
            '        <li class="FE__slider-background-0"></li>' +
            '        <li class="FE__slider-background-1"></li>' +
            '        <li class="FE__slider-background-2"></li>' +
            '    </div>' +
            '    <div class="FE__slider-content">' +
            '        <li class="FE__slider-list active">' +
            '            <span class="FE__slider-pill">Event</span>' +
            '            <p>BoxWorks is back! See new AI-powered innovations in person or virtually on Nov. 12. <a href="https://boxworks.box.com/boxworks" target="_blank">Register now</a></p>' +
            '        </li>' +
            '        <li class="FE__slider-list">' +
            '            <span class="FE__slider-pill">TEI study</span>' +
            '            <p>Incremental profit gains with Box: Learn more in the Forrester Total Economic Impact™ study. <a href="/resources/forrester-tei-of-box-study" target="_blank">Read now</a></p>' +
            '        </li>' +
            '        <li class="FE__slider-list">' +
            '            <span class="FE__slider-pill">Product</span>' +
            '            <p>Box Hubs is here! Curate, organize, and publish content faster with secure, intelligent portals. <a href="/hubs" target="_blank">Learn more</a></p>' +
            '        </li>' +
            '    </div>' +
            '    <button class="FE__left-arrow FE__arrow">' + arrowSvgRight + '</button>' +
            '    <button class="FE__right-arrow FE__arrow">' + arrowSvgRight + '</button>' +
            '    <button class="info-notice-close js-info-notice-close icon-close"></button>' +
            '</div>';

        const activate = () => {
            setup();
            document.querySelector('.info-notice').insertAdjacentHTML('beforeend', sliderContent);


            let currentIndex = 0;
            const sliderContainer = document.querySelector(`.FE__slider-content`);
            const slides = sliderContainer.querySelectorAll(`.FE__slider-list`);
            const totalSlides = slides.length;
            document.querySelector('.info-notice').classList.add('FE__background-' + currentIndex);

            function rotateSlider() {
                slides[currentIndex].classList.remove('active');
                slides[currentIndex].classList.remove('mouseout');
                document.querySelector('.FE__background-' + currentIndex).classList.remove('mouseout');
                document.querySelector('.info-notice').classList.remove('FE__background-' + currentIndex);
                currentIndex = (currentIndex + 1) % totalSlides;
                slides[currentIndex].classList.add('active');
                document.querySelector('.info-notice').classList.add('FE__background-' + currentIndex);
            }

            let sliderInterval = setInterval(rotateSlider, 4300);

            sliderContainer.addEventListener('mouseover', () => {
                if(arrowIconClicked == false){
                    clearInterval(sliderInterval);
                    slides[currentIndex].classList.remove('mouseout');
                    document.querySelector('.FE__background-' + currentIndex).classList.remove('mouseout');
                    slides[currentIndex].classList.add('hover');
                    document.querySelector('.FE__background-' + currentIndex).classList.add('hover');
                }
            });

            sliderContainer.addEventListener('mouseout', () => {
                if(arrowIconClicked == false){
                    slides[currentIndex].classList.remove('hover');
                    document.querySelector('.FE__background-' + currentIndex).classList.remove('hover');
                    slides[currentIndex].classList.add('mouseout');
                    document.querySelector('.FE__background-' + currentIndex).classList.add('mouseout');
                    slides[currentIndex].classList.remove('active');
                    sliderInterval = setInterval(rotateSlider, 4300);
                }
            });

            adjustPadding();

            window.addEventListener('resize',()=>{
                adjustPadding();
            })

            window.addEventListener('scroll',()=>{
                if(arrowIconClicked == true){
                    slides[currentIndex].style.animationPlayState = 'running';
                    document.querySelector('.info-notice').style.animationPlayState = 'running';
                    rotateSlider();
                    sliderInterval = setInterval(rotateSlider, 4300);
                    arrowIconClicked = false
                }
            })

            let arrowDisable = false;

            document.addEventListener('click', (e) => {
                const elem = e.target;
                if (elem.closest(`.FE__right-arrow`)) {
                    if(arrowDisable == true) return;
                    arrowDisable = true;
                    slides[currentIndex].style.animationPlayState = 'running';
                    document.querySelector('.info-notice').style.animationPlayState = 'running';
                    clearInterval(sliderInterval);
                    rotateSlider();
                    // sliderInterval = setInterval(rotateSlider, 4300);

                    arrowIconClicked = true;
                    setTimeout(()=>{
                        slides[currentIndex].style.animationPlayState = 'paused';
                        document.querySelector('.info-notice').style.animationPlayState = 'paused';
                        arrowDisable = false;
                    },750)
                }
                if (elem.closest(`.FE__left-arrow`)) {
                    if(arrowDisable == true) return;
                    arrowDisable = true;
                    clearInterval(sliderInterval);
                    slides[currentIndex].style.animationPlayState = 'running';
                    document.querySelector('.info-notice').style.animationPlayState = 'running';
                    slides[currentIndex].classList.remove('active');
                    slides[currentIndex].classList.remove('mouseout');
                    document.querySelector('.FE__background-' + currentIndex).classList.remove('mouseout');
                    document.querySelector('.info-notice').classList.remove('FE__background-' + currentIndex);
                    if (currentIndex == 0) {
                        currentIndex = 2;
                    } else {
                        currentIndex = (currentIndex - 1) % totalSlides;
                    }
                    slides[currentIndex].classList.add('active');
                    document.querySelector('.info-notice').classList.add('FE__background-' + currentIndex);

                    // sliderInterval = setInterval(rotateSlider, 4300);
                    arrowIconClicked = true
                    setTimeout(()=>{
                        slides[currentIndex].style.animationPlayState = 'paused';
                        document.querySelector('.info-notice').style.animationPlayState = 'paused';
                        arrowDisable = false;
                    },750)
                }
                if (elem.closest(`.FE__slider-banner .info-notice-close`)) {
                    document.querySelector('.info-notice-content .info-notice-close').click();
                }
            })

        };

        const adjustPadding = ()=>{
            const sliderHeight = document.querySelector('.FE__slider-banner').getBoundingClientRect().height;
            document.body.style.paddingTop = sliderHeight+'px';
            document.querySelector('#site-header').style.top = sliderHeight+'px';
        }

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

        pollerLite(['.info-notice-content'], activate);

    } catch (e) {
        console.log(e, 'Error in Box-301 v1')
    }
})();