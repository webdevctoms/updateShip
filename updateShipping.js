function UpdateShip(shipButtonName){
	this.shippingButtons = $("input[name*=" + shipButtonName +"]");
	this.upShip = 8;
	console.log(this.shippingButtons);
	this.updatePrice();
	this.initValues();

}

UpdateShip.prototype.initValues = function(){
	
	for(let i = 0;i < this.shippingButtons.length; i++){
		if(this.shippingButtons[i].attributes.checked){
			console.log("button checked: ",this.shippingButtons[i]);
			this.setValues(this.shippingButtons[i]);
		}

	}
};

UpdateShip.prototype.setValues = function(button){
	
	//split by "long" dash
	let carrier = button.nextSibling.textContent.split("–")[0].trim();
	let price = button.nextSibling.textContent.split("–")[1].trim().replace("$","");
	let rateSystem;
	if(carrier.search(/ups/gi) !== -1){
		rateSystem = "ups";
	}
	else if(carrier.search(/fedex/gi) !== -1){
		rateSystem = "fedex";
	}
	else{
		rateSystem = "other";
	}
	console.log("clicked", carrier, price,rateSystem);
	if(price === "Free!"){
		price = 0;
	}
	this.setShip(price,carrier,rateSystem);
};

UpdateShip.prototype.updatePrice = function(){
	
	for(let i = 0;i < this.shippingButtons.length; i++){
		let splitString = this.shippingButtons[i].nextSibling.textContent.split("–");
		let currentVal = parseFloat(splitString[1].trim().replace("$",""));
		if(currentVal){
			let newVal = currentVal + this.upShip;
			let newString = splitString[0] + "– $" + newVal;
			this.shippingButtons[i].nextSibling.textContent = newString;
		}
	}
}


UpdateShip.prototype.setShip = function(amount,desc,ratesystem)
{
  
	try{

		$('#custbody_newship').val(amount);
		$('#custbody_carrier').val(desc); 
		$('#custbody_ratesystem').val(ratesystem); 
		$('input[name=shiptotal]').val(amount);
		 

		$('#ordersummary_shipping td:contains("$")').html("$"+amount);
		var ship = Number($('#ordersummary_shipping td:contains("$")').html().replace("$",""));
		var itemtot = Number($('#ordersummary_itemtotal td:contains("$")').html().replace("$",""));
		var tax = Number(0.05 * (ship + itemtot));
		$('#ordersummary_taxgst td:contains("$")').html("$"+tax.toFixed(2));
		//if(ship.charAt(0) == '$')
			//ship = ship.substring(1,ship.length-0);
		var totalSO = ship + itemtot + tax;
		console.log("ship: ",ship,typeof ship);
		console.log("itemtot: ",itemtot,typeof itemtot);
		console.log("tax: ",tax,typeof tax);
		console.log("totalSO: ",totalSO,typeof totalSO);
		$('#ordersummary_total td:contains("$")').html("$"+parseFloat(totalSO).toFixed(2));
		 

		$('input[name=shiptotal]').val(amount); 
		//debugger;
	}
	catch(er) {
       
        var text = "Error description: " + er.message + "\n\n";
        console.log(text);
       
    }
 
};


try{
	let updateShip = new UpdateShip("sShipMeth");
}

catch(er){
	console.log("error: ",er);
}

