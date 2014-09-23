// function to initialise tooltips for social icons
function get_tooltips(){
    $('i[data-toggle="tooltip"]').tooltip({
       animated : 'fade',
       placement : 'left',
       container: 'body'
    });
}

// 'fs' is a list of dictionaries
// dedup takes the list of dicts and merges them all into one
// removing duplicates
function dedup(fs){
    var acc = {};
    for(f in fs){$.extend(acc, fs[f])};
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
    for(var f in the_filters){
        filter_header = clean(f);
        filter_contents = clean(the_filters[f]);

        var el = $("<li>").addClass(filter_header).append(
            $("<li>").append(
                $("<a>").attr("href", "#").addClass(filter_contents)
            )
        );

        $('.filters').append(el);
        $('.filters .' + filter_header + ' li').prepend(f);
        $('.filters .' + filter_contents).html(the_filters[f]);
    }
}
