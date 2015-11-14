$(document).ready(function(){
  
  contact = "aaronb";
  
  $(".contact-me").attr("href", "mailto:" + contact + "@gmail.com");
  $(".contact-me").html(contact + "@gmail.com");
  
  stop_animating = false;

  $(".portfolio").fullpage({
    anchors : ['intro', 'story', 'skills', 'tools'],
    controlArrows: false
  });
  
  $(".filter-toggle").click(function(){
    var filter = $(this).attr("filter");
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
      var quadrant;
      
      if (x_axis_location > 50) {
        quadrant = "right";
      } else {
        quadrant = "left";
      }
      
      if (y_axis_location < 50) {
        quadrant = quadrant + "top";
      } else {
        quadrant = quadrant + "bottom";
      }
      
      items.push("<li class='tool " + val.tool_name + " " + val.tool_type + "' style='left: " + x_axis_location + "%; top: " + y_axis_location + "%;'><span class='icon'></span><div class='info " + quadrant + "'> <a class='close-info'></a> <div class='heading clearfix'> <h2 class='left'> " + val.display_name + "<span>" + val.tool_short_description + "</span> </h2> <h2 class='right'> USED SINCE <span>" + Math.floor(val.used_since) + "</span> </h2> </div> <div class='content'>" + val.tool_long_description + "</div> </div> </li>");
    });
    
    $(".points").html(items);
  
  });

  var samples = $(".work-samples");

  $.each(samples, function(key,value){

    var slideshow_id = $(value).attr("slideshow-id");
    var slides = $(value).children("ul").children("li");

    $.each(slides, function(key, value){
      slide_id = $(value).attr("slide-id");
      work_image = $(value).children("img");
      $(".work-samples-menu[slideshow-id='" + slideshow_id + "']").append("<li><a slide-id='" + slide_id + "'></a></li>");
    });

    $(".time-period[data-anchor='" + slideshow_id + "'] .left a.slideshow-link[slide-id='first'], .story.slideshow-links[slideshow-id='" + slideshow_id + "'] a[slide-id='first'], .work-samples-menu[slideshow-id='" + slideshow_id + "'] a[slide-id='first'], .work-samples[slideshow-id='" + slideshow_id + "'] li[slide-id='first']").addClass("selected");

    function selectNext() {
      
      slide_interval = 8000;
      number_of_slides = $(".work-samples[slideshow-id='" + slideshow_id + "'] li").length;
      current_slide = 0;

      var slide_loop = setInterval(function(){
        if (!stop_animating) {
          $(".work-samples-menu[slideshow-id='" + slideshow_id + "'] a.selected, .story.slideshow-links[slideshow-id='" + slideshow_id + "'] a.selected, .work-samples[slideshow-id='" + slideshow_id + "'] li.selected").removeClass("selected");
  
          if (current_slide == number_of_slides -1) {
            current_slide = 0;
          } else {
            current_slide++;
          }
  
          $(".work-samples[slideshow-id='" + slideshow_id + "'] li").eq(current_slide).addClass("selected");
          currently_selected = $(".work-samples[slideshow-id='" + slideshow_id + "'] li").eq(current_slide).attr("slide-id");
  
          $(".time-period[data-anchor='" + slideshow_id + "'] .left a.slideshow-link[slide-id='" + currently_selected + "'], .story.slideshow-links[slideshow-id='" + slideshow_id + "'] a[slide-id='" + currently_selected + "'], .work-samples-menu[slideshow-id='" + slideshow_id + "'] a[slide-id='" + currently_selected + "'], .work-samples[slideshow-id='" + slideshow_id + "'] li[slide-id='" + currently_selected + "']").addClass("selected");
        }
      }, slide_interval);
    }

    selectNext();

  });
  
  $(".work-samples-menu a, a.slideshow-link").click(function(){
    stop_animating = true;
    var slideshow_id = $(this).parents(".slideshow-links").attr("slideshow-id");
    var slide_id = $(this).attr("slide-id");
    $(".work-samples-menu[slideshow-id='" + slideshow_id + "'] a.selected, .story.slideshow-links[slideshow-id='" + slideshow_id + "'] a.selected, .work-samples[slideshow-id='" + slideshow_id + "'] li.selected").removeClass("selected");
    $(".time-period[data-anchor='" + slideshow_id + "'] .left a.slideshow-link[slide-id='" + slide_id + "'], .story.slideshow-links[slideshow-id='" + slideshow_id + "'] a[slide-id='" + slide_id + "'], .work-samples-menu[slideshow-id='" + slideshow_id + "'] a[slide-id='" + slide_id + "'], .work-samples[slideshow-id='" + slideshow_id + "'] li[slide-id='" + slide_id + "']").addClass("selected");
  });
  
  $(window).bind("hashchange", function(){
    stop_animating = false;
  });
});
