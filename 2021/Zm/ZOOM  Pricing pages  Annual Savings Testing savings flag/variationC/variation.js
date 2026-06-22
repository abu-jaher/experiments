(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "";

    /* all Pure helper functions */

    function waitForElement(selector, trigger, delayInterval, delayTimeout) {
      var interval = setInterval(function () {
        if (
          document &&
          document.querySelector(selector) &&
          document.querySelectorAll(selector).length > 0 
        ) {
          clearInterval(interval);
          trigger();
        }
      }, delayInterval);
      setTimeout(function () {
        clearInterval(interval);
      }, delayTimeout);
    }

    /* Variation functions */

    /* Variation Init */
    function init() {
      /* start your code here */
      crossedOff();

      var annualRadio = document.querySelectorAll('input[value="annual"]');
      for(let i = 0; i < annualRadio.length; i++){
        annualRadio[i].addEventListener('change',function(){
          crossedOff();
        })
      }

      var monthlyRadio = document.querySelectorAll('input[value="monthly"]');
      for(let i = 0; i < monthlyRadio.length; i++){
        monthlyRadio[i].addEventListener('change',function(){
          if(document.querySelector('.fe_price')){
            document.querySelectorAll('.fe_price').forEach(function(el){
              el.remove();
            }) 
            document.querySelectorAll('.new-price').forEach(function(el){
              el.classList.remove('fe_relative');
            })
          }
        })
      }

    }

    function crossedOff(){
      if(document.querySelector('.feature-plan-card .saving')){
        if(document.querySelector('.fe_price')) return
        var savings = document.querySelectorAll('.feature-plan-card .saving');
        for(let i = 0; i < savings.length; i++){

          var getPrice = parseFloat(savings[i].parentElement.nextSibling.querySelector('.price-num').innerText);
          console.log(Math.round(getPrice));
          var discountPercentage = 100 - parseFloat(document.querySelector('.save-up-label').innerHTML.split(' ')[1].slice(0, -1)); 
          var originalPrice = ((100/discountPercentage)*getPrice).toFixed(2);

          savings[i].parentElement.nextElementSibling.classList.add('fe_relative');
          savings[i].parentElement.nextElementSibling.insertAdjacentHTML('afterbegin','<div class="fe_price">'+savings[i].innerHTML[0]+originalPrice+'</div>')

          var currentPrice = savings[i].parentElement.nextSibling.querySelector('.price-num .subtext');
          currentPrice.innerHTML = '.'+currentPrice.innerHTML

        }
      }

    }

    /* Initialize variation */
    waitForElement(".feature-plan-card .saving", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
