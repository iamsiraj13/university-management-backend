import { createLogger, format, transports }  from "winston";
const { combine, timestamp, label, printf,prettyPrint } = format;
import path from "path"
import  DailyRotateFile from 'winston-daily-rotate-file';

// custom log format
const myFormat = printf(({ level, message, label }) => {

  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const seconds = date.getSeconds();

  return `{ ${date.toDateString()}-- ${hour}:${minute}:${seconds}  } [${label}] ${level}: ${message}`;
});
const logger = createLogger({
    level: 'info',
    format: combine(
      label({ label: 'UMS-Info' }),
      timestamp(),
      myFormat,
      prettyPrint()
    ),
    transports: [ 
      new transports.Console(),
      
      new DailyRotateFile({
        filename: path.join(process.cwd(),'logs','winston','success','UMS-%DATE%-success.log'),
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
      })
     
   
    ]});

  // logger for error 
const errorLogger = createLogger({
    level: 'error',
    format: combine(
      label({ label: 'UMS-Error' }),
      timestamp(),
      myFormat
    ),
    transports: [ 
      new transports.Console(),

      new DailyRotateFile({
        filename: path.join(process.cwd(),'logs','winston','errors','UMS-%DATE%-error.log'),
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
      })
      
    ], 
  });

  export {logger, errorLogger}
  