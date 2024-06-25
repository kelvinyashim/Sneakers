const Product = require('../models/product');
const {Cart, validate} = require('../models/cart');

module.exports = {
    addCart: async (req,res) =>{
        const userId = req.user.id;
        const {cartItem, quantity} = req.body;
        //handle validation
        const {error} = validate(req.body);
        if(error) return res.status(400).json(error.details[0].message); 

        //check if a cart already exists for the current user
        try {
            const cart = await Cart.findOne({userId});

            if(cart){
                //now we check if the product the user is about to add exists
                const existingProduct = cart.products.find(
                    (product) => product.cartItem.toString() === cartItem 
                );
                //now if the product exists we want to increment by 1
                if(existingProduct){
                    existingProduct.quantity +=1
                }else{
                    cart.products.push({cartItem, quantity: 1});
                }
                await cart.save();
                res.status(200).json("Product added to the cart");
            }else{
                const newCart = new Cart({
                    userId,
                    products: [{
                        cartItem,
                        quantity:1
                    }]
                });
                await newCart.save();
                res.status(200).json("Product added to the cart");
            }
        } catch (error) {
            console.log(error);
            res.status(500).json('Product failed to be added to cart');  
        }
    },

    getCart: async (req,res)=>{
        const userId = req.user.id;
        try {
            const cart = await Cart.find({userId});
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json(error);  
        }
    },


    deleteCart: async (req,res)=>{
    try {
      const cart = await Cart.findByIdAndDelete(req.params.id);  
      res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);  
    }
    }
}