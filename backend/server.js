const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config({path: '.env'});

//create express server
const app = express();
const port = process.env.PORT || 5000;

//cors middleware
app.use(cors());
//allowing to pass json
app.use(express.json());

//connecting to mongodb
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useUnifiedTopology:true,useCreateIndex:true,useNewUrlParser:true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB Connection Success');
});

//tell the app to use these files
const adsRouter = require('./routes/ads');
const usersRouter = require('./routes/users');

//setiap user memasukan alamat /ads atau /users akan diteruskan ke router
app.use('/ads', adsRouter);
app.use('/users',usersRouter);

app.listen(port,()=>{
    console.log('Server is running on port:',port);
});