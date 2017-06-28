// dao/userSqlMapping.js
// CRUD SQL语句
var accountType = {
	insert:'INSERT INTO account_type(type_name, type_flow,user_id) VALUES(?,?,?)',
	update:'update account_type set type_name=?, type_parent=?',
	delete: 'delete from account_type where type_id=?',
	queryById: 'select * from account_type where type_id=?',
	queryAll:function (type,pageParams) {
        var sql='select type_id,type_name,type_flow from account_type ';
        sql+=' where user_id='+ type.user_id;
        if(type.type_id){
            sql+=' and type_id='+type.type_id;
        }
        if(type.type_name){
            sql+=' and type_name='+type.type_name;
        }
        if(type.type_flow){
            sql+=' and type_flow='+type.type_flow
        }

        if(pageParams&&JSON.stringify(pageParams).length>0){
            var pageParam=JSON.parse(pageParams);
            sql+=' limit '+pageParam.showCount+' offset '+pageParam.showCount*(pageParam.currentPage-1)
        }
        return sql;
    },
    queryCount:function (type) {
        var sql='select count(*) as count from account_type ';
        sql+=' where user_id='+ type.user_id;
        if(type.type_id){
            sql+=' and type_id='+type.type_id;
        }
        if(type.type_name){
            sql+=' and type_name='+type.type_name;
        }
        if(type.type_flow){
            sql+=' and type_flow='+type.type_flow
        }
        return sql;
    },
	queryByFlow: "select * from account_type where type_flow=?"

};

module.exports = accountType;