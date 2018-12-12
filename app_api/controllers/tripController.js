var mongoose = require('mongoose');
var trips = mongoose.model('trips');
var comp = mongoose.model('company');
var rev = mongoose.model('reviews');
var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};
module.exports.showDetail = function(req, res) {
    if(req.params.id) {
        trips.findById(req.params.id).exec(function(err, t) {
            if(err)
                sendJsonResponse(res, 404, err);
            else
                res.render("detail.pug", {trip: t, user: req.session.user});
        })
    }
};
module.exports.getAuto = function(req, res) {
    
    trips.find({}, function(err, trip) {
        if(err) {
            sendJsonResponse(res, 404, err);
        }
        else
            sendJsonResponse(res, 200, trip);
    }).select('TripName');
}

module.exports.getTrips = function (req, res) {
    trips.find({}, function(err, trip) {
        if(err) {
            sendJsonResponse(res, 404, err);
        }
        else
            sendJsonResponse(res, 200, trip);
    });
}
module.exports.deleteTrip = function(req, res) {
    if(req.params.tid) {
        trips.findByIdAndDelete(req.params.tid).exec(function(err, trip) {
            if(err) {
                sendJsonResponse(res, 404, err);
            }
            else
                getAT(req, res);
        });
    }
}

var getAT = function(req, res) {
    trips.find({}, function(err, trip) {
        req.session.tripsList = trip;
        req.session.act = "showATrips";
        res.redirect("/dashboard");
    });
}

module.exports.setTrips = function (req, res) {
    comp.find({}, function(err, c) {
        req.session.compList = c;
    });
}

module.exports.showAddTrip = function (req, res) {
    comp.find({}, function(err, c) {
        req.session.compList = c;
        req.session.act = "addTrip";
        res.redirect("/dashboard");
    });
}
module.exports.getATrips = function(req, res) {
    getAT(req, res);
}
module.exports.addNewTrip = function (req, res) {
    comp.findOne({CompanyName: req.body.tcomp}, function(err, c) {
        if(err) {
            sendJsonResponse(res, 404, {msg: "Error!"});
        }
        else if(c) {
            trips.create({
                TripName: req.body.tname,
                Pickup: req.body.tpickup,
                Destination: req.body.tdest,
                Price: req.body.tprice,
                TotalSeats: req.body.tseats,
                Remaining: req.body.tseats,
                StartDate: req.body.tstart,
                EndDate: req.body.tend,
                TripBy: c
            }, function(err, trip) {
                if(err)
                    sendJsonResponse(res, 404, err);
                else {
                    sendJsonResponse(res, 200, {msg: "You have successfully added the trip!"});
                }
            });
        }
    });
}
module.exports.getComps = function(req, res) {
    comp.find({}, function(err, c) {
        if(err) {
            sendJsonResponse(res, 404, err);
        }
        else
            sendJsonResponse(res, 200, c);
    });
}
module.exports.showComp = function(req, res) {
    comp.find({}, function(err, c) {
        req.session.compList = c;
        req.session.act = "showCompanies";
        res.redirect("/dashboard");
    });
}
module.exports.addComp = function(req, res) {
    comp.findOne({CompanyName: req.body.cname}, function(err, c) {
        if(err)
            sendJsonResponse(res, 404, err);
        else if(!c) {
            comp.create({
                CompanyName: req.body.cname,
                Phone: req.body.cphone,
                OfficeLoc: req.body.cloc
            }, function(err, c) {
                if(err)
                    sendJsonResponse(res, 404, err);
                else {
                    sendJsonResponse(res, 200, {ch: c, msg: "You have successfully added a company!"});
                }
            });
        }
        else {
            sendJsonResponse(res, 200, {msg: "Company with that name is already registered!"})
        }
    });
}
module.exports.delComp = function(req, res) {
    comp.findByIdAndDelete(req.params.id).exec(function(err, c) {
        if(err) {
            sendJsonResponse(res, 404, err);
        }
        else if(c) {
            
            comp.find({}, function(err, c) {
                req.session.compList = c;
                req.session.act = "showCompanies";
                res.redirect("/dashboard");
            });
        }
            
    });
}

module.exports.showCompDet = function(req, res) {
    comp.findById(req.params.id).exec(function(err, c) {
        if(err) {
            sendJsonResponse(res, 404, err);
        }
        else
            res.render("company", {comp: c, user: req.session.user});
    });
}

module.exports.addReview = function(req, res) {
    if(req.session.user) {
        rev.create({
            User: req.session.user,
            Rating: req.body.rating,
            Comment: req.body.comment
        }, function(err, r) {
            if(err) {
                sendJsonResponse(res, 404, err);
            }
            else {
                comp.findById(req.params.id).exec(function(err, c) {
                    if(err) sendJsonResponse(res, 404, err);
                    else if(c) {
                        comp.update(
                            { _id: c._id }, 
                            { $push: { Reviews: r } },
                            function(err, cx) {
                                sendJsonResponse(res, 200, {msg: "Successfully given the review!", ok: 1});
                            }
                        );
                          
                    }
                    else if(!c) {
                        sendJsonResponse(res, 200, {msg: "Company not found!"});
                    }
                })
            }
        });
    }
    else {
        sendJsonResponse(res, 200, {msg: "You have to be logged in to do this!", ok: 0})
    }
}

module.exports.openFeedback = function(req, res) {
    comp.findById(req.params.id).exec(function(err, c) {
        if(err) sendJsonResponse(res, 404, err);
        else if(c) {
            res.render("feedback", {comp: c, user: req.session.user});
        }
    })
}

module.exports.book = function(req, res) {
    if(req.session.user) {
        trips.findById(req.params.id).exec(function(err, t){
            if(err) sendJsonResponse(res, 404, err);
            else if(t) {
                if(t.Remaining <= 0) {
                    sendJsonResponse(res, 200, {msg: "No more seats left, sorry!", ok: 0});
                }
                //var found = false;
                
                /*for(var i = 0; i < t.Users.length; i++) {
                    if(t.Users[i].Username == req.session.Username) {
                        found = true;
                        break;
                    }
                }
                if(found) {
                    sendJsonResponse(res, 200, {msg: "You have already booked a seat!", ok: 0});
                }*/
                else {
                    trips.findOneAndUpdate(
                        { _id: t._id}, 
                        { $push: { Users: req.session.user  }, Remaining: t.Remaining-1 },
                       function (error, success) {
                             if (error) {
                                 console.log(error);
                             } else {
                                 sendJsonResponse(res, 200, {msg: "Successfully booked a seat!", ok:1});
                             }
                         });
                    
                }
            }
        })
    }
    else {
        sendJsonResponse(res, 200, {msg: "You have to be logged in to do this!", ok: 0})
    }
}

//module.exports.getTrips = gTrips(req, res);