const express =require('express');
require('dotenv').config();
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const db = require('./config/database');
const userRouter = require('./routes/userRoute');
const notFound = require('./utils/404');
const app= express();



//cors
app.use(
    cors({
        origin: [process.env.CLIENT_URL],
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
        credentials: true
    })
);


app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', userRouter);
app.use("*", notFound);

//db connection
db(() => {
    try {
        console.log("DataBase Successfully Connected");
    } catch (error) {
        console.log("Database Not Connected : ", error);
    }
});


// ERROR HANDLER MIDDLEWARE 
app.use(errorHandler);


app.listen(3000,()=>{
    console.log('Server listening on port 3000');
})