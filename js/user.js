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
        console.log("authenticated")
        $('#cd-bg-5').show('slow');
        $('#loginGreeting').text('HI '+response.user+", YOU ARE LOGGED IN");

      }
    }
  });

	//-------------ADD ITEMS TO SHOPPING CART-----------
  var shoppingCart = {};

  $(document).on("click", '.deleteItem',function(){
    var item = $($(this).parent().siblings()[0]).text(); 

      delete shoppingCart[item];

    printingRow();

  });

  $(document).on("click", '.downItem',function(){
    var item = $($(this).parent().siblings()[0]).text(); 

    if (shoppingCart[item].quantity > 1){
      shoppingCart[item].quantity--;
    } else {
      delete shoppingCart[item];
    }

    printingRow();

  });

  $(document).on("click", '.upItem',function(){
    var item = $($(this).parent().siblings()[0]).text(); 

      shoppingCart[item].quantity++;


    printingRow();

  });


	$('.hotBotton').on("click", function(){
    var item = $(this).attr("id");
    var price = $(this).attr("value");

    if (shoppingCart[item] == undefined){
      shoppingCart[item] = {price: price, quantity: 1};
    } else {
      shoppingCart[item].quantity++;
    }
    printingRow();
	});

function printingRow(){
  $('#shoppingTable > tbody').html('');
  var totalPrice = 0;

  for (var key in shoppingCart) {
    var item = key;
    var price = shoppingCart[key].price;
    var quantity = shoppingCart[key].quantity;
    $('#shoppingBody').append('<tr><td>'+
      item+
      '</td><td>'+
      price+
      '</td><td>'+
      quantity+
      '</td><td><button class="upItem btn btn-warning">+</button><button class="downItem btn btn-warning">-</button><button class="deleteItem btn btn-danger">X</button></td></tr>');

    totalPrice += parseInt(price) * parseInt(quantity);
  }
  $('#shoppingTotal').text("Total: $"+totalPrice);

}

	//_____________END OF ADD ITEMS TO SHOPPING CART------

	//-------------GET ALL ORDERS FOR USER------------
    $.ajax({
    type: "GET",
    url: "http://localhost:3000/orders",
    xhrFields: {
      withCredentials: true
    },
    success: function(response){
      if(response.length===0){
        $('#cd-bg-5').show('slow');
      }
      if(response.length>0){
        $('.noOrder').hide();

        for(var n=0; n<response.length;n++){
          var order = '<div class="col-xs-1">'+
            n+ //response[n]['_id']+
            '</div><div class="col-xs-4">'

            var totalPrice = 0;
            for (var i = 0; i < response[n].items.length; i++){
              var item = response[n].items[i].item;
              var quantity = response[n].items[i].quantity;
              var price = response[n].items[i].price;
              order += '<div class="col-xs-12">'+quantity+' x '+item+'</div>'
              totalPrice += price * quantity;
            }

            order += '</div><div class="col-xs-2">'+
              totalPrice+
              '</div><div class="col-xs-5">'+
              response[n].orderTime+
              '</div>'
            $(order).appendTo('.orderSummary');
        }  

      }
    }
  });

//-------------POST ORDER FOR USER------------
		
		var rows = $('#shoppingTable tbody tr');
    var items = [];
    for(var i = 0; i < $('#shoppingTable tbody tr').length - 1; i++){
      var row = rows[i];
      var item = $($($(row).find('td')[0])).html();
      var price = $($($(row).find('td')[1])).html();
      var quantity = $($($(row).find('td')[2])).html();
      items.push({item: item, price: price, quantity: quantity});
    }

		$.ajax({
	    type: "POST",
	    url: "http://localhost:3000/orders",
      xhrFields: {
      withCredentials: true
      },
	    data: {
        order: {
          'items': items,
          
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
