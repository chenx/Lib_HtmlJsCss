/**
 * This javascript file is part of an image slider library.
 *
 * Configure: change the values below according to your needs -
 *   - slider_ct int, number of images to swap.
 *   - slider_w  px,  width of an image (each image should have equal width).
 *
 * @By: X. Chen
 * @Since: 10/20/2014
 */

$(document).ready(function() {
    // The top 4 parameters are for configuration.
    var slider_ct = 2;    // Number of images.
    var slider_w = 1000;  // Image width. unit: px.
    var slider_auto_interval = 10000; // Automatic slide interval. If <= 0, don't slide automatically. Unit: ms.
    var show_bullets = 1; // 1 - show, 0 - hide.

    // Calculation constants and parameters.
    var left_limit = 0;   // Left border.
    var right_limit = - slider_w * (slider_ct-1);  // Right border.
    var index0 = 0;       // Current position (index of current image).

    // Initialize controller bar, which consists of bullets, each representing an image.
    if (show_bullets && slider_ct > 1) {
        init_slide1_controller(slider_ct);
    }

    // When left arrow is clicked, slide left. If already at left end, rotate to right end.
    $('.go_left').click(function(){
      var p = $("#slide1_images").position().left;
      p = parseInt(p / slider_w) * slider_w; // avoid partial p if automatic slided.
      if (p >= left_limit) { p = right_limit; select_bullet( slider_ct - 1 ); }
      else { p += slider_w; select_bullet( - p/slider_w ); }
      $("#slide1_images").css("transform","translateX(" + p + "px)");
    });

    // When right arrow is clicked, slide right. If already at right end, rotate to left end.
    $('.go_right').click(function(){
      var p = $("#slide1_images").position().left;
      p = parseInt(p / slider_w) * slider_w; // avoid partial p if automatic slided.
      if (p <= right_limit) { p = left_limit; select_bullet(0); }
      else { p -= slider_w; select_bullet( - p/slider_w ); }
      $("#slide1_images").css("transform","translateX(" + p + "px)");
    });

    // If a bullet is clicked, slide to corresponding image.
    $('.bullet').click(function(){
        var index = $(this).index();
        //alert(index0 + ' -> ' + index);

        var p = - (index) * slider_w;
        $("#slide1_images").css("transform","translateX(" + p + "px)");
        index0 = index;

        clear_select();
        $(this).removeClass("bullet");
        $(this).addClass("select");
    });
    $('.select').click(function(){
        var index = $(this).index();
        //alert(index);

        var p = - (index) * slider_w;
        $("#slide1_images").css("transform","translateX(" + p + "px)");
        index0 = index;

        clear_select();
        $(this).removeClass("bullet");
        $(this).addClass("select");
    });

    // Automatic slide, starting from beginning. Interval is slider_auto_interval/1000 seconds.
    if (slider_auto_interval > 0) {
        setInterval("$('.go_right').click();", slider_auto_interval); 
        //(function() { setInterval("$('.go_right').click();", 5000);  }); // this doesn't work.
    }
});


// Initialize the controller bar.
function init_slide1_controller(slider_ct) {
    $("#slide1_controller").append('<span style="right:' + (slider_ct * 30) + 'px;" class="select"></span>');
    for (var i = 1; i < slider_ct; ++ i) {
        $("#slide1_controller").append('<span style="right:' + ((slider_ct - i) * 30) + 'px;" class="bullet"></span>');
    }
}

// Clear all bullets to non-selected mode.
function clear_select() {
    $('#slide1_controller').find('span').each(function() { 
        $(this).removeClass("select");
    });
}

// Select given bullet.
function select_bullet(index) {
    var idx = parseInt(index);
    index0 = idx; // update current index.
    //alert(idx);
    clear_select();

    $('#slide1_controller').find('span').each(function() {
        if (idx == 0) {
            $(this).addClass("select");
        }
        idx --;
    });
}

