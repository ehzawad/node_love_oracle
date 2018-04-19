var oracledb=require('oracledb');

var con;

oracledb.getConnection(
    {
        user:'ehzawad',
        password:'ehzawad',
        connectString:'localhost/XE',
    },
    function(err,connection)
    {
        if(err)
        {
            throw err;
            console.log("database connection failed");
        }
        else
        {
            console.log("database connected");
            module.exports.get=connection;
        }
    }
);







