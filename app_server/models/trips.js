var mongoose= require('mongoose');

var userSchema = new mongoose.Schema({
	Username: String,
    Name: String,
    Gender: String,
	Address: String,
	Age: Number,
	Password: String,
	Type: String
});
mongoose.model('users', userSchema);



var reviewSchema = new mongoose.Schema({
    User: userSchema,
    Rating: Number,
    Comment: String
});
mongoose.model('reviews', reviewSchema);

var companySchema = new mongoose.Schema({
    CompanyName: String,
    Phone: String,
    OfficeLoc: String,
    Reviews: [reviewSchema]
});
mongoose.model('company', companySchema);

var tripSchema = new mongoose.Schema({
    TripName: String,
    Pickup: String,
    Destination: String,
	Price: Number,
	TotalSeats: Number,
    Remaining: Number,
    StartDate: Date,
    EndDate: Date,
    TripBy: companySchema,
    Users: [userSchema]
});
mongoose.model('trips', tripSchema);