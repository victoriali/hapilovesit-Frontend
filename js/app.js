$(document).ready(function(){
  $('.img-zoom').hover(function() {
  		console.log("hello")
      $(this).addClass('transition');

  }, function() {
      $(this).removeClass('transition');
  });
});