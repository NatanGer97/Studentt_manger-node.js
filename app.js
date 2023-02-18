var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var studentsRouter = require('./routes/students');
var gradesRouter = require('./routes/grades');
const authRouter = require('./routes/auth');
const { sequelize } = require('./database/db');
const errorHandler = require('./middlewares/ErrorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const YAML = require('yamljs');

require('dotenv').config()



const swaggerDocument = YAML.load('swagger.yaml'); 





var app = express();

sequelize.sync({force:false}).then(() => {
    console.log('Database & tables created!');
}).catch(err => {
    console.log(err);
});


const options =  {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Student API',
            version: '1.0.0',
            description: 'A simple Express Student API',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js'],
}

const specs = swaggerJsDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/students', studentsRouter);
app.use('/grades', gradesRouter);
app.use('/auth', authRouter);



app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.message);
    const {statusCode = 500, message= 'Error'} = err;
    res.status(statusCode).json(err);
});





module.exports = app;
