/**
 * This javascript file is part of an image slider library.
 * This is the simplest case, when there are only 2 images.
 *
 * slider.js is made based on this file.
 *
 * @By: X. Chen
 * @Since: 10/20/2014
 */

$(document).ready(function() {
    $('.go_left').click(function(){
      var p = 0;
      if ($("#slide1_images").position().left == 0) { p = -1000; select_bullet(2); }
      else { select_bullet(1); }
      $("#slide1_images").css("transform","translateX(" + p + "px)");
    });

    $('.go_right').click(function(){
      var p = -1000;
      //alert('left: ' + $("#slide1_images").position().left);
      if ($("#slide1_images").position().left == -1000) { p = 0; select_bullet(1); }
      else { select_bullet(2); }
      $("#slide1_images").css("transform","translateX(" + p + "px)");
    });

    $('#bullet1').click(function(){
      $("#slide1_images").css("transform","translateX(0px)");
      select_bullet(1);
    });

    $('#bullet2').click(function(){
      $("#slide1_images").css("transform","translateX(-1000px)");
      select_bullet(2);
    });

    //(function() { setInterval("$('.go_right').click();", 5000);  }); // this not work.
    setInterval("$('.go_right').click();", 10000); // For automatic transformation.
});

function select_bullet(v) {
      if (v == 1) {
          $("#bullet2").removeClass("select");
          $("#bullet1").addClass("select");
      } else {
          $("#bullet1").removeClass("select");
          $("#bullet2").addClass("select");
      }
}
