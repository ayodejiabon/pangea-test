const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongosanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');


const apperror = require('./utils/apperror');
const errorhandler = require('./controllers/errorcontroller');
const subscriber = require('./routes/subscriber');

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json({limit: '5Kb'}));

app.use(mongosanitize());

app.use(xss());

app.use('/', subscriber);

app.all('*', (req, res, next) => {
	next(new apperror(`Can't get ${req.originalUrl} on this server`, 404));
})

app.use(errorhandler);


module.exports = app;