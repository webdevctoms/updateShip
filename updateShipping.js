function UpdateShip(shipButtonName){
	this.shippingButtons = $("input[name*=" + shipButtonName +"]");
	this.upShip = 8;
	console.log(this.shippingButtons);
	this.initButtons();
}

UpdateShip.prototype.initButtons = function(){
	
	for(let i = 0;i < this.shippingButtons.length; i++){
		this.shippingButtons[i].onclick = null;
		this.shippingButtons[i].addEventListener("click",function(e){		
			this.radioClicked(e);
		}.bind(this));
	}
}

UpdateShip.prototype.radioClicked = function(event){
	
	let value = event.currentTarget.value;
	//split by "long" dash
	let carrier = event.currentTarget.nextSibling.textContent.split("–")[0].trim();
	console.log("clicked", carrier, value);
}

let updateShip = new UpdateShip("sShipMeth");
