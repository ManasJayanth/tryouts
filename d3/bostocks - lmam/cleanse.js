var fs = require('fs');

fs.readFile('output.csv', function (err, data) {
	var newfile = data.toString().replace(/\,{2,}/g, function(match){
		var repStr = ',0,';
		for(var i = 1; i <= match.length - 2; ++i){
		    repStr += '0,';
		}
		return repStr;
	});
	fs.writeFile('output2.csv', newfile, function (err) {
		if (err){
			console.log(err);
		}
		else {
			console.log('It is saved');
		}
	});
});