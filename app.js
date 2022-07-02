var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotEnv = require('dotenv').config()
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require('cors')
var app = express();
var config = require('./utils/config')
var doctorRoute = require('./routes/doctor')
var patientRoute = require('./routes/patient')
var appointmentRoute = require('./routes/appointment')
var categoryRoute = require('./routes/category')
var chatRoute = require('./routes/chat')

var AuthRoute = require('./routes/auth')
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose')
const PATIENT = require('./models/patient')
const CATEGORY = require('./models/category')
const DOCTOR = require('./models/doctor')
const NOTIFICATION = require('./models/notification')
const APPOINTMENT = require('./models/appointment')
const CHAT = require('./models/chat')

AdminJS.registerAdapter(AdminJSMongoose)

const adminJs = new AdminJS({
  databases: [],
  resources: [PATIENT, CATEGORY, DOCTOR, NOTIFICATION, APPOINTMENT, CHAT],
  rootPath: '/admin',
  branding: {
    companyName: 'A25 App',
    logo: "",
    softwareBrothers: false
  },
})

const router = AdminJSExpress.buildRouter(adminJs)
const { errorHandler } = require('./utils/error');
// view engine setup
var whitelist = [config.frontend_URL, "http://localhost:8000"]
app.use(cors({ cors: whitelist }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//! start to add crud 
app.use(adminJs.options.rootPath, router)
app.use('/auth', AuthRoute)
app.use('/api', doctorRoute)
app.use('/api', appointmentRoute)
app.use('/api', patientRoute)
app.use('/api', categoryRoute)
app.use('/api', chatRoute)
app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler)
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
