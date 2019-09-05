const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;
// const publicDomain = process.env.PUBLIC_DOMAIN || 'http://localhost:3000';
const localDomain = 'http://192.168.0.111:3000/'
require('dotenv').config();


const app = express();

mongoose.Promise = global.Promise;
mongoose
.connect(process.env.MONGODB_URI)
.then(
console.log('Database is connected')
)
.catch(error => console.log(error));

const todoRoute = require('./routes/todos');

app.use(bodyParser.json());
app.use(cors({
  credentials: true,
  origin: process.env.PUBLIC_DOMAIN
}));

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

