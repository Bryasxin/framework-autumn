import { LogType } from "./type";

export class Logger {
	constructor(private context: string = "Anonymous") {}

	static format(timestamp: number, type: LogType, message: string, context: string = "Anonymous") {
		const date = new Date(timestamp);
		const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
		const [hour, minute, second] = [date.getHours(), date.getMinutes(), date.getSeconds()];
		const dateString = `${String(year).padStart(4, "0")}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
		const timeString = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
		const typeString = type.toString().toUpperCase();

		return `${dateString} - ${timeString} [${typeString}] ${context}: ${message}`;
	}

	static trace(message: string, context: string = "Anonymous") {
		console.log(Logger.format(Date.now(), LogType.Trace, context, message));
	}
	trace(message: string) {
		console.log(Logger.format(Date.now(), LogType.Trace, this.context, message));
	}
	static debug(message: string, context: string = "Anonymous") {
		console.log(Logger.format(Date.now(), LogType.Debug, context, message));
	}
	debug(message: string) {
		console.log(Logger.format(Date.now(), LogType.Debug, this.context, message));
	}
	static info(message: string, context: string = "Anonymous") {
		console.log(Logger.format(Date.now(), LogType.Info, context, message));
	}
	info(message: string) {
		console.log(Logger.format(Date.now(), LogType.Info, this.context, message));
	}
	static warn(message: string, context: string = "Anonymous") {
		console.log(Logger.format(Date.now(), LogType.Warn, context, message));
	}
	warn(message: string) {
		console.log(Logger.format(Date.now(), LogType.Warn, this.context, message));
	}
	static error(message: string, context: string = "Anonymous") {
		console.log(Logger.format(Date.now(), LogType.Error, context, message));
	}
	error(message: string) {
		console.log(Logger.format(Date.now(), LogType.Error, this.context, message));
	}
	static crit(message: string, context: string = "Anonymous") {
		console.log(Logger.format(Date.now(), LogType.Crit, context, message));
	}
	crit(message: string) {
		console.log(Logger.format(Date.now(), LogType.Crit, this.context, message));
	}
	static fatal(message: string, context: string = "Anonymous") {
		console.log(Logger.format(Date.now(), LogType.Fatal, context, message));
	}
	fatal(message: string) {
		console.log(Logger.format(Date.now(), LogType.Fatal, this.context, message));
	}
}
