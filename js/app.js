$(document).ready(function(){
//---------------Hide user login page at first--------------

$('#cd-bg-5').hide();

//-------------- Signup && SignIn && Authenticate Redirect-----------------
	$('#signUpButton').on("click", function(){
		//-----------------signup------------------------
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

      	//------------login--------------------
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
		      	//------------authenticated redirect------------------------
		      	$.ajax({
	    				type: "GET",
					    url: "http://localhost:3000/authenticated",
				      xhrFields: {
				  			withCredentials: true
					    },
					    success: function(response){
				      	console.log(response);
				      	console.log('authenticate');
				      	if(response.message==="Authenticated"){
				      		$('#cd-bg-5').show('slow');
				      		$('#loginGreeting').text('HI '+$('#signUpUsername').val()+", YOU ARE LOGGED IN");
									$("html, body").animate({ scrollTop: $(document).height() }, "slow");	      	
				      	}
							}
						});
						//------------end of authenticated redirect----------------------
		  		}
				});
				//---------------end of login---------------------
	    }
		});
	});
	//---------------end of signup---------------


	//--------------sign in-------------------
	$('#signInButton').on("click", function(){
		$.ajax({
	    type: "POST",
	    url: "http://localhost:3000/sessions",
	    dataType: 'json',
	    data: {
        user: {
          username: $('#signInUsername').val(),
		      password: $('#signInUserPassword').val()
        }
      },
      xhrFields: {
  			withCredentials: true
	    },
	    success: function(response){
      	console.log(response);
      	console.log('signedin');
		      	//------------authenticated redirect------------------------
	      	$.ajax({
    				type: "GET",
				    url: "http://localhost:3000/authenticated",
			      xhrFields: {
			  			withCredentials: true
				    },
				    success: function(response){
			      	if(response.message==="Authenticated"){
			      		$('#cd-bg-5').show('slow');
			      		$('#loginGreeting').text('HI '+$('#signInUsername').val()+", YOU ARE LOGGED IN");
						  	$("html, body").animate({ scrollTop: $(document).height() }, "slow");
			      	}
						  if (response.message==="Unauthenticated"){
				    		$('#warningWrongPassword').show("slow");
				    		$('#warningWrongPassword').text('Oops, wrong password. Mind trying again?');
				    	}
						}
					});
						//------------end of authenticated redirect----------------------	    
			}
	  });
	});

	//---------------Log out---------------
	$('#signOutButton').on("click", function(){
	  console.log("Hello World SignOut");
		$.ajax({
		    type: "DELETE",
		    url: "http://localhost:3000/sessions",
	      xhrFields: {
    			withCredentials: true
  	    },
		    success: function(response){
	      	console.log(response);
	      	$('#cd-bg-5').hide('slow');
		    }
		});
	});
	//------------End of Log out------------
});