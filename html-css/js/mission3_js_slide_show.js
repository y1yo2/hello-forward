var imags = document.querySelector(".imags");
var wrapId = document.getElementById("wrapId");
var wrap = document.getElementsByClassName("wrap");
var leftArrow = document.getElementById("leftArrow");
var rightArrow = document.getElementById("rightArrow");
var imagsEle = imags.children;
var imagIndex = 0;
var length = imagsEle.length;
var changeTimeFlag = true;
var mouseleaveFlag = false;


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

// var timer = null;
// function autoSlide (){
// 	timer = setInterval(function(){clickSlide();}, 1000);
// }
// autoSlide();

var time = 1288;
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

leftArrow.onclick = function(){
	if (length < 0) {
		alert("no imag to slide show");
	}else{
		// leftSlide();
	}
}
rightArrow.onclick =function(){
	if (length < 0) {
		alert("no imag to slide show");
	}else{
		// clickSlide();
	}
}

function clearAllInterval(){
	console.log("clearAllInterval");
	// clearInterval(changeTimer);
	clearInterval(timer);
}
wrapId.onmouseover = function(){
	clearAllInterval();
}
wrapId.onmouseout = function(){
	mouseleaveFlag = true;
	console.log("onmouseleave");
	// autoChangeSlide();
	// autoSlideNeedTime(time);
}

var stopButton = document.getElementById("stopButton");
stopButton.onmousedown = function(event){
	console.log(event.button);
	clearAllInterval();
}


//滑动函数
var index = 0;
function autoSlide(){
	var begin=imags.offsetLeft;
	var end=index*wrapId.offsetWidth*(-1);
	var change=end-begin;
	var autoSlideTimer;
	var ingT=0;
	var maxT=30;
	autoSlideTimer=setInterval(function(){
		ingT++;
		if (ingT>maxT) {
			clearInterval(autoSlideTimer);
			if (index==length-1) {
				imags.style.left=0;
				index=0;
			}
		}else{
			imags.style.left=change/maxT*ingT+begin+"px";
		}
	},17);
}

// var rightAutoSlideTimer;
// function rightAutoSlide(){
// 	index++;
// 	autoSlide();
// }
// rightAutoSlideTimer=setInterval(function(){
// 	rightAutoSlide();
// },1000);

var leftAutoSlideTimer;
function leftAutoSlide(){
	index--;
	if (index<0) {
		index=length-2;
		imags.style.left=(index+1)*wrapId.offsetWidth*(-1)+"px";
	}
	autoSlide();
}
leftArrow.onclick = function(){
	if (length < 0) {
		alert("no imag to slide show");
	}else{
		// leftSlide();
		leftAutoSlide();
	}
}
leftAutoSlideTimer=setInterval(function(){
	leftAutoSlide();
},1000);

// function AutoGo(){
//             var start=inner.offsetLeft;//获取移动块当前的left的开始坐标
//             var end=index*Distance*(-1);//获取移动块移动结束的坐标。
//             //计算公式即当移动到第三张图片时，图片下标为2乘以图片的宽度就是块的left值。
//             var change=end-start;//偏移量

//             var timer;//用计时器为图片添加动画效果
//             var t=0;
//             var maxT=30;
//             clear();//先把按钮状态清除,再让对应按钮改变状态
//             if(index==spanList.length){
//                 spanList[0].className="selected";
//             }else{
//                 spanList[index].className="selected";
//             }
//             clearInterval(timer);//开启计时器前先把之前的清
//             timer=setInterval(function(){
//                 t++;
//                 if(t>=maxT){//当图片到达终点停止计时器
//                     clearInterval(timer);
//                     clickFlag=true;//当图片到达终点才能切换
//                 }
//                 inner.style.left=change/maxT*t+start+"px";//每个17毫秒让块移动
//                 if(index==spanList.length&&t>=maxT){
//                     inner.style.left=0;
//                     index=0;
//                     //当图片到最后一张时把它瞬间切换回第一张，由于都同一张图片不会影响效果
//                 }
//             },17);
//         }