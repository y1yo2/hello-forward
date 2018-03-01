// var pet = {
// 	words : "...",
// 	speak : function(){
// 		console.info(this.words);
// 		console.info(this == pet)
// 	}
// }

// pet.speak();

// function pet(words){
// 	this.words = words

// 	// console.info(this.words);

// 	console.info( "this == global:" + (this==global));
// }

// pet("...");

function pet(words){
	this.words = words;
	this.speak = function(){
		console.info(this.words);
		console.info(this);
	}
}

var cat = new pet("miao");

cat.speak();