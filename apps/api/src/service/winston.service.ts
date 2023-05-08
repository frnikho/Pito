import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

import * as process from 'process';

export type LogLevel = 'ALL' | 'DEV' | 'PRODUCTION';

export type ActiveLevelType = {
  name: string;
  level: LogLevel;
  log: string;
};

export const ActiveLevels: ActiveLevelType[] = [
  { name: 'ALL', level: 'ALL', log: 'silly'},
  { name: 'DEV', level: 'DEV', log: 'debug'},
  { name: 'PRODUCTION', level: 'PRODUCTION', log: 'info'},
];

type ActiveTransportType = {
  level: LogLevel;
  transports: any[];
};

const cliFormat = format.combine(
  format.timestamp({
    format: 'HH:MM:ss DD-MM-YYYY',
  }),
  format.prettyPrint(),
  format.colorize(),
  format.align(),
  format.printf((info) => {
    return `${info.timestamp} ${info.level} [${info.context}] ${info.message}`;
  }),
)

const ActiveTransports: ActiveTransportType[] = [
  {
    level: 'ALL',
    transports: [
      new transports.Console({
        format: cliFormat,
      }),
    ],
  },
  {
    level: 'DEV',
    transports: [
      new transports.Console({
        format: cliFormat,
      }),
    ]
  },
  {
    level: 'PRODUCTION',
    transports: [
      new transports.Console({
        format: cliFormat,
      }),
      new transports.DailyRotateFile({
        datePattern: 'DD-MM-YYYY',
        dirname: `./logs/`,
        level: 'silly',
        handleExceptions: true,
        filename: 'pito-%DATE%.log',
        json: true,
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
      })
    ],
  }
];

export const winstonLoggerService = () => {
  const logLevel = process.env.LOG_LEVEL;
  return WinstonModule.createLogger({
    format: format.combine(
      format.timestamp(),
      format.json(),
    ),
    level: ActiveLevels.find((lvl) => lvl.name === logLevel)?.log,
    transports: [
      ...buildConsoleTransports(parseLogLevel(logLevel ?? '')),
    ],
  });
};

export const buildConsoleTransports = (logLevel: LogLevel): any => {
  return ActiveTransports.find((a) => a.level === logLevel)?.transports ?? [];
};

export const parseLogLevel = (env: string): LogLevel =>
  ActiveLevels.find((lvl) => lvl.name === env)?.level ?? 'ALL';