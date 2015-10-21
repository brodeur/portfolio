$(document).ready(function(){
  $(".portfolio").fullpage({
    anchors : ['intro', 'story', 'skills', 'tools'],
    controlArrows: false
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
      items.push("<li class='tool " + val.tool_name + " " + val.tool_type + "' style='left: " + x_axis_location + "%; top: " + y_axis_location + "%;'><span class='icon'></span><div class='info'> <a class='close-info'></a> <div class='heading clearfix'> <h2 class='left'> " + val.display_name + "<span>" + val.tool_short_description + "</span> </h2> <h2 class='right'> USED SINCE <span>" + Math.floor(val.used_since) + "</span> </h2> </div> <div class='content'>" + val.tool_long_description + "</div> </div> </li>");
    });
    $(".points").html(items);
  });
  
  $(".unicorn-horn").click(function(){
    $(".black-unicorn, .intro-content").addClass("zoomOut");
    $(".cloud").fadeOut();
    $(".close-email").fadeIn();
    $(".unicorn-email-thread").fadeIn();
    $(".unicorn-email-bg, .close-email, .close-email-wrapper").addClass("block");
    $(".intro .wrapper").addClass("email-opened");
    $(".unicorn-email-bg, .close-email .orange-btn").click(function(e){
      $(".cloud").fadeIn();
      $(".close-email").fadeOut();
      $(".black-unicorn, .intro-content").removeClass("zoomOut");
      $(".unicorn-email-thread").fadeOut();
      $(".unicorn-email-bg, .close-email-wrapper").removeClass("block");
      $(".intro .wrapper").removeClass("email-opened");
      $.fn.fullpage.reBuild();
    });
    $.fn.fullpage.reBuild();
  });
});
