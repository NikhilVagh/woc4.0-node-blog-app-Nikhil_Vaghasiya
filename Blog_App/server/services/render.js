const axios = require('axios');


exports.homeRoutes = (req,res)=>{
    // make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index', { users : response.data});
        })
        .catch(err=>{
            res.send(err);
        })
}

exports.view_user = (req,res)=>{
    // make a get request to /api/users
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(response){
            res.render('view', { user : response.data});
        })
        .catch(err=>{
            res.send(err);
        })
}

exports.add_user = (req,res)=>{
    res.render('new_post');
}

exports.edit_user = (req,res)=>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("edit_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}