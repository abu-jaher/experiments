(() => {
  try {
    /* main variables */
    const waitForElement = (selector, trigger, delayInterval, delayTimeout) => {
      const interval = setInterval(() => {
        if (document && document.querySelector(selector) && document.querySelectorAll(selector).length > 0) {
          clearInterval(interval);
          trigger();
        }
      }, delayInterval);
      setTimeout(() => {
        clearInterval(interval);
      }, delayTimeout);
    }

    // wait for the glide
    const waitForGlide = (trigger) => {
      const interval = setInterval(() => {
        if (window.Glide) {
          clearInterval(interval);
          trigger();
        }
      }, 500);
      setTimeout(() => {
        clearInterval(interval);
      }, 15000);
    }


    const removeClass = (el, className) => {
      const element = document.querySelector(el);
      if (element) {
        element.classList.remove(className);
      }
    }

    const heroImg =
      `<picture>
        <!-- For 1x screens -->
        <source srcset="https://cdn03.boxcdn.net/sites/default/files/2023-12/1-Hero_HP-LS.png" media="(max-width: 1023px)">
        <!-- For 2x screens -->
        <source srcset="https://cdn03.boxcdn.net/sites/default/files/2023-12/1-Hero_HP-LS_2x.png" media="(min-width: 1024px)">
        
        <!-- Fallback image for browsers that don't support <picture> -->
        <img src="https://cdn03.boxcdn.net/sites/default/files/2023-12/1-Hero_HP-LS.png" alt="Description of the image">
      </picture>`;



    const arrowSvg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
          <rect width="42" height="42" rx="21" fill="#A9A9A9" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M23.8569 16.1096L16.9528 20.4247L23.8569 16.1096Z" fill="white" />
          <path d="M23.8569 16.1096L16.9528 20.4247" stroke="white" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M23.8569 25.6027L16.9528 20.4246" stroke="white" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round" />
          <rect width="42" height="42" rx="21" transform="matrix(-1 0 0 1 42 0)" fill="#2486FC" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M18.1431 16.1096L25.0472 20.4247L18.1431 16.1096Z" fill="white" />
          <path d="M18.1431 16.1096L25.0472 20.4247" stroke="white" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M18.1431 25.6027L25.0472 20.4246" stroke="white" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round" />
        </svg>`;

    const slidesData = [
      {
        tag: 'Speed up work',
        title: 'Streamline your R&D processes',
        subtitle: 'Accelerate launches of life-saving innovations with seamless collaboration and a single source of truth.',
        btnText: 'See how',
        imgSrc: 'https://cdn03.boxcdn.net/sites/default/files/2023-12/Slider_2_Secure-content-615x410%2B%281.5x%29.png',
        btnLink: '/industries/life-sciences-biotech',
        imgClass: 'fe_streamline',
      },
      {
        tag: 'Customer success',
        title: 'See how IDEXX automates complex workflows',
        subtitle: 'With 80+ labs around the world, IDEXX simplifies veterinary diagnostics with the power of automation.',
        btnText: 'Read story',
        imgSrc: 'https://cdn03.boxcdn.net/sites/default/files/2023-12/Slider_3_IDC615x410%2B%281.5x%29.png',
        btnLink: '/customers/idexx',
        imgClass: 'fe_idexx',
      },
      {
        tag: 'Protect critical data',
        title: 'Secure your clinical content',
        subtitle: 'Share regulated and non-regulated molecule and device information from a secure, compliant platform.',
        btnText: 'Learn more',
        imgSrc: 'https://cdn03.boxcdn.net/sites/default/files/2023-12/Slider_1_Steamline-R-D-615x410%2B%281.5x%29.png',
        btnLink: '/security-compliance',
        slideSwitchContent: 'fe_switch',
        imgClass: 'fe_secure',
      }
    ];

    const generateSlidesHTML = (slides) => {
      return slides.map((slide)=> {
        return '<li class="glide__slide fe_slider_content lazyloaded">' +
          '<div class="fe_slider_content_wrapper ' + (slide.slideSwitchContent ? slide.slideSwitchContent : '') + '">' +
          '<div class="fe_left">' +
          '<div class="fe_slider_tag"><span>' + slide.tag + '</span></div>' +
          '<div class="fe_slider_title"><h3>' + slide.title + '</h3></div>' +
          '<div class="fe_slider_subtitle"><p>' + slide.subtitle + '</p></div>' +
          '<div class="fe_slider_btn"><a href="' + slide.btnLink + '">' + slide.btnText + '</a></div>' +
          '</div>' +
          '<div class="fe_right">' +
          '<img class="' + (slide.imgClass ? slide.imgClass : '') + '" src="' + slide.imgSrc + '">' +
          '</div>' +
          '</div>' +
          '</li>';
      }).join('');
    };

    const sliderElement = generateSlidesHTML(slidesData);

    const fe_slider =
    '<div class="fe_carousel_section fe_carousel_section_281">' +
      '<div class="fe_carousel_wrapper fe_glide_box-81">' +
        '<div class="glide__track" data-glide-el="track">' +
          '<ul class="glide__slides">' +
            sliderElement +
          '</ul>' +
        '</div>' +
        '<div class="glide__arrows" data-glide-el="controls">' +
          '<button class="glide__arrow glide__arrow--left" data-glide-dir="<">' +
            arrowSvg +
          '</button>' +
          '<button class="glide__arrow glide__arrow--right" data-glide-dir=">">' +
            arrowSvg +
          '</button>' +
        '</div>' +
        '<div class="glide__bullets" data-glide-el="controls[nav]">' +
          '<button class="glide__bullet" data-glide-dir="=0"></button>' +
          '<button class="glide__bullet" data-glide-dir="=1"></button>' +
          '<button class="glide__bullet" data-glide-dir="=2"></button>' +
        '</div>' +
      '</div>' +
    '</div>';
  

    const triggerGlide = () => {
      let glide = new Glide(".fe_glide_box-81", {
        type: "carousel",
        focusAt: "center",
        animationDuration: 1000,
        startAt: 0,
        perView: 1,
        autoplay: 4000,
      });
      glide.mount();

      glide.on("run", ()=> {
        var index = glide.index;
        setTimeout(()=> {
          removeClass(".fe_glide_box-81 .glide__bullet.glide__bullet--active", "glide__bullet--active");
          var bullet = document.querySelector('.fe_glide_box-81 .glide__bullet[data-glide-dir*="' + index + '"]');
          if (bullet) {
            bullet.classList.add("glide__bullet--active");
          }
        }, 200);
      });

      const autoplayEnabled = true;

      const stopAutoplayTemporarily = ()=> {
        if (autoplayEnabled) {
          glide.pause();
          glide.update({ autoplay: 0 });
          autoplayEnabled = false;
        }
      }

      // Attach click event listeners to arrows and dots
      const arrows = document.querySelectorAll('.fe_glide_box-81 .glide__arrow');
      const dots = document.querySelectorAll('.fe_glide_box-81 .glide__bullet');
      const card = document.querySelectorAll('.fe_glide_box-81 .fe_slider_content_wrapper');

      arrows.forEach( (element)=> {
        element.addEventListener('click', stopAutoplayTemporarily);
      });

      card.forEach( (element)=> {
        element.addEventListener('click', stopAutoplayTemporarily);
      });

      dots.forEach( (element)=> {
        element.addEventListener('click', function () {
          stopAutoplayTemporarily();
        });
      });
    }


    const initSlider = () => {
      const insertSlider = document.querySelector(".hero--half-n-half__vertical-bottom");
      insertSlider && insertSlider.insertAdjacentHTML("afterend", fe_slider);
    }


    const heroCopyData = [
      {
        selector: '.hero--messaging h1',
        content: 'Power life sciences innovation'
      },
      {
        selector: '.hero--messaging h3',
        content: 'Get therapies to market faster with one secure platform'
      },
      {
        selector: '.hero .buttons-wrapper .button-primary',
        content: 'Get Started',
        href: '/pricing'
      },
      {
        selector: '.hero .buttons-wrapper .button-secondary',
        content: 'Learn more',
        href: '/industries/life-sciences-biotech'
      }
    ];

    const updateHeroCopy = (data) => {
      data.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element) {
          element.textContent = item.content;
          if (item.href) {
            element.setAttribute('href', item.href);
          }
        }
      });
    };


    /* Variation Init */
    const init = () => {
      document.body.classList.add('box_281');
      //insert slider
      initSlider();
      // update the hero copy
      updateHeroCopy(heroCopyData);
      // hero img update
      document.querySelector('.hero--half-n-half .hero--image').innerHTML = heroImg;

      waitForGlide(() => {
        triggerGlide();
      });
    }

    /* Initialize variation */
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
      waitForElement('body', function () {
        const pictureElement = 
        `<picture>
          <!-- For 1x screens -->
          <source srcset="https://fe-test-dev.s3.amazonaws.com/box/Box-280/1-Hero_HP-LS.png" media="(max-width: 1023px)">
          <!-- For 2x screens -->
          <source srcset="https://fe-test-dev.s3.amazonaws.com/box/Box-280/1-Hero_HP-LS_2x.png" media="(min-width: 1024px)">
        
          <!-- Fallback image for browsers that don't support <picture> -->
          <img src="https://fe-test-dev.s3.amazonaws.com/box/Box-280/1-Hero_HP-LS.png" alt="Description of the image">
        </picture>`
        document.body.insertAdjacentHTML('beforeend', pictureElement);
      })
      waitForElement(".slideshow.glide", init, 50, 15000);
      waitForElement('body.box_275_1',function(){
        document.body.classList.remove('box_275_1')
      },50,15000)
    }

  } catch (e) {
    console.log(e, "error in - BOX-281: [Homepage] Life Science Personalization v1");
  }
})();