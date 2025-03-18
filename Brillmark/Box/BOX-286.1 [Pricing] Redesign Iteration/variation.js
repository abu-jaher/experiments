(() => {
  try {
    const waitForElement = (selector, trigger, delayInterval, delayTimeout) => {
      const interval = setInterval(() => {
        const elements = document.querySelectorAll(selector);
        if (document && elements && elements.length > 0) {
          clearInterval(interval);
          trigger();
        }
      }, delayInterval);
      setTimeout(() => {
        clearInterval(interval);
      }, delayTimeout);
    };

    const enterpriseTag =
      `<div class="pricing-package--label__wrapper pricing-package--left-col">
          <span style="background: #F26430" class="pricing-package--label__tag">RECOMMENDED</span>
        </div>`;

    const enterprisePlusBanner =
      `<div class="fe_enterprisePlusBanner">
          <span class="fe_banner"><img src="https://cdn03.boxcdn.net/sites/default/files/styles/400xauto/public/2024-06/box_ai_1.png?itok=My2oZX1w"/></span>
          <span class="fe_tooltip">
                <img src="https://fe-test-dev.s3.amazonaws.com/box/Box+286/tooltip_icon.png"/>
                <p class="fe_tooltip_text">20 Box AI queries/user + 2,000 per month included</p>
          </span>
        </div>`;


    const boxAILogo =
      `<svg class="box-ai-logo" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="19.3096" height="19.3096" transform="translate(0.0722656)" fill="white"/>
        <path d="M15.2726 8.46975C16.2789 7.02912 16.5941 5.77486 16.1365 5.12773L16.1373 5.12693C15.7646 4.59979 14.8423 4.42141 13.5984 4.62459C13.4792 4.22063 13.344 3.83668 13.1952 3.47512C15.0462 3.12636 16.4357 3.46392 17.1204 4.43261C17.8291 5.4357 17.6467 6.92513 16.6069 8.62574C16.4477 8.88491 16.2701 9.14568 16.0781 9.40645C15.8302 9.09288 15.5622 8.77932 15.2726 8.46975Z" fill="#CC0DB9"/>
        <path d="M11.857 5.09334C11.693 5.15253 11.5266 5.21573 11.3578 5.28452C10.9283 5.01735 10.4963 4.77018 10.0644 4.5454C10.5299 4.32383 10.9915 4.12945 11.445 3.96547C11.4666 4.01426 11.4882 4.06306 11.509 4.11345C11.6378 4.41902 11.753 4.74778 11.857 5.09334Z" fill="#CC0DB9"/>
        <path d="M7.97264 7.1715C8.45979 6.82754 8.94293 6.51878 9.41808 6.24441C8.98293 6.01004 8.55018 5.80206 8.12463 5.62288C7.85826 5.79166 7.59349 5.96844 7.33032 6.15242C7.21833 6.68996 7.13274 7.2579 7.07514 7.84663C7.36071 7.61945 7.65908 7.39388 7.97344 7.1715H7.97264Z" fill="#CC0DB9"/>
        <path d="M14.1167 9.876C14.1679 9.9328 14.2183 9.99039 14.2679 10.0472H14.2687C14.4911 10.3024 14.6967 10.5575 14.8839 10.8127C14.6623 11.0423 14.4319 11.2694 14.1895 11.4942C14.0815 11.595 13.9712 11.695 13.8584 11.7942C13.4264 12.1749 12.9657 12.5453 12.4825 12.9005C12.4597 12.917 12.4369 12.9336 12.414 12.9502C12.3352 13.0074 12.2562 13.0648 12.1762 13.1212C12.1674 13.1272 12.1588 13.1332 12.1502 13.1392C12.1416 13.1452 12.133 13.1512 12.1242 13.1572C11.861 13.3412 11.5962 13.518 11.3299 13.6868C11.2259 13.7524 11.1227 13.8172 11.0187 13.8803C10.5891 14.1419 10.1572 14.3819 9.72684 14.5987C9.61405 14.6555 9.50126 14.7107 9.38927 14.7643C8.92373 14.9858 8.46218 15.1802 8.00863 15.3442C7.91264 15.3786 7.81745 15.4122 7.72306 15.4442C7.32631 15.5778 6.93675 15.6873 6.55839 15.7713C6.54159 15.7749 6.5246 15.7789 6.5076 15.7829C6.4906 15.7869 6.4736 15.7909 6.4568 15.7945L6.43831 15.7983C6.37822 15.8106 6.31872 15.8228 6.25923 15.8337C4.40823 16.1825 3.01879 15.8449 2.33407 14.8762C1.62535 13.8732 1.80773 12.3837 2.84761 10.6831C3.00679 10.4239 3.18437 10.1632 3.37635 9.9024C3.43714 9.82001 3.50034 9.73682 3.56433 9.65443C3.8083 9.34086 4.07387 9.0281 4.36104 8.71853C4.42903 8.64494 4.49942 8.57055 4.57062 8.49696C4.79219 8.26738 5.02256 8.04021 5.26494 7.81543C5.22174 8.28898 5.19535 8.77213 5.18575 9.26247C5.18415 9.37526 5.18255 9.48805 5.18255 9.60083C5.17709 9.60681 5.17164 9.61269 5.16622 9.61855C5.15493 9.63074 5.14376 9.6428 5.13295 9.65523C4.84578 9.97199 4.58821 10.2848 4.36104 10.5911C4.29865 10.6751 4.23865 10.7583 4.18106 10.8407C3.17477 12.2813 2.85961 13.5356 3.31716 14.1827C3.68991 14.7099 4.61221 14.8882 5.85607 14.6851C5.95286 14.6691 6.05285 14.6507 6.15364 14.6299C6.5176 14.5563 6.90475 14.4515 7.31191 14.3155C7.4055 14.2843 7.50069 14.2507 7.59668 14.2163C7.76066 14.1571 7.92704 14.0939 8.09582 14.0251C8.20781 13.9795 8.32059 13.9315 8.43498 13.8812C8.85413 13.698 9.28609 13.4844 9.72684 13.2412C9.82922 13.1844 9.93241 13.126 10.0356 13.066C10.5107 12.7917 10.9939 12.4829 11.481 12.1389C11.7954 11.9166 12.0938 11.691 12.3793 11.4638C12.4897 11.375 12.5993 11.2862 12.7057 11.1975C13.1688 10.8103 13.5896 10.4199 13.9672 10.032C14.0176 9.97999 14.0679 9.928 14.1167 9.876Z" fill="#CC0DB9"/>
        <path d="M13.3839 4.97013C13.3567 4.87254 13.3295 4.77575 13.3007 4.67977C13.1808 4.27821 13.0456 3.89665 12.8952 3.53829C12.8884 3.5223 12.8818 3.50611 12.8752 3.48992C12.8686 3.47372 12.862 3.4575 12.8552 3.4415C12.828 3.37911 12.8008 3.31752 12.7728 3.25673C11.9905 1.54412 10.9138 0.603424 9.72754 0.603424C8.54128 0.603424 7.4638 1.54412 6.68069 3.25753C6.65269 3.31832 6.62549 3.37911 6.5983 3.4423C6.59081 3.45947 6.58357 3.47737 6.57631 3.49532C6.57037 3.50999 6.56442 3.52471 6.5583 3.53909C6.40872 3.89745 6.27273 4.27901 6.15275 4.68057C6.12395 4.77575 6.09675 4.87254 6.06956 4.97093C5.88878 5.62846 5.74719 6.33398 5.6488 7.0723C5.62961 7.21948 5.61121 7.36666 5.59521 7.51625C5.53282 8.08898 5.49602 8.67851 5.48562 9.27845L5.48559 9.28081C5.484 9.3848 5.48242 9.48802 5.48242 9.59281L5.48321 9.59368V9.71833L5.48242 9.7192C5.48242 9.82398 5.48402 9.92876 5.48562 10.0335C5.49682 10.6335 5.53362 11.2238 5.59521 11.7958C5.61121 11.9453 5.62961 12.0925 5.6488 12.2397C5.74719 12.9788 5.88878 13.6836 6.06956 14.3411C6.12235 14.3307 6.17434 14.3203 6.22794 14.3083C6.5519 14.2363 6.88626 14.1419 7.22783 14.0275C7.16703 13.8059 7.11024 13.5748 7.05824 13.3364C7.02705 13.1948 6.99825 13.0492 6.97105 12.902C6.87187 12.3693 6.79587 11.7998 6.74708 11.1982C6.73588 11.0598 6.72628 10.9199 6.71828 10.7783C6.69749 10.4143 6.68549 10.04 6.68549 9.656C6.68549 9.27205 6.69669 8.89769 6.71828 8.53373C6.72628 8.39215 6.73588 8.25216 6.74708 8.11378C6.79587 7.51225 6.87187 6.94271 6.97105 6.40997C6.99825 6.26199 7.02785 6.1172 7.05824 5.97562C7.11024 5.73645 7.16703 5.50607 7.22783 5.2845C7.25502 5.18611 7.28222 5.09012 7.31102 4.99573C7.435 4.58458 7.57339 4.20702 7.72297 3.86706C7.76457 3.77267 7.80696 3.68068 7.85016 3.59189C8.40209 2.45842 9.08042 1.80889 9.72594 1.80889C10.3715 1.80889 11.0498 2.45842 11.6017 3.59189C11.6449 3.68068 11.6873 3.77187 11.7289 3.86706C11.8785 4.20702 12.0169 4.58458 12.1409 4.99573C12.1697 5.09012 12.1969 5.18691 12.2241 5.2845C12.2849 5.50607 12.3417 5.73725 12.3936 5.97562C12.8872 6.32598 13.3583 6.69314 13.8031 7.0723C13.7047 6.33318 13.5631 5.62846 13.3823 4.97093L13.3839 4.97013Z" fill="#CC0DB9"/>
        <path d="M12.736 10.7775C13.16 10.4111 13.5543 10.0352 13.9135 9.6552C13.5551 9.27525 13.1608 8.89929 12.736 8.53293C12.7568 8.89689 12.768 9.27125 12.768 9.6552C12.768 10.0392 12.7568 10.4135 12.7352 10.7775H12.736Z" fill="#CC0DB9"/>
        <path d="M12.3952 13.3356C12.3432 13.5748 12.2864 13.8051 12.2257 14.0267C12.5672 14.1411 12.9024 14.2363 13.2255 14.3075C13.2572 14.3146 13.2883 14.3208 13.3193 14.3271C13.3408 14.3314 13.3624 14.3357 13.3839 14.3403C13.5647 13.6828 13.7063 12.9772 13.8047 12.2389C13.3599 12.6181 12.8888 12.9852 12.3952 13.3356Z" fill="#CC0DB9"/>
        <path d="M7.85175 15.7193C8.40369 16.8528 9.08201 17.5023 9.72754 17.5023H9.72914C10.3747 17.5023 11.053 16.8528 11.6049 15.7193C12.0033 15.8545 12.3944 15.9649 12.7752 16.0521C11.9921 17.7655 10.9154 18.7062 9.72834 18.7062C8.54127 18.7062 7.46459 17.7655 6.68148 16.0521C7.06224 15.9657 7.4534 15.8545 7.85175 15.7193Z" fill="#CC0DB9"/>
        <path d="M5.85607 4.62535C4.61221 4.42217 3.68911 4.60055 3.31716 5.12769L3.31796 5.12849C2.86041 5.77562 3.17557 7.02907 4.18186 8.47051C3.89229 8.78008 3.62352 9.09284 3.37635 9.40721C3.18357 9.14644 3.00599 8.88567 2.84761 8.6265C1.80773 6.92589 1.62535 5.43645 2.33407 4.43337C3.01799 3.46388 4.40823 3.12711 6.25923 3.47588C6.11044 3.83743 5.97526 4.22139 5.85607 4.62535Z" fill="#CC0DB9"/>
        <path d="M7.07513 11.4638C7.36069 11.691 7.65906 11.9173 7.97342 12.1389H7.97262C8.45977 12.4829 8.94372 12.7916 9.41806 13.066C8.98291 13.2996 8.55016 13.5076 8.12461 13.6875C7.85824 13.5187 7.59347 13.3428 7.3303 13.158C7.21831 12.6204 7.13272 12.0525 7.07513 11.4638Z" fill="#CC0DB9"/>
        <path d="M5.26492 11.4942C5.22173 11.0206 5.19533 10.5375 5.18573 10.0471C4.96336 10.3023 4.75778 10.5575 4.5706 10.8126C4.79138 11.0422 5.02255 11.2702 5.26492 11.4942Z" fill="#CC0DB9"/>
        <path d="M16.0781 9.90316C16.2709 10.1639 16.4485 10.4247 16.6069 10.6839V10.6831C17.6467 12.3837 17.8291 13.8731 17.1204 14.8762C16.4365 15.8457 15.0462 16.1825 13.1952 15.8337C13.1305 15.8217 13.0641 15.8089 12.9977 15.7945C12.9809 15.7909 12.9639 15.7869 12.9469 15.7829C12.9299 15.7789 12.9129 15.7749 12.8961 15.7713C12.5177 15.6873 12.1282 15.5777 11.7314 15.4441C11.6362 15.4121 11.541 15.3785 11.4458 15.3441C10.9923 15.1802 10.5307 14.9866 10.0652 14.7642C10.4972 14.5402 10.9291 14.2923 11.3587 14.0251C11.5282 14.0939 11.6938 14.1571 11.8578 14.2163C11.9538 14.2507 12.0482 14.2843 12.1426 14.3155C12.5497 14.4514 12.9369 14.5554 13.3008 14.6298C13.4016 14.6506 13.5008 14.669 13.5984 14.685C14.8423 14.8882 15.7654 14.7098 16.1373 14.1827C16.5949 13.5355 16.2797 12.2821 15.2734 10.8407C15.2158 10.7575 15.1558 10.6751 15.0934 10.5911C14.8663 10.2847 14.6087 9.97195 14.3215 9.65519L14.2719 9.60079C14.2207 9.5448 14.1695 9.48961 14.1167 9.43361C14.068 9.38164 14.0176 9.32966 13.9672 9.27768C13.5897 8.88973 13.1689 8.49932 12.7057 8.11296C12.5993 8.02417 12.4905 7.93538 12.3793 7.84659C12.0938 7.61942 11.7954 7.39304 11.481 7.17147C10.9939 6.8275 10.5099 6.51874 10.0356 6.24437C9.93241 6.18438 9.82923 6.12598 9.72684 6.06919C9.28529 5.82602 8.85334 5.61324 8.43498 5.42926C8.3214 5.37967 8.20781 5.33087 8.09582 5.28528C7.92624 5.21649 7.76066 5.15329 7.59668 5.0941C7.70067 4.74854 7.81665 4.42058 7.94464 4.11421C7.96544 4.06382 7.98703 4.01502 8.00863 3.96623C8.46218 4.13021 8.92373 4.32379 9.38928 4.54616C9.50206 4.59976 9.61405 4.65495 9.72684 4.71174C10.1572 4.92932 10.5891 5.16849 11.0187 5.43006C11.1227 5.49326 11.2267 5.55805 11.3299 5.62364C11.5962 5.79242 11.861 5.9684 12.1242 6.15318C12.133 6.15918 12.1416 6.16518 12.1502 6.17118C12.1588 6.17718 12.1674 6.18318 12.1762 6.18918C12.2794 6.26197 12.3809 6.33556 12.4825 6.40995C12.9665 6.76511 13.4264 7.13547 13.8584 7.51623C13.9704 7.61542 14.0807 7.7154 14.1895 7.81619C14.4319 8.04017 14.6631 8.26814 14.8839 8.49772C14.9542 8.57129 15.0247 8.64492 15.0934 8.71929C15.3806 9.02886 15.6462 9.34162 15.8901 9.65519C15.9541 9.73758 16.0173 9.82077 16.0781 9.90316Z" fill="#CC0DB9"/>
        </svg>
        `


    const businessBullet = `
          <p class="included"><i class="icon-check-2"></i><strong>Unlimited storage</strong></p>
          <p class="included"><i class="icon-check-2"></i><strong>Upload files up to 5GB</strong></p>
          <p class="included"><i class="icon-check-2"></i>Secure sharing, unlimited Notes, whiteboarding and e-signatures</p>
          <p class="included"><i class="icon-check-2"></i>Built-in content security and permissions with SOC 1/SOC 2/SOC 3 compliance</p>
          <p class="included"><i class="icon-check-2"></i>1,500+ integrations like Microsoft Office, Copilot, Salesforce, Google Workspace, Slack, and more</p>
          <p class="included"><i class="icon-check-2"></i>50K API calls per month</p>
          <p class="included"><i class="icon-check-2"></i>Standard support available</p>
        `;

    const businessPlusBullet = `
          <p class="included"><i class="icon-check-2"></i><strong>Unlimited storage</strong></p>
          <p class="included"><i class="icon-check-2"></i><strong>Upload files up to 15GB</strong></p>
          <p class="included"><i class="icon-check-2"></i>Secure sharing, unlimited Notes, whiteboarding and e-signatures</p>
          <p class="included"><i class="icon-check-2"></i>Built-in content security and permissions with SOC 1/SOC 2/SOC 3 compliance</p>
          <p class="included"><i class="icon-check-2"></i>1,500+ integrations like Microsoft Office, Copilot, Salesforce, Google Workspace, Slack, and more</p>
          <p class="included"><i class="icon-check-2"></i>50K API calls per month</p>
          <p class="included"><i class="icon-check-2"></i>Unlimited external collaborators</p>
          <p class="included"><i class="icon-check-2"></i>Standard support available</p>
        `;

    const enterpriseBullet = `
          <p class="included"><i class="icon-check-2"></i><strong>Unlimited storage</strong></p>
          <p class="included"><i class="icon-check-2"></i><strong>Upload files up to 50GB</strong></p>
          <p class="included"><i class="icon-check-2"></i>Content portals with Box Hubs</p>
          <p class="included"><i class="icon-check-2"></i>Secure sharing, unlimited Notes, whiteboarding and e-signatures</p>
          <p class="included"><i class="icon-check-2"></i>More compliance standards with SOC 1/SOC 2/SOC 3, HIPAA, FedRAMP</p>
          <p class="included"><i class="icon-check-2"></i>1,500+ integrations like Microsoft Office, Copilot, Salesforce, Google Workspace, Slack, and more</p>
          <p class="included"><i class="icon-check-2"></i>100K API calls per month</p>
          <p class="included"><i class="icon-check-2"></i>Advanced workflow capabilities</p>
          <p class="included"><i class="icon-check-2"></i>Unlimited external collaborators</p>
          <p class="included"><i class="icon-check-2"></i>Standard support available</p>
        `;

    const enterprisePlusBullet = `
          <p class="included"><i class="icon-check-2"></i><strong>Unlimited storage</strong></p>
          <p class="included"><i class="icon-check-2"></i><strong>Upload files up to 150GB</strong></p>`
      + '<p class="included">' + boxAILogo + '<strong>AI-powered document insights and intelligent Hubs</strong></p>' +
      ` <p class="included"><i class="icon-check-2"></i>Secure sharing, unlimited Notes, whiteboarding and e-signatures</p>
          <p class="included"><i class="icon-check-2"></i>Advanced compliance standards including SOC 1/SOC 2/SOC 3, HIPAA, FedRAMP, GxP, 21 CFR Part 11</p>
          <p class="included"><i class="icon-check-2"></i>1,500+ integrations like Microsoft Office, Copilot, Salesforce, Google Workspace, Slack, and more</p>
          <p class="included"><i class="icon-check-2"></i>100K API calls per month</p>
          <p class="included"><i class="icon-check-2"></i>Advanced workflow capabilities</p>
          <p class="included"><i class="icon-check-2"></i>Automated controls protecting against threats and data leaks</p>
          <p class="included"><i class="icon-check-2"></i>Unlimited external collaborators</p>
          <p class="included"><i class="icon-check-2"></i>Enhanced support services 24 hour coverage</p>
        `;


    const updateBtnCopy = () => {
      document.querySelectorAll('.pricing-package__buttons .button-primary, .pricing-features--plan-buttons .button-primary').forEach(element => {
        if (element.innerText.toLowerCase() === "buy it") {
          element.innerHTML = `Buy now`;
        }
      });
    }

    const new4lines = `
        <dl class="pricing-features__row FE-new-line">
            <dt class="pricing-features__column">Box Hubs</dt>
            <dd class="pricing-features__column"><i class="icon-notavailable"></i></dd>
            <dd class="pricing-features__column"><i class="icon-notavailable"></i></dd>
            <dd class="pricing-features__column"><i class="icon-notavailable"></i></dd>
            <dd class="pricing-features__column"><i class="icon-check-2"></i></dd>
            <dd class="pricing-features__column"><i class="icon-check-2"></i></dd>
        </dl>
        <dl class="pricing-features__row pricing-features__row--odd FE-new-line">
            <dt class="pricing-features__column">Box AI end-user queries: <br>Box AI for Notes, Box AI for <br>Documents</dt>
            <dd class="pricing-features__column"><i class="icon-notavailable"></i></dd>
            <dd class="pricing-features__column"><i class="icon-notavailable"></i></dd>
            <dd class="pricing-features__column"><i class="icon-notavailable"></i></dd>
            <dd class="pricing-features__column"><i class="icon-notavailable"></i></dd>
            <dd class="pricing-features__column">Unlimited</dd>
        </dl>
        <dl class="pricing-features__row FE-new-line">
            <dt class="pricing-features__column">Box AI end-user queries: <br>Box AI for Hubs (beta)</dt>
            <dd class="pricing-features__column"><i class="icon-notavailable"></i></dd>
            <dd class="pricing-features__column"><i class="icon-notavailable"></i></dd>
            <dd class="pricing-features__column"><i class="icon-notavailable"></i></dd>
            <dd class="pricing-features__column"><i class="icon-notavailable"></i></dd>
            <dd class="pricing-features__column"><i class="icon-check-2"></i></dd>
        </dl>
        <dl class="pricing-features__row pricing-features__row--odd FE-new-line">
            <dt class="pricing-features__column">2000 Box AI Platform API <br>Calls (beta) per month</dt>
            <dd class="pricing-features__column"><i class="icon-notavailable"></i></dd>
            <dd class="pricing-features__column"><i class="icon-notavailable"></i></dd>
            <dd class="pricing-features__column"><i class="icon-notavailable"></i></dd>
            <dd class="pricing-features__column"><i class="icon-notavailable"></i></dd>
            <dd class="pricing-features__column"><i class="icon-check-2"></i></dd>
        </dl>        
    `

    const initPricingPlan = () => {
      const { body } = document;

      !body.querySelector('[data-pricing-api-id="box_enterprise"] .pricing-package--left-col__wrapper .pricing-package--label__tag') &&
        body.querySelector('[data-pricing-api-id="box_enterprise"] .pricing-package--left-col__wrapper').insertAdjacentHTML('afterbegin', enterpriseTag);

      !body.querySelector('[data-pricing-api-id="box_enterprise"] + .pricing-package .fe_enterprisePlusBanner') &&
        body.querySelector('[data-pricing-api-id="box_enterprise"] + .pricing-package .pricing-package--heading').insertAdjacentHTML('beforeend', enterprisePlusBanner);
      body.querySelector('[data-pricing-api-id="box_enterprise"] + .pricing-package .pricing-package-description p').innerHTML = 'The power of AI and the Content Cloud in one plan';

      body.querySelector('[data-pricing-api-id="box_business"] .pricing-featured_features__chart').innerHTML = businessBullet;
      body.querySelector('[data-pricing-api-id="box_business_plus"] .pricing-featured_features__chart').innerHTML = businessPlusBullet;
      body.querySelector('[data-pricing-api-id="box_enterprise"] .pricing-featured_features__chart').innerHTML = enterpriseBullet;
      body.querySelector('[data-pricing-api-id="box_enterprise"] + .pricing-package .pricing-featured_features__chart').innerHTML = enterprisePlusBullet;
      body.querySelector('.pricing-navigation--tabs .pricing-navigation--button[name="tab-2"]').innerHTML = 'Businesses';
      body.querySelector('.pricing-navigation--selector [value="tab-2"]').innerHTML = 'Businesses';
      body.querySelector('.pricing-navigation--tabs .pricing-navigation--button[name="tab-1"]').innerHTML = 'Individuals & Teams';
      body.querySelector('.pricing-navigation--selector [value="tab-1"]').innerHTML = 'Individuals & Teams';

      // update btn COPY

      updateBtnCopy();

      document.addEventListener('click', (event) => {
        if (event.target.closest('.pricing-navigation--button') || event.target.closest('.pricing-toggle')) {
          waitForElement(".pricing-package__buttons .button-primary,.pricing-features--plan-buttons .button-primary", updateBtnCopy, 50, 15000);
        }
      })
    };


    const comparisonTableStickyNav = () => {
      const targetElement = document.querySelector('.pricing-features__chart-wrapper');
      const targetElementHeight = targetElement.getBoundingClientRect().height;

      const stickyNav = document.querySelector('.pricing-features__chart-wrapper--super .pricing-features--sticky');

      const calcPaddingTop = (document.querySelector('#site-header') && document.querySelector('#site-header').getBoundingClientRect().height) + (document.querySelector('#page--area__top') && document.querySelector('#page--area__top').getBoundingClientRect().height);

      if (targetElement.getBoundingClientRect().top <= calcPaddingTop) {
        stickyNav.classList.add('fe_sticky');
        stickyNav.style.paddingTop = (calcPaddingTop + 2) + 'px';
      } else {
        stickyNav.classList.remove('fe_sticky');
      }

      if (targetElement.getBoundingClientRect().top < -(targetElementHeight - (stickyNav.getBoundingClientRect().height + 100))) {
        stickyNav.classList.remove('fe_sticky');
      }
    }


    const initPlanComparison = () => {
      const { body } = document;
      body.querySelector('.pricing-features .pricing-features-heading').innerHTML = `Plan comparison`;

      body.querySelectorAll('.pricing-features--plan-buttons .button-primary[href*="https://account.box.com/signup/enterprise-plan/buynow"]').forEach((element) => {
        element.closest('.pricing-features__column').classList.add('fe_enterprise_features');
        element.closest('.pricing-features__column').querySelector('.pricing-features--plan-label').innerHTML = 'RECOMMENDED';
      })

      body.querySelectorAll('.pricing-features--plan-buttons .button-primary[href*="businessplus/buynow"]').forEach((element) => {
        element.closest('.pricing-features__column').classList.add('fe_biz_plus');
      })

      body.querySelectorAll('.pricing-features--plan-buttons .button-link[href*="https://www.box.com/enterprise-plus"],.pricing-features--plan-buttons .button-secondary[href*="https://www.box.com/enterprise-plus"]').forEach((element) => {
        element.closest('.pricing-features__column').classList.add('fe_enterprisePlus_features');
        element.closest('.pricing-features__column').querySelector('.pricing-features--plan-label').innerHTML = 'NOW WITH BOX AI';
        //`<span class="pricing-features--plan-label fe-box-ai">NOW WITH BOX AI</span>`;
      })

      comparisonTableStickyNav();

      document.addEventListener('scroll', () => {
        comparisonTableStickyNav();
      })

      !document.querySelector('.FE-new-line') && body.querySelector('.pricing-features__chart--visibility-control').insertAdjacentHTML('beforeend', new4lines);

      body.querySelector('.pricing-features .pricing-features__chart--track-0 .pricing-features__row:nth-of-type(6) dd.pricing-features__column:last-of-type').innerHTML = '3';
      body.querySelector('.pricing-features .pricing-features__chart--track-0 .pricing-features__row:nth-of-type(8) dd.pricing-features__column:nth-of-type(2)').innerHTML = 'Required paid accounts';

    }


    waitForElement('[data-pricing-api-id="box_enterprise"] + .pricing-package .pricing-featured_features__chart', initPricingPlan, 50, 15000);
    waitForElement('.pricing-features--plan-buttons .button-link[href*="https://www.box.com/enterprise-plus"],.pricing-features--plan-buttons .button-secondary[href*="https://www.box.com/enterprise-plus"]', initPlanComparison, 1000, 15000);

    function restyleTabs() {
      document.querySelector('body').classList.add('fe_restyleTabs');
    }

    waitForElement('ul.pricing-features__bullets-navigation', restyleTabs, 1000, 25000);

  } catch (error) {
    console.error(error, 'Error in test BOX 286 v1');
  }
})();

// TC param
(() => {
  try {
    /* main variables */
    const helper = {
      waitForTryItCTA: (selector, trigger) => {
        const interval = setInterval(() => {
          const elements = document.querySelectorAll(selector);
          const elementsArray = Array.from(elements);
          if (
            elements.length > 0 &&
            elementsArray.some(
              (element) => element.innerText.toLowerCase() === "try for free"
            )
          ) {
            clearInterval(interval);
            trigger();
          }
        }, 200);
        setTimeout(() => {
          clearInterval(interval);
        }, 15000);
      },
      checkTcParam: (selector, trigger) => {
        const interval = setInterval(() => {
          trigger();
          const elements = document.querySelectorAll(selector);
          const elementsArray = Array.from(elements);
          if (
            elements.length > 0 &&
            elementsArray.some(
              (element) => element.href.indexOf("box-286-1-v1") > -1
            )
          ) {
            clearInterval(interval);
          }
        }, 100);
        setTimeout(() => {
          clearInterval(interval);
        }, 5000);
      },
      addTCparam: () => {
        const cta = document.querySelectorAll(
          "#pricing-plan-2 .pricing-package .pricing-package__buttons-wrapper a:not([href*='https://www.box.com/']), #pricing-plan-1 .pricing-package:not([data-formatter-id='pricing-plan-108696']) .pricing-package__buttons-wrapper a, .pricing-features__chart .pricing-features--plan-buttons a:not([href*='https://www.box.com/']), .pricing-features--sticky__container .pricing-features--plan-buttons a:not([href*='https://www.box.com/'])"
        );
        for (let i = 0; i < cta.length; i++) {
          const tc = "|box-286-1-v1";
          const url = cta[i].href;
          if (url.indexOf("annual") > -1 || url.indexOf("monthly") > -1) {
            if (url.indexOf("|box-286-1-v1") > -1) return;
            const referrer = url.concat(tc);
            cta[i].setAttribute("href", referrer);
          }
        }
      },
    };

    /* Variation Init */
    const init = () => {
      document
        .querySelectorAll(
          ".pricing-package__buttons .button-link,.pricing-features--plan-buttons .button-link, .pricing-features--plan-buttons .button-secondary"
        )
        .forEach((element) => {
          if (element.innerText.toLowerCase() === "try for free") {
            element.innerHTML = `<span>Try now</span>`;
          }
        });

      document.querySelector(
        ".pricing-toggle-button .pricing-toggle-discount"
      ).innerHTML =
        'Save<span id="toggle-discount-percentage" class="toggle-discount-percentage"> 25%</span>*';
    };

    document.addEventListener("click", (event) => {
      if (
        event.target.closest(".pricing-navigation--button") ||
        event.target.closest(".pricing-toggle")
      ) {
        helper.checkTcParam(
          ".pricing-package__buttons .button-link,.pricing-package__buttons .button-primary",
          init
        );
        helper.checkTcParam(
          "#pricing-plan-2 .pricing-package .pricing-package__buttons-wrapper a:not([href*='https://www.box.com/']), #pricing-plan-1 .pricing-package:not([data-formatter-id='pricing-plan-108696']) .pricing-package__buttons-wrapper a, .pricing-features__chart .pricing-features--plan-buttons a:not([href*='https://www.box.com/']), .pricing-features--sticky__container .pricing-features--plan-buttons a:not([href*='https://www.box.com/'])",
          helper.addTCparam
        );
      }
    });

    /* Initialize variation */
    helper.waitForTryItCTA(
      ".pricing-package__buttons .button-link,.pricing-features--plan-buttons .button-link",
      init
    );
    helper.checkTcParam(
      "#pricing-plan-2 .pricing-package .pricing-package__buttons-wrapper a:not([href*='https://www.box.com/']), #pricing-plan-1 .pricing-package:not([data-formatter-id='pricing-plan-108696']) .pricing-package__buttons-wrapper a, .pricing-features__chart .pricing-features--plan-buttons a:not([href*='https://www.box.com/']), .pricing-features--sticky__container .pricing-features--plan-buttons a:not([href*='https://www.box.com/'])",
      helper.addTCparam
    );
  } catch (e) {
    console.log(e, "Error in Box-286 v1");
  }
})();