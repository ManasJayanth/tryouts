
/*
 * GET users listing.
 */

var personalInfo = {
	name: "James Marsden",
	coverPhoto: 'images/cover.jpg',
	profilePic: "images/dp.jpg",
	age: 23,
	passion: "trolling",
	hobbies: "fooling around",
	company: "pykih"
};

exports.list = function(req, res){
  res.send(personalInfo);
};

//blog post

// recent activity

// friends

