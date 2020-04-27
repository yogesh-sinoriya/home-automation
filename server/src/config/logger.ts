import { createLogger, transports, LoggerOptions, format } from "winston";
import { join } from "path";
import util = require('util');
const DailyRotateFile = require("winston-daily-rotate-file");
const defaultLevel = process.env.LOG_LEVEL || 'silly';
const logPath = join(__dirname, "../../..", "logs");


const options: LoggerOptions = {
	exitOnError: false,
	level: defaultLevel,
	transports: [
		new DailyRotateFile({
			name: "default",
			filename: join(logPath, 'server', `%DATE%.log`),
			datePattern: "YYYY-MM-DD",
			zippedArchive: false,
			maxSize: "20m",
			maxFiles: "14d",
			showLevel: true,
			timestamp: true,
			format: format.simple(),
			level: 'silly', // info and below to rotate
		})
	],
};

const logger: any = createLogger(options);

logger.add(new transports.Console({
	// colorize: true,
	// showLevel: true,
	// timestamp: tsFormat,
	level: defaultLevel, // debug and below to console,
	format: format.simple()
}));

export { logger };


function formatArgs(args: any) {
	return [util.format.apply(util.log, Array.prototype.slice.call([(new Date()).toUTCString().substr(17, 8), '=>', ...args]))];
}

console.log = function () {
	logger.info.apply(logger, formatArgs(arguments));
};
console.info = function () {
	logger.info.apply(logger, formatArgs(arguments));
};
console.warn = function () {
	logger.warn.apply(logger, formatArgs(arguments));
};
console.error = function () {
	logger.error.apply(logger, formatArgs(arguments));
};
console.debug = function () {
	logger.debug.apply(logger, formatArgs(arguments));
};