
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' }, function (err, stuff){
  	 console.log(stuff);
  	 res.end(stuff)
  });
};