try{
  	if(jQuery('#shippingmethodtable tr').length > 0){
      jQuery('#submitter').attr('disabled',true);
      jQuery('#submitter').css('background-color','rgb(58,58,58)');
      //console.log("order apge");
    }
    //console.log(document.title);
	var costVal = jQuery.cookie("costVal");
    
	var sShip = jQuery('input:radio[name=sShipMeth]:checked').val();
    if (sShip == null){jQuery("input:radio[name=sShipMeth]:first").click();}
    else{console.log(sShip);}
    
    jQuery('#shippingmethodtable tr:gt(0)').hide();
    jQuery('#shippingmethodtable').append('<tr id="loadlbl"><td id="loadlblcol">...Loading Shipping Methods...</td></tr>');
	
    
    var totalorder = "";
  	//debugger;
	      if ((itemid!=null || itemid!='') && (qty!=null ||qty!='')) {
     jQuery.ajax({
            type: "POST",
			url: "/app/site/hosting/scriptlet.nl?script=26&deploy=1&item=" + itemid + "&qty=" + qty + "&country=" + shipcountry + "&ship=" + shipzip + "&state=" + shipstate + "&customer=" + cust,
			cache: false,
			async: true,
			dataType: "json",
            contentType: "json",
		    error: function (jqXHR, textStatus, errorThrown) {
                  //  alert("jqXHR= " + jqXHR + ", textStatus= " + textStatus + ", errorThrown= " + errorThrown)
                },
           
       		success: function (response) {
              jQuery('#submitter').attr('disabled',false);
              jQuery('#submitter').css('background-color','rgb(71, 2, 2)');
	 		debugger;
	 		if(response.Size != 0)
	 		{
	 			
	 			var data = [];
			 var selected = false;
			 
			   
			jQuery('#shippingmethodtable tr:gt(0)').hide();
			
			for(var i=0; i < response.Size; i++)
				{
	                
					var data = (response.Carrier[i]).split(":");	
					 
				  	if(data[1]==costVal)
					{
						
					 	jQuery('#shippingmethodtable').append('<tr id="shiprow'+i+'"><td id="shipcol'+i+'"><label for="shipcol'+i +'"><input type="radio" name="radGrp" onclick="setShip(\''+data[1]+'\',\''+data[0]+'\',\''+data[2]+'\');"  id="carrier' + i + '"  CHECKED value="'+data[1]+'">'+data[0]+' '+data[1]+'</label></td></tr>');
				 		
					 	setShip(data[1],data[0],data[2]);
						selected = true;
                     	//debugger;
					}
					else{
						jQuery('#shippingmethodtable').append('<tr id="shiprow'+i+'"><td id="shipcol'+i+'"><label for="shipcol'+i +'"><input type="radio" name="radGrp" onclick="setShip(\''+data[1]+'\',\''+data[0]+'\',\''+data[2]+'\');"  id="carrier' + i + '"   value="'+data[1]+'">'+data[0]+' '+data[1]+'</label></td></tr>');
				 	      //debugger;
					}   
				}
              //pick up in store option
              const pickupString = addPickup(response.Size - 1);
			  $('#shippingmethodtable').append(pickupString);
              
				if(selected==false)//No default selection
				{
					if(response.Carrier[0]!=null){
						console.log ( '#selected false and response carrier ! null' );	
  					$('#carrier0').attr('checked', true);
  					
  					data = response.Carrier[0].split(":");	
				    setShip(data[1],data[0],data[2]);
  					}
				    
				}
	 			
	 			//debugger;
			}
	 		else{ 
				//Button disabled to submit order 
				 
	 			if (jQuery('#shippingmethodtable tr').length > 0)
	 			{
					 console.log("test");
					jQuery('#submitter').attr('disabled',true);
				    jQuery('#submitter').css('background-color','rgb(58, 58, 58)');
			         
				    jQuery('#shippingmethodtable tr:gt(0)').hide();
			    	jQuery('#shippingmethodtable').append('<tr id="loadlbl"><td id="loadlblcol">Error: Check Shipping Address Details.</td></tr>');
			    	jQuery('#shippingmethodtable').append('<tr><td><input CHECKED type="radio" name="radGrp" onclick="document.location.href=\'/app/site/backend/setshipmeth.nl?c=3760720&n=1&sShipCarrier=nonups&sShipMeth=20\'; "       ></label></td></tr>');
				    jQuery("input[type=radio]").hide();
                  //debugger;
				}
	 			}
         	} 
	 });
}
}
  catch(err) {
       
        var text = "Error description: " + err.message + "\n\n";
         
        
    }
 
 
function setShip(amount,desc,ratesystem)
{
	$('#pickupMessage').remove();

	if(desc === "Pickup in Store"){
		addPickupMessage();
	}
  
 try{
 
jQuery.cookie("costVal",null,  {path: '/'});
var new1 = jQuery.cookie("costVal");
var new1 =  jQuery.cookie("costVal",amount,  {path: "/"});

jQuery('#custbody_newship').val(amount);
jQuery('#custbody_carrier').val(desc); 
jQuery('#custbody_ratesystem').val(ratesystem); 
jQuery('input[name=shiptotal]').val(amount);
 

jQuery('#ordersummary_shipping td:contains("$")').html("$"+amount);
var ship = jQuery('#ordersummary_shipping td:contains("$")').html();
if(ship.charAt(0) == '$')
	ship = ship.substring(1,ship.length-0);
var totalSO =   Number(ship)  + Number(i_itemtot)  + Number(i_tax);
jQuery('#ordersummary_total td:contains("$")').html("$"+parseFloat(totalSO).toFixed(2));
 

jQuery('input[name=shiptotal]').val(amount); 
//debugger;
}
 catch(er) {
       
        var text = "Error description: " + er.message + "\n\n";
       
    }
 
}

function setCookie(value)
{

	jQuery.cookie("costVal",value,  {path: '/'});
	jQuery.cookie("costVal");
 
}

function addPickup(arrLength){
	let rowNum = arrLength + 1;
	let pickupRowString = '<tr id="shiprow' + rowNum + '"><td id="shipcol' + rowNum + '"><label for="shipcol' + rowNum + '"><input type="radio" name="radGrp" onclick="setShip(\'0.00\',\'Pickup in Store\',\'CTOMS\');" id="carrier' + rowNum + '" value="0.00">Pick Up In Store Free</label></td></tr>';

	return pickupRowString;
}

function addPickupMessage(){
	$("#shippingmethodtable").append("<p id='pickupMessage'>CTOMS will contact you when your order is available for pickup</p>");
}