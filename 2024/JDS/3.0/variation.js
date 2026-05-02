((w) => {
    "use strict";

    const tag = 'cv-3-0';
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] JDS 3.0 |') : () => { };

    const utils = {
        waitUntil: (condition, wait = 6000) => {
            return new Promise((resolve, reject) => {
                let stop = false;

                const timeout =
                    wait &&
                    setTimeout(() => {
                        stop = true;
                        reject(new Error('Timeout waiting for condition'));
                    }, wait);

                const check = () => {
                    if (stop) return;
                    if (!condition()) return requestAnimationFrame(check);

                    clearTimeout(timeout);
                    resolve(condition());
                };

                requestAnimationFrame(check);
            });
        },

        log: function (msg, expTag, arg1, arg2, arg3) {
            // Default parameter values
            expTag = expTag || tag;

            // Always use the tag parameter as a string
            const tagStr = typeof expTag === 'string' ? expTag : tag;

            // Check if we have additional arguments
            if (arguments.length > 2) {
                // We have additional args to log
                const consoleArgs = ['[CONV] ' + tagStr + ' -->', msg];

                // Add any additional arguments passed
                for (let i = 2; i < arguments.length; i++) {
                    consoleArgs.push(arguments[i]);
                }

                console.log.apply(console, consoleArgs);
            } else {
                // Simple log with no additional args
                console.log('[CONV] ' + tagStr + ' -->', msg);
            }
        },
        sendEvt: (name, apiKey, expTag = tag, tags) => {
            window.monetateQ = window.monetateQ || [];
            window.monetateQ.push([
                "trackEvent",
                [apiKey]
            ]);

            utils.log("metric event: \n-- name = \"" + name + "\" " + (!!tags ? "\n\n-- tags = " + JSON.stringify(tags, 0, 2) : ""), expTag);
        },

        init: () => {
            try {
                utils.waitUntil(() => document.body, 0).then((docBody) => {
                    docBody.classList.add(tag);
                });

                initVariation();

                log('running v1');
            } catch (err) {
                log(err.message);
            }
        },
    };

    const carouselData = {
        groups: [
            {
                name: "pdp1",
                type: "running",
                paths: [
                    "/product/black-nike-pegasus-premium/19701415/",
                    "/product/black-nike-pegasus-premium/19703426/",
                    "/product/grey-nike-pegasus-premium/19699881/",
                    "/product/black-nike-pegasus-premium/19717234/",
                    "/product/grey-nike-pegasus-premium/19717234/",
                ],
                carousel: [
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/NIKE%2BPEGASUS%2BPREMIUM%201png.png",
                        title: "Engineered Mesh on Upper",
                        subtext: "Breathable, lightweight engineered mesh helps keep you contained."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/NIKE%2BPEGASUS%2BPREMIUM%202.png",
                        title: "ReactX Foam Foundation",
                        subtext: "ReactX foam, 13% more responsive than previous React technology, sits at the bottom of the ZoomX foam and Air Zoom cushioning. It offers a smooth and balanced ride."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/NIKE%2BPEGASUS%2BPREMIUM%203.png",
                        title: "Full-Length Air Zoom Cushioning",
                        subtext: "The full-length Air Zoom unit offers our optimal level of springiness underfoot, unlocking a level of speed and responsiveness that’ll put pep in your miles."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/NIKE%2BPEGASUS%2BPREMIUM%204.png",
                        title: "Modified Waffle Outsole",
                        subtext: "Modified waffle outsole has high-abrasion rubber to provide traction."
                    }
                ]
            },
            {
                name: "pdp2",
                type: "running",
                paths: [
                    "/product/grey-nike-pegasus-premium-womens/19709030/",
                    "/product/black-nike-pegasus-premium-womens/19706711/",
                    "/product/grey-nike-pegasus-premium-womens/19706075/",
                    "/product/pink-nike-pegasus-premium-womens/19709381/",
                    "/product/pink-nike-pegasus-premium-womens/19699694/",
                    "/product/nike-pegasus-premium-womens/19699694/",
                    "/product/nike-womens-road-running-shoes-pegasus-premium/19699694/",
                    "/product/white-nike-pegasus-premium-womens/19697808/",
                ],
                carousel: [
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/1.%20AURORA_HQ2593-102_PHSYD001-2000.png",
                        title: "Engineered Mesh on Upper",
                        subtext: "Breathable, lightweight engineered mesh helps keep you contained."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/2.%20AURORA_HQ2593-102_PHSYD002-2000.png",
                        title: "ReactX Foam Foundation",
                        subtext: "ReactX foam, 13% more responsive than previous React technology, sits at the bottom of the ZoomX foam and Air Zoom cushioning. It offers a smooth and balanced ride."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/3.%20AURORA_HQ2593-102_PHSLH000-2000.png",
                        title: "Full-Length Air Zoom Cushioning",
                        subtext: "The full-length Air Zoom unit offers our optimal level of springiness underfoot, unlocking a level of speed and responsiveness that’ll put pep in your miles."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/4.%20AURORA_HQ2593-102_PHSUH000-2000.png",
                        title: "Modified Waffle Outsole",
                        subtext: "Modified waffle outsole has high-abrasion rubber to provide traction."
                    }
                ]
            },
            {
                name: "pdp3",
                type: "running",
                paths: [
                    "/product/black-nike-pegasus-41/19648064/",
                    "/product/white-nike-pegasus-41/19650942/",
                    "/product/grey-nike-pegasus-41/19676689/",
                    "/product/black-nike-pegasus-41/19646297/",
                ],
                carousel: [
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/AIR%2BZOOM%2BPEGASUS%2B41%201.png",
                        title: "Responsive Ride",
                        subtext: "ReactX foam midsole surrounds forefoot and heel Air Zoom units for an energized ride. It's 13% more responsive than previous React technology."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/AIR%2BZOOM%2BPEGASUS%2B41%202.png",
                        title: "ReactX foam midsole",
                        subtext: "Lighter, more breathable engineered mesh upper."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/AIR%2BZOOM%2BPEGASUS%2B41%203.png",
                        title: "Waffle-Inspired Traction",
                        subtext: "Signature waffle-inspired rubber outsole provides traction and flexibility."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/jd_700275_e%204%201.png",
                        title: "Plush Padding",
                        subtext: "Plush collar, tongue and sockliner provide a secure and comfortable fit."
                    }
                ]
            },
            {
                name: "pdp4",
                type: "running",
                paths: [
                    "/product/nike-pegasus-41-womens/19703397/",
                    "/product/nike-pegasus-41-womens/19699397/",
                    "/product/nike-pegasus-41-womens/19699878/",
                    "/product/blue-nike-pegasus-41-womens/19688459/",
                ],
                carousel: [
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/W%2BAIR%2BZOOM%2BPEGASUS%2B41%201.png",
                        title: "Responsive Ride",
                        subtext: "ReactX foam midsole surrounds forefoot and heel Air Zoom units for an energized ride. It's 13% more responsive than previous React technology."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/W%2BAIR%2BZOOM%2BPEGASUS%2B41%202.png",
                        title: "ReactX foam midsole",
                        subtext: "Lighter, more breathable engineered mesh upper."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/W%2BAIR%2BZOOM%2BPEGASUS%2B41%203.png",
                        title: "Waffle-Inspired Traction",
                        subtext: "Signature waffle-inspired rubber outsole provides traction and flexibility."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/jd_762820_e%20NEW%204%201.png",
                        title: "Plush Padding",
                        subtext: "Plush collar, tongue and sockliner provide a secure and comfortable fit."
                    }
                ]
            },
            {
                name: "pdp5",
                type: "running",
                paths: [
                    "/product/green-nike-vomero-plus/19717576/",
                    "/product/black-nike-vomero-plus/19703458/",
                    "/product/black-nike-vomero-plus/19698307/",
                    "/product/black-nike-vomero-plus/19711951/",
                    "/product/grey-nike-vomero-plus/19709374/",
                ],
                carousel: [
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/1.NIKE%2BVOMERO%2BPLUS.png",
                        title: "ZoomX Foam Midsole",
                        subtext: "Ultra-responsive ZoomX foam midsole delivers Nike's highest energy return."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/2.NIKE%2BVOMERO%2BPLUS.png",
                        title: "Soft Upper",
                        subtext: "Engineered mesh upper provides soft breathability."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/3.NIKE%2BVOMERO%2BPLUS.png",
                        title: "Durable Traction",
                        subtext: "High-abrasion rubber outsole offers durable traction."
                    }
                ]
            },
            {
                name: "pdp6",
                type: "running",
                paths: [
                    "/product/off-white-nike-vomero-plus-womens/19718463/",
                    "/product/pink-nike-vomero-plus-womens/19698304/",
                    "/product/white-nike-vomero-plus-womens/19698300/",
                    "/product/white-nike-vomero-plus-womens/19717578/",
                    "/product/white-nike-vomero-plus-womens/19718463/",
                    "/product/pink-nike-vomero-plus-womens/19717578/",
                    "/product/black-nike-vomero-plus-womens/19709379/",
                ],
                carousel: [
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/1.%20W%2BNIKE%2BVOMERO%2BPLUS.png",
                        title: "ZoomX Foam Midsole",
                        subtext: "Ultra-responsive ZoomX foam midsole delivers Nike's highest energy return."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/2.%20W%2BNIKE%2BVOMERO%2BPLUS.png",
                        title: "Soft Upper",
                        subtext: "Engineered mesh upper provides soft breathability."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/3.%20W%2BNIKE%2BVOMERO%2BPLUS.png",
                        title: "Durable Traction",
                        subtext: "High-abrasion rubber outsole offers durable traction."
                    }
                ]
            },
            {
                name: "pdp7",
                type: "running",
                paths: [
                    "/product/blue-nike-vomero-18/19706788/",
                    "/product/black-nike-vomero-18-gore-tex/19717572/",
                    "/product/green-nike-vomero-18/19717574/",
                    "/product/black-nike-vomero-18/19711880/",
                    "/product/black-nike-vomero-18/19700470/",
                ],
                carousel: [
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/1.%20NIKE%2BVOMERO%2B18.png",
                        title: "Engineered Mesh Upper",
                        subtext: "The upper is made of engineered mesh for soft breathability."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/2.%20NIKE%2BVOMERO%2B18.png",
                        title: "Dual-Density Midsole",
                        subtext: "Our dual-density midsole has ZoomX foam stacked on top of ReactX foam, 13% more responsive than previous React technology, for a comfortable ride."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/3.%20NIKE%2BVOMERO%2B18.png",
                        title: "Pods Around Outsole",
                        subtext: "We placed pods around the outsole to help enhance agility and smoother heel-to-toe transitions."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/4.%20jd_763788_e.png",
                        title: "Plush Padding",
                        subtext: "A plush tongue and lining give you a comfortably snug feel."
                    }
                ]
            },
            {
                name: "pdp8",
                type: "running",
                paths: [
                    "/product/pink-nike-vomero-18-womens/19720220/",
                    "/product/red-nike-vomero-18-womens/19720220/",
                    "/product/grey-nike-vomero-18-womens/19715451/",
                    "/product/black-nike-vomero-18-womens/19701364/",
                    "/product/pink-nike-vomero-18-womens/19709380/",
                ],
                carousel: [
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/1.%20W%2BNIKE%2BVOMERO%2B18.png",
                        title: "Engineered Mesh Upper",
                        subtext: "The upper is made of engineered mesh for soft breathability."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/2.%20W%2BNIKE%2BVOMERO%2B18.png",
                        title: "Dual-Density Midsole",
                        subtext: "Our dual-density midsole has ZoomX foam stacked on top of ReactX foam, 13% more responsive than previous React technology, for a comfortable ride."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/3.%20W%2BNIKE%2BVOMERO%2B18.png",
                        title: "Pods Around Outsole",
                        subtext: "We placed pods around the outsole to help enhance agility and smoother heel-to-toe transitions."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/4.%20jd_773218_e.png",
                        title: "Plush Padding",
                        subtext: "A plush tongue and lining give you a comfortably snug feel."
                    }
                ]
            },
            {
                name: "pdp9",
                type: "lifestyle",
                paths: [
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
                ],
                carousel: [
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/pdp10_1.png",
                        title: "Optimal Impact Absorption",
                        subtext: "The Nike Shox TL takes mechanical cushioning to the next level. A recrafted version of the 2003 icon, it features breathable mesh in the upper and full-length Nike Shox technology for optimal impact absorption and a bold look on the streets."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/pdp10_2.png",
                        title: "Nike Shox Technology",
                        subtext: "Nike Shox technology combines resilient, flexible columns with moderator plates for outstanding cushioning that compresses and regains its shape.<br>A combination upper with a full TPU cage is a near-exact replica of the 2003 Nike Shox TL."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/pdp10_3.png",
                        title: "Lateral Stability and Support",
                        subtext: "Molded overlays throughout the midfoot provide support and a snug fit. A TPU plate in the heel between the midsole and Nike Shox technology helps provide lateral stability and support."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/pdp10_4.png",
                        title: "Traction And Durability",
                        subtext: "A foam midsole provides lightweight cushioning. Non-marking, solid rubber in a modified waffle outsole gives great traction and durability."
                    }
                ]
            },
            {
                name: "pdp10",
                type: "lifestyle",
                paths: [
                    "/product/white-nike-shox-tl-womens/1310874/",
                    "/product/black-nike-shox-tl-womens/1310875/",
                    "/product/black-nike-shox-tl-womens/19706805/",
                    "/product/nike-shox-tl-fade/19715272/",
                    "/product/white-nike-shox-tl-womens/19705787/",
                    "/product/grey-nike-shox-tl-womens/19693708/",
                    "/product/brown-nike-shox-tl-womens/19688267/",
                ],
                carousel: [
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/pdp10_1.png",
                        title: "Optimal Impact Absorption",
                        subtext: "The Nike Shox TL takes mechanical cushioning to the next level. A recrafted version of the 2003 icon, it features breathable mesh in the upper and full-length Nike Shox technology for optimal impact absorption and a bold look on the streets."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/pdp10_2.png",
                        title: "Nike Shox Technology",
                        subtext: "Nike Shox technology combines resilient, flexible columns with moderator plates for outstanding cushioning that compresses and regains its shape. Design is a near-exact replica of the 2003 Nike Shox TL."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/pdp10_3.png",
                        title: "Lateral Stability and Support",
                        subtext: "Molded overlays throughout the midfoot provide support and a snug fit. A TPU plate in the heel between the midsole and Nike Shox technology helps provide lateral stability and support."
                    },
                ]
            },
            {
                name: "pdp11",
                type: "gym",
                paths: [
                    "/product/pink-nike-metcon-10-womens/19717797/",
                    "/product/red-nike-metcon-10-womens/19712234/",
                    "/product/white-nike-metcon-10-womens/19712233/",
                    "/product/black-nike-metcon-10-womens/19712232/",
                ],
                carousel: [
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/Image%20One.png",
                        title: "Stable for Your Strength",
                        subtext: "An ultra-strong Hyperlift plate under your heel (where you need it most) optimizes stability for heavy lifts—like squats, dead lifts and cleans—without compromising the ride. A wider toe box compared to the Metcon 9 lets your toes extend outward and helps you optimize your power through your whole foot."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/Image%20Two.png",
                        title: "More Mobility",
                        subtext: "We updated the midsole with lightweight ReactX foam to increase energy return. It combines with flex grooves on the outsole to give you flexible, responsive cushioning when doing high-intensity exercises like box jumps and quick sprints."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/Image%20Three.png",
                        title: "Grip and Grit",
                        subtext: "A tough, sticky texture strategically placed on the midfoot and toe—high wear-and-tear areas—delivers game-changing grip and durability. A new traction pattern provides a flat, sticky surface for lifting on even the sweatiest of surfaces."
                    },
                    {
                        image: "https://d1mgcpums0qvsa.cloudfront.net/JDS/3.0/Image%20Four.png",
                        title: "Lock In",
                        subtext: "The midfoot band helps secure your foot onto the footbed when you pull on the laces. Combined with a sturdy heel cup and lace tuck, it allows you to focus on your form and not shifting or slipping. Open-holed engineered mesh provides breathability. Midsole rubber wrap is more tuned, lighter and less bulky than the Metcon 9. Tough plastic heel clip provides durability for handstand push-ups."
                    },
                ]
            },
        ]
    };

    const getCarouselHTML = (currentPathname) => {
        let matchedGroup = carouselData.groups.find((group) => group.paths.includes(currentPathname));

        const html = `
            <div class="${tag}__carousel-container ${matchedGroup.name}">
                <h3>Features that perform</h3>
                <div class="${tag}__carousel">
                    ${matchedGroup.carousel.map((item) => `
                                <div class="${tag}__carousel-item">
                                    <div>
                                        <img src="${item.image}" alt="${item.title}" />
                                    </div>
                                    <div>
                                        <p class="${tag}__carousel-title">${item.title}</p>
                                        <p class="${tag}__carousel-subtext">${item.subtext}</p>
                                    </div>
                                </div>
                                `
        ).join("")}
                </div>
            </div>
        `;

        return html;
    };

    const onElementVisible = (selector, callback, options = { once: false }) => {
        const element = document.querySelector(selector);
        if (!element) return;

        const isElementInViewport = (el) => {
            const rect = el.getBoundingClientRect();
            return rect.top + 200 < window.innerHeight && rect.bottom > 0;
        };

        const handleScroll = () => {
            if (isElementInViewport(element)) {
                callback(element);
                if (options.once) window.removeEventListener("scroll", handleScroll);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
    };

    const onCarouselInteraction = (selector) => {
        const carousel = document.querySelector(selector);
        if (!carousel) return;

        let hasInteracted = false;

        const handleInteraction = (event) => {
            if (hasInteracted) return;
            hasInteracted = true;

            utils.sendEvt("[JDS 3.0] Carousel interaction", "conv_carousel_interaction", tag);

            carousel.removeEventListener("scroll", handleInteraction);
            carousel.removeEventListener("mousedown", handleInteraction);
            carousel.removeEventListener("touchstart", handleInteraction);
        };

        carousel.addEventListener("scroll", handleInteraction, { passive: true });
        carousel.addEventListener("mousedown", handleInteraction, { passive: true });
        carousel.addEventListener("touchstart", handleInteraction, { passive: true });
    };

    const initVariation = () => {

        utils.waitUntil(() => document.querySelector(`#itemInfo`), 0).then((ele) => {

            if (document.querySelector(`.${tag}__carousel-container`)) return;

            const pathname = window.location.pathname;
            const carouselHTML = getCarouselHTML(pathname);
            ele.insertAdjacentHTML("afterbegin", carouselHTML);

            onElementVisible(`.${tag}__carousel-container`, () => {
                utils.sendEvt("[JDS 3.0] Features that perform visibility", "conv_features_visibility", tag);
            }, { once: true });

            onCarouselInteraction(`.${tag}__carousel`);

        });
    };

    utils.init();
})(window);