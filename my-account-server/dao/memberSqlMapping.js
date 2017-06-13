// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
	insert:'INSERT INTO account_member(member_id, member_name) VALUES(?,?)',
	update:'update account_member set member_name=? where member_id=?',
	delete: 'delete from account_member where member_id=?',
	queryById: 'select * from account_member where member_id=?',
	queryAll: 'select * from account_member'
};

module.exports = user;