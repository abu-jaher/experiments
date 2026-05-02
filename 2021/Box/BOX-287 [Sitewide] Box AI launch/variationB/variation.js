(()=> {
    try {
        const waitForElement = (selector, trigger) => {
            const interval = setInterval(() => {
                if (
                    document &&
                    document.querySelector(selector) &&
                    document.querySelectorAll(selector).length > 0
                ) {
                    clearInterval(interval);
                    trigger();
                }
            }, 50);
            setTimeout(() => {
                clearInterval(interval);
            }, 15000);
        }
        // wait for the slick
        const waitForGlide = (trigger)=> {
            const interval = setInterval(()=> {
                if (window.Glide) {
                    clearInterval(interval);
                    trigger();
                }
            }, 500);
            setTimeout(()=> {
                clearInterval(interval);
            }, 15000);
        }


        const removeClass = (el, className)=> {
            el = document.querySelector(el);
            if (el) {
                el.classList.remove(className);
            }
        }

        /* Variation functions */
        const awsURL = `https://fe-test-dev.s3.amazonaws.com/box/Box-287/`;
        const arrowSvg = 
        `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none"> 
        <rect width="42" height="42" rx="21" fill="#A9A9A9"/> 
        <path fill-rule="evenodd" clip-rule="evenodd" d="M23.8569 16.1096L16.9528 20.4247L23.8569 16.1096Z" fill="white"/> 
        <path d="M23.8569 16.1096L16.9528 20.4247" stroke="white" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/> 
        <path d="M23.8569 25.6027L16.9528 20.4246" stroke="white" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/> 
        <rect width="42" height="42" rx="21" transform="matrix(-1 0 0 1 42 0)" fill="#2486FC"/> 
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.1431 16.1096L25.0472 20.4247L18.1431 16.1096Z" fill="white"/> 
        <path d="M18.1431 16.1096L25.0472 20.4247" stroke="white" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/> 
        <path d="M18.1431 25.6027L25.0472 20.4246" stroke="white" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/> 
        </svg>`;

        const slides =
        `                <li class="glide__slide fe_slider_content fe_ai lazyloaded">
                           <div class="fe_slider_content_wrapper">
                             <div class="fe_left">
                                   <div class="fe_slider_tag"><span>COMING SOON</span></div>
                                   <div class="fe_slider_title">
                                         <h3>Get more done with Box AI</h3>
                                     </div>
                                   <div class="fe_slider_subtitle">
                                         <p>Ask anything and get instant answers, or create content in seconds, with Box AI for Notes and Box AI for Documents.</p>
                                     </div>
                                   <div class="fe_slider_btn">
                                       <a href="https://www.box.com/ai">Learn more</a>
                                     </div>
                               </div>
                             <div class="fe_right">
                                    <img src="https://cdn03.boxcdn.net/sites/default/files/styles/1764xauto/public/2024-02/box-ai-carousel-1_1_0.png?itok=xmMqEeiC">
                               </div>
                             </div>
                          </li>
                          <li class="glide__slide fe_slider_content lazyloaded">
                             <div class="fe_slider_content_wrapper">
                               <div class="fe_left">
                                     <div class="fe_slider_tag"><span>COMING SOON</span></div>
                                     <div class="fe_slider_title">
                                         <h3>Box Hubs</h3>
                                     </div>
                                     <div class="fe_slider_subtitle">
                                         <p>Make enterprise content publishing easier than ever with intelligent portals powered by <a href='https://www.box.com/AI'>Box AI</a>.</p>
                                     </div>
                                     <div class="fe_slider_btn">
                                         <a href="https://www.box.com/hubs">Learn more</a>
                                     </div>
                               </div>
                               <div class="fe_right fe_hub_img">
                                      <img src="https://fe-test-dev.s3.amazonaws.com/box/275.1/Slider_Hubs.png">
                               </div>
                             </div>
                          </li>
                        <li class="glide__slide fe_slider_content lazyloaded">
                           <div class="fe_slider_content_wrapper">
                             <div class="fe_left">
                                   <div class="fe_slider_tag"><span>NEW</span></div>
                                   <div class="fe_slider_title">
                                         <h3>Do you have a strategy for <br>unstructured data?</h3>
                                     </div>
                                   <div class="fe_slider_subtitle">
                                         <p>This Box-sponsored IDC white paper features exclusive research around unstructured data, AI, and security.</p>
                                     </div>
                                   <div class="fe_slider_btn">
                                       <a href="https://www.box.com/resources/unstructured-data-paper">Get the white paper</a>
                                     </div>
                               </div>
                             <div class="fe_right">
                                    <img src="https://fe-test-dev.s3.amazonaws.com/box/275.1/Slider_IDC.png">
                               </div>
                             </div>
                          </li>`;


        const fe_slider =
        "" +
        '<div class="fe_glide_section">' +
        '  <div class="fe_carousel_wrapper fe_glide">' +
        '      <div class="glide__track" data-glide-el="track">' +
        '          <ul class="glide__slides ">' +
        slides +
        "          </ul>" +
        "      </div>" +
        '      <div class="glide__arrows" data-glide-el="controls">' +
        '          <button class="glide__arrow glide__arrow--left" data-glide-dir="<">' +
        arrowSvg +
        "</button>" +
        '          <button class="glide__arrow glide__arrow--right" data-glide-dir=">">' +
        arrowSvg +
        "</button>" +
        "      </div>" +
        '      <div class="glide__bullets" data-glide-el="controls[nav]">' +
        '          <button class="glide__bullet" data-glide-dir="=0"></button>' +
        '          <button class="glide__bullet" data-glide-dir="=1"></button>' +
        '          <button class="glide__bullet" data-glide-dir="=2"></button>' +
        "      </div>" +
        "  </div>" +
        "</div>";


        const insertSlider = ()=>{
            const inserSlider = document.querySelector(".hero--half-n-half__vertical-bottom");
            inserSlider && inserSlider.insertAdjacentHTML("afterend", fe_slider);
        }   


        const triggerGlide = ()=>{
            let glide = new Glide(".fe_glide", {
                type: "carousel",
                focusAt: "center",
                animationDuration: 1000,
                startAt: 0,
                perView: 1,
                autoplay: 4000,
            });
            glide.mount();

            glide.on("run", ()=> {
                const index = glide.index;
                setTimeout(()=> {
                    removeClass(".fe_glide_section .fe_glide .glide__bullet.glide__bullet--active", "glide__bullet--active");
                    const bullet = document.querySelector('.fe_glide_section .fe_glide .glide__bullet[data-glide-dir*="' + index + '"]');
                    if (bullet) {
                        bullet.classList.add("glide__bullet--active");
                    }
                }, 200);
            });

            let autoplayEnabled = true;

            const stopAutoplayTemporarily = ()=> {
                if (autoplayEnabled) {
                    glide.pause();
                    glide.update({ autoplay: 0 });
                    autoplayEnabled = false;
                }
            }

            // Attach click event listeners to arrows and dots
            const arrows = document.querySelectorAll('.fe_glide .glide__arrow');
            const dots = document.querySelectorAll('.fe_glide .glide__bullet');
            const card = document.querySelectorAll('.fe_glide .fe_slider_content_wrapper');

            arrows.forEach((element)=> {
                element.addEventListener('click', stopAutoplayTemporarily);
            });

            card.forEach((element)=> {
                element.addEventListener('click', stopAutoplayTemporarily);
            });

            dots.forEach((element)=> {
                element.addEventListener('click',()=> {
                    stopAutoplayTemporarily();
                });
            });
        }

        /* Variation Init */
        const init = ()=> {
            document.body.classList.add('box_287');
            //insert slider
            insertSlider();

            waitForGlide(()=> {
                triggerGlide();
            });
        }

        /* Initialize variation */
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
        const targetURLs = ['/','/home', '/en-gb/home'];
        if (isDesktop && targetURLs.includes(location.pathname)) {
            waitForElement(".slideshow.glide", init);
        }

    } catch (e) {
        console.log(e, "Error in Box-287 v1");
    }
})();