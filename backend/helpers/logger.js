import winston from 'winston';
import 'winston-daily-rotate-file';

const transport = new winston.transports.DailyRotateFile({
  filename: 'logs/%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '14d',
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: () =>
        new Date().toLocaleString("sv-SE", {
          timeZone: "America/Argentina/Buenos_Aires",
        }),
    }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [transport],
});

export default logger;