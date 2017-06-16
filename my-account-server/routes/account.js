var express = require('express');
var router = express.Router();

var accountDao = require('../dao/accountDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 增加用户
//TODO 同时支持get,post
router.get('/addAccount', function(req, res, next) {
	accountDao.add(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
	accountDao.queryAll(req, res, next);
});

router.get('/query', function(req, res, next) {
	accountDao.queryById(req, res, next);
});

router.get('/queryByMonthOrYear', function(req, res, next) {
    accountDao.queryByMonthOrYear(req, res, next);
});

router.get('/deleteAccount', function(req, res, next) {
	accountDao.delete(req, res, next);
});

router.post('/updateAccount', function(req, res, next) {
	accountDao.update(req, res, next);
});
router.get('/getAccountBalance', function(req, res, next) {
    accountDao.getAccountBalance(req, res, next);
});

module.exports = router;