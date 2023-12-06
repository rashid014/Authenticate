require('dotenv').config(); 
const mongoose = require('mongoose');


mongoose.set('strictQuery', true);

function connect() {
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.once('open',()=>{
  console.log('connection established successfully');
})
}

module.exports ={
  connect
};