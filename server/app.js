
var express = require('express');
var path = require('path');
const mongoose=require('mongoose');
var cookieParser = require('cookie-parser');
const cors=require('cors')
const db =require('./Config/db')
const authRoutes=require('./Routes/userRoutes')


var app = express();
port=4000

app.use(cors())

app.use('/',authRoutes)

app.use(express.json());
app.use(cookieParser());

async function startApp() {
    try {
  
    db.connect()
      app.listen(port, () => {
        console.log(`Server is up and running at ${port}`);
      });
     
  
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1);
    }
  }
  
  startApp()

module.exports = app;
