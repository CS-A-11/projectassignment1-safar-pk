var express = require("express");
var router = express.Router();
var ctrlMain = require("../controllers/main");
 //saved in "other js" folder

/* GET home page. */
router.get("/", ctrlMain.index);    
router.get("/about/", ctrlMain.about);
router.get("/contact/", ctrlMain.contact);
router.get("/register/", ctrlMain.register);
router.get("/travel/", ctrlMain.travel);
router.get("/affiliations/", ctrlMain.affiliations)
router.get("/dashboard", ctrlMain.dashboard);

module.exports = router;
