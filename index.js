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



mongoose.connect(process.env.demo_db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
    mongoose.connection.once('open', res => {
        console.log('Connection Done!');
    });
    mongoose.connection.on('error', error => {
        console.log(('Connection Error!', error));
    })

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/api/users', userRouter);
app.use('/api/ward',wardRouter);
app.use('/api/street',streetRouter);
app.listen(port, () => {
    console.log('Listening Port', port);
});