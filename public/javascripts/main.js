// tooltip init for 'i' tags
$('i[data-toggle="tooltip"]').tooltip({
   animated : 'fade',
   placement : 'left',
   container: 'body'
});


// writing list of unique filters
for(f in fs){
    var el = document.createElement("li"); // create new 'li' element
    el.innerHTML = fs[f];                  // set filter text
    $('.filters').append(el);              // add new 'li' to 'ul'
}

// 
