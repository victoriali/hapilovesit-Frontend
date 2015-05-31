$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/pastboxes",
    xhrFields: {
      withCredentials: true
    },
    success: function(response){
      console.log(response);
    }
  });
}