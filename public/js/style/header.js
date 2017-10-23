$(".site-wrapper").addClass('background_chicago_img');
$(".header").css('background-color','rgba(37, 36, 131, 0.61)');

var header_height = $(".header").css('height');
$(".header_blur_mask").css('height',header_height);
$(".header_blur_mask").css('background-image','url("../img/chicago_cloud_gate.jpg")');
