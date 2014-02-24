
/*
 * GET users listing.
 */


var users = [{
    id:1,
    name: "John Doe",
    age: 22,
    band: 'Metallica'
},
{
    id:2,
    name: "Jane Doe",
    age: 21,
    band: "Eluveitie"
},
{
    id:3,
    name: "Santosh Kumar",
    age: 22,
    band: "Iron Maiden"
}];
exports.list = function(req, res){
  res.json(users);
};

exports.add = function (req, res) {
    var user = req.body;
    user.id = users.length;
/* Server mus generate id:
http://stackoverflow.com/questions/10790637/how-to-generate-model-ids-with-backbone-js */
    users.push(user);
    res.send(200,user) 
    /*server must return the jsonified model (http://stackoverflow.com/questions/16965065/backbone-sync-error-even-after-response-code-200)*/
};
