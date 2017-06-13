var express = require('express');
var router = express.Router();

var memberDao = require('../dao/memberDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 增加用户
//TODO 同时支持get,post
router.get('/addMember', function(req, res, next) {
    memberDao.add(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
    memberDao.queryAll(req, res, next);
});

router.get('/query', function(req, res, next) {
    memberDao.queryById(req, res, next);
});

router.get('/deleteMember', function(req, res, next) {
    memberDao.delete(req, res, next);
});

router.post('/updateMember', function(req, res, next) {
    memberDao.update(req, res, next);
});

module.exports = router;