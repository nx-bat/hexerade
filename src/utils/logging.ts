export enum LogSeverity {
  Debug = 'DEBUG',
  Info = 'INFO',
  Warn = 'WARN',
  Error = 'ERROR',
  Fatal = 'FATAL',
};

const log = (severity: LogSeverity, context: string, content: any): void => {
  const _msg = `${new Date().toISOString()} [${severity}] [${context}]: ${content}`;

  switch (severity) {
    case LogSeverity.Debug: return console.debug(_msg);
    case LogSeverity.Info: return console.info(_msg);
    case LogSeverity.Warn: return console.warn(_msg);
    case LogSeverity.Error: return console.error(_msg);
    case LogSeverity.Fatal: return console.error(_msg);
  }
}

export const debug = (context: string, content: any): void => log(LogSeverity.Debug, context, content);
export const info = (context: string, content: any): void => log(LogSeverity.Info, context, content);
export const warn = (context: string, content: any): void => log(LogSeverity.Warn, context, content);
export const error = (context: string, content: any): void => log(LogSeverity.Error, context, content);
export const fatal = (context: string, content: any): void => log(LogSeverity.Fatal, context, content);