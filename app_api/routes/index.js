var express = require('express');
var router = express.Router();
var userFuncs = require('../controllers/userController');
var tripFuncs = require('../controllers/tripController');
router.post('/users', userFuncs.userCreate);
router.post('/login', userFuncs.attemptLogin);
router.get('/logout', userFuncs.logout);
router.get('/users', userFuncs.getUsers);
router.get('/users/gets', userFuncs.getAllUsers);
router.get('/users/:uid', userFuncs.showAndEdit);
router.post('/edituser', userFuncs.editUser);

router.get('/trips/getall', tripFuncs.getATrips);
router.get('/trips/get', tripFuncs.getTrips);
router.get('/trips/getauto', tripFuncs.getAuto);
router.get('/trips', tripFuncs.showAddTrip);
router.post('/trips/add', tripFuncs.addNewTrip);
router.get('/trips/delete/:tid', tripFuncs.deleteTrip);
router.get('/trips/:id', tripFuncs.showDetail)

router.get('/company/get', tripFuncs.getComps);
router.get('/company/show', tripFuncs.showComp);
router.post('/company/add', tripFuncs.addComp);
router.get('/company/delete/:id', tripFuncs.delComp);
router.get('/company/:id', tripFuncs.showCompDet);

router.post('/review/:id', tripFuncs.addReview);
module.exports = router;