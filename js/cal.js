$(document).on('scroll', function(){

  var scroll = $(this).scrollTop();
  if (scroll >= 200) {
    $(".navigatorTop").addClass('navbar-solid');
  };
  if (scroll <= 200) {
    $(".navigatorTop").removeClass('navbar-solid');
  };

});