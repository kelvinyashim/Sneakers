const mongoose = require('mongoose');
const Joi = require('joi');

const orderSchema = new mongoose.Schema({
    userId: {type:String, required:true},
    customerId: {type:String, required:true},//this is required for stripe
    productId: {
        //an order contains multiple products 
        //thats why we ref
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required:true},
        quantity: {type:Number, required:true},
        subTotal: {type:Number, required:true},
        total: {type:Number, required:true},
        deliveryStatus: {type:String, required:true, default:'pending'},
        paymentStatus: {type:String, required:true,}
}, {timestamps:true}
);

const Order = mongoose.model('Order', orderSchema);

function validate(order){
    const schema = Joi.object({
        userId: Joi.objectId().required(),
        customerId: Joi.objectId().required(),
        productId: Joi.objectId().required(),
        quantity: Joi.number().required(),
        subTotal: Joi.number().required(),
        total: Joi.number().required(),
        deliveryStatus: Joi.string().required(),
        paymentStatus: Joi.string().required(),

    });
    return schema.validate(order);
}

module.exports = {Order, validate}