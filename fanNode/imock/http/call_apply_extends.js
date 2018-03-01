function Pet(word){
	this.word = word;
	this.speak = function(){
		console.info(this + " speak " + this.word);
	}
}

function Dog(word){
	Pet.call(this, word);
}

var dog = new Dog("dog's word");

dog.speak();