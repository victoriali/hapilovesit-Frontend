$(document).ready(function(){
	//-------------GET ALL ORDERS FOR USER------------
	//-------------GET AUTHENTICATE---------------
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
    		//print all orders if any

    	}
		}
	});
	//-----------END OF GET AUTHENTICATE------------


});

//-------------POST ORDER FOR USER------------