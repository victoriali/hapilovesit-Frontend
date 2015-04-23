$(document).ready(function(){
	//-------------ADD ITEMS TO SHOPPING CART-----------
	function newRow(item, price) {
		var text  = '<tr><td>'
		    text +=     item;
		    text += '  </td><td>';
		    text +=     price;
		    text += '  </td><td>';
		    text +=     1;
		    text += '</td></tr>';

		return text;
   };

	// $('.round').on("click", function(){
	// });

	//_____________END OF ADD ITEMS TO SHOPPING CART------

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

//-------------POST ORDER FOR USER------------
	$('.submitOrder').on("click", function(){
		console.log("post order");
		
		// var rows = $('#tableTitleSummary tr');
		// var items = []
		// for (var i = 0; i < rows.length; i++) {
		// 	items.push({name: rows[i], quantity: ____ })
		// };

		$.ajax({
	    type: "POST",
	    url: "http://localhost:3000/orders",
	    data: {
        order: {
           // 'items': items 
          //  	{
          //  		'name': 
	        //     'quantity': 
   			 	// 'price': 
          //  	},
          //  	{},
          //  	{}
          //  ],
          shipping: {
            FirstName: $('#sFirstName').val(),
            LastName: $('#sLastName').val(),
            Address: {
              Street: $('#sStreet').val(),
              City: $('#sCity').val(),
              Country: $('#sCountry').val(),
              State: $('#sState').val(),
              PostalCode: $('#sPostalCode').val()
            },
            Phone: $('#sPhone').val(),
          },
          billing:{
          	FirstName: $('#bFirstName').val(),
          	LastName: $('#bLastName').val(),
          	Address: {
              Street: $('#bStreet').val(),
              City: $('#bCity').val(),
              Country: $('#bCountry').val(),
              State: $('#bState').val(),
              PostalCode: $('#bPostalCode').val()
          	},
          	Phone: $('#bPhone').val()
          },
          // 'shippingMethod': 
          orderTime: Date()
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

});
