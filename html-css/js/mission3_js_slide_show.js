// var imags = document.querySelector(".imags");
var imagss = document.getElementsByClassName("imags");
var imags = imagss[0];
var wrapId = document.getElementById("wrapId");
var wrap = document.getElementsByClassName("wrap");
var leftArrow = document.getElementById("leftArrow");
var rightArrow = document.getElementById("rightArrow");
var buttonss = document.getElementsByClassName("buttons");
var buttons = buttonss[0];
var buttonsEle = buttons.children;
var buttonLength = buttonsEle.length;
var imagsEle = imags.children;
var imagIndex = 0;
var length = imagsEle.length;
var changeTimeFlag = true;
var mouseleaveFlag = false;
var autoSlideTimeFlag = true;


function clickSlide (){
	if (imagIndex+1==length) {
		nextImag = 0;
	}else{
		nextImag = imagIndex + 1;
	}
	imagsEle[imagIndex].style.display = "none";
	imagsEle[nextImag].style.display = "inline";
	imagIndex=nextImag;
	if (nextImag == 0) {
		changeTimeFlag = true;
	}
}

function leftSlide(){
	if (imagIndex==0) {
		nextImag = length-1;
	}else{
		nextImag = imagIndex - 1;
	}
	imagsEle[imagIndex].style.display = "none";
	imagsEle[nextImag].style.display = "inline";
	imagIndex=nextImag;
	if (nextImag == length-1) {
		changeTimeFlag = false;
	}
}

var time = 2222;
var timer = null;
function autoSlideNeedTime (time){
	console.log("slideShow");
	timer = setInterval(function(){clickSlide();}, time);
}
// var changeTimer = null;
// function autoChangeSlide (){
// 	changeTimer = setInterval(function(){
// 		if (changeTimeFlag&&time>-150) {
// 			clearInterval(timer);
// 			autoSlideNeedTime(time);
// 			if (time>-150) {
// 				time = time - 265;
// 				console.log("fast+" + time);
// 			}
// 			changeTimeFlag = false;
// 			if (time<-200) {
// 				time = -200;
// 			}
// 		}
// 		if (mouseleaveFlag) {autoSlideNeedTime(time);mouseleaveFlag=false;}
// 	},200);
// }
// autoChangeSlide();
// autoSlideNeedTime(time);

function clearAllInterval(){
	console.log("clearAllInterval");
	// clearInterval(changeTimer);
	clearInterval(timer);
	clearInterval(leftAutoSlideTimer);
	clearInterval(rightAutoSlideTimer);
}

//滑动函数
var index = 0;
function autoSlide(){
	console.info("index:"+index);
	var begin=imags.offsetLeft;
	var end=index*wrapId.offsetWidth*(-1);
	var change=end-begin;
	var autoSlideTimer;
	var ingT=0;
	var maxT=30;
	// 限制滑动完后才能继续滑动
	autoSlideTimeFlag=false;
	//按钮
	clearButtons();
	changeButtons(index);
	//开始滑动
	autoSlideTimer=setInterval(function(){
		ingT++;
		if (ingT>maxT) {
			clearInterval(autoSlideTimer);
			if (index==length-1) {
				imags.style.left=0;
				index=0;
			}
			autoSlideTimeFlag=true;
		}else{
			imags.style.left=change/maxT*ingT+begin+"px";
		}
	},17);
}

// 改变按钮状态
function changeButtons(index){
	//index:
	if (index==buttonLength) {
		buttonsEle[0].className="selected";
	}else{
		buttonsEle[index].className="selected";
	}
	
}
//清除页面所有按钮状态颜色
function clearButtons(){ 
	for(var i=0;i<buttonLength;i++){ 
		buttonsEle[i].className=""; 
	} 
} 


// 右滑动
var rightAutoSlideTimer;
function rightAutoSlide(){
	if (autoSlideTimeFlag) {
		index++;
		autoSlide();
	}
}

// 左滑动
var leftAutoSlideTimer;
function leftAutoSlide(){
	if (autoSlideTimeFlag) {
		index--;
		if (index<0) {
			index=length-2;
			imags.style.left=(index+1)*wrapId.offsetWidth*(-1)+"px";
		}
		autoSlide();
	}
}

//事件
rightAutoSlideTimer=setInterval(function(){
	rightAutoSlide();
},time);
leftArrow.onclick = function(){
	if (length < 0) {
		alert("no imag to slide show");
	}else{
		// leftSlide();
		leftAutoSlide();
	}
}
rightArrow.onclick = function(){
	if (length < 0) {
		alert("no imag to slide show");
	}else{
		// clickSlide();
		rightAutoSlide();
	}
}
wrapId.onmouseover = function(){
	clearAllInterval();
}
wrapId.onmouseout = function(){
	mouseleaveFlag = true;
	console.log("onmouseleave");
	// autoChangeSlide();
	// autoSlideNeedTime(time);
	if (autoSlideTimeFlag) {
		rightAutoSlideTimer=setInterval(function(){
			rightAutoSlide();
		},time);
	}
}

var stopButton = document.getElementById("stopButton");
stopButton.onmousedown = function(event){
	// console.log(event.button);
	clearAllInterval();
}
for (var i = 0;i<buttonLength;i++) {
	buttonsEle[i].onclick = function(){
		if (autoSlideTimeFlag) {
			index = this.innerText - 1;
			autoSlide();
		}
	}
}
// leftAutoSlideTimer=setInterval(function(){
// 	leftAutoSlide();
// },time);
