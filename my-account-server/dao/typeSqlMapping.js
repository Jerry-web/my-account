// dao/userSqlMapping.js
// CRUD SQL语句
var accountType = {
	insert:'INSERT INTO account_type(type_name, type_flow) VALUES(?,?)',
	update:'update account_type set type_name=?, type_parent=?',
	delete: 'delete from account_type where type_id=?',
	queryById: 'select * from account_type where type_id=?',
	queryAll: 'select * from account_type',
	queryByFlow: "select * from account_type where type_flow=?"

};

module.exports = accountType;