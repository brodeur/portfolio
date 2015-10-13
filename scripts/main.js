$(document).ready(function(){
  $(".nav-item").click(function(e){
    var item = $(this).attr("item");
    $(".section").hide();
    $(item).show();
    e.preventDefault();
  });
  $(".filter-toggle").click(function(){
    var filter = $(this).attr("filter");
    console.log(filter);
    $("." + filter).toggleClass("hidden");
    $(this).toggleClass("disabled");
  });
});