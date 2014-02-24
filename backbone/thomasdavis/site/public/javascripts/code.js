var Router  = Backbone.Router.extend({
    routes: {
        '': 'home', //Triggers a route called home. No / in the beginning
        'new': 'newuser'
    }
});
var router = new Router();


/************ Home ****************/
var Users = Backbone.Collection.extend({
    url: '/users'
});

var ListView = Backbone.View.extend({
    el: '.page',
    render: function () {
        var userlist = new Users();
        var that = this;
        userlist.fetch({
            success: function(users){
                var templateCode = _.template($('#templ-id').html(), 
                                              {users: users.models});
                that.$el.html(templateCode);
            }
        });
    }
});
router.on('route:home', function() {
    var view = new ListView();
    view.render();
});

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


/************ New ****************/
var User = Backbone.Model.extend({
    urlRoot: '/users'
});

var NewUser = Backbone.View.extend({
    el: '.page',
    render: function() {
        var templateCode = _.template($('#edit-user').html());
        this.$el.html(templateCode);
    },
    events: {
        'submit .new-user' : 'saveUser'
    },
    saveUser: function (ev) {



 /*For Edit check if user model is passed to template() - if yes display the values in the form and add a hidden field id so that backbone sends a PUT request*/

        var obj =$(ev.currentTarget).serializeObject();
        alert('calling');
        var user = new User(),
            that = this;
        user.save(obj, {

            //if id is present (while updating) save will call PUT not POST
            success: function(data) {
                console.log(data);
            },
            error: function(err) {
                console.log('Error occured:');
                console.log(err);
            }
        });
        return false;
    }
});
    var newUserView = new NewUser();

router.on('route:newuser', function() {
    newUserView.render();
});
Backbone.history.start(); //Backbone starts listening to url. Nthing happens unless
//history is started

