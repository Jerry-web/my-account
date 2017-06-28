// dao/userSqlMapping.js
// CRUD SQL���
var user = {
	insert:'INSERT INTO account_member( member_name,user_id) VALUES(?,?)',
	update:'update account_member set member_name=? where member_id=?',
	delete: 'delete from account_member where member_id=?',
	queryById: 'select * from account_member where member_id=?',
	queryAll:  function (member,pageParams) {
        var sql='select member_id,member_name,user_id from account_member ';
        sql+=' where user_id='+ member.user_id;
        if(member.member_id){
            sql+=' and member_id='+member.member_id
        }
        if(member.member_name){
            sql+=' and member_name='+member.member_name
        }
        if(pageParams&&JSON.stringify(pageParams).length>0){
        	var pageParam=JSON.parse(pageParams);
            sql+=' limit '+pageParam.showCount+' offset '+pageParam.showCount*(pageParam.currentPage-1)
        }
        return sql;
    }
};

module.exports = user;