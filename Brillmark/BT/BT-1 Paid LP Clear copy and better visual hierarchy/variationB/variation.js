(function () {
  try {
    // Main variables
    var debug = 0;
    var variation_name = "";

    // Define waitForElement function
    function waitForElement(selector, callback, delayInterval, delayTimeout) {
      var interval = setInterval(function () {
        var element = document.querySelector(selector);
        if (element) {
          clearInterval(interval);
          callback(element);
        }
      }, delayInterval);
      setTimeout(function () {
        clearInterval(interval);
      }, delayTimeout);
    }
    const updatedContent = {
      classToAdd: "fe-case-management",
      paragraphHTML: "Case Management, a solution from <strong>Social Solutions</strong>, is now offered by Bonterra.",
      headingText: "Take control with flexible case management solutions",
      leadText: "Save time — track client outcomes —  hold staff accountable —report to grant funders — uncover insights from your data. Improve your strategic planning."
    };
    /* Variation Init */
    function init() {
      const heroBlock2Top = document.getElementById('HERO-Block2-Top');
      // Update paragraph class
      heroBlock2Top.closest('#HERO-Block2-Top').querySelector('p').classList.add(updatedContent.classToAdd);
      // Update paragraph HTML content
      document.querySelector("#HERO-Block2-Top .fe-case-management").innerHTML = updatedContent.paragraphHTML;
      // Update heading text
      document.querySelector("#HERO-Block2-Top h1").innerText = updatedContent.headingText;
      // Update lead text
      document.querySelector("#HERO-Block2-Top .lead").innerText = updatedContent.leadText;
    }

    /* Initialise variation */
    waitForElement("#HERO-Block2-Top h1", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();