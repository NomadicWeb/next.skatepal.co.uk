// tooltip init for 'i' tags
$('i[data-toggle="tooltip"]').tooltip({
   animated : 'fade',
   placement : 'left',
   container: 'body'
});


// write filters to dom for Projects page
write_filters(dedup(filters));


/* UTILITY FUNCTIONS */

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

// @TODO
function write_filters(the_filters){
    fs = the_filters;
    for(var f in fs){
        filter_header = clean(f);
        filter_contents = clean(fs[f]);

        var el = $("<li>").addClass(filter_header).append(
            $("<li>").append(
                $("<a>").attr("href", "#").addClass(filter_contents)
            )
        );

        $('.filters').append(el);
        $('.filters .' + filter_header + ' li').prepend(f);
        $('.filters .' + filter_contents).html(fs[f]);
    }
}
