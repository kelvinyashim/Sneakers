const {Product, validate} = require('../models/product');
const _ = require('lodash');
const asyncMiddleware = require('../middleware/async')


module.exports = {
    createProduct: async (req,res)=>{
        
        const {error} = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        
        try {
            const product = new Product(req.body);
            await product.save();
            res.status(201).json({msg: 'product created'});
        } catch (error) {
            console.log(error.message);
            res.status(400).json('Something went wrong');
        }
    },

    getAllProducts: asyncMiddleware(async (req,res)=>{
            const products = await Product.find().sort({createdAt: 1});
            res.status(200).json(products);
        
    }),

    getProduct: async (req,res)=>{

        try {
            const product = await Product.findById(req.params.id).select('-__v -createdAt -updatedAt');
             if (!product) return res.status(404).json({ error: 'Product not found' });
             res.status(200).json(product);
        } catch (error) {
            res.status(500).json('Internal error');
        }
    },

    searchProduct: async (req,res)=>{
        try {
            const result = await Product.aggregate(
                [
                    {
                      $search: {
                        index: "shoes",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            );
            res.status(200).json(result);
        } catch (error) {
            console.log(error.message);
            res.status(500).json('Failed to get the product');
        }
    },
}