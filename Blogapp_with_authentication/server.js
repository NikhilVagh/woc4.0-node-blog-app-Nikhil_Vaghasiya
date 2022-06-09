const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

const connectDB = require('./server/database/connection')

const Blogapp = express();

dotenv.config({path:'config.env'});
const PORT = process.env.PORT||8000;

//log requests
Blogapp.use(morgan('tiny'));
Blogapp.use(cookieParser());

//mongodb connection
connectDB();

//parse request to body-parser
Blogapp.use(bodyparser.urlencoded({extended:true}));

//set view engine
Blogapp.set('view engine','ejs');
//Blogapp.set('view',path.resolve(__dirname,"views/ejs"));

//load asserts
Blogapp.use('/css',express.static(path.resolve(__dirname,"asserts/css")))
//css/style.css

Blogapp.use('/img',express.static(path.resolve(__dirname,"asserts/img")))
Blogapp.use('/js',express.static(path.resolve(__dirname,"asserts/js")))

//load routers
Blogapp.use('/',require('./server/routes/router'));

Blogapp.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});