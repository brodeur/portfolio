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
      var start_year = 1996;
      var end_year = 2016;
      var total_years = end_year - start_year;
      var years_used = val.used_since - start_year;
      var x_axis_location = 100 - ((years_used / total_years) * 100);
      var y_axis_location = 100 - val.mastery_level;
      console.log(x_axis_location, y_axis_location);
      items.push("<li class='tool " + val.tool_name + " " + val.tool_type + "' style='left: " + x_axis_location + "%; top: " + y_axis_location + "%;'><span class='icon'></span><div class='info'> <a class='close-info'></a> <div class='heading clearfix'> <h2 class='left'> " + val.display_name + "<span>" + val.tool_short_description + "</span> </h2> <h2 class='right'> USED SINCE <span>" + val.used_since + "</span> </h2> </div> <div class='content'>" + val.tool_long_description + "</div> </div> </li>");
    });
    $(".points").html(items);
  });
  
});
