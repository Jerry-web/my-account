// dao/userSqlMapping.js
// CRUD SQLÓï¾ä
var account = {
	insert:'INSERT INTO account(account_date, account_sum, type_id,user_id,account_remark,account_flow,member_id) VALUES(?,?,?,?,?,?,?)',
	update:'update account set account_date=?, account_sum=?,type_id=?,account_remark=? where user_id=?',
	delete: 'delete from account where account_id=?',
	queryById: 'select * from account where account_id=?',
	queryAll: 'select a.account_id,a.account_date,a.account_sum,t.type_name,m.member_name  from (account as a left join account_type as t on a.type_id=t.type_id ) left join account_member as m on a.member_id=m.member_id'
};

module.exports = account;