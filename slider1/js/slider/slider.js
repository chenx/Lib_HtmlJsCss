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
    var slider_auto_interval = 10000; // Automatic slide interval (in ms). If <= 0, No automatic slide.
    var slider_show_bullets = 1; // 1 - show, 0 - hide.
    var slider_p0 = 0;    // Current position (index of current image).

    // Initialize controller bar, which consists of bullets, each representing an image.
    if (slider_show_bullets && slider_ct > 1) {
        init_slide1_controller(slider_ct);
    }

    // When left arrow is clicked, slide left. If already at left end, rotate to right end.
    $('.go_left').click(function(){
      var p = (slider_p0 == 0) ? slider_ct - 1 : slider_p0 - 1; // new position of index.
      arrow_onclick(slider_p0, p);
      slider_p0 = p;
    });

    // When right arrow is clicked, slide right. If already at right end, rotate to left end.
    $('.go_right').click(function(){
      var p = (slider_p0 == slider_ct - 1) ? 0 : slider_p0 + 1;
      arrow_onclick(slider_p0, p);
      slider_p0 = p;
    });

    // If a bullet is clicked, slide to corresponding image.
    $('.bullet').click(function(){
        //alert(slider_p0 + ' -> ' + $(this).index());
        slider_p0 = $(this).index();
        bullet_onclick(slider_p0);
    });
    $('.select').click(function(){
        var slider_p0 = $(this).index();
        bullet_onclick(slider_p0);
    });

    // Automatic slide, starting from beginning. Interval is slider_auto_interval/1000 seconds.
    if (slider_auto_interval > 0) {
        setInterval("$('.go_right').click();", slider_auto_interval); 
        //(function() { setInterval("$('.go_right').click();", 5000);  }); // this doesn't work.
    }


    function arrow_onclick(p0, p) {
        $('#slide1_controller').children('span').eq(p0).removeClass("select");
        $('#slide1_controller').children('span').eq(p).addClass("select");

        p *= - slider_w;
        $("#slide1_images").css("transform","translateX(" + p + "px)");
    }

    function bullet_onclick(p) {
        // Clear all bullets to non-selected mode.
        $('#slide1_controller').children('span').removeClass("select");

        // set current bullet class.
        $('#slide1_controller').children('span').eq(p).removeClass("bullet");
        $('#slide1_controller').children('span').eq(p).addClass("select");

        p *= - slider_w;
        $("#slide1_images").css("transform","translateX(" + p + "px)");
    }

    // Initialize the controller bar.
    function init_slide1_controller(slider_ct) {
        $("#slide1_controller").append(
            '<span style="right:' + (slider_ct * 30) + 'px;" class="select"></span>');
        for (var i = 1; i < slider_ct; ++ i) {
            $("#slide1_controller").append(
                '<span style="right:' + ((slider_ct - i) * 30) + 'px;" class="bullet"></span>');
        }
    }
});




