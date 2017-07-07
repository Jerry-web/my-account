var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 增加用户
//TODO 同时支持get,post
router.get('/addUser', function(req, res, next) {
	userDao.add(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
	userDao.queryAll(req, res, next);
});

router.get('/query', function(req, res, next) {
	userDao.queryById(req, res, next);
});

router.get('/deleteUser', function(req, res, next) {
	userDao.delete(req, res, next);
});

router.post('/updateUser', function(req, res, next) {
	userDao.update(req, res, next);
});
router.post('/updatePass', function(req, res, next) {
    userDao.updatePass(req, res, next);
});
router.post('/register', function(req, res, next) {
    userDao.register(req, res, next);
});
router.post('/login', function(req, res, next) {
    userDao.login(req, res, next);
});
router.get('/logout', function(req, res, next) {
    req.session.user =null;
    res.json({code:0})
});

module.exports = router;