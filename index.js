var http=require('http');
var express=require('express');
var app=express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine','ejs');


var db=require('./models/db');
var login=require('./controllers/loginController');

/*
app.get("/",function(req,res){
  
     res.render('login');
});*/



app.use(login);

app.get('/test',function(req,res){
 res.render("test");
});

/*
app.post('/login',function(req,res){
   
   //res.send(req.body.username+"    "+req.body.password);
    var username=req.body.username;
    var password=req.body.password;


   db.get.execute("select * from users where name='"+username+"' and password='"+password+"'",function(err,result){

    //console.log(result.length+ "  "+typeof result);
    console.log(result.rows.length);
    res.send("welcome  "+result.rows[0][1]+"  Email is: "+result.rows[0][3]);
    })
 

});
*/
/*
app.get('/registration',function(req,res){
   res.render('registrations');
});

app.post('/registration',function(req,res){
    
    var id=2;
    var name=req.body.username;
    var password=req.body.password;
    var email=req.body.email;

    db.get.execute("select max(id) from users",function(err,result){

        console.log(result.rows.length);
        res.send(result.rows[0]);
    })

    
    

});
*/

/*

app.get("/",function(req,res){
   
    console.log("type inside index is: "+typeof db);
    

    db.get.execute('select * from emp',function(err,result){

        //console.log(result.length+ "  "+typeof result);
        console.log(result.rows.length);
    });


    res.send("hello there");
});


*/
`+`


var port=1337;
app.listen(port,function(){
    console.log("listening port  "+port);
});