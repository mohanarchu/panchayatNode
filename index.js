const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const app = express();
const port = 8000;
const userRouter = require('./routes/userRouter')
const wardRouter = require('./routes/wardRouter')
const streetRouter = require('./routes/streetRouter')
process.setMaxListeners(0);
process.on('uncaughtException', error => {
    console.log('Uncaught Exception Error', error);
});
process.on('unhandledRejection', error => {
    console.log('Unhandled Rejection Error', error);
});


const DB  = process.env.DATABASEE;
mongoose.connect(DB, { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
  }).then(() => console.log("Connection Successful"))
    .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/api/users', userRouter);
app.use('/api/ward',wardRouter);
app.use('/api/street',streetRouter);
app.listen(port, () => {
    console.log('Listening Port', port);
});