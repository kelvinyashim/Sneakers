const winston = require("winston");
    const logger = winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.File({ filename: 'logFile.log' }),
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exception.log' })
      ],
      rejectionHandlers: [
        new winston.transports.File({ filename: 'rejection.log' })
      ]
  });
  
module.exports = logger;



