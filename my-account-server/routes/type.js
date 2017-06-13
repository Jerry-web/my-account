var express = require('express');
var router = express.Router();

var typeDao = require('../dao/typeDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 增加用户
//TODO 同时支持get,post
router.get('/addType', function(req, res, next) {
    typeDao.add(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
    typeDao.queryAll(req, res, next);
});

router.get('/queryByFlow', function(req, res, next) {
    typeDao.queryByFlow(req, res, next);
});

router.get('/query', function(req, res, next) {
    typeDao.queryById(req, res, next);
});

router.get('/deleteType', function(req, res, next) {
    typeDao.delete(req, res, next);
});

router.post('/updateType', function(req, res, next) {
    typeDao.update(req, res, next);
});

module.exports = router;