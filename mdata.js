const express = require("express");
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Pushpendra_1:Pushpendra1@cluster0.olypp.mongodb.net/test',{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
var conn=mongoose.connection;
var employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    etype: String,
    hourlyrate: Number,
    totalHour: Number,
    total: Number,

});

employeeSchema.methods.totalSalary=function(){
    return this.hourlyrate* this.totalHour;
};

var employeeModel = mongoose.model('Employee', employeeSchema);
var employees = new employeeModel({
    name: 'shyam',
    email: 'shyam2306@gmail.com',
    etype: 'e',
    hourlyrate: 30,
    totalHour: 20,
});

employees.total = employees.totalSalary();
conn.on("connected",function(){
    console.log("connected Successfully");
})

conn.on("disconnected",function(){
    console.log("disconnected Successfully");
})

conn.on('error',console.error.bind(console,'connection error:'));
conn.once('open',function(){
   employees.save(function(err,res){           //for inserting data
    if(err) throw error;
    console.log(res);
    conn.close();
   });

   //employeeModel.find({},function(err,data){   //to find or print all data in database

    //if(err) throw error;
    //console.log(data);
    //conn.close();

   //});

   //employeeModel.findOne({},function(err,data){    //to print only first value

    //if(err) throw error;
   // console.log(data);
   // conn.close();

   //});

   //employeeModel.findById({_id: "5f8448ca8489c663ec71f7ec"},function(err,data){    //to print value of the specified id

    //if(err) throw error;
    //console.log(data);
    //conn.close();

  // });

   //employeeModel.find({name:"shiva"},function(err,data){    //to print value by specifying any column value

    //if(err) throw error;
    //console.log(data);
    //conn.close();

   //});

   //employeeModel.findByIdAndUpdate({_id: "5f8baa3ebdb2a5512002d01c"},{totalHour:200},function(err,data){    //to update a value by using its id 

    //if(err) throw error;
   // console.log(data);
   // conn.close();

   //});

   //employeeModel.findOneAndUpdate({name:"shiva"},{totalHour:400},function(err,data){    //to update a value by using its any column value

    //if(err) throw error;
    //console.log(data);
   // conn.close();

  // });

 // employeeModel.findOneAndUpdate({name:"shiva"},{total:20*400},function(err,data){    //to update a value by using its column value with arithmatic operations 

   // if(err) throw error;
   // console.log(data);
    //conn.close();

  //});

   //employeeModel.findOneAndDelete({name:"ram"},{totalHour:200},function(err,data){    //to delete a value by using its any column value

   // if(err) throw error;
    //console.log(data);
    //conn.close();

   //});

   //employeeModel.findOne({name:"ram"},function(err,data){    //to see the value that is deleted now as null

    //if(err) throw error;
    //console.log(data);
    //conn.close();

   //});
});

