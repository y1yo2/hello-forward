function callBackFunction(someThing){
	console.log(someThing)
}

function fan(callBack, someThing){
	someThing += " 非常好!!";
	callBack(someThing);
}

fan(callBackFunction, "朱惠婷");