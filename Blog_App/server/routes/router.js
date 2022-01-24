const express= require('express');
const route = express.Router();

const services = require('../services/render')
const controller = require('../controller/controller');

/**
 * @description Root Route
 * @method GET/
 */

route.get('/',services.homeRoutes);

/**
 * @description view Route
 * @method GET/view-user
 */

 route.get('/view-user',services.view_user);

/**
 * @description add user
 * @method GET/add_user
 */

route.get('/add-user',services.add_user);

/**
 * @description for update user
 * @method GET/update_user
 */

route.get('/edit-user',services.edit_user);

//API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);

module.exports = route