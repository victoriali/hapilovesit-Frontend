
//---------Signup User------------
  function signupUser(username, email, password, callback) {
    $.ajax({
	    type: "POST",
	    url: "http://localhost:3000/users",
	    dataType: 'json',
	    data: {
        user: {
          username: username,
          email: email,
          password: password
        }
      },
      xhrFields: {
    		withCredentials: true
 			},
	    success: function(response){
      	console.log(response);


      	return callback(response);
	    }
		});
	};

//---------Signin User------------
	function signinUser(username, password, callback) {
    $.ajax({
	    type: "POST",
	    url: "http://localhost:3000/sessions",
	    dataType: 'json',
	    data: {
        user: {
          username: username,
          password: password
        }
      },
      xhrFields: {
  			withCredentials: true
	    },
	    success: function(response){
      	console.log(response);
      	return callback(); 
			}
		});
	};

//--------Authenticate-----------
	function authenticate(callback) {
		$.ajax({
	    type: "GET",
	    url: "http://localhost:3000/authenticated",
      xhrFields: {
  			withCredentials: true
	    },
	    success: function(response){
      	console.log(response);
      	return callback(response); 
			}
		});
	};

//--------Signout User------------
	function signoutUser(callback){
		$.ajax({
	    type: "DELETE",
	    url: "http://localhost:3000/sessions",
      xhrFields: {
  			withCredentials: true
	    },
	    success: function(response){
	      	console.log(response);
	      	return callback();
	    }
		});
	}
//--------Post Orders------------
	// function postOrder(){

	// }
//--------Get Orders-------------
	// function getOrder(){

	// }