const {Order} = require('../models/order');
module.exports = {
    //here we want to get the list of orders by a particular user 
    //we get the user id by our middleware authorization
    getOrders: async (req,res)=>{
        const userId = req.user.id; //this from the middleware our token
        try {
            const order = Order.find({userId}).populate('productId', '-size -oldPrice -description -category');
            res.status(200).json(order);

        } catch (error) {
            res.status(500).json({msg: 'Failed to get orders'});
        }
    }
}