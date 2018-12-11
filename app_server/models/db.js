var mongoose = require("mongoose");

var dburi = "mongodb://heemboss:heem4242@ds052978.mlab.com:52978/safardb";
//var dburi = 'mongodb://localhost:27017/hotels';
  mongoose.connect(dburi,  { useNewUrlParser: true });
  var mongoose_connection = mongoose.connection;
  mongoose_connection.on("connected", function() {
    console.log("Successfully Connected to MongoDB!");
  });

require('./trips');