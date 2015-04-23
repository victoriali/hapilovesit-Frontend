$(document).ready(function(){

//-------------- Signup && SignIn && Authenticate Redirect-----------------
	$('#signUpButton').on("click", function(){
		$.ajax({
	    type: "POST",
	    url: "http://localhost:3000/users",
	    dataType: 'json',
	    data: {
        user: {
          username: $('#signUpUsername').val(),
          email: $('#signUpUserEmail').val(),
          password: $('#signUpUserPassword').val()
        }
      },
      xhrFields: {
    		withCredentials: true
 			},
	    success: function(response){
	    	if (response.Error==="Username already exist"){
	    		$('#warningAlreadySignUp').show("slow");
	    		$('#warningAlreadySignUp').text('Hello '+$('#signUpUsername').val()+', you have signed up already, want to signin?')
	    	}
      	console.log(response);

      	//and also sign in using same username
	    	$.ajax({
			    type: "POST",
			    url: "http://localhost:3000/sessions",
			    dataType: 'json',
			    data: {
		        user: {
		          username: $('#signUpUsername').val(),
		          password: $('#signUpUserPassword').val()
		        }
		      },
		      xhrFields: {
	    			withCredentials: true
	  	    },
			    success: function(response){
		      	console.log(response);
		      	console.log('signedin');
		      	
		  		}
				});
	    }
		});
	});
});