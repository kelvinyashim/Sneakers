const {User} = require('../models/user');

module.exports = {
    getUser: async (req,res)=>{
        try {
            const user = await User.findById(req.user.id).select('-password');
            res.status(200).json(user)
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    },

    deleteUser:  async (req,res)=>{
        try {
            const user = await User.findByIdAndDelete(req.user.id);
            res.status(200).json("User deleted")
        } catch (error) {
            console.log(error);
            res.status(500).json('Internal error');
        }
    },
}