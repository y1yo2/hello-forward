var c = "朱惠婷";

function printStr(){
	console.log(c);
}

function async(callback){
	setTimeout(function(){
		c += " 异步变漂亮了！！";
		callback();
	}, 3000);
	


}

async(printStr);
printStr();