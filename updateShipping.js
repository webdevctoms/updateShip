function UpdateShip(shipButtonName){
	this.shippingButtons = $("input[name*=" + shipButtonName +"]");
	console.log(this.shippingButtons);
	this.initButtons();
}

UpdateShip.prototype.initButtons = function(){
	/*
	for(let i = 0;i < this.shippingButtons.length; i++){
		console.log("button text: ",this.shippingButtons[i].nextSibling.textContent);
	}
	*/
	this.shippingButtons[0].onclick = null;
	this.shippingButtons[0].addEventListener("click",function(e){
		console.log("clicked");
	}.bind(this));
}

let updateShip = new UpdateShip("sShipMeth");
