$(document).ready(function(){

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
        $('#loginGreeting').text('HI '+response.user+", YOU ARE LOGGED IN");

      }
    }
  });

	//-------------ADD ITEMS TO SHOPPING CART-----------
  var shoppingCart = {};
  // var shoppingCart = { 
  //   month: {
  //     price: 14, quantity: 1
  //   },
  //   week: {
  //     price: 15, quantity: 1
  //   }
  // }
	$('.hotBotton').on("click", function(){
    var item = $(this).attr("id");
    var price = $(this).attr("value");

    if (shoppingCart[item] == undefined){
      shoppingCart[item] = {price: price, quantity: 1};
    } else {
      shoppingCart[item].quantity++;
    }

    $('#shoppingTable > tbody').html('');

    var totalPrice = 0;

    for (var key in shoppingCart) {
      var item = key;
      var price = shoppingCart[key].price;
      var quantity = shoppingCart[key].quantity;
      $('#shoppingBody').append('<tr><td>'+item+'</td><td>'+price+'</td><td>'+quantity+'</td><td><button class="deleteItem btn btn-danger">X</button></td></tr>');
      totalPrice += parseInt(price) * parseInt(quantity);
    }

    // $('.deleteItem').on("click", function(){
    //   var price = $($($(this).parent().siblings())[1]).text();
    //   var quantity = $($($(this).parent().siblings())[2]).text();

    //   shoppingCart

    //   // if (shoppingCart[item].quantity > 1){
    //   //   shoppingCart[item].quantity--;
    //   // } else {
    //   //   delete shoppingCart[item];
    //   // }
    // });
    $('#shoppingTotal').text("Total: $"+totalPrice);
	});

	//_____________END OF ADD ITEMS TO SHOPPING CART------

	//-------------GET ALL ORDERS FOR USER------------
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/orders",
    xhrFields: {
      withCredentials: true
    },
    success: function(response){
      console.log(response);

      if(response.length === 0){
        $('#cd-bg-5').show('slow');
        $('.hvOrder').hide();
      }
      if(response.length > 0){
        $('.noOrder').hide();
        $('.hvOrder').show();
        
      }
    }
  });

//-------------POST ORDER FOR USER------------
	$('.submitOrder').on("click", function(){
		console.log("post order");
		
		var rows = $('#shoppingTable tbody tr');
    var items = [];
    for(var i = 0; i < $('#shoppingTable tbody tr').length - 1; i++){
      var row = rows[i];
      var item = $($($(row).find('td')[0])).html();
      var price = $($($(row).find('td')[1])).html();
      var quantity = $($($(row).find('td')[2])).html();
      items.push({item: item, price: price, quantity: quantity});
    }
    console.log(items);

		$.ajax({
	    type: "POST",
	    url: "http://localhost:3000/orders",
      xhrFields: {
      withCredentials: true
      },
	    data: {
        order: {
          'items': items,
          // shipping: {
          //   FirstName: $('#sFirstName').val(),
          //   LastName: $('#sLastName').val(),
          //   Address: {
          //     Street: $('#sStreet').val(),
          //     City: $('#sCity').val(),
          //     Country: $('#sCountry').val(),
          //     State: $('#sState').val(),
          //     PostalCode: $('#sPostalCode').val()
          //   },
          //   Phone: $('#sPhone').val(),
          // },
          // billing:{
          // 	FirstName: $('#bFirstName').val(),
          // 	LastName: $('#bLastName').val(),
          // 	Address: {
          //     Street: $('#bStreet').val(),
          //     City: $('#bCity').val(),
          //     Country: $('#bCountry').val(),
          //     State: $('#bState').val(),
          //     PostalCode: $('#bPostalCode').val()
          // 	},
          // 	Phone: $('#bPhone').val()
          // },
          shippingMethod: $('input[name=optradio]:checked').attr('value'),
          orderTime: Date()
        }
      },
	    dataType: 'json',
	    success: function(response){
        console.log("success", response);

	    }
	  });
	});
	//-------------END OF POST ORDER FOR USER------------

});
