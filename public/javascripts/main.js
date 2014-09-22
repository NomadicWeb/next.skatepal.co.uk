// tooltip init for 'i' tags
$('i[data-toggle="tooltip"]').tooltip({
   animated : 'fade',
   placement : 'left',
   container: 'body'
});

// merge project dicts and remove duplicates
fs = $.extend(fs[0], fs[1]);

// writing list of unique filters
for(var f in fs){
    filter_section = f.replace(" ", "_").toLowerCase();
    filter_contents = fs[f].replace(/\s/g, "_").toLowerCase().replace(",", "");

    var el = $("<li>").addClass("filter_section_" + filter_section).append(
        $("<li>").append(
            $("<a>").attr("href", "#").addClass("filter_contents_" + filter_contents)
        )
    );

    $('.filters').append(el);
    $('.filters .filter_section_' + filter_section + ' li').prepend(f);
    $('.filters .filter_contents_' + filter_contents).html(fs[f]);
}
