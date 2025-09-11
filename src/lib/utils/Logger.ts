// #region Imports
import chalk from "chalk";
// #endregion


// #region Config

const INDENT_LENGTH = 4;
const INDENT_STRING = " ".repeat(INDENT_LENGTH);
const SECTION_IDENTIFIER = "=====";

// #endregion

export enum LogLevel
{
    INFO,
    WARN,
    ERROR
}

export class Logger 
{
    private static _indents = 0;

    public static indent(num: number = 1)
    {
        this._indents += num;
        if (this._indents < 0) this._indents = 0;
    }

    public static unindent(num: number = 1)
    {
        this.indent(-num);
    }

    private static generateIndent(): string
    {
        return INDENT_STRING.repeat(this._indents);
    }

    private static generatePrefix(): string
    {
        return this.generateIndent();
    }

    private static generateLogString(level: LogLevel, message: string): string
    {
        let levelString: string;
        switch (level)
        {
            case LogLevel.ERROR:
                levelString = chalk.red("[ERROR]");
                break;
            case LogLevel.WARN:
                levelString = chalk.yellow("[WARN] ");
                break;
            case LogLevel.INFO:
            default:
                levelString = chalk.blue("[INFO] ");
                break;
        }

        return levelString + " " + this.generatePrefix() + message;
    }


    public static log(message: string, level: LogLevel = LogLevel.INFO)
    {
        const messageStrings = message.split("\n");
        for (const msg of messageStrings)
        {
            console.log(this.generateLogString(level, msg));
        }
    }

    public static black(message: string, level: LogLevel = LogLevel.INFO)
    {
        this.log(chalk.black(message), level);
    }

    public static red(message: string, level: LogLevel = LogLevel.INFO)
    {
        this.log(chalk.red(message), level);
    }

    public static green(message: string, level: LogLevel = LogLevel.INFO)
    {
        this.log(chalk.green(message), level);
    }

    public static yellow(message: string, level: LogLevel = LogLevel.INFO)
    {
        this.log(chalk.yellow(message), level);
    }

    public static blue(message: string, level: LogLevel = LogLevel.INFO)
    {
        this.log(chalk.blue(message), level);
    }

    public static magenta(message: string, level: LogLevel = LogLevel.INFO)
    {
        this.log(chalk.magenta(message), level);
    }

    public static cyan(message: string, level: LogLevel = LogLevel.INFO)
    {
        this.log(chalk.cyan(message), level);
    }

    public static white(message: string, level: LogLevel = LogLevel.INFO)
    {
        this.log(chalk.white(message), level);
    }

    public static gray(message: string, level: LogLevel = LogLevel.INFO)
    {
        this.log(chalk.gray(message), level);
    }

    public static grey(message: string, level: LogLevel = LogLevel.INFO)
    {
        this.log(chalk.grey(message), level);
    }

    public static blackBright(message: string, level: LogLevel = LogLevel.INFO)
    {
        this.log(chalk.blackBright(message), level);
    }

    public static redBright(message: string, level: LogLevel = LogLevel.INFO)
    {
        this.log(chalk.redBright(message), level);
    }

    public static greenBright(message: string, level: LogLevel = LogLevel.INFO)
    {
        this.log(chalk.greenBright(message), level);
    }

    public static yellowBright(message: string, level: LogLevel = LogLevel.INFO)
    {
        this.log(chalk.yellowBright(message), level);
    }

    public static blueBright(message: string, level: LogLevel = LogLevel.INFO)
    {
        this.log(chalk.blueBright(message), level);
    }

    public static magentaBright(message: string, level: LogLevel = LogLevel.INFO)
    {
        this.log(chalk.magentaBright(message), level);
    }

    public static cyanBright(message: string, level: LogLevel = LogLevel.INFO)
    {
        this.log(chalk.cyanBright(message), level);
    }

    public static whiteBright(message: string, level: LogLevel = LogLevel.INFO)
    {
        this.log(chalk.whiteBright(message), level);
    }

    public static startSection(message: string)
    {
        const sectionLine = SECTION_IDENTIFIER + " " + message + " " + SECTION_IDENTIFIER + "\n";
        this.cyanBright(sectionLine);
        this.indent();
    }

    public static endSection(message: string)
    {
        this.unindent();
        const sectionLine = "\n" + SECTION_IDENTIFIER + " " + message + " " + SECTION_IDENTIFIER;
        this.cyanBright(sectionLine);
    }
}