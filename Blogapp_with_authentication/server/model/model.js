const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

var schema1 = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    date:{
        type:String,
        required:true,
    },

    url:{
        type:String,
        required:true,
    },

    des:{
        type:String,
        required:true,
    },

    user_name:{
        type:String,
        required:true,
    }
});

var schema2 = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true,
    },

    pass:{
        type:String,
        required:true,
        unique:true,
    },

    role:{
        type:String,
        default:"user",
        required:true,
    }
});

const Userdb1 = mongoose.model('userdb1',schema1);
const Userdb2 = mongoose.model('userdb2',schema2);

module.exports = {Userdb1, Userdb2};