import { LogLevel, LogOptions } from "@/types";

// Map log levels to numeric values for comparison
const logLevelMap: { [key in LogLevel]: number } = {
  debug: 1,
  info: 2,
  warning: 3,
  error: 4,
};

// Read the log level from the environment variable, default to "info" if not set
const currentLogLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || "info";

export function log(options: LogOptions) {
  const { level, message, filePath, data } = options;
  const timestamp = new Date().toISOString();

  // Only log if the message level is at or above the current log level
  if (logLevelMap[level] >= logLevelMap[currentLogLevel]) {
    switch (level) {
      case "info":
        console.info(
          `[${timestamp}] [${filePath}] [INFO]: ${message}`,
          data || ""
        );
        break;
      case "warning":
        console.warn(
          `[${timestamp}] [${filePath}] [WARN]: ${message}`,
          data || ""
        );
        break;
      case "error":
        console.error(
          `[${timestamp}] [${filePath}] [ERROR]: ${message}`,
          data || ""
        );
        break;
      case "debug":
        console.debug(
          `[${timestamp}] [${filePath}] [DEBUG]: ${message}`,
          data || ""
        );
        break;
      default:
        console.log(`[${timestamp}] [LOG]: ${message}`, data || "");
    }
  }
}
