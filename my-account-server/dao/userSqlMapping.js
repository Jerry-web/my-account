// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
	insert:'INSERT INTO account_user( user_name, user_age,user_phone,user_email,user_password) VALUES(?,?,?,?,?)',
	update:'update account_user set user_name=?, user_age=?,user_phone=?,user_email=? where user_id=?',
	updatePass:'update account_user set user_password=? where user_id=?',
	delete: 'delete from account_user where user_id=?',
	queryById: 'select * from account_user where user_id=?',
	queryAll: 'select * from account_user',
	login:'select *,count(*) as count from account_user where user_name=? and user_password=?'
};

module.exports = user;