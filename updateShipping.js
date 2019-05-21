function UpdateShip(shipButtonName){
	this.shippingButtons = $("input[name*=" + shipButtonName +"]");
	this.upShip = 8;
	console.log(this.shippingButtons);
	this.updatePrice();
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

UpdateShip.prototype.radioClicked = function(event){
	
	let value = event.currentTarget.value;
	//split by "long" dash
	let carrier = event.currentTarget.nextSibling.textContent.split("–")[0].trim();
	console.log("clicked", carrier, value);
}

let updateShip = new UpdateShip("sShipMeth");
