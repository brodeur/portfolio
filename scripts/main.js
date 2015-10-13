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
  
  $.getJSON("data/tools.json", function(data){
    var items = [];
    $.each(data.tools, function(key, val){
      console.log(key, val);
      items.push("<li class='tool " + val.tool_name + " " + val.tool_type + "'><span class='icon'></span><div class='info'> <a class='close-info'></a> <div class='heading clearfix'> <h2 class='left'> " + val.display_name + "<span>" + val.tool_short_description + "</span> </h2> <h2 class='right'> USED SINCE <span>" + val.used_since + "</span> </h2> </div> <div class='content'>" + val.tool_long_description + "</div> </div> </li>");
    });
    $(".points").html(items);
  });
  
});
