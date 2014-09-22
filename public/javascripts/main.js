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
    var header_li = document.createElement("li");
    var filter_link = document.createElement("a");

    header_li.innerHTML = f;       // set filter title
    filter_link.innerHTML = fs[f]; // set filter contents

    $('.filters').append(header_li).append(filter_link);

    // @todo - set the href of the 'a' to something
}
