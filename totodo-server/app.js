const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;
require('dotenv').config();

const todoRoute = require('./routes/todos');


mongoose.Promise = global.Promise;
mongoose
.connect(`mongodb+srv://marcel:marcel1234%21@totodo-uqdss.mongodb.net/test?retryWrites=true&w=majority`)
.then(
  console.log('Database is connected')
  )
  .catch(error => console.log(error));
  
const app = express();

// `http://localhost:3000`
// `https://totodo-client.herokuapp.com`

app.use(cors())

// app.use(cors({
//   origin: `https://totodo-client.herokuapp.com`
// }))

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

