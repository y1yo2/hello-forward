var http = require('http');
var cheerio = require('cheerio');
var url = "http://www.imooc.com/learn/348";
//chapter  chapter-active
// [{
// 	chapterTitle : '',
// 	videos : [
// 	  {title : '',
// 	  url : ''}
// 	]
// }]

function filterMooc(html){
	var cheer = cheerio.load(html);
	var charts = cheer('.chapter');
	var courseData = [];
	var response = 	[];

	charts.each(function(index, item){
		var chapter = cheer(item);
		

		//大章
		var chapterTitle = chapter.find('strong').text();
		console.log(chapterTitle);
		var chapterResponse = {
			chapterTitle : chapterTitle,
			videos : []
		};
		//小章
		var videos = chapter.find('.video').children('li');
		videos.each((index, item) => {
			var video = cheer(item).find('.J-media-item');
			var videoTitle = video.text();
			var url = video.attr('href').split('/video')[1];
			chapterResponse.videos.push(
			  {videoTitle : videoTitle,
			   url : url}
			);
			});
			response.push(chapterResponse);
		});
		// console.log(chapterTitle);
	return response;
};

function showRes(endRes){
    endRes.forEach((item) => {
    	console.log(item.chapterTitle);
    	var videos = item.videos;
    	videos.forEach((item) => {
    		console.log(item.url + "+" + item.videoTitle);
    	});
    });
	return '';
}


var huidiao = function(res){
	var html = '';
	res.on('data', function(data){
        html += data;
	});

	res.on('end', function(){
		// console.log(html);
		var endRes = filterMooc(html);
		showRes(endRes);
	});
}

http.get(url, huidiao).on("error", function(){
	console.error("获取www.imooc.com/learn/348出错");
});





