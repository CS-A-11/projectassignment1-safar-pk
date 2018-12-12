var mongoose = require('mongoose');
var user = mongoose.model('users');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};
module.exports.editUser = function(req, res) {
	if(req.body.action == "remove") {
		user.findByIdAndRemove(req.body.id, function(err, data)
		{
			if(!err){
				sendJsonResponse(res, 200, {msg: "You have successfully deleted the user"});
				
			}
			else
				sendJsonResponse(res, 404, err);
		});
	}
	else if(req.body.action == "editname") {
		user.findByIdAndUpdate(req.body.id, {Name: req.body.newval}, function(err, usr) {
			if(err) {
				sendJsonResponse(res, 404, err);
			}
			else {
				sendJsonResponse(res, 200, {ch: req.body.newval, msg: "You have successfully updated the name of user"});
				/*req.session.editing.Name = req.body.newval;
				req.session.msg = ;
				getUserList(req, res);*/
			}
		});
	}
	else if(req.body.action == "editpass") {
		user.findByIdAndUpdate(req.body.id, {Password: req.body.newval}, function(err, usr) {
			if(err) {
				sendJsonResponse(res, 404, err);
			}
			else {
				sendJsonResponse(res, 200, {ch: req.body.newval, msg: "You have successfully updated the password of user"});
				
			}
		});
	}
	else if(req.body.action == "editaddr") {
		user.findByIdAndUpdate(req.body.id, {Address: req.body.newval}, function(err, usr) {
			if(err) {
				sendJsonResponse(res, 404, err);
			}
			else {
				sendJsonResponse(res, 200, {ch: req.body.newval, msg: "You have successfully updated the address of user"});
			}
		});
	}
}

var getUserList = function(req, res) {
	user.find({}, function (err, users) {
		if(err) {
            sendJsonResponse(res, 404, err);
        }
        else {
			req.session.usersList = users;
			res.redirect("/dashboard");
		}
    });
}

module.exports.getAllUsers = function(req, res) {
	user.find({}, function(err, u) {
		if(err) sendJsonResponse(res, 404, err);
		else sendJsonResponse(res, 200, u);
	})
}

module.exports.getUsers = function(req, res) {
	req.session.act = "showUsers";
	req.session.editing = null;
	getUserList(req, res);
}
module.exports.showAndEdit = function(req, res) {
	user.findById(req.params.uid).exec(function (err, usr) {
		req.session.act = "editUser";
		req.session.editing = usr;
		res.redirect("/dashboard");
    });
}
module.exports.logout = function(req, res) {
	if(req.session.user) {
		req.session.destroy();
	}
	res.redirect("/");
}
module.exports.attemptLogin = function(req, res) {
	var done = 0;
	user
	.find({Username: req.body.uname, Password: req.body.pass}, function(err, usr) {
		if(err) {
			res.send("Error!");
		}
		if(!usr.length) {
			sendJsonResponse(res, 200, {msg: "You have entered invalid password!", ok: 0});
		}
		else {
			var c = usr[0].Type;
			if(c == "Admin") {
				req.session.user = usr[0];
				sendJsonResponse(res, 200, {msg: "Successful", ok: 1});
			}
			else if(c == "User") {
				req.session.user = usr[0];
				sendJsonResponse(res, 200, {msg: "Successful", ok: 2});
			}
		}
		
	});
	
}
module.exports.userCreate = function (req, res) { 
	var userType = "User";
	user.findOne({Username: req.body.uname}, function(err, u) {
		if(err)
			sendJsonResponse(res, 404, err);
		else if(u) {
			sendJsonResponse(res, 200, {msg: "User already exists with that username!", ok: 0});
		}
		else if(!u) {
			if(req.body.passreg == "iadmin") {
				userType = "Admin";
			}
			user.create({
				Username: req.body.unamereg,
				Name: req.body.name,
				Gender: req.body.gender,
				Address: req.body.addr,
				Age: req.body.age,
				Password: req.body.passreg,
				Type: userType}, function(err, usr) {
					sendJsonResponse(res, 200, {msg: "You have successfully registered!", ok: 1});
			});
		}
	})
};