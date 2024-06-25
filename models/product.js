const Joi = require('joi');
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    category: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    imageUrl: {
        type: [String],
        required: true,
    },
    oldPrice: {
        type: String,
        required: true,
    },
    sizes: {
        type: [
            {
               size:{
                type: String,
                required:true
            },
            isSelected: {
                type: Boolean,
                required: false,
                default: false
            }

            }
           
        ]
    },
    description : {
        type: String,
        required: true
    },
    price: {type: String, required:true},    
}, {timestamps:true});

const Product = new mongoose.model('Product', productSchema);

function validate(products){
    const schema = Joi.object({
        name: Joi.string().required(),
        title: Joi.string().required(),
        category: Joi.string().required(),
        imageUrl: Joi.array().items(Joi.string()).required(),
        oldPrice: Joi.string().required(),
        sizes:Joi.array().items(Joi.object().keys({
            size: Joi.string().required(),
            isSelected: Joi.boolean().optional().default(false)
        })),
        description: Joi.string().required(),
        price: Joi.string().required(),
    });
    return schema.validate(products);
}

module.exports = {Product, validate};
