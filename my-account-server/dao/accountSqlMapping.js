// dao/userSqlMapping.js
// CRUD SQL语句
var account = {
	insert:'INSERT INTO account(account_date, account_sum, type_id,user_id,account_remark,account_flow,member_id) VALUES(?,?,?,?,?,?,?)',
	update:'update account set account_date=?, account_sum=?,type_id=?,account_remark=? where user_id=?',
	delete: 'delete from account where account_id=?',
	queryById: 'select * from account where account_id=?',
	queryAll: function (account,pageParams) {
		var sql='select a.account_id,a.account_date,a.account_sum,t.type_name,m.member_name  from (account as a  left join account_type as t on a.type_id=t.type_id ) left join account_member as m on a.member_id=m.member_id';
        sql+=' where account_flow='+ account.account_flow;
        if(account.type_id){
            sql+=' and a.type_id='+account.type_id
        }
        if(account.member_id){
            sql += ' and a.member_id=' + account.member_id
        }
        if(account.search_range){
            var date_range=account.search_range;
            sql += " and a.account_date>='" + date_range.date_begin+"' and a.account_date<'"+ date_range.date_end+"'"
        }
        sql+=' ORDER BY a.account_date DESC';
        if(pageParams&&JSON.stringify(pageParams).length>0){
            sql+=' limit '+pageParams.showCount+' offset '+pageParams.showCount*(pageParams.currentPage-1)
        }

		return sql;
    },
    queryCount:function (account) {
        var sql=' select count(*) as count,sum(account_sum) as total from account as a ';
        sql+= ' where account_flow='+ account.account_flow
        if(account.type_id){
            sql+=' and a.type_id='+account.type_id
        }
        if(account.member_id){
            sql += ' and a.member_id=' + account.member_id
        }
        if(account.search_range){
            var date_range=account.search_range;
            sql += " and a.account_date>='" + date_range.date_begin+"' and a.account_date<'"+ date_range.date_end+"'"
        }
        return sql;
    },
    queryType:function (account) {
        var sql='select SUM(a.account_sum) as type_sum,t.type_name  from account as a left join account_type as t on a.type_id=t.type_id';
        sql+= ' where account_flow='+ account.account_flow;
        if(account.type_id){
            sql+=' and a.type_id='+account.type_id
        }
        if(account.member_id){
            sql += ' and a.member_id=' + account.member_id
        }
        if(account.search_range){
            var date_range=account.search_range;
            sql += " and a.account_date>='" + date_range.date_begin+"' and a.account_date<'"+ date_range.date_end+"'"
        }
        sql+=' GROUP BY a.type_id'
        return sql;
    },
    queryMonthOrYear:function (account,pageParams) {
	    var queryModel="'%Y-%m-%d'";
	    if(account.dateType=='year'){
            queryModel="'%Y-%m'";
        }

        var sql="select date_format(account_date, "+queryModel+") as account_date, sum(account_sum)  as account_sum from account as a ";
        sql+= ' where account_flow='+ account.account_flow
        if(account.type_id){
            sql+=' and a.type_id='+account.type_id
        }
        if(account.member_id){
            sql += ' and a.member_id=' + account.member_id
        }
        if(account.search_range){
            var date_range=account.search_range;
            sql += " and a.account_date>='" + date_range.date_begin+"' and a.account_date<'"+ date_range.date_end+"'"
        }
        sql+="group by date_format(account_date, "+queryModel+")";
        if(pageParams&&JSON.stringify(pageParams).length>0){
            sql+=' limit '+pageParams.showCount+' offset '+pageParams.showCount*(pageParams.currentPage-1)
        }
        return sql;
    },
    accountBalance:'select sum(account_sum) as sum from account where account_flow=?'

};

module.exports = account;