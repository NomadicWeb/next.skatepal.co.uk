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
};

// 's' is a string that contains commas and whitespace
// clean removes commas, replaces whitespace with underscores
// and brings the word to lowercase (for use as a class name)
function clean(s){
    return s.replace(/[, ]+/g, " ").replace(/\s/g, "_").toLowerCase();
}

// 'the_filters' is a unique dict which are written to the
// DOM in a nested li > li > a structure
function write_filters(the_filters){
    for(var f in the_filters){
        filter_header = clean(f);
        filter_contents = clean(the_filters[f]);

        var el = $("<li>").addClass(filter_header).append(
            $("<li>").append(
                $("<a>").attr("href", "#").addClass(filter_contents)
            )
        );

        $('#filter').append(el);
        $('#filter .' + filter_header + ' li').prepend(f);
        $('#filter .' + filter_contents).html(the_filters[f]);
    }
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
