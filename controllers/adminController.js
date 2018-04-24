
var express = require('express');
var router = express.Router();
var office=require.main.require('./models/office');
var auth=require.main.require('./models/auth');
var util = require('util');



router.get('/',function(req,res){
    var auth=req.session.auth;
    
    //res.render('admin/home',{username:auth.username});

    office.myOffice(auth.id,function(result)
    {
        if(result!=false)
        {
            //res.send(result);
            res.render('admin/home',{username:auth.username,offices:result.rows});
        }
        else
        {
            res.send("problem inside admin controller get my office");
        }
    });
    

});



router.get('/addnewoffice',function(req,res){

   var auth=req.session.auth;
   res.render('admin/addoffice',{username:auth.username});

});

router.get('/office/:id',function(req,res){
    var auth=req.session.auth;
    officeid=req.params.id;
    office.todaysRank(officeid,function(result){
       
        if(result!=false)
        {
            res.render('admin/offices',{username:auth.username,foods:result.rows,officeid:officeid});
        }
        else
        {
            res.send("problem inside employee controller get food rank");
        }
    });

});



router.post('/addnewoffice',function(req,res){
    var auth=req.session.auth;
    var officename=req.body.officename;
    var email=req.body.email;

    office.addNewOffice(officename,email,auth.id,function(result){
        if(result)
        {
            var auth=req.session.auth;
            res.render('admin',{username:auth.username});  
        }
        else
        {
            res.send("problem inside admincontroller addnewoffice");
        }
     
    });

  });






module.exports=router;