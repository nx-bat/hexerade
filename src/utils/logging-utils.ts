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

function log(type: LogType, module: string, content: string): void {
  if (type == LogType.Debug && !config.DEBUG) return;

  const timestamp = new Date().toLocaleTimeString();
  console.log(`${colors[type]}${timestamp} [${type}] [${module}] ${content}${reset}`);
}

export const fatal = (module: string, content: string) => log(LogType.Fatal, module, content);
export const error = (module: string, content: string) => log(LogType.Error, module, content);
export const warn = (module: string, content: string) => log(LogType.Warn, module, content);
export const info = (module: string, content: string) => log(LogType.Info, module, content);
export const debug = (module: string, content: string) => log(LogType.Debug, module, content);
