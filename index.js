const express = require("express");
const bodyParser = require('body-parser');
const { body, validationResult,matchedData } = require('express-validator');
//const { matchedData, sanitizeBody } = require('express-validator');
//const { body } = require('express-validator');

const { urlencoded } = require("body-parser");
const app = express();
app.use('/status',express.static('public'));                                //to use public files such as css, images in our project
                                                                            //  '/static' is used in the above line to confuse the user that the path is diverted

app.set('view engine','twig');
app.set('views','./public/views');

// create application/json parser
var jsonParser = bodyParser.json();

//create application /x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extended: false});


app.get("/",(req,res)=>{
      
       res.render('index',{title: "Login Form",message: "Enter Username and password"});
   
     });  
   
app.post('/login',urlencodedParser,function(req,res){
   res.send('welcome' + req.body.username);
});

app.post('/',urlencodedParser,[ 
   body('username','Username should be Email Id').trim().isEmail(), 
   body('password','Password contains atleast 5 characters').trim().isLength({min:5}),
   body('cpassword').custom((value,{req})=>{
      if(value != req.body.password){
         throw new Error('confirm password not matched password');
      }
      else{
         return true;
      }
   })

], (req,res)=>{
   const errors = validationResult(req);
   console.log(errors.mapped());
   if(!errors.isEmpty()){
      const user = matchedData(req);
   res.render('index',{title: "User Details", error: errors.mapped(), user:user});
   }
   else{
     const user = matchedData(req);
     console.log(user);
   res.render('login',{title: "User Details", user:user});
   }
});


/*..............................................................................................................................................*/

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
 
// // parse application/json
// app.use(bodyParser.json())
                                                                            
//  app.get("/",(req,res)=>{
      
//     res.render('index',{title: "Login Form",message: "Enter Username and password"});

//  });     
 
//  app.post("/",(req,res)=>{
      
//    res.render('login',{title: "User Details",username: req.body.username,password: req.body.password});

// });  


 
//  app.get("/about/:a-:b",(req,res)=>{
      
//    res.render('about',{title: "About", sum: parseInt(req.params.a) + parseInt(req.params.b),
//    sub: parseInt(req.params.a) - parseInt(req.params.b),  mul: parseInt(req.params.a) * parseInt(req.params.b)});

// });      

/*.............................................................................................................................................*/
// app.get("/",(req,res)=>{                                                
//     res.sendFile(__dirname+ "/index.html");
// });

    
// app.get("/users/:id",(req,res)=>{                                  //to print id on console
//         console.log(req.params);
//     res.send("Users page Deployed World");
// });


// app.post("/users/profile",(req,res)=>{                        //post method gives output on response from url
//     res.send("profile page Deployed World");
// });


// app.get("/content/:id",(req,res)=>{                                //to print id on browser

//    res.send("Content page Deployed World: "+ req.params.id);
// });


// app.get("/name/:id/age/:ageid",(req,res)=>{                        //to print double parameter with id 

//     res.send("name age page Deployed World: Name  "+ req.params.id+" age "+req.params.ageid);
// });

    

// app.get("/default/:id?",(req,res)=>{                                //to print on browser where id is optional

//      res.send("default page Deployed World: "+ req.params.id);
// });


// app.get("/ifelse/:id?",(req,res)=>{                                //to print on browser where id is optional using loop output is changed
//         if(req.params.id == undefined)
//         {
//             res.send(" all ifelse page Deployed World ");
//         }
//         else{
//             res.send(" ifelse page Deployed World: " + req.params.id);
//         }
            
// });


// app.get("/flights/:From?-:To?",(req,res)=>{                                //to print on browser where '-' is used to create from-to function 
                
//        console.log(req.params);
//        res.send("search for flights: "+ "From: " +req.params.From+" To: "+req.params.To)
//  });



//  app.get("/flights/:From?.:To?",(req,res)=>{                                //to print on browser where '.' is used to create from.to function
                
//         console.log(req.params);
//         res.send("search for flights: "+ "From: " +req.params.From+" To: "+req.params.To)
//  });


//  app.get("/ab?cd",(req,res)=>{                                                //  ? parameter is used
//     res.send("this is route parameter with '?' character which match 'abcd' and 'acd'");
// });


// app.get("/ab+cd",(req,res)=>{                                                //  + parameter is used
//     res.send("this is route parameter with '?' character which match 'abcd', 'abbcd','abbbcd', etc");
// });

// app.get("/ab*cd",(req,res)=>{                                                //  * parameter is used
//     res.send("this is route parameter with '*' character the value of star can be anything  character which match 'ab6cd','ab87hcd' etc "+ req.params[0]);
// });

// app.get(/.*fly$/,(req,res)=>{                                
//     res.send("it is running");
// });



app.listen(9000,()=>console.log("Server is Running on port : 9000"));