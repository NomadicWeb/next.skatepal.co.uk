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
    return s.replace(/[, ]+/g, " ").replace(/\s/g, "_").toLowerCase();
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
                    "data-group", list_of_fs[item]
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

// masonry call
function get_masonry(min, max, options){
    // masonry item stuff
    // give each item a different class name
    var items = $('.item');
    console.log(filters.length);
    for (var i = 0, l = items.length; i < l; i ++){
        var rand_width = rwidth(min, max).toString() + "%";
        var v = $(items[i]);
        v.addClass("w" + i);
        v.css("width", rand_width);
    }

    // masonry init
    var container = document.querySelector('#grid');
    var msnry = new Masonry( container, {
        // options
        columnWidth: options["columnwidth"],
        gutter: options["gutter"],
        itemSelector: '.item'
    });
}

// Shuffle filtering
// @TODO - needs to be called if on a page which requires filtering
$(document).ready(function() {
    var $grid = $('#grid');

    $('#filter li a').click(function (e) {
        e.preventDefault();
        $('#filter li a').removeClass('active');
        $(this).addClass('active');
        var groupName = $(this).attr('data-group');
        $grid.shuffle('shuffle', groupName );
    });
});

