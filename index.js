const express = require('express');
const port = 8000;
const app = express();
const path = require('path');
const db = require('./config/mongoose');
const TODO = require('./models/TODO');

var Task = [
    {
        task : "Online Course",
        category : "College"
    },
    {
        task : "Work from Home",
        category : "Home"
    },
    {
        task : "gym",
        category : "Workout"  
    }
]

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/',function(req,res){
    console.log(__dirname);
    // res.send('<h1> Cool Your Server is running </h1>');
   TODO.find({}, function(error,tasks){
    if(error){
        console.log('Error in fetching task from db');
        return;
    }
    return res.render('home',{
        title:"Welcome to the TODO App",
        task_TODO : tasks
    });
   })
   
});

app.post('/create-task',function(req,res){
    // Task.push({
    //     task : req.body.task
    // });
    // Task.push(req.body);
    TODO.create({
        task : req.body.task,
        category : req.body.category,
        date:req.body.date
        
    },function(error,newTask){
        if(error){
            console.log('Error in creating task');
            console.log(error);
            return;
        }
        console.log('*********',newTask);
        
        res.redirect('back');
    });
    //  return res.redirect('/');
});

//using string params

// app.get('/delete-task/:task',function(req,res){
//     console.log(req.params);
//     let task = req.params.task
// });

//  
app.get('/delete-task/',function(req,res){
    console.log(req.query);
    // let task = req.query.task;
    let id = req.query.id;
    // let taskIndex = Task.findIndex(Task => Task.task == task);

    // if(taskIndex != -1){
    //     Task.splice(taskIndex,1);
    // }

    // find the task in the db using id and delete
    TODO.findByIdAndDelete(id,function(error){
        if(error){
            console.log("error in deleting an object from db",error);
            return;
        }
       
        return res.redirect('back');
    })
   
});

app.listen(port,function(error){
    if(error){
        console.log("error creating a server",error);
        return;
    }
    console.log("Yup! My server is running on a port : ",port);
});