(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "";
    /* all Pure helper functions */
    function waitForElement(selector, trigger) {
      var interval = setInterval(function () {
        if (
          document &&
          document.querySelector(selector) &&
          document.querySelectorAll(selector).length > 0
        ) {
          clearInterval(interval);
          trigger();
        }
      }, 50);
      setTimeout(function () {
        clearInterval(interval);
      }, 15000);
    }

    /**wait for jquery**/
    function waitForjQuery(trigger) {
      var interval = setInterval(function () {
        if (window.jQuery !== undefined) {
          clearInterval(interval);
          trigger(window.jQuery);
        }
      }, 50);
      setTimeout(function () {
        clearInterval(interval);
      }, 15000);
    }

    //tooltip id and content
    var toolTipData = [
      {
          "_type": "_",
          "input_id": "LastName",
          "input_tooltip": "Hello this is last name"
      },
      {
          "_type": "_",
          "input_id": "FirstName",
          "input_tooltip": "this is firstname"
      },
      {
          "_type": "_",
          "input_id": "Company",
          "input_tooltip": "this is company"
      }
    ]
    

    //generate tooltip
    function generateTooltip(tooltip){
        var html =''+ 
        '  <div class="fe-tooltip-N4G4-paid">'+ 
        '      <img class="fe-tooltip-img" src="https://bm-test-dev.s3.us-east-2.amazonaws.com/FE/N4G/6/Tooltip.png">'+ 
        '      <span class="fe-show-txt" id="fe-show-txt">'+ 
        '          <p>'+tooltip+'</p>'+ 
        '      </span>'+ 
        '  </div>';
        
        return html;
    }

    //on click tooltip and overlay
    function onClickTooltip(){

      //insert tooltip overlay
      $("body").append('<div class="fe-Overlay-N4G4-paid"></div>');

      //on click  tooltip
      $(document).delegate(".fe-tooltip-N4G4-paid", "click", function () {
        $('.fe-N4G-paidshow').length && $('.fe-N4G-paidshow').removeClass('fe-N4G-paidshow');
        $("body").toggleClass("fe-tooltip-paid-show");
        $(this).parent().toggleClass('fe-N4G-paidshow');
      });

      //on click  overlay
      $(document).delegate(".fe-Overlay-N4G4-paid", "click", function () {
        $("body").removeClass("fe-tooltip-paid-show");
        $('.fe-tooltip-N4G4-paid').parent().removeClass('fe-N4G-paidshow');
      });

    }

    /* Variation Init */
    function init() {

      //tooltip
      if(toolTipData[0]){
        $.each(toolTipData, function(i, el){
          console.log(el)
          var field = $('.mktoFieldWrap input[id="'+el.input_id+'"]');
          if(field.length){
            var label = field.parent().find('label[for="'+el.input_id+'"]');
            label.append( generateTooltip( el.input_tooltip ) );
          }
        })
        onClickTooltip();
      }

   }

    /* Initialise variation */
    waitForjQuery(function(){
      $ = window.jQuery;
      waitForElement(".mktoFieldWrap input[id]", init);
    })
   
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();