$(document).ready(function(){
  $(".nav-item").click(function(e){
    var item = $(this).attr("item");
    $(".section").hide();
    $(item).show();
    e.preventDefault();
  });
});