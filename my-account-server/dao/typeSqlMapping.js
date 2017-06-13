// dao/userSqlMapping.js
// CRUD SQLÓï¾ä
var accountType = {
	insert:'INSERT INTO account_type(type_name, type_parent) VALUES(0,?)',
	update:'update account_type set type_name=?, type_parent=?',
	delete: 'delete from account_type where type_id=?',
	queryById: 'select * from account_type where type_id=?',
	queryAll: 'select * from account_type',
	queryByFlow: "select * from account_type where type_flow='0'"

};

module.exports = accountType;