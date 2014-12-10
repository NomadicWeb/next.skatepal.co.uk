// main call
jQuery(document).ready(function() {
    
    //Used to check if arb param exists
    //and load arabic or english translation 
    //depending whether param exists.
    getUrlParameter();

    var lang = "arb";
    
    //Check if we page is in arabic and add
    //active class to page corresponding navbar item.
    if(is_lang(lang)){
        var currentPageName = location.pathname.split('/').slice(-1)[0];
        $('.arab-li a').each(function(){
            var hrefAttr = $(this).attr('href');
            if(currentPageName != ""){
                if(hrefAttr.indexOf(currentPageName) >= 0){
                    $(this).closest('li').addClass('active');
                }
            }
        });
    }
    
    //Only load google map API's if showmap 
    //div is not hidden.
    if("showmap" in window ){ loadScript(); }
    
    $('#filter li a').on( 'click', function() {
        var container = $('#grid');
        var filterValue = $(this).attr('data-filter');
        container.isotope({ filter: filterValue });
    });
    
    //Remove Arabic param when english link clicked
    $(document).delegate( '#eng-link', 'click', function(){
        removeArabicParam();
        //return false so that '#' is not appened to the url
        return false;
    });

    //Add arabic param to the url when the arabic link
    //is clicked.
    $(document).delegate('#arb-link', 'click', function(){
        appendArabicParam();
    });
    
    //For links that are not specific 
    //language links ie 'arb' or 'eng'
    //we need to append arb when in arabicmode
    $(document).delegate('.arb-lang a', 'click', function(){
        $(this).attr('href', $(this).attr('href') + '?lang=arb');
    });
    
    $(document).delegate('#filter a', 'click', function(){
        return false;
    });
});

// load google map API if show map div
// is in window 
function loadScript(url){
    if(showmap === true){
        initialize_map();
    }
    else{
        document.getElementById('hide').style.display = 'none';
        }
}

// function to initialise tooltips for social icons
function get_tooltips(){
    $('i[data-toggle="tooltip"]').tooltip({
       animated : 'fade',
       placement : 'left',
       container: 'body'
    });
}

// 'ds' is a list of dictionaries
// dedup takes the list of dicts and merges them all into one
// removing duplicates keys but keeping duplicate values
function dedup(ds){
  acc = {};

  for(d in ds){
    curr_dict = ds[d];
    var ks = Object.keys(curr_dict);

    for(k in ks){
      curr_key = ks[k];
      var acc_keys = Object.keys(acc);

      if(acc_keys.indexOf(curr_key) > -1){
        acc[curr_key].push(curr_dict[curr_key]);
      }else{
        acc[curr_key] = [curr_dict[curr_key]];
      }

    }
  }

  // filter duplicates in lists
  for(i in acc){
    dict = acc[i];
    dict = dict.filter( function( item, index, inputArray ) {
      return inputArray.indexOf(item) == index;
    });
    acc[i] = dict;
  }

  // done :|
  return acc;
}

// 's' is a string that contains commas and whitespace
// clean removes commas, replaces whitespace with underscores
// and brings the word to lowercase (for use as a class name)
function clean(s){
    return s.replace(/[, ]+/g, " ").replace(/\s/g, "-").toLowerCase();
}

// 'the_filters' is a unique dict which are written to the
// DOM in a nested li > li > a structure
function write_filters(the_filters){
    var ks = Object.keys(the_filters);

    for(var f in the_filters){
        filter_header = clean(f);
        var written = false;

        var el = $("<li>").addClass(filter_header)
        list_of_fs = the_filters[f];

        for(var item in list_of_fs){
            filter_contents = clean(list_of_fs[item]);
            el.append($("<li>").append(
                $("<a>").attr("href", "#").attr(
                    "data-filter", ".".concat(filter_contents)
                ).addClass(filter_contents)
            ));

            $('#filter').append(el);

            // only write the filter section header once
            if(!written){ $('#filter .' + filter_header + ' li').prepend(f);
                written = true
            }

            $('#filter .' + filter_contents).html(list_of_fs[item]);
        }
    }
}

// a percentage width string
function rwidth(min, max){
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

// create layout of items
function get_layout(min, max){
    var items = $('.item');
    for (var i = 0, l = items.length; i < l; i ++){
        var rand_width = rwidth(min, max).toString() + "%";
        var v = $(items[i]);
        v.addClass("w" + i);
        v.css("width", rand_width);
        console.log("get layout");
    }

    // get masonry layout from isotope
    var $container = $('#grid');
    $container.imagesLoaded(function(){
        $container.isotope({
        itemSelector: '.item',
        layoutMode: 'fitRows'
        })
        $(".loading-block").fadeOut();
        $(".grid-load").animate({opacity: 1});
    });
}

function initialize_map() {
    var location = new google.maps.LatLng(lat,lon);
    var mapOptions = {
        center: location,
        zoom: 12
        };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
        google.maps.event.trigger(map, 'resize');
    var marker = new google.maps.Marker({ position: location });
    marker.setMap(map);
}

// 'lang' is a language string, can be 'en' or 'arb'
// returns a Boolean, True if we are in the chosen language
// (lang='lang' in the url)
function is_lang(lang){
    if(lang === "en"){lang = undefined;}
    var sPageURL = window.location.search.substring(1);
    var sURLVariable = sPageURL.split('=');
    return sURLVariable[1] === lang;
}


function getUrlParameter(){
    var sPageURL = window.location.search.substring(1);
    var sURLVariable = sPageURL.split('=');
    
    if(sURLVariable[1] == "arb"){

        document.getElementById('eng-menu').style.display = 'none';
        document.getElementById('arab-menu').style.display = 'block';
        
        document.getElementById('eng-home-icon').style.display = 'none';
        document.getElementById('arb-home-icon').style.display = 'block';

        $('.eng-lang').addClass('hidden');
        $('.arb-lang').removeClass('hidden');
    }
}

//appends '?param=arb' if arabic language selected
function appendArabicParam(){
    var sPageURL = window.location.search.substring(1);
    var sURLVariable = sPageURL.split('=');
    var url = window.location.href;
    if(sURLVariable[1] != "arb"){
        url = url + '?lang=arb';
    }
    window.location = url;
}

//When switching from arabic to eng 
//this method will remove the 'arb'
//param
function removeArabicParam(){

    var arabicUrl = window.location.href;
    if(arabicUrl.contains("?lang=arb" || "#?lang=arb")){
        var engUrl = arabicUrl.split("?")[0];
        window.location = engUrl;
    }
}

