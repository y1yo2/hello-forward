var imags = document.querySelector(".imags");
var wrapId = document.getElementById("wrapId");
var wrap = document.getElementsByClassName("wrap");
var imagsEle = imags.children;
var imagIndex = 0;
console.log("imags = " + imags + "\n wrapId = " + wrapId + "\n wrap = " + wrap);
console.log(imagsEle.length);
wrap[0].onclick = function(){
	var length = imagsEle.length;
	if (length < 0) {
		alert("no imag to slide show");
	}else{
		// console.log("slide");
		slideClick(length);
	}
}
function slideClick (length){
	if (imagIndex+1==length) {
		nextImag = 0;
	}else{
		nextImag = imagIndex + 1;
	}
	imagsEle[imagIndex].style.display = "none";
	imagsEle[nextImag].style.display = "inline";
	imagIndex=nextImag;
}
// imagsEle[1].style.display = "inline";
      // alert(imags);
      // wrap.onclick = function(){
      //   alter("wrap");
      // }