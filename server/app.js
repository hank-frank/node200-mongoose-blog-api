const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// mongoose.connect('mongodb://localhost/my-blog', { useNewUrlParser: true });
mongoose.connect('mmongodb://heroku_08cbnq8b:5d5dls76lrh59vonohregjr1tv@ds021741.mlab.com:21741/heroku_08cbnq8b', { useNewUrlParser: true });
//mongodb://heroku_08cbnq8b:5d5dls76lrh59vonohregjr1tv@ds021741.mlab.com:21741/heroku_08cbnq8b
mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

app.get('/', (req, res) => { res.status(200).send() });


module.exports = app;
