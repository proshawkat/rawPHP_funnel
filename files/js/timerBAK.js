var timer_base = 'https://www.dinocommerce.com/apps/timer';
var browser = ( detectmob() == true ? 'mobile' : 'pc' );

(function(){
    var loadScript = function(url, callback){
     
        var script = document.createElement("script");
        script.type = "text/javascript";

        // If the browser is Internet Explorer.
        if (script.readyState){ 
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" || script.readyState == "complete"){
                  script.onreadystatechange = null;
                  callback();
                }
            };
        // For any other browser.
        } else {
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    /* This is my app's JavaScript */
    var timerScript = function($){
        
        //get current product url
        var current_product = '';
        var current_url = window.location.href;
        if( current_url.indexOf( '/products/' ) > -1 ) {
            var br = current_url.split('/products/');
            br = br[1].split( '?' );
            br = br[0].split( '/' );
            current_product = br[0];
        }

        $( document ).ready(function( $ ){
            if( current_product != '' ) {
                $.post(          
                    timer_base + "/recommendations", 
                    { shop: Shopify.shop, browser : browser, product: current_product }
                    ).done(function( data ) {
                        if( data.html != undefined ) {
                            if( document.getElementById('product-timer-display') != null ) {
                                var element = document.getElementById('product-timer-display');
                            } else {
                                var elements = document.getElementsByTagName('form');
                                for( var i = 0; i < elements.length; i++ ) {
                                    if( elements[i].action.indexOf('/cart/add') > -1 ) {
                                        var element = elements[i];
                                        break;
                                    }
                                }
                            }

                            //insert html code
                            if( element != undefined ) {
                                element.innerHTML = data.html + element.innerHTML;
                                $("head").append('<link rel="stylesheet" href="' + timer_base + '/files/css/flipclock.css" type="text/css" />');
                                $.getScript( 'https://cdn.rawgit.com/objectivehtml/FlipClock/master/compiled/flipclock.min.js', function(){
                                    FlipClock.Lang.Custom = {
                                        days: data.counter_days_label,
                                        hours: data.counter_hours_label,
                                        minutes: data.counter_minutes_label,
                                        seconds: data.counter_seconds_label
                                    };
                                    var opts = {
                                        clockFace: 'DailyCounter',
                                        countdown: true,
                                        language: 'Custom'
                                    };
                                    var countdown = data.timer;
                                    countdown = Math.max(1, countdown);
                                    jQuery('#timer-clock-builder-output').FlipClock(countdown, opts);
                                });
                            }
                        }
                    }
                );
            }
        });

    };

    /* If jQuery has not yet been loaded or if it has but it's too old for our needs,
    we will load jQuery from the Google CDN, and when it's fully loaded, we will run
    our app's JavaScript. Set your own limits here, the sample's code below uses 1.7
    as the minimum version we are ready to use, and if the jQuery is older, we load 1.9. */
    if ((typeof jQuery === 'undefined') || (parseFloat(jQuery.fn.jquery) < 1.7)) {

        loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function(){
            jQuery8001 = jQuery.noConflict(true);
            timerScript(jQuery8001);
        });
    } else {
        loadScript( timer_base + '/files/js/flipclock.js', function(){
            timerScript(jQuery);
        });
    }

})();

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
  function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}

function detectmob() {
   if(window.innerWidth <= 800 && window.innerHeight <= 600) {
     return true;
   } else {
     return false;
   }
}