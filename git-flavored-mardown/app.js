var marked = require('marked');
var fs = require('fs');
var shell = require('shelljs');

// Set default options except highlight which has no default
marked.setOptions({
	gfm: true,
	highlight: function (code, lang, callback) {
		pygmentize({ lang: lang, format: 'html' }, code, function (err, result) {
			if (err) return callback(err);
			callback(null, result.toString());
		});
	},
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	smartypants: false,
	langPrefix: 'lang-'
});

fs.readFile('README.md', function (err, data){
	if (err) throw err;
	// Using async version of marked
	marked(data.toString(), function (err, content) {
		if (err) throw err;
		console.log(content);
		html = '<!DOCTYPE html><html lang="en"><head><meta http-equiv="content-type" content="text/html; charset=UTF-8">' +
		'<link type="text/css" rel="stylesheet" href="github.css" /></head>' +
		' <body>'
		+ content  
		+ '</body></html>';
		fs.writeFile('md2html.html', html, function (err) {
		    if (err) throw err;
		    console.log('It\'s saved!\nOpening in browser...');
		    // Run external tool synchronously
		    if (shell.exec('firefox md2html.html').code !== 0) {
		      console.log('Error opening in browser');
		      exit(1);
		    }

		});
	});
});