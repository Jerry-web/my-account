// dao/userSqlMapping.js
// CRUD SQL语句
var account = {
	insert:'INSERT INTO account(account_date, account_sum, type_id,user_id,account_remark,account_flow,member_id) VALUES(?,?,?,?,?,?,?)',
	update:'update account set account_date=?, account_sum=?,type_id=?,account_remark=? where user_id=?',
	delete: 'delete from account where account_id=?',
	queryById: 'select * from account where account_id=?',
	queryAll: function (account,pageParams) {
		var sql='select a.account_id,a.account_date,a.account_sum,t.type_name,m.member_name  from (account as a  left join account_type as t on a.type_id=t.type_id ) left join account_member as m on a.member_id=m.member_id';
        var conditionSql=""
        if(account.type_id){
            conditionSql+=' a.type_id='+account.type_id
        }
        if(account.member_id){
            if(conditionSql.length>0) {
                conditionSql += ' and a.member_id=' + account.member_id
            }else {
                conditionSql += ' a.member_id=' + account.member_id
			}
        }
        if(account.search_range){
            var date_range=account.search_range;
            if(conditionSql.length>0) {
                conditionSql += " and a.account_date>='" + date_range.date_begin+"' and a.account_date<'"+ date_range.date_end+"'"
            }else {
                conditionSql += " a.account_date>='" + date_range.date_begin+"' and a.account_date<'"+ date_range.date_end+"'"
            }
        }
		if(conditionSql.length>0){
        	sql+=' where'+conditionSql
		}
        if(pageParams&&JSON.stringify(pageParams).length>0){
            sql+=' limit '+pageParams.showCount+' offset '+pageParams.showCount*(pageParams.currentPage-1)
        }
        console.log(sql)
		return sql;
    },
    queryCount:function (account) {
        var sql=' select count(*) as count,sum(account_sum) as total from account as a';
        var conditionSql=""
        if(account.type_id){
            conditionSql+=' a.type_id='+account.type_id
        }
        if(account.member_id){
            if(conditionSql.length>0) {
                conditionSql += ' and a.member_id=' + account.member_id
            }else {
                conditionSql += ' a.member_id=' + account.member_id
            }
        }
        if(account.search_range){
            var date_range=account.search_range;
            if(conditionSql.length>0) {
                conditionSql += " and a.account_date>='" + date_range.date_begin+"' and a.account_date<'"+ date_range.date_end+"'"
            }else {
                conditionSql += " a.account_date>='" + date_range.date_begin+"' and a.account_date<'"+ date_range.date_end+"'"
            }
        }
        if(conditionSql.length>0){
            sql+=' where'+conditionSql
        }
        return sql;
    },
    queryType:function (account) {
        var sql='select SUM(a.account_sum) as type_sum,t.type_name  from account as a left join account_type as t on a.type_id=t.type_id';
        var conditionSql=""
        if(account.type_id){
            conditionSql+=' a.type_id='+account.type_id
        }
        if(account.member_id){
            if(conditionSql.length>0) {
                conditionSql += ' and a.member_id=' + account.member_id
            }else {
                conditionSql += ' a.member_id=' + account.member_id
            }
        }
        if(account.search_range){
            var date_range=account.search_range;
            if(conditionSql.length>0) {
                conditionSql += " and a.account_date>='" + date_range.date_begin+"' and a.account_date<'"+ date_range.date_end+"'"
            }else {
                conditionSql += " a.account_date>='" + date_range.date_begin+"' and a.account_date<'"+ date_range.date_end+"'"
            }
        }
        if(conditionSql.length>0){
            sql+=' where'+conditionSql
        }
        return sql+' GROUP BY a.type_id';
    },
    queryMonth: "select date_format(account_date, '%Y-%m') as date_day, sum(account_sum)  as day_sum from account where account_date>? and account_date<? and group by date_format(account_date, '%Y-%m')"

};

module.exports = account;