var son = require("./son");
var daughter = require('./daughter');

son.one("fan");
daughter.one('zhu');

function add (_son, _daughters){
	son.one(_son);

	_daughters.forEach(function(item, index){
		daughter.one(item);
	})
}

exports.add = add;