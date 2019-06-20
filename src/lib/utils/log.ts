/*
 * Copyright (C) 2019 CaMnter yuanyu.camnter@gmail.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import chalk, { Chalk } from "chalk";

/**
 * @author CaMnter
 */

export const red: Chalk = chalk.hex('#C13928');
export const cyan: Chalk = chalk.hex('#6AC2CC');
export const gray: Chalk = chalk.hex('#6F7783');
export const white: Chalk = chalk.hex('#FFFFFF');
export const green: Chalk = chalk.hex('#007F00');
export const orange: Chalk = chalk.hex('#DAAA7C');
export const yellow: Chalk = chalk.hex('#ECEA38');
export const magenta: Chalk = chalk.hex('#D192E2');

enum LogType {
  info,
  warn,
  error
}

/**
 * main method
 *
 * @param logType logType
 * @param chalk chalk
 * @param text text
 */
export function main(logType: LogType, chalk: Chalk, ...text: Array<string>) {
  const themeText = text.map((value: string) => {
    return chalk(value);
  });
  console.log(getLogTitle(logType), ...themeText);
}

/**
 * get log title
 *
 * @param logType logType
 */
export function getLogTitle(logType: LogType): string {
  let title;
  switch (logType) {
    default:
    case LogType.info:
      title = gray('[info]');
      break;
    case LogType.warn:
      title = orange('[warn]');
      break;
    case LogType.error:
      title = red('[error]');
      break;
  }
  return title;
}

/**
 * info
 *
 * @param chalk chalk
 * @param text text
 */
export function info(chalk: Chalk, ...text: Array<string>) {
  main(LogType.info, chalk, ...text);
}

/**
 * warn
 *
 * @param chalk chalk
 * @param text text
 */
export function warn(chalk: Chalk, ...text: Array<string>) {
  main(LogType.warn, chalk, ...text);
}

/**
 * error
 *
 * @param chalk chalk
 * @param text text
 */
export function error(chalk: Chalk, ...text: Array<string>) {
  main(LogType.error, chalk, ...text);
}

/**
 * main any method
 *
 * @param logType logType
 * @param any any
 */
function mainAny(logType: LogType, ...any: Array<any>) {
  console.log(getLogTitle(logType), any);
}

/**
 * info any
 *
 * @param any any
 */
export function infoAny(...any: Array<any>) {
  mainAny(LogType.info, ...any);
}

/**
 * warn any
 *
 * @param any any
 */
export function warnAny(...any: Array<any>) {
  mainAny(LogType.warn, ...any);
}

/**
 * error any
 *
 * @param any any
 */
export function errorAny(...any: Array<any>) {
  mainAny(LogType.error, ...any);
}