const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const app = express();

dotenv.config();

if(!config.get('jwtPrivateKey')){
    console.log("FATAL ERROR: jwtPrivateKey is not defined");
    process.exit(1);
} 
const mongoUri = process.env.MONGO;

mongoose.connect(mongoUri).then(() => 
    console.log('Connected to DB---')).catch(err => console.error('Could not connect to MongoDB...', err)
);
const productRouter = require('./routes/product');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');
const cartRouter = require('./routes/cart');
const err = require('./middleware/error');


app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({limit:'10mb', extended:true}));
app.use('/api/', authRouter); 
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/cart', cartRouter);
app.use(err);



app.listen(process.env.PORT || 7000, ()=> console.log(`Running on port ${process.env.PORT}`));