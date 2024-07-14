const logger = require('../startup/winston');


module.exports = function(err,req,res,next){
    logger.error(err.message,)
     res.status(500).json({message: "Something failed"});
}