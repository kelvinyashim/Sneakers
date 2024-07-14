const express = require('express');
const logger = require('./startup/winston');
require('dotenv').config();


const app = express();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/mongodb')();
require('./startup/config')();
require('./startup/validation')();

app.listen(process.env.PORT || 7000, ()=> logger.info(`Running on port ${process.env.PORT}`));