An image slider library.

@By: X. Chen
@Since: 10/20/2014


== A. Note ==

1. Assumption: banner image's width is 1000px. For different width, can adjust parameter in js file.
2. slider2.js supports 2 images. slider.js allows to add more images.
3. This does not support IE 8 and lower (disables slide animation for now).
4. Tested on Firefox, Chrome, Opera, Safari, IE 8.
5. License: Apache/BSD/MIT/GPL.


== B. Example code to use this slider library ==

-- Example 1 --

<!DOCTYPE html>
<html>
<head>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
</head>
<body>


<!-- non-IE browsers. -->
<!--[if !IE]><!-->
<link type="text/css" rel="stylesheet" href="slider/slider.css" media="all" />
<!--<![endif]-->

<!-- IE 9 and above. -->
<!--[if gte IE 9>
<link type="text/css" rel="stylesheet" href="slider/slider.css" media="all" />
<![endif]-->

<!-- IE 8 and below. -->
<!--[if lte IE 8>
<link type="text/css" rel="stylesheet" href="slider/slider_ie8.css" media="all" />
<![endif]-->

<script type="text/javascript" src="slider/slider2.js"></script>

<div id="slide1_container" class="banner">
  <div id="slide1_images">
    <img src="image/banner.png" />
    <img src="image/banner2.png" />
  </div>
  <input id="goleft" class="go_left" type="submit" name="" value="" alt="left"/>
  <input id="goright" class="go_right" type="submit" name="" value="" alt="right"/>

  <div id="slide1_controller">
  <span id="bullet1" class="select" style="right:60px;"></span>
  <span id="bullet2" style="right:30px;"></span>
  </div>
</div>
<br style="clear: both;"/>


</body>
</html>


-- Example 2. (Only shows body part) --

<!-- non-IE browsers. -->
<!--[if !IE]><!-->
<link type="text/css" rel="stylesheet" href="slider/slider.css" media="all" />
<!--<![endif]-->

<!-- IE 9 and above. -->
<!--[if gte IE 9>
<link type="text/css" rel="stylesheet" href="slider/slider.css" media="all" />
<![endif]-->

<!-- IE 8 and below. -->
<!--[if lte IE 8>
<link type="text/css" rel="stylesheet" href="slider/slider_ie8.css" media="all" />
<![endif]-->

<script type="text/javascript" src="slider/slider.js"></script>

<div id="slide1_container" class="banner">
  <div id="slide1_images">
    <img src="image/banner.png" alt=""/>
    <img src="image/banner2.png" alt=""/>
    <img src="image/banner3.png" alt=""/>
  </div>
  <input id="goleft" class="go_left" type="submit" name="" value="" alt="left"/>
  <input id="goright" class="go_right" type="submit" name="" value="" alt="right"/>

  <div id="slide1_controller"></div>
</div>
<br style="clear: both;"/>

