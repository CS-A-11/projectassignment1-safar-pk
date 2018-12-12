/* GET home page */
var request = require("request");
var path = require("path");
var uweb = "https://safarpk.herokuapp.com/";

module.exports.index = function(req, res) {
  
  if(!req.session.user) {
    var requestOptions, path;
    requestOptions = {
      
      url:  uweb+"/api/trips/get",
      method: "GET",
      json: {}
    };
    request(requestOptions, function(err, response, body) {
      var i, data;
      data = body;
      res.render("index", {lgnMsg: req.session.lgnMsg,  tripsList: data});
      req.session.destroy();
    });
  }
  else {
      res.render("index", { 
        user: req.session.user, status: "Logged"
      });
  }
};
module.exports.about = function(req, res) {
  if(req.session.user) {
    res.render("about", { user: req.session.user, status: "Logged"});
  }
  else
    res.render("about", {});
    
};

var openDash = function(req, res) {
  if(!req.session.user) {
    res.redirect("/");
  }
  else {
    if(req.session.user.Type == "Admin") {
      res.render("dashboard", {user: req.session.user, usersList: req.session.usersList, 
        act: req.session.act, editing: req.session.editing, msg: req.session.msg, status: "Logged",
      tripsList: req.session.tripsList, compList: req.session.compList});
    }
    else {
      res.redirect("/");
    }
  }
}

module.exports.dashboard = function(req, res) {
  openDash(req, res);
}

module.exports.contact = function(req, res) {
  if(req.session.user) {
    res.render("contact", { user: req.session.user, status: "Logged"});
  }
  else
    res.render("contact", { });
};

module.exports.register = function(req, res) {
  if(req.session.user) {
    res.render("register", {user: req.session.user, status: "Logged" });
  }
  else
    res.render("register", { });
};


module.exports.travel = function(req, res) {
  if(req.session.user) {
    var requestOptions, path;
    requestOptions = {
      url: uweb+"/api/trips/get",
      method: "GET",
      json: {}
    };
    request(requestOptions, function(err, response, body) {
      var i, data;
      data = body;
      res.render("travel", { user: req.session.user, status: "Logged", tripsList: data});
    });
  }
  else
    res.render("travel", { });
};

module.exports.affiliations = function(req, res) {
  if(req.session.user) {
    res.render("affiliations", {user: req.session.user, status: "Logged"});
  }
  else
  res.render("affiliations", {});
};
