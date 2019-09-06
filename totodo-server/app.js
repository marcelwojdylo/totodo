const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;
// const publicDomain = process.env.PUBLIC_DOMAIN || 'http://localhost:3000';
const localDomain = 'http://192.168.0.111:3000/'
require('dotenv').config();

const todoRoute = require('./routes/todos');


mongoose.Promise = global.Promise;
console.log(process.env.MONGODB_URI)
mongoose
.connect(process.env.MONGODB_URI)
.then(
  console.log('Database is connected')
  )
  .catch(error => console.log(error));
  
const app = express();
  

let allowedOrigin;
if (!process.env.NODE_ENV) {
  allowedOrigin = `http://localhost:3000`
} else {
  allowedOrigin = `https://totodo-client.herokuapp.com`
}

app.use(cors({
  origin: `http://localhost:3000`
}))

app.use(bodyParser.json());
  
app.use('/api', todoRoute);

app.use((req, res) => {
  res.status(404).json({
    message: 'Item not found'
  })
})

app.use((err, req, res) => {
  //if error is in the request
  if (!res.headersSent) {
    const statusError = err.status || 500;
    res.status(statusError).json(err);
  }
})



const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});

