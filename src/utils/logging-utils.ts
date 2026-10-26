import { config } from '../config';

export enum LogType {
  Fatal = 'FATAL',
  Error = 'ERROR',
  Warn = 'WARN',
  Info = 'INFO',
  Debug = 'DEBUG'
};

const colors: Record<LogType, string> = {
  [LogType.Fatal]: '\x1b[1;31m', // Bold red
  [LogType.Error]: '\x1b[31m',   // Red
  [LogType.Warn]: '\x1b[33m',    // Yellow
  [LogType.Info]: '\x1b[32m',    // Green
  [LogType.Debug]: '\x1b[36m',   // Cyan
};

const reset = '\x1b[0m';

function getTimestamp() {
  return '[' + new Date().toISOString()
    .replace('T', ' ')
    .replace(/\.(\d{3})Z$/, ':$1')
    .replace(/(\d{2}):(\d{2}):(\d{2})/, '$1-$2-$3'); // Change time colons to hyphens
};

function log(type: LogType, module: string, content: any): void {
  if (type == LogType.Debug && !config.DEBUG) return;

  const message = `${colors[type]}${getTimestamp()}] [${type}] [${module}]: ${content}${reset}`;

  switch (type) {
    case LogType.Fatal:
    case LogType.Error:
      console.error(message);
      break;
    case LogType.Warn:
      console.warn(message);
      break;
    default:
      console.log(message);
      break;
  }
}

export const fatal = (module: string, content: any) => log(LogType.Fatal, module, content);
export const error = (module: string, content: any) => log(LogType.Error, module, content);
export const warn = (module: string, content: any) => log(LogType.Warn, module, content);
export const info = (module: string, content: any) => log(LogType.Info, module, content);
export const debug = (module: string, content: any) => log(LogType.Debug, module, content);
