// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./accountSqlMapping');

$conf.mysql.multipleStatements=true;
// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};

module.exports = {
	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;
            var user=req.session.user;
            param.user_id=user.user_id;
			// 建立连接，向表中插入值

			connection.query($sql.insert, [param.account_date, param.account_sum,param.type_id,param.user_id,param.account_remark,param.account_flow,param.member_id], function(err, result) {
				if(result) {
					result = {
						code: 0,
						msg:'增加成功'
					};    
				}
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);

				// 释放连接 
				connection.release();
			});
		});
	},
	delete: function (req, res, next) {
		// delete by Id
		pool.getConnection(function(err, connection) {
			var id = +req.query.account_id;
			connection.query($sql.delete, id, function(err, result) {
				if(result.affectedRows > 0) {
					result = {
						code: 0,
						msg:'删除成功'
					};
				} else {
					result = void 0;
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	update: function (req, res, next) {
		// update by id
		// 为了简单，要求同时传name和age两个参数
		var param = req.body;
		if(param.name == null || param.age == null || param.id == null) {
			jsonWrite(res, undefined);
			return;
		}

		pool.getConnection(function(err, connection) {
			connection.query($sql.update, [param.name, param.age, +param.id], function(err, result) {
				// 使用页面进行跳转提示
				if(result.affectedRows > 0) {
					res.render('suc', {
						result: result
					}); // 第二个参数可以直接在jade中使用
				} else {
					res.render('fail',  {
						result: result
					});
				}
				connection.release();
			});
		});

	},
	queryById: function (req, res, next) {
		var account_id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryById, account_id, function(err, result) {
				jsonWrite(res, result);
				connection.release();

			});
		});
	},
	queryAll: function (req, res, next) {
		var account=JSON.parse(req.query.accountStr);
        var user=req.session.user;
        account.user_id=user.user_id;
		var pageParams=JSON.parse(req.query.pageStr);

		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAll(account,pageParams)+';'+$sql.queryCount(account)+';'+$sql.queryType(account), function(err, result) {
                var resultData=result;
                if(result!==undefined){
                	 pageParams.totalResult=result[1][0].count;
                     resultData= {
                         accountList: result[0],
                         total: result[1][0].total,
						 accountTypeList:result[2],
                         page: pageParams,
                         code: 0
                     };
                }
				jsonWrite(res, resultData);
				connection.release();
			});
		});
	},
	queryByMonthOrYear:function (req, res, next) {
        var account=JSON.parse(req.query.accountStr);
        var user=req.session.user;
        account.user_id=user.user_id;
        var pageParams='';
        if(req.query.pageStr){
            pageParams=JSON.parse(req.query.pageStr);
		}

        pool.getConnection(function(err, connection) {
            connection.query($sql.queryMonthOrYear(account,pageParams)+';'+$sql.queryCount(account)+';'+$sql.queryType(account), function(err, result) {
                var resultData=result;
                if(result!==undefined){
                    resultData= {
                        accountList: result[0],
                        total: result[1][0]!=null?result[1][0].total:0,
                        accountTypeList:result[2],
                        page: pageParams,
                        code: 0
                    };
                }
                jsonWrite(res, resultData);
                connection.release();
            });
        });
    },
	getAccountBalance:function (req, res, next) {
        var user=req.session.user;
        pool.getConnection(function(err, connection) {
            connection.query($sql.accountBalance+';'+$sql.accountBalance,[1,user.user_id,0,user.user_id], function(err, result) {
                var resultData=result;
                if(result!==undefined){
                    resultData= {
                        accountBalance:result[0][0].sum-result[1][0].sum,
                        code: 0
                    };
                }
                jsonWrite(res, resultData);
                connection.release();
            });
        });
    }

};