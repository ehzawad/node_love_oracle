
var express = require('express');
var router = express.Router();
var office=require.main.require('./models/office');
var auth=require.main.require('./models/auth');
var util = require('util');



router.get('/',function(req,res){
    var auth=req.session.auth;
    
    office.myOffice(auth.id,function(result)
    {
        if(result!=false)
        {
            //res.send(result);
            res.render('employee/office',{username:auth.username,offices:result.rows});
        }
        else
        {
            res.send("problem inside employee controller get my office");
        }
    });

});




router.get('/addoffice',function(req,res){
     var auth=req.session.auth;
     res.render('employee/add_office',{username:auth.username});
});


router.post('/addoffice',function(req,res){
   
    officename=req.body.officename;

    office.search(officename,function(result){
           if(result!=false)
           {
                if(result.rows.length>0)
                {
                    result=result.rows[0];
                    res.render('employee/message',{username:auth.username,message:"Request has sent to "+officename+" for approval"});
                    //office.sendRequest(result);
                    //res.redirect('/employee');
                    //res.send("company found: "+result[0][1]);
                }
                else{
                    res.render('employee/message',{username:auth.username,message:"Compnay not found,may be they aren't registerd yet"});
                }
            }
            else
            {
                res.send("error inside employeecontroller office search");
            }
    });
});







router.get('/office/:id',function(req,res){
    var auth=req.session.auth;
    officeid=req.params.id;
    office.todaysRank(officeid,function(result){
       
        if(result!=false)
        {
            res.render('employee/food_voting',{username:auth.username,foods:result.rows,officeid:officeid});
        }
        else
        {
            res.send("problem inside employee controller get food rank");
        }
    });

});
//


router.post('/vote',function(req,res){
    var auth=req.session.auth;
    var food_rank_id=req.body.foodrankid;
    var officeid=req.body.officeid;

    console.log("food rank id: "+food_rank_id);

    office.voteFood(food_rank_id,auth.id,function(result){
        if(result)
        {
           res.redirect('/employee/office/'+officeid);
        }
        else
        {
            res.send("error inside employeecontroller vote");
        }
    });
});







router.post('/addnewfood',function(req,res){
    var auth=req.session.auth;
    //var food_rank_id=req.body.foodrankid;
    var officeid=req.body.officeid;
    var foodname=req.body.foodname;

    //console.log("food rank id: "+food_rank_id);

    office.addNewFood(foodname,officeid,function(result){
        if(result)
        {
           res.redirect('/employee/office/'+officeid);
        }
        else
        {
            res.send("error inside employeecontroller addnewfood");
        }
    });
});









module.exports=router;