// tooltip init for 'i' tags
$('i[data-toggle="tooltip"]').tooltip({
   animated : 'fade',
   placement : 'left',
   container: 'body'
});


// writing list of unique filters
for(f in fs){
    var el = document.createElement("li");
    el.innerHTML = fs[f];
    $('.filters').append(el);
}
