var globalVar = "global variable";

function globalFun(){
	var localVar = "local variable";
	console.info(globalVar);
	console.info(localVar);

	function localFun(){
		var innerLocalVar = "inner local variable";
		console.info();
	}
}