var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** 
 * Conexión a la base de datos
 */
require('./lib/connectMongoose');
require('./models/Anuncio');

/**
 * Variables globales de vistas
 */
app.locals.titulo = 'Nodepop';

/** 
 * Rutas de nuestro API
 */
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));


/**
 * Rutas de nuestro sito web
 */
app.use('/', require('./routes/index'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {

    // errores de validación
    if(err.array){
        err.status = 422;
        const errInfo = err.array({ onlyFirstError: true })[0];
        err.message = isAPIRequest(req) ?
            { message: 'Not valid', errors: err.mapped() } : 
            `Not valid - ${errInfo.param} ${errInfo.msg}`;
    }

    // render the error page
    res.status(err.status || 500);

    // Para peticiones de API respondo con JSON
    if(isAPIRequest(req)){
        res.json({ sucess: false, error: err.message });
        return;
    }

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Para peticiones a la web respondo con un mensaje de error en la web
    res.render('error');
});

function isAPIRequest(req){
    return req.originalUrl.indexOf('/apiv') === 0;
}

module.exports = app;
