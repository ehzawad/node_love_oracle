var db=require.main.require('./models/db');
var hash=require('password-hash');

var login=function(username,password,callback)
{
    db.get.execute("select * from users where name=(:0)",[username],{ autoCommit: true },function(err,result){
        if(err)
        {
            callback(false);
        }
        else
        {
            var found=false;

            //console.log("username: "+username+"  password: "+password);
            //console.log("result is: "+hash.verify(password,result.rows[0][2]));

           for(var i=0;i<result.rows.length;i++)
           { 
            //console.log("result isd: "+hash.verify(password,result.rows[i][2]));
            // console.log(result.rows[i][2]);
             if(hash.verify(password,result.rows[i][2]))
             {
               found=true;
               callback(result.rows[i]);
               break;
             }
           }
           if(found==false)
            callback(result);

        }
     });
}



var registration=function(name,email,password,role,callback)
{
    password=hash.generate(password);

    db.get.execute("insert into users (id,name,email,password,role) values (user_id.nextval,:0,:1,:2,:3)",[name,email,password,role],{ autoCommit: true },function(err,result){

        if(err)
        {
            callback(false);
        }
        else
        {
            callback(true);
        }
     });
     
}



module.exports.login=login;
module.exports.registration=registration;
