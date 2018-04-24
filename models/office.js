var db=require.main.require('./models/db');

var myOffice=function(userid,callback)
{
    db.get.execute("select * from offices where id in (select office_id from users_office where user_id=(:0))",[userid],{ autoCommit: true },function(err,result){

        if(err)
        {
            callback(false);
        }
        else
        {
            callback(result);
        }
     });
     
}


var search=function(officename,callback)
{
    db.get.execute("select * from offices where name=(:0)",[officename],{ autoCommit: true },function(err,result){

        if(err)
        {
            callback(false);
        }
        else
        {
            callback(result);
        }
     });
     
}


var sendRequest=function(office_id,user_id,callback)
{

    db.get.execute("select * from offices where name=(:0)",[officename],{ autoCommit: true },function(err,result){

        if(err)
        {
            callback(false);
        }
        else
        {
            callback(result);
        }
     });
     
}



var todaysRank=function(office_id,callback)
{
    console.log(office_id);
    var todaysdate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    db.get.execute("select food_rank.id,foods.name,food_rank.vote,food_rank.office_id from foods LEFT JOIN food_rank ON foods.id = food_rank.food_id where food_rank.office_id=(:0)  and food_rank.time=(TO_DATE((:1),'yyyy-mm-dd'))",[office_id,todaysdate],{ autoCommit: true },function(err,result){

        if(err)
        {   
            console.log(err);
            callback(false);
        }
        else
        {
            callback(result);
        }
     });
}
//insert into food_votes values (1,24,(TO_DATE('2018-04-23','yyyy-mm-dd')));






var voteFood=function(food_rank_id,user_id,callback)
{

    var todaysdate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    console.log(food_rank_id);
    
    db.get.execute("BEGIN update food_rank set vote=food_rank.vote-1 where id in (select food_rank_id from food_votes where employee_id=(:0) and time=(TO_DATE((:1),'yyyy-mm-dd')));delete from food_votes where employee_id=(:2) and time=(TO_DATE((:3),'yyyy-mm-dd')); insert into food_votes values ((:4),(:5),(TO_DATE((:6),'yyyy-mm-dd')));update food_rank set food_rank.vote=food_rank.vote+1 where id=(:7);END;"
    
    ,[user_id, todaysdate , user_id, todaysdate, food_rank_id, user_id, todaysdate, food_rank_id],function(err){

       if(err)
       {
           console.log(err);
           callback(false);
       }
       else
       {
           callback(true);
       }

    });
}


var addNewFood=function(food_name,office_id,callback)
{
    var todaysdate = new Date().toJSON().slice(0,10).replace(/-/g,'/');

    console.log("food:"+food_name+"office id: "+office_id+" todays date: "+todaysdate);


    db.get.execute("DECLARE cs foods.id%type;foods_id foods.id%type; BEGIN select count(id) into cs from foods where name=(:0);  if (cs<1) then insert into foods values (food_id.nextval,(:1),0,'valid'); end if;    select id into foods_id from foods where name=(:2); insert into food_rank values ( food_rank_id.nextval,foods_id,(:3),0,'valid',(TO_DATE((:4),'yyyy-mm-dd'))); END;",
    [food_name,food_name,food_name,office_id,todaysdate],function(err){
        if(err)
        {
        console.log(err);
         callback(false);
        }
        else
         callback(true);

    });
}




var addNewOffice=function(officename,email,user_id,callback)
{
      var todaysdate = new Date().toJSON().slice(0,10).replace(/-/g,'/');

      db.get.execute("insert into offices values (office_id.nextval,(:0),(:1),1,'nai'",[officename,email],function(err,result){
         
        if(err)
        {
            console.log(err);
            callback(false);
        }
        else
        {
              db.get.execute("declare ids offices.id%type; begin select id into ids from offices where email=(:0); insert into users_office values ((:1),ids,'valid',(TO_DATE((:2),'yyyy-mm-dd'))); end;",
              [email,user_id,todaysdate],function(err,result)
                {
                      if(err)
                      {
                        console.log(err);
                        callback(false);
                      }
                      else
                      {
                        callback(true);
                      }
                });
                
        }

      });
}






module.exports.myOffice=myOffice;
module.exports.search=search;
module.exports.todaysRank=todaysRank;
module.exports.voteFood=voteFood;
module.exports.addNewFood=addNewFood;
module.exports.addNewOffice=addNewOffice;