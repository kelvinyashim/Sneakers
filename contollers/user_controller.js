const {User} = require('../models/user');

module.exports = {
    getUser: async (req,res)=>{
        try {
            const user = await User.findById(req.user.id).select('-password');
            if (!user)  return res.status(404).json({ message: "User not found" });
            res.status(200).json(user)
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    },

    deleteUser:  async (req,res)=>{
        try {
            const user = await User.findById(req.user.id);
            if (!user)  return res.status(404).json({ message: "User not found" });
            await User.findByIdAndDelete(req.user.id);
            res.status(200).json("User deleted")
        } catch (error) {
            console.log(error);
            res.status(500).json('Internal error');
        }
    },
}