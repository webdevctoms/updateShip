function UpdateShip(shipButtonName){
	this.shippingButtons = $("input[name*=" + shipButtonName +"]");
	console.log(this.shippingButtons);
}

UpdateShip.prototype.initButtons = function(){
	
}

let updateShip = new UpdateShip("sShipMeth");
