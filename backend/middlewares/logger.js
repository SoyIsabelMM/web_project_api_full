const winston = require('winston');

const { combine, timestamp, printf } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const requestLogger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), logFormat),
  transports: [new winston.transports.File({ filename: 'logs/request.log' })],
});

const errorLogger = winston.createLogger({
  level: 'error',
  format: combine(timestamp(), logFormat),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

const logRequest = (req, res, next) => {
  requestLogger.info(`${req.method} ${req.url}`);
  next();
};

module.exports = {
  logRequest,
  errorLogger,
};
