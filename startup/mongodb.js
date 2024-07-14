const mongoose = require('mongoose');
const logger = require('./winston');

module.exports = function(){
    mongoose.connect(process.env.MONGO).then(() => 
        logger.info('Connected to DB---'));
}