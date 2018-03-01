var pet = {
	words : "...",
	speak : function(save){
		console.info(save + " " + this.words);
	}
}

pet.speak("speak");

var dog = {
	words : "dog's words"
}

pet.speak.call(dog, "speak");