
var express = require('express');
var router = express.Router();
var db=require.main.require('./models/db');


router.get('/',function(req,res){
  
    res.render('open/login');
});


router.post('/',function(req,res){


   

});


router.get('/registration',function(req,res){
     
     res.render('open/registration');
});


router.post('/registration',function(req,res){
    
    var name="habib";
    var email="habib@gmail.com";
    var password="habib6093";
    var role="admin";

    console.log("insert into users(id,name,password,email,role) values (user_id.nextval,'"+name+"','"+password+"','"+email+"','"+role+"')");

    console.log("full req is: "+JSON.stringify(req.body.select));
     
    db.get.execute("insert into users (id,name,password,email,role) values (user_id.nextval,:0,:1,:2,:3)",[name,password,email,role],{ autoCommit: true },function(err,result){

       if(err)
         res.send("Error inside registration");
       else 
         res.render("login");
    });
    



    //res.send("inside registrations post");
    /*
    var id=2;
    var name=req.body.username;
    var password=req.body.password;
    var email=req.body.email;

    db.get.execute("select max(id) from users",function(err,result){

        console.log(result.rows.length);
        res.send(result.rows[0]);
    })
*/
});





module.exports=router;