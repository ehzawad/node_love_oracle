
var express = require('express');
var router = express.Router();
var db=require.main.require('./models/db');
var auth=require.main.require('./models/auth');
var util = require('util');


router.get('/login',function(req,res){
  
    res.render('open/login');
});


function initialiszeSession(result,req)
 {
//     req.session.regenerate(function(err){
//         if(err)
//           res.send("Error inside session regenerate....");
//         else
//         {
         var auth={
                id:result[0],
                username:result[1],
                email:result[3],
                role:result[4],
            };
            req.session.auth=auth;
    //     }
    //  });

}



router.post('/login',function(req,res){
    var username=req.body.username;
    var password=req.body.password;

    auth.login(username,password,function(result){
        //res.send("hello "+result.rows[0][4]+"   "+Object.keys(result.rows)+"  "+util.inspect(result, false, null));
        console.log("result is: "+result);
        if(result!=false && result.length>0)
        {
            initialiszeSession(result,req);

            if(result[4]=="employee")
            {
                res.redirect('/employee');
            }
            else if(result[4]=='admin')
            {
                res.redirect('/admin');
            }
            else
            {
                res.send("Not employee  "+result[4]);
            }   
        }
        else
        {
            res.send("No user found");
        }
    });
});


router.get('/logout',function(req,res){
   req.session.destroy();
   res.redirect('/');
});


router.get('/registration',function(req,res){
     res.render('open/registration');
});






router.post('/registration',function(req,res){
    
    var name=req.body.username;
    var email=req.body.email;
    var password=req.body.password;
    var re_password=req.body.re_password;
    var role=req.body.role;

    role=role.toLowerCase();

    if(password==re_password)
    {
        auth.registration(name,email,password,role,function(result){
            if(result)
            {
                res.render('open/login');
            }
            else
            {
                res.send("problem inside post registration controller");
            }
        });
    }

});





module.exports=router;