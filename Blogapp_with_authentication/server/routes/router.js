const express= require('express');
const route = express.Router();

const services = require('../services/render')
const controller = require('../controller/controller');
const verify = require('../services/varifytoken');

route.get('/',(req,res)=>{
    res.cookie("jwt","");
    res.render('login');
});

route.get('/home',verify,services.homeRoutes2);

route.post('/add',verify,services.add);

route.post('/home',services.homeRoutes);

route.get('/add-admin',verify,services.add_admin);

 route.get('/view-user',verify,services.view_user);

route.get('/add-post',verify,services.add_post);

route.get('/edit-user',verify,services.edit_user);

route.get('/logout',verify,services.logout);

//API
route.post('/api/users',controller.create_user);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);

module.exports = route