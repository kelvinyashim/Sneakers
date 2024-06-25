const Joi = require('joi');
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [
        {
            cartItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
        }
    ],
    quantity: { type: Number, default: 1 }
}, {
    timestamps: true 
});

const Cart = mongoose.model('Cart', cartSchema);

function validate(cart){
    const schema = Joi.object({
        userId: Joi.objectId().required(),
        product: Joi.array().items(Joi.object().keys({
            cartItem: Joi.objectId()
        })),
        quantity: Joi.number()
    })
return schema.validate(cart)
}
module.exports = { Cart, validate };
