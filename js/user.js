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
	$('#postpostTweet').on("click", function(){
		console.log("post tweet");
		$.ajax({
	    type: "POST",
	    url: "http://localhost:3000/orders",
	    data: {
        // tweet: {
        //   message: $('#postingTweet').val()
        // }
        order: {
          'item': {
            'name': 
            'quantity': 
          },
          'shipping': {
            'FirstName': $('#sFirstName').val()
            'LastName': $('#sLastName').val()
            'Address': {
              'Street': $('#sStreet').val()
              'City': $('#sCity').val()
              'Country': $('#sCountry').val()
              'State': $('#sState').val()
              'PostalCode': $('#sPostalCode').val()
            },
            'Phone': $('#sPhone').val()
          },
          'billing':{
          	'FirstName': $('#bLastName').val()
          	'LastName': $('#sLastName').val()
          	'Address': {
              'Street': $('#sLastName').val()
              'City': $('#sLastName').val()
              'Country': $('#sLastName').val()
              'State': $('#sLastName').val()
              'PostalCode': $('#sLastName').val()
          	},
          	'Phone': 
          }
          'shippingMethod': 
          'orderTime': Date()
        }
      },
	    dataType: 'json',
	    success: function(response){
	    	console.log("posting tweet testing");
	        var getTweetID = response._id;
	        var getTweet = $('#postingTweet').val();
	        var getAuthor= response.user_id;
	        var getRow = newRow(getTweetID, getTweet, getAuthor);
	        $(getRow).appendTo($('.tweetBody'));
	    }
	  });
	});
//-------------END OF POST ORDER FOR USER------------