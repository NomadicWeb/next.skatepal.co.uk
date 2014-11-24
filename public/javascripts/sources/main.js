// main call
jQuery(document).ready(function() {
    //if no co-ordinates are entered by the user we hide 
    //the map div and do not initialize the map
    getUrlParameter();
    if("showmap" in window ){
        loadScript();
    }
    
    $('#filter li a').on( 'click', function() {
        var container = $('#grid');
        var filterValue = $(this).attr('data-filter');
        console.log(filterValue);
        container.isotope({ filter: filterValue });
    });

    $(document).delegate( '#eng-link', 'click', function(){
        console.log("hey");
        var arabicUrl = window.location.href;
        if(arabicUrl.contains("?lang=arb" || "#?lang=arb")){
            var engUrl = arabicUrl.split("?")[0];
            window.location = engUrl;
        }
    });

    $(document).delegate('#arb-link', 'click', function(){
        console.log("clicked!!!!!!!!");
        var sPageURL = window.location.search.substring(1);
        var sURLVariable = sPageURL.split('=');
        var url = window.location.href;
        if(sURLVariable[1] != "arb"){
            url = url + '?lang=arb';
        }
        console.log("the url is " + url);
        window.location = url;
    });
});

function loadScript(url){
    if(showmap === true){
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
    else{
        document.getElementById('hide').style.display = 'none';
        }
}

function checkMap(){
    console.log("checking map");
    if(showmap == true){
        console.log("show map has a value of true");
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
            if(!written){ 
                $('#filter .' + filter_header + ' li').prepend(f);
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
    }

    // get masonry layout from isotope
    var $container = $('#grid');
    $container.imagesLoaded(function(){
        $container.isotope({
        itemSelector: '.item',
        layoutMode: 'fitRows'
        })
    });
}

function initialize_map() {
    console.log("Map being initalized");
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


function getUrlParameter(){
    var sPageURL = window.location.search.substring(1);
    var sURLVariable = sPageURL.split('=');
    console.log(sURLVariable[1]);
    
    if(sURLVariable[1] == "arb"){
        console.log("the param is arb");
        document.getElementById('eng-menu').style.display = 'none';
        document.getElementById('arab-menu').style.display = 'block';
    }

    else if(sURLVariable[1] == "eng"){
            console.log("the param is eng");

    }
}
