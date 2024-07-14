const express = require('express');
const productRouter = require('../routes/product');
const authRouter = require('../routes/auth');
const userRouter = require('../routes/user');
const orderRouter = require('../routes/order');
const cartRouter = require('../routes/cart');
const err = require('../middleware/error');

module.exports = function(app){
    app.use(express.json({limit:'10mb'}));
    app.use(express.urlencoded({limit:'10mb', extended:true}));
    app.use('/api/', authRouter); 
    app.use('/api/products', productRouter);
    app.use('/api/users', userRouter);
    app.use('/api/orders', orderRouter);
    app.use('/api/cart', cartRouter);
    app.use(err);

}